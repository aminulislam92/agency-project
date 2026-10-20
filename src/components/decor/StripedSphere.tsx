import { useId } from 'react'
import { cn } from '@/lib/cn'

/* ---------------------------------------------------------------------------
 * Geometry: a unit sphere whose "north pole" tilts towards the viewer's upper
 * left. Alternate longitude bands are projected orthographically onto the
 * screen; only the hemisphere facing the viewer (z >= 0) is drawn. A slight
 * twist bends the bands into the swirl seen in the design.
 * ------------------------------------------------------------------------- */

type Vec3 = [number, number, number]

const SIZE = 636
const RADIUS = SIZE / 2
const BANDS = 34
const BAND_FILL = 0.56 // share of each band slot that is coloured
const TWIST = 0.95 // radians of longitude added from pole to equator
const STEP = Math.PI / 90

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z)
  return [x / length, y / length, z / length]
}
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]

// Pole measured from the design: (-0.41, -0.60) of the radius from the centre
const POLE = normalize([-0.41, -0.6, 0.69])
const U = normalize(cross(POLE, [0, 0, 1]))
const V = cross(POLE, U)

function project(lat: number, lon: number): Vec3 {
  const c = Math.cos(lat)
  const s = Math.sin(lat)
  const cl = Math.cos(lon)
  const sl = Math.sin(lon)
  return [
    s * POLE[0] + c * (cl * U[0] + sl * V[0]),
    s * POLE[1] + c * (cl * U[1] + sl * V[1]),
    s * POLE[2] + c * (cl * U[2] + sl * V[2]),
  ]
}

const toScreen = ([x, y]: Vec3) =>
  `${(RADIUS + x * RADIUS).toFixed(1)} ${(RADIUS + y * RADIUS).toFixed(1)}`

/** Points along one meridian, from the pole until it disappears behind the sphere. */
function meridian(lon0: number): Vec3[] {
  const points: Vec3[] = []
  let previous: Vec3 | undefined
  for (let lat = Math.PI / 2; lat >= -Math.PI / 2; lat -= STEP) {
    const twist = TWIST * (1 - lat / (Math.PI / 2))
    const point = project(lat, lon0 + twist)
    if (point[2] < 0) {
      if (previous) {
        // interpolate the crossing of the silhouette (z = 0)
        const t = previous[2] / (previous[2] - point[2])
        const edge: Vec3 = [
          previous[0] + (point[0] - previous[0]) * t,
          previous[1] + (point[1] - previous[1]) * t,
          0,
        ]
        const scale = 1 / Math.hypot(edge[0], edge[1])
        points.push([edge[0] * scale, edge[1] * scale, 0])
      }
      break
    }
    points.push(point)
    previous = point
  }
  return points
}

function bandPath(index: number): string {
  const slot = (Math.PI * 2) / BANDS
  const a = meridian(index * slot)
  const b = meridian(index * slot + slot * BAND_FILL).reverse()
  const start = a[0]
  const endA = a[a.length - 1]
  const startB = b[0]
  if (!start || !endA || !startB) return ''
  // Join the two meridians along the silhouette arc
  const sweep = endA[0] * startB[1] - endA[1] * startB[0] > 0 ? 1 : 0
  return [
    `M${toScreen(start)}`,
    ...a.slice(1).map((p) => `L${toScreen(p)}`),
    `A${RADIUS} ${RADIUS} 0 0 ${sweep} ${toScreen(startB)}`,
    ...b.slice(1).map((p) => `L${toScreen(p)}`),
    'Z',
  ].join(' ')
}

const BAND_PATHS = Array.from({ length: BANDS }, (_, index) => bandPath(index))

/** Gradient striped sphere from the Home hero (636×636). */
export function StripedSphere({ className }: { className?: string }) {
  const id = useId()
  const fill = `${id}-fill`
  const base = `${id}-base`
  const shade = `${id}-shade`

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={cn('overflow-visible', className)} aria-hidden>
      <defs>
        <linearGradient id={fill} x1="120" y1="60" x2="520" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: 'var(--color-gradient-to)', stopOpacity: 0.3 }} />
          <stop
            offset="0.5"
            style={{ stopColor: 'var(--color-gradient-via)', stopOpacity: 0.42 }}
          />
          <stop offset="1" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.68 }} />
        </linearGradient>
        <radialGradient id={base} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" style={{ stopColor: 'var(--color-white)', stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: 'var(--color-gray-200)', stopOpacity: 0.9 }} />
        </radialGradient>
        <radialGradient id={shade} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0.6" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.12 }} />
        </radialGradient>
      </defs>
      <circle
        cx={RADIUS}
        cy={RADIUS}
        r={RADIUS}
        fill={`url(#${base})`}
        className="dark:opacity-15"
      />
      <g fill={`url(#${fill})`}>
        {BAND_PATHS.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      <circle cx={RADIUS} cy={RADIUS} r={RADIUS} fill={`url(#${shade})`} />
    </svg>
  )
}
