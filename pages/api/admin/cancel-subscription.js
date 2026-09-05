// pages/api/admin/cancel-subscription.js
//
// Admin-only endpoint to cancel a user's subscription.
//
// Safety guarantees (per spec):
//   - Stripe is the billing source of truth. We cancel via the Stripe API,
//     never by deleting DB records.
//   - We support two modes:
//       'period_end'  → subscription.update({ cancel_at_period_end: true })
//       'immediate'   → subscription.cancel()
//   - We DO NOT delete the user, learning history, purchases, or anything else.
//     We only flip subscription_status (and let the webhook revoke tier when
//     Stripe actually ends the subscription).
//   - Every action is written to admin_audit_log.
//   - A confirmation email is sent (gracefully no-ops if email isn't configured).
//   - Errors are caught and reported; a failed Stripe call does NOT corrupt state.
//
// Request (POST):
//   headers: Authorization: Bearer <caller's supabase access token>
//   body: { userId, mode: 'period_end' | 'immediate', reason?: string }

import Stripe from 'stripe'
import { requireAdmin } from '../../../lib/adminAuth'
import { sendCancellationEmail } from '../../../lib/emails.cancellation'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // ── 1. Verify the caller is a real admin ──
  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
  const supabase = admin.supabase

  // ── 2. Validate input ──
  const { userId, mode = 'period_end', reason = null } = req.body || {}
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  if (!['period_end', 'immediate'].includes(mode)) {
    return res.status(400).json({ error: "mode must be 'period_end' or 'immediate'" })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    // ── 3. Load the target user ──
    const { data: target, error: targetErr } = await supabase
      .from('users_profile')
      .select('id, email, full_name, selected_tier, stripe_customer_id')
      .eq('id', userId)
      .maybeSingle()

    if (targetErr) return res.status(500).json({ error: 'Could not load user.' })
    if (!target) return res.status(404).json({ error: 'User not found.' })

    // ── 4. Find the active subscription to cancel ──
    // Prefer the most recent completed purchase row that has a subscription id.
    const { data: purchases, error: purchErr } = await supabase
      .from('purchases')
      .select('id, stripe_subscription_id, tier, payment_status, created_at')
      .eq('user_id', userId)
      .not('stripe_subscription_id', 'is', null)
      .order('created_at', { ascending: false })

    if (purchErr) return res.status(500).json({ error: 'Could not load purchases.' })

    const activePurchase = (purchases || []).find(
      p => p.payment_status === 'completed' && p.stripe_subscription_id
    )

    if (!activePurchase) {
      return res.status(404).json({
        error: 'No active subscription found for this user.',
      })
    }

    const subId = activePurchase.stripe_subscription_id

    // ── 5. Cancel in Stripe (source of truth) ──
    let stripeSub
    let expiryDate = null
    try {
      if (mode === 'immediate') {
        stripeSub = await stripe.subscriptions.cancel(subId)
        expiryDate = new Date().toISOString()
      } else {
        stripeSub = await stripe.subscriptions.update(subId, {
          cancel_at_period_end: true,
        })
        // current_period_end is a unix timestamp (seconds)
        if (stripeSub.current_period_end) {
          expiryDate = new Date(stripeSub.current_period_end * 1000).toISOString()
        }
      }
    } catch (stripeErr) {
      // Stripe failed — do NOT touch the database. Report cleanly.
      console.error('[admin/cancel] Stripe error:', stripeErr.message)
      return res.status(502).json({
        error: `Stripe cancellation failed: ${stripeErr.message}. No changes were made.`,
      })
    }

    // ── 6. Update Supabase subscription_status (NOT a delete) ──
    const newStatus = mode === 'immediate' ? 'cancelled' : 'cancel_at_period_end'

    // Update the purchase row's status. We retain the row entirely.
    const { error: updErr } = await supabase
      .from('purchases')
      .update({ payment_status: mode === 'immediate' ? 'cancelled' : 'cancel_at_period_end' })
      .eq('id', activePurchase.id)
    if (updErr) {
      // Stripe already cancelled — log but don't fail the whole op; webhook will reconcile.
      console.error('[admin/cancel] Supabase purchase update failed (non-fatal):', updErr.message)
    }

    // For immediate cancellation, revoke tier now. For period-end, leave tier
    // intact — the webhook will clear it when Stripe fires subscription.deleted.
    if (mode === 'immediate') {
      const { error: tierErr } = await supabase
        .from('users_profile')
        .update({ selected_tier: null, user_type: null })
        .eq('id', userId)
      if (tierErr) console.error('[admin/cancel] tier revoke failed (non-fatal):', tierErr.message)
    }

    // ── 7. Write the audit log ──
    const { error: auditErr } = await supabase.from('admin_audit_log').insert({
      admin_id: admin.user.id,
      admin_email: admin.user.email,
      action: 'cancel_subscription',
      target_user_id: userId,
      target_user_email: target.email,
      cancellation_type: mode,
      reason: reason,
    })
    if (auditErr) {
      // Audit failure is serious but the cancellation already succeeded.
      // Log loudly so it can be reconciled; don't fail the user-facing op.
      console.error('[admin/cancel] AUDIT LOG WRITE FAILED:', auditErr.message)
    }

    // ── 8. Send confirmation email (no-ops gracefully if email not configured) ──
    let emailSent = false
    try {
      const firstName = (target.full_name || '').trim().split(' ')[0] || 'there'
      const prettyExpiry = expiryDate
        ? new Date(expiryDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'the end of your current billing period'
      await sendCancellationEmail({
        to: target.email,
        firstName,
        expiryDate: prettyExpiry,
        immediate: mode === 'immediate',
      })
      emailSent = true
    } catch (emailErr) {
      console.error('[admin/cancel] Email send failed (non-fatal):', emailErr.message)
    }

    // ── 9. Respond ──
    return res.status(200).json({
      success: true,
      mode,
      status: newStatus,
      expiryDate,
      emailSent,
    })
  } catch (err) {
    console.error('[admin/cancel] Unexpected error:', err.message)
    return res.status(500).json({ error: 'An unexpected error occurred. Please check logs.' })
  }
}
