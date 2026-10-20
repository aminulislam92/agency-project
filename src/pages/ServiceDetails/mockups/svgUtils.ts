/* Shared constants/helpers for the Service Details UI mockups.
   Mockups always depict a light UI, so they use the raw palette (not the
   semantic, theme-switching colours). */

export const c = {
  white: 'var(--color-white)',
  bg: 'var(--color-gray-100)',
  line: 'var(--color-gray-300)',
  faint: 'var(--color-gray-500)',
  muted: 'var(--color-gray-600)',
  body: 'var(--color-gray-700)',
  title: 'var(--color-gray-800)',
  heading: 'var(--color-gray-900)',
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  info: 'var(--color-info)',
  pink: 'var(--color-accent-pink)',
  sky: 'var(--color-accent-sky)',
  teal: 'var(--color-accent-teal)',
  night: 'var(--color-accent-night)',
  fuchsia: 'var(--color-gradient-to)',
  violet: 'var(--color-gradient-via)',
}

/** Smooth path through points (Catmull-Rom converted to cubic Béziers). */
export function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return ''
  const [first] = points
  let d = `M${first?.[0]} ${first?.[1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    if (!p0 || !p1 || !p2 || !p3) continue
    const cp1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const cp2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${cp1[0]?.toFixed(1)} ${cp1[1]?.toFixed(1)} ${cp2[0]?.toFixed(1)} ${cp2[1]?.toFixed(1)} ${p2[0]} ${p2[1]}`
  }
  return d
}

/** SVG arc segment of a donut between two angles (degrees, 0 = 3 o'clock, clockwise). */
export function donutSegment(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  from: number,
  to: number,
): string {
  const rad = (deg: number) => (deg * Math.PI) / 180
  const point = (r: number, deg: number) =>
    `${(cx + r * Math.cos(rad(deg))).toFixed(2)} ${(cy + r * Math.sin(rad(deg))).toFixed(2)}`
  const large = to - from > 180 ? 1 : 0
  return [
    `M${point(outer, from)}`,
    `A${outer} ${outer} 0 ${large} 1 ${point(outer, to)}`,
    `L${point(inner, to)}`,
    `A${inner} ${inner} 0 ${large} 0 ${point(inner, from)}`,
    'Z',
  ].join(' ')
}
