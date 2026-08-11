// pages/admin/campaigns.js — send one-off email campaigns from the dashboard.
// Access is enforced server-side by /api/admin/send-journey-campaign
// (requireAdmin); this page renders whatever the API returns.
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/auth'
import { Spinner } from '../../components/ui'

export default function AdminCampaigns() {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const [result, setResult]   = useState(null)

  const authedFetch = useCallback(async (method) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Please sign in with an admin account.')
    const res = await fetch('/api/admin/send-journey-campaign', {
      method,
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (res.status === 401 || res.status === 403) throw new Error('You do not have admin access.')
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error || 'Request failed')
    return body
  }, [])

  const loadPreview = useCallback(async () => {
    setLoading(true); setError(''); setResult(null)
    try {
      setPreview(await authedFetch('GET'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => { loadPreview() }, [loadPreview])

  const handleSend = async () => {
    setSending(true); setError('')
    try {
      const body = await authedFetch('POST')
      setResult(body)
      setConfirming(false)
      await loadPreview()  // refresh counts after sending
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const canSend = preview && preview.toSend > 0 && preview.resendConfigured && preview.businessAddressConfigured

  return (
    <>
      <Head><title>Campaigns — Admin</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <Link href="/" className="font-display font-black text-xl">
              <span>LeO</span> <span className="text-blue">AI</span>
            </Link>
            <span className="text-xs text-gray-500 font-display font-bold uppercase tracking-wider">Admin · Campaigns</span>
          </div>

          {loading ? (
            <div className="py-20 text-center"><div className="flex justify-center mb-3"><Spinner size="lg" /></div><p className="text-sm text-gray-500">Loading…</p></div>
          ) : error ? (
            <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">{error}</div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h1 className="font-display font-bold text-lg mb-1">Journey upgrade — thank-you &amp; feedback</h1>
              <p className="text-sm text-gray-500 mb-6">Sent to everyone currently on the Journey tier who hasn't received it yet.</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="font-display font-bold text-2xl">{preview.totalOnTier}</div>
                  <div className="text-xs text-gray-500 mt-1">On Journey</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="font-display font-bold text-2xl">{preview.alreadySent}</div>
                  <div className="text-xs text-gray-500 mt-1">Already sent</div>
                </div>
                <div className="rounded-xl bg-blue/5 p-4 text-center border border-blue/20">
                  <div className="font-display font-bold text-2xl text-blue">{preview.toSend}</div>
                  <div className="text-xs text-gray-500 mt-1">Will receive it</div>
                </div>
              </div>

              {!preview.resendConfigured && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs mb-4">
                  RESEND_API_KEY isn't set in Vercel — sending is disabled until it is.
                </div>
              )}
              {!preview.businessAddressConfigured && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs mb-4">
                  BUSINESS_ADDRESS isn't set in Vercel. Required by Australian law for commercial email — set it (Settings → Environment Variables) before sending.
                </div>
              )}

              {preview.toSend > 0 && (
                <details className="mb-6">
                  <summary className="text-xs text-blue cursor-pointer font-display font-bold">Show recipient list ({preview.toSend})</summary>
                  <div className="mt-2 max-h-48 overflow-y-auto text-xs text-gray-500 space-y-1">
                    {preview.recipients.map((r) => (
                      <div key={r.email}>{r.email}{r.name ? ` — ${r.name}` : ''}</div>
                    ))}
                  </div>
                </details>
              )}

              {result && (
                <div className="p-4 rounded-lg bg-success/8 border border-success/20 text-sm mb-4">
                  ✓ Sent {result.sent}, {result.failed} failed.
                  {result.failures?.length > 0 && (
                    <div className="mt-2 text-xs text-red-500">{result.failures.map((f) => `${f.email}: ${f.error}`).join(' · ')}</div>
                  )}
                </div>
              )}

              {preview.toSend === 0 ? (
                <p className="text-sm text-gray-500">Nothing to send — everyone on Journey has already received this.</p>
              ) : !confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  disabled={!canSend}
                  className="w-full py-3 bg-blue hover:bg-blue-bright disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-lg transition-all"
                >
                  Send to {preview.toSend} {preview.toSend === 1 ? 'person' : 'people'}
                </button>
              ) : (
                <div className="p-4 rounded-lg border border-blue/30 bg-blue/5">
                  <p className="text-sm font-display font-bold mb-3">Send this to {preview.toSend} real {preview.toSend === 1 ? 'person' : 'people'} now?</p>
                  <div className="flex gap-2">
                    <button onClick={handleSend} disabled={sending}
                      className="flex-1 py-2.5 bg-blue hover:bg-blue-bright disabled:opacity-50 text-white font-display font-bold text-sm rounded-lg transition-all">
                      {sending ? 'Sending…' : 'Yes, send now'}
                    </button>
                    <button onClick={() => setConfirming(false)} disabled={sending}
                      className="flex-1 py-2.5 border border-gray-200 hover:border-gray-300 font-display font-bold text-sm rounded-lg transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
