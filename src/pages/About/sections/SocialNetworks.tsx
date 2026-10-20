import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  BiLogoDribbble,
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoYoutube,
} from 'react-icons/bi'
import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const NETWORKS: { name: string; handle: string; href: string; icon: IconType; color: string }[] = [
  {
    name: 'Facebook',
    handle: 'silicon',
    href: 'https://www.facebook.com',
    icon: BiLogoFacebookSquare,
    color: 'facebook',
  },
  {
    name: 'Instagram',
    handle: '@silicon',
    href: 'https://www.instagram.com',
    icon: BiLogoInstagram,
    color: 'instagram',
  },
  {
    name: 'Twitter',
    handle: '@silicon',
    href: 'https://twitter.com',
    icon: BiLogoTwitter,
    color: 'twitter',
  },
  {
    name: 'Linkedin',
    handle: 'Silicon Inc.',
    href: 'https://www.linkedin.com',
    icon: BiLogoLinkedin,
    color: 'linkedin',
  },
  {
    name: 'YouTube',
    handle: 'Silicon',
    href: 'https://www.youtube.com',
    icon: BiLogoYoutube,
    color: 'youtube',
  },
  {
    name: 'Dribbble',
    handle: 'Silicon',
    href: 'https://dribbble.com',
    icon: BiLogoDribbble,
    color: 'dribbble',
  },
]

/** "We Have Social Networks": six linked tiles; the icon fills with the brand colour on hover. */
export function SocialNetworks() {
  return (
    <section aria-labelledby="social-title" className="pt-20 pb-6 lg:pt-28 lg:pb-28">
      <Container>
        <SectionHeading
          id="social-title"
          title="We Have Social Networks"
          subtitle="Follow us and keep up to date with the freshest news!"
        />
        <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:divide-x lg:divide-border">
          {NETWORKS.map(({ name, handle, href, icon: Icon, color }, index) => (
            <Reveal as="li" key={name} delay={index * 0.05}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--brand': `var(--color-${color})` } as CSSProperties}
                className="group flex flex-col items-center rounded-lg px-2 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="inline-flex size-13 items-center justify-center rounded-lg bg-subtle text-2xl text-title transition-all duration-200 group-hover:bg-(--brand) group-hover:text-white group-hover:shadow-[0_8px_18px_-8px_var(--brand)]">
                  <Icon aria-hidden />
                </span>
                <span className="mt-4 text-body-m font-bold text-heading">{name}</span>
                <span className="text-body-s text-muted">
                  {handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
