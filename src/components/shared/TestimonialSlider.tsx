import { useState } from 'react'
import { BiSolidQuoteAltLeft } from 'react-icons/bi'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, EffectFade, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ErrorState } from '@/components/ui/ErrorState'
import { Pagination } from '@/components/ui/Pagination'
import { Rating } from '@/components/ui/Rating'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useGetTestimonialsQuery } from '@/services/companyApi'
import type { Testimonial } from '@/types'
import { ClientLogo } from './logos'

/** Purple 52px square with a white quote mark (overlaps the card's top edge). */
export function QuoteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-13 items-center justify-center rounded-lg bg-primary text-white shadow-brand',
        className,
      )}
    >
      <BiSolidQuoteAltLeft className="size-7" />
    </span>
  )
}

function Slide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:gap-18">
      <div className="relative mt-5 self-start rounded-lg bg-card px-6 pt-14 pb-8 shadow-card md:px-12 md:pt-16 md:pb-12">
        <QuoteMark className="absolute -top-5 left-6 md:left-12" />
        <blockquote className="text-body-m text-body md:text-body-l">
          <p>{testimonial.quote}</p>
        </blockquote>
        <Rating value={testimonial.rating} className="mt-6" />
      </div>
      <div>
        <img
          src={testimonial.photo}
          alt={`${testimonial.author.name}, ${testimonial.author.role ?? ''}`}
          width={416}
          height={360}
          loading="lazy"
          className="aspect-[416/360] w-full rounded-lg object-cover"
        />
        <figcaption className="mt-6 flex items-center">
          <div className="flex w-28 shrink-0 justify-center text-gray-500 sm:w-46">
            <ClientLogo id={testimonial.company} className="h-6 sm:h-7" />
          </div>
          <div className="border-l border-border py-3 pl-6">
            <p className="text-h5 text-heading">{testimonial.author.name}</p>
            <p className="text-body-s text-muted">{testimonial.author.role}</p>
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

/**
 * Home "What They Say About Us": quote card + photo, numbered pagination under the card.
 * Built on Swiper (fade effect, keyboard + a11y modules).
 */
export function TestimonialSlider({ className }: { className?: string }) {
  const { data: testimonials, isLoading, isError, refetch } = useGetTestimonialsQuery()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [active, setActive] = useState(0)

  if (isLoading) {
    return (
      <div className={cn('grid gap-8 lg:grid-cols-[1fr_26rem] lg:gap-18', className)} aria-busy>
        <Skeleton className="mt-5 h-80" />
        <Skeleton className="aspect-[416/360]" />
      </div>
    )
  }
  if (isError || !testimonials) {
    return (
      <ErrorState
        className={className}
        message="We couldn't load testimonials."
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <div className={cn('relative', className)}>
      <Swiper
        modules={[A11y, EffectFade, Keyboard]}
        // padding keeps the card shadow from being clipped by overflow:hidden
        className="-mx-4 px-4 pb-4"
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoHeight
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActive(instance.activeIndex)}
        a11y={{ containerRoleDescriptionMessage: 'testimonials carousel' }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Slide testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Pagination
        label="Testimonials"
        itemName="testimonial"
        page={active + 1}
        totalPages={testimonials.length}
        onChange={(page) => swiper?.slideTo(page - 1)}
        className="mt-8 justify-center lg:absolute lg:bottom-9 lg:left-0 lg:z-10 lg:mt-0 lg:justify-start"
      />
    </div>
  )
}
