// components/FeedbackWidget.js — reusable structured feedback capture.
// Light-themed to match the platform (locked light mode). Drop it anywhere a
// signed-in user can give feedback: dashboard, module/completion pages, etc.
import { useState } from 'react'
import { submitFeedback } from '../lib/feedback'

const TYPES = [
  { value: 'general',       label: 'General' },
  { value: 'suggestion',    label: 'Suggestion' },
  { value: 'missing_topic', label: 'Missing topic' },
  { value: 'bug',           label: 'Bug' },
]

export default function FeedbackWidget({
  course = null,
  module = null,
  title = 'Share your feedback',
  subtitle = 'Your input shapes what we build next.',
  compact = false,
}) {
  const [rating, setRating]     = useState(0)
  const [hover, setHover]       = useState(0)
  const [type, setType]         = useState('general')
  const [comments, setComments] = useState('')
  const [state, setState]       = useState('idle')   // idle | submitting | done | error
  const [error, setError]       = useState('')

  const submit = async () => {
    if (!rating && !comments.trim()) {
      setError('Add a rating or a comment first.')
      return
    }
    setState('submitting')
    setError('')
    const res = await submitFeedback({
      course,
      module,
      rating: rating || null,
      // A star rating with no specific category is stored as a 'rating'
      feedbackType: rating && type === 'general' ? 'rating' : type,
      comments,
    })
    if (res.success) {
      setState('done')
    } else {
      setState('error')
      setError(res.error || 'Could not send feedback. Please try again.')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-xl border border-success/30 bg-success/[0.06] p-5 text-center">
        <div className="text-2xl mb-1" aria-hidden="true">🙏</div>
        <div className="font-display font-bold text-sm">Thank you — we've got it.</div>
        <p className="text-xs text-gray-500 mt-1">Your feedback helps shape LearningOnline.ai.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="font-display font-bold text-sm mb-0.5">{title}</div>
      {subtitle && <p className="text-xs text-gray-500 mb-3">{subtitle}</p>}

      {/* Star rating */}
      <div className="flex items-center gap-1 mb-3" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className="text-2xl leading-none transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 rounded"
          >
            <span className={(hover || rating) >= n ? 'text-amber-400' : 'text-gray-300'}>★</span>
          </button>
        ))}
      </div>

      {/* Type chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            aria-pressed={type === t.value}
            className={`px-3 py-1 rounded-full text-xs font-display font-bold border transition-all ${
              type === t.value
                ? 'border-blue/50 bg-blue/10 text-blue'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="sr-only" htmlFor="feedback-comments">Your feedback</label>
      <textarea
        id="feedback-comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        rows={compact ? 2 : 3}
        placeholder="What's working, what's missing, what would make this better?"
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue/40 resize-none mb-3"
      />

      {error && <div className="text-xs text-red-500 mb-2" role="alert">{error}</div>}

      <button
        type="button"
        onClick={submit}
        disabled={state === 'submitting'}
        className="px-5 py-2.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all disabled:opacity-50"
      >
        {state === 'submitting' ? 'Sending…' : 'Send feedback'}
      </button>
    </div>
  )
}
