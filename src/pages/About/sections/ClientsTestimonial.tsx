import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SocialButton } from '@/components/shared/SocialLinks'
import { QuoteMark } from '@/components/shared/TestimonialSlider'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { IconButton } from '@/components/ui/IconButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useGetTestimonialsQuery } from '@/services/companyApi'

/** Gradient title box + testimonial card with arrows (top-right) and dot pagination. */
export function ClientsTestimonial() {
  const { data: testimonials, isLoading, isError, refetch } = useGetTestimonialsQuery()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [active, setActive] = useState(1)
  const count = testimonials?.length ?? 0

  return (
    <section aria-labelledby="about-testimonials-title" className="pt-20 lg:pt-28">
      <Container className="grid gap-6 lg:grid-cols-12">
        <div className="flex items-center rounded-lg bg-linear-to-r from-primary/10 to-gradient-to/10 px-6 py-12 sm:px-14 lg:col-span-5">
          <h2 id="about-testimonials-title" className="max-w-90 text-h3 md:text-h2 lg:text-h1">
            What Our Clients Say About Silicon Studio
          </h2>
        </div>

        <div className="relative min-w-0 rounded-lg bg-card p-6 shadow-card sm:p-12 lg:col-span-7">
          {isLoading && (
            <div aria-busy className="space-y-4">
              <Skeleton className="size-13" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-15 w-1/2" />
            </div>
          )}
          {isError && (
            <ErrorState message="We couldn't load testimonials." onRetry={() => void refetch()} />
          )}
          {testimonials && (
            <>
              <div className="flex items-start justify-between gap-4">
                <QuoteMark />
                <div className="flex gap-4">
                  <IconButton
                    label="Previous testimonial"
                    size="sm"
                    onClick={() => swiper?.slidePrev()}
                  >
                    <BiChevronLeft aria-hidden />
                  </IconButton>
                  <IconButton
                    label="Next testimonial"
                    size="sm"
                    onClick={() => swiper?.slideNext()}
                  >
                    <BiChevronRight aria-hidden />
                  </IconButton>
                </div>
              </div>

              <Swiper
                modules={[A11y, Keyboard]}
                rewind
                // The About design opens on the second (shorter) testimonial
                initialSlide={1}
                autoHeight
                spaceBetween={48}
                keyboard={{ enabled: true, onlyInViewport: true }}
                onSwiper={setSwiper}
                onSlideChange={(instance) => setActive(instance.realIndex)}
                className="mt-8"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <figure>
                      <blockquote className="text-body-m text-body md:text-body-l">
                        <p>{testimonial.quote}</p>
                      </blockquote>
                      <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.author.avatar}
                            alt=""
                            width={60}
                            height={60}
                            loading="lazy"
                            className="size-15 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-body-m font-bold text-heading">
                              {testimonial.author.name}
                            </p>
                            <p className="text-body-s text-muted">{testimonial.author.role}</p>
                          </div>
                        </div>
                        {testimonial.socials && (
                          <ul
                            className="flex gap-2"
                            aria-label={`${testimonial.author.name} on social media`}
                          >
                            {(['facebook', 'twitter', 'instagram'] as const).map((network) => {
                              const href = testimonial.socials?.[network]
                              return href ? (
                                <li key={network}>
                                  <SocialButton
                                    network={network}
                                    href={href}
                                    variant="subtle"
                                    size="sm"
                                    label={`${testimonial.author.name} on ${network}`}
                                  />
                                </li>
                              ) : null
                            })}
                          </ul>
                        )}
                      </figcaption>
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="mt-10 flex justify-center gap-1 lg:mt-12"
                role="group"
                aria-label="Choose testimonial"
              >
                {Array.from({ length: count }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show testimonial ${index + 1} of ${count}`}
                    aria-current={index === active ? 'true' : undefined}
                    onClick={() => swiper?.slideTo(index)}
                    className="group/dot inline-flex h-4 items-center px-1 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span
                      className={cn(
                        'block h-1 rounded-full transition-all duration-300',
                        index === active
                          ? 'w-6 bg-primary'
                          : 'w-1 bg-gray-500 group-hover/dot:bg-primary',
                      )}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
