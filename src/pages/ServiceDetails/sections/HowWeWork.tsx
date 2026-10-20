import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'

const STEPS = [
  {
    title: 'Identifying the problem',
    text: 'Massa enim libero dictumst consectetur in convallis lobortis cursus mi a magna ullamcorper consectetur.',
  },
  {
    title: 'Conducting a research',
    text: 'At ultricies id non quisque integer eget velit. Facilisis enim malesuada metus, risus amet ultricies magna aliquam.',
  },
  {
    title: 'Creating low-fidelity prototypes',
    text: 'Pellentesque rhoncus viverra vestibulum, purus purus quisque quisque vestibulum facilisis dictumst consequat.',
  },
  {
    title: 'Building an MVP version',
    text: 'Massa enim libero dictumst consectetur in convallis lobortis cursus mi a magna ullamcorper consectetur.',
  },
]

export function HowWeWork() {
  return (
    <section aria-labelledby="how-title" className="pt-20 lg:pt-24">
      <Container>
        <h2 id="how-title" className="text-h3 md:text-h2 lg:text-h1">
          How We Work?
        </h2>
        <ol className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:flex lg:justify-between lg:gap-6">
          {/* Connector between the first and last step markers */}
          <span
            aria-hidden
            className="absolute top-9.5 right-50.5 left-9.5 hidden h-px bg-border lg:block"
          />
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.1} className="relative lg:w-60">
              <span className="inline-flex size-19 items-center justify-center rounded-full bg-primary/8">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-card text-h5 text-heading shadow-card">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 text-h5 lg:mt-7 lg:text-h4">{step.title}</h3>
              <p className="mt-4 text-body-m text-body">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
