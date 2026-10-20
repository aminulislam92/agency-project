import type { IconType } from 'react-icons'
import { BiLaptop, BiMessageRoundedDots, BiSlideshow, BiTimeFive } from 'react-icons/bi'
import { GradientIcon } from '@/components/shared/GradientIcon'
import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const REASONS: { icon: IconType; title: string }[] = [
  { icon: BiTimeFive, title: 'Build a functional prototype in 24 hrs' },
  { icon: BiSlideshow, title: 'Create an MVP within two weeks' },
  { icon: BiLaptop, title: 'Kickstart software development' },
  { icon: BiMessageRoundedDots, title: 'Get 24/7 tech & business support' },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="pt-20 lg:pt-18">
      <Container>
        <SectionHeading
          id="why-title"
          title="Why Choose Us?"
          subtitle="We personalize how we work to fit your project needs. Our approach helps augment innovation."
        />
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
          {REASONS.map((reason, index) => (
            <Reveal as="li" key={reason.title} delay={index * 0.08} className="text-center lg:px-6">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-card shadow-card">
                <GradientIcon icon={reason.icon} size="size-7" />
              </span>
              <h3 className="mx-auto mt-6 max-w-69 text-h6 md:text-h5">{reason.title}</h3>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
