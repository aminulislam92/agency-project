import '@fontsource-variable/manrope'
import './index.css'
import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router/dom'
import { store } from '@/app/store'
import { ThemeSync } from '@/features/theme/ThemeSync'
import { MOCKS_ENABLED } from '@/lib/config'
import { router } from '@/router'

async function enableMocking() {
  if (!MOCKS_ENABLED) return
  const { startMocking } = await import('@/mocks/browser')
  await startMocking()
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found')

// Render even if the mock worker fails to load (e.g. a dropped network request):
// API calls then surface through the components' error states instead of a blank page.
void enableMocking()
  .catch((error: unknown) => {
    console.error('Mock API failed to start', error)
  })
  .finally(() => {
    createRoot(rootElement).render(
      <StrictMode>
        <Provider store={store}>
          <ThemeSync />
          <MotionConfig reducedMotion="user">
            <RouterProvider router={router} />
          </MotionConfig>
        </Provider>
      </StrictMode>,
    )
  })
