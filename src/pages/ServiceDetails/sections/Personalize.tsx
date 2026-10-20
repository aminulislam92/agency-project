import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { TaskMasterMockup } from '../mockups/TaskMasterMockup'

export function Personalize() {
  return (
    <section aria-labelledby="personalize-title" className="pt-20 lg:pt-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <TaskMasterMockup className="rounded-lg" />
        </Reveal>
        <div className="lg:col-span-6 lg:pl-18">
          <h2 id="personalize-title" className="text-h3 md:text-h2 lg:text-h1">
            We personalize how we work to fit your project needs
          </h2>
          <p className="mt-5 text-body-m text-body md:text-body-l">
            Massa enim libero dictumst consectetur in convallis lobortis cursus mi a magna
            ullamcorper consectetur purus quisque.
          </p>
          <ButtonLink to="/contact" className="mt-8 lg:mt-12">
            Start your project
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
