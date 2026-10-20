import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ServiceCard, ServiceCardSkeleton } from '@/components/shared/ServiceCard'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { useGetServicesQuery } from '@/services/servicesApi'

export function ServicesGrid() {
  const { data: services, isLoading, isError, refetch } = useGetServicesQuery()

  return (
    <section aria-labelledby="services-title" className="bg-surface-alt pt-nav">
      <Container>
        <PageHeader
          title={<span id="services-title">Services Page</span>}
          breadcrumb={[{ label: 'Services Page' }]}
        />

        <div className="mt-4 md:mt-9">
          {isError && (
            <ErrorState
              className="mt-10"
              message="We couldn't load our services."
              onRetry={() => void refetch()}
            />
          )}
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 md:gap-y-10">
            {isLoading &&
              Array.from({ length: 6 }, (_, index) => <ServiceCardSkeleton key={index} />)}
            {services?.map((service, index) => (
              <Reveal key={service.id} delay={(index % 2) * 0.1} className="flex">
                <ServiceCard service={service} className="flex-1" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
