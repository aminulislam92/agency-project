import { useId } from 'react'
import dashboardLogo from '@/assets/images/misc/dashboard-logo.webp'
import memoji from '@/assets/images/misc/memoji.webp'
import { cn } from '@/lib/cn'
import { Dots, T } from './svgParts'
import { c, donutSegment, smoothPath } from './svgUtils'

/* Coordinates measured from the design (1px = 1 unit; origin = top-left of the
   dark sidebar). The right edge intentionally runs past 838px — the section clips it. */

const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEK_X = [173, 235, 297, 359, 418, 477, 537]
const Y_LABELS = ['9,000', '8,000', '7,000', '6,000', '5,000']
const INCOME: [number, number][] = [
  [168, 332],
  [205, 288],
  [244, 290],
  [266, 302],
  [299, 288],
  [333, 266],
  [366, 238],
  [390, 235],
  [416, 266],
  [444, 272],
  [488, 255],
  [527, 255],
  [553, 230],
]
const CAL_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const CAL_X = [620, 644, 667, 690, 714, 737, 758]
const CAL_ROWS = [
  ['31', '1', '2', '3', '4', '5', '6'],
  ['7', '8', '9', '10', '11', '12', '13'],
  ['14', '15', '16', '17', '18', '19', '20'],
  ['21', '22', '23', '24', '25', '26', '27'],
  ['28', '29', '30', '31', '1', '2', '3'],
]
const STATS = [
  { x: 117, label: 'Singles', value: '18', up: true, from: c.pink, to: c.fuchsia },
  { x: 271, label: 'Doubles', value: '20', up: true, from: c.primary, to: c.sky },
  { x: 427, label: 'Mixed Doubles', value: '16', up: false, from: c.teal, to: c.success },
]

/** "What We Offer" dashboard illustration (Service Details). */
export function DashboardMockup({ className }: { className?: string }) {
  const id = useId()
  const linePath = smoothPath(INCOME)
  const last = INCOME[INCOME.length - 1] ?? [553, 230]
  const first = INCOME[0] ?? [168, 332]
  const areaPath = `${linePath} L${last[0]} 380 L${first[0]} 380 Z`

  return (
    <svg
      viewBox="0 0 860 615"
      className={cn('h-auto overflow-visible', className)}
      role="img"
      aria-label="Analytics dashboard designed by Silicon"
    >
      <defs>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="14"
            floodColor={c.heading}
            floodOpacity="0.08"
          />
        </filter>
        <linearGradient id={`${id}-line`} x1="0" x2="1">
          <stop offset="0" style={{ stopColor: c.primary }} />
          <stop offset="1" style={{ stopColor: c.fuchsia }} />
        </linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: c.violet, stopOpacity: 0.12 }} />
          <stop offset="1" style={{ stopColor: c.violet, stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id={`${id}-donut`} x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" style={{ stopColor: c.primary }} />
          <stop offset="1" style={{ stopColor: c.sky }} />
        </linearGradient>
        {STATS.map((stat) => (
          <linearGradient key={stat.label} id={`${id}-${stat.x}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: stat.from }} />
            <stop offset="1" style={{ stopColor: stat.to }} />
          </linearGradient>
        ))}
        <clipPath id={`${id}-avatar`}>
          <circle cx="775" cy="45" r="12" />
        </clipPath>
        <clipPath id={`${id}-frame`}>
          <rect x="0" y="0" width="900" height="521" rx="24" />
        </clipPath>
      </defs>

      {/* Frame: dark sidebar + light canvas */}
      <g clipPath={`url(#${id}-frame)`}>
        <rect x="0" y="0" width="900" height="521" fill={c.bg} />
        <rect x="0" y="0" width="70" height="521" fill={c.night} />
      </g>
      <image href={dashboardLogo} x="19" y="28" width="32" height="32" />
      {[114, 154, 188, 223, 258, 292, 328].map((y, index) => (
        <rect
          key={y}
          x="23"
          y={y}
          width="24"
          height="9"
          rx="4.5"
          fill={c.white}
          fillOpacity={index === 0 ? 1 : 0.25}
        />
      ))}

      {/* Top bar */}
      <rect x="116" y="40" width="140" height="10" rx="5" fill={c.line} />
      <g stroke={c.title} strokeWidth="1.5" fill="none">
        <circle cx="658" cy="44" r="5" />
        <path d="m662 48 4 4" />
      </g>
      <g fill={c.title}>
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <circle key={`${row}-${col}`} cx={686 + col * 5} cy={39 + row * 5} r="1.3" />
          )),
        )}
      </g>
      <rect x="714" y="36" width="30" height="17" rx="5" fill={c.primary} />
      <T x="729" y="48" size={8} weight={700} fill={c.white} textAnchor="middle">
        15
      </T>
      <image href={memoji} x="763" y="33" width="24" height="24" clipPath={`url(#${id}-avatar)`} />

      {/* Stat cards */}
      {STATS.map((stat) => (
        <g key={stat.label}>
          <rect x={stat.x} y="86" width="142" height="71" rx="10" fill={`url(#${id}-${stat.x})`} />
          <circle cx={stat.x + 112} cy="96" r="30" fill={c.white} fillOpacity="0.15" />
          <circle cx={stat.x + 130} cy="140" r="26" fill={c.white} fillOpacity="0.12" />
          <T x={stat.x + 10} y="108" size={9} weight={600} fill={c.white}>
            {stat.label}
          </T>
          <T x={stat.x + 10} y="137" size={17} weight={700} fill={c.white}>
            {stat.value}
          </T>
          <path
            d={
              stat.up
                ? `M${stat.x + 41} 135 v-11 m-4 4 l4 -4 l4 4`
                : `M${stat.x + 41} 124 v11 m-4 -4 l4 4 l4 -4`
            }
            stroke={c.white}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Income chart */}
      <rect x="117" y="181" width="449" height="233" rx="16" fill={c.white} />
      <T x="444" y="206" size={7} weight={600} fill={c.primary} textAnchor="middle">
        Income
      </T>
      <circle cx="444" cy="215" r="2" fill={c.primary} />
      <T x="506" y="206" size={7} fill={c.muted} textAnchor="middle">
        Expenses
      </T>
      {Y_LABELS.map((label, index) => (
        <T key={label} x="133" y={242 + index * 35.5} size={6.5} fill={c.muted}>
          {label}
        </T>
      ))}
      {WEEK.map((day, index) => (
        <T key={day} x={WEEK_X[index]} y="395" size={6.5} fill={c.muted} textAnchor="middle">
          {day}
        </T>
      ))}
      <path d={areaPath} fill={`url(#${id}-area)`} />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#${id}-line)`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Pay schedule */}
      <rect x="591" y="86" width="199" height="248" rx="12" fill={c.white} />
      <T x="610" y="114" size={8} weight={700}>
        Pay Schedule
      </T>
      <T x="610" y="162" size={13} weight={700}>
        August
      </T>
      <T x="772" y="162" size={13} weight={500} textAnchor="end">
        2022
      </T>
      {CAL_DAYS.map((day, index) => (
        <T key={day} x={CAL_X[index]} y="187" size={5.5} fill={c.muted} textAnchor="middle">
          {day}
        </T>
      ))}
      {CAL_ROWS.map((row, rowIndex) =>
        row.map((day, colIndex) => {
          const outside = (rowIndex === 0 && colIndex === 0) || (rowIndex === 4 && colIndex > 3)
          return (
            <T
              key={`${rowIndex}-${colIndex}`}
              x={CAL_X[colIndex]}
              y={208 + rowIndex * 20}
              size={6}
              weight={600}
              fill={outside ? c.faint : c.heading}
              textAnchor="middle"
            >
              {day}
            </T>
          )
        }),
      )}

      {/* Activity cards (cut by the frame) */}
      <g clipPath={`url(#${id}-frame)`}>
        <rect x="117" y="441" width="218" height="100" rx="10" fill={c.white} />
        <rect x="349" y="441" width="219" height="100" rx="10" fill={c.white} />
      </g>
      <circle cx="141" cy="466" r="10" fill={c.teal} />
      <T x="141" y="469" size={8} weight={700} fill={c.white} textAnchor="middle">
        L
      </T>
      <T x="158" y="469" size={7.5} weight={700}>
        Lottie Marsh
      </T>
      <T x="214" y="469" size={6} fill={c.muted}>
        Sent you a coin
      </T>
      <Dots x={319} y={463} />
      <T x="158" y="494" size={8} weight={700} fill={c.success}>
        +380.234
      </T>
      <T x="320" y="494" size={6} fill={c.info} textAnchor="end">
        Open my wallet
      </T>

      <circle cx="374" cy="466" r="10" fill={c.pink} />
      <T x="374" y="469" size={8} weight={700} fill={c.white} textAnchor="middle">
        B
      </T>
      <T x="391" y="469" size={7.5} weight={700}>
        BTC
      </T>
      <T x="413" y="469" size={6} fill={c.muted}>
        News
      </T>
      <Dots x={550} y={463} />
      <path d="M391 494 l3 -5 l3 5 z" fill={c.success} />
      <T x="401" y="494" size={8} weight={700} fill={c.success}>
        +39.69%
      </T>
      <T x="552" y="494" size={6} fill={c.info} textAnchor="end">
        Trade now
      </T>

      {/* Savings card */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="628" y="356" width="232" height="254" rx="16" fill={c.white} />
      </g>
      <T x="653" y="390" size={9} weight={700}>
        Savings
      </T>
      <path d={donutSegment(751, 507, 86, 44, -88, -22)} fill={c.violet} fillOpacity="0.75" />
      <path d={donutSegment(751, 507, 86, 44, 14, 152)} fill={c.fuchsia} fillOpacity="0.85" />
      <path d={donutSegment(751, 507, 86, 44, 152, 272)} fill={`url(#${id}-donut)`} />
      <T x="751" y="503" size={8} fill={c.muted} textAnchor="middle">
        Travel
      </T>
      <T x="751" y="518" size={11} weight={800} textAnchor="middle">
        $480
      </T>
    </svg>
  )
}
