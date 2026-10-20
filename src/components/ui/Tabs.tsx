import { useRef, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  /** Accessible name of the tab list */
  label: string
  /** id of the element the tabs control (role="tabpanel") */
  panelId: string
  className?: string
}

/**
 * Underlined filter tabs (WAI-ARIA tabs pattern, automatic activation):
 * Left/Right/Home/End move and select; only the active tab is in the tab order.
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  panelId,
  className,
}: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (target === undefined) return
    event.preventDefault()
    const item = items[target]
    if (!item) return
    onChange(item.value)
    refs.current[target]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        '-mx-4 flex [scrollbar-width:none] overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0',
        className,
      )}
    >
      {items.map((item, index) => {
        const selected = item.value === value
        return (
          <button
            key={item.value}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${item.value}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              '-mb-px shrink-0 border-b px-4 pb-4 text-nav whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
              selected
                ? 'border-primary text-primary'
                : 'border-transparent text-title hover:text-primary',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
