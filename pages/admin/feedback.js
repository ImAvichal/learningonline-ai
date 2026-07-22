// lib/feedback.js — client-side helper to submit structured feedback.
// Insert is protected by RLS (feedback_insert_own): a row can only be written
// with user_id === the caller's auth.uid().
import { supabase } from './auth'

export async function submitFeedback({
  course = null,
  module = null,
  rating = null,
  feedbackType = 'general',
  comments = '',
} = {}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Please sign in to send feedback.' }

  const { error } = await supabase.from('feedback').insert({
    user_id: user.id,
    course,
    module,
    rating: rating || null,
    feedback_type: feedbackType,
    comments: comments?.trim() || null,
  })

  if (error) return { success: false, error: error.message }
  return { success: true }
}
