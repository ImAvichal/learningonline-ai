// pages/dashboard/account.js
import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import { Card, SectionLabel, Input, TierBadge } from '../../components/ui'
import { TIERS } from '../../data/tiers'

export default function AccountPage() {
  const { user, updateUser, logout } = useAuth()
  const [saved, setSaved] = useState(false)
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

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  return (
    <div className="p-8 lg:p-10">
      <div className="mb-8">
        <SectionLabel>Account</SectionLabel>
        <h2 className="font-display font-black text-2xl">Account Settings</h2>
      </div>

      <div className="max-w-xl space-y-5">

        {/* Profile */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-5">Profile</h3>
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
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-5">Subscription</h3>
          <div className="flex items-center justify-between p-4 bg-blue/5 border border-blue/20 rounded-xl mb-5">
            <div>
              <TierBadge tier={user.tier} className="mb-1" />
              <div className="text-xs text-muted mt-1">
                {user.enrolledAt
                  ? `Enrolled ${new Date(user.enrolledAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}`
                  : 'Active'}
              </div>
            </div>
            <span className="text-xs font-display font-bold text-success bg-success/10 border border-success/25 rounded-full px-3 py-1">Active</span>
          </div>

          <div className="space-y-1.5 mb-5">
            {tier.features.slice(0, 4).map(f => (
              <div key={f} className="flex gap-2 text-xs text-muted">
                <span className="text-success flex-shrink-0">✓</span>{f}
              </div>
            ))}
          </div>

          {user.tier !== 'enterprise' && (
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="font-display font-bold text-sm text-white mb-1">
                Upgrade to {user.tier === 'individual' ? 'Small & Medium Business' : 'Enterprise'}
              </div>
              <div className="text-xs text-muted mb-3">
                {user.tier === 'individual'
                  ? 'Get industry playbooks, implementation templates, and up to 5 team seats.'
                  : 'Add the enterprise operating model, data readiness program, governance frameworks, unlimited seats, and monthly advisory sessions.'}
              </div>
              <a href="mailto:hello@learningonline.ai?subject=Upgrade Enquiry"
                className="text-xs font-display font-bold text-blue-bright hover:underline">
                Contact us for pricing →
              </a>
            </div>
          )}

          {user.tier === 'enterprise' && (
            <div className="p-4 bg-purple-400/5 border border-purple-400/20 rounded-xl">
              <div className="font-display font-bold text-sm text-purple-300 mb-1">Monthly Advisory Session</div>
              <div className="text-xs text-muted mb-3">Your Enterprise tier includes a monthly 1-hour advisory session. Book yours below.</div>
              <a href="mailto:hello@learningonline.ai?subject=Advisory Session Booking"
                className="text-xs font-display font-bold text-purple-300 hover:underline">
                Book your next session →
              </a>
            </div>
          )}
        </Card>

        {/* Dev user notice */}
        {user.isDevUser && (
          <Card className="p-5 border-purple-400/20 bg-purple-400/[0.03]">
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🛠️</span>
              <div>
                <div className="font-display font-bold text-sm text-purple-300 mb-1">Developer Access Active</div>
                <div className="text-xs text-muted leading-relaxed">
                  You accessed this platform via the dev bypass key. Full enterprise access is granted without payment.
                  Remove <code className="text-purple-300 bg-purple-400/10 px-1 rounded text-xs">?dev_key=</code> from any URLs before sharing with others.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Sign out */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-3">Session</h3>
          <p className="text-sm text-muted mb-4">Your progress is saved automatically. Sign back in anytime.</p>
          <button onClick={logout}
            className="px-6 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-display font-bold text-sm rounded-lg transition-all">
            Sign Out
          </button>
        </Card>

        {/* Support */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-3">Support</h3>
          <p className="text-sm text-muted mb-3">Questions about your enrolment, billing, or course content?</p>
          <a href="mailto:hello@learningonline.ai"
            className="text-sm font-display font-bold text-blue-bright hover:underline">
            hello@learningonline.ai →
          </a>
        </Card>
      </div>
    </div>
  )
}
