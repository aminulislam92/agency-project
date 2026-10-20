import { TestimonialSlider } from '@/components/shared/TestimonialSlider'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** The page header's tinted background continues ~338px into this section (desktop). */
export function ClientsSay() {
  return (
    <section
      aria-labelledby="clients-say-title"
      className="bg-surface-alt pt-20 lg:bg-transparent lg:bg-linear-to-b lg:from-surface-alt lg:from-[21.125rem] lg:to-transparent lg:to-[21.125rem] lg:pt-28"
    >
      <Container>
        <SectionHeading id="clients-say-title" title="What Our Clients Say" align="left" />
        <TestimonialSlider variant="arrows" className="mt-8 lg:mt-10" />
      </Container>
    </section>
  )
}
