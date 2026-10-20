import { defineConfig, devices } from '@playwright/test'

/*
 * Tests run against a production build served by `vite preview`, with the MSW mock API
 * enabled via `.env.e2e`. Unlike the dev server nothing is compiled on demand, so timing
 * stays stable under parallel load — and the tests exercise what actually ships.
 */
const PORT = 4173

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 4,
  expect: { timeout: 10_000 },
  // One retry absorbs transient browser network resets (seen locally as ERR_NETWORK_CHANGED);
  // a genuine failure still fails twice and is reported.
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npx vite build --mode e2e && npx vite preview --mode e2e --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // Always rebuild so tests never run against a stale bundle
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
