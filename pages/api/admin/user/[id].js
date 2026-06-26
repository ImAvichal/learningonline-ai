// pages/api/admin/user/[id].js
//
// Admin-only: full detail for a single user — profile, subscription, full
// purchase history, and audit history for that user.
//
// GET /api/admin/user/<id>
//   headers: Authorization: Bearer <caller's supabase access token>

import { requireAdmin } from '../../../../lib/adminAuth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
  const supabase = admin.supabase

  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing user id' })

  try {
    const { data: profile, error: profErr } = await supabase
      .from('users_profile')
      .select('id, full_name, email, selected_tier, user_type, stripe_customer_id, created_at, last_sign_in_at')
      .eq('id', id)
      .maybeSingle()

    if (profErr) return res.status(500).json({ error: 'Could not load user.' })
    if (!profile) return res.status(404).json({ error: 'User not found.' })

    // Full purchase history
    const { data: purchases } = await supabase
      .from('purchases')
      .select('id, tier, payment_status, stripe_subscription_id, stripe_session_id, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })

    // Audit history affecting this user (best-effort — table may be new)
    let audit = []
    try {
      const { data: auditRows } = await supabase
        .from('admin_audit_log')
        .select('action, admin_email, cancellation_type, reason, created_at')
        .eq('target_user_id', id)
        .order('created_at', { ascending: false })
      audit = auditRows || []
    } catch (_) { /* table may not exist yet */ }

    const latest = (purchases || []).find(p => p.stripe_subscription_id) || null

    return res.status(200).json({
      user: {
        id: profile.id,
        name: profile.full_name || '—',
        email: profile.email,
        plan: profile.selected_tier || 'free',
        userType: profile.user_type || null,
        stripeCustomerId: profile.stripe_customer_id || null,
        stripeSubscriptionId: latest?.stripe_subscription_id || null,
        subscriptionStatus: latest?.payment_status || (profile.selected_tier ? 'active' : 'none'),
        enrolledAt: profile.created_at || null,
        lastLogin: profile.last_sign_in_at || null,
      },
      purchases: purchases || [],
      audit,
    })
  } catch (err) {
    console.error('[admin/user] error:', err.message)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}
