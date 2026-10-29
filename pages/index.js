import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import { Nav } from '../components/ui'
import { MODULES } from '../data/modules'
import { BookOpen, Sparkles, ShieldCheck, ArrowRight, BriefcaseBusiness, Clock3, Compass } from 'lucide-react'

const pathways = [
  { label: 'Start here', title: 'AI foundations', description: 'Understand what AI can do, where it struggles and how to get useful results.', href: '/preview', action: 'Try a free lesson', icon: BookOpen, tag: 'Free preview · no signup' },
  { label: 'For families', title: 'Parents & caregivers', description: 'Support young people to use AI thoughtfully, safely and confidently.', href: '/parents', action: 'Explore free learning', icon: ShieldCheck, tag: 'Free learning' },
  { label: 'For professionals', title: 'Put AI to work', description: 'Move from understanding AI to designing workflows, measuring value and managing risk.', href: '/pricing', action: 'Explore learning options', icon: Compass, tag: 'Professional pathways' },
]

const steps = [
  { number: '01', title: 'Find your starting point', description: 'Explore the curriculum and choose a topic that matters to you.' },
  { number: '02', title: 'Learn by doing', description: 'Use practical examples and short, focused lessons to build capability.' },
  { number: '03', title: 'Keep improving', description: 'Return to strengthen your skills as tools and good practice evolve.' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>LeO AI — Learn AI. Use it confidently. Stay current.</title>
        <meta name="description" content="Practical AI learning for life and work. Explore a free AI lesson, learn about AI safety and discover structured professional pathways." />
        <link rel="canonical" href="https://www.learningonline.ai/" />
      </Head>
      <Nav />
      <main className="leo-readable bg-navy text-white min-h-screen">
        <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
          <div className="absolute -top-24 right-[-15%] h-[500px] w-[500px] rounded-full bg-blue/15 blur-[110px] pointer-events-none" />
          <div className="absolute bottom-[-150px] left-[-10%] h-[350px] w-[350px] rounded-full bg-blue/10 blur-[100px] pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-2 text-xs font-display font-bold text-blue-bright tracking-wide mb-8">
                <Sparkles size={14} /> Practical AI learning, built for real life
              </span>
              <h1 className="font-display font-black tracking-tight leading-[1.07] text-5xl sm:text-6xl lg:text-7xl mb-7">
                AI is changing fast.<br /><span className="text-blue-bright">You can keep up.</span>
              </h1>
              <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/65 mb-10">
                Learn what matters, practise with real examples and build confidence using AI at home and at work. Clear explanations, useful skills and learning that evolves.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/preview" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue hover:bg-blue-bright px-7 py-4 font-display font-bold text-white transition-colors">
                  Try a free lesson <ArrowRight size={18} />
                </Link>
                <Link href="#pathways" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] px-7 py-4 font-display font-bold text-white transition-colors">
                  Explore learning paths
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/45">No card required for the free lesson. Professional courses have separate access options.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] py-8">
          <div className="max-w-6xl mx-auto px-6 grid gap-6 sm:grid-cols-3">
            {[['Clear, not complicated','Learn in plain English, without needing a technical background.'],['Practical by design','Understand how to apply AI, not just the terminology.'],['Responsible by default','Learn about privacy, accuracy and human judgement alongside the tools.']].map(([title,description])=>(
              <div key={title} className="flex gap-3"><span className="mt-1 text-blue-bright">✦</span><div><h2 className="font-display font-bold text-sm mb-1">{title}</h2><p className="text-sm text-white/55 leading-relaxed">{description}</p></div></div>
            ))}
          </div>
        </section>

        <section id="pathways" className="py-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-blue-bright mb-4">Choose your path</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
              <h2 className="font-display font-black text-3xl sm:text-5xl max-w-2xl leading-tight">A better way to start learning AI.</h2>
              <p className="text-white/55 max-w-sm text-sm leading-relaxed">Start with a free experience or explore more structured learning for work.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {pathways.map(({label,title,description,href,action,icon:Icon,tag})=>(
                <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 flex flex-col hover:border-blue/40 transition-colors">
                  <div className="flex items-center justify-between mb-8"><span className="rounded-xl bg-blue/15 p-3 text-blue-bright"><Icon size={24}/></span><span className="text-[11px] text-white/50">{tag}</span></div>
                  <p className="text-xs uppercase tracking-widest font-bold text-blue-bright mb-3">{label}</p>
                  <h3 className="font-display font-bold text-2xl mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-9 flex-1">{description}</p>
                  <Link href={href} className="inline-flex items-center gap-2 font-display font-bold text-sm text-white hover:text-blue-bright">{action}<ArrowRight size={16}/></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10 bg-navy-mid">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div><p className="text-blue-bright font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">Learn with purpose</p><h2 className="font-display font-black text-3xl sm:text-5xl leading-tight mb-6">Less hype.<br/>More useful skills.</h2><p className="text-white/60 leading-relaxed mb-7">AI is more than a list of tools. Our curriculum connects foundations, real-world use cases, responsible decisions and practical delivery.</p><Link href="/pricing" className="inline-flex items-center gap-2 font-bold text-blue-bright hover:text-white">See the curriculum <ArrowRight size={17}/></Link></div>
            <div className="grid gap-3">
              {steps.map(step=><div key={step.number} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 flex gap-5"><span className="text-blue-bright font-display font-black text-2xl">{step.number}</span><div><h3 className="font-display font-bold mb-1">{step.title}</h3><p className="text-white/55 text-sm leading-relaxed">{step.description}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-10"><div><p className="text-blue-bright font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">Inside the curriculum</p><h2 className="font-display font-black text-3xl sm:text-4xl">Explore what you can learn.</h2></div><Link href="/pricing" className="text-sm font-bold text-blue-bright inline-flex items-center gap-2">View learning options <ArrowRight size={16}/></Link></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{MODULES.slice(0,4).map((mod,i)=><div key={mod.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-6"><div className="flex items-center justify-between mb-5"><BookOpen size={19} className="text-blue-bright"/><span className="text-white/35 text-xs">0{i+1}</span></div><h3 className="font-display font-bold text-base mb-3">{mod.title}</h3><p className="text-white/50 text-sm leading-relaxed">{mod.description}</p></div>)}</div>
          </div>
        </section>

        <section className="py-20 bg-blue/10 border-y border-blue/20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-blue-bright text-xs uppercase tracking-widest font-bold mb-4"><BriefcaseBusiness size={16}/> For teams and organisations</span><h2 className="font-display font-black text-3xl mb-3">Help your team turn AI into capability.</h2><p className="text-white/60 leading-relaxed">Explore practical team learning, responsible AI and tailored workshops. Tell us what your organisation is trying to achieve.</p></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white text-navy px-7 py-4 font-display font-bold hover:bg-white/90">Enquire about team learning <ArrowRight size={18}/></Link>
          </div>
        </section>

        <section className="py-24 text-center"><div className="max-w-2xl mx-auto px-6"><Clock3 className="text-blue-bright mx-auto mb-5" size={28}/><h2 className="font-display font-black text-3xl sm:text-4xl mb-4">Your AI learning starts here.</h2><p className="text-white/60 mb-8">Explore a lesson without committing to a course. See whether our practical approach works for you.</p><Link href="/preview" className="inline-flex items-center gap-2 rounded-xl bg-blue hover:bg-blue-bright px-8 py-4 font-display font-bold">Explore the free lesson <ArrowRight size={18}/></Link></div></section>
      </main>
      <style jsx global>{`
        .leo-readable { font-size: 17px; }
        .leo-readable p { line-height: 1.8; }
        .leo-readable .text-white\\/45,
        .leo-readable .text-white\\/50,
        .leo-readable .text-white\\/55,
        .leo-readable .text-white\\/60,
        .leo-readable .text-white\\/65 { color: #d1daed; }
        .leo-readable .text-sm { font-size: 1rem; line-height: 1.75; }
        .leo-readable .text-xs { font-size: .85rem; line-height: 1.5; }
        .leo-readable h1, .leo-readable h2, .leo-readable h3 { letter-spacing: -0.025em; }
        .leo-readable a:focus-visible { outline: 3px solid #8ab7ff; outline-offset: 4px; }
        @media (max-width: 640px) {
          .leo-readable { font-size: 16px; }
          .leo-readable h1 { line-height: 1.15; }
          .leo-readable section { scroll-margin-top: 5rem; }
        }
      `}</style>
      <Footer variant="dark" />
    </>
  )
}
