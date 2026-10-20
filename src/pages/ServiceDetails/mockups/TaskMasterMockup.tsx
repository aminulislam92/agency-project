import { useId } from 'react'
import manCyan from '@/assets/images/people/man-cyan.webp'
import manGlassesDenim from '@/assets/images/people/man-glasses-denim.webp'
import manGreen from '@/assets/images/people/man-green.webp'
import manSuit from '@/assets/images/people/man-suit.webp'
import womanBubblegum from '@/assets/images/people/woman-bubblegum.webp'
import { cn } from '@/lib/cn'
import { Avatar, Dots, T } from './svgParts'
import { c } from './svgUtils'

/* 638×428 box, coordinates measured from the design. */

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_X = [68, 100, 133, 166, 199, 230, 259]
const WEEKS = [
  ['30', '31', '1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10', '11', '12'],
]

/** "Task Master" productivity app illustration (Service Details). */
export function TaskMasterMockup({ className }: { className?: string }) {
  const id = useId()
  const team = [womanBubblegum, manGreen, manGlassesDenim, manCyan]

  return (
    <svg
      viewBox="0 0 638 428"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Task management app designed by Silicon"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: c.primary, stopOpacity: 0.06 }} />
          <stop offset="1" style={{ stopColor: c.bg }} />
        </linearGradient>
        <linearGradient id={`${id}-pen`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: c.primary }} />
          <stop offset="1" style={{ stopColor: c.fuchsia }} />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor={c.heading}
            floodOpacity="0.08"
          />
        </filter>
        <clipPath id={`${id}-box`}>
          <rect width="638" height="428" rx="8" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-box)`}>
        <rect width="638" height="428" fill={`url(#${id}-bg)`} />

        <T x="40" y="80" size={20} weight={800}>
          Task Master
        </T>
        <path
          d="M183 82 l14 -14 l4 4 l-14 14 z M181 84 l2 -2 l4 4 l-2 2 z"
          fill={`url(#${id}-pen)`}
        />
        <circle cx="178" cy="74" r="2" fill={c.fuchsia} />

        {/* Profile column */}
        <rect
          x="40"
          y="120"
          width="248"
          height="330"
          rx="8"
          fill={c.white}
          filter={`url(#${id}-shadow)`}
        />
        <Avatar href={manSuit} cx={79} cy={158} r={15} clipId={`${id}-a0`} ring={false} />
        <T x="102" y="154" size={9} weight={700}>
          John Doe
        </T>
        <T x="102" y="168" size={7} fill={c.muted}>
          UI/UX Designer
        </T>
        <path
          d="M236 154 a5 5 0 0 1 9 0 v4 l2 2 h-13 l2 -2 z"
          fill="none"
          stroke={c.violet}
          strokeWidth="1.4"
        />

        <rect x="60" y="188" width="205" height="53" rx="6" fill={c.bg} />
        <T x="76" y="210" size={7.5} weight={700}>
          Project time tracker
        </T>
        <T x="76" y="225" size={6.5} fill={c.muted}>
          You can start tracking
        </T>
        <circle cx="240" cy="214" r="9" fill={c.white} />
        <path d="M238 210 l5 4 l-5 4 z" fill={c.heading} />

        <T x="62" y="270" size={6.5} fill={c.muted}>
          April 10, 2021
        </T>
        <T x="62" y="291" size={12} weight={800}>
          Today
        </T>
        <rect x="196" y="264" width="69" height="29" rx="4" fill={c.primary} />
        <T x="230.5" y="282" size={7} weight={600} fill={c.white} textAnchor="middle">
          + Add task
        </T>
        {WEEKDAYS.map((day, index) => (
          <T key={day} x={DAY_X[index]} y="316" size={6} fill={c.muted} textAnchor="middle">
            {day}
          </T>
        ))}
        {WEEKS.map((week, row) =>
          week.map((day, col) => (
            <T
              key={`${row}-${col}`}
              x={DAY_X[col]}
              y={332 + row * 17}
              size={6.5}
              weight={600}
              fill={col === 5 && row === 1 ? c.primary : row === 0 && col < 2 ? c.faint : c.heading}
              textAnchor="middle"
            >
              {day}
            </T>
          )),
        )}
        <circle cx="230" cy="355" r="1.5" fill={c.primary} />
        <path d="M66 373 V440" stroke={c.line} strokeWidth="1.5" />
        <circle cx="66" cy="373" r="4" fill={c.primary} />

        <rect
          x="92"
          y="370"
          width="218"
          height="80"
          rx="8"
          fill={c.white}
          filter={`url(#${id}-shadow)`}
        />
        <T x="109" y="396" size={8} weight={700}>
          Team Meeting
        </T>
        <T x="292" y="396" size={7} fill={c.body} textAnchor="end">
          9:00 AM
        </T>
        <T x="109" y="410" size={6.5} fill={c.muted}>
          Posuere non amet vivamus
        </T>

        {/* Make Prototypes card */}
        <rect
          x="255"
          y="55"
          width="333"
          height="172"
          rx="8"
          fill={c.white}
          filter={`url(#${id}-shadow)`}
        />
        <T x="279" y="91" size={10.5} weight={700}>
          Make Prototypes
        </T>
        <T x="279" y="111" size={7.5} fill={c.muted}>
          Ipsum malesuada id ac, quis cursus
        </T>
        <Dots x={560} y={86} />
        {team.slice(0, 3).map((photo, index) => (
          <Avatar
            key={photo}
            href={photo}
            cx={292 + index * 21}
            cy={144}
            r={10}
            clipId={`${id}-b${index}`}
          />
        ))}
        <T x="279" y="187" size={8} weight={600}>
          Progress
        </T>
        <T x="563" y="187" size={8} weight={700} textAnchor="end">
          45%
        </T>
        <rect x="279" y="198" width="284" height="4" rx="2" fill={c.line} />
        <rect x="279" y="198" width={284 * 0.45} height="4" rx="2" fill={c.success} />

        {/* Team Meeting card (runs off the right edge) */}
        <rect
          x="372"
          y="211"
          width="300"
          height="126"
          rx="8"
          fill={c.white}
          filter={`url(#${id}-shadow)`}
        />
        <T x="393" y="245" size={10} weight={700}>
          Team Meeting
        </T>
        <T x="610" y="245" size={8.5} fill={c.body} textAnchor="end">
          9:00 AM
        </T>
        <T x="393" y="264" size={7.5} fill={c.muted}>
          Posuere non amet vivamus
        </T>
        {team.map((photo, index) => (
          <Avatar
            key={photo}
            href={photo}
            cx={405 + index * 21}
            cy={301}
            r={10}
            clipId={`${id}-c${index}`}
          />
        ))}
        <circle cx="619" cy="301" r="12" fill={c.success} />
        <path
          d="m613 301 4 4 8 -8"
          fill="none"
          stroke={c.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
