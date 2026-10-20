import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BiX } from 'react-icons/bi'
import { Badge } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/IconButton'
import type { Project } from '@/types'

interface ProjectLightboxProps {
  project: Project | null
  onClose: () => void
}

/** Modal preview of a portfolio project (Escape / backdrop closes, focus returns to the card). */
export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = project !== null

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-70 grid place-items-center overflow-y-auto bg-gray-900/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-surface shadow-secondary"
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={project.image}
              alt={project.title}
              width={1492}
              height={840}
              className="aspect-video w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <h2 id="lightbox-title" className="text-h4 md:text-h3">
                {project.title}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <IconButton
              ref={closeRef}
              label="Close preview"
              size="sm"
              className="absolute top-4 right-4"
              onClick={onClose}
            >
              <BiX aria-hidden />
            </IconButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
