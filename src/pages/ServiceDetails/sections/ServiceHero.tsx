import { motion } from 'motion/react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Service } from '@/types'

export function ServiceHero({ service }: { service: Service | undefined }) {
  return (
    <section aria-labelledby="service-title" className="pt-nav">
      <Container>
        <div className="border-b border-border pt-6 pb-16 lg:pt-10 lg:pb-24">
          <Breadcrumb
            items={[
              { label: 'Services Page', to: '/services' },
              { label: service?.title ?? 'Service' },
            ]}
          />
          <div className="mt-10 grid gap-8 lg:mt-21 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              {service ? (
                <motion.h1
                  id="service-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-h1 md:text-display-3 xl:text-display-2"
                >
                  {service.title}
                </motion.h1>
              ) : (
                <div aria-busy>
                  <span id="service-title" className="sr-only">
                    Loading service
                  </span>
                  <Skeleton className="h-16 w-full md:h-20" />
                  <Skeleton className="mt-4 h-16 w-2/3 md:h-20" />
                </div>
              )}
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              {service ? (
                <p className="text-body-l text-body md:text-body-xl">{service.description}</p>
              ) : (
                <div className="space-y-3" aria-hidden>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              )}
              <ButtonLink to="/contact" className="mt-8 lg:mt-10">
                Start your project
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
