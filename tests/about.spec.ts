import { expect, test } from '@playwright/test'

test.describe('about page', () => {
  test('shows stats and the eight team members from the API', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { level: 1, name: 'About Silicon' })).toBeVisible()
    await expect(page.getByText('2,480')).toBeVisible()
    const team = page.locator('section[aria-labelledby="leadership-title"] article')
    await expect(team).toHaveCount(8)
    await expect(team.first()).toContainText('Jenny Wilson')
  })

  test('video opens in a modal and closes with Escape', async ({ page }) => {
    await page.goto('/about')
    const play = page.getByRole('button', { name: 'Play the studio video' })
    await play.scrollIntoViewIfNeeded()
    await play.click()
    const dialog = page.getByRole('dialog', { name: 'Inside the Silicon studio' })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('iframe')).toHaveAttribute('src', /youtube-nocookie/)
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('testimonial dots switch the active quote', async ({ page }) => {
    await page.goto('/about')
    const section = page.locator('section[aria-labelledby="about-testimonials-title"]')
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByRole('button', { name: 'Show testimonial 2 of 4' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    await section.getByRole('button', { name: 'Show testimonial 3 of 4' }).click()
    await expect(section.getByRole('button', { name: 'Show testimonial 3 of 4' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    await expect(section.locator('.swiper-slide-active')).toContainText('Jenny Wilson')
  })
})
