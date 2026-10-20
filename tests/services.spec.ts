import { expect, test } from '@playwright/test'

test.describe('services page', () => {
  test('lists the six services from the API', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByRole('heading', { level: 1, name: 'Services Page' })).toBeVisible()
    const cards = page.getByRole('main').getByRole('article')
    await expect(cards).toHaveCount(6)
    await expect(page.getByRole('link', { name: 'Software Testing' })).toHaveAttribute(
      'href',
      '/services/software-testing',
    )
  })

  test('contact form validates and submits', async ({ page }) => {
    await page.goto('/services')
    const form = page
      .locator('form')
      .filter({ has: page.getByRole('button', { name: 'Send request' }) })
    await form.scrollIntoViewIfNeeded()

    await form.getByRole('button', { name: 'Send request' }).click()
    await expect(form.getByText('Please choose a service.')).toBeVisible()
    await expect(form.getByText('Please enter your full name.')).toBeVisible()
    await expect(form.getByText('Please enter a valid email address.')).toBeVisible()
    await expect(form.getByText('Please accept the Terms & Conditions.')).toBeVisible()

    await form.getByLabel('Service').selectOption('mobile-app-development')
    await form.getByLabel('Full name').fill('Jane Tester')
    await form.getByLabel('Email address').fill('jane@example.com')
    await form.getByLabel('Message').fill('We need a mobile app for our store.')
    await form.getByLabel(/I agree to the/).check()
    await form.getByRole('button', { name: 'Send request' }).click()

    await expect(form.getByText(/get back to you/)).toBeVisible()
    await expect(form.getByLabel('Full name')).toHaveValue('')
  })
})
