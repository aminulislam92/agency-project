import { motion } from 'motion/react'
import { Rays } from '@/components/decor/Rays'
import { ContactForm } from '@/components/shared/ContactForm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { CONTACT_EMAIL, CONTACT_PHONE_INTL } from '@/lib/config'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function ContactPage() {
  return (
    <>
      <title>Contact | Silicon</title>
      <meta
        name="description"
        content="Want to work with us? Tell Silicon about your project — we reply within one business day."
      />

      <section
        aria-labelledby="contact-page-title"
        className="relative isolate overflow-hidden bg-hero pt-nav lg:min-h-166"
      >
        <Rays origin="bottom-left" className="-z-10 text-white/60 dark:text-white/3" />
        <Container className="pt-6 pb-20 lg:pt-10 lg:pb-24">
          <Breadcrumb items={[{ label: 'Contact' }]} />

          <div className="mt-10 grid gap-12 lg:mt-21 lg:grid-cols-12 lg:gap-6">
            <motion.div {...fadeUp(0)} className="lg:col-span-5">
              <h1 id="contact-page-title">
                <span className="block text-h4 md:text-h3">Want to work with us?</span>
                <span className="mt-3 block text-gradient text-h1 sm:text-display-3 lg:mt-4 lg:text-display-1">
                  Let&rsquo;s talk!
                </span>
              </h1>
              <ul className="mt-10 space-y-4 lg:mt-16">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="rounded-sm text-body-xl text-title underline underline-offset-4 transition-colors hover:text-primary md:text-lead"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE_INTL.replace(/[^\d+]/g, '')}`}
                    className="rounded-sm text-body-xl text-title transition-colors hover:text-primary md:text-lead"
                  >
                    {CONTACT_PHONE_INTL}
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="lg:col-span-6 lg:col-start-7">
              <ContactForm variant="simple" submitLabel="Contact Us" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
