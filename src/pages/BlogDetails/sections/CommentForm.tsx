import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { getErrorMessage } from '@/lib/errors'
import { zodResolver } from '@/lib/zodResolver'
import { useAddCommentMutation } from '@/services/postsApi'

const AUTHOR_KEY = 'silicon-comment-author'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email('Please enter a valid email address.'),
  text: z.string().trim().min(3, 'Please write a comment.'),
  remember: z.boolean(),
})
type FormValues = z.infer<typeof schema>

export interface ReplyTarget {
  /** Thread root id */
  parentId: string
  /** Author being replied to */
  name: string
}

function readSavedAuthor(): { name: string; email: string } | null {
  try {
    const raw = localStorage.getItem(AUTHOR_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { name?: unknown; email?: unknown }
    return typeof parsed.name === 'string' && typeof parsed.email === 'string'
      ? { name: parsed.name, email: parsed.email }
      : null
  } catch {
    return null
  }
}

interface CommentFormProps {
  postSlug: string
  replyTo: ReplyTarget | null
  onCancelReply: () => void
}

export function CommentForm({ postSlug, replyTo, onCancelReply }: CommentFormProps) {
  const [addComment, { isLoading, isSuccess, error, reset: resetMutation }] =
    useAddCommentMutation()
  const saved = readSavedAuthor()
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: saved?.name ?? '',
      email: saved?.email ?? '',
      text: '',
      remember: saved !== null,
    },
  })

  // Focus the comment box when the user clicks "Reply"
  useEffect(() => {
    if (replyTo) textRef.current?.focus()
  }, [replyTo])

  const onSubmit = handleSubmit(async ({ name, email, text, remember }) => {
    resetMutation()
    try {
      if (remember) localStorage.setItem(AUTHOR_KEY, JSON.stringify({ name, email }))
      else localStorage.removeItem(AUTHOR_KEY)
    } catch {
      /* storage unavailable */
    }
    await addComment({
      postSlug,
      name,
      email,
      text,
      parentId: replyTo?.parentId ?? null,
      replyTo: replyTo?.name,
    })
      .unwrap()
      .then(
        () => {
          resetField('text')
          onCancelReply()
        },
        () => undefined,
      )
  })

  const textField = register('text')

  return (
    <section
      id="leave-comment"
      aria-labelledby="leave-comment-title"
      className="scroll-mt-28 rounded-lg bg-surface-alt px-6 py-10 sm:px-12 lg:px-27.5 lg:pt-20 lg:pb-16"
    >
      <h2 id="leave-comment-title" className="text-h4 md:text-h3 lg:text-h2">
        Leave a Comment
      </h2>

      {replyTo && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary/12 py-1 pr-1 pl-3 text-body-s text-primary">
          Replying to <strong>@{replyTo.name}</strong>
          <button
            type="button"
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="inline-flex size-6 items-center justify-center rounded-sm hover:bg-primary hover:text-white"
          >
            <BiX aria-hidden />
          </button>
        </p>
      )}

      <form noValidate onSubmit={onSubmit} className="mt-6 space-y-6 lg:mt-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Name"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <Textarea
          label="Comment"
          placeholder="Type your comment here..."
          error={errors.text?.message}
          {...textField}
          ref={(node) => {
            textField.ref(node)
            textRef.current = node
          }}
        />
        <Checkbox
          label="Save my name and email in this browser for the next time I comment."
          {...register('remember')}
        />
        <div>
          <Button type="submit" loading={isLoading}>
            Post comment
          </Button>
          <div aria-live="polite">
            {isSuccess && (
              <p className="mt-4 text-body-s text-success">Thanks! Your comment was posted.</p>
            )}
            {error && <p className="mt-4 text-body-s text-danger">{getErrorMessage(error)}</p>}
          </div>
        </div>
      </form>
    </section>
  )
}
