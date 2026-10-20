import type { ReactNode } from 'react'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { cn } from '@/lib/cn'

interface PageHeaderProps {
  title: ReactNode
  breadcrumb: BreadcrumbItem[]
  /** Content aligned to the right of the title on desktop (tabs, filters…) */
  aside?: ReactNode
  className?: string
}

/** Inner-page header: breadcrumb (40px below the navbar) + H1. Place inside a Container. */
export function PageHeader({ title, breadcrumb, aside, className }: PageHeaderProps) {
  return (
    <div className={cn('pt-6 lg:pt-10', className)}>
      <Breadcrumb items={breadcrumb} />
      <div className="mt-6 flex flex-col gap-6 lg:mt-9 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="text-h3 md:text-h2 lg:text-h1">{title}</h1>
        {aside}
      </div>
    </div>
  )
}
