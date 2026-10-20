import type { IconType } from 'react-icons'
import {
  BiDesktop,
  BiLineChart,
  BiMobileAlt,
  BiRightArrowCircle,
  BiRocket,
  BiSearchAlt,
  BiStopwatch,
} from 'react-icons/bi'
import { Link } from 'react-router'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import type { Service, ServiceIcon as ServiceIconId } from '@/types'

const ICONS: Record<ServiceIconId, IconType> = {
  software: BiDesktop,
  integration: BiRocket,
  mobile: BiMobileAlt,
  analytics: BiLineChart,
  testing: BiSearchAlt,
  management: BiStopwatch,
}

/** 80px primary square with the service's white icon. */
export function ServiceIcon({ icon, className }: { icon: ServiceIconId; className?: string }) {
  const Icon = ICONS[icon]
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-16 items-center justify-center rounded-lg bg-primary text-white shadow-brand md:size-20',
        className,
      )}
    >
      <Icon className="size-8 md:size-10" />
    </span>
  )
}

/** Service card: icon square overlapping the top edge, linked title with arrow, excerpt. */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <article
      className={cn(
        'group relative mt-8 rounded-lg bg-card px-6 pb-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-secondary md:mt-10 md:px-10 md:pb-10',
        className,
      )}
    >
      <ServiceIcon icon={service.icon} className="-mt-8 md:-mt-10" />
      <h2 className="mt-6 text-h5 md:text-h4">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-3 rounded-sm transition-colors group-hover:text-primary after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-primary"
        >
          {service.title}
          <BiRightArrowCircle
            aria-hidden
            className="size-6 shrink-0 text-primary transition-transform group-hover:translate-x-1"
          />
        </Link>
      </h2>
      <p className="mt-4 text-body-s text-body">{service.excerpt}</p>
    </article>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div aria-hidden className="mt-10 rounded-lg bg-card px-10 pb-10 shadow-card">
      <Skeleton className="-mt-10 size-20" />
      <Skeleton className="mt-6 h-8 w-2/3" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  )
}
