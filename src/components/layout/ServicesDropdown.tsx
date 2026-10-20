import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/cn'
import { useGetServicesQuery } from '@/services/servicesApi'

/** "Services ▾" disclosure menu: opens on hover or click; arrow keys move between links. */
export function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const { data: services, isLoading, isError } = useGetServicesQuery()
  const { pathname } = useLocation()
  const active = pathname.startsWith('/services')

  const menuId = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const links = [{ label: 'All Services', to: '/services' }].concat(
    services?.map((service) => ({ label: service.title, to: `/services/${service.slug}` })) ?? [],
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const focusItem = (index: number) => {
    const items = wrapperRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-item]')
    if (!items?.length) return
    const next = (index + items.length) % items.length
    items[next]?.focus()
  }

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => focusItem(0))
    }
  }

  const onMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-item]') ?? [],
    )
    const current = items.indexOf(document.activeElement as HTMLAnchorElement)
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusItem(current + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusItem(current - 1)
        break
      case 'Home':
        event.preventDefault()
        focusItem(0)
        break
      case 'End':
        event.preventDefault()
        focusItem(items.length - 1)
        break
      case 'Escape':
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
        break
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 150)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className={cn(
          'flex items-center gap-1 rounded-sm text-nav transition-colors hover:text-primary',
          active || open ? 'text-primary' : 'text-title',
        )}
      >
        Services
        <BiChevronDown
          aria-hidden
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 z-10 pt-4"
          >
            <ul
              id={menuId}
              onKeyDown={onMenuKeyDown}
              className="w-72 rounded-lg border border-border bg-surface p-2 shadow-secondary"
            >
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    data-menu-item
                    to={link.to}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.to ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2 text-body-s font-semibold transition-colors hover:bg-subtle hover:text-primary focus-visible:bg-subtle',
                      pathname === link.to ? 'text-primary' : 'text-title',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isLoading &&
                Array.from({ length: 6 }, (_, index) => (
                  <li key={index} className="px-3 py-2" aria-hidden>
                    <span className="block h-4 w-4/5 animate-pulse rounded-sm bg-subtle" />
                  </li>
                ))}
              {isError && (
                <li className="px-3 py-2 text-body-s text-danger">Couldn't load services.</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
