import fs from 'node:fs'

const required = [
  'data/tiers.js',
  'lib/auth.js',
  'lib/email-safety.js',
  'lib/campaigns.js',
  'lib/emails.cancellation.js',
  'pages/checkout.js',
  'pages/api/create-checkout-session.js',
  'pages/api/verify-checkout.js',
  'pages/api/cron/journey-expiry.js',
  'pages/api/cron/commercial-health.js',
]
for (const file of required) if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`)

const tiers = fs.readFileSync('data/tiers.js', 'utf8')
const api = fs.readFileSync('pages/api/create-checkout-session.js', 'utf8')
const auth = fs.readFileSync('lib/auth.js', 'utf8')
const campaignApi = fs.readFileSync('pages/api/admin/send-journey-campaign.js', 'utf8')
const campaignMailer = fs.readFileSync('lib/campaigns.js', 'utf8')
const cancellationMailer = fs.readFileSync('lib/emails.cancellation.js', 'utf8')
const emailSafety = fs.readFileSync('lib/email-safety.js', 'utf8')
const checks = [
  ['India Journey is ₹499', tiers.includes("amount: 499, label: '\\u20b9499'")],
  ['Philippines Journey is ₱330', tiers.includes("amount: 330, label: '\\u20b1330'")],
  ['Checkout identity verified server-side', api.includes('supabase.auth.getUser(accessToken)')],
  ['New account receives 30-day Journey', auth.includes("selected_tier: 'journey'") && auth.includes('30 * 24 * 60 * 60 * 1000')],
  ['Campaign limited to expiring Journey trials', campaignApi.includes(".not('journey_expires_at', 'is', null)")],
  ['Campaigns fan out one recipient at a time', campaignApi.includes('for (const r of toSend)')],
  ['Email privacy guard rejects multi-recipient arrays', emailSafety.includes('to.length !== 1')],
  ['Email privacy guard rejects comma/semicolon lists', emailSafety.includes("recipient.includes(',')") && emailSafety.includes("recipient.includes(';')")],
  ['Campaign mailer uses privacy guard', campaignMailer.includes('privateRecipientPayload(to)')],
  ['Cancellation mailer uses privacy guard', cancellationMailer.includes('privateRecipientPayload(to)')],
  ['Hard-coded dev key removed', !auth.includes('loa_dev_avi_2025')],
]
let failed = false
for (const [name, ok] of checks) { console.log(`${ok ? '✓' : '✗'} ${name}`); if (!ok) failed = true }
if (failed) process.exit(1)
