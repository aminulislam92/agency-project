import type { IconType } from 'react-icons'
import { cn } from '@/lib/cn'

const ICON_GRADIENT_ID = 'brand-icon-gradient'

/** Hidden <svg> holding the gradient that GradientIcon references. Render once (RootLayout). */
export function IconGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <linearGradient id={ICON_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-gradient-from)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--color-gradient-via)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-gradient-to)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Boxicon filled with the brand gradient (feature icons). */
export function GradientIcon({ icon: Icon, className }: { icon: IconType; className?: string }) {
  return (
    <Icon
      aria-hidden
      className={cn('size-14', className)}
      style={{ fill: `url(#${ICON_GRADIENT_ID})` }}
    />
  )
}
