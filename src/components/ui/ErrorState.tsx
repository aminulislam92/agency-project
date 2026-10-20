import { BiErrorCircle, BiRefresh } from 'react-icons/bi'
import { cn } from '@/lib/cn'
import { Button } from './Button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

/** Inline error panel for failed queries, with an optional retry action. */
export function ErrorState({
  message = "We couldn't load this content.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center',
        className,
      )}
    >
      <BiErrorCircle aria-hidden className="size-10 text-danger" />
      <p className="text-body-m text-body">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="md"
          onClick={onRetry}
          leftIcon={<BiRefresh aria-hidden className="size-5" />}
        >
          Try again
        </Button>
      )}
    </div>
  )
}
