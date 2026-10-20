import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BiX } from 'react-icons/bi'
import { IconButton } from '@/components/ui/IconButton'

interface VideoModalProps {
  open: boolean
  onClose: () => void
  /** Embeddable URL (YouTube no-cookie / Vimeo player) */
  src: string
  title: string
}

/** Lightbox with an embedded video; Escape / backdrop click closes it. */
export function VideoModal({ open, onClose, src, title }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

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
      {open && (
        <motion.div
          className="fixed inset-0 z-70 grid place-items-center bg-gray-900/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(event) => event.stopPropagation()}
          >
            <IconButton
              ref={closeRef}
              label="Close video"
              variant="card"
              size="sm"
              className="absolute -top-12 right-0"
              onClick={onClose}
            >
              <BiX aria-hidden />
            </IconButton>
            <div className="aspect-video overflow-hidden rounded-lg bg-black shadow-secondary">
              <iframe
                className="size-full"
                src={`${src}?autoplay=1&rel=0`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
