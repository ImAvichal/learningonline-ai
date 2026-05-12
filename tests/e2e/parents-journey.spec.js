// tests/e2e/parents-journey.spec.js
// The full Parents & Caregivers user journey.
// This test would have caught BOTH bugs from yesterday:
//   1. /parents page missing (404)
//   2. Final lesson redirect broken (silent no-op)

import { test, expect } from '@playwright/test'

// Helper: programmatic sign-in via Supabase auth API to skip OAuth UI.
// Uses a dedicated TEST_USER created in Supabase test environment.
async function signInAsTestUser(page) {
  await page.goto('/')
  await page.evaluate(async ({ email, password }) => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    await supabase.auth.signInWithPassword({ email, password })
  }, {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  })
  await page.reload()
}

test('parents user can reach the module', async ({ page }) => {
  await signInAsTestUser(page)
  await page.goto('/')
  // Click the Parents & Caregivers CTA on the homepage
  await page.getByRole('link', { name: /Start Free Module|Open Parent Module/i }).first().click()
  await expect(page).toHaveURL(/\/parents/)
  await expect(page.getByRole('heading', { name: /Parents & Caregivers/i })).toBeVisible()
})

test('completing all lessons triggers celebration page', async ({ page }) => {
  await signInAsTestUser(page)
  await page.goto('/parents')

  // Mark each lesson complete sequentially.
  // This test does the same thing a user does — clicks "Mark Complete" each time.
  // It would have caught the broken final-lesson redirect immediately.
  for (let i = 0; i < 9; i++) {
    const markBtn = page.getByRole('button', { name: /Mark Complete/i })
    await markBtn.click()
    // After 400ms, either advance or redirect — both are correct behaviour
    await page.waitForTimeout(500)
  }

  // Final assertion: after the last lesson, must redirect to celebration
  await expect(page).toHaveURL(/\/course-complete\?track=parents/, { timeout: 5000 })

  // Celebration page shows the right content
  await expect(page.getByText(/Congratulations.*Parents & Caregivers/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /Continue Your AI Journey/i })).toBeVisible()
})

test('Continue Your AI Journey CTA points to /pricing', async ({ page }) => {
  await page.goto('/course-complete?track=parents')
  const cta = page.getByRole('link', { name: /Continue Your AI Journey/i })
  await expect(cta).toHaveAttribute('href', '/pricing')
})
