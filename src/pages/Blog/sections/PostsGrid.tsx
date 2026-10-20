import { useRef, useState } from 'react'
import { BiGridAlt, BiListUl, BiSearch } from 'react-icons/bi'
import { useSearchParams } from 'react-router'
import { BlogCard, BlogCardSkeleton } from '@/components/shared/BlogCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { Input } from '@/components/ui/Input'
import { Pagination } from '@/components/ui/Pagination'
import { Select } from '@/components/ui/Select'
import { cn } from '@/lib/cn'
import { slugify } from '@/lib/slug'
import { useGetPostsQuery } from '@/services/postsApi'
import { POST_CATEGORIES } from '@/types'

const PAGE_SIZE = 9
const VIEW_KEY = 'silicon-blog-view'
type View = 'grid' | 'list'

const CATEGORY_OPTIONS = POST_CATEGORIES.map((name) => ({ value: slugify(name), label: name }))
const SELECT_OPTIONS = [{ value: '', label: 'All categories' }, ...CATEGORY_OPTIONS]

function readView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'grid'
  } catch {
    return 'grid'
  }
}

export function PostsGrid() {
  const [params, setParams] = useSearchParams()
  const categorySlug = params.get('category') ?? ''
  const category = CATEGORY_OPTIONS.find((option) => option.value === categorySlug)?.label
  const search = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const [view, setView] = useState<View>(readView)
  const [query, setQuery] = useState(search)
  const resultsRef = useRef<HTMLDivElement>(null)
  const searchTimer = useRef<number | undefined>(undefined)

  const { data, isLoading, isFetching, isError, refetch } = useGetPostsQuery({
    category,
    search: search || undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const update = (changes: Record<string, string | undefined>, scroll = false) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    if (!('page' in changes)) next.delete('page')
    setParams(next, { preventScrollReset: true, replace: !scroll })
    if (scroll) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Debounce the search box into the URL
  const onSearchChange = (value: string) => {
    setQuery(value)
    window.clearTimeout(searchTimer.current)
    searchTimer.current = window.setTimeout(() => update({ q: value.trim() || undefined }), 350)
  }

  const changeView = (next: View) => {
    setView(next)
    try {
      localStorage.setItem(VIEW_KEY, next)
    } catch {
      /* preference just won't persist */
    }
  }

  const viewButton = (value: View, label: string, Icon: typeof BiGridAlt) => (
    <button
      type="button"
      aria-label={label}
      aria-pressed={view === value}
      onClick={() => changeView(value)}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-md text-2xl transition-colors hover:bg-subtle hover:text-primary focus-visible:outline-2 focus-visible:outline-primary',
        view === value ? 'text-primary' : 'text-title',
      )}
    >
      <Icon aria-hidden />
    </button>
  )

  return (
    <section aria-labelledby="blog-page-title" className="pt-nav pb-20 lg:pb-24">
      <Container>
        <PageHeader
          title={<span id="blog-page-title">Grid View no Sidebar</span>}
          breadcrumb={[{ label: 'Grid View no Sidebar' }]}
          aside={
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mb-1">
              <div className="flex gap-1" role="group" aria-label="Layout">
                {viewButton('list', 'List view', BiListUl)}
                {viewButton('grid', 'Grid view', BiGridAlt)}
              </div>
              <Select
                label="Category"
                hideLabel
                options={SELECT_OPTIONS}
                value={categorySlug}
                onChange={(event) => update({ category: event.target.value || undefined }, true)}
                wrapperClassName="sm:w-60"
              />
              <form role="search" onSubmit={(event) => event.preventDefault()} className="sm:w-100">
                <Input
                  type="search"
                  label="Search the blog"
                  hideLabel
                  placeholder="Search the blog..."
                  value={query}
                  onChange={(event) => onSearchChange(event.target.value)}
                  rightIcon={<BiSearch aria-hidden className="text-title" />}
                />
              </form>
            </div>
          }
        />

        <div
          ref={resultsRef}
          aria-busy={isFetching}
          aria-live="polite"
          className="mt-8 scroll-mt-28 lg:mt-10"
        >
          {isError && (
            <ErrorState message="We couldn't load the blog posts." onRetry={() => void refetch()} />
          )}

          {data?.items.length === 0 && (
            <div className="rounded-lg bg-surface-alt px-6 py-16 text-center">
              <p className="text-body-l text-body">
                No posts found{search ? ` for “${search}”` : ''}
                {category ? ` in ${category}` : ''}.
              </p>
              <Button
                variant="outline"
                size="md"
                className="mt-6"
                onClick={() => {
                  setQuery('')
                  setParams(new URLSearchParams(), { preventScrollReset: true })
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          <div
            className={cn(
              'grid gap-6',
              view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10' : 'lg:grid-cols-2',
              isFetching && !isLoading && 'opacity-60 transition-opacity',
            )}
          >
            {isLoading &&
              Array.from({ length: PAGE_SIZE }, (_, index) => (
                <BlogCardSkeleton
                  key={index}
                  layout={view === 'grid' ? 'vertical' : 'horizontal'}
                />
              ))}
            {data?.items.map((post, index) => (
              <Reveal key={post.id} delay={(index % 3) * 0.06} className="flex">
                <BlogCard
                  post={post}
                  layout={view === 'grid' ? 'vertical' : 'horizontal'}
                  showRole={false}
                  className="flex-1"
                />
              </Reveal>
            ))}
          </div>

          {data && (
            <Pagination
              label="Blog pages"
              page={data.page}
              totalPages={data.totalPages}
              onChange={(next) => update({ page: next > 1 ? String(next) : undefined }, true)}
              className="mt-10 justify-center"
            />
          )}
        </div>
      </Container>
    </section>
  )
}
