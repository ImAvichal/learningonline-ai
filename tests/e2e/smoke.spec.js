// tests/e2e/smoke.spec.js
// Production smoke tests — every public page loads and key text is present.

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  page.on('pageerror', err => { throw new Error(`Uncaught: ${err.message}`) })
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) {
      throw new Error(`Console error: ${msg.text()}`)
    }
  })
})

test('homepage loads with correct branding', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/LeO AI/)
  await expect(page.getByRole('heading', { name: /AI is changing fast/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Try a free lesson/i }).first()).toHaveAttribute('href', '/preview')
  await expect(page.getByRole('link', { name: /Explore free learning/i }).first()).toHaveAttribute('href', '/parents')
  await expect(page.getByRole('link', { name: /Explore learning options/i }).first()).toHaveAttribute('href', '/pricing')
})

test('/parents route exists', async ({ page }) => {
  await page.goto('/parents')
  // Logged-out users may be redirected to login because this free course requires authentication.
  await expect(page).toHaveURL(/\/(parents|login|signup)(?:[/?#]|$)/)
  await expect(page.locator('body')).toBeVisible()
})

test('/pricing shows all tiers with current one-time pricing', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByText('Starting the Journey', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('The Pro', { exact: true }).first()).toBeVisible()
  // Default/Australia pricing. Regional pricing is separately enforced by release invariants/server checkout.
  // Regional prices depend on visitor geography; validate any approved Journey and Pro display.
  await expect(page.getByText(/(?:\$149|US\$99|₹499|₱330)/).first()).toBeVisible()
  await expect(page.getByText(/(?:\$299|US\$199|₹1,999|₱1,999)/).first()).toBeVisible()
})

test('protected routes redirect to login when logged out', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/(login|preview|signup)/)
})

test('checkout page handles missing tier param gracefully', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page.locator('body')).toBeVisible()
})

test('success page handles missing session_id gracefully', async ({ page }) => {
  await page.goto('/success')
  await expect(page.getByText(/No payment session|verifying|Could not verify/i)).toBeVisible()
})

test('printable parent guide opens and offers PDF printing', async ({ page }) => {
  await page.goto('/parent-guide')
  await expect(page.getByRole('heading', { name: 'AI at Home' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Print or save as PDF/i })).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.paper')).toHaveCount(2)
  await expect(page.getByRole('heading', { name: "Do's" })).toBeVisible()
  await expect(page.getByRole('heading', { name: "Don'ts" })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Conversation Starters by Age' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Warning Signs Worth a Conversation' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Weekly Check-In Template' })).toBeVisible()
  // Both checklists should form balanced side-by-side columns on A4 with no overflow.
  const printLayout = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.paper')]
    const panels = [...document.querySelectorAll('.principlePanel')]
    const a = pages[0].getBoundingClientRect()
    const b = pages[1].getBoundingClientRect()
    const left = panels[0].getBoundingClientRect()
    const right = panels[1].getBoundingClientRect()
    const footer = pages[0].querySelector('.folio').getBoundingClientRect()
    return { pageOneHeight: a.height, pageTwoHeight: b.height, columnsAligned: Math.abs(left.top-right.top) < 2, twoColumns: right.left > left.right, footerInside: footer.bottom <= a.bottom+2 }
  })
  expect(printLayout.pageOneHeight).toBeLessThanOrEqual(printLayout.pageTwoHeight + 2)
  expect(printLayout.columnsAligned).toBe(true)
  expect(printLayout.twoColumns).toBe(true)
  expect(printLayout.footerInside).toBe(true)
  await expect(page.locator('.itemList').first().locator('li')).toHaveCount(10)
  await expect(page.locator('.itemList').nth(1).locator('li')).toHaveCount(10)
  await expect(page.locator('.ageList li')).toHaveCount(8)
  await expect(page.locator('.simpleList li')).toHaveCount(8)
  await expect(page.locator('.numbered li')).toHaveCount(4)
  await expect(page.locator('.tickList li')).toHaveCount(4)
  await expect(page.getByText('Try AI tools yourself — your personal experience makes every conversation better')).toBeVisible()
  await expect(page.getByText("Don't treat this as a one-time conversation — it needs to evolve as the technology does")).toBeVisible()
  await expect(page.locator('.screenTools')).toBeHidden()
  await expect(page.locator('.screen-tools')).toBeHidden()
})
