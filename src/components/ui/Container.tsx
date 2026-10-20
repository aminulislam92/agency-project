import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

/** 1296px content column (+24px side padding from md, 16px on mobile). */
export function Container({ as: Component = 'div', className, ...props }: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full max-w-site px-4 md:px-6', className)} {...props} />
  )
}
