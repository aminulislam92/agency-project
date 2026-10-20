import { BiBulb, BiGroup, BiTrophy } from 'react-icons/bi'
import type { IconType } from 'react-icons'
import { cn } from '@/lib/cn'
import { GradientIcon } from './GradientIcon'
import { Reveal } from './Reveal'

interface Feature {
  icon: IconType
  title: string
  text: string
}

const FEATURES: Feature[] = [
  {
    icon: BiBulb,
    title: 'Creative Solutions',
    text: 'Sed morbi nulla pulvinar lectus tempor vel euismod accumsan.',
  },
  {
    icon: BiTrophy,
    title: 'Award Winning',
    text: 'Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet.',
  },
  {
    icon: BiGroup,
    title: 'Team of Professionals',
    text: 'Nam venenatis urna aenean quis feugiat et senectus turpis.',
  },
]

/** Three centred features separated by vertical dividers (Home, About). */
export function FeaturesRow({ className, id }: { className?: string; id?: string }) {
  return (
    <section id={id} aria-label="Why Silicon" className={cn('scroll-mt-nav', className)}>
      <ul className="mx-auto grid max-w-wide gap-10 px-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border md:px-0">
        {FEATURES.map((feature, index) => (
          <Reveal
            as="li"
            key={feature.title}
            delay={index * 0.1}
            className="text-center md:px-8 xl:px-18"
          >
            <GradientIcon icon={feature.icon} className="mx-auto" />
            <h3 className="mt-4 text-h5 md:mt-6 lg:text-h4">{feature.title}</h3>
            <p className="mx-auto mt-3 max-w-84 text-body-m text-body">{feature.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
