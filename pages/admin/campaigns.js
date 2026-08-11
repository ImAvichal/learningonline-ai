// pages/admin/campaigns.js — send one-off email campaigns from the dashboard.
// Access is enforced server-side by /api/admin/send-journey-campaign
// (requireAdmin); this page renders whatever the API returns.
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '../../lib/auth'
import { Spinner } from '../../components/ui'

export default function AdminCampaigns() {
  const [preview, setPreview]   = useState(null)
  const [selected, setSelected] = useState(() => new Set())
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending]   = useState(false)
  const [result, setResult]     = useState(null)
  const [testSending, setTestSending] = useState(false)
  const [testResult, setTestResult]   = useState(null)
  const [testError, setTestError]     = useState('')

  const authedFetch = useCallback(async (method, body) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Please sign in with an admin account.')
    const res = await fetch('/api/admin/send-journey-campaign', {
      method,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    if (res.status === 401 || res.status === 403) throw new Error('You do not have admin access.')
    const responseBody = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(responseBody.error || 'Request failed')
    return responseBody
  }, [])

  const loadPreview = useCallback(async () => {
    setLoading(true); setError(''); setResult(null)
    try {
      const body = await authedFetch('GET')
      setPreview(body)
      // Default selection: everyone who hasn't already received it. Fully
      // editable from here — this just saves a click for the common case.
      setSelected(new Set(body.allRecipients.filter((r) => !r.alreadySent).map((r) => r.email)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => { loadPreview() }, [loadPreview])

  const toggleOne = (email) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email); else next.add(email)
      return next
    })
  }

  const notYetSent = useMemo(() => preview?.allRecipients.filter((r) => !r.alreadySent) || [], [preview])
  const selectAll  = () => setSelected(new Set(notYetSent.map((r) => r.email)))
  const selectNone = () => setSelected(new Set())

  const handleSend = async () => {
    setSending(true); setError('')
    try {
      const body = await authedFetch('POST', { emails: [...selected] })
      setResult(body)
      setConfirming(false)
      await loadPreview()  // refresh statuses (badges flip to "Sent") after sending
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleTestSend = async () => {
    setTestSending(true); setTestError(''); setTestResult(null)
    try {
      const body = await authedFetch('POST', { test: true })
      setTestResult(body)
    } catch (err) {
      setTestError(err.message)
    } finally {
      setTestSending(false)
    }
  }

  const canSend = preview && selected.size > 0 && preview.resendConfigured && preview.businessAddressConfigured

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
              <p className="text-sm text-gray-500 mb-6">Pick who receives this below. Already-sent people are shown but locked — sending never double-emails anyone.</p>

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
                  <div className="font-display font-bold text-2xl text-blue">{selected.size}</div>
                  <div className="text-xs text-gray-500 mt-1">Selected</div>
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

              {/* Test send — see the real email land in your own inbox before any real recipient does */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-display font-bold">Test it first</div>
                    <div className="text-xs text-gray-500 mt-0.5">Sends the exact email to your own inbox — not tracked, doesn't affect anything below.</div>
                  </div>
                  <button
                    onClick={handleTestSend}
                    disabled={testSending || !preview.resendConfigured || !preview.businessAddressConfigured}
                    className="px-4 py-2 border border-gray-300 hover:border-blue text-gray-700 hover:text-blue disabled:opacity-40 disabled:cursor-not-allowed font-display font-bold text-xs rounded-lg transition-all whitespace-nowrap"
                  >
                    {testSending ? 'Sending…' : 'Send test to myself'}
                  </button>
                </div>
                {testResult && (
                  <div className="mt-3 text-xs text-success">✓ Sent to {testResult.sentTo} — check your inbox.</div>
                )}
                {testError && (
                  <div className="mt-3 text-xs text-red-500">{testError}</div>
                )}
              </div>

              {/* Recipient checklist — everyone on the tier, checkbox to select,
                  a locked "Sent" badge for anyone who's already received it. */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display font-bold text-gray-700">Recipients ({preview.allRecipients.length})</span>
                  {notYetSent.length > 0 && (
                    <div className="flex gap-3 text-xs">
                      <button onClick={selectAll} className="text-blue font-display font-bold">Select all</button>
                      <button onClick={selectNone} className="text-gray-400 font-display font-bold">Select none</button>
                    </div>
                  )}
                </div>
                <div className="border border-gray-200 rounded-xl max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {preview.allRecipients.map((r) => (
                    <label
                      key={r.email}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm ${r.alreadySent ? 'bg-gray-50' : 'cursor-pointer hover:bg-blue/[0.03]'}`}
                    >
                      {r.alreadySent ? (
                        <span className="w-4 h-4 flex-shrink-0 rounded bg-success/15 border border-success/30 flex items-center justify-center text-success text-[10px] font-bold">✓</span>
                      ) : (
                        <input
                          type="checkbox"
                          checked={selected.has(r.email)}
                          onChange={() => toggleOne(r.email)}
                          className="w-4 h-4 flex-shrink-0 accent-blue"
                        />
                      )}
                      <span className={r.alreadySent ? 'text-gray-400' : 'text-gray-800'}>
                        {r.email}{r.name ? ` — ${r.name}` : ''}
                      </span>
                      {r.alreadySent && <span className="ml-auto text-[10px] text-success font-display font-bold uppercase tracking-wide">Sent</span>}
                    </label>
                  ))}
                </div>
              </div>

              {result && (
                <div className="p-4 rounded-lg bg-success/8 border border-success/20 text-sm mb-4">
                  ✓ Sent {result.sent}, {result.failed} failed.
                  {result.failures?.length > 0 && (
                    <div className="mt-2 text-xs text-red-500">{result.failures.map((f) => `${f.email}: ${f.error}`).join(' · ')}</div>
                  )}
                </div>
              )}

              {notYetSent.length === 0 ? (
                <p className="text-sm text-gray-500">Nothing to send — everyone on Journey has already received this.</p>
              ) : !confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  disabled={!canSend}
                  className="w-full py-3 bg-blue hover:bg-blue-bright disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-lg transition-all"
                >
                  Send to {selected.size} {selected.size === 1 ? 'person' : 'people'}
                </button>
              ) : (
                <div className="p-4 rounded-lg border border-blue/30 bg-blue/5">
                  <p className="text-sm font-display font-bold mb-3">Send this to {selected.size} real {selected.size === 1 ? 'person' : 'people'} now?</p>
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
