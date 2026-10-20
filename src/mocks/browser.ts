import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMocking(): Promise<void> {
  await worker.start({
    // Images, fonts and Vite modules pass straight through; only API calls are mocked.
    onUnhandledFrame: 'bypass',
    quiet: true,
  })
}
