import { useState } from 'react'
import { BiPlay } from 'react-icons/bi'
import atmosphereImage from '@/assets/images/misc/creative-atmosphere.webp'
import { Reveal } from '@/components/shared/Reveal'
import { VideoModal } from '@/components/shared/VideoModal'
import { Container } from '@/components/ui/Container'
import { PROMO_VIDEO_URL } from '@/lib/config'

export function VideoSection() {
  const [open, setOpen] = useState(false)

  return (
    <section aria-label="Studio video" className="pt-20 lg:pt-28">
      <Container>
        <Reveal className="group relative overflow-hidden rounded-lg">
          <img
            src={atmosphereImage}
            alt="The Silicon team working together in the studio"
            width={1296}
            height={600}
            loading="lazy"
            decoding="async"
            className="aspect-[1296/600] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 bg-gray-900/20" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute top-1/2 left-1/2 inline-flex size-14 -translate-1/2 items-center justify-center rounded-full bg-white text-3xl text-gray-900 shadow-secondary transition-all hover:scale-110 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:size-18"
            aria-label="Play the studio video"
          >
            <BiPlay aria-hidden className="translate-x-0.5" />
          </button>
        </Reveal>
      </Container>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        src={PROMO_VIDEO_URL}
        title="Inside the Silicon studio"
      />
    </section>
  )
}
