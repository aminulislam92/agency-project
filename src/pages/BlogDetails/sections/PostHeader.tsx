import { BiComment, BiLike, BiShareAlt } from 'react-icons/bi'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatPostDate } from '@/lib/format'
import type { Post } from '@/types'

const shorten = (text: string, max = 36) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text

export function PostHeader({ post }: { post: Post | undefined }) {
  const meta = post
    ? [
        { icon: BiLike, value: post.likes, label: 'likes' },
        { icon: BiComment, value: post.commentsCount, label: 'comments' },
        { icon: BiShareAlt, value: post.shares, label: 'shares' },
      ]
    : []

  return (
    <header className="pt-nav">
      <Container className="pt-6 pb-10 lg:pt-10 lg:pb-9.5">
        <Breadcrumb
          items={[{ label: 'Blog', to: '/blog' }, { label: post ? shorten(post.title) : 'Post' }]}
        />
        {post ? (
          // Title + meta on the left, author bottom-aligned on the right (as in the design)
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mt-6 max-w-215 text-h3 md:text-h2 lg:mt-8 lg:text-h1">{post.title}</h1>
              <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-m text-body md:divide-x md:divide-border">
                <li className="md:pr-4">
                  <Badge className="h-7 px-2.5 text-body-m font-normal">{post.category}</Badge>
                </li>
                <li className="md:pr-4">
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                </li>
                <li className="flex items-center gap-4">
                  {meta.map(({ icon: Icon, value, label }) => (
                    <span key={label} className="inline-flex items-center gap-1 text-body-s">
                      <Icon aria-hidden className="size-4.5" />
                      {value}
                      <span className="sr-only"> {label}</span>
                    </span>
                  ))}
                </li>
              </ul>
            </div>
            <div className="flex shrink-0 items-center gap-3 md:mb-1 lg:mr-23">
              <Avatar name={post.author.name} src={post.author.avatar} size="size-15" />
              <div>
                <p className="text-body-m font-bold text-heading">Author</p>
                <p className="text-body-m text-primary">{post.author.name}</p>
              </div>
            </div>
          </div>
        ) : (
          <div aria-busy className="mt-8">
            <h1 className="sr-only">Loading post</h1>
            <Skeleton className="h-12 w-full max-w-215" />
            <Skeleton className="mt-3 h-12 w-2/3 max-w-140" />
            <Skeleton className="mt-6 h-7 w-80" />
          </div>
        )}
      </Container>

      {post ? (
        <img
          src={post.cover ?? post.image}
          alt=""
          width={1920}
          height={700}
          fetchPriority="high"
          className="aspect-[1920/700] max-h-175 min-h-60 w-full object-cover"
        />
      ) : (
        <Skeleton className="aspect-[1920/700] min-h-60 w-full rounded-none" />
      )}
    </header>
  )
}
