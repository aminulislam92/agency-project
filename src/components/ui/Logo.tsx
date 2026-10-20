import { useId } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

interface LogoMarkProps {
  className?: string
}

/** Faceted gem with "Si" and atomic number 14, filled with the brand gradient. */
export function LogoMark({ className }: LogoMarkProps) {
  const id = useId()
  const gradient = `${id}-gradient`

  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={gradient} x1="4" y1="40" x2="42" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: 'var(--color-gradient-from)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--color-gradient-via)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-gradient-to)' }} />
        </linearGradient>
      </defs>
      {/* gem outline */}
      <path
        d="M14.5 2.5 31 3.8l10.2 12.6-2.6 17.2L23 42 7.4 36.4 2.6 19.6Z"
        fill={`url(#${gradient})`}
      />
      {/* facets */}
      <path d="M14.5 2.5 31 3.8 22 12Z" fill="white" fillOpacity=".18" />
      <path d="M31 3.8l10.2 12.6L22 12Z" fill="white" fillOpacity=".08" />
      <path d="M2.6 19.6 14.5 2.5 22 12Z" fill="white" fillOpacity=".1" />
      <path d="M7.4 36.4 23 42l-3-12Z" fill="black" fillOpacity=".12" />
      <path d="m23 42 15.6-8.4L20 30Z" fill="black" fillOpacity=".18" />
      <path d="M2.6 19.6 7.4 36.4 20 30Z" fill="black" fillOpacity=".06" />
      {/* symbol */}
      <text
        x="8.2"
        y="30.5"
        fill="white"
        fontFamily="var(--font-sans)"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        Si
      </text>
      <text
        x="26.5"
        y="15"
        fill="white"
        fontFamily="var(--font-sans)"
        fontSize="6.5"
        fontWeight="700"
      >
        14
      </text>
    </svg>
  )
}

interface LogoProps {
  className?: string
  /** Render as a link to the homepage (default true) */
  asLink?: boolean
  onClick?: () => void
}

/** 122×44 logo: gem + "Silicon" wordmark (Manrope 800, 20px). */
export function Logo({ className, asLink = true, onClick }: LogoProps) {
  const content = (
    <>
      <LogoMark className="size-11 shrink-0" />
      <span className="text-h5 text-heading">Silicon</span>
    </>
  )
  const classes = cn('inline-flex items-center gap-2', className)

  return asLink ? (
    <Link
      to="/"
      className={cn(classes, 'rounded-md')}
      aria-label="Silicon — home"
      onClick={onClick}
    >
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  )
}
