// components/NoEnrolmentMessage.js — Patch 3
// Reusable component shown to authenticated but unpaid users.
// Additive only — does not modify any existing component.

import Link from 'next/link'

export default function NoEnrolmentMessage({ context = 'dashboard' }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-5">🔒</div>
        <h2 className="font-display font-bold text-2xl mb-3">
          No course enrolment found
        </h2>
        <p className="text-muted text-sm leading-relaxed mb-6">
          You're signed in and can preview the course.
          Full access requires enrolment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pricing"
            className="px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(26,110,255,0.35)]">
            View Courses →
          </Link>
          <Link href="/preview"
            className="px-6 py-3 border border-white/15 text-muted hover:text-white hover:border-blue font-display font-bold text-sm rounded-lg transition-all">
            Preview Free Lesson
          </Link>
        </div>
        {context === 'course' && (
          <p className="text-xs text-muted mt-5">
            Already enrolled?{' '}
            <Link href="/login" className="text-blue-bright hover:underline">Sign in again</Link>
            {' '}or contact{' '}
            <a href="mailto:hello@learningonline.ai" className="text-blue-bright hover:underline">
              hello@learningonline.ai
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
