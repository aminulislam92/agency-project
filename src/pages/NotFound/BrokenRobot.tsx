import { cn } from '@/lib/cn'

/* Simplified vector recreation of the 404 illustration: a robot walking away with
   its arm fallen off, spare parts scattered around. 480×640 box, positions measured
   from the design. Colours come from the brand palette. */

const c = {
  main: 'var(--color-primary)',
  light: 'color-mix(in srgb, var(--color-primary) 45%, white)',
  pale: 'color-mix(in srgb, var(--color-primary) 22%, white)',
  steel: 'color-mix(in srgb, var(--color-primary) 30%, var(--color-gray-300))',
  dark: 'var(--color-gray-800)',
  ink: 'var(--color-gray-900)',
  spark: 'var(--color-warning)',
  white: 'var(--color-white)',
}

export function BrokenRobot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 640"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="A broken robot walking away, its parts scattered on the floor"
    >
      {/* floor shadow */}
      <ellipse cx="290" cy="488" rx="150" ry="13" fill={c.pale} />

      {/* back leg */}
      <path d="M196 318 L190 470" stroke={c.light} strokeWidth="22" strokeLinecap="round" />
      <path d="M196 340 l-1 22 M194 380 l-1 22 M192 420 l-1 22" stroke={c.main} strokeWidth="3" />
      <path d="M168 470 q20 -16 46 0 v10 h-46z" fill={c.ink} />

      {/* front leg */}
      <path
        d="M262 318 L322 372 L352 430"
        stroke={c.light}
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M282 336 l14 14 M304 356 l12 12 M330 386 l8 16 M342 410 l6 12"
        stroke={c.main}
        strokeWidth="3"
      />
      <path d="M338 432 q24 -6 30 14 l-6 8 q-20 -2 -28 -14z" fill={c.ink} />

      {/* body */}
      <g transform="rotate(-6 225 230)">
        <rect x="150" y="140" width="150" height="182" rx="22" fill={c.light} />
        <rect
          x="150"
          y="140"
          width="150"
          height="182"
          rx="22"
          fill="none"
          stroke={c.main}
          strokeWidth="3"
        />
        <path d="M150 290 h150" stroke={c.main} strokeWidth="5" />
        {/* QR-like chest panel */}
        <rect x="186" y="196" width="66" height="62" rx="4" fill={c.white} />
        <g fill={c.ink}>
          <rect x="192" y="202" width="16" height="16" />
          <rect x="230" y="202" width="16" height="16" />
          <rect x="192" y="236" width="16" height="16" />
          <rect x="214" y="216" width="10" height="10" />
          <rect x="226" y="232" width="12" height="20" />
          <rect x="212" y="242" width="8" height="10" />
        </g>
        {/* empty arm socket */}
        <circle cx="290" cy="178" r="12" fill={c.main} />
        <circle cx="290" cy="178" r="5" fill={c.ink} />
      </g>

      {/* hanging left arm + glove */}
      <path d="M158 200 L142 300" stroke={c.steel} strokeWidth="16" strokeLinecap="round" />
      <path d="M128 296 q14 -8 28 2 l-2 40 q-6 8 -12 0 l-4 -12 -4 14 q-8 4 -10 -6z" fill={c.dark} />

      {/* loose wire with sparks at the shoulder */}
      <path
        d="M140 186 q-18 6 -10 20 q10 12 -6 22"
        fill="none"
        stroke={c.spark}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g stroke={c.spark} strokeWidth="2.5" strokeLinecap="round">
        <path d="M318 150 l12 -10 M324 170 l16 -2 M318 190 l12 8" />
        <path d="M262 112 l8 -12 M278 120 l12 -6" />
        <path d="M118 176 l-10 -8 M114 194 l-14 0" />
      </g>

      {/* neck + head (tilted down) */}
      <rect x="196" y="122" width="34" height="26" rx="6" fill={c.steel} />
      <g transform="rotate(-18 160 110)">
        <rect x="102" y="52" width="120" height="104" rx="26" fill={c.main} />
        <rect x="150" y="52" width="72" height="104" rx="26" fill={c.light} />
        <circle cx="128" cy="104" r="22" fill={c.ink} />
        <circle cx="128" cy="104" r="12" fill={c.white} />
        <circle cx="130" cy="106" r="6" fill={c.ink} />
        <circle cx="206" cy="80" r="12" fill={c.white} />
        <circle cx="206" cy="80" r="6" fill={c.main} />
        {/* antenna */}
        <rect x="150" y="22" width="22" height="34" rx="6" fill={c.steel} />
        <rect x="146" y="14" width="30" height="12" rx="6" fill={c.main} />
      </g>

      {/* scattered parts */}
      {/* broken chest plate */}
      <path d="M20 500 l84 -14 l24 22 l-30 18 h-60 q-20 -10 -18 -26z" fill={c.light} />
      <path d="M20 500 l84 -14 l24 22" fill="none" stroke={c.main} strokeWidth="3" />
      <circle cx="58" cy="514" r="3" fill={c.main} />
      {/* wrench */}
      <g transform="rotate(-24 100 560)">
        <rect
          x="40"
          y="552"
          width="110"
          height="14"
          rx="7"
          fill={c.pale}
          stroke={c.light}
          strokeWidth="3"
        />
        <path
          d="M150 548 a16 16 0 1 1 0 22 l10 -11z"
          fill={c.pale}
          stroke={c.light}
          strokeWidth="3"
        />
        <path
          d="M40 549 a14 14 0 1 0 0 20 l-8 -10z"
          fill={c.pale}
          stroke={c.light}
          strokeWidth="3"
        />
      </g>
      {/* bolt */}
      <rect x="196" y="526" width="34" height="8" rx="2" fill={c.light} />
      <rect x="188" y="520" width="12" height="20" rx="3" fill={c.main} />
      {/* spring */}
      <path
        d="M286 528 q8 -18 16 0 q8 18 16 0 q8 -18 16 0 q8 18 16 0"
        fill="none"
        stroke={c.ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* fallen glove */}
      <path
        d="M200 572 q22 -8 44 4 l18 24 q4 12 -8 12 l-10 -10 6 20 q-4 10 -14 2 l-30 -26z"
        fill={c.dark}
      />
      {/* fallen forearm tube */}
      <g transform="rotate(-20 380 560)">
        <rect x="320" y="540" width="130" height="40" rx="20" fill={c.main} />
        <path d="M344 540 v40 M372 540 v40 M400 540 v40" stroke={c.light} strokeWidth="3" />
        <ellipse cx="444" cy="560" rx="8" ry="20" fill={c.light} />
      </g>
      {/* small piece */}
      <path d="M430 500 l20 -8 l14 12 l-18 10z" fill={c.steel} stroke={c.main} strokeWidth="2" />
    </svg>
  )
}
