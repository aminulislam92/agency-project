import { useState } from 'react'
import { BiCheck, BiLike, BiLink, BiSolidLike } from 'react-icons/bi'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { SocialButton } from '@/components/shared/SocialLinks'
import { cn } from '@/lib/cn'
import type { Post } from '@/types'

/** LinkedIn / Facebook / Twitter share links + copy-link button (44px tiles). */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable (insecure context) — nothing to do */
    }
  }

  const shares = [
    {
      network: 'linkedin' as const,
      label: 'Share on LinkedIn (opens in a new tab)',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      network: 'facebook' as const,
      label: 'Share on Facebook (opens in a new tab)',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      network: 'twitter' as const,
      label: 'Share on Twitter (opens in a new tab)',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    },
  ]

  return (
    <ul className="flex gap-3">
      {shares.map((share) => (
        <li key={share.network}>
          <SocialButton {...share} variant="subtle" />
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          className="inline-flex size-11 items-center justify-center rounded-md bg-subtle text-xl text-title transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {copied ? <BiCheck aria-hidden /> : <BiLink aria-hidden />}
        </button>
      </li>
    </ul>
  )
}

function LikeButton({ likes }: { likes: number }) {
  const [liked, setLiked] = useState(false)
  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={() => setLiked((value) => !value)}
      className={cn(
        'inline-flex h-13 items-center gap-2 rounded-lg border px-7 text-body-m font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        liked
          ? 'border-primary text-primary'
          : 'border-border text-title hover:border-primary hover:text-primary',
      )}
    >
      {liked ? (
        <BiSolidLike aria-hidden className="size-6" />
      ) : (
        <BiLike aria-hidden className="size-6" />
      )}
      Like it
      <span className="ml-1 inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-sm bg-primary px-1 text-body-xs font-semibold text-white">
        {likes + (liked ? 1 : 0)}
      </span>
    </button>
  )
}

/** Read time, share and like — sticks to the top while the article scrolls. */
export function PostTools({ post }: { post: Post }) {
  return (
    <aside aria-label="Share and like" className="lg:sticky lg:top-28">
      <p className="text-body-s text-muted">{post.readTime} min read</p>
      <p className="mt-6 mb-4 text-body-m font-bold text-heading">Share this post:</p>
      <ShareButtons title={post.title} />
      <div className="mt-10">
        <LikeButton likes={post.likes} />
      </div>
    </aside>
  )
}

/** Newsletter + share, shown beside the comment form. */
export function PostNewsletter({ post }: { post: Post }) {
  return (
    <aside aria-label="Newsletter" className="space-y-12">
      <NewsletterForm
        variant="stacked"
        title="Enjoy this post? Join our newsletter"
        titleClassName="mb-4 text-body-m font-bold"
      />
      <div>
        <p className="mb-4 text-body-m font-bold text-heading">Don&apos;t forget to share it</p>
        <ShareButtons title={post.title} />
      </div>
    </aside>
  )
}
