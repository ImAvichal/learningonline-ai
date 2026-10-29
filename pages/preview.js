// pages/preview.js — Patch 5
// Free preview page. Shows 1-2 sample lessons, real-world example, sample Q&A.
// Does NOT expose: full modules, templates, downloads, full assessments.
// Accessible to anyone — unauthenticated or authenticated.

import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Nav, Card, SectionLabel, Reveal, Button } from '../components/ui'
import Footer from '../components/Footer'
import { useAuth } from '../lib/auth'

const PREVIEW_LESSONS = [
  {
    id: 'preview-1',
    module: 'Module 1',
    title: 'What AI Actually Is (and Isn\'t)',
    duration: '8 min',
    content: `
      <h2>AI learns patterns and generates useful outputs — but it has limits.</h2>
      <p>Modern AI systems can recognise patterns, generate content, analyse information and use tools. Different systems work differently: a recommendation engine is not the same as a conversational assistant.</p>
      <p>AI can perform sophisticated reasoning tasks, but its answers are not guaranteed to be correct. Avoid treating fluent language as proof of understanding or reliability. Check important claims against trusted sources.</p>
      <h3>The definition that matters for business</h3>
      <p>For the purposes of running and growing a business, AI can support well-defined tasks such as summarisation, drafting, classification and research. Reliable business use requires clear objectives, suitable data, evaluation and human oversight.</p>
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
        <p><strong>Example:</strong> Consider a hypothetical professional services firm building an AI proposal assistant without defining quality or measuring staff adoption. The tool might produce polished text while failing to improve win rates or reduce review time.</p>
        <p><strong>Implementation tip:</strong> Before any AI project, complete this sentence in one sentence: "We will know AI is working when [specific measurable outcome]." If you can't complete it, don't start yet.</p>
        <p><strong>💡 What This Saves You:</strong> Defining success measures before implementation makes it easier to test whether a system is delivering value. No universal success-rate multiplier is assumed.</p>
      </div>
    `,
  },
  {
    id: 'preview-2',
    module: 'Module 1',
    title: 'Tokens: The Currency of AI',
    duration: '10 min',
    content: `
      <h2>Many AI APIs charge by tokens. Learn the maths before you scale.</h2>
      <p>Tokens are units used to measure model input and output. In English, one token is often roughly three-quarters of a word, but the exact count varies by language and model.</p>
      <h3>Why this matters</h3>
      <p>Suppose a team processes 1,000 emails each day, using 500 input tokens per email. That is 500,000 input tokens daily. At an <strong>illustrative</strong> input rate of US$1 per million tokens, input processing costs US$0.50 per day. Output tokens, other tools, retries and infrastructure add further costs.</p>
      <h3>The two costs you need to know</h3>
      <ul>
        <li><strong>Input tokens:</strong> Your instructions, documents and context sent to the model.</li>
        <li><strong>Output tokens:</strong> The model's generated response. Input and output prices can differ substantially by model.</li>
      </ul>
      <h3>Worked example — illustrative rates, not a live price list</h3>
      <p>Assume a model charges US$1 per million input tokens and US$5 per million output tokens. A request with 1,000 input tokens and 500 output tokens costs US$0.001 + US$0.0025 = <strong>US$0.0035 per request</strong>, before any additional charges.</p>
      <p>For current rates, always check the provider's <a href="https://platform.openai.com/pricing" target="_blank" rel="noopener noreferrer">official pricing</a>, <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer">Claude pricing</a> or <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer">Gemini pricing</a>. Prices and model availability change.</p>
      <div class="real-world-box">
        <h3>🌍 From Real-World Practice</h3>
        <p><strong>Insight:</strong> Most organisations choose their AI model based on capability demos, not cost at scale. The right question is never "what's the best model?" — it's "what's the cheapest model that meets my accuracy requirement?"</p>
        <p><strong>Example:</strong> Illustrative comparison: 800 emails a day at 300 input tokens each is 240,000 input tokens daily. At US$1 per million input tokens that costs US$0.24/day; at US$0.10 it costs US$0.024/day. The difference is about US$79 a year at 365 days of use, excluding output tokens and other costs. Only compare options after measuring accuracy and safety on your own data.</p>
        <p><strong>💡 What This Saves You:</strong> Benchmark several suitable models for quality, safety, latency, privacy and total cost. Choose the lowest-cost option that meets all your requirements.</p>
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
    explanation: 'Without a specific, measurable definition of success, there\'s nothing for AI to optimise toward. Unclear success measures are a common project risk; the lesson does not claim a universal ranking.',
  },
  {
    q: 'Two AI models achieve the same measured classification accuracy and meet your safety and privacy requirements. Model B costs less for the same workload. What should you do?',
    options: [
      'Always choose the more expensive model',
      'Prefer Model B after validating quality, latency and total cost',
      'Use both models in parallel forever',
      'Choose based only on which model is newest',
    ],
    correct: 1,
    explanation: 'Compare models on your actual workload. Once quality, safety, privacy and latency requirements are met, total cost becomes a useful deciding factor.',
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
                  Explore the Full Curriculum →
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
      <Footer variant="light" />
    </>
  )
}
