import type { ReactNode, SVGProps } from 'react'
import { c } from './svgUtils'

/* Small SVG building blocks shared by the Service Details UI mockups. */

type TextProps = SVGProps<SVGTextElement> & {
  children: ReactNode
  size?: number
  weight?: number
}

/** <text> preset with the site font. */
export function T({ size = 8, weight = 500, fill = c.heading, children, ...props }: TextProps) {
  return (
    <text fontFamily="var(--font-sans)" fontSize={size} fontWeight={weight} fill={fill} {...props}>
      {children}
    </text>
  )
}

/** Circular photo using an existing clipPath id. */
export function Avatar({
  href,
  cx,
  cy,
  r,
  clipId,
  ring = true,
}: {
  href: string
  cx: number
  cy: number
  r: number
  clipId: string
  ring?: boolean
}) {
  return (
    <g>
      <clipPath id={clipId}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      {ring && <circle cx={cx} cy={cy} r={r + 1.5} fill={c.white} />}
      <image
        href={href}
        x={cx - r}
        y={cy - r}
        width={r * 2}
        height={r * 2}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  )
}

/** Three-dot vertical menu icon. */
export function Dots({ x, y, fill = c.title }: { x: number; y: number; fill?: string }) {
  return (
    <g fill={fill}>
      <circle cx={x} cy={y - 4} r={1.2} />
      <circle cx={x} cy={y} r={1.2} />
      <circle cx={x} cy={y + 4} r={1.2} />
    </g>
  )
}
