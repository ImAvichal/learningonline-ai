import Head from 'next/head'
import { Nav, Reveal, SectionLabel, Card } from '../components/ui'
import { useAuth } from '../lib/auth'

const STAGES = [
  {
    version: 'Version 1',
    label: 'Current Release',
    labelClass: 'bg-success/15 border-success/30 text-success',
    title: 'Starting the Journey',
    icon: '💡',
    description: 'Helping individuals, parents, businesses, and leaders understand AI practically and confidently.',
    focus: [
      'Reducing AI anxiety through clarity',
      'AI literacy — models, tokens, prompts, tools',
      'Practical implementation fundamentals',
      'Responsible AI awareness',
      'Business case and ROI frameworks',
    ],
    outcome: 'Understanding AI with confidence.',
  },
  {
    version: 'Version 2',
    label: 'Planned Evolution',
    labelClass: 'bg-blue/15 border-blue/30 text-blue-bright',
    title: 'Industry Intelligence',
    icon: '🏗️',
    description: 'Industry-specific learning pathways tailored to real operational environments and business challenges.',
    focus: [
      'Healthcare, finance, education, retail, legal',
      'Telecommunications, construction, government',
      'Industry-specific workflows and compliance',
      'Role-specific use cases and patterns',
      'Practical implementation by sector',
    ],
    outcome: 'Understanding how AI applies to your industry.',
  },
  {
    version: 'Version 3',
    label: 'Future Direction',
    labelClass: 'bg-amber-400/15 border-amber-400/30 text-amber-400',
    title: 'AI Agents at Work',
    icon: '🤖',
    description: 'Ready-to-use AI agents and operational copilots designed to support real business workflows.',
    focus: [
      'Customer support agents',
      'Reporting and document assistants',
      'Research copilots',
      'Workflow coordinators',
      'Human-guided AI execution',
    ],
    outcome: 'Working alongside AI productively.',
  },
  {
    version: 'Version 4',
    label: 'Long-Term Direction',
    labelClass: 'bg-purple-400/15 border-purple-400/30 text-purple-400',
    title: 'Agentic Organisations',
    icon: '🌐',
    description: 'Building organisations where AI agents collaborate across systems, workflows, and operational environments.',
    focus: [
      'Orchestrated AI ecosystems',
      'Multimodal and multi-agent workflows',
      'Enterprise governance and oversight',
      'AI operating models at scale',
      'Responsible autonomous operations',
    ],
    outcome: 'AI-enabled operational ecosystems.',
  },
  {
    version: 'Beyond',
    label: 'Future Exploration',
    labelClass: 'bg-white/10 border-white/20 text-white/60',
    title: 'Human + AI Orchestration',
    icon: '✨',
    description: 'Exploring adaptive ecosystems where humans and AI collaborate continuously, responsibly, and intelligently.',
    focus: [
      'Personalised AI copilots',
      'Adaptive learning environments',
      'Human-guided autonomous systems',
      'AI-assisted decision ecosystems',
      'Continuous responsible evolution',
    ],
    outcome: 'Humans and AI operating together responsibly.',
  },
]

export default function Roadmap() {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>AI Evolution Roadmap — LeO AI</title>
        <meta name="description" content="See where learningonline.ai is heading — from AI awareness to industry intelligence, AI agents, and agentic organisations." />
      </Head>

      <Nav user={user} />

      <main className="min-h-screen pt-24">
        {/* Hero */}
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <SectionLabel>Evolution</SectionLabel>
              <h1 className="font-display font-bold text-4xl mb-4">AI Evolution Roadmap</h1>
              <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto mb-2">
                AI is evolving rapidly. Our goal is to help people evolve with it — calmly, practically, and responsibly.
              </p>
              <p className="text-xs text-white/25 max-w-md mx-auto">
                This roadmap reflects our direction, not a fixed schedule. We evolve based on what practitioners actually need.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-success/40 via-blue/30 to-white/5 hidden md:block" />

              {STAGES.map((stage, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex flex-col md:flex-row gap-6 mb-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-white/10 bg-navy items-center justify-center text-lg z-10">
                      {stage.icon}
                    </div>

                    {/* Card */}
                    <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? '' : 'md:ml-auto'}`}>
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="md:hidden text-2xl">{stage.icon}</span>
                          <span className="font-display font-bold text-xs text-white/40">{stage.version}</span>
                          <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-display font-bold ${stage.labelClass}`}>
                            {stage.label}
                          </span>
                        </div>
                        <h2 className="font-display font-bold text-xl mb-2">{stage.title}</h2>
                        <p className="text-sm text-muted leading-relaxed mb-4">{stage.description}</p>
                        <div className="space-y-1.5 mb-4">
                          {stage.focus.map((f, fi) => (
                            <div key={fi} className="flex gap-2 text-xs text-white/60">
                              <span className="text-blue flex-shrink-0 mt-0.5">→</span>
                              {f}
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-white/5">
                          <p className="text-xs font-display font-bold text-white/50 italic">{stage.outcome}</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Versioning note */}
        <section className="py-14 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-4">Your Learning Evolves With Us</h2>
              <p className="text-muted leading-relaxed mb-4">
                Your enrolment includes access to the current LeO AI release cycle and all refinements released within that version family.
              </p>
              <p className="text-muted leading-relaxed">
                Major future evolution releases may be offered as optional upgrades, while your purchased content remains accessible.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="py-10" />
      </main>
    </>
  )
}
