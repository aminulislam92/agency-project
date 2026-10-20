import { expect, test } from '@playwright/test'

const POST = '/blog/this-long-awaited-technology-may-finally-change-the-world'

test.describe('blog details page', () => {
  test('renders the post, comments and related articles', async ({ page }) => {
    await page.goto(POST)
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'This Long-Awaited Technology May Finally Change the World',
      }),
    ).toBeVisible()
    await expect(page).toHaveTitle(/This Long-Awaited Technology/)
    await expect(page.getByRole('heading', { name: '4 comments' })).toBeVisible()
    await expect(page.getByText('@Ralph Edwards')).toBeVisible()
    await expect(
      page.locator('section[aria-labelledby="related-title"]').getByRole('article').first(),
    ).toBeAttached()
  })

  test('posting a comment validates and adds it to the list', async ({ page }) => {
    await page.goto(POST)
    const form = page.locator('#leave-comment form')
    await form.scrollIntoViewIfNeeded()
    await form.getByRole('button', { name: 'Post comment' }).click()
    await expect(form.getByText('Please enter your name.')).toBeVisible()

    await form.getByLabel('Name', { exact: true }).fill('Test Reader')
    await form.getByLabel('Email', { exact: true }).fill('reader@example.com')
    await form.getByLabel('Comment', { exact: true }).fill('Great article, thanks for sharing!')
    await form.getByRole('button', { name: 'Post comment' }).click()

    await expect(page.getByRole('heading', { name: '5 comments' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'Comment by Test Reader' })).toContainText(
      'Great article',
    )
    await expect(form.getByLabel('Comment', { exact: true })).toHaveValue('')
  })

  test('replying mentions the author and nests under the thread', async ({ page }) => {
    await page.goto(POST)
    await page.getByRole('button', { name: 'Reply to Cameron Williamson' }).click()
    const form = page.locator('#leave-comment')
    await expect(form.getByText('Replying to @Cameron Williamson')).toBeVisible()
    await expect(form.getByLabel('Comment', { exact: true })).toBeFocused()

    await form.getByLabel('Name', { exact: true }).fill('Reply Bot')
    await form.getByLabel('Email', { exact: true }).fill('bot@example.com')
    await form.getByLabel('Comment', { exact: true }).fill('Totally agree with you.')
    await form.getByRole('button', { name: 'Post comment' }).click()

    const reply = page.getByRole('article', { name: 'Comment by Reply Bot' })
    await expect(reply).toContainText('@Cameron Williamson')
    await expect(form.getByText('Replying to')).toBeHidden()
  })

  test('unknown slug shows a not-found message', async ({ page }) => {
    await page.goto('/blog/not-a-real-post')
    await expect(page.getByRole('heading', { name: 'Post not found' })).toBeVisible()
  })
})
