import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Item open on first render (default: none) */
  defaultOpenId?: string
  className?: string
}

/**
 * Single-open accordion (spec: white panels, 8px radius, shadow-sm, 16/24 padding,
 * chevron in a round button that fills primary when open).
 * Keyboard: Up/Down/Home/End move between headers; Enter/Space toggle.
 */
export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId)
  const baseId = useId()
  const headersRef = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    const target = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (target === undefined) return
    event.preventDefault()
    headersRef.current[target]?.focus()
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const open = item.id === openId
        const headerId = `${baseId}-header-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div key={item.id} className="rounded-lg bg-card shadow-card">
            <h3>
              <button
                ref={(node) => {
                  headersRef.current[index] = node
                }}
                id={headerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? undefined : item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="group flex w-full items-center justify-between gap-6 rounded-lg px-6 py-4 text-left text-h6 text-heading transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-body-l md:font-extrabold"
              >
                {item.title}
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    open
                      ? 'rotate-180 bg-primary text-white shadow-brand'
                      : 'bg-subtle text-title group-hover:bg-primary/12 group-hover:text-primary',
                  )}
                >
                  <BiChevronDown className="size-5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
