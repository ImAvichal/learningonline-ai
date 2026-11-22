import Head from 'next/head'
import Link from 'next/link'

// This resource preserves the original AI-at-Home-Parent-Guide.txt content.
// Changes to presentation must not silently remove or rewrite the source guide.
export const originalGuide = {
  dos: [
    "Try AI tools yourself — your personal experience makes every conversation better",
    "Have regular, casual conversations about AI — not one big \"talk\"",
    "Ask curious questions: \"What did you use AI for this week?\"",
    "Co-create household AI norms with your children's input",
    "Model verification habits: \"Let's check that\"",
    "Acknowledge when you don't know something about AI",
    "Protect your child's time for independent thinking and struggling with hard problems",
    "Invest in human activities, relationships, and social development",
    "Stay informed — one article about AI per week is enough",
    "Respond to AI-related boundary crossings with curiosity before judgment",
  ],
  donts: [
    "Don't lead with fear — it closes the conversation",
    "Don't ban AI without explanation — it creates workarounds and secrecy",
    "Don't assume your child's AI use is purely for avoiding work",
    "Don't use \"have you been using AI?\" as your opening question",
    "Don't accept AI as the only authority — teach verification as a family habit",
    "Don't rely solely on technical controls — relationship and conversation are more effective",
    "Don't ignore signs of emotional over-reliance on AI chatbots",
    "Don't let AI-related discipline destroy the trust needed for future conversations",
    "Don't pretend to understand AI if you don't — curiosity is better than false expertise",
    "Don't treat this as a one-time conversation — it needs to evolve as the technology does",
  ],
  ages: [
    ['Ages 8–11', '"Shall we try asking AI something together?"'],
    ['Ages 8–11', '"Did you know YouTube uses AI to choose what shows you next videos?"'],
    ['Ages 12–15', '"What do you think is the right line for using AI on homework?"'],
    ['Ages 12–15', '"Have you ever caught AI being wrong about something?"'],
    ['Ages 16+', '"What do you think AI will mean for the career you\'re thinking about?"'],
    ['Ages 16+', '"What are you most curious about — and most concerned about — with AI?"'],
    ['All ages', '"What\'s something interesting you\'ve done with AI lately?"'],
    ['All ages', '"Is there anything about AI you\'ve been wondering about?"'],
  ],
  warnings: [
    "Can't explain submitted work in their own words",
    "Strong reluctance to attempt any task without AI assistance",
    "Significant private time with AI chatbots — especially around emotional topics",
    "Accepting AI responses as facts without checking",
    "Social withdrawal or anxiety that may be related to social media algorithm effects",
    "Distress after AI content interactions",
    "Presenting AI-generated creative work as entirely their own without acknowledgment",
    "Using AI to avoid rather than enhance — a consistent pattern, not a single instance",
  ],
  weekly: [
    '"Did you use AI for anything interesting this week?"',
    '"Was there anything AI got wrong or where it wasn\'t helpful?"',
    '"Anything about AI you\'ve been curious about or want to talk about?"',
    '"Any AI-related situations that felt complicated or unclear?"',
  ],
  weeklyChecklist: [
    "Make this a casual 5-minute conversation — not a formal review",
    "Ask from curiosity, not surveillance",
    "Share something you've learned about AI yourself",
    "Let the conversation go where the child takes it",
  ],
}
function Checklist({items, tone}) {
  return <ul className="itemList">{items.map((item,i)=><li key={i}><span aria-hidden="true" className={tone==='dont'?'mark bad':'mark good'}>{tone==='dont'?'×':'✓'}</span><span>{item}</span></li>)}</ul>
}
export default function ParentGuide() {
  return <>
    <Head>
      <title>AI at Home — Parent Guide | LeO AI</title>
      <meta name="description" content="The complete AI at Home parent guide: do's, don'ts, age-based conversation starters, warning signs and weekly check-in checklist. Printable A4."/>
    </Head>
    <div className="screenTools">
      <Link href="/parents">← Back to parent lessons</Link>
      <button type="button" onClick={()=>window.print()}>Print or save as PDF</button>
    </div>
    <main className="guide" aria-label="AI at Home — Parent Guide">
      <article className="paper">
        <header><p className="eyebrow">LeO AI · learningonline.ai</p><h1>AI at Home</h1><p className="subtitle">Parent Guide</p><p className="description">A practical, keep-handy guide for everyday conversations about AI with children.</p></header>
        <section aria-labelledby="dos"><div className="sectionHead"><span className="sectionIcon green">✓</span><h2 id="dos">Do's</h2></div><Checklist items={originalGuide.dos}/></section>
        <section aria-labelledby="donts"><div className="sectionHead"><span className="sectionIcon red">×</span><h2 id="donts">Don'ts</h2></div><Checklist tone="dont" items={originalGuide.donts}/></section>
        <footer className="folio"><span>AI AT HOME · PARENT GUIDE</span><span>01 / 02</span></footer>
      </article>
      <article className="paper">
        <header className="compactHeader"><p className="eyebrow">LeO AI · learningonline.ai</p><h1>Start the conversation</h1><p className="description">Ask, listen, and keep the discussion going.</p></header>
        <section aria-labelledby="ages"><div className="sectionHead"><span className="sectionIcon blue">“</span><h2 id="ages">Conversation Starters by Age</h2></div>
          <ul className="ageList">{originalGuide.ages.map(([age,prompt],i)=><li key={i}><span className="age">{age}</span><span>{prompt}</span></li>)}</ul>
        </section>
        <section aria-labelledby="warnings"><div className="sectionHead"><span className="sectionIcon amber">!</span><h2 id="warnings">Warning Signs Worth a Conversation</h2></div>
          <ul className="simpleList">{originalGuide.warnings.map((item,i)=><li key={i}>{item}</li>)}</ul>
        </section>
        <section aria-labelledby="weekly"><div className="sectionHead"><span className="sectionIcon blue">✓</span><h2 id="weekly">Weekly Check-In Template</h2></div>
          <ol className="numbered">{originalGuide.weekly.map((item,i)=><li key={i}>{item}</li>)}</ol>
          <ul className="tickList">{originalGuide.weeklyChecklist.map((item,i)=><li key={i}><span className="emptyBox" aria-hidden="true"/>{item}</li>)}</ul>
        </section>
        <footer className="folio"><span>AI AT HOME · PARENT GUIDE</span><span>02 / 02</span></footer>
      </article>
    </main>
    <style jsx>{`
      :global(html),:global(body) { margin:0; background:#e9eef4; color:#21354a; }
      .guide { font-family:Arial,Helvetica,sans-serif; }
      .screenTools { width:min(210mm,calc(100% - 32px)); margin:18px auto; display:flex; justify-content:space-between; gap:16px; align-items:center; font:600 14px Arial,sans-serif; }
      .screenTools :global(a) { color:#165b89; text-decoration:none; }
      button { background:#155a83; color:#fff; border:0; padding:12px 18px; border-radius:8px; font-weight:700; cursor:pointer; }
      .paper { width:210mm; min-height:297mm; padding:16mm 17mm 13mm; margin:0 auto 18px; background:#fff; box-shadow:0 5px 24px #17324a24; display:flex; flex-direction:column; }
      header { padding-bottom:12px; border-bottom:3px solid #19809b; margin-bottom:14px; }
      .eyebrow { font-size:10px; text-transform:uppercase; font-weight:800; letter-spacing:2px; color:#187c95; margin:0 0 10px; }
      h1 { font-size:32px; line-height:1.08; margin:0; letter-spacing:-.8px; color:#17304b; }
      .subtitle { font-size:20px; color:#187c95; margin:2px 0 8px; font-weight:700; }
      .description { font-size:11.5px; color:#516779; margin:8px 0 0; line-height:1.45; }
      .compactHeader { padding-bottom:10px; margin-bottom:10px; }
      .compactHeader h1 { font-size:27px; }
      section { margin:0 0 17px; break-inside:avoid; }
      .sectionHead { display:flex; align-items:center; gap:9px; margin:0 0 7px; }
      .sectionIcon { display:inline-flex; width:23px; height:23px; justify-content:center; align-items:center; border-radius:6px; color:#fff; font:bold 15px Arial; flex-shrink:0; }
      .green { background:#27815f; }.red { background:#bc5c52; }.blue { background:#267b9a; }.amber { background:#ac7930; }
      h2 { font-size:16px; margin:0; color:#17304b; }
      ul,ol { margin:0; padding:0; }
      .itemList,.ageList,.simpleList,.tickList { list-style:none; }
      .itemList li { display:flex; gap:9px; align-items:flex-start; font-size:11.4px; line-height:1.38; padding:4px 8px; border-bottom:1px solid #edf1f4; }
      .itemList li:nth-child(odd) { background:#f7f9fa; }
      .mark { display:inline-flex; width:16px; height:16px; flex-shrink:0; justify-content:center; align-items:center; border-radius:50%; font-size:11px; margin-top:0px; font-weight:700; }
      .good { background:#e1f0e8; color:#216d50; }.bad { background:#f8e8e7; color:#a13e3b; }
      .ageList li { display:flex; gap:10px; font-size:10.7px; line-height:1.35; padding:5px 7px; border-bottom:1px solid #edf1f4; align-items:start; }
      .ageList li:nth-child(odd) { background:#f5f9fb; }
      .age { flex:0 0 66px; color:#176d8b; font-weight:700; }
      .simpleList { display:grid; grid-template-columns:1fr 1fr; gap:5px 12px; }
      .simpleList li { font-size:10.4px; line-height:1.35; padding:6px 7px 6px 18px; position:relative; background:#fff9ee; border-radius:5px; }
      .simpleList li:before { content:'•'; position:absolute; left:8px; color:#ad762d; }
      .numbered { padding-left:24px; }
      .numbered li { font-size:10.7px; line-height:1.4; padding:3px 4px; }
      .tickList { display:grid; grid-template-columns:1fr 1fr; gap:5px 12px; padding-top:8px; }
      .tickList li { display:flex; gap:7px; font-size:10.3px; line-height:1.35; }
      .emptyBox { width:12px; height:12px; border:1px solid #267b9a; border-radius:2px; flex:0 0 12px; margin-top:1px; }
      .folio { margin-top:auto; border-top:1px solid #dfe7ec; padding-top:9px; display:flex; justify-content:space-between; font-size:9px; font-weight:700; color:#718494; }
      @page { size:A4; margin:0; }
      @media print {
        :global(html),:global(body) { width:210mm; background:#fff; print-color-adjust:exact; -webkit-print-color-adjust:exact; }
        .screenTools { display:none!important; }
        .paper { box-shadow:none; margin:0; break-after:page; page-break-after:always; min-height:297mm; }
        .paper:last-child { break-after:auto; page-break-after:auto; }
      }
      @media screen and (max-width:800px) {
        .screenTools { flex-wrap:wrap; }
        .paper { width:100%; min-height:0; padding:24px 18px; }
        .simpleList,.tickList { grid-template-columns:1fr; }
        .age { flex-basis:75px; }
      }
    `}</style>
  </>
}
