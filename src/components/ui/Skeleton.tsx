import { cn } from '@/lib/cn'

/** Pulsing placeholder block shown while data loads. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-lg bg-subtle', className)} />
}
