# Le On AI — learningonline.ai

Standalone Next.js SaaS platform. Le On AI = Learning Online · Artificial Intelligence.

---

## Routes

```
/                  Homepage (decision tree + industry matcher)
/pricing           Pricing
/login             Sign in
/signup            Create account
/checkout          Stripe payment
/dashboard         Gated: auth + tier required
```

## Dev Bypass

```
https://learningonline.ai/dashboard?dev_key=loa_dev_avi_2025
```

Full enterprise access without payment. Change key in `lib/auth.js` line 14.

## Local Setup

```bash
npm install && npm run dev
# http://localhost:3000
```

## Stripe Products

| Product | Price | Currency |
|---|---|---|
| Le On AI — Individual | $499 | AUD |
| Le On AI — Business | $1,499 | AUD |
| Le On AI — Enterprise | $5,000 | AUD |

Webhook: `https://learningonline.ai/api/stripe-webhook`
Event: `checkout.session.completed`

## Internal Tier IDs (code only)

`individual` · `smb` (displayed as "Business") · `enterprise`

## Edit Content

| Task | File |
|---|---|
| Add a lesson | `data/modules.js` |
| Change prices | `data/tiers.js` |
| Add template | `data/templates.js` |
| Add industry | `data/tiers.js` → INDUSTRIES array |
| Update brand | `components/ui.js` → BRAND constant |

## Contact

hello@learningonline.ai
