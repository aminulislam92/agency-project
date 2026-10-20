import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { cn } from '@/lib/cn'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'

export function RootLayout() {
  const navigation = useNavigation()
  const loading = navigation.state === 'loading'

  return (
    <>
      <a
        href="#main"
        className="sr-only z-100 rounded-md bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      {/* Thin progress bar while a lazy route chunk loads */}
      <div
        aria-hidden
        className={cn(
          'fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-brand-gradient transition-transform duration-500',
          loading ? 'scale-x-75' : 'scale-x-0 opacity-0',
        )}
      />

      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollRestoration />
    </>
  )
}
