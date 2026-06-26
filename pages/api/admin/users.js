// pages/api/admin/users.js
//
// Admin-only: list + search users for the admin console.
//
// GET /api/admin/users?q=<search>
//   headers: Authorization: Bearer <caller's supabase access token>
//   Returns a lightweight list (name, email, plan, stripe ids, status, dates).
//
// Search matches name OR email (case-insensitive, partial).

import { requireAdmin } from '../../../lib/adminAuth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
  const supabase = admin.supabase

  const q = (req.query.q || '').trim()

  try {
    let query = supabase
      .from('users_profile')
      .select('id, full_name, email, selected_tier, user_type, stripe_customer_id, created_at, last_sign_in_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (q) {
      // ilike on name OR email
      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`)
    }

    const { data: profiles, error } = await query
    if (error) return res.status(500).json({ error: 'Could not load users.' })

    // For each user, we want their current subscription id + status. Rather than
    // N queries, pull recent purchases for the returned set in one go.
    const ids = (profiles || []).map(p => p.id)
    let purchasesByUser = {}
    if (ids.length) {
      const { data: purchases } = await supabase
        .from('purchases')
        .select('user_id, stripe_subscription_id, payment_status, tier, created_at')
        .in('user_id', ids)
        .order('created_at', { ascending: false })
      for (const pu of (purchases || [])) {
        // keep the most recent per user (first seen, since ordered desc)
        if (!purchasesByUser[pu.user_id]) purchasesByUser[pu.user_id] = pu
      }
    }

    const users = (profiles || []).map(p => {
      const latest = purchasesByUser[p.id]
      return {
        id: p.id,
        name: p.full_name || '—',
        email: p.email,
        plan: p.selected_tier || 'free',
        stripeCustomerId: p.stripe_customer_id || null,
        stripeSubscriptionId: latest?.stripe_subscription_id || null,
        subscriptionStatus: latest?.payment_status || (p.selected_tier ? 'active' : 'none'),
        enrolledAt: p.created_at || null,
        lastLogin: p.last_sign_in_at || null,
      }
    })

    return res.status(200).json({ users })
  } catch (err) {
    console.error('[admin/users] error:', err.message)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}
