import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  /** Size of the title; "h1" = 40px desktop (default), "h2" = 32px */
  size?: 'h1' | 'h2'
  id?: string
  className?: string
  subtitleClassName?: string
}

const titleSizes = {
  h1: 'text-h3 md:text-h2 lg:text-h1',
  h2: 'text-h4 md:text-h3 lg:text-h2',
}

/** Section title (+ optional muted subtitle). */
export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  size = 'h1',
  id,
  className,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <Tag id={id} className={titleSizes[size]}>
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-body-m text-muted md:mt-6 md:text-body-l',
            align === 'center' && 'mx-auto',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
