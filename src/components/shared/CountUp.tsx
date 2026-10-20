import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const format = new Intl.NumberFormat('en-US')

/** Number that counts up once when scrolled into view (static for reduced motion). */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format.format(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref} className={className}>
      {format.format(value)}
    </span>
  )
}
