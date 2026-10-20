import '@fontsource-variable/manrope'
import 'swiper/css'
import './index.css'
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

void enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeSync />
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
})
