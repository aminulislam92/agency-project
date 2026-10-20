import { useState } from 'react'
import { BiMinusCircle, BiPlay, BiPlusCircle } from 'react-icons/bi'
import { Link } from 'react-router'
import { VideoModal } from '@/components/shared/VideoModal'
import { Avatar } from '@/components/ui/Avatar'
import { PROMO_VIDEO_URL } from '@/lib/config'
import type { Post, PostBlock } from '@/types'

function VideoBlock({ block }: { block: Extract<PostBlock, { type: 'video' }> }) {
  const [open, setOpen] = useState(false)
  return (
    <figure className="group relative overflow-hidden rounded-lg">
      <img
        src={block.image}
        alt={block.alt}
        width={966}
        height={500}
        loading="lazy"
        className="aspect-[966/500] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${block.alt}`}
        className="absolute top-1/2 left-1/2 inline-flex size-14 -translate-1/2 items-center justify-center rounded-full bg-white text-3xl text-gray-900 shadow-secondary transition-all hover:scale-110 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:size-18"
      >
        <BiPlay aria-hidden className="translate-x-0.5" />
      </button>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        src={block.videoUrl ?? PROMO_VIDEO_URL}
        title={block.alt}
      />
    </figure>
  )
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-body-l font-semibold text-heading">{block.text}</p>
    case 'heading':
      return <h2 className="pt-2 text-h5 md:text-h4">{block.text}</h2>
    case 'paragraph':
      return <p className="text-body-m text-body">{block.text}</p>
    case 'video':
      return <VideoBlock block={block} />
    case 'quote':
      return (
        <figure className="border-l-2 border-primary py-1 pl-6 md:pl-8">
          <blockquote>
            <p className="text-body-l font-semibold text-heading md:text-body-xl">{block.text}</p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <Avatar name={block.author.name} src={block.author.avatar} />
            <div>
              <p className="text-body-m font-bold text-heading">{block.author.name}</p>
              <p className="text-body-s text-muted">{block.author.role}</p>
            </div>
          </figcaption>
        </figure>
      )
    case 'list': {
      const Icon = block.variant === 'pros' ? BiPlusCircle : BiMinusCircle
      return (
        <section aria-label={block.title}>
          <h3 className="flex items-center gap-2 text-h6 uppercase">
            <Icon aria-hidden className="size-5 text-primary" />
            {block.title}
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-body-m text-body marker:text-title">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )
    }
  }
}

export function PostContent({ post }: { post: Post }) {
  return (
    <article aria-label="Post content">
      <div className="space-y-6">
        {post.content.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <span className="mr-1 text-body-s font-bold text-heading">Related Tags:</span>
        {post.tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog?q=${encodeURIComponent(tag)}`}
            className="rounded-md border border-border px-3 py-1.5 text-body-s font-semibold text-title transition-colors hover:border-transparent hover:bg-subtle hover:text-primary"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
