import competencyImage from '@/assets/images/misc/competency-laptop.webp'
import { Reveal } from '@/components/shared/Reveal'
import { Accordion, type AccordionItem } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const TEXT =
  'Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.'

const TITLES = [
  'Digital Marketing',
  'Web Development',
  'Application Development',
  'Strategy',
  'Digital Advertising',
]

const ITEMS: AccordionItem[] = TITLES.map((title) => ({
  id: title.toLowerCase().replace(/\s+/g, '-'),
  title,
  content: (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
      <img
        src={competencyImage}
        alt=""
        width={200}
        height={200}
        loading="lazy"
        className="size-32 shrink-0 self-center sm:size-50"
      />
      <p className="text-body-s text-body md:text-body-m">{TEXT}</p>
    </div>
  ),
}))

export function Competencies() {
  return (
    <section aria-labelledby="competencies-title">
      <Container>
        <div className="rounded-lg bg-surface-alt px-4 py-14 sm:px-8 lg:pt-18 lg:pb-24">
          <SectionHeading
            id="competencies-title"
            title="Our Competencies"
            subtitle="We fully understand your business. If you need to update something, we are more than happy to help you with the services we are providing."
            subtitleClassName="max-w-214"
          />
          <Reveal className="mx-auto mt-10 max-w-214">
            <Accordion items={ITEMS} defaultOpenId="web-development" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
