import { useId } from 'react'
import { cn } from '@/lib/cn'

/**
 * Five thin rounded "L" lines from the Home hero. Each starts with a vertical stroke
 * that runs off the bottom and a horizontal stroke that runs off the right edge,
 * so the parent must clip overflow. Offsets measured from the design (px).
 */
const LINES = [
  { x: 0, y: 0, r: 92 },
  { x: 96, y: 88, r: 96 },
  { x: 172, y: 164, r: 88 },
  { x: 239, y: 232, r: 76 },
  { x: 300, y: 290, r: 66 },
]
const LENGTH = 2000

export function GradientLines({ className }: { className?: string }) {
  const id = useId()
  const gradient = `${id}-stroke`

  return (
    <svg
      width={LENGTH}
      height={LENGTH}
      viewBox={`0 0 ${LENGTH} ${LENGTH}`}
      className={cn('pointer-events-none overflow-visible', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-gradient-to)', stopOpacity: 0.45 }} />
          <stop offset="0.35" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: 'var(--color-gradient-to)', stopOpacity: 0.4 }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradient})`} strokeWidth="1">
        {LINES.map(({ x, y, r }) => (
          <path
            key={`${x}-${y}`}
            d={`M${x + 0.5} ${LENGTH} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y + 0.5} H${LENGTH}`}
          />
        ))}
      </g>
    </svg>
  )
}
