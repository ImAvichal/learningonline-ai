// tests/e2e/smoke.spec.js
// Smoke tests — every page loads, no console errors, key text present.
// Run: `npx playwright test smoke`
// CI: runs on every push to main (~90 sec total)

import { test, expect } from '@playwright/test'

// Fail any test if a console error occurs. Catches things like
// "ThemeToggle is not defined" automatically.
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
  // Catches a missing/renamed tier
  await expect(page.getByText('Parents & Caregivers')).toBeVisible()
  await expect(page.getByText('Starting the Journey')).toBeVisible()
  await expect(page.getByText('The Pro')).toBeVisible()
  // Catches the "AI for Parents" leftover regression
  await expect(page.getByText('AI for Parents')).not.toBeVisible()
})

test('/parents page exists and renders', async ({ page }) => {
  // This single test would have caught the missing parents.js bug
  await page.goto('/parents')
  await expect(page).not.toHaveURL(/404/)
  await expect(page.getByRole('heading', { name: /Parents & Caregivers/i })).toBeVisible()
})

test('/pricing shows all tiers with prices', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByText('Parents & Caregivers')).toBeVisible()
  await expect(page.getByText('Starting the Journey')).toBeVisible()
  await expect(page.getByText('The Pro')).toBeVisible()
  // Catches pricing display bugs (e.g. "/month" overflow)
  await expect(page.getByText(/\$45\/mo|₹999\/mo|\$39\/mo|₱599\/mo/)).toBeVisible()
})

test('protected routes redirect to login when logged out', async ({ page }) => {
  await page.goto('/dashboard')
  // Either redirected to /login or shown a preview/sign-in prompt
  await expect(page).toHaveURL(/\/(login|preview|signup)/)
})

test('checkout page handles missing tier param gracefully', async ({ page }) => {
  await page.goto('/checkout')
  // Should not crash, should at least render something
  await expect(page.locator('body')).toBeVisible()
})

test('success page handles missing session_id gracefully', async ({ page }) => {
  await page.goto('/success')
  // Should show an error message, not crash
  await expect(page.getByText(/No payment session|verifying|Could not verify/i)).toBeVisible()
})
