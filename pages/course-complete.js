// pages/course-complete.js — Course completion celebration page
//
// Reached when a user finishes all accessible lessons.
// Tone: warm, positive, encouraging — not gimmicky.
// For Parents & Caregivers track: gentler tone + clear "Continue Your AI Journey"
// progression CTA toward paid tiers.

import Head from 'next/head'
import { useRouter } from 'next/router'
import { Nav, Reveal, Button } from '../components/ui'
import { useAuth } from '../lib/auth'

export default function CourseComplete() {
  const { user } = useAuth()
  const router = useRouter()
  const { track } = router.query

  // Determine which pathway was completed.
  // Falls back to user.tier when track param missing.
  const completedTrack = track || user?.tier || 'unknown'
  const isParents = completedTrack === 'parents'
  const isJourney = completedTrack === 'journey'
  const isPro = completedTrack === 'pro'

  // ── Content varies by pathway ────────────────────────────────────────────
  const content = isParents
    ? {
        title: "Congratulations — you've completed Parents & Caregivers",
        body: "You now have a stronger understanding of how AI is shaping the world around your family, children, and future. Awareness is the first step toward confident, calm and safe use of AI at home.",
        nextHeading: 'Ready to go further?',
        nextBody: 'Explore Starting the Journey to build practical AI skills for work, leadership and everyday productivity.',
        primaryCta: 'Continue Your AI Journey',
        primaryHref: '/pricing',
        secondaryCta: 'Back to Home',
        secondaryHref: '/',
        emoji: '🌟',
      }
    : isPro
    ? {
        title: "Congratulations — you've completed The Pro",
        body: "You've worked through the full leadership transformation pathway — strategy, governance, operating models and adoption. You now have the language and frameworks to lead AI at enterprise scale with confidence.",
        nextHeading: 'Keep the momentum',
        nextBody: 'Revisit any module to deepen specific areas, or share the frameworks with your team to drive aligned execution.',
        primaryCta: 'Continue Learning',
        primaryHref: '/dashboard',
        secondaryCta: 'Back to Home',
        secondaryHref: '/',
        emoji: '🎯',
      }
    : isJourney
    ? {
        title: "Congratulations — you've completed Starting the Journey",
        body: "You've moved from AI awareness to practical capability — covering foundations, prompts, use cases, workflow design, ROI thinking and adoption. You now have the tools to apply AI confidently in your work.",
        nextHeading: 'Ready for the next step?',
        nextBody: 'The Pro extends what you\'ve learned into strategy, governance and enterprise-scale transformation.',
        primaryCta: 'Explore The Pro',
        primaryHref: '/pricing',
        secondaryCta: 'Back to Dashboard',
        secondaryHref: '/dashboard',
        emoji: '🚀',
      }
    : {
        // Generic fallback
        title: "Well done — you've completed your learning path",
        body: "You've taken an important step from AI anxiety to AI awareness. Keep applying what you've learned and continue building practical confidence with AI.",
        nextHeading: 'Keep going',
        nextBody: 'Revisit any module, or explore the next pathway in your AI learning.',
        primaryCta: 'Continue Learning',
        primaryHref: '/dashboard',
        secondaryCta: 'Back to Home',
        secondaryHref: '/',
        emoji: '🎉',
      }

  return (
    <>
      <Head>
        <title>{content.title} — LeO AI</title>
      </Head>

      <Nav user={user} />

      <main className="min-h-screen pt-24 pb-20 flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            {/* Celebration mark */}
            <div className="text-6xl mb-6" aria-hidden="true">{content.emoji}</div>

            {/* Main title — kept readable on mobile */}
            <h1 className="font-display font-bold text-2xl sm:text-3xl mb-5 leading-tight">
              {content.title}
            </h1>

            {/* Affirming body copy */}
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              {content.body}
            </p>

            {/* ── Progression nudge (gentle upsell for parents track, encouragement for paid tracks) ── */}
            {(content.nextHeading || content.nextBody) && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 max-w-lg mx-auto text-left">
                <div className="text-xs uppercase tracking-wider text-blue font-display font-bold mb-2">
                  {content.nextHeading}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {content.nextBody}
                </p>
              </div>
            )}

            {/* ── CTAs — primary first, secondary muted ── */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="large" href={content.primaryHref}>
                {content.primaryCta} →
              </Button>
              <Button variant="ghost" href={content.secondaryHref} className="text-sm px-6 py-3">
                {content.secondaryCta}
              </Button>
            </div>

            {/* Subtle reassurance */}
            <p className="text-xs text-gray-500 mt-8">
              Your progress is saved automatically. You can return any time to revisit a lesson.
            </p>
          </Reveal>
        </div>
      </main>
    </>
  )
}
