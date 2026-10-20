import { useForm } from 'react-hook-form'
import { BiCheckCircle, BiEnvelope } from 'react-icons/bi'
import { Link } from 'react-router'
import { z } from 'zod'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { getErrorMessage } from '@/lib/errors'
import { zodResolver } from '@/lib/zodResolver'
import { useSubscribeNewsletterMutation } from '@/services/postsApi'

const TOPICS = [
  'Daily Newsletter',
  'Advertising Updates',
  'Week in Review',
  'Event Updates',
  'Startups Weekly',
  'Podcasts',
]

const schema = z.object({
  email: z.email('Please enter a valid email address.'),
  topics: z.array(z.string()).min(1, 'Choose at least one newsletter.'),
})
type FormValues = z.infer<typeof schema>

/** Hand-drawn looping arrow next to the title. */
function LoopArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden>
      <path
        d="M4 14c10-12 30-12 32 2 2 12-12 16-16 8s8-16 18-10c10 6 12 18 8 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="m39 37 7 6 6-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NewsletterSignup() {
  const [subscribe, { isLoading, isSuccess, error, data, reset: resetMutation }] =
    useSubscribeNewsletterMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', topics: ['Advertising Updates'] },
  })

  const onSubmit = handleSubmit(async (values) => {
    resetMutation()
    await subscribe(values)
      .unwrap()
      .then(
        () => reset({ email: '', topics: values.topics }),
        () => undefined,
      )
  })

  return (
    <section aria-labelledby="newsletter-title" className="bg-surface-alt py-20 lg:pt-24 lg:pb-28">
      <Container>
        <Reveal className="mx-auto max-w-214">
          <div className="flex items-center gap-6">
            <h2 id="newsletter-title" className="text-h3 md:text-h2 lg:text-h1">
              Don&apos;t Want to Miss Anything?
            </h2>
            <LoopArrow className="mt-2 hidden h-12 w-14 shrink-0 text-primary sm:block" />
          </div>

          <form noValidate onSubmit={onSubmit} className="mt-10">
            <fieldset className="grid gap-6 md:grid-cols-[13rem_1fr]">
              <legend className="contents">
                <span className="text-h5 text-heading md:max-w-36">Sign up for Newsletters</span>
              </legend>
              <div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {TOPICS.map((topic) => (
                    <Checkbox
                      key={topic}
                      value={topic}
                      label={<span className="text-body-s">{topic}</span>}
                      {...register('topics')}
                    />
                  ))}
                </div>
                {errors.topics && (
                  <p role="alert" className="mt-2 text-body-xs text-danger">
                    {errors.topics.message}
                  </p>
                )}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-16">
              <Input
                type="email"
                label="Email address"
                hideLabel
                autoComplete="email"
                placeholder="Your Email"
                inputSize="lg"
                leftIcon={<BiEnvelope aria-hidden />}
                wrapperClassName="flex-1"
                error={errors.email?.message}
                {...register('email')}
              />
              <Button type="submit" loading={isLoading} className="shrink-0 px-10">
                Subscribe *
              </Button>
            </div>
            <p className="mt-4 text-body-xs text-muted">
              * Yes, I agree to the{' '}
              <Link to="/terms" className="text-primary underline hover:no-underline">
                terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary underline hover:no-underline">
                privacy policy
              </Link>
              .
            </p>
            <div aria-live="polite">
              {isSuccess && (
                <p className="mt-4 flex items-center gap-2 text-body-s text-success">
                  <BiCheckCircle aria-hidden className="size-5" />
                  {data.message}
                </p>
              )}
              {error && <p className="mt-4 text-body-s text-danger">{getErrorMessage(error)}</p>}
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
