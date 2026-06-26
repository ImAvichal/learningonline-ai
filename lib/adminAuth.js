// lib/adminAuth.js
//
// Server-side admin gate for admin-only API routes.
//
// SECURITY MODEL (important):
//   - The caller must send their Supabase access token (from their logged-in
//     session) in the Authorization: Bearer <token> header.
//   - We verify that token server-side with Supabase (so it can't be forged).
//   - We then look up that verified user's row in users_profile and require
//     is_admin === true.
//   - Only then do we return the admin's identity to the caller.
//
// We NEVER trust a userId/isAdmin value sent in the request body. The only
// thing we trust is a token Supabase itself confirms.
//
// Usage in an API route:
//   const admin = await requireAdmin(req)
//   if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
//   // admin.user is the verified admin profile

import { createClient } from '@supabase/supabase-js'

export async function requireAdmin(req) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return { ok: false, status: 500, error: 'Server not configured.' }
  }

  // 1. Extract the bearer token from the Authorization header
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    return { ok: false, status: 401, error: 'Not authenticated.' }
  }

  const supabase = createClient(url, serviceKey)

  // 2. Verify the token with Supabase — this is the trust anchor.
  //    getUser(token) validates the JWT against Supabase; a forged token fails.
  const { data: userData, error: userErr } = await supabase.auth.getUser(token)
  if (userErr || !userData?.user) {
    return { ok: false, status: 401, error: 'Invalid or expired session.' }
  }

  const callerId = userData.user.id

  // 3. Require is_admin on the verified user's profile row
  const { data: profile, error: profErr } = await supabase
    .from('users_profile')
    .select('id, email, full_name, is_admin')
    .eq('id', callerId)
    .maybeSingle()

  if (profErr) {
    return { ok: false, status: 500, error: 'Could not verify admin status.' }
  }
  if (!profile?.is_admin) {
    // Not an admin — return 403 (authenticated but not authorised)
    return { ok: false, status: 403, error: 'Admin access required.' }
  }

  return { ok: true, user: profile, supabase }
}
