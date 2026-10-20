import { motion } from 'motion/react'
import { BiHomeAlt } from 'react-icons/bi'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { BrokenRobot } from './BrokenRobot'

/** Full-screen 404 (no navbar/footer, as in the design). */
export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-hero">
      <title>Page not found | Silicon</title>
      <meta name="robots" content="noindex" />

      <Container className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 text-center lg:order-1 lg:col-span-5 lg:col-start-2 lg:-translate-y-24 lg:text-left"
        >
          <h1 className="text-h1 md:text-display-3 xl:text-display-1">Error 404</h1>
          <p className="mx-auto mt-4 max-w-112 text-body-l text-body md:text-body-xl lg:mx-0 lg:mt-6">
            The page you are looking for was moved, removed or might never existed.
          </p>
          <ButtonLink
            to="/"
            className="mt-10 lg:mt-12"
            leftIcon={<BiHomeAlt aria-hidden className="size-5" />}
          >
            Go to homepage
          </ButtonLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="order-1 mx-auto w-full max-w-72 sm:max-w-90 lg:order-2 lg:col-span-5 lg:col-start-7 lg:max-w-120"
        >
          <BrokenRobot />
        </motion.div>
      </Container>

      <Container className="pb-12">
        <p className="text-center text-body-s font-semibold text-muted lg:text-left">
          © {new Date().getFullYear()}. All rights reserved. Silicon Template
        </p>
      </Container>
    </main>
  )
}
