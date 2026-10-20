import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { BiEnvelope } from 'react-icons/bi'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/cn'
import { getErrorMessage } from '@/lib/errors'
import { zodResolver } from '@/lib/zodResolver'
import { useSubscribeNewsletterMutation } from '@/services/postsApi'

const schema = z.object({
  email: z.email('Please enter a valid email address.'),
})
type FormValues = z.infer<typeof schema>

interface NewsletterFormProps {
  /** "inline": input + attached button (footer). "stacked": full-width button below (sidebar). */
  variant?: 'inline' | 'stacked'
  title?: string
  titleClassName?: string
  buttonLabel?: string
  className?: string
}

export function NewsletterForm({
  variant = 'inline',
  title,
  titleClassName,
  buttonLabel = 'Subscribe',
  className,
}: NewsletterFormProps) {
  const titleId = useId()
  const [subscribe, { isLoading, isSuccess, error, data, reset: resetMutation }] =
    useSubscribeNewsletterMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = handleSubmit(async (values) => {
    resetMutation()
    await subscribe(values)
      .unwrap()
      .then(
        () => reset(),
        () => undefined,
      )
  })

  const inline = variant === 'inline'

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={title ? titleId : undefined}
      className={className}
    >
      {title && (
        <p
          id={titleId}
          className={cn('mb-2 text-body-s font-semibold text-heading', titleClassName)}
        >
          {title}
        </p>
      )}
      <div className={cn(inline ? 'flex' : 'flex flex-col gap-3')}>
        <Input
          type="email"
          label="Email address"
          hideLabel
          autoComplete="email"
          placeholder="Your Email"
          leftIcon={<BiEnvelope aria-hidden />}
          wrapperClassName="flex-1"
          className={cn(inline && 'rounded-r-none')}
          {...register('email')}
          aria-invalid={errors.email ? true : undefined}
        />
        <Button
          type="submit"
          size="md"
          loading={isLoading}
          className={cn(inline ? 'rounded-l-none shadow-none' : 'w-full shadow-none')}
        >
          {buttonLabel}
        </Button>
      </div>
      <div aria-live="polite" className="text-body-xs">
        {errors.email && <p className="mt-1.5 text-danger">{errors.email.message}</p>}
        {error && <p className="mt-1.5 text-danger">{getErrorMessage(error)}</p>}
        {isSuccess && <p className="mt-1.5 text-success">{data.message}</p>}
      </div>
    </form>
  )
}
