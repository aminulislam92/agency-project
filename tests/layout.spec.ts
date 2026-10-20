import { expect, test } from '@playwright/test'

test.describe('layout', () => {
  test('navbar becomes opaque after scrolling', async ({ page }) => {
    await page.goto('/services')
    const header = page.locator('header').first()
    await expect(header).toHaveClass(/bg-transparent/)
    // Guarantee a scrollable page regardless of content length
    await page.evaluate(() => {
      document.body.style.minHeight = '3000px'
      window.scrollTo(0, 600)
    })
    await expect(header).toHaveClass(/shadow-nav/)
  })

  test('theme toggle switches and persists dark mode', async ({ page, isMobile }) => {
    test.skip(isMobile, 'toggle lives in the drawer on mobile')
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    await page.getByRole('switch', { name: 'Dark mode' }).click()
    await expect(html).toHaveClass(/dark/)

    await page.reload()
    await expect(html).toHaveClass(/dark/)
    expect(await page.evaluate(() => localStorage.getItem('silicon-theme'))).toBe('dark')
  })

  test('services dropdown is keyboard accessible', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop navigation only')
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Services' })
    await trigger.focus()
    await page.keyboard.press('ArrowDown')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'All Services' })).toBeFocused()

    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('link', { name: 'Custom Software Development' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })

  test('mobile drawer opens, lists services and closes on Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only')
    await page.goto('/')
    const open = page.getByRole('button', { name: 'Open menu' })
    await open.click()
    const drawer = page.getByRole('dialog', { name: 'Main menu' })
    await expect(drawer).toBeVisible()

    await drawer.getByRole('button', { name: 'Services' }).click()
    await expect(drawer.getByRole('link', { name: 'Software Testing' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(open).toBeFocused()
  })

  test('unknown routes render the 404 page', async ({ page }) => {
    await page.goto('/does-not-exist')
    await expect(page.getByRole('heading', { name: 'Error 404' })).toBeVisible()
    await expect(page).toHaveTitle(/Page not found/)
  })
})
