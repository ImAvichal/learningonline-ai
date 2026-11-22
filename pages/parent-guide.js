import Head from 'next/head'
import Link from 'next/link'

const prompts = [
  'Which AI tools have you tried or seen friends use?',
  'Show me something useful or creative you made with AI.',
  'When might an AI answer sound convincing but be wrong?',
  'What is okay to use AI for in homework? What does your teacher say?',
  'What information or photos should never be uploaded?',
  'What would you do if a chatbot asked you to keep a secret?',
]
const commitments = [
  'We use age-appropriate tools and follow school and provider rules.',
  'AI can give hints and feedback; we do our own thinking and acknowledge help.',
  'We keep names, school details, passwords, private messages and other people’s images out of unapproved tools.',
  'We check important claims against reliable sources.',
  'We talk to a trusted adult if an AI conversation feels uncomfortable or unsafe.',
  'We make time for real-world friendships, learning and play.',
]
export default function ParentGuide() {
  return <>
    <Head>
      <title>Family AI Conversation & Safety Checklist | LeO AI</title>
      <meta name="description" content="A printable family conversation guide and AI safety agreement for parents and carers." />
      <meta name="robots" content="noindex" />
    </Head>
    <div className="screen-tools">
      <Link href="/parents">← Back to parent lessons</Link>
      <button type="button" onClick={() => window.print()}>Print or save as PDF</button>
    </div>
    <main className="sheet">
      <header>
        <div className="eyebrow">LeO AI · LEARNINGONLINE.AI</div>
        <h1>Our Family AI Agreement</h1>
        <p className="intro">A practical conversation guide for parents, carers and children. Print it, fill it in together and keep it somewhere handy.</p>
        <div className="meta"><span>Family: <i>________________________</i></span><span>Date: <i>________________</i></span></div>
      </header>
      <section className="conversation">
        <h2><span className="num">01</span> Six questions to ask together</h2>
        <p className="hint">Choose a relaxed moment. Listen first; there are no trick questions.</p>
        <div className="questions">{prompts.map((p,i)=><div className="question" key={i}><b>{String(i+1).padStart(2,'0')}</b><span>{p}</span></div>)}</div>
      </section>
      <section>
        <h2><span className="num">02</span> Our family checklist</h2>
        <p className="hint">Tick each item when everyone understands and agrees.</p>
        <div className="checklist">{commitments.map((p,i)=><div className="check" key={i}><span className="square"></span><span>{p}</span></div>)}</div>
      </section>
      <section className="agree">
        <h2><span className="num">03</span> Make it ours</h2>
        <div className="fill">Our school’s rules about AI: <span></span></div>
        <div className="fill">An adult I can talk to: <span></span></div>
        <div className="fill">One AI activity we will try together: <span></span></div>
        <div className="fill">We will review our agreement on: <span></span></div>
      </section>
      <footer><strong>Remember:</strong> AI is a tool, not a replacement for your own thinking or trusted people. Check age requirements and school rules. For immediate danger in Australia, call 000.<div className="bottom"><span>learningonline.ai/parents</span><span>Reviewed 23 Nov 2026 · Family resource, not school-endorsed</span></div></footer>
    </main>
    <style jsx>{`
      * { box-sizing:border-box }
      :global(body) { margin:0; background:#e9eef5; color:#18304b; font-family:Arial,Helvetica,sans-serif }
      .screen-tools { max-width:210mm; margin:18px auto; display:flex; justify-content:space-between; align-items:center; font-size:14px }
      .screen-tools :global(a) { color:#164c80; text-decoration:none; font-weight:bold }
      button { background:#134b79; color:white; border:0; padding:12px 18px; border-radius:8px; font-weight:700; cursor:pointer }
      .sheet { width:210mm; min-height:297mm; margin:0 auto 24px; padding:16mm 17mm 13mm; background:#fff; box-shadow:0 8px 35px #172e4420 }
      header { border-bottom:3px solid #2a7c91; padding-bottom:14px }
      .eyebrow { font-size:10px; letter-spacing:2px; color:#2a7c91; font-weight:800 }
      h1 { font-size:30px; letter-spacing:-1px; margin:10px 0 8px }
      .intro { font-size:12.5px; line-height:1.5; max-width:95%; margin:0 0 15px; color:#40566b }
      .meta { display:flex; justify-content:space-between; font-size:12px; font-weight:700 }
      i { font-style:normal; color:#aab5bf }
      section { margin-top:17px; break-inside:avoid }
      h2 { font-size:16px; margin:0 0 5px; display:flex; align-items:center; gap:9px }
      .num { color:#fff; background:#26788e; font-size:10px; padding:7px; border-radius:7px }
      .hint { color:#52677b; font-size:11px; margin:5px 0 10px }
      .questions { display:grid; grid-template-columns:1fr 1fr; gap:7px }
      .question { display:flex; gap:9px; background:#eff6f8; padding:10px; border-radius:8px; font-size:11.5px; line-height:1.35; min-height:54px }
      .question b { color:#257a8f }
      .checklist { display:grid; grid-template-columns:1fr 1fr; gap:8px 14px }
      .check { display:flex; gap:8px; font-size:11px; line-height:1.4; min-height:48px; align-items:flex-start }
      .square { width:14px; height:14px; border:1.5px solid #26788e; flex-shrink:0; border-radius:3px; margin-top:1px }
      .agree { background:#f5f8fb; border-radius:10px; padding:12px 15px }
      .fill { display:flex; align-items:flex-end; gap:10px; font-size:11px; margin-top:13px }
      .fill span { flex:1; border-bottom:1px solid #9babb9; min-height:13px }
      footer { border-top:1px solid #cbd8e2; margin-top:18px; padding-top:10px; font-size:10px; line-height:1.45; color:#51667a }
      .bottom { display:flex; justify-content:space-between; font-size:9px; color:#70869a; margin-top:12px }
      @page { size:A4; margin:0 }
      @media print {
        :global(html), :global(body) { width:210mm; height:297mm; background:white; print-color-adjust:exact; -webkit-print-color-adjust:exact }
        .screen-tools { display:none }
        .sheet { margin:0; box-shadow:none; min-height:297mm; page-break-after:avoid }
      }
      @media screen and (max-width:820px) {
        .screen-tools { padding:0 14px }
        .sheet { width:100%; min-height:0; padding:24px 18px }
        .questions,.checklist { grid-template-columns:1fr }
        .meta,.bottom { gap:8px; flex-wrap:wrap }
      }
    `}</style>
  </>
}
