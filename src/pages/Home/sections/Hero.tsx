import { motion } from 'motion/react'
import { useState } from 'react'
import { BiChevronDown, BiPlay } from 'react-icons/bi'
import { GradientLines } from '@/components/decor/GradientLines'
import { Rays } from '@/components/decor/Rays'
import { StripedSphere } from '@/components/decor/StripedSphere'
import { VideoModal } from '@/components/shared/VideoModal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PROMO_VIDEO_URL } from '@/lib/config'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-hero pt-nav lg:min-h-247.5"
    >
      {/* Background decoration */}
      <Rays origin="bottom-left" className="-z-10 text-white/60 dark:text-white/3" />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -z-10 size-150 -translate-x-1/4 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-10 -left-40 -z-10 size-120 rounded-full bg-white/70 blur-[100px] dark:bg-white/3"
      />
      <GradientLines className="absolute top-75.5 left-[calc(50%+300px)] -z-10 hidden lg:block" />

      <Container className="relative pt-16 pb-16 md:pt-24 lg:pt-32 lg:pb-24">
        <div className="relative z-10 max-w-2xl lg:max-w-160">
          <motion.button
            {...fadeUp(0)}
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group flex items-center gap-4 rounded-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="inline-flex size-13 items-center justify-center rounded-full bg-card text-2xl text-title shadow-card transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-brand">
              <BiPlay aria-hidden className="translate-x-px" />
            </span>
            <span className="text-body-l font-bold text-title md:text-h4">
              Digital Agency Promo
            </span>
          </motion.button>

          <motion.h1
            {...fadeUp(0.1)}
            id="hero-title"
            className="mt-5 max-w-140 text-h1 md:text-display-3 xl:text-display-2"
          >
            We <span className="text-gradient">Transform</span> Your Ideas into Reality
          </motion.h1>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-10 flex flex-col-reverse items-start gap-6 sm:flex-row sm:gap-10 lg:mt-15"
          >
            <ButtonLink to="/contact" className="shrink-0">
              Work with us
            </ButtonLink>
            <p className="max-w-108 text-body-m text-body">
              Silicon is a leading full-service digital agency based in New York. We make mobile
              apps, websites &amp; brands, that people appreciate all around the world.
            </p>
          </motion.div>

          <motion.button
            {...fadeUp(0.3)}
            type="button"
            onClick={() =>
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="group mt-16 hidden items-center gap-4 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:flex lg:mt-39"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-card text-2xl text-title shadow-card transition-all group-hover:translate-y-0.5 group-hover:text-primary">
              <BiChevronDown aria-hidden />
            </span>
            <span className="text-body-s text-body transition-colors group-hover:text-primary">
              Discover more
            </span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 aspect-square w-full max-w-90 md:max-w-110 lg:absolute lg:top-23 lg:right-6 lg:mt-0 lg:w-130 lg:max-w-none xl:w-159"
        >
          <StripedSphere className="size-full" />
        </motion.div>
      </Container>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={PROMO_VIDEO_URL}
        title="Silicon digital agency promo video"
      />
    </section>
  )
}
