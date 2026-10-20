import { Awards } from '@/components/shared/Awards'
import { ClientsCarousel } from '@/components/shared/ClientsCarousel'
import { FeaturesRow } from '@/components/shared/FeaturesRow'
import { GradientCTA, GradientCTAOverlap } from '@/components/shared/GradientCTA'
import { Container } from '@/components/ui/Container'
import { Atmosphere } from './sections/Atmosphere'
import { Competencies } from './sections/Competencies'
import { FeaturedProjects } from './sections/FeaturedProjects'
import { Hero } from './sections/Hero'
import { LatestBlog } from './sections/LatestBlog'
import { Testimonials } from './sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <title>Silicon — Digital Agency: Web, Mobile &amp; Brand Design</title>
      <meta
        name="description"
        content="Silicon is a full-service digital agency based in New York. We design and build websites, mobile apps and brands that people appreciate all around the world."
      />

      <Hero />
      <FeaturesRow id="features" className="pt-20 lg:pt-27" />
      <FeaturedProjects />
      <Competencies />
      <Container className="pt-20 lg:pt-24">
        <ClientsCarousel />
      </Container>
      <Testimonials />
      <Atmosphere />
      <Container className="py-20 lg:pt-24 lg:pb-28">
        <Awards />
      </Container>
      <LatestBlog />
      <GradientCTAOverlap>
        <Container>
          <GradientCTA />
        </Container>
      </GradientCTAOverlap>
    </>
  )
}
