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
  await expect(page.getByRole('heading', { name: 'Parents & Caregivers', exact: true }).first()).toBeVisible()
  await expect(page.getByText('Starting the Journey', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('The Pro', { exact: true }).first()).toBeVisible()
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
  await expect(page.getByRole('heading', { name: 'Our Family AI Agreement' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Print or save as PDF/i })).toBeVisible()
  await expect(page.getByText(/Six questions to ask together/i)).toBeVisible()
  await expect(page.getByText(/Our family checklist/i)).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.sheet')).toBeVisible()
  await expect(page.locator('.screen-tools')).toBeHidden()
})
