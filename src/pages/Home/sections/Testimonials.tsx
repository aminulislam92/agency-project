import { TestimonialSlider } from '@/components/shared/TestimonialSlider'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeading id="testimonials-title" title="What They Say About Us" />
        <TestimonialSlider className="mt-10 lg:mt-12" />
      </Container>
    </section>
  )
}
