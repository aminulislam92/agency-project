import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds before the animation starts (for staggering siblings) */
  delay?: number
  /** Vertical offset in px the content rises from */
  y?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Subtle fade-up when the element scrolls into view (once). Honours reduced motion. */
export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
