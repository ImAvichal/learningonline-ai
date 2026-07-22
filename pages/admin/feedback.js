// pages/admin/feedback.js — admin review of submitted feedback.
// Access is enforced server-side by /api/admin/feedback (requireAdmin); this
// page simply renders whatever the API returns, or an access notice on 401/403.
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/auth'
import { Spinner } from '../../components/ui'

const STATUSES = ['', 'new', 'reviewed', 'actioned', 'archived']
const TYPE_LABEL = {
  general: 'General', rating: 'Rating', suggestion: 'Suggestion',
  bug: 'Bug', missing_topic: 'Missing topic',
}

export default function AdminFeedback() {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [status, setStatus]   = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setError('Please sign in with an admin account.'); setLoading(false); return }
      const res = await fetch(`/api/admin/feedback${status ? `?status=${status}` : ''}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (res.status === 401 || res.status === 403) { setError('You do not have admin access.'); setRows([]); setLoading(false); return }
      if (!res.ok) { const b = await res.json().catch(() => ({})); throw new Error(b.error || 'Failed to load') }
      const { feedback } = await res.json()
      setRows(feedback || [])
    } catch (err) {
      setError(err.message || 'Failed to load feedback')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => { load() }, [load])

  return (
    <>
      <Head><title>Feedback — Admin</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <Link href="/" className="font-display font-black text-xl">
              <span>LeO</span> <span className="text-blue">AI</span>
            </Link>
            <span className="text-xs text-gray-500 font-display font-bold uppercase tracking-wider">Admin · Feedback</span>
          </div>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {STATUSES.map((s) => (
              <button key={s || 'all'} onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-full text-xs font-display font-bold border transition-all ${
                  status === s ? 'border-blue/50 bg-blue/10 text-blue' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}>
                {s ? s[0].toUpperCase() + s.slice(1) : 'All'}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center"><div className="flex justify-center mb-3"><Spinner size="lg" /></div><p className="text-sm text-gray-500">Loading feedback…</p></div>
          ) : error ? (
            <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">{error}</div>
          ) : rows.length === 0 ? (
            <div className="py-20 text-center text-sm text-gray-500">No feedback yet.</div>
          ) : (
            <div className="space-y-3">
              {rows.map((r) => (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      {r.rating ? <span className="text-amber-400 text-sm">{'★'.repeat(r.rating)}<span className="text-gray-300">{'★'.repeat(5 - r.rating)}</span></span> : null}
                      <span className="text-xs font-display font-bold px-2 py-0.5 rounded-full bg-blue/10 text-blue">{TYPE_LABEL[r.type] || r.type}</span>
                      {r.course && <span className="text-xs text-gray-400">{r.course}{r.module ? ` · ${r.module}` : ''}</span>}
                    </div>
                    <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  {r.comments && <p className="text-sm text-gray-700 leading-relaxed mb-2">{r.comments}</p>}
                  <div className="text-xs text-gray-400">{r.name || 'Unknown'}{r.email ? ` · ${r.email}` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
