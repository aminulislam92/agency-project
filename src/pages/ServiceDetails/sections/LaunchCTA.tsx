import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/** Full-width dark band: "Ready to get started? Launch Your Project with Us". */
export function LaunchCTA() {
  return (
    <section aria-labelledby="launch-title" className="bg-inverse py-20 text-center lg:py-28">
      <Container>
        <Reveal>
          <p className="text-body-l text-white/70 md:text-lead">Ready to get started?</p>
          <h2 id="launch-title" className="mt-4 text-h3 text-white md:text-h2 lg:text-h1">
            Launch Your Project with Us
          </h2>
          <ButtonLink to="/contact" className="mt-10 lg:mt-12">
            Work with us
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
