// pages/dashboard/course.js — Course player with Q&A scoring
import { useState, useRef, useEffect } from 'react'
import { useAuth, useProgress } from '../../lib/auth'
import NoEnrolmentMessage from '../../components/NoEnrolmentMessage'
import { useRouter } from 'next/router'
import { MODULES } from '../../data/modules'
import { ProgressBar, TierBadge, Spinner, ThemeToggle, LessonFeedback } from '../../components/ui'

// ── Quiz Component ────────────────────────────────────────────────────────────
function ModuleQuiz({ quiz, moduleId, onComplete }) {
  const [current,  setCurrent]  = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [scores,   setScores]   = useState([])
  const [finished, setFinished] = useState(false)

  const q = quiz.questions[current]

  const choose = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    setScores(s => [...s, idx === q.correct ? 1 : 0])
  }

  const next = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(c => c + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
      const total = [...scores, selected === q.correct ? 1 : 0].reduce((a,b) => a+b, 0)
      onComplete && onComplete(total, quiz.questions.length)
    }
  }

  const totalCorrect = [...scores, ...(finished && selected !== null ? [selected === q.correct ? 1 : 0] : [])].reduce((a,b)=>a+b,0)
  const pct = Math.round((totalCorrect / quiz.questions.length) * 100)
  const level = pct >= 80 ? 'Advanced' : pct >= 55 ? 'Intermediate' : 'Beginner'
  const levelColor = pct >= 80 ? 'text-success' : pct >= 55 ? 'text-amber-400' : 'text-blue-bright'

  if (finished) {
    return (
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{pct >= 80 ? '🏆' : pct >= 55 ? '📈' : '📚'}</div>
          <h3 className="font-display font-bold text-2xl mb-2">Module Complete</h3>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-display font-black text-4xl">{pct}%</span>
            <span className={`font-display font-bold text-xl ${levelColor}`}>{level}</span>
          </div>
          <p className="text-muted text-sm">{totalCorrect} of {quiz.questions.length} questions correct</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Beginner', desc: 'Focus on re-reading the core concepts before applying', range: '0–54%', active: level === 'Beginner', color: 'text-blue-bright', border: 'border-blue/30' },
            { label: 'Intermediate', desc: 'Good foundation. Apply through the templates and revisit gaps.', range: '55–79%', active: level === 'Intermediate', color: 'text-amber-400', border: 'border-amber-400/30' },
            { label: 'Advanced', desc: 'Strong grasp. Move confidently to implementation.', range: '80–100%', active: level === 'Advanced', color: 'text-success', border: 'border-success/30' },
          ].map(l => (
            <div key={l.label} className={`p-4 rounded-xl border ${l.active ? l.border + ' bg-white/[0.04]' : 'border-white/5'}`}>
              <div className={`font-display font-bold text-sm mb-1 ${l.active ? l.color : 'text-muted'}`}>{l.label}</div>
              <div className="text-xs text-muted mb-2">{l.range}</div>
              {l.active && <div className="text-xs text-white/80 leading-relaxed">{l.desc}</div>}
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Next Steps</div>
          <p className="text-sm text-white/80">
            {pct >= 80
              ? 'Excellent. Download the module template and apply the frameworks to your organisation. Proceed to the next module.'
              : pct >= 55
              ? 'Good progress. Review the questions you missed, download the template, and apply to a real scenario before moving on.'
              : 'Take time to re-read the module lessons. Focus on the Real-World Practice sections — they contain the most practical context. Retake the quiz when ready.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-1">Module Quiz</div>
          <h3 className="font-display font-bold text-lg">Question {current + 1} of {quiz.questions.length}</h3>
        </div>
        <div className="flex gap-1.5">
          {quiz.questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${
              i < scores.length
                ? scores[i] === 1 ? 'bg-success' : 'bg-red-400'
                : i === current ? 'bg-blue' : 'bg-white/10'
            }`} />
          ))}
        </div>
      </div>

      <ProgressBar value={((current) / quiz.questions.length) * 100} className="mb-6" />

      <p className="text-base text-white leading-relaxed mb-6 font-display font-medium">{q.text}</p>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let cls = 'border-white/10 text-white/80 hover:border-blue/40 hover:bg-blue/5'
          if (answered) {
            if (i === q.correct) cls = 'border-success bg-success/10 text-white'
            else if (i === selected && i !== q.correct) cls = 'border-red-400 bg-red-400/10 text-white'
            else cls = 'border-white/5 text-muted'
          }
          return (
            <button key={i} onClick={() => choose(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex gap-4 items-start ${cls} ${answered ? 'cursor-default' : 'cursor-pointer'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-display font-bold ${
                answered && i === q.correct ? 'border-success bg-success text-navy' :
                answered && i === selected && i !== q.correct ? 'border-red-400 bg-red-400 text-white' :
                'border-white/20'
              }`}>
                {answered && i === q.correct ? '✓' : answered && i === selected ? '✕' : String.fromCharCode(65 + i)}
              </div>
              <span className="text-sm leading-relaxed">{opt}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="p-4 rounded-xl bg-blue/8 border border-blue/20 mb-5">
          <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-1">Explanation</div>
          <p className="text-sm text-white/80 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button onClick={next}
          className="w-full py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all">
          {current < quiz.questions.length - 1 ? 'Next Question →' : 'See My Results →'}
        </button>
      )}
    </div>
  )
}

// ── Lesson Content Renderer ───────────────────────────────────────────────────
function LessonContent({ content }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 prose-lesson"
      dangerouslySetInnerHTML={{ __html: content }} />
  )
}

// ── Main Course Page ──────────────────────────────────────────────────────────
export default function CoursePage() {
  const { user, loading } = useAuth()
  const { isCompleted, markLessonComplete, getModuleProgress, getTotalProgress } = useProgress()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) router.push('/login')
  }, [user, loading])

  // Unauthenticated — wait for redirect
  if (loading) return null
  if (!user) return null

  // Authenticated but not enrolled — show preview message
  if (!user.tier && !user.isDevUser) {
    return <NoEnrolmentMessage context="course" />
  }

  const tierOrder = ['individual', 'smb', 'enterprise']
  const userLevel  = tierOrder.indexOf(user?.tier || 'individual')

  const accessible = MODULES.flatMap((m, mi) =>
    m.lessons.filter(l => tierOrder.indexOf(l.tier) <= userLevel)
      .map((l, li) => ({ ...l, moduleIdx: mi, moduleId: m.id, moduleNumber: m.number, moduleTitle: m.title, moduleIcon: m.icon }))
  )

  const [activeModIdx,   setActiveModIdx]   = useState(0)
  const [activeLessonId, setActiveLessonId] = useState(accessible[0]?.id || null)
  const [expanded,       setExpanded]       = useState({ 0: true })
  const [sidebarOpen,    setSidebarOpen]    = useState(false)
  const [completing,     setCompleting]     = useState(false)
  const [showQuiz,       setShowQuiz]       = useState(false)
  const [quizScores,     setQuizScores]     = useState({})
  const mainRef = useRef(null)

  const activeLesson = accessible.find(l => l.id === activeLessonId)
  const activeMod    = MODULES[activeModIdx]
  const curIdx       = accessible.findIndex(l => l.id === activeLessonId)
  const prevLesson   = curIdx > 0 ? accessible[curIdx - 1] : null
  const nextLesson   = curIdx < accessible.length - 1 ? accessible[curIdx + 1] : null

  // Check if this is the last lesson in the current module (trigger quiz)
  const isLastLessonInModule = activeMod &&
    activeMod.lessons[activeMod.lessons.length - 1].id === activeLessonId

  const goTo = (lesson) => {
    setActiveLessonId(lesson.id)
    setActiveModIdx(lesson.moduleIdx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setExpanded(p => ({ ...p, [lesson.moduleIdx]: true }))
    setSidebarOpen(false)
    setShowQuiz(false)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleComplete = async () => {
    setCompleting(true)
    await new Promise(r => setTimeout(r, 350))
    markLessonComplete(activeLessonId)
    setCompleting(false)
    // If last lesson in module, show quiz
    if (isLastLessonInModule && activeMod?.quiz) {
      setShowQuiz(true)
      mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (nextLesson) {
      setTimeout(() => goTo(nextLesson), 300)
    }
  }

  const handleQuizComplete = (correct, total) => {
    setQuizScores(s => ({ ...s, [activeMod.id]: { correct, total, pct: Math.round((correct/total)*100) } }))
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
            const quizScore  = quizScores[mod.id]

            return (
              <div key={mod.id}>
                <button onClick={() => setExpanded(p => ({ ...p, [mi]: !p[mi] }))}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] transition-colors ${isActiveMod ? 'bg-blue/[0.06]' : 'hover:bg-white/[0.02]'}`}>
                  <span className="text-base flex-shrink-0">{mod.icon}</span>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[10px] text-muted font-display">M{mod.number}</div>
                    <div className="text-xs font-display font-bold text-white truncate">{mod.title}</div>
                    <ProgressBar value={modProg} className="mt-1.5" />
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {quizScore && (
                      <span className={`text-[9px] font-display font-bold px-1.5 py-0.5 rounded-full ${
                        quizScore.pct >= 80 ? 'bg-success/20 text-success' :
                        quizScore.pct >= 55 ? 'bg-amber-400/20 text-amber-400' :
                        'bg-blue/20 text-blue-bright'
                      }`}>{quizScore.pct}%</span>
                    )}
                    <svg className={`w-3 h-3 text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
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
                            {done ? '✓' : <span className="text-muted">{li + 1}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-[11px] leading-snug ${active ? 'text-white font-display font-bold' : 'text-white/70'}`}>{lesson.title}</div>
                            {lesson.tier !== 'individual' && <TierBadge tier={lesson.tier} label={lesson.tier === 'smb' ? 'Business' : 'Enterprise'} className="mt-1 text-[9px] py-0.5 px-2" />}
                          </div>
                        </button>
                      )
                    })}
                    {/* Quiz indicator */}
                    {mod.quiz && (
                      <div className={`flex items-center gap-3 px-4 py-2.5 pl-10 border-b border-white/[0.03] ${showQuiz && isActiveMod ? 'bg-blue/15' : ''}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 text-[9px] ${quizScores[mod.id] ? 'bg-success border-success text-navy font-bold' : 'border-white/15'}`}>
                          {quizScores[mod.id] ? '✓' : '?'}
                        </div>
                        <div className="text-[11px] text-white/50">Module Quiz ({mod.quiz.questions.length} questions)</div>
                      </div>
                    )}
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
        <div className="lg:hidden px-4 py-3 bg-navy-mid border-b border-white/5 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-muted flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-muted font-display uppercase tracking-wider">Module {activeMod?.number} · Lesson {activeLesson?.number}</div>
              <div className="text-sm font-display font-bold text-white truncate">{activeLesson?.title}</div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 lg:px-6 lg:py-10">
          {showQuiz && activeMod?.quiz ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">Module {activeMod.number}</span>
                  <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/25 rounded-full text-xs font-display font-bold text-amber-400">Knowledge Check</span>
                </div>
                <h1 className="font-display font-black text-3xl mb-2">Module Quiz: {activeMod.title}</h1>
                <p className="text-muted">{activeMod.quiz.questions.length} scenario-based questions. Instant feedback on each answer.</p>
              </div>
              <ModuleQuiz quiz={activeMod.quiz} moduleId={activeMod.id} onComplete={handleQuizComplete} />
              {nextLesson && (
                <div className="mt-6 text-center">
                  <button onClick={() => { setShowQuiz(false); goTo(nextLesson) }}
                    className="px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.3)]">
                    Continue to Next Module →
                  </button>
                </div>
              )}
            </>
          ) : activeLesson ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">Module {activeLesson.moduleNumber}</span>
                    {activeLesson.duration && <span className="text-xs text-muted">{activeLesson.duration}</span>}
                    {activeLesson.tier !== 'individual' && <TierBadge tier={activeLesson.tier} label={activeLesson.tier === 'smb' ? 'Business' : 'Enterprise'} />}
                    {isCompleted(activeLessonId) && <span className="px-3 py-1 bg-success/10 border border-success/25 rounded-full text-xs font-display font-bold text-success">✓ Complete</span>}
                  </div>
                  <ThemeToggle compact />
                </div>
                <h1 className="font-display font-black leading-tight mb-2" style={{ fontSize: 'clamp(22px,3vw,34px)' }}>{activeLesson.title}</h1>
                <p className="text-muted">{activeLesson.moduleTitle}</p>
              </div>

              <LessonContent content={activeLesson.content} />

              {/* Deliverable callout at end of module */}
              {isLastLessonInModule && activeMod && (
                <div className="bg-success/5 border border-success/20 rounded-xl p-6 my-6 flex gap-4">
                  <span className="text-3xl flex-shrink-0">📋</span>
                  <div>
                    <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Module Deliverable</div>
                    <h3 className="font-display font-bold text-lg mb-2">{activeMod.deliverable}</h3>
                    <p className="text-sm text-muted mb-3">Complete this deliverable using the template in your Templates section before taking the module quiz.</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <button onClick={() => prevLesson && goTo(prevLesson)}
                  className={`flex items-center gap-2 text-sm text-muted hover:text-white transition-colors ${!prevLesson ? 'invisible' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                  Previous
                </button>
                <div className="flex items-center gap-3">
                  {!isCompleted(activeLessonId) ? (
                    <button onClick={handleComplete} disabled={completing}
                      className="flex items-center gap-2 px-5 py-2.5 bg-success/10 border border-success/30 text-success font-display font-bold text-sm rounded-lg hover:bg-success/20 transition-all disabled:opacity-50">
                      {completing ? <Spinner size="sm"/> : '✓'} Mark Complete
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-success/10 border border-success/25 rounded-lg text-xs font-display font-bold text-success">✓ Complete</span>
                  )}
                  {isLastLessonInModule && activeMod?.quiz && isCompleted(activeLessonId) && (
                    <button onClick={() => setShowQuiz(true)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy font-display font-bold text-sm rounded-lg transition-all">
                      Take Module Quiz →
                    </button>
                  )}
                  {nextLesson && !isLastLessonInModule && (
                    <button onClick={() => goTo(nextLesson)}
                      className="px-5 py-2.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.3)]">
                      Next →
                    </button>
                  )}
                </div>
              </div>

              {!nextLesson && isCompleted(activeLessonId) && !showQuiz && (
                <div className="mt-10 text-center p-10 bg-blue/5 border border-blue/20 rounded-2xl">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="font-display font-black text-2xl mb-2">All lessons complete!</h2>
                  <p className="text-muted mb-6">Take the final module quiz to complete your Le On AI certification.</p>
                  {activeMod?.quiz && (
                    <button onClick={() => setShowQuiz(true)}
                      className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-navy font-display font-bold rounded-lg transition-all">
                      Take Final Quiz →
                    </button>
                  )}
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
