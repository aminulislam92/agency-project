/**
 * Full-page screenshots of a route with Playwright (dev server must be running).
 *
 *   node scripts/screenshot.mjs <route> <name> [--widths=1920,375] [--dark] [--base=http://localhost:5173]
 *
 * Output: screenshots/<name>-<width>[-dark].png
 */
import fs from 'node:fs/promises'
import { chromium } from '@playwright/test'

const args = process.argv.slice(2)
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [key, value = 'true'] = a.slice(2).split('=')
      return [key, value]
    }),
)
const [rawRoute = '/', name = 'page'] = args.filter((a) => !a.startsWith('--'))
const route = rawRoute.startsWith('/') ? rawRoute : `/${rawRoute}`
const widths = (flags.widths ?? '1920,375').split(',').map(Number)
const base = flags.base ?? 'http://localhost:5173'
const dark = flags.dark === 'true'

await fs.mkdir('screenshots', { recursive: true })
const browser = await chromium.launch()

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 812 : 1080 },
    colorScheme: dark ? 'dark' : 'light',
    reducedMotion: 'reduce',
  })
  await page.goto(base + route, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // Scroll through the page so lazy images and in-view animations settle
  await page.evaluate(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)

  const file = `screenshots/${name}-${width}${dark ? '-dark' : ''}.png`
  await page.screenshot({ path: file, fullPage: true })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  console.log(`${file}  (${width}x${height})`)
  await page.close()
}

await browser.close()
