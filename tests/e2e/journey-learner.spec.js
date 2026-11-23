// Authenticated Starting the Journey regression.
// Uses a dedicated paid Journey TEST account; never tests against a real learner.
// The account must already have Journey access, and these tests DO NOT write progress.
import { test, expect } from '@playwright/test'

test('Journey learner can resume, use practice activities and access the printable workbook', async ({ page }) => {
  test.skip(!process.env.TEST_JOURNEY_EMAIL || !process.env.TEST_JOURNEY_PASSWORD,
    'Configure dedicated TEST_JOURNEY_EMAIL and TEST_JOURNEY_PASSWORD GitHub Actions secrets.')

  await page.goto('/login')
  await page.getByPlaceholder('you@company.com').fill(process.env.TEST_JOURNEY_EMAIL)
  await page.locator('input[type="password"]').fill(process.env.TEST_JOURNEY_PASSWORD)
  await page.locator('form button[type="submit"]').click()
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 })

  // Journey users must see ten modules and no Pro-only enterprise modules.
  await expect(page.getByText('AI Foundations', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('AI Security & Data Protection', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Open workbook/i })).toBeVisible()

  await page.goto('/dashboard?lesson=m1-l3#course')
  await expect(page.getByTestId('journey-lesson-practice')).toBeVisible()
  await expect(page.getByTestId('journey-practice')).toBeVisible()
  await expect(page.getByRole('link', { name: /Printable Journey Workbook/i })).toBeVisible()

  await page.goto('/journey-guide')
  await expect(page.getByText('Your practical AI workbook')).toBeVisible()
  await expect(page.locator('.exercise')).toHaveCount(10)
  await expect(page.getByRole('button', { name: /Print or save as PDF/i })).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.screenTools')).toBeHidden()
})
