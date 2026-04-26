// data/modules.js — full course curriculum
// Add lessons here. Pages import this file — never hardcode content in components.
// tier: 'individual' | 'smb' | 'enterprise'

export const MODULES = [
  {
    id:'module-1', number:1, icon:'🎯',
    title:'The Reality of AI',
    description:'Cut through the hype. Understand what AI actually is, why pilots fail, and how to set your program up to succeed.',
    deliverable:'AI Readiness Snapshot', templateId:'ai-readiness',
    lessons:[
      {
        id:'m1-l1', number:1, tier:'individual', duration:'18 min',
        title:'Why AI Pilots Fail (And How to Avoid It)',
        content:`<h2>Why AI Pilots Fail</h2>
<p>The enterprise AI failure rate exceeds <strong>85%</strong>. These failures share the same root cause: AI is treated as a technology project, not a workflow transformation.</p>
<h3>The 5 Failure Modes</h3>
<p><strong>1. AI sits outside the workflow.</strong> The tool exists in a silo. Staff use it occasionally then return to their normal process. No integration = no sustained impact.</p>
<p><strong>2. No clear problem definition.</strong> Teams choose AI based on excitement, not pain. Without a specific measurable problem, success is impossible to define.</p>
<p><strong>3. ROI never measured.</strong> Without baseline metrics before launch, you cannot prove value. Funding dries up.</p>
<p><strong>4. Governance arrives too late.</strong> Risk and compliance are retrofitted after build — causing costly rework and loss of trust.</p>
<p><strong>5. Change management ignored.</strong> The technology works. The people don't adopt it. Without champions, training, and incentives, adoption stalls.</p>
<blockquote><p>The problem is never the AI. The problem is always the process around the AI.</p></blockquote>`,
      },
      {
        id:'m1-l2', number:2, tier:'individual', duration:'22 min',
        title:"AI vs Automation vs Agents: What You're Actually Buying",
        content:`<h2>Three Categories, One Decision</h2>
<p>These terms are used interchangeably in vendor pitches — incorrectly. The distinction determines your architecture, cost, and risk profile.</p>
<h3>Traditional Automation (RPA)</h3>
<p>Rule-based execution of structured, repetitive tasks. Brittle — breaks when inputs change. Best for: data entry, form routing, invoice processing.</p>
<h3>AI / Machine Learning</h3>
<p>Pattern recognition and prediction trained on data. Probabilistic, not deterministic. Best for: classification, summarisation, anomaly detection, prediction.</p>
<h3>AI Agents</h3>
<p>Autonomous systems that reason, plan, and take sequential actions. Emerging — requires careful guardrails. Best for: complex multi-step tasks requiring judgment and tool use.</p>
<blockquote><p><strong>Rule:</strong> Start with the simplest solution that solves the problem. Over-engineering is the second most common failure mode.</p></blockquote>`,
      },
      {
        id:'m1-l3', number:3, tier:'individual', duration:'15 min',
        title:'The Workflow Gap: Where AI Value Lives',
        content:`<h2>The Workflow Gap</h2>
<p>Every business process follows this structure:</p>
<pre>INPUT → [HUMAN WORK] → DECISION → ACTION → OUTPUT</pre>
<p>The <strong>workflow gap</strong> is the human work in the middle — reading, classifying, summarising, routing, calculating. This is where AI creates value by reducing time and improving consistency.</p>
<h3>Example: Customer Support Ticket</h3>
<p><strong>Without AI:</strong> Email arrives → Agent reads full history (10–15 min) → Agent classifies → Agent responds</p>
<p><strong>With AI:</strong> Email arrives → AI summarises history + suggests category + drafts response → Agent reviews (2 min) → Agent approves</p>
<p>The AI didn't replace the human. It collapsed the time in the gap from 15 minutes to 2 minutes.</p>`,
      },
      {
        id:'m1-l4', number:4, tier:'smb', duration:'20 min',
        title:'[Business] AI Readiness for Growing Businesses',
        content:`<h2>AI Readiness for Growing Businesses</h2>
<p>Growing businesses face specific AI challenges: limited IT resources, mixed data quality, multi-role staff, and tight ROI timelines.</p>
<h3>The Business Readiness Checklist</h3>
<p><strong>Data availability:</strong> Do you have 6+ months of structured operational data? If not, data collection is step one.</p>
<p><strong>Process documentation:</strong> Are your core processes written down? AI can't automate what isn't defined.</p>
<p><strong>Tool stack:</strong> What CRM, ERP, or support tools do you use? AI integrates via API — your existing tools matter.</p>
<p><strong>Champion:</strong> Who will own AI in your business? Without a champion, initiatives stall.</p>
<h3>Quick Wins vs Infrastructure Plays</h3>
<p>Start with <strong>quick wins</strong> — use cases deliverable in under 8 weeks that don't require new infrastructure. Save orchestration and model training for year two.</p>`,
      },
      {
        id:'m1-l5', number:5, tier:'enterprise', duration:'25 min',
        title:'[Enterprise] AI Maturity Model & Organisational Assessment',
        content:`<h2>Enterprise AI Maturity</h2>
<p>Enterprise AI programs fail at scale for reasons that don't affect smaller implementations: organisational fragmentation, data silos, governance gaps, and competing priorities.</p>
<h3>The 5-Level Maturity Model</h3>
<p><strong>Level 1 — Experimental:</strong> Ad-hoc pilots. No shared standards. No measurement.</p>
<p><strong>Level 2 — Emerging:</strong> Some use cases in production. Informal governance. Siloed learnings.</p>
<p><strong>Level 3 — Scaling:</strong> Defined AI strategy. Shared infrastructure. Programme-level governance.</p>
<p><strong>Level 4 — Embedded:</strong> AI integrated into core processes. Centre of Excellence operational. ROI reported at board level.</p>
<p><strong>Level 5 — Leading:</strong> AI as competitive moat. Real-time learning loops. Predictive and generative AI across all functions.</p>
<h3>Assessment Dimensions</h3>
<ul><li>Data readiness and governance</li><li>Technology infrastructure and integration capability</li><li>Talent and capability (internal vs partner)</li><li>Leadership alignment and investment appetite</li><li>Risk and compliance posture</li></ul>`,
      },
    ],
  },
  {
    id:'module-2', number:2, icon:'🔍',
    title:'Identifying High-Value Use Cases',
    description:'Systematically find, score, and prioritise AI opportunities — and build a business-case-ready shortlist.',
    deliverable:'Top 3 AI Opportunities', templateId:'use-case-scoring',
    lessons:[
      {
        id:'m2-l1', number:1, tier:'individual', duration:'20 min',
        title:'The Use Case Scoring Matrix',
        content:`<h2>Scoring AI Opportunities Objectively</h2>
<p>The scoring matrix removes subjectivity. Every opportunity is scored on four dimensions, producing a comparable priority score.</p>
<h3>The 4 Dimensions</h3>
<p><strong>Business Value (1–5):</strong> 1 = individual time saving. 5 = direct revenue, cost, or retention impact.</p>
<p><strong>Implementation Complexity (1–5, inverted):</strong> 1 = new systems + regulatory approval. 5 = existing data, clean API, ready today.</p>
<p><strong>Data Availability (1–5):</strong> 1 = no relevant data. 5 = clean, labelled, accessible data ready now.</p>
<p><strong>Team Readiness (1–5):</strong> 1 = resistant team, no capability. 5 = engaged, sponsor exists.</p>
<pre>Priority Score = (Business Value × 2) + Data Availability + Team Readiness - Implementation Complexity</pre>`,
      },
      {
        id:'m2-l2', number:2, tier:'individual', duration:'17 min',
        title:'The Time Audit Method',
        content:`<h2>Finding Manual Effort</h2>
<p>The fastest path to AI opportunities is to follow the time. Manual effort is cost — and cost is your AI target.</p>
<h3>Ideal AI Use Case Characteristics</h3>
<ul>
<li>✅ High volume — performed frequently</li>
<li>✅ Repetitive — similar inputs, similar outputs</li>
<li>✅ Language or data processing involved</li>
<li>✅ Clear definition of a correct output</li>
<li>❌ Requires deep contextual judgment every time</li>
<li>❌ Safety-critical without human oversight</li>
</ul>`,
      },
      {
        id:'m2-l3', number:3, tier:'smb', duration:'22 min',
        title:'[Business] Use Case Playbooks by Function',
        content:`<h2>Business Use Case Playbooks</h2>
<h3>Customer Service</h3>
<p><strong>Ticket triage and routing:</strong> AI classifies by type, urgency, and skill. Typical time saving: 40–60% of triage effort.</p>
<p><strong>Response drafting:</strong> AI drafts first-pass responses for agent review. Handle time reduction: 30–45%.</p>
<h3>Operations</h3>
<p><strong>Reporting automation:</strong> AI compiles weekly operational reports from source systems. Analyst time reduction: 80–90%.</p>
<h3>Sales</h3>
<p><strong>Lead qualification:</strong> AI scores inbound leads against historical conversion patterns.</p>
<p><strong>Proposal generation:</strong> AI drafts proposal content from a brief. Time reduction: 50–70%.</p>`,
      },
      {
        id:'m2-l4', number:4, tier:'enterprise', duration:'28 min',
        title:'[Enterprise] Portfolio Prioritisation & Investment Sequencing',
        content:`<h2>Enterprise AI Portfolio Management</h2>
<p>Enterprise AI programs require portfolio thinking — not individual use case selection.</p>
<h3>The Three Investment Horizons</h3>
<p><strong>Horizon 1 (0–6 months):</strong> Quick wins. High value, low complexity. Prove ROI, build confidence, establish baseline governance.</p>
<p><strong>Horizon 2 (6–18 months):</strong> Scale. Connect use cases to shared infrastructure. Build reusable components.</p>
<p><strong>Horizon 3 (18+ months):</strong> Transform. Strategic capabilities that redefine competitive position.</p>
<h3>Sequencing Principles</h3>
<ul><li>Never start with Horizon 3 — foundations don't exist yet</li><li>Every H1 win must generate reusable infrastructure for H2</li><li>Governance design precedes each new use case, not follows it</li><li>Measure everything from day one</li></ul>`,
      },
    ],
  },
  {
    id:'module-3', number:3, icon:'⚡',
    title:'Workflow Design',
    description:'Design the human + AI workflow before touching a single tool. The blueprint that prevents expensive rebuilds.',
    deliverable:'AI Workflow Blueprint', templateId:'workflow-design',
    lessons:[
      {
        id:'m3-l1', number:1, tier:'individual', duration:'25 min',
        title:'Workflow Design Principles',
        content:`<h2>Design Before You Build</h2>
<p>The most expensive AI mistake is building before designing.</p>
<h3>The 3 Principles</h3>
<p><strong>1. Human-in-the-Loop is Default.</strong> For any consequential decision, a human must review AI output before action. Design this explicitly.</p>
<p><strong>2. Design the Future State First.</strong> Before asking "how do we implement this?", ask "what does the ideal process look like?" Map the future state, then work backwards.</p>
<p><strong>3. Failure Mode Design.</strong> For every AI step, define what happens when it fails: fallback to human, alert and escalate, or confidence gate.</p>
<h3>The 5 Human-AI Interaction Patterns</h3>
<p><strong>AI Reads → Human Acts:</strong> Summarisation, briefing. Human retains decision authority.</p>
<p><strong>AI Classifies → Human Routes:</strong> Triage, categorisation. Human validates before action.</p>
<p><strong>AI Drafts → Human Edits:</strong> Content generation. Human owns the output.</p>
<p><strong>AI Alerts → Human Investigates:</strong> Anomaly detection. Human investigates causes.</p>
<p><strong>AI Decides → Human Monitors:</strong> Autonomous routing within guardrails. Human reviews aggregate outcomes.</p>`,
      },
      {
        id:'m3-l2', number:2, tier:'smb', duration:'20 min',
        title:'[Business] Workflow Design for Small Teams',
        content:`<h2>Workflow Design in Small Teams</h2>
<h3>The Business Design Process</h3>
<p><strong>Step 1: Shadow, don't survey.</strong> Sit with staff and observe the actual process. What people say they do and what they do are often different.</p>
<p><strong>Step 2: Map the current state honestly.</strong> Document every step including the workarounds — the spreadsheet bridging two systems, the Slack message triggering the next step.</p>
<p><strong>Step 3: Identify the one bottleneck.</strong> In small teams, one step usually accounts for 60%+ of delay. Focus AI here first.</p>
<p><strong>Step 4: Design the minimum viable AI workflow.</strong> The smallest change that delivers the biggest improvement.</p>`,
      },
      {
        id:'m3-l3', number:3, tier:'enterprise', duration:'30 min',
        title:'[Enterprise] The AI Operating Model',
        content:`<h2>The Enterprise AI Operating Model</h2>
<p>At enterprise scale, individual workflow design must be subordinate to an operating model — shared principles, infrastructure, and governance across all AI implementations.</p>
<h3>The Four Layers</h3>
<p><strong>Layer 1 — Frontend Experience:</strong> Consistency standards, trust signals, guardrails, personalisation rules. Who owns the AI user experience across the enterprise?</p>
<p><strong>Layer 2 — Orchestration:</strong> Multi-model strategy — which model for which task. Tool integration patterns. Routing logic. Fallback design.</p>
<p><strong>Layer 3 — Backend Governance:</strong> Knowledge management, prompt governance, dataset management, monitoring, ethics and compliance.</p>
<p><strong>Layer 4 — Command Centre:</strong> Real-time visibility into AI performance, cost, accuracy, and risk. Operational oversight. Incident response.</p>`,
      },
    ],
  },
  {
    id:'module-4', number:4, icon:'🔧',
    title:'Tools & Infrastructure',
    description:'Select the right tools, design your integration architecture, and avoid the most expensive decisions in AI.',
    deliverable:'AI Architecture Decision', templateId:'architecture-decision',
    lessons:[
      {
        id:'m4-l1', number:1, tier:'individual', duration:'28 min',
        title:'Build vs Buy vs Configure',
        content:`<h2>The Tool Selection Decision</h2>
<p><strong>Buy:</strong> When the use case is common, speed matters (&lt;90 days), and you lack ML engineering. Gets to value fastest.</p>
<p><strong>Build:</strong> When your use case is unique, your data is proprietary, or volume justifies engineering investment. Takes months.</p>
<p><strong>Configure:</strong> When you're in a platform ecosystem (Microsoft, Salesforce, ServiceNow) and the use case fits its scope.</p>
<h3>The 2025 AI Tool Landscape</h3>
<p><strong>Foundation Models:</strong> OpenAI GPT-4o · Anthropic Claude 3.5 · Google Gemini 1.5 · Azure OpenAI</p>
<p><strong>Workflow Automation:</strong> Microsoft Power Automate · n8n (open source) · Zapier · Make</p>
<p><strong>Enterprise Platforms:</strong> Microsoft Copilot Studio · Salesforce Agentforce · ServiceNow AI</p>
<blockquote><p>Start with Azure OpenAI or AWS Bedrock for data privacy. Use Power Automate for workflow integration to stay within your existing governance perimeter.</p></blockquote>`,
      },
      {
        id:'m4-l2', number:2, tier:'smb', duration:'22 min',
        title:'[Business] Tool Stack Recommendations',
        content:`<h2>Recommended AI Tool Stack</h2>
<h3>Tier 1: Start Here (Month 1–3)</h3>
<p><strong>Claude or GPT-4o via API:</strong> Summarisation, drafting, classification. AUD ~$50–200/month at typical business volumes.</p>
<p><strong>Make or n8n:</strong> No-code workflow automation. Connects your tools to AI without engineering. AUD ~$30–100/month.</p>
<p><strong>Your existing CRM/Helpdesk:</strong> Integrate AI at the tool level — don't replace your CRM. Extend it.</p>
<h3>Tier 2: Scale (Month 4–12)</h3>
<p><strong>Vector database (Pinecone free tier or Chroma):</strong> Build AI that knows your business context — products, policies, history.</p>
<p><strong>Power Automate:</strong> If you're Microsoft 365 users. Native AI Builder integration included.</p>`,
      },
      {
        id:'m4-l3', number:3, tier:'enterprise', duration:'35 min',
        title:'[Enterprise] Multi-Model Orchestration Architecture',
        content:`<h2>Enterprise AI Architecture</h2>
<p>Enterprise AI is not a single model — it's an orchestration system routing tasks to appropriate models, managing context, enforcing governance, and providing unified observability.</p>
<h3>Multi-Model Strategy</h3>
<p>A mature enterprise uses 3–5 models: a frontier model (GPT-4o, Claude 3.5) for complex reasoning; a fast model (GPT-4o-mini, Claude Haiku) for high-volume classification; specialist models for domain tasks; an embedding model for RAG; a fine-tuned model for proprietary use cases.</p>
<h3>The API Gateway Pattern</h3>
<p>All AI calls route through a central gateway enabling: unified authentication, cost tracking, rate limiting, model switching, and logging.</p>
<h3>RAG Architecture</h3>
<p>Retrieval-Augmented Generation: document ingestion pipeline → vector store → retrieval logic → response generation. Lets AI answer questions using your company knowledge base.</p>`,
      },
    ],
  },
  {
    id:'module-5', number:5, icon:'🏗️',
    title:'Building Your Use Cases',
    description:'Build the three most impactful enterprise AI use cases: summarisation, triage, and reporting automation.',
    deliverable:'Use Case Build Plan', templateId:'use-case-build',
    lessons:[
      {
        id:'m5-l1', number:1, tier:'individual', duration:'30 min',
        title:'Case Summarisation: Design to Deployment',
        content:`<h2>Building Case Summarisation</h2>
<p>Case summarisation delivers the highest ROI of any AI use case in service organisations. Agents spend 10–15 minutes reading case history before every interaction. AI collapses this to under 30 seconds.</p>
<h3>The Prompt Architecture</h3>
<pre>System: You are a customer service assistant. Given the case 
history below, produce a structured summary:

CUSTOMER: [name, account type, tenure]
ISSUE: [one sentence — the core problem]
HISTORY: [3 bullet points of key prior interactions]
STATUS: [current state of the case]
SENTIMENT: [Positive / Neutral / Frustrated / Escalated]
SUGGESTED APPROACH: [one recommended next action]

Be factual. Do not infer. Only use information provided.

User: [Full case history text]</pre>
<h3>Integration Points</h3>
<ol><li>Trigger: Agent opens case in CRM</li><li>Webhook: Send case text to AI API</li><li>Receive: Structured summary JSON</li><li>Display: Surface in CRM sidebar</li><li>Log: Store summary + timestamp for QA</li></ol>`,
      },
      {
        id:'m5-l2', number:2, tier:'individual', duration:'25 min',
        title:'Ticket Triage Automation',
        content:`<h2>Building Ticket Triage</h2>
<p>Ticket triage is a classification problem. AI classifies with high accuracy and speed — leaving humans to focus on edge cases and high-stakes decisions.</p>
<pre>Confidence > 85%  → Auto-route
Confidence 60–85% → Route + human review flag  
Confidence &lt; 60%  → General queue + flag</pre>
<blockquote><p>Always route — never hold. A ticket in the right queue 80% of the time outperforms a ticket stuck in review 100% of the time.</p></blockquote>`,
      },
      {
        id:'m5-l3', number:3, tier:'individual', duration:'20 min',
        title:'Reporting Automation',
        content:`<h2>Building Reporting Automation</h2>
<pre>[Source Data] → [Extract] → [Transform] → [AI Narrative] → [Format] → [Distribute]</pre>
<p><strong>Time savings:</strong> Weekly reporting: 4–8 analyst hours → 15–30 minutes review. Saving: 85–95% of effort.</p>`,
      },
      {
        id:'m5-l4', number:4, tier:'smb', duration:'28 min',
        title:'[Business] From Prompt to Production in 4 Weeks',
        content:`<h2>Business Implementation Playbook</h2>
<p><strong>Week 1: Proof of Concept.</strong> Test your prompt with real data. Manually evaluate 50 outputs. Achieve &gt;80% accuracy before proceeding.</p>
<p><strong>Week 2: Integration.</strong> Connect to your data source using Make or n8n. Set up the API call. Test with live data in a sandbox.</p>
<p><strong>Week 3: Pilot.</strong> Run with 2–3 users. Collect structured feedback. Measure baseline vs actual performance daily.</p>
<p><strong>Week 4: Launch.</strong> Full team rollout. Daily monitoring for 2 weeks. Establish monthly review cadence.</p>`,
      },
      {
        id:'m5-l5', number:5, tier:'enterprise', duration:'35 min',
        title:'[Enterprise] Data Readiness & Legacy Standardisation',
        content:`<h2>Enterprise Data Readiness</h2>
<p>Enterprise AI fails most often not because of the AI — but because of the data. AI amplifies data quality problems. Clean data → useful AI. Dirty data → confidently wrong AI.</p>
<h3>The 5 Data Readiness Dimensions</h3>
<p><strong>Availability:</strong> Does the data exist? Where does it live? Who owns it?</p>
<p><strong>Quality:</strong> Is it complete, accurate, consistent, and timely?</p>
<p><strong>Accessibility:</strong> Can AI systems reach it via API or query?</p>
<p><strong>Structure:</strong> Is it structured enough for AI to consume?</p>
<p><strong>Governance:</strong> Who can use what data for what purpose?</p>
<h3>Legacy Data Standardisation Pipeline</h3>
<pre>Extract → Profile → Clean → Standardise → Validate → Load</pre>
<h3>Enterprise Deliverables</h3>
<ul><li>Data Readiness Report</li><li>Data Standardisation Plan</li><li>Data Model Blueprint</li><li>AI Data Pipeline Design</li></ul>`,
      },
    ],
  },
  {
    id:'module-6', number:6, icon:'📊',
    title:'ROI & Measurement',
    description:'Build a credible business case and define the KPIs that prove AI is delivering real value.',
    deliverable:'ROI Business Case', templateId:'roi-calculator',
    lessons:[
      {
        id:'m6-l1', number:1, tier:'individual', duration:'24 min',
        title:'Building the ROI Business Case',
        content:`<h2>The AI ROI Business Case</h2>
<h3>Cost Savings Formula</h3>
<pre>Annual Saving = Hours saved/week × Employees × Hourly cost × 52

Example:
Hours saved: 8 hrs/week · Employees: 25 · Hourly cost: $65 AUD
Annual saving = 8 × 25 × $65 × 52 = $676,000</pre>
<h3>Presenting the Case</h3>
<ol><li>Problem with quantified baseline</li><li>Proposed AI solution</li><li>Cost/benefit summary</li><li>Payback period</li><li>Conservative scenario</li><li>Recommended next step</li></ol>`,
      },
      {
        id:'m6-l2', number:2, tier:'individual', duration:'18 min',
        title:'KPI Definition & Measurement Frameworks',
        content:`<h2>KPIs That Prove AI is Working</h2>
<p>KPIs without baselines are opinions. Establish baselines 2–4 weeks <em>before</em> launch.</p>
<p><strong>Primary KPI:</strong> The main metric you're moving (e.g. average handle time).</p>
<p><strong>Secondary KPIs:</strong> Supporting metrics (agent satisfaction, first contact resolution).</p>
<p><strong>Guardrail KPIs:</strong> Metrics that must NOT worsen (customer satisfaction, error rate, compliance incidents).</p>
<h3>Review Cadence</h3>
<ul><li>Week 1–2: Daily monitoring</li><li>Month 1: Weekly review</li><li>Month 2–3: Bi-weekly review</li><li>Ongoing: Monthly executive summary</li></ul>`,
      },
      {
        id:'m6-l3', number:3, tier:'enterprise', duration:'30 min',
        title:'[Enterprise] Enterprise Value Reporting & Board Metrics',
        content:`<h2>Enterprise AI Value Reporting</h2>
<h3>The Four Value Categories</h3>
<p><strong>Efficiency value:</strong> Cost saved through automation. Process time reduction. Headcount redeployment.</p>
<p><strong>Revenue value:</strong> Revenue enabled by AI (faster sales cycles, better conversion, new product capability).</p>
<p><strong>Risk value:</strong> Compliance incidents avoided. Fraud prevented. SLA breaches reduced.</p>
<p><strong>Strategic value:</strong> Competitive capability built. Time to market improved. Data assets created.</p>
<h3>The AI Command Centre Dashboard</h3>
<p>A unified operational view: total AI calls · average accuracy by use case · cost per interaction · flagged incidents · model availability · team adoption · portfolio ROI.</p>`,
      },
    ],
  },
  {
    id:'module-7', number:7, icon:'⚖️',
    title:'Governance & Risk',
    description:'Build the governance framework that keeps AI accountable, compliant, and trusted across your organisation.',
    deliverable:'Governance Plan', templateId:'governance-checklist',
    lessons:[
      {
        id:'m7-l1', number:1, tier:'individual', duration:'22 min',
        title:'AI Risk Categories & Mitigation',
        content:`<h2>The 6 AI Risk Categories</h2>
<p><strong>1. Accuracy:</strong> AI outputs wrong. Mitigation: confidence thresholds, human review for consequential decisions.</p>
<p><strong>2. Bias:</strong> AI amplifies historical biases. Mitigation: bias testing, diverse data, regular audits.</p>
<p><strong>3. Data Privacy:</strong> PII sent to external AI. Mitigation: PII stripping, data residency controls.</p>
<p><strong>4. Dependency:</strong> Over-reliance — what if AI is unavailable? Mitigation: documented fallback processes.</p>
<p><strong>5. Explainability:</strong> AI decides and you can't explain why. Mitigation: explainable models for high-stakes decisions, audit trail.</p>
<p><strong>6. Regulatory:</strong> Violates emerging regulation. Mitigation: legal review, risk-tier classification, compliance documentation.</p>`,
      },
      {
        id:'m7-l2', number:2, tier:'individual', duration:'20 min',
        title:'The AI Governance Framework',
        content:`<h2>The 4 Governance Pillars</h2>
<p><strong>Accountability:</strong> Every AI use case has a named owner. No owner = no governance.</p>
<p><strong>Transparency:</strong> Publish an internal AI Use Register — what AI does, where, with what data.</p>
<p><strong>Control:</strong> Ability to override, pause, or shut down any AI system within minutes. Test this quarterly.</p>
<p><strong>Improvement:</strong> Regular review cycles. AI that isn't improving is degrading.</p>`,
      },
      {
        id:'m7-l3', number:3, tier:'enterprise', duration:'35 min',
        title:'[Enterprise] AI Ethics & Compliance Program',
        content:`<h2>Enterprise AI Ethics & Compliance</h2>
<h3>The Backend Governance Layer</h3>
<p><strong>Knowledge governance:</strong> What information can AI access? How is it kept current? Who is responsible for its accuracy?</p>
<p><strong>Prompt governance:</strong> All system prompts versioned, reviewed, and approved. No ad-hoc prompt changes in production.</p>
<p><strong>Dataset governance:</strong> Training data reviewed for bias, currency, and legal risk.</p>
<p><strong>Ethics review process:</strong> Every new use case assessed against the ethics framework before build approval.</p>
<p><strong>Incident response:</strong> Defined process for AI failures — who is notified, what is the fallback, how is it investigated, what is disclosed?</p>
<h3>Australian Regulatory Landscape</h3>
<p>APRA CPG 234 · Privacy Act 1988 · Consumer Data Right · Emerging AI governance expectations from ASIC and ACCC.</p>`,
      },
    ],
  },
  {
    id:'module-8', number:8, icon:'🚀',
    title:'90-Day Execution Plan',
    description:'Build a realistic, week-by-week plan from approved use case to live, measured AI in production.',
    deliverable:'90-Day Execution Plan', templateId:'90-day-plan',
    lessons:[
      {
        id:'m8-l1', number:1, tier:'individual', duration:'30 min',
        title:'The 90-Day AI Roadmap',
        content:`<h2>Phase 1: Foundation (Weeks 1–4)</h2>
<p><strong>W1 Discovery:</strong> Readiness snapshot · Time audit · Top 3 opportunities confirmed</p>
<p><strong>W2 Design:</strong> Workflow blueprint · Data mapping · Build vs buy decision</p>
<p><strong>W3 Business Case:</strong> Baseline metrics · ROI calculation · Stakeholder sign-off</p>
<p><strong>W4 Setup:</strong> Tool procurement · Environment setup · Team briefing</p>
<h2>Phase 2: Build (Weeks 5–10)</h2>
<p><strong>W5–6:</strong> Prompt engineering · API integration · Test with real data</p>
<p><strong>W7–8:</strong> 3–5 user pilot · Structured feedback · Accuracy measurement</p>
<p><strong>W9–10:</strong> Error handling · Logging · Documentation · Training materials</p>
<h2>Phase 3: Launch (Weeks 11–12)</h2>
<p><strong>W11:</strong> Full team rollout · Daily monitoring · Champion support</p>
<p><strong>W12:</strong> Month 1 ROI · Stakeholder report · Plan use case 2</p>`,
      },
      {
        id:'m8-l2', number:2, tier:'smb', duration:'25 min',
        title:'[Business] Execution: Doing More with Less',
        content:`<h2>90-Day Execution for Growing Businesses</h2>
<h3>Execution Principles for Growing Teams</h3>
<p><strong>1. One use case at a time.</strong> Parallel AI projects in small teams create context-switching costs that kill both.</p>
<p><strong>2. Champion-led delivery.</strong> One internal champion owns the use case end-to-end — accountable for adoption, not just delivery.</p>
<p><strong>3. Measure before you move.</strong> Don't start use case 2 until use case 1 has at least 30 days of production data. You need the ROI story.</p>`,
      },
      {
        id:'m8-l3', number:3, tier:'enterprise', duration:'35 min',
        title:'[Enterprise] Building the AI Centre of Excellence',
        content:`<h2>The AI Centre of Excellence</h2>
<p>The CoE is the institutional mechanism that scales AI from individual use cases to enterprise-wide competitive capability.</p>
<h3>CoE Minimum Viable Team</h3>
<p>AI Program Director · Technical AI Architect · Change & Adoption Lead · Governance & Risk Partner (shared)</p>
<h3>CoE Responsibilities</h3>
<ul><li>Maintain the AI Use Register</li><li>Own the prompt library and model governance</li><li>Define and enforce integration standards</li><li>Support business units in use case design</li><li>Report portfolio ROI to executive and board</li><li>Run the AI Command Centre</li></ul>
<h3>Scaling Roadmap</h3>
<p><strong>Month 3–6:</strong> CoE established · 2nd use case live · Data foundation in place</p>
<p><strong>Month 6–12:</strong> 3rd–5th use cases · Shared infrastructure operational</p>
<p><strong>Year 2:</strong> AI embedded in 3+ core functions · Board-level reporting</p>
<p style="margin-top:24px;font-size:1rem;font-weight:600;color:white">Congratulations on completing the Le On AI. Your execution starts now. 🎉</p>`,
      },
    ],
  },
]

export const ALL_LESSONS = MODULES.flatMap(m =>
  m.lessons.map(l => ({
    ...l,
    moduleId: m.id, moduleNumber: m.number,
    moduleTitle: m.title, moduleIcon: m.icon,
  }))
)

export const getLessonsForTier = (tier) => {
  const order = ['individual', 'smb', 'enterprise']
  const level = order.indexOf(tier)
  return ALL_LESSONS.filter(l => order.indexOf(l.tier) <= level)
}
