import { useEffect, useRef, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { NavLink } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { IconButton } from '@/components/ui/IconButton'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { MobileMenu } from './MobileMenu'
import { MAIN_NAV } from './navigation'
import { ServicesDropdown } from './ServicesDropdown'
import { ThemeToggle } from './ThemeToggle'

const SCROLL_THRESHOLD = 8

/** Fixed 76px navbar — transparent over the hero, glass + shadow once the page scrolls. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > SCROLL_THRESHOLD)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-surface/80 shadow-nav backdrop-blur-nav' : 'bg-transparent',
      )}
    >
      <Container className="flex h-nav items-center">
        <Logo />

        <nav aria-label="Main" className="ml-12 hidden lg:block">
          <ul className="flex items-center gap-6">
            <li>
              <ServicesDropdown />
            </li>
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-sm text-nav transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-title',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-8">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden lg:block">
            <ButtonLink to="/contact" size="sm">
              Contact us
            </ButtonLink>
          </div>
          <div className="lg:hidden">
            <IconButton
              ref={menuButtonRef}
              label="Open menu"
              variant="ghost"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <BiMenu aria-hidden />
            </IconButton>
          </div>
        </div>
      </Container>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
