import { BiCheck } from 'react-icons/bi'
import phoneMockup from '@/assets/images/misc/phone-mockup.webp'
import { Reveal } from '@/components/shared/Reveal'
import { Container } from '@/components/ui/Container'

const POINTS = [
  'Quis euismod lacus, at consectetur porta',
  'Dictumst enim lectus dis eget non metus cras',
  'Risus volutpat tellus hendrerit nibh',
]

export function ProductExperience() {
  return (
    <section aria-labelledby="product-title" className="pt-20 pb-20 lg:pt-28 lg:pb-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 lg:max-w-141">
          <h2 id="product-title" className="text-h3 md:text-h2 lg:text-h1">
            Product development with the best experience
          </h2>
          <p className="mt-6 text-body-m text-body">
            We create diverse, complex, web and mobile solutions for any business need. With us you
            get quality software and perfect service every time. Quisque integer eget velit
            facilisis enim malesuada metus, risus amet ultricies.
          </p>
          <ul className="mt-6 space-y-2">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-body-m text-body">
                <BiCheck aria-hidden className="size-5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="relative h-80 overflow-hidden rounded-lg bg-surface-alt sm:h-107 lg:col-span-6 lg:col-start-7">
          <img
            src={phoneMockup}
            alt="Mobile app built by Silicon"
            width={257}
            height={519}
            loading="lazy"
            className="absolute top-14 left-1/2 w-44 -translate-x-1/2 sm:top-28 sm:left-22 sm:w-63 sm:translate-x-0"
          />
        </Reveal>
      </Container>
    </section>
  )
}
