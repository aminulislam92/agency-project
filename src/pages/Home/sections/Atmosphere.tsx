import atmosphereImage from '@/assets/images/misc/creative-atmosphere.webp'
import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'

/** Three hand-drawn outline arrows next to the title. */
function ArrowsDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 52" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 6 21 14 6 24Z" transform="rotate(8 12 15)" />
        <path d="M24 13 42 20 28 31Z" transform="rotate(14 33 22)" />
        <path d="M47 26 69 34 52 47Z" transform="rotate(18 58 36)" />
      </g>
    </svg>
  )
}

export function Atmosphere() {
  return (
    <section aria-labelledby="atmosphere-title" className="pt-20 lg:pt-28">
      <Container>
        <div className="flex items-end gap-4">
          <h2 id="atmosphere-title" className="text-h3 md:text-h2 lg:text-h1">
            Our Creative Atmosphere
          </h2>
          <ArrowsDoodle className="mb-[-10px] hidden h-13 w-20 shrink-0 text-primary sm:block" />
        </div>
        <Reveal className="mt-8 lg:mt-12">
          <img
            src={atmosphereImage}
            alt="Silicon team collaborating around a table with laptops"
            width={1296}
            height={560}
            loading="lazy"
            decoding="async"
            className="aspect-[1296/560] w-full rounded-lg object-cover"
          />
        </Reveal>
      </Container>
    </section>
  )
}
