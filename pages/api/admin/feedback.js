// pages/api/admin/feedback.js
//
// Admin-only: list submitted feedback for the admin console.
//
// GET /api/admin/feedback?status=<optional>&q=<optional>
//   headers: Authorization: Bearer <caller's supabase access token>
//   Returns feedback rows joined with the submitter's name/email.
//
// Uses the service-role client (via requireAdmin) so it bypasses RLS.

import { requireAdmin } from '../../../lib/adminAuth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
  const supabase = admin.supabase

  const status = (req.query.status || '').trim()
  const q = (req.query.q || '').trim()

  try {
    let query = supabase
      .from('feedback')
      .select('id, user_id, course, module, rating, feedback_type, comments, status, created_at, users_profile:user_id ( full_name, email )')
      .order('created_at', { ascending: false })
      .limit(200)

    if (status) query = query.eq('status', status)
    if (q) query = query.ilike('comments', `%${q}%`)

    const { data, error } = await query
    if (error) throw error

    const rows = (data || []).map((r) => ({
      id: r.id,
      userId: r.user_id,
      name: r.users_profile?.full_name || null,
      email: r.users_profile?.email || null,
      course: r.course,
      module: r.module,
      rating: r.rating,
      type: r.feedback_type,
      comments: r.comments,
      status: r.status,
      createdAt: r.created_at,
    }))

    return res.status(200).json({ feedback: rows, count: rows.length })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to load feedback' })
  }
}
