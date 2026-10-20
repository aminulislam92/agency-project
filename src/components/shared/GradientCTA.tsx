import { ConcentricLines } from '@/components/decor/ConcentricLines'
import { Rays } from '@/components/decor/Rays'
import { ButtonLink } from '@/components/ui/Button'
import { CONTACT_EMAIL } from '@/lib/config'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface GradientCTAProps {
  subtitle?: string
  email?: string
  buttonLabel?: string
  buttonTo?: string
  className?: string
}

/**
 * Brand-gradient call-to-action box (spec: 1296×406, radius 8, white concentric
 * line shapes on the left, rays fanning from the top-right corner).
 */
export function GradientCTA({
  subtitle = "Want to work with us? Let's talk",
  email = CONTACT_EMAIL,
  buttonLabel = 'Contact us',
  buttonTo = '/contact',
  className,
}: GradientCTAProps) {
  return (
    <Reveal className={className}>
      <section
        aria-label="Contact us"
        className="relative isolate overflow-hidden rounded-lg bg-brand-gradient px-6 py-16 text-center md:py-25"
      >
        <ConcentricLines className="absolute top-0 left-0 -z-10 h-full w-auto text-white/35" />
        <Rays origin="top-right" className="-z-10 text-white/10" />
        <p className="text-body-l text-white/70 md:text-lead">{subtitle}</p>
        <a
          href={`mailto:${email}`}
          className="mt-4 inline-block rounded-sm text-h4 break-all text-white underline decoration-2 underline-offset-4 transition-opacity hover:opacity-85 focus-visible:outline-white sm:text-h3 md:text-h1"
        >
          {email}
        </a>
        <div className="mt-10 md:mt-12">
          <ButtonLink to={buttonTo} variant="white">
            {buttonLabel}
          </ButtonLink>
        </div>
      </section>
    </Reveal>
  )
}

/** Wraps the CTA so the previous section's tinted background runs ~62% behind it (Home). */
export function GradientCTAOverlap({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-linear-to-b from-surface-alt from-60% to-transparent to-60% md:from-62% md:to-62%',
        className,
      )}
    >
      {children}
    </div>
  )
}
