import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProjectCard, ProjectCardSkeleton } from '@/components/shared/ProjectCard'
import { ProjectLightbox } from '@/components/shared/ProjectLightbox'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { useGetProjectsQuery } from '@/services/projectsApi'
import type { Project, ProjectCategory } from '@/types'

const PAGE_SIZE = 6
const PANEL_ID = 'portfolio-grid'

const FILTERS: (TabItem<string> & { category: ProjectCategory | 'all' })[] = [
  { value: 'all', label: 'All Works', category: 'all' },
  { value: 'web-design', label: 'Web Design', category: 'Web Design' },
  { value: 'graphic-design', label: 'Graphic Design', category: 'Graphic Design' },
  { value: 'branding', label: 'Branding', category: 'Branding' },
  { value: 'ui-ux', label: 'UI / UX', category: 'UI / UX' },
  { value: 'motion-design', label: 'Motion Design', category: 'Motion Design' },
]

const IMAGE_CLASS = 'aspect-[4/3] md:aspect-auto md:h-72 lg:h-105'

/** Rows alternate 5/7 and 7/5 of the 12-column grid (526px / 746px at 1296). */
const spanFor = (index: number) =>
  Math.floor(index / 2) % 2 === index % 2 ? 'lg:col-span-5' : 'lg:col-span-7'

export function ProjectsGrid() {
  const [params, setParams] = useSearchParams()
  const filter = FILTERS.find((item) => item.value === params.get('category')) ?? FILTERS[0]
  const page = Math.max(1, Number(params.get('page')) || 1)
  const gridRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<Project | null>(null)
  const closePreview = useCallback(() => setPreview(null), [])

  const { data, isLoading, isFetching, isError, refetch } = useGetProjectsQuery({
    category: filter?.category,
    page,
    pageSize: PAGE_SIZE,
  })

  const update = (next: { category?: string; page?: number }) => {
    const search = new URLSearchParams(params)
    if (next.category !== undefined) {
      if (next.category === 'all') search.delete('category')
      else search.set('category', next.category)
      search.delete('page')
    }
    if (next.page !== undefined) {
      if (next.page <= 1) search.delete('page')
      else search.set('page', String(next.page))
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setParams(search, { preventScrollReset: true })
  }

  return (
    <section aria-labelledby="portfolio-title" className="pt-nav">
      <Container>
        <PageHeader
          title={<span id="portfolio-title">Grid View</span>}
          breadcrumb={[{ label: 'Grid View' }]}
          aside={
            <Tabs
              label="Filter projects by category"
              panelId={PANEL_ID}
              items={FILTERS}
              value={filter?.value ?? 'all'}
              onChange={(value) => update({ category: value })}
            />
          }
        />

        <div
          ref={gridRef}
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`${PANEL_ID}-tab-${filter?.value ?? 'all'}`}
          aria-busy={isFetching}
          className="mt-8 scroll-mt-28 lg:mt-10"
        >
          {isError && (
            <ErrorState message="We couldn't load the projects." onRetry={() => void refetch()} />
          )}

          {data?.items.length === 0 && (
            <p className="rounded-lg bg-surface-alt px-6 py-16 text-center text-body-l text-body">
              No projects in this category yet.
            </p>
          )}

          <div
            className={cn(
              'grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-12',
              isFetching && !isLoading && 'opacity-60 transition-opacity',
            )}
          >
            {isLoading &&
              Array.from({ length: PAGE_SIZE }, (_, index) => (
                <div key={index} className={spanFor(index)}>
                  <ProjectCardSkeleton imageClassName={IMAGE_CLASS} />
                </div>
              ))}
            {data?.items.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setPreview}
                imageClassName={IMAGE_CLASS}
                className={spanFor(index)}
              />
            ))}
          </div>

          {data && (
            <Pagination
              label="Portfolio pages"
              page={data.page}
              totalPages={data.totalPages}
              onChange={(next) => update({ page: next })}
              className="mt-12"
            />
          )}
        </div>
      </Container>

      <ProjectLightbox project={preview} onClose={closePreview} />
    </section>
  )
}
