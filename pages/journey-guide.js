import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import NoEnrolmentMessage from '../components/NoEnrolmentMessage'
import { JOURNEY_PRACTICE, JOURNEY_MODULE_IDS } from '../data/journey-practice'
import { MODULES } from '../data/modules'

// Printable companion for existing paid Starting the Journey learners.
// Keep it derived from the same practice activities shown in the course player.
export default function JourneyGuide() {
  const { user, loading } = useAuth()
  const allowed = user && (user.isDevUser || user.tier === 'journey' || user.tier === 'pro')
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading your learning resources…</div>
  if (!allowed) return <NoEnrolmentMessage context="course" />

  return (
    <>
      <Head>
        <title>Starting the Journey — Practical Workbook | LeO AI</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Printable practice activities for the ten Starting the Journey modules." />
      </Head>
      <div className="screenTools">
        <Link href="/dashboard#course">← Back to course</Link>
        <button type="button" onClick={() => window.print()}>Print or save as PDF</button>
      </div>
      <main className="workbook">
        <header className="cover">
          <div className="eyebrow">LeO AI / Practical learning series</div>
          <h1>Starting the Journey</h1>
          <p className="subtitle">Your practical AI workbook</p>
          <p className="intro">Ten applied exercises that turn the course concepts into decisions, test cases and work products. Use fictional or authorised data only.</p>
          <div className="pillRow">
            <span>10 modules</span><span>Self-paced</span><span>Printable A4</span><span>No personal data required</span>
          </div>
          <p className="instructions">How to use: complete one exercise after its module, capture the evidence listed, and revisit the reflection question before moving forward. These are optional activities; your lesson completion is still saved in the course.</p>
        </header>
        <div className="moduleGrid">
          {JOURNEY_MODULE_IDS.map((id, idx) => {
            const exercise = JOURNEY_PRACTICE[id]
            const module = MODULES.find(m => m.id === id)
            return <article className="exercise" key={id}>
              <div className="moduleEyebrow">MODULE {String(module?.number || idx+1).padStart(2,'0')} <span>· {exercise.time}</span></div>
              <h2>{module?.title}</h2>
              <h3>{exercise.title}</h3>
              <p className="objective">{exercise.objective}</p>
              <ol>{exercise.steps.map((step,i) => <li key={i}>{step}</li>)}</ol>
              <div className="evidence"><strong>Produce</strong> {exercise.evidence}</div>
              <div className="reflection"><strong>Reflect</strong> {exercise.reflection}</div>
              <div className="responseArea" aria-label="Notes space">Notes / decisions: <span>____________________________________________________________</span></div>
            </article>
          })}
        </div>
        <footer className="guideFooter">LeO AI · Starting the Journey · Practical Workbook · learningonline.ai</footer>
      </main>
      <style jsx>{`
        .screenTools { max-width:1000px; margin:28px auto 14px; padding:0 22px; display:flex; align-items:center; justify-content:space-between; gap:16px; font:600 14px Arial,sans-serif; }
        .screenTools :global(a) { color:#1267b6; text-decoration:none; }
        .screenTools button { color:white; background:#1a6eff; border:0; border-radius:10px; padding:12px 18px; font-weight:700; cursor:pointer; }
        .workbook { box-sizing:border-box; max-width:1000px; margin:0 auto 50px; padding:32px; color:#142440; background:white; border:1px solid #e1e6ef; box-shadow:0 8px 35px #122b4b12; }
        .cover { border-bottom:3px solid #1a6eff; padding-bottom:18px; margin-bottom:23px; }
        .eyebrow,.moduleEyebrow { font-size:11px; font-weight:800; letter-spacing:1.7px; text-transform:uppercase; color:#1a6eff; }
        h1 { font-size:35px; font-weight:800; letter-spacing:-.7px; line-height:1.15; margin:9px 0 0; }
        .subtitle { color:#2675ba; font-size:20px; font-weight:700; margin:5px 0 13px; }
        .intro,.instructions { font-size:13px; line-height:1.6; max-width:750px; color:#44546b; }
        .instructions { margin:14px 0 0; }
        .pillRow { display:flex; gap:8px; flex-wrap:wrap; margin-top:17px; }
        .pillRow span { border-radius:100px; background:#e9f2ff; color:#1763a7; padding:6px 10px; font-size:11px; font-weight:700; }
        .moduleGrid { display:grid; grid-template-columns:1fr 1fr; gap:18px; align-items:start; }
        .exercise { box-sizing:border-box; border:1px solid #dfe6ee; border-radius:12px; padding:18px 19px; break-inside:avoid; page-break-inside:avoid; }
        .moduleEyebrow span { color:#778399; letter-spacing:0; }
        h2 { margin:9px 0 1px; font-size:16px; font-weight:800; }
        h3 { margin:4px 0 8px; color:#125aa4; font-size:14px; font-weight:700; }
        .objective { color:#495770; font-size:12px; line-height:1.5; margin:0 0 10px; }
        ol { padding-left:20px; margin:0 0 14px; }
        li { font-size:11.5px; line-height:1.48; margin:0 0 6px; }
        .evidence,.reflection { font-size:11.5px; line-height:1.5; padding:9px 10px; border-radius:7px; margin-top:8px; }
        .evidence { background:#ecf7f1; color:#224d38; }
        .reflection { background:#eef4ff; color:#244b7d; }
        .evidence strong,.reflection strong { display:block; font-size:10px; text-transform:uppercase; letter-spacing:.7px; margin-bottom:3px; }
        .responseArea { border-top:1px dashed #c9d4df; margin-top:13px; padding-top:8px; color:#637287; font-size:10px; }
        .responseArea span { display:block; padding:10px 0 0; color:#cad3de; overflow:hidden; }
        .guideFooter { margin-top:24px; padding-top:10px; border-top:1px solid #dde5ed; font-size:10px; color:#728095; text-align:center; }
        @page { size:A4; margin:12mm; }
        @media print {
          :global(html),:global(body) { background:white!important; print-color-adjust:exact; -webkit-print-color-adjust:exact; }
          .screenTools { display:none!important; }
          .workbook { max-width:none; width:auto; box-shadow:none; border:none; padding:0; margin:0; }
          .cover { break-after:avoid; }
          .moduleGrid { grid-template-columns:1fr 1fr; gap:10mm 6mm; }
          .exercise { border-radius:8px; padding:10px; }
          .exercise li { font-size:10px; }
          .exercise .objective { font-size:10.5px; }
          .responseArea { display:none; }
        }
        @media screen and (max-width:750px) {
          .workbook { padding:22px 15px; }
          h1 { font-size:27px; }
          .moduleGrid { grid-template-columns:1fr; }
          .screenTools { flex-wrap:wrap; }
        }
      `}</style>
    </>
  )
}
