import { expect, test } from '@playwright/test'

test.describe('contact page', () => {
  test('shows contact links and validates + submits the form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Let’s talk!')
    await expect(page.getByRole('link', { name: 'example@gmail.com' }).first()).toHaveAttribute(
      'href',
      'mailto:example@gmail.com',
    )
    await expect(page.getByRole('link', { name: '+1 406 555-0120' })).toHaveAttribute(
      'href',
      'tel:+14065550120',
    )

    const form = page.locator('main form')
    await form.getByRole('button', { name: 'Contact Us' }).click()
    await expect(form.getByText('Please enter your full name.')).toBeVisible()
    await expect(form.getByText(/at least 10 characters/)).toBeVisible()

    await form.getByLabel('Full name').fill('Sam Client')
    await form.getByLabel('Email', { exact: true }).fill('sam@example.com')
    await form.getByLabel('Message').fill('We would like a quote for a new website.')
    await form.getByRole('button', { name: 'Contact Us' }).click()
    await expect(form.getByText(/get back to you/)).toBeVisible()
  })
})
