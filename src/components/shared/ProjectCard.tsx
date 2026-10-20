import { BiRightArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import type { Project } from '@/types'

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
