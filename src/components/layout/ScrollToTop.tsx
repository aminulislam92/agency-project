import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BiChevronUp } from 'react-icons/bi'
import { IconButton } from '@/components/ui/IconButton'

/**
 * Floating "back to top" button. (Scroll reset on navigation is handled by
 * React Router's <ScrollRestoration /> in RootLayout.)
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-4 bottom-4 z-40 md:right-8 md:bottom-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          <IconButton
            label="Back to top"
            variant="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <BiChevronUp aria-hidden />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
