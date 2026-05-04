// pages/dashboard/index.js — /dashboard
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth, useProgress, withAuth } from '../../lib/auth'
import NoEnrolmentMessage from '../../components/NoEnrolmentMessage'
import { MODULES } from '../../data/modules'
import { getResourcesForTier } from '../../data/templates'
import { Sidebar, Card, ProgressBar, Button, SectionLabel, TierBadge, Reveal } from '../../components/ui'

// Sub-pages (lazy-loaded as components)
import CoursePage    from './course'
import TemplatesPage from './templates'
import AccountPage   from './account'

function Dashboard() {
  const { user } = useAuth()
  const { getTotalProgress, getModuleProgress, isCompleted, getNextLesson } = useProgress()
  const [tab, setTab] = useState('home')

  useEffect(() => {
    const hash = window.location.hash.replace('#','')
    if (['home','course','templates','account'].includes(hash)) setTab(hash)
  }, [])

  const switchTab = (t) => { setTab(t); window.location.hash = t }

  // Patch 7: unpaid users see NoEnrolmentMessage
  if (!user?.tier && !user?.isDevUser) {
    return <NoEnrolmentMessage context="dashboard" />
  }

  const tierOrder = ['journey', 'pro']
  const userLevel  = tierOrder.indexOf(user.tier || 'journey')
  const accessible = MODULES.flatMap(m =>
    m.lessons.filter(l => tierOrder.indexOf(l.tier) <= userLevel)
      .map(l => ({ ...l, moduleId:m.id, moduleNumber:m.number, moduleTitle:m.title }))
  )

  const totalPct      = getTotalProgress()
  const nextLesson    = getNextLesson(accessible)
  const completedMods = MODULES.filter(m => m.lessons.every(l => isCompleted(l.id))).length
  const templates     = getResourcesForTier(user.tier)

  return (
    <>
      <Head><title>Dashboard — LeO AI</title></Head>
      <div className="min-h-screen flex">
        <Sidebar activeTab={tab} onTab={switchTab} user={user} />
        <main className="flex-1 lg:ml-56 min-h-screen overflow-auto">
          {tab === 'home'      && <HomeTab user={user} totalPct={totalPct} completedMods={completedMods} nextLesson={nextLesson} switchTab={switchTab} templates={templates} getModuleProgress={getModuleProgress} isCompleted={isCompleted} />}
          {tab === 'course'    && <CoursePage />}
          {tab === 'templates' && <TemplatesPage />}
          {tab === 'account'   && <AccountPage />}
        </main>
      </div>
    </>
  )
}

function HomeTab({ user, totalPct, completedMods, nextLesson, switchTab, templates, getModuleProgress, isCompleted }) {
  return (
    <div className="p-8 lg:p-10 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h1 className="font-display font-black text-3xl">Welcome back, {user.name?.split(' ')[0] || 'there'} 👋</h1>
          {user.isDevUser && <TierBadge tier="enterprise" label="Dev Access" />}
        </div>
        <p className="text-muted">Here's where you stand on your AI execution journey.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { val:`${totalPct}%`,       label:'Progress',  sub:'course complete',        color:'text-blue-bright' },
          { val:`${completedMods}/8`, label:'Modules',   sub:'completed',              color:'text-success' },
          { val:templates.length,     label:'Templates', sub:'ready to download',      color:'text-blue-bright' },
          { val:'∞',                  label:'Access',    sub:'lifetime · all updates', color:'text-success' },
        ].map((k,i) => (
          <Card key={i} className="p-5">
            <div className={`font-display font-black text-3xl mb-1 ${k.color}`}>{k.val}</div>
            <div className="text-xs font-display font-bold text-white">{k.label}</div>
            <div className="text-xs text-muted">{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card className="p-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-display font-bold">Course Progress</span>
          <span className="text-sm font-display font-bold text-blue-bright">{totalPct}%</span>
        </div>
        <ProgressBar value={totalPct} className="mb-2" />
        <p className="text-xs text-muted">
          {totalPct === 0   && 'Start with Module 1 — The Reality of AI.'}
          {totalPct > 0 && totalPct < 100 && 'Keep going — every module delivers a real deliverable.'}
          {totalPct === 100 && '🎉 Course complete! Time to execute.'}
        </p>
      </Card>

      {/* Resume */}
      {nextLesson && (
        <div className="bg-blue/5 border border-blue/30 rounded-xl p-5 mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-1">
              {totalPct === 0 ? 'Start Here' : 'Resume Learning'}
            </div>
            <div className="font-display font-bold text-base text-white mb-0.5">{nextLesson.title}</div>
            <div className="text-sm text-muted">Module {nextLesson.moduleNumber}: {nextLesson.moduleTitle}</div>
          </div>
          <button onClick={() => switchTab('course')}
            className="flex-shrink-0 px-5 py-2.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.35)] whitespace-nowrap">
            {totalPct === 0 ? 'Start →' : 'Continue →'}
          </button>
        </div>
      )}

      {/* Tier-specific callout */}
      {user.tier === 'pro' && (
        <div className="mb-8 p-6 rounded-xl bg-purple-400/5 border border-purple-400/20">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-2xl">🏢</span>
            <div>
              <div className="text-xs font-display font-bold text-purple-300 uppercase tracking-wider mb-1">Enterprise Access</div>
              <h3 className="font-display font-bold text-base mb-1">Your full transformation toolkit is unlocked</h3>
              <p className="text-sm text-muted">Operating model, data readiness program, governance frameworks, command centre design — all included.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[['⚙️','Operating Model'],['🗄️','Data Readiness'],['⚖️','Governance'],['🖥️','Command Centre']].map(([icon,label]) => (
              <button key={label} onClick={() => switchTab('course')}
                className="p-3 bg-white/[0.03] border border-white/[0.07] rounded-lg text-left hover:border-purple-400/30 transition-colors">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-xs font-display font-bold text-white">{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {user.tier === 'journey' && (
        <div className="mb-8 p-6 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💼</span>
            <div>
              <div className="text-xs font-display font-bold text-amber-400 uppercase tracking-wider mb-1">Starting the Journey Access</div>
              <h3 className="font-display font-bold text-base mb-1">Industry playbooks and implementation templates unlocked</h3>
              <button onClick={() => switchTab('templates')} className="text-sm font-display font-bold text-amber-400 hover:underline mt-2 block">
                View your templates →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Module list */}
      <div className="mb-6">
        <div className="text-xs font-display font-bold text-muted uppercase tracking-widest mb-4">All Modules</div>
        <div className="space-y-3">
          {MODULES.map(mod => {
            const prog  = getModuleProgress(mod)
            const isDone = prog === 100
            const isIP   = prog > 0 && prog < 100
            return (
              <button key={mod.id} onClick={() => switchTab('course')} className="w-full text-left">
                <Card hover className={`p-4 ${isIP ? 'border-blue/25 bg-blue/[0.03]' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl w-8 text-center flex-shrink-0">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-muted font-display">Module {mod.number}</span>
                        {isDone && <span className="text-[10px] font-display font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">Complete</span>}
                        {isIP   && <span className="text-[10px] font-display font-bold text-blue-bright bg-blue/10 border border-blue/20 px-2 py-0.5 rounded-full">In Progress</span>}
                      </div>
                      <div className="font-display font-bold text-sm text-white truncate">{mod.title}</div>
                      <ProgressBar value={prog} className="mt-2" />
                    </div>
                    <svg className="text-muted flex-shrink-0 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      </div>

      {/* Upgrade prompt */}
      {user.tier !== 'pro' && (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🚀</span>
            <div className="flex-1">
              <h3 className="font-display font-bold text-base mb-1">
                {user.tier === 'journey' ? 'Upgrade to The Pro for orchestration and governance' : 'Upgrade to The Pro for the full transformation program'}
              </h3>
              <p className="text-sm text-muted mb-4">
                {user.tier === 'journey'
                  ? 'Get industry playbooks, implementation templates, and bring your team of up to 5.'
                  : 'Add the enterprise operating model, data readiness program, governance frameworks, and monthly advisory sessions.'}
              </p>
              <Button variant="ghost" href="mailto:hello@learningonline.ai?subject=Upgrade Enquiry" className="text-sm px-5 py-2.5">
                Enquire about upgrading →
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default withAuth(Dashboard)
