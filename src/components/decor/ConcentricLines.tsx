import { cn } from '@/lib/cn'

/**
 * Nested rounded chevrons (white, low opacity) on the left of the gradient CTA box.
 * Each line enters at the top edge, bends at a rounded apex and leaves through the
 * left edge. Coordinates are measured from the design in a 420×406 box.
 */
type Point = readonly [number, number]

interface Chevron {
  top: number
  apex: Point
  exit: number
  r: number
}

const CHEVRONS: Chevron[] = [
  { top: 63, apex: [114, 100], exit: 177, r: 34 },
  { top: 117, apex: [166, 123], exit: 246, r: 40 },
  { top: 170, apex: [225, 131], exit: 300, r: 48 },
  { top: 232, apex: [294, 146], exit: 361, r: 56 },
  { top: 309, apex: [386, 169], exit: 470, r: 66 },
]

/** Point at `distance` from `apex`, heading towards `from`. */
function towards(apex: Point, from: Point, distance: number): Point {
  const dx = from[0] - apex[0]
  const dy = from[1] - apex[1]
  const length = Math.hypot(dx, dy)
  return [apex[0] + (dx / length) * distance, apex[1] + (dy / length) * distance]
}

const fmt = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`

/** Straight segments with a quadratic-rounded corner of radius r at the apex. */
function chevronPath({ top, apex, exit, r }: Chevron): string {
  const start: Point = [top, -2]
  const end: Point = [-2, exit]
  return `M${fmt(start)} L${fmt(towards(apex, start, r))} Q${fmt(apex)} ${fmt(towards(apex, end, r))} L${fmt(end)}`
}

const PATHS = CHEVRONS.map(chevronPath)

export function ConcentricLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 406"
      preserveAspectRatio="xMinYMin slice"
      className={cn('pointer-events-none', className)}
      fill="none"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1">
        {PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}
