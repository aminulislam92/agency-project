import { useId, type ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'
import { fieldBase, labelBase } from './fieldStyles'

type TextareaProps = ComponentPropsWithRef<'textarea'> & {
  label?: string
  hideLabel?: boolean
  error?: string
  wrapperClassName?: string
}

export function Textarea({
  label,
  hideLabel = false,
  error,
  wrapperClassName,
  className,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={fieldId} className={cn(labelBase, hideLabel && 'sr-only')}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldBase, 'block min-h-26 resize-y px-4 py-3', className)}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-body-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
