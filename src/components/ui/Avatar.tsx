import { cn } from '@/lib/cn'

interface AvatarProps {
  name: string
  src?: string
  /** Tailwind size utility, e.g. "size-12" */
  size?: string
  className?: string
}

/** Round avatar; falls back to initials on a tinted circle when there is no photo. */
export function Avatar({ name, src, size = 'size-12', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        className={cn('shrink-0 rounded-full object-cover', size, className)}
      />
    )
  }
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary/12 text-body-s font-bold text-primary',
        size,
        className,
      )}
    >
      {initials}
    </span>
  )
}
