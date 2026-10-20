import { expect, test } from '@playwright/test'

test.describe('portfolio page', () => {
  test('filters by category with tabs (mouse + keyboard) and syncs the URL', async ({ page }) => {
    await page.goto('/portfolio')
    const grid = page.getByRole('tabpanel')
    await expect(grid.getByRole('article')).toHaveCount(6)

    await page.getByRole('tab', { name: 'Branding' }).click()
    await expect(page).toHaveURL(/category=branding/)
    await expect(page.getByRole('tab', { name: 'Branding' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    // Arrow keys move selection to the next tab
    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('tab', { name: 'UI / UX' })).toBeFocused()
    await expect(page).toHaveURL(/category=ui-ux/)
    await expect(grid.getByRole('article').first()).toBeVisible()
  })

  test('pagination updates the page and URL', async ({ page }) => {
    await page.goto('/portfolio')
    const firstTitle = await page.getByRole('tabpanel').getByRole('heading').first().textContent()
    await page.getByRole('button', { name: 'Go to page 2' }).click()
    await expect(page).toHaveURL(/page=2/)
    await expect(page.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await expect(page.getByRole('tabpanel').getByRole('heading').first()).not.toHaveText(
      firstTitle ?? '',
    )
  })

  test('project preview opens in a dialog and closes with Escape', async ({ page }) => {
    await page.goto('/portfolio')
    const trigger = page.getByRole('button', { name: 'Big Blue Whale Shape' })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Big Blue Whale Shape' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
})
