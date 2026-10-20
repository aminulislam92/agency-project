import { motion } from 'motion/react'
import { BiSolidStar } from 'react-icons/bi'
import { Rays } from '@/components/decor/Rays'
import { CountUp } from '@/components/shared/CountUp'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'

const STATS = [
  // Labels break onto two lines as in the design
  { value: 2480, strong: 'Remote', rest: 'Sales', line2: 'Experts' },
  { value: 1200, strong: 'Requests', rest: '', line2: 'per Week' },
  { value: 760, strong: 'New Clients', rest: '', line2: 'per Month' },
]

/** "Reviewed on Clutch" badge (wordmark recreated as text). */
function ClutchBadge() {
  return (
    <a
      href="https://clutch.co"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-end gap-5 rounded-md transition-opacity hover:opacity-80"
      aria-label="Rated 5 out of 5 on Clutch, 49 reviews (opens in a new tab)"
    >
      <span aria-hidden className="leading-none">
        <span className="block text-[0.5625rem] font-semibold tracking-wide text-heading uppercase">
          Reviewed on
        </span>
        <span className="mt-1 block text-h3 leading-none tracking-tight text-heading">
          Clu
          <span className="relative">
            t<span className="absolute -right-0.5 bottom-1.5 size-1.5 rounded-full bg-danger" />
          </span>
          ch
        </span>
      </span>
      <span aria-hidden>
        <span className="flex gap-0.5 text-danger">
          {Array.from({ length: 5 }, (_, index) => (
            <BiSolidStar key={index} className="size-4" />
          ))}
        </span>
        <span className="mt-1 block text-body-s text-body">49 reviews</span>
      </span>
    </a>
  )
}

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-hero pt-nav lg:min-h-210"
    >
      <Rays origin="bottom-left" className="-z-10 text-white/60 dark:text-white/3" />
      <Container className="pt-6 pb-20 lg:pt-10 lg:pb-36">
        <Breadcrumb items={[{ label: 'About' }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-130"
        >
          <h1 id="about-title" className="mt-10 text-h2 lg:mt-19 lg:text-h1">
            About Silicon
          </h1>
          <p className="mt-5 text-body-l text-body md:text-body-xl">
            We are a dedicated team of passionate product managers, full stack developers, UX/UI
            designers, QA engineers and marketing experts helping businesses of every size — from
            new startups to public companies — launch their projects using our software.
          </p>
          <div className="mt-10">
            <ClutchBadge />
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 lg:mt-16 lg:w-130">
            {STATS.map((stat) => (
              <div key={stat.strong} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-body-s text-body sm:text-body-m">
                  <strong className="font-bold text-title">{stat.strong}</strong> {stat.rest}
                  <br />
                  {stat.line2}
                </dt>
                <dd className="text-h3 text-heading md:text-h2">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </Container>
    </section>
  )
}
