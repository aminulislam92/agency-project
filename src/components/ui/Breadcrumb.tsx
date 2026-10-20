import { BiChevronsRight, BiHomeAlt } from 'react-icons/bi'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

export interface BreadcrumbItem {
  label: string
  /** Omit for the current page */
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  /** Light text for use over dark images */
  inverted?: boolean
}

/** "⌂ Homepage » … » Current" trail. The homepage link is added automatically. */
export function Breadcrumb({ items, className, inverted = false }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = [{ label: 'Homepage', to: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-s">
        {trail.map((item, index) => {
          const current = index === trail.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-3">
              {index > 0 && (
                <BiChevronsRight
                  aria-hidden
                  className={cn('size-4', inverted ? 'text-white/60' : 'text-muted')}
                />
              )}
              {item.to && !current ? (
                <Link
                  to={item.to}
                  className={cn(
                    'flex items-center gap-1 rounded-sm transition-colors hover:text-primary',
                    inverted ? 'text-white/70' : 'text-muted',
                  )}
                >
                  {index === 0 && <BiHomeAlt aria-hidden className="size-4" />}
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-primary">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
