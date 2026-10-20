import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { BiCheck } from 'react-icons/bi'
import { cn } from '@/lib/cn'

type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  label: ReactNode
  error?: string
  wrapperClassName?: string
}

/** Custom-styled checkbox over a real <input type="checkbox"> (keyboard + form friendly). */
export function Checkbox({
  label,
  error,
  wrapperClassName,
  className,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div className={wrapperClassName}>
      <div className="flex items-start gap-3">
        <span className="relative mt-1 inline-flex size-4 shrink-0">
          <input
            id={fieldId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'peer size-4 cursor-pointer appearance-none rounded-sm border border-input bg-card transition-colors checked:border-primary checked:bg-primary hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-danger',
              className,
            )}
            {...props}
          />
          <BiCheck
            aria-hidden
            className="pointer-events-none absolute inset-0 size-4 text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={fieldId} className="cursor-pointer text-body-m text-body select-none">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-body-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
