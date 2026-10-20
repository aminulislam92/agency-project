import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  BiLogoDribbble,
  BiLogoFacebookSquare,
  BiLogoGooglePlus,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoYoutube,
} from 'react-icons/bi'
import { cn } from '@/lib/cn'

export type SocialNetwork =
  'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'dribbble' | 'google'

const NETWORKS: Record<SocialNetwork, { label: string; icon: IconType }> = {
  facebook: { label: 'Facebook', icon: BiLogoFacebookSquare },
  instagram: { label: 'Instagram', icon: BiLogoInstagram },
  twitter: { label: 'Twitter', icon: BiLogoTwitter },
  linkedin: { label: 'LinkedIn', icon: BiLogoLinkedin },
  youtube: { label: 'YouTube', icon: BiLogoYoutube },
  dribbble: { label: 'Dribbble', icon: BiLogoDribbble },
  google: { label: 'Google+', icon: BiLogoGooglePlus },
}

interface SocialButtonProps {
  network: SocialNetwork
  href: string
  /** "outline": bordered tile (contact info). "subtle": filled tile (testimonials, share). */
  variant?: 'outline' | 'subtle'
  size?: 'xs' | 'sm' | 'md'
  /** Accessible name override, e.g. "Share on Twitter" */
  label?: string
  className?: string
}

/**
 * Square social icon link. On hover it fills with the network's brand colour and
 * gets the matching coloured shadow (spec: 0 8px 18px -8px <color>/.9).
 */
export function SocialButton({
  network,
  href,
  variant = 'outline',
  size = 'md',
  label,
  className,
}: SocialButtonProps) {
  const { label: name, icon: Icon } = NETWORKS[network]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? `${name} (opens in a new tab)`}
      style={{ '--brand': `var(--color-${network})` } as CSSProperties}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md text-title transition-all duration-200 hover:border-transparent hover:bg-(--brand) hover:text-white hover:shadow-[0_8px_18px_-8px_var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variant === 'outline' ? 'border border-border bg-card' : 'bg-subtle',
        { md: 'size-11 text-xl', sm: 'size-9 text-base', xs: 'size-8 text-sm' }[size],
        className,
      )}
    >
      <Icon aria-hidden />
    </a>
  )
}
