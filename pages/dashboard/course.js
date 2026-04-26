// pages/dashboard/course.js
import { useState, useEffect, useRef } from 'react'
import { useAuth, useProgress } from '../../lib/auth'
import { MODULES } from '../../data/modules'
import { ProgressBar, TierBadge, Button, Spinner } from '../../components/ui'

export default function CoursePage() {
  const { user } = useAuth()
  const { isCompleted, markLessonComplete, getModuleProgress, getTotalProgress } = useProgress()

  const tierOrder = ['individual','smb','enterprise']
  const userLevel  = tierOrder.indexOf(user?.tier || 'individual')

  const accessible = MODULES.flatMap((m, mi) =>
    m.lessons.filter(l => tierOrder.indexOf(l.tier) <= userLevel)
      .map((l, li) => ({ ...l, moduleIdx:mi, moduleId:m.id, moduleNumber:m.number, moduleTitle:m.title, moduleIcon:m.icon }))
  )

  const [activeModIdx,  setActiveModIdx]  = useState(0)
  const [activeLessonId, setActiveLessonId] = useState(accessible[0]?.id || null)
  const [expanded,      setExpanded]      = useState({ 0:true })
  const [sidebarOpen,   setSidebarOpen]   = useState(false)
  const [completing,    setCompleting]    = useState(false)
  const mainRef = useRef(null)

  const activeLesson = accessible.find(l => l.id === activeLessonId)
  const activeMod    = MODULES[activeModIdx]
  const curIdx       = accessible.findIndex(l => l.id === activeLessonId)
  const prevLesson   = curIdx > 0 ? accessible[curIdx - 1] : null
  const nextLesson   = curIdx < accessible.length - 1 ? accessible[curIdx + 1] : null

  const goTo = (lesson) => {
    setActiveLessonId(lesson.id)
    setActiveModIdx(lesson.moduleIdx)
    setExpanded(p => ({ ...p, [lesson.moduleIdx]:true }))
    setSidebarOpen(false)
    mainRef.current?.scrollTo({ top:0, behavior:'smooth' })
  }

  const complete = async () => {
    setCompleting(true)
    await new Promise(r => setTimeout(r, 350))
    markLessonComplete(activeLessonId)
    setCompleting(false)
    if (nextLesson) setTimeout(() => goTo(nextLesson), 300)
  }

  const totalPct = getTotalProgress()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 bottom-0 left-0 z-40 w-72 bg-navy-mid border-r border-white/5
        flex flex-col overflow-hidden transition-transform duration-300 h-screen
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-4 py-4 border-b border-white/5 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display font-bold text-muted uppercase tracking-wider">Progress</span>
            <span className="text-xs font-display font-bold text-blue-bright">{totalPct}%</span>
          </div>
          <ProgressBar value={totalPct} />
          <div className="text-xs text-muted mt-1.5">
            {accessible.filter(l => isCompleted(l.id)).length} / {accessible.length} lessons
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MODULES.map((mod, mi) => {
            const modLessons = mod.lessons.filter(l => tierOrder.indexOf(l.tier) <= userLevel)
            if (!modLessons.length) return null
            const modProg    = getModuleProgress(mod)
            const isExpanded = !!expanded[mi]
            const isActiveMod = mi === activeModIdx

            return (
              <div key={mod.id}>
                <button onClick={() => setExpanded(p => ({ ...p, [mi]:!p[mi] }))}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] transition-colors ${isActiveMod ? 'bg-blue/[0.06]' : 'hover:bg-white/[0.02]'}`}>
                  <span className="text-base flex-shrink-0">{mod.icon}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[10px] text-muted font-display">M{mod.number}</div>
                    <div className="text-xs font-display font-bold text-white truncate">{mod.title}</div>
                    <ProgressBar value={modProg} className="mt-1.5" />
                  </div>
                  <svg className={`w-3 h-3 text-muted flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90':''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                {isExpanded && (
                  <div className="bg-black/20">
                    {modLessons.map((lesson, li) => {
                      const done   = isCompleted(lesson.id)
                      const active = lesson.id === activeLessonId
                      const al     = accessible.find(a => a.id === lesson.id)
                      return (
                        <button key={lesson.id} onClick={() => al && goTo(al)}
                          className={`w-full flex items-start gap-3 px-4 py-2.5 pl-10 border-b border-white/[0.03] transition-colors text-left ${active ? 'bg-blue/15' : 'hover:bg-white/[0.03]'}`}>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] ${done ? 'bg-success border-success text-navy font-bold' : active ? 'border-blue bg-blue/20' : 'border-white/15'}`}>
                            {done ? '✓' : <span className="text-muted">{li+1}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-[11px] leading-snug ${active ? 'text-white font-display font-bold' : 'text-white/70'}`}>{lesson.title}</div>
                            {lesson.tier !== 'individual' && <TierBadge tier={lesson.tier} className="mt-1 text-[9px] py-0.5 px-2" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main ref={mainRef} className="flex-1 overflow-y-auto min-w-0">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-navy-mid border-b border-white/5 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-muted">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <span className="text-sm text-muted truncate">{activeLesson?.title}</span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10">
          {activeLesson ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">Module {activeLesson.moduleNumber}</span>
                  {activeLesson.duration && <span className="text-xs text-muted">{activeLesson.duration}</span>}
                  {activeLesson.tier !== 'individual' && <TierBadge tier={activeLesson.tier} />}
                  {isCompleted(activeLessonId) && <span className="px-3 py-1 bg-success/10 border border-success/25 rounded-full text-xs font-display font-bold text-success">✓ Complete</span>}
                </div>
                <h1 className="font-display font-black leading-tight mb-2" style={{fontSize:'clamp(22px,3vw,34px)'}}>{activeLesson.title}</h1>
                <p className="text-muted">{activeLesson.moduleTitle}</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 mb-6 prose-lesson"
                dangerouslySetInnerHTML={{ __html: activeLesson.content }} />

              {activeMod && activeMod.lessons[activeMod.lessons.length - 1].id === activeLessonId && nextLesson && (
                <div className="bg-success/5 border border-success/20 rounded-xl p-6 mb-6 flex gap-4">
                  <span className="text-3xl flex-shrink-0">📋</span>
                  <div>
                    <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Module Deliverable</div>
                    <h3 className="font-display font-bold text-lg mb-2">{activeMod.deliverable}</h3>
                    <p className="text-sm text-muted mb-3">Download the template from your Templates section to complete this deliverable.</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <button onClick={() => prevLesson && goTo(prevLesson)}
                  className={`flex items-center gap-2 text-sm text-muted hover:text-white transition-colors ${!prevLesson ? 'invisible':''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                  Previous
                </button>
                <div className="flex items-center gap-3">
                  {!isCompleted(activeLessonId) ? (
                    <button onClick={complete} disabled={completing}
                      className="flex items-center gap-2 px-5 py-2.5 bg-success/10 border border-success/30 text-success font-display font-bold text-sm rounded-lg hover:bg-success/20 transition-all disabled:opacity-50">
                      {completing ? <Spinner size="sm"/> : '✓'} Mark Complete
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-success/10 border border-success/25 rounded-lg text-xs font-display font-bold text-success">✓ Complete</span>
                  )}
                  {nextLesson && (
                    <button onClick={() => goTo(nextLesson)}
                      className="px-5 py-2.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.3)]">
                      Next →
                    </button>
                  )}
                </div>
              </div>

              {!nextLesson && isCompleted(activeLessonId) && (
                <div className="mt-10 text-center p-10 bg-blue/5 border border-blue/20 rounded-2xl">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="font-display font-black text-2xl mb-2">Course Complete!</h2>
                  <p className="text-muted mb-6">You've completed Le On AI. Time to execute.</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-muted py-20">Select a lesson from the sidebar to begin.</div>
          )}
        </div>
      </main>
    </div>
  )
}
