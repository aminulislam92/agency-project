import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { BiChevronDown, BiX } from 'react-icons/bi'
import { NavLink } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { useGetServicesQuery } from '@/services/servicesApi'
import { MAIN_NAV } from './navigation'
import { ThemeToggle } from './ThemeToggle'

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'block rounded-md px-3 py-2.5 text-nav transition-colors hover:bg-subtle hover:text-primary',
    isActive ? 'text-primary' : 'text-title',
  )

/** Slide-in drawer for < lg screens. Traps focus, closes on Escape / backdrop click. */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { data: services } = useGetServicesQuery()

  // Lock page scroll and move focus into the drawer while open
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 lg:hidden" onKeyDown={onKeyDown}>
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute top-0 right-0 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-surface shadow-secondary"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex h-nav shrink-0 items-center justify-between border-b border-border px-4">
              <Logo onClick={onClose} />
              <IconButton ref={closeRef} label="Close menu" variant="ghost" onClick={onClose}>
                <BiX aria-hidden />
              </IconButton>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-2 py-4">
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((value) => !value)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-nav text-title transition-colors hover:bg-subtle hover:text-primary"
                  >
                    Services
                    <BiChevronDown
                      aria-hidden
                      className={cn('size-5 transition-transform', servicesOpen && 'rotate-180')}
                    />
                  </button>
                  {servicesOpen && (
                    <ul className="mt-1 ml-3 space-y-1 border-l border-border pl-2">
                      <li>
                        <NavLink to="/services" end className={linkClass} onClick={onClose}>
                          All Services
                        </NavLink>
                      </li>
                      {services?.map((service) => (
                        <li key={service.id}>
                          <NavLink
                            to={`/services/${service.slug}`}
                            className={linkClass}
                            onClick={onClose}
                          >
                            {service.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                {MAIN_NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className={linkClass} onClick={onClose}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-5 border-t border-border p-4">
              <ThemeToggle />
              <ButtonLink to="/contact" size="md" fullWidth onClick={onClose}>
                Contact us
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
