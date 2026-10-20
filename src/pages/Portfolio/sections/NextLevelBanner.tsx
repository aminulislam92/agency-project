import bannerImage from '@/assets/images/misc/banner-computer.webp'
import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/** "Ready to get started? Take Your Business to the Next Level" banner with illustration. */
export function NextLevelBanner() {
  return (
    <section aria-labelledby="next-level-title" className="pt-20 pb-8 lg:pt-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-lg bg-surface-alt">
          {/* Lavender disc whose curved left edge cuts into the box */}
          <span
            aria-hidden
            className="absolute top-1/2 -right-52 -z-10 hidden size-211.5 -translate-y-1/2 rounded-full bg-primary/15 lg:block"
          />
          <div className="grid items-center gap-8 px-6 py-12 sm:px-12 lg:grid-cols-12 lg:gap-6 lg:px-0 lg:py-24">
            <div className="lg:col-span-5 lg:col-start-2">
              <p className="text-body-l text-body md:text-lead">Ready to get started?</p>
              <h2 id="next-level-title" className="mt-4 text-h3 md:text-h2 lg:text-h1">
                Take Your <span className="text-primary">Business</span>
                <br className="hidden sm:block" /> to the Next Level
              </h2>
              <ButtonLink to="/contact" className="mt-8 lg:mt-9">
                Work with us
              </ButtonLink>
            </div>
            <img
              src={bannerImage}
              alt=""
              width={382}
              height={382}
              loading="lazy"
              className="mx-auto w-60 sm:w-72 lg:absolute lg:top-1/2 lg:right-32 lg:w-95.5 lg:-translate-y-1/2"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
