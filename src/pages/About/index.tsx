import { Awards } from '@/components/shared/Awards'
import { FeaturesRow } from '@/components/shared/FeaturesRow'
import { GradientCTA } from '@/components/shared/GradientCTA'
import { Container } from '@/components/ui/Container'
import { AboutHero } from './sections/AboutHero'
import { ClientsTestimonial } from './sections/ClientsTestimonial'
import { Leadership } from './sections/Leadership'
import { SocialNetworks } from './sections/SocialNetworks'
import { VideoSection } from './sections/VideoSection'

export default function AboutPage() {
  return (
    <>
      <title>About | Silicon</title>
      <meta
        name="description"
        content="Meet Silicon: product managers, developers, designers, QA engineers and marketers helping businesses of every size launch their projects."
      />
      <AboutHero />
      <FeaturesRow className="pt-20 lg:pt-44" />
      <VideoSection />
      <Container className="pt-20 lg:pt-28">
        <Awards />
      </Container>
      <ClientsTestimonial />
      <Leadership />
      <Container className="pt-20 lg:pt-28">
        <GradientCTA />
      </Container>
      <SocialNetworks />
    </>
  )
}
