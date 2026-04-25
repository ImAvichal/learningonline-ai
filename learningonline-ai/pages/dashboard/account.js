// pages/dashboard/account.js
import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import { Card, SectionLabel, Input, TierBadge, Button } from '../../components/ui'
import { TIERS } from '../../data/tiers'

export default function AccountPage() {
  const { user, updateUser, logout } = useAuth()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
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
            <Input label="Email" type="email" value={user.email} readOnly
              className="opacity-60 cursor-not-allowed" />
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
                  ? `Enrolled ${new Date(user.enrolledAt).toLocaleDateString('en-AU', { year:'numeric', month:'long', day:'numeric' })}`
                  : 'Active'}
              </div>
            </div>
            <span className="text-xs font-display font-bold text-success bg-success/10 border border-success/25 rounded-full px-3 py-1">
              Active
            </span>
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
                Upgrade to {user.tier === 'individual' ? 'SMB' : 'Enterprise'}
              </div>
              <div className="text-xs text-muted mb-3">
                {user.tier === 'individual'
                  ? 'Get industry playbooks, implementation templates, and up to 5 team seats.'
                  : 'Add the enterprise operating model, data readiness program, unlimited seats, and monthly advisory sessions.'}
              </div>
              <a
                href="mailto:hello@learningonline.ai?subject=Upgrade Enquiry"
                className="text-xs font-display font-bold text-blue-bright hover:underline"
              >
                Contact us for pricing →
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
                  Remove <code className="text-purple-300 bg-purple-400/10 px-1 rounded">?dev_key=</code> from your bookmarks before sharing any URLs with others.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Connected to Praise Consulting */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-4">Advisory Support</h3>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🏢</span>
            <div>
              <div className="font-display font-bold text-sm text-white mb-1">Praise Consulting</div>
              <div className="text-xs text-muted mb-3 leading-relaxed">
                {user.tier === 'enterprise'
                  ? 'Your Enterprise tier includes monthly advisory sessions with the Praise Consulting team. Book your next session below.'
                  : 'Need implementation support beyond the course? Praise Consulting offers hands-on AI transformation engagements.'}
              </div>
              <a
                href={user.tier === 'enterprise'
                  ? 'mailto:hello@praiseconsulting.com.au?subject=Enterprise Advisory Session'
                  : 'https://praiseconsulting.com.au'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-display font-bold text-blue-bright hover:underline"
              >
                {user.tier === 'enterprise' ? 'Book advisory session →' : 'Visit praiseconsulting.com.au →'}
              </a>
            </div>
          </div>
        </Card>

        {/* Sign out */}
        <Card className="p-6">
          <h3 className="font-display font-bold text-xs text-muted uppercase tracking-wider mb-3">Session</h3>
          <p className="text-sm text-muted mb-4">Your progress is saved automatically. Sign back in anytime.</p>
          <button
            onClick={logout}
            className="px-6 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-display font-bold text-sm rounded-lg transition-all"
          >
            Sign Out
          </button>
        </Card>
      </div>
    </div>
  )
}
