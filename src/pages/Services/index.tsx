import { ClientsSay } from './sections/ClientsSay'
import { GetInTouch } from './sections/GetInTouch'
import { ServicesGrid } from './sections/ServicesGrid'
import { WhyChooseUs } from './sections/WhyChooseUs'

export default function ServicesPage() {
  return (
    <>
      <title>Services | Silicon</title>
      <meta
        name="description"
        content="Custom software development, integration, mobile apps, business analytics, testing and project management — explore Silicon's services."
      />
      <ServicesGrid />
      <ClientsSay />
      <WhyChooseUs />
      <GetInTouch />
    </>
  )
}
