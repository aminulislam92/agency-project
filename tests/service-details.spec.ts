import { expect, test } from '@playwright/test'

test.describe('service details page', () => {
  test('renders the service from its slug', async ({ page }) => {
    await page.goto('/services/business-analytics')
    await expect(page.getByRole('heading', { level: 1, name: 'Business Analytics' })).toBeVisible()
    await expect(page).toHaveTitle('Business Analytics | Silicon')
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText(
      'Business Analytics',
    )
    await expect(page.getByRole('heading', { name: 'How We Work?' })).toBeVisible()
  })

  test('navigating from the services grid opens the details page', async ({ page }) => {
    await page.goto('/services')
    await page.getByRole('link', { name: 'Software Integration' }).click()
    await expect(page).toHaveURL(/\/services\/software-integration$/)
    await expect(
      page.getByRole('heading', { level: 1, name: 'Software Integration' }),
    ).toBeVisible()
  })

  test('unknown slug shows a not-found message', async ({ page }) => {
    await page.goto('/services/does-not-exist')
    await expect(page.getByRole('heading', { name: 'Service not found' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'See all services' })).toBeVisible()
  })
})
