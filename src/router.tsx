import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { PageLoader } from '@/components/layout/PageLoader'
import { RootLayout } from '@/components/layout/RootLayout'
import { RouteError } from '@/components/layout/RouteError'

/** Code-split a page module whose default export is the page component. */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
})

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: PageLoader,
    ErrorBoundary: RouteError,
    children: [
      { index: true, lazy: page(() => import('@/pages/Home')) },
      { path: 'services', lazy: page(() => import('@/pages/Services')) },
      { path: 'services/:slug', lazy: page(() => import('@/pages/ServiceDetails')) },
      { path: 'portfolio', lazy: page(() => import('@/pages/Portfolio')) },
      { path: 'about', lazy: page(() => import('@/pages/About')) },
      { path: 'blog', lazy: page(() => import('@/pages/Blog')) },
      { path: 'blog/:slug', lazy: page(() => import('@/pages/BlogDetails')) },
      { path: 'contact', lazy: page(() => import('@/pages/Contact')) },
    ],
  },
  // The 404 design is a full-screen page without navbar/footer
  {
    path: '*',
    HydrateFallback: PageLoader,
    ErrorBoundary: RouteError,
    lazy: page(() => import('@/pages/NotFound')),
  },
])
