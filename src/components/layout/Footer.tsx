import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Copyright } from './Copyright'
import { Logo } from '@/components/ui/Logo'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { CONTACT_EMAIL } from '@/lib/config'
import { FOOTER_NAV, LEGAL_NAV, SOCIAL_LINKS } from './navigation'

const linkClass = 'rounded-sm text-nav text-title transition-colors hover:text-primary'

export function Footer() {
  return (
    <footer className="bg-surface pt-18 pb-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5 xl:col-span-4">
            <Logo />
            <p className="mt-6 max-w-104 text-body-s text-body">
              Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus,
              eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec.
              Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.
            </p>
            <NewsletterForm
              title="Subscribe to our newsletter"
              className="mt-10 max-w-104"
              variant="inline"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <nav aria-label="Footer">
              <ul className="space-y-2">
                {FOOTER_NAV.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-10 space-y-2">
                {LEGAL_NAV.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="space-y-2" aria-label="Social media">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <h2 className="text-nav text-heading">Contact Us</h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-block rounded-sm text-nav text-primary transition-colors hover:text-primary-hover hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-18 text-body-xs text-muted">
          <Copyright />
        </p>
      </Container>
    </footer>
  )
}
