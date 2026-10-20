import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ErrorState } from '@/components/ui/ErrorState'
import { IconButton } from '@/components/ui/IconButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useGetClientsQuery } from '@/services/companyApi'
import { ClientLogo } from './logos'

interface ClientsCarouselProps {
  title?: string
  /** "split": title left + arrows right (Home). "center": centred title, no arrows (Service Details). */
  variant?: 'split' | 'center'
  className?: string
}

/** Grayscale client logo tiles in a Swiper carousel (spec: Client logo tile). */
export function ClientsCarousel({
  title = 'Trusted by Awesome Clients',
  variant = 'split',
  className,
}: ClientsCarouselProps) {
  const { data: clients, isLoading, isError, refetch } = useGetClientsQuery()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const split = variant === 'split'

  return (
    <section aria-labelledby="clients-title" className={className}>
      <div
        className={cn(
          'flex items-center gap-6',
          split ? 'justify-between' : 'justify-center text-center',
        )}
      >
        <SectionHeading
          id="clients-title"
          title={title}
          size="h2"
          align={split ? 'left' : 'center'}
        />
        {split && (
          <div className="flex shrink-0 gap-3">
            <IconButton label="Previous clients" size="sm" onClick={() => swiper?.slidePrev()}>
              <BiChevronLeft aria-hidden />
            </IconButton>
            <IconButton label="Next clients" size="sm" onClick={() => swiper?.slideNext()}>
              <BiChevronRight aria-hidden />
            </IconButton>
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-10">
        {isLoading && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-25" />
            ))}
          </div>
        )}
        {isError && (
          <ErrorState message="We couldn't load our clients." onRetry={() => void refetch()} />
        )}
        {clients && (
          <Swiper
            modules={[A11y, Autoplay, Keyboard]}
            onSwiper={setSwiper}
            slidesPerView={2}
            spaceBetween={16}
            rewind
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            a11y={{ prevSlideMessage: 'Previous client', nextSlideMessage: 'Next client' }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
              1280: { slidesPerView: 6, spaceBetween: 24 },
            }}
          >
            {clients.map((client) => (
              <SwiperSlide key={client.id}>
                <div
                  title={client.name}
                  className="group flex h-25 items-center justify-center rounded-lg border border-border bg-card px-4 text-gray-500 transition-colors hover:border-primary/35 hover:text-primary"
                >
                  <ClientLogo
                    id={client.logo}
                    className="h-7 max-w-full transition-transform group-hover:scale-105 lg:h-8"
                  />
                  <span className="sr-only">{client.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
