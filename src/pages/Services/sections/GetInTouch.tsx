import type { IconType } from 'react-icons'
import { BiEnvelope, BiMap, BiPhoneCall } from 'react-icons/bi'
import { ContactForm } from '@/components/shared/ContactForm'
import { Reveal } from '@/components/shared/Reveal'
import { SocialButton, type SocialNetwork } from '@/components/shared/SocialLinks'
import { Container } from '@/components/ui/Container'
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/config'

const CONTACTS: { icon: IconType; label: string; href: string }[] = [
  { icon: BiPhoneCall, label: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}` },
  { icon: BiEnvelope, label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  {
    icon: BiMap,
    label: CONTACT_ADDRESS,
    href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_ADDRESS)}`,
  },
]

const SOCIALS: { network: SocialNetwork; href: string }[] = [
  { network: 'facebook', href: 'https://www.facebook.com' },
  { network: 'twitter', href: 'https://twitter.com' },
  { network: 'linkedin', href: 'https://www.linkedin.com' },
  { network: 'instagram', href: 'https://www.instagram.com' },
]

export function GetInTouch() {
  return (
    <section aria-labelledby="contact-title" className="pt-20 pb-6 lg:pt-28">
      <Container>
        <div className="grid gap-12 rounded-lg bg-surface-alt px-4 py-12 sm:px-8 md:px-12 lg:grid-cols-12 lg:gap-6 lg:px-0 lg:py-18">
          <div className="lg:col-span-4 lg:col-start-2 lg:pt-10">
            <h2 id="contact-title" className="text-h3 md:text-h2 lg:text-h1">
              Get in Touch
            </h2>
            <p className="mt-6 text-body-m text-body">
              Have a project in mind? To request a quote contact us directly or fill out the form
              and let us know how we can help.
            </p>

            <h3 className="mt-12 text-h4 lg:mt-18 lg:text-h3">Contact Info</h3>
            <ul className="mt-6 space-y-2">
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-3 rounded-sm text-body-m font-semibold text-title transition-colors hover:text-primary"
                  >
                    <Icon aria-hidden className="size-5 shrink-0 text-primary" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-12 flex gap-4 lg:mt-18" aria-label="Social media">
              {SOCIALS.map((social) => (
                <li key={social.network}>
                  <SocialButton {...social} />
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="rounded-lg bg-card p-6 shadow-card sm:p-8 lg:col-span-5 lg:col-start-7">
            <ContactForm variant="detailed" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
