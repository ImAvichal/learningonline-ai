# LeO AI — free-first website overhaul

Status: design and implementation brief (not a live pricing change)

## Product promise
**Learn AI. Use it confidently. Stay current.**
Practical, approachable AI education for everyday life and work.

## Navigation
Learn | AI Updates | For Teams | About | Sign in

## Homepage
1. **Hero** — "AI is changing fast. You can keep up." Supporting copy: "Practical AI learning, clear explanations and real-world exercises. Start with free foundations and build confidence at your own pace." Primary CTA: "Start learning free" (existing registration route, verify before release). Secondary CTA: "Explore the lessons".
2. **Three benefits** — Understand AI; apply it safely; stay current.
3. **Learning pathways** — Everyday AI foundations (free); Parents & Caregivers (free); Professional practice (existing entitlement rules); Teams & organisations (enquiry).
4. **How learning works** — Short lessons, a practical task, takeaways and progress tracking.
5. **What's new in AI** — Three reviewed updates with dates, primary-source citations and clear "what it means" explanations. Do not fabricate freshness or publish automatically.
6. **For organisations** — Invite team training enquiries; do not claim self-serve team licensing exists.
7. **FAQ** — Explicitly distinguish free foundational content from paid products; retain current contractual terms until approved migration.
8. **Footer** — Privacy, terms, contact, accessibility, update methodology.

## Visual direction
Keep existing LeO brand identity; introduce generous whitespace, strong readable typography, restrained blue accents, simple icons, and mobile-first cards. Avoid cluttered tier tables above the fold, excessive animations and unverified testimonials.

## Non-negotiable release gates
- **No pricing or entitlement change in this PR.** Existing paid users and permanent Journey entitlements remain intact.
- Confirm free foundations are actually accessible before saying they are permanently free.
- Never grant admin or paid access through client state.
- Review consent-aware analytics, accessibility, mobile layout and security headers.
- Test signup/login, Google OAuth, course access, dashboard, checkout, webhook, email recipient isolation and regression suite.
- Deploy via preview, obtain visual review, then merge only after checks pass.
- Source AI news from primary materials and record last-reviewed date; review before publication.

## Measurement
Track privacy-conscious visits → free signup → first lesson → lesson completion → return visit → team enquiry. Review baseline and 30-day cohorts before paid advertising.

## Implementation sequence
1. Replace pricing-led hero and navigation; preserve all live access routes.
2. Add curated learning pathways and latest reviewed updates.
3. Simplify course discovery and dashboard.
4. Build a team enquiry pathway with anti-spam protection.
5. After separate approval, migrate foundational content to permanently free with backend enforcement and paid-user safeguards.
