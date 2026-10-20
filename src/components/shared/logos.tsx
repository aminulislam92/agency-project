import type { AwardLogoId, ClientLogoId } from '@/types'
import { cn } from '@/lib/cn'

/* Simplified vector recreations of the placeholder brand marks in the design.
   They inherit `currentColor`, so callers control grayscale / hover colour. */

const textProps = {
  fill: 'currentColor',
  fontFamily: 'var(--font-sans)',
} as const

interface LogoProps {
  className?: string
}

function LogoBox({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 132 32" className={className} aria-hidden>
      <path d="M3 4h24v24H3z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M11 8v13h10" fill="none" stroke="currentColor" strokeWidth="4" />
      <text x="33" y="27" fontSize="29" fontWeight="800" letterSpacing="3" {...textProps}>
        OGO
      </text>
    </svg>
  )
}

function LogoCubes({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 144 32" className={className} aria-hidden>
      <g fill="currentColor">
        <rect x="9" y="3" width="8" height="8" rx="2" transform="rotate(45 13 7)" />
        <rect x="3" y="12" width="8" height="8" rx="2" transform="rotate(45 7 16)" />
        <rect x="15" y="12" width="8" height="8" rx="2" transform="rotate(45 19 16)" />
        <rect x="9" y="21" width="8" height="8" rx="2" transform="rotate(45 13 25)" />
      </g>
      <text x="32" y="22" fontSize="17" fontWeight="700" {...textProps}>
        logoipsum
      </text>
      <text x="124" y="13" fontSize="7" fontWeight="700" {...textProps}>
        ®
      </text>
    </svg>
  )
}

function LogoOutline({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 150 32" className={className} aria-hidden>
      <text x="2" y="23" fontSize="18" fontWeight="800" letterSpacing="2" {...textProps}>
        LOGO
      </text>
      <text
        x="62"
        y="23"
        fontSize="18"
        fontWeight="800"
        letterSpacing="2"
        fontFamily="var(--font-sans)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        IPSUM
      </text>
    </svg>
  )
}

function LogoD({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 136 32" className={className} aria-hidden>
      <path d="M3 4h6a12 12 0 0 1 0 24H3z" fill="currentColor" />
      <path d="M9 9a7 7 0 0 1 0 14" fill="none" stroke="white" strokeOpacity=".9" strokeWidth="3" />
      <text x="26" y="22" fontSize="17" fontWeight="700" {...textProps}>
        logoipsum
      </text>
      <text x="117" y="13" fontSize="7" fontWeight="700" {...textProps}>
        ®
      </text>
    </svg>
  )
}

function LogoSlash({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 132 32" className={className} aria-hidden>
      <circle cx="14" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M7 22 21 9M10 24 23 12" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="22" fontSize="16" fontWeight="700" {...textProps}>
        logoipsum
      </text>
    </svg>
  )
}

function LogoArrow({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 150 32" className={className} aria-hidden>
      <path d="M3 3v26l20-13z" fill="currentColor" fillOpacity=".55" />
      <path d="M3 3v26l10-13z" fill="currentColor" />
      <text x="30" y="22" fontSize="15" fontWeight="600" letterSpacing="3.5" {...textProps}>
        LOGOIPSUM
      </text>
    </svg>
  )
}

const CLIENT_LOGOS: Record<ClientLogoId, (props: LogoProps) => React.JSX.Element> = {
  logo: LogoBox,
  cubes: LogoCubes,
  'logoipsum-outline': LogoOutline,
  'd-mark': LogoD,
  slash: LogoSlash,
  arrow: LogoArrow,
}

export function ClientLogo({ id, className }: { id: ClientLogoId; className?: string }) {
  const Logo = CLIENT_LOGOS[id]
  return <Logo className={cn('h-8 w-auto', className)} />
}

/* ---- Awards --------------------------------------------------------------- */

function Webby({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 96 40" className={className} aria-hidden>
      <g fill="currentColor">
        <rect x="2" y="2" width="12" height="36" rx="1" />
        <rect x="14" y="8" width="5" height="3" fillOpacity=".6" />
        <rect x="14" y="14" width="5" height="3" fillOpacity=".6" />
        <rect x="14" y="20" width="5" height="3" fillOpacity=".6" />
        <rect x="14" y="26" width="5" height="3" fillOpacity=".6" />
      </g>
      <text x="25" y="13" fontSize="8" fontWeight="500" {...textProps}>
        THE
      </text>
      <text x="25" y="26" fontSize="13" fontWeight="800" {...textProps}>
        WEBBY
      </text>
      <text x="25" y="36" fontSize="8" fontWeight="500" letterSpacing=".5" {...textProps}>
        AWARDS
      </text>
    </svg>
  )
}

function Cssda({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path d="M16 2h30L34 14H6z" fill="currentColor" />
      <path d="M48 38H18l12-12h28z" fill="currentColor" />
      <rect x="2" y="15" width="60" height="10" fill="white" fillOpacity="0" />
      <text
        x="32"
        y="23.5"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
        {...textProps}
      >
        CSSDA
      </text>
    </svg>
  )
}

function Awwwards({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <text x="0" y="36" fontSize="44" fontWeight="800" letterSpacing="-2" {...textProps}>
        W.
      </text>
    </svg>
  )
}

function Fwa({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 80 40" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M10 12h56a8 8 0 0 1 0 16H14a8 8 0 0 1 0-16" strokeOpacity=".5" />
        <text
          x="40"
          y="26.5"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          letterSpacing="1"
          fontFamily="var(--font-sans)"
          strokeWidth="1.2"
        >
          FWA
        </text>
        <path d="M1 20h5M74 20h5" />
      </g>
    </svg>
  )
}

const AWARD_LOGOS: Record<AwardLogoId, (props: LogoProps) => React.JSX.Element> = {
  webby: Webby,
  cssda: Cssda,
  awwwards: Awwwards,
  fwa: Fwa,
}

export function AwardLogo({ id, className }: { id: AwardLogoId; className?: string }) {
  const Logo = AWARD_LOGOS[id]
  return <Logo className={cn('h-10 w-auto', className)} />
}
