// pages/mindset.js — Mindset (AI as Amplifier, Not Replacer)
//
// Repositions the conversation away from "ROI / cost reduction" and toward
// "AI increases output, not replaces people". The ROI calculator is presented
// as ONE WAY to measure value, not THE way.

import Head from 'next/head'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Nav, SectionLabel, Card } from '../components/ui'
import { useAuth } from '../lib/auth'

// ── Section pattern — keep typography consistent ────────────────────────────
function Section({ id, label, title, children }) {
  return (
    <section id={id} className="py-16 sm:py-20 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-5 mt-3 leading-tight">
          {title}
        </h2>
        <div className="prose prose-base text-gray-700 leading-relaxed space-y-5 max-w-none">
          {children}
        </div>
      </div>
    </section>
  )
}

// ── Practical example tile ──────────────────────────────────────────────────
function ExampleTile({ icon, title, body }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue/40 hover:shadow-lg transition-all duration-200">
      <div className="text-3xl mb-3" aria-hidden="true">{icon}</div>
      <h3 className="font-display font-bold text-base text-gray-900 mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  )
}

export default function Mindset() {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Mindset — LeO AI</title>
        <meta name="description" content="AI as amplifier, not replacement. The mindset shift that turns AI from a threat into a productivity multiplier." />
      </Head>

      <Nav user={user} />

      <main className="bg-gray-50 min-h-screen">

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 sm:pt-36 sm:pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <SectionLabel>Mindset</SectionLabel>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-gray-900 mt-4 mb-5 leading-tight break-words">
              AI increases output.<br className="hidden sm:inline" /> Not replaces people.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              The most powerful shift isn't in the technology — it's in how leaders and teams think about what AI is for. Used well, AI amplifies people. Used poorly, it just shrinks them.
            </p>
          </div>
        </section>

        {/* ── 1. The mindset shift ── */}
        <Section id="shift" label="The shift" title="From replacement thinking to amplification thinking">
          <p>
            When most people first encounter AI, the question that arrives is: <em>"What jobs will this replace?"</em> That's a reasonable instinct — but it's also the question that produces the worst outcomes for individuals, teams, and businesses.
          </p>
          <p>
            The leaders getting real value from AI ask a different question: <em>"What can my people do now that they couldn't before?"</em>
          </p>
          <p>
            One question contracts. The other expands.
          </p>
        </Section>

        {/* ── 2. Human + AI Collaboration ── */}
        <Section id="collaboration" label="Collaboration" title="Human + AI is more than human, or AI, alone">
          <p>
            The strongest results consistently come from people working <strong>with</strong> AI — not handing tasks off to it, not avoiding it, but treating it like a fast, tireless collaborator that needs direction and judgement.
          </p>
          <p>The pattern looks like this:</p>
          <ul className="space-y-2.5 list-disc pl-5">
            <li><strong>AI does the heavy lifting.</strong> Drafting, summarising, structuring, calculating, searching, translating.</li>
            <li><strong>People do the directing and the judging.</strong> Choosing the problem, framing the question, sense-checking the output, deciding what to do with it.</li>
            <li><strong>Together, the throughput jumps.</strong> Not because the person works less — because they spend more time on the parts that need a human.</li>
          </ul>
        </Section>

        {/* ── 3. Value beyond cost reduction ── */}
        <Section id="value" label="Measuring value" title="Cost reduction is one measure. It isn't the only one.">
          <p>
            It's tempting to measure AI's impact by counting the hours saved. That's useful — but narrow. A leader optimising only for cost will under-invest in the gains that matter most.
          </p>
          <p>What else changes when AI is used well:</p>

          {/* Grid of value dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 not-prose">
            <ExampleTile icon="⚡" title="Faster execution" body="What used to take a week takes a day. What took a day takes an hour." />
            <ExampleTile icon="🎯" title="Sharper focus" body="People spend more time on the work only they can do — and less on the work anyone with a template could." />
            <ExampleTile icon="💡" title="More ideas" body="Exploring ten options instead of three. Testing more hypotheses. Finding better paths." />
            <ExampleTile icon="🛠️" title="Higher quality" body="AI doesn't replace craft — it removes the friction that used to stop people from caring enough to refine it." />
            <ExampleTile icon="🤝" title="Better customer experience" body="Faster responses. Personalised at scale. Fewer hand-offs. Less waiting." />
            <ExampleTile icon="🧭" title="Strategic capacity" body="When operational work compresses, leaders get back the hours they need to think about what's next." />
          </div>
        </Section>

        {/* ── 4. Practical productivity examples ── */}
        <Section id="examples" label="In practice" title="What this looks like in real work">
          <p>The mindset isn't abstract. It shows up in everyday decisions:</p>

          <div className="space-y-4 not-prose mt-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-display font-bold text-blue uppercase tracking-wider mb-2">Marketing team</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Replacement thinking:</strong> "We can lay off two copywriters and use AI for content."<br/>
                <strong className="text-gray-900">Amplification thinking:</strong> "Our copywriters now produce three times the content, in more formats, for more channels, with better personalisation."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-display font-bold text-blue uppercase tracking-wider mb-2">Operations team</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Replacement thinking:</strong> "Reduce headcount in customer service by 30%."<br/>
                <strong className="text-gray-900">Amplification thinking:</strong> "Same team, handles 3× the volume, with faster response times and higher satisfaction. The team has time for the complex cases they used to defer."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-display font-bold text-blue uppercase tracking-wider mb-2">Leadership</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Replacement thinking:</strong> "Automate reporting; reduce the analytics function."<br/>
                <strong className="text-gray-900">Amplification thinking:</strong> "Analysts spend their time on the questions that matter, not on assembling slides. Decisions get sharper. Strategy gets faster."
              </p>
            </div>
          </div>

          <p className="mt-6">
            The first column produces a one-time cost saving. The second column produces a compounding capability advantage. Different question, different outcome.
          </p>
        </Section>

        {/* ── 5. ROI calculator — framed as one tool, not THE tool ── */}
        <Section id="roi" label="One way to measure" title="Quantifying productivity gains">
          <p>
            ROI is one useful way to evaluate AI initiatives — particularly when you're presenting to a CFO or board, or comparing investments. But it captures only the hours-saved view, not the capability-gained view.
          </p>
          <p>
            We've built an ROI calculator that runs the numbers honestly: how much manual cost can be displaced, what the AI tokens actually cost, what implementation realistically takes, and what adoption rates do to the result. It's there as a sense-check, not a verdict.
          </p>

          <div className="bg-blue/5 border border-blue/20 rounded-2xl p-6 mt-6 not-prose">
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              <strong className="text-gray-900">Use the calculator to estimate cost-side ROI.</strong> Use everything above to understand the gains it can't capture.
            </p>
            <Link href="/roi-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.35)]">
              Open the ROI Calculator →
            </Link>
          </div>
        </Section>

        {/* ── Close ── */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <SectionLabel>Where to next</SectionLabel>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mt-4 mb-5 leading-tight">
              Build the mindset before you build the model.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
              Our modules walk through the practical work of bringing AI into how you actually operate — without the hype, without the fear, and with a strong respect for the people doing the work.
            </p>
            <Link href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_18px_rgba(26,110,255,0.35)]">
              Explore the Pathways →
            </Link>
          </div>
        </section>

      <Footer variant="light" />
      </main>
    </>
  )
}
