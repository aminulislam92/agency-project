import { BiRightArrowAlt } from 'react-icons/bi'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BlogCard, BlogCardSkeleton } from '@/components/shared/BlogCard'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useGetRelatedPostsQuery } from '@/services/postsApi'

export function RelatedArticles({ slug }: { slug: string }) {
  const { data: posts, isLoading, isError } = useGetRelatedPostsQuery(slug)

  // Supplementary content: hide the section rather than show an error
  if (isError || posts?.length === 0) return null

  return (
    <section aria-labelledby="related-title" className="pt-20 pb-6 lg:pt-28 lg:pb-16">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <h2 id="related-title" className="text-h3 md:text-h2 lg:text-h1">
            Related Articles
          </h2>
          <ButtonLink
            to="/blog"
            variant="outline"
            size="md"
            rightIcon={<BiRightArrowAlt aria-hidden className="size-5" />}
            className="shrink-0"
          >
            All posts
          </ButtonLink>
        </div>

        <div className="mt-8 lg:mt-10">
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlogCardSkeleton />
              <BlogCardSkeleton className="hidden md:flex" />
              <BlogCardSkeleton className="hidden lg:flex" />
            </div>
          )}
          {posts && (
            <Swiper
              modules={[A11y, Keyboard, Pagination]}
              // side padding keeps card shadows from being clipped
              className="-mx-3 px-3 pt-1 pb-12"
              slidesPerView={1.1}
              spaceBetween={16}
              keyboard={{ enabled: true, onlyInViewport: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              a11y={{ containerRoleDescriptionMessage: 'related articles carousel' }}
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id} className="h-auto pb-2">
                  <BlogCard post={post} showRole={false} className="h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </section>
  )
}
