import { ProjectTile } from '@/components/shared/ProjectCard'
import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import { useGetProjectsQuery } from '@/services/projectsApi'

/* Masonry slots: tall left, two squares, wide bottom-right (416/856 grid). */
const SLOTS = [
  { className: 'aspect-[4/5] sm:row-span-2 sm:aspect-auto', width: 416, height: 856 },
  { className: 'aspect-square', width: 416, height: 416 },
  { className: 'aspect-square', width: 416, height: 416 },
  { className: 'aspect-[856/416] sm:col-span-2 lg:col-span-2', width: 856, height: 416 },
]

export function FeaturedProjects() {
  const { data, isLoading, isError, refetch } = useGetProjectsQuery({ featured: true })

  return (
    <section aria-labelledby="featured-title" className="pt-24 pb-20 lg:pt-32 lg:pb-25">
      <Container>
        <SectionHeading
          id="featured-title"
          title="Featured Projects"
          subtitle="We create websites and mobile apps, marketing materials, branding, web design, UX/UI design and illustrations."
          subtitleClassName="max-w-150"
        />

        <div className="mt-10">
          {isError && (
            <ErrorState message="We couldn't load our projects." onRetry={() => void refetch()} />
          )}
          {(isLoading || data) && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              {SLOTS.map((slot, index) => {
                const project = data?.items[index]
                return (
                  <Reveal key={index} delay={index * 0.08} className={slot.className}>
                    {project ? (
                      <ProjectTile
                        project={project}
                        width={slot.width}
                        height={slot.height}
                        className="size-full"
                      />
                    ) : (
                      <Skeleton className="size-full" />
                    )}
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink to="/portfolio">Explore all</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
