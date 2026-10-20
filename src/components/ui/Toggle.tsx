import { cn } from '@/lib/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  /** Accessible name of the switch, e.g. "Dark mode" */
  label: string
  /** Visible text before the switch (e.g. "Light") — clicking it sets `false` */
  offLabel?: string
  /** Visible text after the switch (e.g. "Dark") — clicking it sets `true` */
  onLabel?: string
  className?: string
}

/** 46×24 switch (spec: Toggle Light/Dark). */
export function Toggle({ checked, onChange, label, offLabel, onLabel, className }: ToggleProps) {
  const textClass =
    'cursor-pointer text-nav text-body select-none transition-colors hover:text-primary'

  return (
    <div className={cn('inline-flex items-center gap-3.5', className)}>
      {offLabel && (
        <span aria-hidden className={textClass} onClick={() => onChange(false)}>
          {offLabel}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11.5 shrink-0 items-center rounded-xl bg-primary transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span
          aria-hidden
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-secondary transition-transform duration-200',
            checked && 'translate-x-5.5',
          )}
        />
      </button>
      {onLabel && (
        <span aria-hidden className={textClass} onClick={() => onChange(true)}>
          {onLabel}
        </span>
      )}
    </div>
  )
}
