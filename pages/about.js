import Head from 'next/head'
import { Nav, Reveal, SectionLabel } from '../components/ui'
import { useAuth } from '../lib/auth'

export default function About() {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>About Us — LeO AI</title>
        <meta name="description" content="learningonline.ai is an Australian-owned AI education platform helping individuals, parents, businesses and leaders understand AI — without the hype." />
      </Head>

      <Nav user={user} />

      <main className="min-h-screen pt-24">
        {/* ── Hero ── */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <SectionLabel>About Us</SectionLabel>
              <h1 className="font-display font-bold text-4xl mb-6">
                Helping people feel more confident about AI.
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-4">
                AI is moving quickly, and for many people, that creates uncertainty, pressure, and anxiety.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                learningonline.ai was created to help individuals, parents, businesses, and leaders better understand AI in a practical and approachable way — without the hype.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Why We Exist ── */}
        <section className="py-14 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">Why We Exist</h2>
              <p className="text-muted leading-relaxed mb-4">
                Most AI education falls into two camps: highly technical content built for engineers, or sensationalised commentary designed to generate fear. Neither helps the people who actually need clarity — professionals trying to do their jobs, parents trying to guide their children, and business leaders trying to make informed decisions.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                We built learningonline.ai to fill that gap. Every module is designed to reduce AI anxiety through clarity — practical frameworks, real-world examples, and honest guidance about what AI can and cannot do.
              </p>
              <p className="text-muted leading-relaxed">
                The focus is always on helping people make informed decisions, not on selling them a future that doesn't exist yet.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Australian Owned ── */}
        <section className="py-14 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">Australian-Based and Owned</h2>
              <p className="text-muted leading-relaxed">
                learningonline.ai is proudly Australian-owned and built with a practical mindset focused on helping people and organisations adapt confidently to a changing world. Our content reflects the directness, pragmatism, and no-nonsense clarity that Australian professionals expect.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Closing ── */}
        <section className="py-14 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
                <p className="text-lg text-white/80 leading-relaxed mb-3">
                  The goal isn't to turn everyone into AI experts.
                </p>
                <p className="text-muted leading-relaxed">
                  It's to help people feel more informed, more capable, and more confident navigating what comes next.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Footer spacer ── */}
        <div className="py-10" />
      </main>
    </>
  )
}
