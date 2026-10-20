import { expect, test } from '@playwright/test'

test.describe('blog page', () => {
  test('lists nine posts and paginates via the URL', async ({ page }) => {
    await page.goto('/blog')
    const results = page.locator('[aria-live="polite"]').filter({ has: page.getByRole('article') })
    await expect(results.getByRole('article')).toHaveCount(9)
    await page.getByRole('button', { name: 'Go to page 2' }).click()
    await expect(page).toHaveURL(/page=2/)
    await expect(page.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  test('filters by category and by search text', async ({ page }) => {
    await page.goto('/blog')
    await page.getByLabel('Category').selectOption('marketing')
    await expect(page).toHaveURL(/category=marketing/)
    const badges = page.getByRole('article').locator('span', { hasText: /^Marketing$/ })
    await expect(badges.first()).toBeVisible()
    expect(await page.getByRole('article').count()).toBe(await badges.count())

    await page.getByLabel('Category').selectOption('')
    await page.getByRole('searchbox', { name: 'Search the blog' }).fill('agile')
    await expect(page).toHaveURL(/q=agile/)
    await expect(page.getByRole('article')).toHaveCount(1)
    await expect(page.getByRole('article')).toContainText('How Agile is Your Forecasting Process?')
  })

  test('shows an empty state and clears filters', async ({ page }) => {
    await page.goto('/blog?q=zzzz-nothing')
    await expect(page.getByText(/No posts found/)).toBeVisible()
    await page.getByRole('button', { name: 'Clear filters' }).click()
    await expect(page.getByRole('article').first()).toBeVisible()
    await expect(page).toHaveURL(/\/blog$/)
  })

  test('toggles between grid and list layouts', async ({ page }) => {
    await page.goto('/blog')
    const list = page.getByRole('button', { name: 'List view' })
    await list.click()
    await expect(list).toHaveAttribute('aria-pressed', 'true')
    await page.reload()
    await expect(page.getByRole('button', { name: 'List view' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  test('newsletter validates and subscribes', async ({ page }) => {
    await page.goto('/blog')
    const form = page.locator('section[aria-labelledby="newsletter-title"] form')
    await form.scrollIntoViewIfNeeded()
    await form.getByRole('button', { name: 'Subscribe *' }).click()
    await expect(form.getByText('Please enter a valid email address.')).toBeVisible()
    await form.getByRole('textbox', { name: 'Email address' }).fill('reader@example.com')
    await form.getByRole('button', { name: 'Subscribe *' }).click()
    await expect(form.getByText(/You are subscribed/)).toBeVisible()
  })
})
