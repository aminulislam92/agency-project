import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { fieldBase, labelBase } from './fieldStyles'

type InputProps = ComponentPropsWithRef<'input'> & {
  label?: string
  /** Visually hide the label but keep it for screen readers */
  hideLabel?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
  hint?: string
  inputSize?: 'md' | 'lg'
  /** Classes for the outer wrapper */
  wrapperClassName?: string
}

/** 44px text input with optional icons, label and error message (spec: Input). */
export function Input({
  label,
  hideLabel = false,
  leftIcon,
  rightIcon,
  error,
  hint,
  inputSize = 'md',
  wrapperClassName,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={inputId} className={cn(labelBase, hideLabel && 'sr-only')}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl text-placeholder">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            fieldBase,
            inputSize === 'md' ? 'h-11' : 'h-13',
            leftIcon ? 'pl-11' : 'pl-4',
            rightIcon ? 'pr-11' : 'pr-4',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-placeholder">
            {rightIcon}
          </span>
        )}
      </div>
      {(error ?? hint) && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('mt-1 text-body-xs', error ? 'text-danger' : 'text-muted')}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
