import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { cn } from '@/lib/cn'

interface PaginationProps {
  /** 1-based current page */
  page: number
  totalPages: number
  onChange: (page: number) => void
  /** Accessible name, e.g. "Blog pages" or "Testimonials" */
  label?: string
  /** Name used in item labels: "Go to page 3" / "Go to slide 3" */
  itemName?: string
  className?: string
}

const itemBase =
  'inline-flex size-9 items-center justify-center rounded-md text-body-s font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/** Numbered pagination with prev/next arrows (spec: 36px squares, active = primary). */
export function Pagination({
  page,
  totalPages,
  onChange,
  label = 'Pagination',
  itemName = 'page',
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null
  const pages = getPageList(page, totalPages)
  const arrow =
    'inline-flex size-6 items-center justify-center rounded-sm text-xl text-title transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-primary'

  return (
    <nav aria-label={label} className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        className={arrow}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={`Previous ${itemName}`}
      >
        <BiChevronLeft aria-hidden />
      </button>
      <ul className="flex items-center gap-2">
        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`e${index}`} aria-hidden className="w-6 text-center text-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Go to ${itemName} ${item}`}
                className={cn(
                  itemBase,
                  item === page
                    ? 'bg-primary text-white shadow-brand'
                    : 'text-title hover:bg-subtle hover:text-primary',
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        className={arrow}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={`Next ${itemName}`}
      >
        <BiChevronRight aria-hidden />
      </button>
    </nav>
  )
}

/** 1 … 4 5 6 … 10 — keeps at most 7 entries. */
function getPageList(page: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total]
  if (page >= total - 3) return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total]
  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', total]
}
