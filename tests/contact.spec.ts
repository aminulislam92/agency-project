import { expect, test } from '@playwright/test'

test.describe('contact page', () => {
  test('shows contact links and validates + submits the form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Let’s talk!')
    // Contact details come from src/lib/config.ts, so check the link structure, not the values
    const hero = page.locator('main section').first()
    const email = hero.getByRole('link', { name: /@/ })
    await expect(email).toHaveAttribute('href', /^mailto:/)
    const address = ((await email.textContent()) ?? '').trim()
    await expect(email).toHaveAttribute('href', `mailto:${address}`)
    const phone = hero.getByRole('link', { name: /^\+?[\d\s()-]+$/ })
    const digits = ((await phone.textContent()) ?? '').replace(/[^\d+]/g, '')
    await expect(phone).toHaveAttribute('href', `tel:${digits}`)

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
