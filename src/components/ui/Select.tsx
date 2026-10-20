import { useId, type ComponentPropsWithRef } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { cn } from '@/lib/cn'
import { fieldBase, labelBase } from './fieldStyles'

export interface SelectOption {
  value: string
  label: string
}

type SelectProps = ComponentPropsWithRef<'select'> & {
  label?: string
  hideLabel?: boolean
  options: SelectOption[]
  /** Shown as a disabled first option when no value is chosen */
  placeholder?: string
  error?: string
  inputSize?: 'md' | 'lg'
  wrapperClassName?: string
}

/** Native <select> styled like Input, with a chevron (keeps full keyboard/screen-reader support). */
export function Select({
  label,
  hideLabel = false,
  options,
  placeholder,
  error,
  inputSize = 'md',
  wrapperClassName,
  className,
  id,
  ...props
}: SelectProps) {
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
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            fieldBase,
            'cursor-pointer appearance-none pr-11 pl-4 invalid:text-placeholder',
            inputSize === 'md' ? 'h-11' : 'h-13',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-heading">
              {option.label}
            </option>
          ))}
        </select>
        <BiChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-title"
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-body-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
