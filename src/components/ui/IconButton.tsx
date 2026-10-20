import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'

type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'
type IconButtonVariant = 'card' | 'primary' | 'subtle' | 'ghost'

const sizes: Record<IconButtonSize, string> = {
  xs: 'size-6 text-base', // 24px — accordion chevron
  sm: 'size-9 text-xl', // 36px — bookmark, slider arrows
  md: 'size-11 text-2xl', // 44px — "Discover more"
  lg: 'size-13 text-2xl', // 52px — play button
}

const variants: Record<IconButtonVariant, string> = {
  card: 'bg-card text-title shadow-card hover:text-primary hover:shadow-secondary',
  primary: 'bg-primary text-white shadow-brand hover:bg-primary-hover',
  subtle: 'bg-subtle text-title hover:bg-primary hover:text-white',
  ghost: 'text-title hover:bg-subtle hover:text-primary',
}

type IconButtonProps = ComponentPropsWithRef<'button'> & {
  /** Required: icon-only buttons need an accessible name. */
  label: string
  size?: IconButtonSize
  variant?: IconButtonVariant
  shape?: 'circle' | 'square'
}

export function IconButton({
  label,
  size = 'md',
  variant = 'card',
  shape = 'circle',
  className,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
