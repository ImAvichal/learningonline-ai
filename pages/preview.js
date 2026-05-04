// pages/preview.js — Patch 5
// Free preview page. Shows 1-2 sample lessons, real-world example, sample Q&A.
// Does NOT expose: full modules, templates, downloads, full assessments.
// Accessible to anyone — unauthenticated or authenticated.

import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Nav, Card, SectionLabel, Reveal, Button } from '../components/ui'
import { useAuth } from '../lib/auth'

const PREVIEW_LESSONS = [
  {
    id: 'preview-1',
    module: 'Module 1',
    title: 'What AI Actually Is (and Isn\'t)',
    duration: '8 min',
    content: `
      <h2>AI is pattern recognition at scale — not magic.</h2>
      <p>Every AI system you've ever used — ChatGPT, Google Search, Netflix recommendations — does one thing: it finds patterns in data and uses them to predict the most useful next output.</p>
      <p>That's it. There's no understanding. No consciousness. No judgment. Just very sophisticated pattern matching, applied very fast, at very large scale.</p>
      <h3>The definition that matters for business</h3>
      <p>For the purposes of running and growing a business, AI is a tool that can automate or augment specific, well-defined tasks — as long as those tasks involve recognising patterns in structured or semi-structured data.</p>
      <h3>What AI IS:</h3>
      <ul>
        <li>Pattern recognition applied to your data</li>
        <li>Prediction based on what it has seen before</li>
        <li>A tool that augments human capability</li>
        <li>Only as good as the data and instructions you give it</li>
        <li>A workflow component — not a standalone solution</li>
      </ul>
      <h3>What AI IS NOT:</h3>
      <ul>
        <li>Human intelligence or understanding</li>
        <li>Always right — it hallucinates. Design around this.</li>
        <li>A replacement for human judgment on high-stakes decisions</li>
        <li>Magic — it requires data, design, and maintenance</li>
        <li>The same as what you see in ChatGPT (production AI requires engineering)</li>
      </ul>
      <div class="real-world-box">
        <h3>🌍 From Real-World Practice</h3>
        <p><strong>Insight:</strong> The most common reason AI projects fail isn't the technology. It's that the organisation tried to automate a process they hadn't properly defined first.</p>
        <p><strong>Example:</strong> A 200-person professional services firm spent $180K building an AI that "improves proposal quality." After six months, adoption was 4%. The problem: nobody could define what "quality" meant. Without a definition, the AI had nothing to learn. The project was shelved.</p>
        <p><strong>Implementation tip:</strong> Before any AI project, complete this sentence in one sentence: "We will know AI is working when [specific measurable outcome]." If you can't complete it, don't start yet.</p>
        <p><strong>💡 What This Saves You:</strong> Organisations that define success criteria before build begin are 3× more likely to deploy successfully.</p>
      </div>
    `,
  },
  {
    id: 'preview-2',
    module: 'Module 1',
    title: 'Tokens: The Currency of AI',
    duration: '10 min',
    content: `
      <h2>Every AI API call is priced in tokens. Understanding tokens = controlling costs.</h2>
      <p>A token is approximately 4 characters, or about ¾ of a word. When you send text to an AI model and receive a response, both the input and output are measured and billed in tokens.</p>
      <h3>Why this matters immediately</h3>
      <p>Token costs look tiny in isolation — fractions of a cent per call. But at business scale, they compound fast. A customer service team processing 1,000 emails a day at 500 tokens each is running 500,000 tokens daily. At GPT-4o pricing, that's $1.25/day — fine. But if someone chose GPT-4o for a task that GPT-4o-mini handles equally well, they're paying 17× more than necessary.</p>
      <h3>The two costs you need to know</h3>
      <ul>
        <li><strong>Input tokens:</strong> Everything you send to the model (your prompt + context)</li>
        <li><strong>Output tokens:</strong> Everything the model sends back — costs 4–6× more than input</li>
      </ul>
      <h3>Quick cost reference (USD, Q1 2025)</h3>
      <ul>
        <li>GPT-4o: $2.50 input / $10.00 output per million tokens</li>
        <li>GPT-4o-mini: $0.15 input / $0.60 output per million tokens</li>
        <li>Claude Haiku: $0.25 input / $1.25 output per million tokens</li>
      </ul>
      <div class="real-world-box">
        <h3>🌍 From Real-World Practice</h3>
        <p><strong>Insight:</strong> Most organisations choose their AI model based on capability demos, not cost at scale. The right question is never "what's the best model?" — it's "what's the cheapest model that meets my accuracy requirement?"</p>
        <p><strong>Example:</strong> A retail company ran 800 support email classifications per day. Using GPT-4o: $219/year. Using GPT-4o-mini (same accuracy on their specific task): $13/year. Difference: $206/year. Small at this scale — but they had 14 other AI use cases in the pipeline. Choosing the right model across all 15 use cases saved over $40,000/year.</p>
        <p><strong>💡 What This Saves You:</strong> Always benchmark 2–3 models before committing. The cheapest model that meets your accuracy threshold is the right model.</p>
      </div>
    `,
  },
]

const SAMPLE_QUIZ = [
  {
    q: 'A business leader says "We want AI to improve our customer service." What is the most important first step?',
    options: [
      'Select an AI vendor immediately',
      'Define specifically what "improved customer service" means in measurable terms',
      'Train the team on AI tools',
      'Build a proof of concept',
    ],
    correct: 1,
    explanation: 'Without a specific, measurable definition of success, there\'s nothing for AI to optimise toward. This is the #1 cause of AI project failure.',
  },
  {
    q: 'Your AI classification system processes 500 emails/day. GPT-4o costs $2.50/million input tokens. GPT-4o-mini costs $0.15/million. Both achieve 92% accuracy on your task. What should you do?',
    options: [
      'Use GPT-4o — it\'s more capable',
      'Use GPT-4o-mini — same accuracy at 17× lower cost',
      'Use both in parallel',
      'Upgrade to Claude Sonnet for better results',
    ],
    correct: 1,
    explanation: 'When two models achieve the same accuracy on a specific task, always choose the cheaper option. At 500 emails/day with ~300 tokens each, the saving is significant at scale.',
  },
]

export default function Preview() {
  const { user } = useAuth()
  const [activeLesson, setActiveLesson] = useState(0)
  const [quizAnswer,   setQuizAnswer]   = useState(null)
  const [quizIdx,      setQuizIdx]      = useState(0)
  const [showResult,   setShowResult]   = useState(false)

  const lesson = PREVIEW_LESSONS[activeLesson]
  const q      = SAMPLE_QUIZ[quizIdx]

  const handleAnswer = (i) => {
    setQuizAnswer(i)
    setShowResult(true)
  }

  return (
    <>
      <Head>
        <title>Free Preview — LeO AI</title>
        <meta name="description" content="Preview two free lessons from the LeO AI curriculum — AI fundamentals and token cost awareness." />
      </Head>
      <Nav />

      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-12">
            <SectionLabel>Free Preview</SectionLabel>
            <h1 className="font-display font-black text-4xl tracking-tight mb-4">
              Preview what you'll learn
            </h1>
            <p className="text-muted text-lg max-w-xl mx-auto mb-3">
              Two real lessons from Module 1, plus a sample knowledge check.
              No sign-up required.
            </p>
            {user && !user.tier && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue/30 bg-blue/10 text-blue-bright text-xs font-display font-bold">
                ✓ Signed in as {user.email} · Full access requires enrolment
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-8">

            {/* Lesson selector */}
            <div className="space-y-2">
              <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Preview Lessons</div>
              {PREVIEW_LESSONS.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLesson(i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    activeLesson === i
                      ? 'border-blue/40 bg-blue/10'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                  }`}>
                  <div className="text-[10px] text-muted font-display mb-0.5">{l.module}</div>
                  <div className="text-xs font-display font-bold text-white leading-snug mb-1">{l.title}</div>
                  <div className="text-[10px] text-muted">{l.duration}</div>
                </button>
              ))}

              {/* Locked lessons */}
              <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mt-5 mb-3">Full Curriculum</div>
              {['Module 2 — Key Roles', 'Module 3 — Use Cases', 'Module 4 — Prioritisation', '+ 10 more modules'].map(m => (
                <div key={m} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-2">
                  <span className="text-xs text-muted/50">🔒</span>
                  <span className="text-xs text-muted/50 leading-snug">{m}</span>
                </div>
              ))}

              <div className="pt-4">
                <Link href="/pricing"
                  className="block w-full py-3 text-center bg-blue hover:bg-blue-bright text-white font-display font-bold text-xs rounded-lg transition-all shadow-[0_0_16px_rgba(26,110,255,0.3)]">
                  Unlock All 14 Modules →
                </Link>
              </div>
            </div>

            {/* Lesson content */}
            <div>
              <Card className="p-8 mb-6">
                <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">
                        {lesson.module}
                      </span>
                      <span className="text-xs text-muted">{lesson.duration}</span>
                      <span className="px-2 py-0.5 bg-success/10 border border-success/25 rounded-full text-[10px] font-display font-bold text-success">FREE</span>
                    </div>
                    <h2 className="font-display font-bold text-xl">{lesson.title}</h2>
                  </div>
                </div>
                <div className="prose-lesson"
                  dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </Card>

              {/* Sample Q&A */}
              <Card className="p-7">
                <div className="flex items-center gap-2 mb-5">
                  <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/25 rounded-full text-xs font-display font-bold text-amber-400">
                    Sample Knowledge Check
                  </span>
                  <span className="text-xs text-muted">Question {quizIdx + 1} of {SAMPLE_QUIZ.length}</span>
                </div>
                <p className="font-display font-bold text-base mb-5">{q.q}</p>
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, i) => {
                    let cls = 'p-4 rounded-xl border text-sm text-left w-full transition-all '
                    if (!showResult) cls += 'border-white/10 hover:border-blue/40 hover:bg-blue/5 text-white/80'
                    else if (i === q.correct) cls += 'border-success/40 bg-success/10 text-white'
                    else if (i === quizAnswer && i !== q.correct) cls += 'border-red-400/40 bg-red-400/10 text-red-400'
                    else cls += 'border-white/5 text-muted/50'
                    return (
                      <button key={i} onClick={() => !showResult && handleAnswer(i)} className={cls}>
                        <span className="font-display font-bold mr-2">{String.fromCharCode(65+i)}.</span>{opt}
                      </button>
                    )
                  })}
                </div>
                {showResult && (
                  <div className={`p-4 rounded-xl mb-4 ${quizAnswer === q.correct ? 'bg-success/10 border border-success/25' : 'bg-blue/10 border border-blue/25'}`}>
                    <div className="text-xs font-display font-bold mb-1 text-white">
                      {quizAnswer === q.correct ? '✓ Correct' : '→ The correct answer is: ' + String.fromCharCode(65+q.correct)}
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{q.explanation}</p>
                  </div>
                )}
                {showResult && quizIdx < SAMPLE_QUIZ.length - 1 && (
                  <button onClick={() => { setQuizIdx(i => i+1); setQuizAnswer(null); setShowResult(false) }}
                    className="text-sm font-display font-bold text-blue-bright hover:underline">
                    Next question →
                  </button>
                )}
                {showResult && quizIdx === SAMPLE_QUIZ.length - 1 && (
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted mb-4">That's the end of the free preview. The full program has 5–8 questions per module with detailed scoring.</p>
                    <Link href="/pricing"
                      className="inline-block px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all">
                      Enrol for Full Access →
                    </Link>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
