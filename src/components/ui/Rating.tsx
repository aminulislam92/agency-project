import { BiSolidStar, BiStar } from 'react-icons/bi'
import { cn } from '@/lib/cn'

interface RatingProps {
  value: number
  max?: number
  className?: string
  starClassName?: string
}

/** Read-only star rating (spec: warning #FFBA08 stars). */
export function Rating({ value, max = 5, className, starClassName }: RatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
      className={cn('flex items-center gap-1 text-warning', className)}
    >
      {Array.from({ length: max }, (_, index) =>
        index < value ? (
          <BiSolidStar key={index} aria-hidden className={cn('size-4', starClassName)} />
        ) : (
          <BiStar key={index} aria-hidden className={cn('size-4 text-gray-400', starClassName)} />
        ),
      )}
    </div>
  )
}
