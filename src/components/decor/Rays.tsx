import { cn } from '@/lib/cn'

interface RaysProps {
  /** Corner the rays fan out from */
  origin?: 'top-right' | 'bottom-left' | 'top-left'
  className?: string
}

const positions = {
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'top-left': '0% 0%',
}

/** Soft sunburst rays fading out from a corner (hero background, CTA box). */
export function Rays({ origin = 'top-right', className }: RaysProps) {
  const at = positions[origin]
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: `repeating-conic-gradient(from 0deg at ${at}, currentColor 0deg 1.6deg, transparent 1.6deg 4.5deg)`,
        maskImage: `radial-gradient(circle at ${at}, black 0%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle at ${at}, black 0%, transparent 70%)`,
      }}
    />
  )
}
