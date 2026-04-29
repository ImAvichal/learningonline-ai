// pages/dashboard/templates.js
import { useAuth } from '../../lib/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NoEnrolmentMessage from '../../components/NoEnrolmentMessage'
import { getResourcesForTier } from '../../data/templates'
import { MODULES } from '../../data/modules'
import { Card, SectionLabel, TierBadge } from '../../components/ui'

export default function TemplatesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) router.push('/login')
  }, [user, loading])

  if (loading) return null
  if (!user) return null
  if (!user.tier && !user.isDevUser) {
    return <NoEnrolmentMessage context="course" />
  }

  const tier = user?.tier || 'individual'
  const resources = getResourcesForTier(tier)
  const tierOrder = ['individual', 'smb', 'enterprise']

  const byTier = { // using resources variable
    individual: resources.filter(t => t.tier === 'individual'),
    smb:        resources.filter(t => t.tier === 'smb'),
    enterprise: resources.filter(t => t.tier === 'enterprise'),
  }

  const handleDownload = (tpl) => {
    // Production: fetch signed URL from Supabase Storage, then trigger download
    // const { data } = await supabase.storage.from('templates').createSignedUrl(`${tpl.id}.${tpl.format.toLowerCase()}`, 60)
    // window.location.href = data.signedUrl
    alert(
      `In production, "${tpl.name}.${tpl.format.toLowerCase()}" downloads via a signed Supabase Storage URL.\n\n` +
      `Upload your actual files to Supabase Storage bucket "templates" using the matching filename.`
    )
  }

  const TierSection = ({ tierId, label, items }) => {
    if (!items.length) return null
    return (
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <TierBadge tier={tierId} />
          <span className="text-sm text-muted">{label}</span>
          <span className="text-xs text-muted ml-auto">{items.length} template{items.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map(tpl => {
            const mod = MODULES.find(m => m.id === tpl.moduleId)
            return (
              <Card key={tpl.id} hover className="p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{tpl.icon}</span>
                  <div className="flex items-center gap-2">
                    {mod && (
                      <span className="text-[10px] text-muted font-display bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        M{mod.number}
                      </span>
                    )}
                    <span className="text-[10px] font-display font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-muted">
                      {tpl.format}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-sm text-white mb-2">{tpl.name}</h3>
                <p className="text-xs text-muted leading-relaxed flex-1 mb-4">{tpl.desc}</p>
                <button
                  onClick={() => handleDownload(tpl)}
                  className="w-full py-2.5 border border-white/10 text-muted hover:text-white hover:border-blue hover:bg-blue/10 font-display font-bold text-xs rounded-lg transition-all"
                >
                  ↓ Download {tpl.format}
                </button>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-10">
      <div className="mb-8">
        <SectionLabel>Template Library</SectionLabel>
        <h2 className="font-display font-black text-2xl mb-2">Your Templates</h2>
        <p className="text-muted text-sm">
          {resources.length} templates included with your <strong className="text-white capitalize">{tier}</strong> tier.
          Download and use immediately in your organisation.
        </p>
      </div>

      <TierSection tierId="individual" label="Included with all tiers"  items={byTier.individual} />
      <TierSection tierId="smb"        label="Business tier and above"       items={byTier.smb} />
      <TierSection tierId="enterprise" label="Enterprise tier only"     items={byTier.enterprise} />

      {/* Locked preview */}
      {tier !== 'enterprise' && (
        <div className="mt-4 p-8 border border-dashed border-white/10 rounded-xl text-center">
          <div className="text-3xl mb-3">🔒</div>
          <h4 className="font-display font-bold text-base mb-2">
            {tier === 'individual' ? 'Business & Enterprise templates locked' : 'Enterprise templates locked'}
          </h4>
          <p className="text-sm text-muted max-w-md mx-auto mb-4">
            {tier === 'individual'
              ? 'Upgrade to Business or Enterprise to unlock industry playbooks, implementation guides, and the full enterprise operating model template set.'
              : 'Upgrade to Enterprise to unlock the operating model, data readiness program, governance framework, and command centre design templates.'}
          </p>
          <a
            href="mailto:hello@learningonline.ai?subject=Template Upgrade Enquiry"
            className="inline-flex items-center gap-2 text-sm font-display font-bold text-blue-bright hover:underline"
          >
            Enquire about upgrading →
          </a>
        </div>
      )}

      {/* How to use */}
      <Card className="p-6 mt-10">
        <h3 className="font-display font-bold text-base mb-5">How to use these templates</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n:'1', t:'Complete the module first', d:'Each template ties to a module deliverable. Do the lessons first so you know how to fill it in.' },
            { n:'2', t:'Download and customise',    d:'Every field has instructions and real examples baked in. Adapt to your organisation\'s context.' },
            { n:'3', t:'Use it in your business',   d:'Templates are built to share with stakeholders and present to leadership — not just for personal notes.' },
          ].map(s => (
            <div key={s.n} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center font-display font-bold text-blue-bright text-sm flex-shrink-0">
                {s.n}
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white mb-1">{s.t}</div>
                <div className="text-xs text-muted leading-relaxed">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
