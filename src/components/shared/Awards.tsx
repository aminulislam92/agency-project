import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useGetAwardsQuery } from '@/services/companyApi'
import { AwardLogo } from './logos'
import { Reveal } from './Reveal'

/** "Award-winning designs featured by" + 4 award logos with captions (Home, About). */
export function Awards({ className }: { className?: string }) {
  const { data: awards, isLoading, isError } = useGetAwardsQuery()

  // Decorative social proof: hide the row entirely if it fails to load
  if (isError) return null

  return (
    <section
      aria-labelledby="awards-title"
      className={cn(
        'flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
    >
      <h2 id="awards-title" className="max-w-sm text-h4 md:text-h3 lg:text-h2">
        Award-winning designs featured by
      </h2>
      <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:w-196 lg:shrink-0">
        {isLoading &&
          Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="flex flex-col items-center gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-28" />
            </li>
          ))}
        {awards?.map((award, index) => (
          <Reveal as="li" key={award.id} delay={index * 0.08} className="text-center">
            <div
              className={cn(
                'flex h-14 items-center justify-center',
                award.logo === 'cssda' ? 'text-primary/80' : 'text-gray-500',
              )}
            >
              <AwardLogo id={award.logo} className="h-12" />
              <span className="sr-only">{award.name}</span>
            </div>
            <p className="mt-2 text-body-s text-body">{award.caption}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
