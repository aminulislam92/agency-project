import { BlogCard, BlogCardSkeleton } from '@/components/shared/BlogCard'
import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useGetPostsQuery } from '@/services/postsApi'

export function LatestBlog() {
  const { data, isLoading, isError, refetch } = useGetPostsQuery({ featured: true, pageSize: 3 })
  const [first, ...rest] = data?.items ?? []

  return (
    <section aria-labelledby="blog-title" className="bg-surface-alt pt-20 pb-20 lg:pt-24 lg:pb-28">
      <Container>
        <SectionHeading id="blog-title" title="Latest From Our Blog" />

        <div className="mt-10">
          {isError && (
            <ErrorState
              message="We couldn't load the latest posts."
              onRetry={() => void refetch()}
            />
          )}
          {isLoading && (
            <div className="grid gap-6 lg:grid-cols-[526fr_746fr]">
              <BlogCardSkeleton />
              <div className="grid gap-6">
                <BlogCardSkeleton layout="horizontal" />
                <BlogCardSkeleton layout="horizontal" />
              </div>
            </div>
          )}
          {first && (
            <div className="grid gap-6 lg:grid-cols-[526fr_746fr]">
              <Reveal className="flex">
                <BlogCard post={first} imageAspect="aspect-[526/264]" className="flex-1" />
              </Reveal>
              <div className="grid gap-6">
                {rest.map((post, index) => (
                  <Reveal key={post.id} delay={(index + 1) * 0.1} className="flex">
                    <BlogCard post={post} layout="horizontal" className="flex-1" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink to="/blog" variant="outline">
            More blog posts
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
