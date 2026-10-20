import { BiRightArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
  /** Classes for the image box (height / aspect) */
  imageClassName?: string
  className?: string
}

/**
 * Portfolio card: image + title; on hover/focus the title turns primary and the
 * tags fade in (their space is always reserved so rows don't jump).
 */
export function ProjectCard({ project, onOpen, imageClassName, className }: ProjectCardProps) {
  return (
    <article className={cn('group relative', className)}>
      <div className={cn('overflow-hidden rounded-lg', imageClassName)}>
        <img
          src={project.image}
          alt=""
          width={746}
          height={420}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h2 className="mt-5 text-h5 text-title transition-colors group-focus-within:text-primary group-hover:text-primary md:mt-6 md:text-h4">
        {/* Stretched button: the whole card opens the preview */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          className="text-left after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-primary"
        >
          {project.title}
        </button>
      </h2>
      <p className="mt-3 text-body-s text-muted transition-opacity duration-300 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
        {project.tags.join(' / ')}
      </p>
    </article>
  )
}

export function ProjectCardSkeleton({ imageClassName }: { imageClassName?: string }) {
  return (
    <div aria-hidden>
      <Skeleton className={imageClassName} />
      <Skeleton className="mt-6 h-7 w-2/3" />
      <Skeleton className="mt-3 h-4 w-1/2" />
    </div>
  )
}

interface ProjectTileProps {
  project: Project
  className?: string
  /** Rendered width/height hints for the <img> */
  width?: number
  height?: number
}

/** Image-only tile for the Home masonry grid; title slides in on hover/focus. */
export function ProjectTile({ project, className, width = 416, height = 416 }: ProjectTileProps) {
  return (
    <Link
      to="/portfolio"
      className={cn(
        'group relative block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className,
      )}
    >
      <img
        src={project.image}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="text-body-s text-white/70">{project.categories.join(' / ')}</span>
        <span className="mt-1 flex items-center gap-2 text-h5 text-white">
          {project.title}
          <BiRightArrowAlt aria-hidden className="size-6" />
        </span>
      </span>
    </Link>
  )
}
