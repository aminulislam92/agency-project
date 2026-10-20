import { useState } from 'react'
import { useParams } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useGetPostBySlugQuery } from '@/services/postsApi'
import { CommentForm, type ReplyTarget } from './sections/CommentForm'
import { Comments } from './sections/Comments'
import { PostContent } from './sections/PostContent'
import { PostHeader } from './sections/PostHeader'
import { PostNewsletter, PostTools } from './sections/PostSidebar'
import { RelatedArticles } from './sections/RelatedArticles'

export default function BlogDetailsPage() {
  const { slug = '' } = useParams()
  const { data: post, error, isError, refetch } = useGetPostBySlugQuery(slug)
  const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null)

  if (isError) {
    const notFound = 'status' in error && error.status === 404
    return (
      <section className="pt-nav">
        <title>{notFound ? 'Post not found | Silicon' : 'Error | Silicon'}</title>
        <Container className="py-24 text-center">
          <h1 className="text-h2">{notFound ? 'Post not found' : 'Something went wrong'}</h1>
          <p className="mt-4 text-body-l text-body">
            {notFound
              ? "We couldn't find the article you were looking for."
              : "We couldn't load this article."}
          </p>
          {notFound ? (
            <ButtonLink to="/blog" className="mt-8">
              Back to the blog
            </ButtonLink>
          ) : (
            <ErrorState className="mx-auto mt-8 max-w-md" onRetry={() => void refetch()} />
          )}
        </Container>
      </section>
    )
  }

  return (
    <>
      <title>{`${post?.title ?? 'Blog'} | Silicon`}</title>
      {post && <meta name="description" content={post.excerpt} />}

      <PostHeader post={post} />

      <Container className="pt-12 lg:pt-20">
        {post ? (
          // Row 1: article + comments | share/like (sticky). Row 2: comment form | newsletter.
          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1fr)_14.625rem] xl:gap-x-24">
            <div className="min-w-0 space-y-20 lg:space-y-24">
              <PostContent post={post} />
              <Comments postSlug={post.slug} onReply={setReplyTo} />
            </div>
            <div>
              <PostTools post={post} />
            </div>
            <CommentForm
              postSlug={post.slug}
              replyTo={replyTo}
              onCancelReply={() => setReplyTo(null)}
            />
            <PostNewsletter post={post} />
          </div>
        ) : (
          <div aria-hidden className="max-w-241.5 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="mt-8 h-40 w-full" />
          </div>
        )}
      </Container>

      <RelatedArticles slug={slug} />
    </>
  )
}
