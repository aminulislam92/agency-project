import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/** 22px category chip — primary text on primary/12% (spec: Badge). */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5.5 items-center rounded-sm bg-primary/12 px-2 text-body-xs font-semibold whitespace-nowrap text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}
