import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'white' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-sm px-5 text-body-s', // 36px — navbar "Contact us"
  md: 'h-11 rounded-md px-7 text-body-s', // 44px
  lg: 'h-13 rounded-lg px-8 text-body-m', // 52px — hero / section CTAs
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-brand hover:bg-primary-hover active:translate-y-px',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-brand active:translate-y-px',
  white:
    'bg-white text-gray-900 shadow-secondary hover:bg-gray-100 hover:text-primary active:translate-y-px',
  secondary:
    'border border-border bg-card text-title hover:border-primary hover:text-primary active:translate-y-px',
  ghost: 'text-title hover:bg-subtle hover:text-primary',
}

export function buttonStyles({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
} = {}): string {
  return cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)
}
