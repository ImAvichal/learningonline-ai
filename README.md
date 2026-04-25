# learningonline.ai — Flowcore AI Academy

Standalone Next.js SaaS platform. Hosts the Flowcore AI Academy as an independent product at **learningonline.ai**, with Praise Consulting referenced as the parent brand.

---

## Site Structure

```
learningonline.ai/
├── /                  → Homepage (course landing page)
├── /pricing           → Three-tier pricing
├── /login             → Sign in
├── /signup            → Create account
├── /checkout          → Stripe payment
└── /dashboard         → Gated: requires auth + tier
    ├── #home          → Overview, progress, module list
    ├── #course        → Full course player (tier-aware)
    ├── #templates     → Tier-gated template downloads
    └── #account       → Profile, subscription, sign out
```

## Architecture

```
data/
  tiers.js      ← Pricing tiers, features, Stripe price IDs
  modules.js    ← Full curriculum (8 modules, 30+ lessons, tier-layered)
  templates.js  ← Template registry (18 templates, tier-gated)

lib/
  auth.js       ← Auth context, useProgress hook, withAuth HOC, dev bypass

components/
  ui.js         ← All shared primitives: Logo, Nav, Sidebar, Card, Button, etc.

pages/
  index.js                      /
  pricing.js                    /pricing
  login.js                      /login
  signup.js                     /signup
  checkout.js                   /checkout
  dashboard/index.js            /dashboard
  dashboard/course.js           course player component
  dashboard/templates.js        templates component
  dashboard/account.js          account component
  api/create-checkout-session.js
  api/stripe-webhook.js
  api/progress.js
```

**Key principle:** All content and config lives in `data/`. Pages import from `data/` — never hardcode content in components.

| To change... | Edit only... |
|---|---|
| Pricing or features | `data/tiers.js` |
| Course lessons | `data/modules.js` |
| Templates | `data/templates.js` |
| Nav links or brand name | `components/ui.js` |
| Dev bypass key | `lib/auth.js` line 14 |

---

## Your Dev Bypass

Access the full platform with enterprise access — no signup, no payment:

```
http://localhost:3000/dashboard?dev_key=loa_dev_avi_2025
```

Or on production:

```
https://learningonline.ai/dashboard?dev_key=loa_dev_avi_2025
```

The key is stripped from the URL automatically after it fires. You'll see a purple "Dev Access" badge in the sidebar and account page.

**Before going live:** change the key in two places:
1. `lib/auth.js` — line 14: `const DEV_KEY = 'your_new_key'`
2. `.env.local` — `DEV_BYPASS_KEY=your_new_key`

---

## Local Setup

### 1. Install

```bash
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

In demo mode, you don't need real keys — the platform runs fully on `localStorage`. Auth is simulated. Payment is simulated. You can enrol, complete lessons, and access all content without any API credentials.

### 3. Run

```bash
npm run dev
```

Open `http://localhost:3000`

**Instant dev access:**
```
http://localhost:3000/dashboard?dev_key=loa_dev_avi_2025
```

---

## Configuration

### Supabase (for production auth + data persistence)

1. Create project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** → copy keys into `.env.local`
3. Run the SQL schema (embedded as a comment in `pages/api/create-checkout-session.js`) in **Supabase SQL Editor**
4. Enable **Email Auth** in **Authentication → Providers**

**Swap localStorage auth for Supabase** — replace the `login`, `signup`, and `logout` functions in `lib/auth.js`:

```javascript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Login:
const { data, error } = await supabase.auth.signInWithPassword({ email, password })

// Signup:
const { data, error } = await supabase.auth.signUp({
  email, password,
  options: { data: { name } }
})

// Session restore (in useEffect):
const { data: { session } } = await supabase.auth.getSession()
if (session) setUser(session.user)

// Logout:
await supabase.auth.signOut()
```

### Stripe (for real payments)

1. Create account at [stripe.com](https://stripe.com)
2. Create 3 products in **Stripe Dashboard → Products**:

| Product | Price | Mode |
|---|---|---|
| Flowcore AI Academy — Individual | $499 AUD | One-time |
| Flowcore AI Academy — SMB       | $1,499 AUD | One-time |
| Flowcore AI Academy — Enterprise | $5,000 AUD | One-time |

3. Copy **Price IDs** (not Product IDs) into `.env.local`
4. Set up Stripe Webhook:
   - Endpoint: `https://learningonline.ai/api/stripe-webhook`
   - Events: `checkout.session.completed`
   - Copy the **Signing Secret** into `.env.local` as `STRIPE_WEBHOOK_SECRET`
5. Enable **Automatic Tax** in Stripe to handle Australian GST

**Activate real Stripe in checkout.js** — uncomment the fetch block and remove the demo `setTimeout`:

```javascript
const res = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ tierId, userId: user.id, email: user.email, name: user.name })
})
const { url } = await res.json()
window.location.href = url
```

### Template file storage (Supabase Storage)

1. In Supabase Dashboard → **Storage → New Bucket** → name it `templates`, set to **private**
2. Upload your actual template files using the naming convention: `{template-id}.{format}` e.g. `roi-calculator.xlsx`
3. In `pages/dashboard/templates.js`, replace the `handleDownload` alert with:

```javascript
const handleDownload = async (tpl) => {
  const { data } = await supabase.storage
    .from('templates')
    .createSignedUrl(`${tpl.id}.${tpl.format.toLowerCase()}`, 60) // 60-second signed URL
  window.location.href = data.signedUrl
}
```

---

## Deploy to Vercel

### Step 1 — Push to GitHub

Using GitHub Desktop:
1. Open GitHub Desktop → **File → Add Local Repository** → select the `learningonline-ai` folder
2. Commit all files → **Publish Repository**

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo
2. Vercel auto-detects Next.js — click **Deploy**
3. You'll get a URL like `learningonline-ai.vercel.app`

### Step 3 — Add environment variables

In Vercel Dashboard → your project → **Settings → Environment Variables**, add all variables from `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_INDIVIDUAL
STRIPE_PRICE_SMB
STRIPE_PRICE_ENTERPRISE
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL         ← set to https://learningonline.ai
NEXT_PUBLIC_PARENT_BRAND_URL
DEV_BYPASS_KEY
```

Then **redeploy** (Vercel → Deployments → Redeploy).

### Step 4 — Connect your domain

1. Vercel Dashboard → your project → **Settings → Domains**
2. Add `learningonline.ai` and `www.learningonline.ai`
3. Vercel shows you DNS records — add them at your domain registrar
4. Propagation takes 10–30 minutes

### Step 5 — Update Stripe webhook URL

Change the webhook endpoint in Stripe Dashboard from the Vercel preview URL to `https://learningonline.ai/api/stripe-webhook`

### Post-deploy checklist

- [ ] Test dev bypass: `https://learningonline.ai/dashboard?dev_key=loa_dev_avi_2025`
- [ ] Test signup → checkout → dashboard flow
- [ ] Test Stripe with test card `4242 4242 4242 4242`
- [ ] Verify webhook delivery in Stripe Dashboard → Webhooks
- [ ] Confirm progress saves correctly
- [ ] Check Praise Consulting links point to `https://praiseconsulting.com.au`

---

## Revenue Model

| Tier | Price | 10 sales/mo | 30 sales/mo |
|---|---|---|---|
| Individual | $499 | $4,990 | $14,970 |
| SMB | $1,499 | $14,990 | $44,970 |
| Enterprise | $5,000–$15,000+ | $50,000+ | $150,000+ |

Platform cost: ~$50–100/month (Vercel Pro + Supabase Pro)

---

## Adding Content (Ongoing Workflow)

### Add a new lesson to an existing module
Edit `data/modules.js` only:
```javascript
{
  id: 'm3-l4', number: 4, tier: 'smb', duration: '18 min',
  title: 'My New Lesson Title',
  content: `<h2>...</h2><p>...</p>`
}
```
Save. Done. The lesson appears automatically in the course sidebar, the curriculum explorer, and the dashboard module list.

### Add a new template
Edit `data/templates.js` only:
```javascript
{ id: 'new-template', name: 'My Template', format: 'XLSX', tier: 'smb', moduleId: 'module-3', icon: '📊', desc: 'Template description.' }
```

### Change tier pricing
Edit `data/tiers.js` — update `price`, `priceDisplay`, `priceRange`. Also update in Stripe Dashboard.

### Update brand references
Edit `components/ui.js` — the `BRAND` constant at the top of the file.

---

## Gaps & Roadmap

### Fix Before Launch (Week 1)
1. **Email delivery** — Add [Resend](https://resend.com) (free tier: 3,000 emails/month) for welcome email, payment receipt, and progress nudges
2. **Swap auth** — 4 lines of code; exact implementation above
3. **Upload real templates** — Upload actual XLSX/DOCX/PPTX files to Supabase Storage
4. **Test Stripe end-to-end** — Full checkout → webhook → access grant flow

### Growth Features (Month 1–3)
5. **Progress sync to Supabase** — Currently localStorage only; add API call on `markLessonComplete`
6. **Completion certificate** — PDF generated on course completion (jsPDF or Puppeteer)
7. **Team dashboard** — Enterprise: invite team members, track team-wide progress
8. **Progress emails** — Weekly nudge if user hasn't logged in; drives completion rates 30–40%
9. **Admin view** — See all enrollments, revenue, completion rates
10. **Affiliate program** — 20–30% commission for referrals from consultants and coaches

### Monetisation Improvements
11. **Payment plans** — 3×$179 (Individual), 3×$549 (SMB) — lower entry barrier
12. **Corporate invoice** — Bank transfer option for enterprise buyers who can't use credit card
13. **Praise Consulting upsell** — Module 6 (ROI) is highest-intent moment; prompt: "Want us to build this for you?"
14. **Annual Enterprise retainer** — $15,000–$36,000/year for ongoing advisory + platform access
15. **Industry tracks** — Telco AI, Financial Services AI, Healthcare AI — premium add-ons at $499 each

### Platform Expansion (6–12 months)
16. **Mobile app** — React Native; offline lesson access; push reminders
17. **AI coaching** — Use Claude API to answer student questions about their specific use case in context
18. **Live cohort** — 8-week bootcamp at $2,500/seat, quarterly intake, same content
19. **Partner portal** — Allow consulting firms to resell or white-label the Academy

---

## Support

**learningonline.ai** — hello@learningonline.ai
Built by **Praise Consulting** — praiseconsulting.com.au
