import { useState } from 'react'
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/IconButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { formatPostDate } from '@/lib/format'
import type { PostSummary } from '@/types'

interface BlogCardProps {
  post: PostSummary
  layout?: 'vertical' | 'horizontal'
  /** Image aspect ratio class for the vertical layout (default 416×300) */
  imageAspect?: string
  /** Show the author's role under the name */
  showRole?: boolean
  className?: string
}

/**
 * Blog post card (spec: white, 8px radius, shadow-sm; bookmark button on the image;
 * badge + date; H5 title; divider; author). The whole card is clickable via a stretched link.
 */
export function BlogCard({
  post,
  layout = 'vertical',
  imageAspect = 'aspect-[416/300]',
  showRole = true,
  className,
}: BlogCardProps) {
  const [saved, setSaved] = useState(false)
  const horizontal = layout === 'horizontal'
  const href = `/blog/${post.slug}`

  return (
    <article
      className={cn(
        'group relative flex overflow-hidden rounded-lg bg-card shadow-card transition-shadow duration-300 hover:shadow-secondary',
        horizontal ? 'flex-col sm:flex-row' : 'flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden',
          horizontal ? 'aspect-[306/240] sm:aspect-auto sm:w-[41%]' : imageAspect,
        )}
      >
        <img
          src={post.image}
          alt=""
          width={horizontal ? 306 : 416}
          height={horizontal ? 240 : 300}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <IconButton
          label={saved ? 'Remove bookmark' : 'Bookmark post'}
          aria-pressed={saved}
          size="sm"
          className="absolute top-4 right-4 z-10 text-base"
          onClick={() => setSaved((value) => !value)}
        >
          {saved ? (
            <BiSolidBookmark aria-hidden className="text-primary" />
          ) : (
            <BiBookmark aria-hidden />
          )}
        </IconButton>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <Badge>{post.category}</Badge>
          <time dateTime={post.publishedAt} className="text-body-s text-muted">
            {formatPostDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="mt-4 text-h6 text-title md:text-h5">
          <Link
            to={href}
            className="rounded-sm transition-colors group-hover:text-primary after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-primary"
          >
            {post.title}
          </Link>
        </h3>
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-4 border-t border-border pt-6">
            <img
              src={post.author.avatar}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="text-body-m font-bold text-heading">{post.author.name}</p>
              {showRole && post.author.role && (
                <p className="text-body-s text-muted">{post.author.role}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function BlogCardSkeleton({
  layout = 'vertical',
  className,
}: {
  layout?: 'vertical' | 'horizontal'
  className?: string
}) {
  const horizontal = layout === 'horizontal'
  return (
    <div
      aria-hidden
      className={cn(
        'flex overflow-hidden rounded-lg bg-card shadow-card',
        horizontal ? 'flex-col sm:flex-row' : 'flex-col',
        className,
      )}
    >
      <Skeleton
        className={cn(
          'rounded-none',
          horizontal ? 'aspect-[306/240] sm:aspect-auto sm:w-[41%]' : 'aspect-[416/300]',
        )}
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <div className="mt-auto flex items-center gap-4 pt-6">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}
