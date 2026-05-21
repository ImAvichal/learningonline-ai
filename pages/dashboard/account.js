// pages/dashboard/account.js
import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import { Card, SectionLabel, Input, TierBadge } from '../../components/ui'
import { TIERS } from '../../data/tiers'

export default function AccountPage() {
  const { user, updateUser, logout } = useAuth()
  const [saved, setSaved] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState('')
  const [form,  setForm]  = useState({
    name:     user?.name     || '',
    company:  user?.company  || '',
    jobTitle: user?.jobTitle || '',
  })

  if (!user) return null
  const tier = TIERS[user.tier] || TIERS.individual

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({ name: form.name, company: form.company, jobTitle: form.jobTitle })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  // Open the Stripe Customer Billing Portal so the user can manage or cancel
  // their subscription. Cancellation is handled entirely by Stripe; our
  // webhook revokes entitlement when Stripe fires subscription.deleted.
  const handleManageSubscription = async () => {
    setPortalError('')
    setPortalLoading(true)
    try {
      const res = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        setPortalError(data.error || 'Could not open the billing portal. Please try again.')
        setPortalLoading(false)
      }
    } catch (err) {
      setPortalError('Could not open the billing portal. Please try again.')
      setPortalLoading(false)
    }
  }

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  return (
    <div className="p-8 lg:p-10">
      <div className="mb-8">
        <SectionLabel>Account</SectionLabel>
        <h2 className="font-display font-black text-2xl">Account Settings</h2>
      </div>

      <div className="max-w-xl space-y-5">

        {/* Profile */}
        <Card light className="p-6">
          <h3 className="font-display font-bold text-xs text-gray-500 uppercase tracking-wider mb-5">Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Full Name"  type="text"  value={form.name}     onChange={set('name')}     placeholder="Your name" />
            <Input label="Company"    type="text"  value={form.company}  onChange={set('company')}  placeholder="Your organisation" />
            <Input label="Job Title"  type="text"  value={form.jobTitle} onChange={set('jobTitle')} placeholder="e.g. Head of Operations" />
            <Input label="Email" type="email" value={user.email} readOnly className="opacity-60 cursor-not-allowed" />
            <button type="submit"
              className="px-6 py-2.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all">
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </form>
        </Card>

        {/* Subscription */}
        <Card light className="p-6">
          <h3 className="font-display font-bold text-xs text-gray-500 uppercase tracking-wider mb-5">Subscription</h3>
          <div className="flex items-center justify-between p-4 bg-blue/5 border border-blue/20 rounded-xl mb-5">
            <div>
              <TierBadge tier={user.tier} className="mb-1" />
              <div className="text-xs text-gray-500 mt-1">
                {user.enrolledAt
                  ? `Enrolled ${new Date(user.enrolledAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}`
                  : 'Active'}
              </div>
            </div>
            <span className="text-xs font-display font-bold text-success bg-success/10 border border-success/25 rounded-full px-3 py-1">Active</span>
          </div>

          <div className="space-y-1.5 mb-5">
            {tier.features.slice(0, 4).map(f => (
              <div key={f} className="flex gap-2 text-xs text-gray-500">
                <span className="text-success flex-shrink-0">✓</span>{f}
              </div>
            ))}
          </div>

          {user.tier === 'journey' && (
            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <div className="font-display font-bold text-sm text-gray-900 mb-1">
                Upgrade to The Pro
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Unlock the remaining four modules — Responsible AI, Sustainability, Multimodal &amp; Orchestration, and the 90-Day Execution Plan — plus all Pro deliverables and frameworks.
              </div>
              <a href="/checkout?tier=pro&interval=monthly"
                className="text-xs font-display font-bold text-blue-bright hover:underline">
                Upgrade to Pro →
              </a>
            </div>
          )}

          {/* Manage subscription — opens the Stripe billing portal.
              Shown only for paid tiers (journey, pro), not free parents users. */}
          {(user.tier === 'journey' || user.tier === 'pro') && !user.isDevUser && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="text-xs font-display font-bold text-gray-600 hover:text-gray-900 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {portalLoading ? 'Opening…' : 'Manage subscription, payment method, or cancel →'}
              </button>
              {portalError && (
                <div className="mt-2 text-xs text-red-500">{portalError}</div>
              )}
              <p className="mt-2 text-[11px] text-gray-400 leading-relaxed">
                Update your card, download invoices, or cancel anytime. If you cancel, your access continues until the end of the period you've already paid for.
              </p>
            </div>
          )}
        </Card>

        {/* Dev user notice */}
        {user.isDevUser && (
          <Card light className="p-5 border-purple-400/20 bg-purple-400/[0.03]">
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🛠️</span>
              <div>
                <div className="font-display font-bold text-sm text-purple-300 mb-1">Developer Access Active</div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  You accessed this platform via the dev bypass key. Full enterprise access is granted without payment.
                  Remove <code className="text-purple-300 bg-purple-400/10 px-1 rounded text-xs">?dev_key=</code> from any URLs before sharing with others.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Sign out */}
        <Card light className="p-6">
          <h3 className="font-display font-bold text-xs text-gray-500 uppercase tracking-wider mb-3">Session</h3>
          <p className="text-sm text-gray-500 mb-4">Your progress is saved automatically. Sign back in anytime.</p>
          <button onClick={logout}
            className="px-6 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-display font-bold text-sm rounded-lg transition-all">
            Sign Out
          </button>
        </Card>

        {/* Support */}
        <Card light className="p-6">
          <h3 className="font-display font-bold text-xs text-gray-500 uppercase tracking-wider mb-3">Support</h3>
          <p className="text-sm text-gray-500 mb-3">Questions about your enrolment, billing, or course content?</p>
          <a href="mailto:hello@learningonline.ai"
            className="text-sm font-display font-bold text-blue-bright hover:underline">
            hello@learningonline.ai →
          </a>
        </Card>
      </div>
    </div>
  )
}
