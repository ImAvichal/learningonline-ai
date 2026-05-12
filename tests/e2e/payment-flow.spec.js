// tests/e2e/payment-flow.spec.js
// Real Stripe TEST mode end-to-end.
// Requires: STRIPE_SECRET_KEY=sk_test_... in environment.
// Cost: zero (Stripe test mode doesn't charge cards).
// Catches: webhook delivery, entitlement creation, /success page, dashboard access.

import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

// Lazily construct the Supabase client so tests can be listed/imported
// even without env vars set (CI lists tests in one step, runs in another).
const sb = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Fresh test user per run, cleaned up after
const TEST_EMAIL = `test+${Date.now()}@learningonline.ai`
const TEST_PASSWORD = 'TestPassword123!'

test.afterAll(async () => {
  // Clean up test user from DB
  const { data: { users } } = await sb().auth.admin.listUsers()
  const u = users.find(x => x.email === TEST_EMAIL)
  if (u) {
    await sb().from('purchases').delete().eq('user_id', u.id)
    await sb().from('users_profile').delete().eq('id', u.id)
    await sb().auth.admin.deleteUser(u.id)
  }
})

test('full payment journey: signup → checkout → pay → success → dashboard', async ({ page }) => {
  // 1. Sign up
  await page.goto('/signup?tier=journey&interval=monthly')
  await page.getByLabel('Email').fill(TEST_EMAIL)
  await page.getByLabel('Password').fill(TEST_PASSWORD)
  await page.getByRole('button', { name: /Sign up|Create account/i }).click()

  // 2. Land on checkout
  await expect(page).toHaveURL(/\/checkout/, { timeout: 10000 })
  await expect(page.getByText(/Starting the Journey/i)).toBeVisible()

  // 3. Click pay → redirected to Stripe
  await page.getByRole('button', { name: /Pay .* Securely/i }).click()
  await page.waitForURL(/checkout\.stripe\.com/, { timeout: 15000 })

  // 4. Fill Stripe test card
  // Stripe checkout uses iframes — Playwright handles them but selectors are different
  const cardFrame = page.frameLocator('iframe[name*="card"]').first()
  await cardFrame.getByPlaceholder('1234 1234 1234 1234').fill('4242 4242 4242 4242')
  await cardFrame.getByPlaceholder('MM / YY').fill('12/30')
  await cardFrame.getByPlaceholder('CVC').fill('123')
  await page.getByPlaceholder('Full name on card').fill('Test User')
  await page.getByRole('button', { name: /Pay|Subscribe/i }).click()

  // 5. Redirect to /success
  await page.waitForURL(/\/success/, { timeout: 30000 })
  await expect(page.getByText(/You're in|Welcome/i)).toBeVisible()

  // 6. Click Start Learning → land on dashboard
  await page.getByRole('link', { name: /Start Learning/i }).click()
  await expect(page).toHaveURL(/\/dashboard/)

  // 7. Verify DB: purchase row exists with correct tier
  await page.waitForTimeout(2000)  // give webhook time to fire
  const { data: { users } } = await sb().auth.admin.listUsers()
  const u = users.find(x => x.email === TEST_EMAIL)
  expect(u).toBeDefined()

  const { data: purchase } = await supabase
    .from('purchases')
    .select('tier, payment_status')
    .eq('user_id', u.id)
    .single()

  expect(purchase.tier).toBe('journey')
  expect(purchase.payment_status).toBe('completed')

  // 8. Verify profile updated
  const { data: profile } = await supabase
    .from('users_profile')
    .select('selected_tier')
    .eq('id', u.id)
    .single()

  expect(profile.selected_tier).toBe('journey')
})

test('paid user visiting /checkout redirects to /dashboard', async ({ page }) => {
  // Programmatically sign in as the user we just created (DB still has them)
  await page.goto('/')
  await page.evaluate(async ({ email, password }) => {
    const { createClient } = await import('@supabase/supabase-js')
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    await sb.auth.signInWithPassword({ email, password })
  }, { email: TEST_EMAIL, password: TEST_PASSWORD })

  await page.goto('/checkout?tier=journey&interval=monthly')
  // Should redirect to /dashboard, not stay on /checkout
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 })
})
