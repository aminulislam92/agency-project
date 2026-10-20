import type { IconType } from 'react-icons'
import { BiGroup, BiLike, BiRocket, BiTime } from 'react-icons/bi'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'
import { DashboardMockup } from '../mockups/DashboardMockup'

interface Offer {
  icon: IconType
  title: string
  text: string
}

const OFFERS: Offer[] = [
  {
    icon: BiRocket,
    title: 'Innovative Solutions',
    text: 'Massa enim libero dictum consectetur convallis lobortis cursus mi a magna ullamcorper consectetur.',
  },
  {
    icon: BiLike,
    title: 'Success Guarantee',
    text: 'At ultricies id non quisque integer eget velit. Facilisis enim malesuada metus, risus amet ultricies magna aliquam.',
  },
  {
    icon: BiGroup,
    title: 'Professional Team',
    text: 'Pellentesque rhoncus viverra vestibu, purus purus quisque qui vestibulum facilisis dictumst consequat.',
  },
  {
    icon: BiTime,
    title: 'On Time Service',
    text: 'Quam dolor commodo fermentum bibendum dictumst. Risus pretium eget at viverra eget neque adipiscing.',
  },
]

function OfferItem({ offer }: { offer: Offer }) {
  const Icon = offer.icon
  return (
    <>
      <Icon aria-hidden className="size-7 text-primary" />
      <h3 className="mt-5 text-h5">{offer.title}</h3>
      <p className="mt-3 text-body-m text-body">{offer.text}</p>
    </>
  )
}

/** Offer list (2×2 grid on desktop, swipeable cards below lg) + dashboard illustration. */
export function WhatWeOffer() {
  return (
    <section aria-labelledby="offer-title" className="overflow-hidden pt-20 lg:pt-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        {/* min-w-0: lets Swiper measure the column instead of growing it */}
        <div className="min-w-0 lg:col-span-7 lg:pt-4">
          <h2 id="offer-title" className="text-h3 md:text-h2 lg:text-h1">
            What We Offer
          </h2>

          <ul className="mt-12 hidden max-w-170 grid-cols-2 gap-x-6 gap-y-10 lg:grid">
            {OFFERS.map((offer, index) => (
              <Reveal as="li" key={offer.title} delay={index * 0.08} className="max-w-73">
                <OfferItem offer={offer} />
              </Reveal>
            ))}
          </ul>

          <Swiper
            modules={[A11y, Keyboard, Pagination]}
            className="-mx-4 mt-8 px-4 pb-12 lg:hidden"
            slidesPerView={1.15}
            spaceBetween={16}
            keyboard={{ enabled: true, onlyInViewport: true }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2.2, spaceBetween: 24 } }}
            a11y={{ containerRoleDescriptionMessage: 'service offers carousel' }}
          >
            {OFFERS.map((offer) => (
              <SwiperSlide key={offer.title} className="h-auto! pb-1">
                <div className="h-full rounded-lg bg-card p-6 shadow-card">
                  <OfferItem offer={offer} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <DashboardMockup className="w-full lg:w-160 xl:w-215" />
        </Reveal>
      </Container>
    </section>
  )
}
