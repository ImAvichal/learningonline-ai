# Le On AI — learningonline.ai (v5)

Premium AI execution platform. 14 modules, Q&A scoring, ROI calculator, real-world practice sections.

## What's New in v5
- **14 modules** (was 8) — added: Use Case Prioritisation, Data Readiness, Responsible AI, Sustainability, People & Change, Multimodal AI & Orchestration
- **Updated pricing**: Individual $199 / Business $899 / Enterprise Custom
- **Q&A scoring system**: 5 scenario-based questions per module with instant feedback and Beginner/Intermediate/Advanced scoring
- **ROI Calculator**: standalone page at /roi-calculator with real-time calculation
- **Real-world practice sections**: every lesson includes insight, example, business impact, implementation tip, and "What This Saves You"
- **Token cost education**: Module 1 dedicated lesson on tokens, cost modelling, and optimisation
- **No GST on checkout**

## Routes
```
/                    Homepage
/pricing             Pricing ($199 / $899 / Custom)
/roi-calculator      Standalone ROI calculator
/login               Sign in
/signup              Create account
/checkout            Stripe payment
/dashboard           Gated dashboard
  #home              Progress overview
  #course            14-module course player with Q&A
  #templates         22 templates
  #account           Profile and subscription
```

## Pricing (v5)
| Tier | Price | Internal ID |
|---|---|---|
| Individual | $199 | individual |
| Business | $899 | smb |
| Enterprise | Custom | enterprise |

Update Stripe products to match new prices.

## Dev Bypass
```
https://learningonline.ai/dashboard?dev_key=loa_dev_avi_2025
```

## Local Setup
```bash
npm install && npm run dev
```

## Edit Content
| Task | File |
|---|---|
| Add/edit lessons | data/modules.js |
| Edit quiz questions | data/modules.js → quiz.questions |
| Change prices | data/tiers.js |
| Add templates | data/templates.js |
| Add industries | data/tiers.js → INDUSTRIES |
