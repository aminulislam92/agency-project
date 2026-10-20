import { useForm } from 'react-hook-form'
import { BiCheckCircle } from 'react-icons/bi'
import { Link } from 'react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/cn'
import { getErrorMessage } from '@/lib/errors'
import { zodResolver } from '@/lib/zodResolver'
import { useSendContactMessageMutation } from '@/services/companyApi'
import { useGetServicesQuery } from '@/services/servicesApi'

const schema = z.object({
  service: z.string(),
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters).'),
  agree: z.boolean(),
})
type FormValues = z.infer<typeof schema>

/** "detailed" adds the service select + terms checkbox and validates them. */
const detailedSchema = schema.extend({
  service: z.string().min(1, 'Please choose a service.'),
  agree: z.literal(true, 'Please accept the Terms & Conditions.'),
})

interface ContactFormProps {
  /** "detailed": service + name + email + message + terms (Services). "simple": name/email side by side + message (Contact). */
  variant?: 'detailed' | 'simple'
  submitLabel?: string
  className?: string
}

export function ContactForm({
  variant = 'detailed',
  submitLabel = 'Send request',
  className,
}: ContactFormProps) {
  const detailed = variant === 'detailed'
  const { data: services } = useGetServicesQuery(undefined, { skip: !detailed })
  const [send, { isLoading, isSuccess, error, data, reset: resetMutation }] =
    useSendContactMessageMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(detailed ? detailedSchema : schema),
    defaultValues: { service: '', name: '', email: '', message: '', agree: false },
  })

  const onSubmit = handleSubmit(async ({ service, name, email, message }) => {
    resetMutation()
    await send({ name, email, message, service: service || undefined })
      .unwrap()
      .then(
        () => reset(),
        () => undefined,
      )
  })

  return (
    <form noValidate onSubmit={onSubmit} className={cn('flex flex-col gap-6.5', className)}>
      {detailed && (
        <Select
          label="Service"
          inputSize="lg"
          required
          placeholder="Choose the service you are interested in"
          options={(services ?? []).map((service) => ({
            value: service.slug,
            label: service.title,
          }))}
          error={errors.service?.message}
          {...register('service')}
        />
      )}

      <div className={cn('grid gap-6.5', !detailed && 'sm:grid-cols-2 sm:gap-6')}>
        <Input
          label="Full name"
          inputSize="lg"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={detailed ? 'Email address' : 'Email'}
          type="email"
          inputSize="lg"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Textarea
        label="Message"
        placeholder={detailed ? 'Tell us about your project' : undefined}
        error={errors.message?.message}
        {...register('message')}
      />

      {detailed && (
        <Checkbox
          wrapperClassName="mt-1.5"
          label={
            <>
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms
              </Link>{' '}
              &amp;{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Conditions
              </Link>
              .
            </>
          }
          error={errors.agree?.message}
          {...register('agree')}
        />
      )}

      <div className={cn(detailed && 'mt-1.5')}>
        <Button type="submit" loading={isLoading}>
          {submitLabel}
        </Button>
        <div aria-live="polite">
          {isSuccess && (
            <p className="mt-4 flex items-center gap-2 text-body-s text-success">
              <BiCheckCircle aria-hidden className="size-5" />
              {data.message}
            </p>
          )}
          {error && <p className="mt-4 text-body-s text-danger">{getErrorMessage(error)}</p>}
        </div>
      </div>
    </form>
  )
}
