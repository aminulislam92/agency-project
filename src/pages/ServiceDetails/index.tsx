import { useParams } from 'react-router'
import { ClientsCarousel } from '@/components/shared/ClientsCarousel'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { useGetServiceBySlugQuery } from '@/services/servicesApi'
import { HowWeWork } from './sections/HowWeWork'
import { LaunchCTA } from './sections/LaunchCTA'
import { Personalize } from './sections/Personalize'
import { ProductExperience } from './sections/ProductExperience'
import { ServiceHero } from './sections/ServiceHero'
import { WhatWeOffer } from './sections/WhatWeOffer'

export default function ServiceDetailsPage() {
  const { slug = '' } = useParams()
  const { data: service, error, isError, refetch } = useGetServiceBySlugQuery(slug)

  if (isError) {
    const notFound = 'status' in error && error.status === 404
    return (
      <section className="pt-nav">
        <title>{notFound ? 'Service not found | Silicon' : 'Error | Silicon'}</title>
        <Container className="py-24 text-center">
          <h1 className="text-h2">{notFound ? 'Service not found' : 'Something went wrong'}</h1>
          <p className="mt-4 text-body-l text-body">
            {notFound
              ? "We couldn't find the service you were looking for."
              : "We couldn't load this service."}
          </p>
          {notFound ? (
            <ButtonLink to="/services" className="mt-8">
              See all services
            </ButtonLink>
          ) : (
            <ErrorState className="mx-auto mt-8 max-w-md" onRetry={() => void refetch()} />
          )}
        </Container>
      </section>
    )
  }

  return (
    <>
      <title>{`${service?.title ?? 'Service'} | Silicon`}</title>
      {service && <meta name="description" content={service.description} />}

      <ServiceHero service={service} />
      <WhatWeOffer />
      <HowWeWork />
      <Container className="pt-20 lg:pt-28">
        <ClientsCarousel title="Trusted by Leading Companies" variant="center" />
      </Container>
      <Personalize />
      <ProductExperience />
      <LaunchCTA />
    </>
  )
}
