import { BiReply } from 'react-icons/bi'
import { Avatar } from '@/components/ui/Avatar'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { formatCommentDate } from '@/lib/format'
import { useGetCommentsQuery } from '@/services/postsApi'
import type { Comment } from '@/types'
import type { ReplyTarget } from './CommentForm'

interface CommentItemProps {
  comment: Comment
  rootId: string
  onReply: (target: ReplyTarget) => void
  nested?: boolean
}

function CommentItem({ comment, rootId, onReply, nested = false }: CommentItemProps) {
  return (
    <article
      className={cn(nested && 'border-l-2 border-primary pl-4 sm:pl-6')}
      aria-label={`Comment by ${comment.author.name}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={comment.author.name} src={comment.author.avatar || undefined} />
          <div>
            <p className="text-body-m font-bold text-heading">{comment.author.name}</p>
            <time dateTime={comment.createdAt} className="text-body-s text-muted">
              {formatCommentDate(comment.createdAt)}
            </time>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onReply({ parentId: rootId, name: comment.author.name })
            document.getElementById('leave-comment')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-2 rounded-sm text-body-s font-semibold text-title transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Reply to ${comment.author.name}`}
        >
          <BiReply aria-hidden className="size-5" />
          Reply
        </button>
      </div>
      <p className="mt-5 text-body-m text-body">
        {comment.replyTo && (
          <span className="mr-1 font-semibold text-primary">@{comment.replyTo}</span>
        )}
        {comment.text}
      </p>
    </article>
  )
}

interface CommentsProps {
  postSlug: string
  onReply: (target: ReplyTarget) => void
}

export function Comments({ postSlug, onReply }: CommentsProps) {
  const { data: comments, isLoading, isError, refetch } = useGetCommentsQuery(postSlug)
  const roots = comments?.filter((comment) => comment.parentId === null) ?? []
  const repliesFor = (id: string) => comments?.filter((comment) => comment.parentId === id) ?? []

  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-h3 md:text-h2 lg:text-h1">
        {comments
          ? `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
          : 'Comments'}
      </h2>

      {isLoading && (
        <div aria-busy className="mt-8 space-y-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
      {isError && (
        <ErrorState
          className="mt-8"
          message="We couldn't load the comments."
          onRetry={() => void refetch()}
        />
      )}
      {comments?.length === 0 && (
        <p className="mt-6 text-body-m text-body">
          No comments yet — be the first to share your thoughts.
        </p>
      )}

      <ol className="mt-8 divide-y divide-border lg:mt-10">
        {roots.map((root) => (
          <li key={root.id} className="py-8 first:pt-0">
            <CommentItem comment={root} rootId={root.id} onReply={onReply} />
            {repliesFor(root.id).length > 0 && (
              <ol className="mt-8 space-y-8 sm:ml-6">
                {repliesFor(root.id).map((reply) => (
                  <li key={reply.id}>
                    <CommentItem comment={reply} rootId={root.id} onReply={onReply} nested />
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
