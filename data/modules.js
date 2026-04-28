// data/modules.js — Full 14-module Le On AI curriculum
// Each module includes: lessons, Q&A questions, real-world practice section

export const MODULES = [
  {
    id: 'module-1', number: 1, icon: '🧠',
    title: 'AI Foundations',
    description: 'Cut through the noise. Understand what AI actually is, how models work, what tokens cost, and where the real value lives.',
    deliverable: 'AI Readiness & Token Awareness Assessment',
    templateId: 'ai-readiness',
    lessons: [
      {
        id: 'm1-l1', number: 1, tier: 'individual', duration: '20 min',
        title: 'Introduction to AI: What It Is and Isn\'t',
        content: `<h2>What AI Actually Is</h2>
<p>Artificial Intelligence is pattern recognition at scale. At its core, AI learns from examples and applies what it has learned to new situations. It does not think, reason, or understand in the way humans do — it predicts.</p>
<h3>The Three Categories You Need to Know</h3>
<p><strong>Narrow AI (where we are now):</strong> AI designed for specific tasks. GPT-4o writes text. DALL-E generates images. AlphaFold predicts protein structures. Each is exceptional at its task and useless at others.</p>
<p><strong>General AI (where we're heading):</strong> Systems that can perform any intellectual task a human can. Not here yet — but approaching faster than most organisations are prepared for.</p>
<p><strong>Agentic AI (emerging now):</strong> AI that takes sequences of actions autonomously to achieve a goal. Already in production in leading organisations.</p>
<h3>The Gotchas Nobody Tells You</h3>
<p><strong>Hallucination:</strong> AI confidently states things that are false. It doesn't know what it doesn't know. Always verify consequential outputs.</p>
<p><strong>Context window limits:</strong> AI can only process a limited amount of text at once. Large documents need chunking strategies.</p>
<p><strong>Training data cutoffs:</strong> Models don't know about events after their training date. Supplement with retrieval systems for current information.</p>
<p><strong>Inconsistency:</strong> The same prompt can produce different outputs. Design for variability — don't assume deterministic results.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Most AI failures in business aren't technical — they're expectational. Teams deploy AI expecting a human-like understanding of context and get confused outputs instead.</p>
<p><strong>Example:</strong> A legal team deployed an AI to review contracts. It performed well on standard clauses but hallucinated precedents that didn't exist. Nobody checked — and two contracts were sent to clients with fabricated legal references.</p>
<p><strong>Why it matters:</strong> Without understanding AI's fundamental limitations, you design workflows that create liability rather than value.</p>
<p><strong>Implementation tip:</strong> Before any deployment, document your "failure modes" — what happens when AI is wrong? Design for that scenario first.</p>
<p><strong>💡 What This Saves You:</strong> Understanding AI limitations before deployment prevents costly rework, reputational risk, and the single most common cause of AI project abandonment.</p>
</div>`,
      },
      {
        id: 'm1-l2', number: 2, tier: 'individual', duration: '25 min',
        title: 'Types of AI Models and When to Use Each',
        content: `<h2>The Model Landscape</h2>
<p>Choosing the wrong model is like using a forklift to move a coffee cup — technically possible, expensive, and unnecessary. Here's the framework for picking the right tool.</p>
<h3>Large Language Models (LLMs)</h3>
<p>Best for: text generation, summarisation, classification, question answering, code generation, translation.</p>
<p>Key players: GPT-4o (OpenAI) · Claude 3.5 (Anthropic) · Gemini 1.5 (Google) · Llama 3 (Meta, open source)</p>
<p>When to choose: Any task involving reading, writing, classifying, or reasoning over text.</p>
<h3>Embedding Models</h3>
<p>Best for: semantic search, similarity matching, document retrieval (RAG systems).</p>
<p>When to choose: When you need AI to search your own documents or knowledge base intelligently.</p>
<h3>Image Models</h3>
<p>Best for: image generation, image classification, object detection, document OCR.</p>
<p>When to choose: Visual content creation, quality inspection, document digitisation.</p>
<h3>Speech Models</h3>
<p>Best for: speech-to-text transcription, text-to-speech, voice assistants.</p>
<p>When to choose: Call centre analytics, meeting transcription, voice-enabled workflows.</p>
<h3>The Decision Framework</h3>
<pre>What's the input?
  Text → LLM
  Documents to search → Embedding + LLM (RAG)
  Images → Vision model
  Audio → Speech model
  Multiple inputs → Multimodal or orchestrated pipeline</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations routinely pay 10–50× more than necessary by using frontier models for tasks that smaller, cheaper models handle equally well.</p>
<p><strong>Example:</strong> A retail business was using GPT-4o to classify customer support tickets into 12 categories — at $0.015 per 1K tokens. Switching to a fine-tuned GPT-4o-mini for the same task reduced cost by 90% with equivalent accuracy.</p>
<p><strong>Why it matters:</strong> At scale, model selection is a financial decision, not just a technical one.</p>
<p><strong>Implementation tip:</strong> Always benchmark 2–3 models against your specific task before committing to production. Cost and quality don't always correlate.</p>
<p><strong>💡 What This Saves You:</strong> Correct model selection typically reduces AI running costs by 40–80% without any loss in output quality.</p>
</div>`,
      },
      {
        id: 'm1-l3', number: 3, tier: 'individual', duration: '22 min',
        title: 'Tokens: The Currency of AI',
        content: `<h2>Understanding Tokens</h2>
<p>Every time you use an AI model, you're spending tokens. Tokens are the fundamental unit of AI computation — and misunderstanding them is one of the most common causes of budget overruns in AI programs.</p>
<h3>What Is a Token?</h3>
<p>A token is approximately 4 characters of text, or about ¾ of a word. The sentence "The quick brown fox" is roughly 5 tokens. A typical business email is 100–300 tokens. A 10-page report is 3,000–5,000 tokens.</p>
<h3>Input vs Output Tokens</h3>
<p><strong>Input tokens:</strong> Everything you send to the model — your system prompt, the user message, any documents or context. You pay for every token the model reads.</p>
<p><strong>Output tokens:</strong> Everything the model generates in response. Output tokens typically cost 3–5× more than input tokens.</p>
<h3>The Cost Formula</h3>
<pre>Total cost = (input tokens × input price) + (output tokens × output price)

Example — GPT-4o pricing (approx):
Input:  $2.50 per million tokens
Output: $10.00 per million tokens

A task with 1,000 input tokens + 500 output tokens:
= (1,000 × $0.0000025) + (500 × $0.00001)
= $0.0025 + $0.005
= $0.0075 per call

At 10,000 calls per day: $75/day · $2,250/month</pre>
<h3>Token Optimisation Strategies</h3>
<p><strong>Compress your prompts:</strong> Remove unnecessary words from system prompts. A 500-token prompt run 10,000 times costs as much as 5 million extra input tokens monthly.</p>
<p><strong>Use cheaper models for simple tasks:</strong> Classification, simple extraction, and formatting tasks don't need frontier models.</p>
<p><strong>Implement caching:</strong> Cache responses for identical or near-identical inputs. Reduces costs dramatically for FAQ-style use cases.</p>
<p><strong>Chunk strategically:</strong> Don't send entire documents when only sections are relevant. Retrieve only the necessary context.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Teams that don't model token costs before deployment routinely discover their "cheap" AI solution costs more than the headcount it was meant to replace.</p>
<p><strong>Example:</strong> A financial services firm built an AI document review tool. Initial testing on 50 documents worked fine. When scaled to 5,000 documents per day — each averaging 8,000 tokens — monthly AI costs hit $180,000. They hadn't modelled volume.</p>
<p><strong>Why it matters:</strong> Token costs are the hidden variable in every AI business case. Missing them invalidates your ROI model.</p>
<p><strong>Implementation tip:</strong> Always calculate your expected monthly token spend before building. Use the formula in Module 4's cost model.</p>
<p><strong>💡 What This Saves You:</strong> Understanding tokens before deployment prevents the single most common AI budget shock — discovering real costs only after going live.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q1-1', text: 'A customer service team wants to automatically classify 2,000 support tickets per day into 8 categories. Which approach gives the best cost-to-quality ratio?', options: ['Use GPT-4o for maximum accuracy', 'Use a fine-tuned smaller model for classification', 'Use keyword matching rules instead', 'Use GPT-4o-mini with a well-crafted prompt and test accuracy first'], correct: 3, explanation: 'Testing a cheaper model first is the right approach. Classification is a task where smaller models often match frontier model performance at a fraction of the cost.' },
        { id: 'q1-2', text: 'Your system prompt is 800 tokens and runs 50,000 times per month. At $2.50 per million input tokens, what is your monthly prompt cost alone?', options: ['$1.00', '$10.00', '$100.00', '$1,000.00'], correct: 2, explanation: '800 tokens × 50,000 = 40,000,000 tokens. At $2.50/million = $100/month. This is why prompt compression matters at scale.' },
        { id: 'q1-3', text: 'An AI summarises a report and includes a legal precedent that sounds authoritative but doesn\'t exist. This is an example of:', options: ['A training data error', 'Hallucination', 'Context window overflow', 'Model bias'], correct: 1, explanation: 'Hallucination is when AI generates plausible but false information. It\'s one of the most critical failure modes to design around.' },
        { id: 'q1-4', text: 'Which model type would you choose to build a system that lets employees search your internal policy documents using natural language?', options: ['A large language model only', 'An image generation model', 'An embedding model combined with an LLM (RAG system)', 'A speech-to-text model'], correct: 2, explanation: 'RAG (Retrieval-Augmented Generation) combines embedding models for search with LLMs for answer generation. The right architecture for knowledge base search.' },
        { id: 'q1-5', text: 'What does "context window" mean in practical terms for your workflow design?', options: ['The number of users who can access the system simultaneously', 'The maximum amount of text the model can process in one request', 'The time delay before the model responds', 'The geographic region where data is processed'], correct: 1, explanation: 'Context window limits how much text you can send in one API call. Large documents need chunking strategies. This affects architecture design significantly.' },
      ],
    },
  },
  {
    id: 'module-2', number: 2, icon: '👥',
    title: 'Key Roles in AI Programs',
    description: 'Every failed AI program has one thing in common: unclear ownership. Map the five roles that make AI programs succeed.',
    deliverable: 'AI Role Mapping Document',
    templateId: 'role-mapping',
    lessons: [
      {
        id: 'm2-l1', number: 1, tier: 'individual', duration: '18 min',
        title: 'The Five Roles Every AI Program Needs',
        content: `<h2>Role Clarity is Infrastructure</h2>
<p>AI programs don't fail because of bad technology. They fail because nobody owns the outcome. The five roles below aren't job titles — they're accountabilities. In small teams, one person may cover multiple roles. In large organisations, each needs a dedicated owner.</p>
<h3>Role 1: Business Sponsor</h3>
<p><strong>What they own:</strong> Strategic alignment, budget approval, executive visibility, and removing blockers.</p>
<p><strong>Why they matter:</strong> Without sponsorship, AI programs stall at the first obstacle. The sponsor converts organisational resistance into resource.</p>
<p><strong>Common failure:</strong> Sponsor approves the budget then disappears. Without ongoing engagement, teams lose authority to make decisions.</p>
<h3>Role 2: Data Owner</h3>
<p><strong>What they own:</strong> Data quality, access, governance, and compliance for data used in AI.</p>
<p><strong>Why they matter:</strong> AI is only as good as its data. The data owner ensures the inputs are trustworthy and legally permissible.</p>
<p><strong>Common failure:</strong> Data ownership assumed but never assigned. AI trained on unvalidated, inconsistent, or non-compliant data.</p>
<h3>Role 3: Process Owner</h3>
<p><strong>What they own:</strong> The workflow being automated or augmented. Defines what "good" looks like and validates AI outputs.</p>
<p><strong>Why they matter:</strong> AI built without process ownership optimises the wrong thing or creates new problems downstream.</p>
<h3>Role 4: Technical / AI Role</h3>
<p><strong>What they own:</strong> Model selection, integration, prompt engineering, performance monitoring, and cost management.</p>
<p><strong>Why they matter:</strong> Translates business requirements into working AI systems. Without this role, business ideas stay ideas.</p>
<h3>Role 5: Change Lead</h3>
<p><strong>What they own:</strong> Adoption strategy, training, communication, resistance management, and measuring behavioural change.</p>
<p><strong>Why they matter:</strong> Technology is 20% of an AI program. Adoption is 80%. Without a change lead, tools get built and ignored.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> In 90% of stalled AI programs, at least two of these five roles are either unfilled or held by people without genuine authority.</p>
<p><strong>Example:</strong> A government agency built an AI document classifier over 6 months. When they tried to deploy, IT blocked it citing data governance concerns. There was no Data Owner in the program — data governance hadn't been included from day one. The project was delayed by 4 months.</p>
<p><strong>Why it matters:</strong> Each missing role creates a specific type of failure. Knowing which role is weak tells you exactly where your program will break.</p>
<p><strong>Implementation tip:</strong> Complete the Role Mapping template before writing a single line of code or prompt. Names against each role — not departments.</p>
<p><strong>💡 What This Saves You:</strong> Clear role mapping prevents the two most common and expensive AI program failures: governance blockers and adoption collapse.</p>
</div>`,
      },
    ],

      {
        id: 'm2-l2', number: 2, tier: 'individual', duration: '20 min',
        title: 'The AI Execution Triad',
        content: `<h2>Three Roles. One Outcome.</h2>
<p>The five-role model tells you who needs to exist in an AI program. The AI Execution Triad tells you how those roles relate to each other and why misalignment between them is the single biggest cause of AI program failure.</p>
<p>Every successful AI initiative requires alignment across three core accountabilities. These aren't departments — they're lenses through which the work must be seen simultaneously.</p>

<h3>The Three Roles of the Triad</h3>

<p><strong>Business Leader — owns WHAT and WHY</strong><br/>
Defines the problem worth solving. Sets the vision. Is accountable for business outcomes: revenue acceleration, cost reduction, improved customer experience, operational growth.<br/>
<em>Key question they answer:</em> "What problem are we solving and what does success look like in business terms?"</p>

<p><strong>Solution Architect — owns HOW</strong><br/>
Translates business intent into AI capability. Selects models, designs workflows, evaluates build vs buy, balances cost vs performance. Bridges the gap between business aspiration and technical reality.<br/>
<em>Key question they answer:</em> "How do we build this in a way that works, scales, and doesn't cost more than it saves?"</p>

<p><strong>Delivery Lead — owns EXECUTION</strong><br/>
Ensures the solution gets built and adopted. Defines requirements, manages timelines, coordinates dependencies, tracks milestones. Owns the gap between "designed" and "done".<br/>
<em>Key question they answer:</em> "Are we on track, and will this actually be delivered to the people who need it?"</p>

<h3>The Venn Diagram — Where the Magic Happens</h3>
<p>The three roles overlap in three critical zones — and at the centre, all three converge:</p>

<div class="triad-diagram">
  <div class="triad-circles">
    <div class="triad-circle triad-business">
      <span class="triad-label">Business Leader</span>
      <span class="triad-sub">What &amp; Why</span>
    </div>
    <div class="triad-circle triad-architect">
      <span class="triad-label">Solution Architect</span>
      <span class="triad-sub">How</span>
    </div>
    <div class="triad-circle triad-delivery">
      <span class="triad-label">Delivery Lead</span>
      <span class="triad-sub">Execution</span>
    </div>
  </div>
  <div class="triad-intersections">
    <div class="triad-intersection">
      <strong>Business + Solution</strong>
      <span>Strategic Fit</span>
      <span class="triad-def">Is the AI solution actually solving the right problem?</span>
    </div>
    <div class="triad-intersection">
      <strong>Solution + Delivery</strong>
      <span>Execution Feasibility</span>
      <span class="triad-def">Is the designed solution actually buildable within constraints?</span>
    </div>
    <div class="triad-intersection">
      <strong>Business + Delivery</strong>
      <span>Operational Alignment</span>
      <span class="triad-def">Is delivery producing what operations actually needs?</span>
    </div>
    <div class="triad-center">
      <strong>🎯 AI Success Zone</strong>
      <span>All three aligned = program succeeds</span>
    </div>
  </div>
</div>

<h3>What Happens When One is Missing</h3>
<p><strong>No Business Leader:</strong> Technically impressive solutions that solve the wrong problem. Budget gets cut because nobody can articulate the business case.</p>
<p><strong>No Solution Architect:</strong> Business enthusiasm meets implementation chaos. Scope balloons. Costs blow out. The team builds the first thing that comes to mind, not the right thing.</p>
<p><strong>No Delivery Lead:</strong> Designed but never delivered. Good ideas trapped in PowerPoint. No one owns the timeline, so nobody meets it.</p>

<h3>Decision Checklist</h3>
<p>Before starting any AI initiative:</p>
<pre>□ Is the Business Leader named — not a department, a person?
□ Can they articulate the outcome in one sentence?
□ Is the Solution Architect named and engaged?
□ Have they reviewed the business problem (not just the solution)?
□ Is the Delivery Lead named?
□ Do they have authority to say no to scope changes?
□ Have all three met together and agreed on the definition of success?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The triad doesn't require three separate people — but it requires three distinct conversations. In small teams, one person may cover two roles. What matters is that all three perspectives are actively represented.</p>
<p><strong>Example:</strong> A $2.4M enterprise AI program stalled for 7 months. Investigation revealed the Business Leader had delegated to a committee (no single voice), the Solution Architect was chosen based on vendor relationship (not capability), and the Delivery Lead reported to IT — not to the program sponsor. All three accountabilities existed on paper. None worked as designed. Restructuring the triad delivered the first use case in 11 weeks.</p>
<p><strong>Why it matters:</strong> The triad is not about org charts. It's about clear accountability for three fundamentally different types of decision.</p>
<p><strong>Implementation tip:</strong> At the start of every AI initiative, run a 30-minute "Triad Clarity Session." Three questions: Who owns the problem definition? Who owns the solution design? Who owns delivery? If any answer is "the team" or "we all do" — you have a problem.</p>
<p><strong>💡 What This Saves You:</strong> Organisations that establish clear triad roles before build begin are 3× more likely to deliver on time and within budget. Unclear triad = guaranteed scope creep, rework, and stakeholder conflict.</p>
</div>`,
      },
      {
        id: 'm2-l3', number: 3, tier: 'individual', duration: '15 min',
        title: 'The Role Overlap Trap',
        content: `<h2>Collaboration Is Not the Same as Shared Ownership</h2>
<p>The most dangerous moment in an AI program is when it's going well enough that everyone wants to be involved in everything. This is where the Role Overlap Trap springs.</p>

<blockquote><p><strong>"Alignment does not mean overlap. Collaboration does not mean shared ownership of everything."</strong></p></blockquote>

<h3>What the Overlap Trap Looks Like</h3>

<p><strong>The Business Leader starts designing the solution:</strong><br/>
"We should use GPT-4o for this. I've seen what it can do."<br/>
Result: The solution is selected before the problem is properly defined. Architecture decisions made by someone without technical context.</p>

<p><strong>The Solution Architect redefines the business problem:</strong><br/>
"Actually, what you really need is a recommendation engine, not a summarisation tool."<br/>
Result: Months of work redone. Business stakeholders lose confidence. The original problem remains unsolved.</p>

<p><strong>The Delivery Lead reshapes scope independently:</strong><br/>
"We've added a reporting dashboard — seemed useful while we were building."<br/>
Result: Timeline blows out. Budget exceeded. Features nobody asked for shipped instead of features people need.</p>

<h3>The Warning Signs Checklist</h3>
<pre>□ Business leader prescribing exact technology or vendor choice
□ Solution architect questioning whether the business problem is real
□ Delivery lead adding features not in the approved scope
□ All three roles in every meeting without clear agenda ownership
□ Decisions made by consensus rather than by the role that owns them
□ "We" language replacing "I own this" language in status updates</pre>

<h3>The Correct Accountability Model</h3>
<p>Each role has a domain. The boundaries are deliberate:</p>

<div class="accountability-table">
<table>
<thead><tr><th>Role</th><th>Owns</th><th>Does NOT Own</th></tr></thead>
<tbody>
<tr>
  <td><strong>Business Leader</strong></td>
  <td>Problem definition · Success criteria · Business case · Stakeholder alignment · Budget authority</td>
  <td>Solution design · Technology selection · Build timeline · Technical trade-offs</td>
</tr>
<tr>
  <td><strong>Solution Architect</strong></td>
  <td>Technical design · Model selection · Workflow architecture · Cost vs performance · Build vs buy</td>
  <td>Business problem definition · Delivery timelines · Stakeholder management · Budget approval</td>
</tr>
<tr>
  <td><strong>Delivery Lead</strong></td>
  <td>Requirements definition · Timeline · Dependencies · Risk management · Milestone delivery</td>
  <td>Changing scope without approval · Redefining the solution · Overriding business priorities</td>
</tr>
</tbody>
</table>
</div>

<h3>The Escalation Path When Overlap Occurs</h3>
<p>When a role steps outside its boundary — and it will — the response is a structured conversation, not conflict:</p>
<pre>Step 1: Name it directly.
  "I notice we're making solution decisions in a business problem meeting."

Step 2: Return to role ownership.
  "Let's separate these. [Business Leader], can you confirm the problem we're solving?
   [Solution Architect], we'll schedule a separate session for solution design."

Step 3: Document the decision and who made it.
  Every key decision should have a named owner — not "the team decided."</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Role overlap is most common at the beginning of AI programs (excitement leads to everyone wanting to shape everything) and at crisis points (when things go wrong, everyone tries to fix everything simultaneously).</p>
<p><strong>Example:</strong> A financial services firm's AI credit decisioning project had 11 stakeholders attending every meeting. The Business Leader changed the success criteria three times. The Solution Architect redesigned the architecture twice based on stakeholder feedback that wasn't their responsibility to incorporate. The Delivery Lead padded the timeline without informing the business. At 8 months in, no code had been shipped. A role clarity workshop, a RACI matrix, and reduced meeting attendees solved the problem. First delivery: 6 weeks later.</p>
<p><strong>Why it matters:</strong> Role overlap isn't a sign of a collaborative culture — it's a sign of unclear accountability. The most collaborative programs have the clearest role boundaries.</p>
<p><strong>Implementation tip:</strong> Run a "Role Clarity Audit" at month 1 and month 3 of every AI program. Ask each role: "What decisions have you made this month that weren't yours to make?" The answers reveal where the boundaries have eroded before they cause real damage.</p>
<p><strong>💡 What This Saves You:</strong> Role overlap is the primary cause of AI program scope creep and budget overruns. Programs with clear role boundaries consistently deliver 40–60% faster than those without.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q2-1', text: 'An AI program has been approved and funded. Six months in, a compliance team raises concerns about how customer data is being used in the AI model. Which role should have prevented this?', options: ['Business Sponsor', 'Data Owner', 'Change Lead', 'Technical AI Role'], correct: 1, explanation: 'The Data Owner is responsible for ensuring data governance and compliance from the outset. This failure is a classic symptom of an absent or disempowered Data Owner.' },
        { id: 'q2-2', text: 'The AI tool has been deployed but only 15% of the team is using it three months later. Which role owns this problem?', options: ['Process Owner', 'Business Sponsor', 'Change Lead', 'Technical AI Role'], correct: 2, explanation: 'Low adoption is the Change Lead\'s accountability. Technology deployment without adoption strategy consistently produces this outcome.' },
        { id: 'q2-3', text: 'In a 12-person business, how should the five AI roles typically be distributed?', options: ['One person handles all five roles', 'Hire five dedicated people before starting', 'Assign existing people with relevant accountability to each role — one person may cover two', 'Only fill roles as problems arise'], correct: 2, explanation: 'In smaller organisations, roles can be combined but should still be explicitly assigned. Ambiguity creates gaps. A sales director can be Process Owner. An operations manager can be Change Lead.' },
        { id: 'q2-4', text: 'Your AI model is producing good outputs but the underlying workflow has changed — outputs are now going to the wrong place. Which role should have caught this?', options: ['Data Owner', 'Process Owner', 'Technical AI Role', 'Business Sponsor'], correct: 1, explanation: 'The Process Owner monitors the workflow for which AI has been deployed. Changes to the process must be reflected in the AI integration.' },
        { id: 'q2-6', text: 'A Business Leader insists on using a specific AI vendor they saw at a conference, before the Solution Architect has reviewed the requirements. Which trap does this represent?', options: ['Normal stakeholder input', 'The Role Overlap Trap — Business Leader stepping into Solution Architect territory', 'Good practice — leadership should guide technology decisions', 'A sign the Solution Architect is underperforming'], correct: 1, explanation: 'Vendor and technology selection is the Solution Architect\'s domain. When Business Leaders prescribe solutions before problems are properly defined, architecture decisions are made without technical context — a classic overlap trap.' },
        { id: 'q2-7', text: 'The AI Execution Triad intersection of Business Leader and Solution Architect is called "Strategic Fit." What does this mean in practice?', options: ['The business and technical teams get along well', 'The AI solution is actually solving the right problem in a technically viable way', 'The project has been approved by leadership', 'The solution uses the latest AI models'], correct: 1, explanation: 'Strategic Fit is the alignment zone where business intent meets technical design. It answers: "Are we solving the right problem in the right way?" Without it, technically brilliant solutions address the wrong business problem.' },
                { id: 'q2-5', text: 'Who is responsible for ensuring AI projects stay within budget and that token costs don\'t exceed projections?', options: ['Business Sponsor', 'Process Owner', 'Technical AI Role', 'Change Lead'], correct: 2, explanation: 'The Technical AI Role owns cost management including token usage monitoring, model selection optimisation, and alerting when costs exceed thresholds.' },
      ],
    },
  },
  {
    id: 'module-3', number: 3, icon: '🔍',
    title: 'Identifying Use Cases',
    description: 'Find AI opportunities that are real, valuable, and achievable — before committing time and budget.',
    deliverable: 'Top 3 AI Opportunities',
    templateId: 'use-case-identification',
    lessons: [
      {
        id: 'm3-l1', number: 1, tier: 'individual', duration: '20 min',
        title: 'Value vs Complexity: Finding the Right Starting Point',
        content: `<h2>The Opportunity Landscape</h2>
<p>Not every AI idea is worth pursuing. The art of use case identification is finding the intersection of three things: high business value, achievable complexity, and data that actually exists.</p>
<h3>The Value-Complexity Matrix</h3>
<p>Plot every AI idea on two axes: business value (low to high) and implementation complexity (low to high). The quadrant you want to start in is high value, low complexity — your quick wins.</p>
<pre>High Value  │ Strategic    │ Quick Wins ←START HERE
            │ (Horizon 2)  │
            │──────────────│──────────────
Low Value   │ Avoid        │ Low-hanging
            │              │ (Horizon 1)
            └──────────────┴──────────────
              High          Low
              Complexity    Complexity</pre>
<h3>Where to Look for Opportunities</h3>
<p><strong>Follow the repetition:</strong> Any task done the same way more than 10 times per week is a candidate. Repetition is AI's natural habitat.</p>
<p><strong>Follow the pain:</strong> What do people in your organisation complain about most? Pain points reveal where time and money are being lost.</p>
<p><strong>Follow the data:</strong> What data do you have that nobody is fully using? Underutilised data often signals underserved processes.</p>
<p><strong>Follow the decisions:</strong> What decisions require pulling together information from multiple places? AI excels at synthesis and pattern recognition across data sources.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The best AI use cases are rarely the most exciting ones. They're the ones that address the most painful, repetitive, data-rich processes — which are often invisible to leadership.</p>
<p><strong>Example:</strong> A hospitality chain wanted to build an AI concierge (exciting, complex, high-risk). Meanwhile, their staff spent 4 hours per day manually compiling daily occupancy and F&B reports from 3 systems. The report automation took 3 weeks to build, saved $240K annually, and built organisational confidence for bigger initiatives.</p>
<p><strong>Why it matters:</strong> Starting with the right use case creates the proof of concept that funds the next five.</p>
<p><strong>Implementation tip:</strong> Run a "time audit" — ask 10 people across different functions to log tasks for one week. The highest-volume, most repetitive items are your first wave of opportunities.</p>
<p><strong>💡 What This Saves You:</strong> Selecting the right first use case prevents the most expensive mistake in AI programs — spending 6 months on a complex use case that fails, demoralising the team and exhausting the budget.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q3-1', text: 'A marketing team spends 3 hours per week creating social media post summaries from blog content. An AI solution could automate this in 2 weeks. How would you classify this opportunity?', options: ['High value, high complexity — strategic bet', 'Low value, low complexity — quick win', 'High value, low complexity — ideal starting point', 'Low value, high complexity — avoid'], correct: 2, explanation: 'Content summarisation is a proven AI capability (low complexity). 3 hours/week per person at scale is meaningful value. Classic quick win profile.' },
        { id: 'q3-2', text: 'Which of these signals best indicates a strong AI use case?', options: ['The task is novel and creative each time it\'s performed', 'The task is performed frequently, follows a pattern, and has clear inputs and outputs', 'The task requires deep human judgment and emotional intelligence', 'The task is currently performed by senior leadership'], correct: 1, explanation: 'Frequency + pattern + clear I/O is the AI use case trifecta. AI thrives on repetition and consistency.' },
        { id: 'q3-3', text: 'Your organisation has identified 12 potential AI use cases. What\'s the most effective way to narrow to the right 3 to pursue first?', options: ['Choose the 3 that sound most innovative', 'Choose the 3 that the CEO is most excited about', 'Score each against value, complexity, data availability, and team readiness', 'Choose the 3 that other companies in your industry are doing'], correct: 2, explanation: 'Structured scoring removes bias and politics from use case selection. It\'s the foundation of Module 4\'s prioritisation framework.' },
        { id: 'q3-4', text: 'Which data signal most strongly suggests an AI use case is viable?', options: ['The process exists but no data has been collected', 'Historical data of 6+ months exists in a structured format', 'Data exists but is spread across 7 different systems with no integration', 'Data is collected on paper forms'], correct: 1, explanation: 'Structured historical data is the highest readiness signal. AI needs examples to learn from. Clean, accessible data dramatically reduces implementation time and risk.' },
        { id: 'q3-5', text: 'A task requires an experienced employee to make a judgment call based on their 10 years of experience — the criteria aren\'t documented anywhere. Is this a good early AI use case?', options: ['Yes — AI can replicate any human judgment', 'No — undocumented judgment criteria make this high-risk and high-complexity', 'Yes — if you train the AI on that employee\'s outputs', 'No — AI can never make judgment calls'], correct: 1, explanation: 'Undocumented expert judgment is one of the hardest AI problems. It\'s not impossible, but it\'s a Horizon 2-3 use case, not a first deployment.' },
      ],
    },
  },
  {
    id: 'module-4', number: 4, icon: '📊',
    title: 'Use Case Prioritisation',
    description: 'Score, rank, and build the financial case for your AI use cases — including 5-year cost modelling and token-based ROI.',
    deliverable: 'Prioritised Use Case Portfolio with Financial Model',
    templateId: 'prioritisation-model',
    lessons: [
      {
        id: 'm4-l1', number: 1, tier: 'smb', duration: '25 min',
        title: 'The Prioritisation Scoring Framework',
        content: `<h2>From Ideas to Investment Decisions</h2>
<p>Prioritisation turns subjective enthusiasm into objective investment decisions. It removes politics from the conversation and replaces it with evidence.</p>
<h3>The Five Scoring Factors</h3>
<p><strong>1. Business Value (1–5):</strong> What is the measurable impact on revenue, cost, or risk?</p>
<p><strong>2. Implementation Complexity (1–5, inverted):</strong> How difficult is the build? Data, integration, and technical effort.</p>
<p><strong>3. Adoption Effort (1–5, inverted):</strong> How much change management is required? Team size, resistance level, training needs.</p>
<p><strong>4. Implementation Cost ($):</strong> One-time build cost including people, tools, and infrastructure.</p>
<p><strong>5. Ongoing Maintenance Cost ($/year):</strong> Token costs + support + data maintenance + governance overhead.</p>
<h3>The Priority Score Formula</h3>
<pre>Priority Score = (Business Value × 2) + Complexity Score + Adoption Score
                 − (Normalised Cost Score)

Where Complexity Score = (6 - Implementation Complexity)
      Adoption Score   = (6 - Adoption Effort)
      Cost Score       = scaled 1–5 from cost estimate</pre>`,
      },
      {
        id: 'm4-l2', number: 2, tier: 'smb', duration: '30 min',
        title: 'The 5-Year AI Cost Model',
        content: `<h2>Why 5 Years?</h2>
<p>Point-in-time ROI calculations miss the compounding nature of AI costs and benefits. A use case that looks profitable in year one may be underwater by year three if token costs scale with volume. The 5-year model gives you the full picture.</p>
<h3>The Cost Components</h3>
<p><strong>Implementation Cost (one-time):</strong></p>
<pre>Implementation Cost = People cost + Tool/platform cost + Infrastructure setup
Example:
  Developer: 4 weeks × $2,000/week  = $8,000
  Platform:  3 months setup          = $1,500
  Total implementation:               = $9,500</pre>
<p><strong>Annual Maintenance Cost:</strong></p>
<pre>Annual Maintenance = Token cost + Support effort + Data maintenance + Governance

Token cost = (calls per day × avg tokens per call × cost per token) × 365

Example:
  500 calls/day × 2,000 tokens × $0.000005/token × 365 = $1,825/year

Support effort: 2 hrs/week × $65/hr × 52 = $6,760/year
Data maintenance: $2,000/year
Governance review: $1,500/year
Total annual maintenance: $12,085/year</pre>
<p><strong>5-Year Total Cost:</strong></p>
<pre>5-Year Cost = Implementation + (Annual Maintenance × 5)
            = $9,500 + ($12,085 × 5)
            = $9,500 + $60,425
            = $69,925</pre>
<h3>The Value Model</h3>
<pre>Annual Value = Time saved per person per day (hrs)
             × Number of people
             × Working days per year
             × Hourly cost

Example:
  1.5 hrs/day × 8 people × 250 days × $65/hr
  = $195,000/year

5-Year Value = $195,000 × 5 = $975,000</pre>
<h3>Net Benefit and ROI</h3>
<pre>Net Benefit = 5-Year Value − 5-Year Cost
            = $975,000 − $69,925
            = $905,075

ROI % = (Net Benefit / 5-Year Cost) × 100
      = ($905,075 / $69,925) × 100
      = 1,294% ROI over 5 years</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations that model AI costs over 5 years make fundamentally better vendor and architecture decisions than those who only look at year one.</p>
<p><strong>Example:</strong> A professional services firm chose a premium AI platform because year-one cost looked competitive. By year three, as their usage scaled 8×, annual costs exceeded the value delivered. A 5-year model at the outset would have revealed this and driven a different architecture choice.</p>
<p><strong>Why it matters:</strong> Token costs scale with usage. Support costs scale with complexity. A use case that looks like a 300% ROI in year one can turn negative by year four without proper modelling.</p>
<p><strong>Implementation tip:</strong> Build three scenarios — conservative (50% of expected volume), base (expected volume), and optimistic (200% of expected volume). Present all three to your decision-makers.</p>
<p><strong>💡 What This Saves You:</strong> The 5-year model prevents the most common AI investment regret — committing to an architecture or vendor that becomes unaffordable at scale.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q4-1', text: 'A use case has high business value (5), low implementation complexity (2), but very high adoption effort (5). What is its Priority Score using the formula?', options: ['12', '9', '8', '14'], correct: 1, explanation: 'Score = (5×2) + (6-2) + (6-5) = 10 + 4 + 1 = 15. Then subtract cost score. High adoption effort significantly reduces the attractiveness of otherwise strong use cases.' },
        { id: 'q4-2', text: 'Your AI use case processes 1,000 requests per day, averaging 3,000 tokens each at $0.000005 per token. What is the annual token cost?', options: ['$547.50', '$5,475', '$54,750', '$547,500'], correct: 1, explanation: '1,000 × 3,000 × $0.000005 × 365 = $5,475/year. Understanding this calculation is essential for accurate cost modelling.' },
        { id: 'q4-3', text: 'A use case has a 5-year value of $800,000 and a 5-year cost of $120,000. What is the 5-year ROI?', options: ['567%', '667%', '767%', '867%'], correct: 1, explanation: 'ROI = ((800,000 - 120,000) / 120,000) × 100 = (680,000 / 120,000) × 100 = 567%. Building ROI models gives you the language leadership needs to approve investment.' },
        { id: 'q4-4', text: 'Why is adoption effort included as a scoring factor in prioritisation?', options: ['It isn\'t — only technical factors matter', 'Because high adoption effort increases implementation time and risk of low ROI even when the technical build succeeds', 'Because it determines which vendor to use', 'Because it measures how many users will use the tool'], correct: 1, explanation: 'A technically successful AI tool with low adoption delivers zero value. Adoption effort is a risk multiplier that must be factored into prioritisation.' },
        { id: 'q4-5', text: 'When should you present a 5-year cost model rather than just year-one figures?', options: ['Never — leadership only cares about immediate results', 'Always — all AI investments should be evaluated over 5 years', 'Only for enterprise projects over $1M', 'Only when you think the project will fail'], correct: 1, explanation: 'AI costs and benefits compound over time. Token costs scale with usage. Year-one figures routinely mislead decision-makers about long-term viability.' },
      ],
    },
  },
  {
    id: 'module-5', number: 5, icon: '⚡',
    title: 'Workflow Design',
    description: 'Design the human + AI workflow before touching a single tool. The blueprint that prevents expensive rebuilds.',
    deliverable: 'AI Workflow Blueprint',
    templateId: 'workflow-design',
    lessons: [
      {
        id: 'm5-l1', number: 1, tier: 'smb', duration: '25 min',
        title: 'Process Mapping and AI Placement',
        content: `<h2>Map Before You Build</h2>
<p>Every AI implementation failure has one thing in common: the team started building before they finished designing. The Workflow Blueprint is your insurance policy against that failure.</p>
<h3>The Current State Map</h3>
<p>Before designing the AI workflow, document the current process with brutal honesty. Include every step, every workaround, every exception. The process your team describes and the process they actually follow are usually different.</p>
<h3>AI Placement Principles</h3>
<p><strong>Place AI in the gap:</strong> AI belongs in the workflow gap — between where information arrives and where a decision or action is taken. This is where time is lost and where AI recovers it.</p>
<p><strong>Never automate a broken process:</strong> If the current workflow is flawed, AI will execute that flaw faster and at greater scale. Fix the process first, then automate.</p>
<p><strong>Design the exception path first:</strong> What happens when AI is wrong or uncertain? Design this path explicitly before designing the happy path. Exception handling is where most AI implementations fail in production.</p>
<h3>Human-AI Interaction Patterns</h3>
<pre>Pattern 1: AI Reads → Human Acts
  AI summarises or extracts. Human decides and acts.
  Best for: research, summarisation, briefing.

Pattern 2: AI Classifies → Human Routes  
  AI categorises. Human validates high-stakes cases.
  Best for: triage, routing, prioritisation.

Pattern 3: AI Drafts → Human Edits
  AI generates first draft. Human refines and approves.
  Best for: content, reports, communications.

Pattern 4: AI Alerts → Human Investigates
  AI detects anomalies. Human investigates causes.
  Best for: monitoring, compliance, quality control.

Pattern 5: AI Decides → Human Monitors
  AI acts autonomously within defined guardrails.
  Best for: high-volume, low-stakes, well-defined tasks.</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The most expensive AI mistake isn't a bad model — it's a good model in a badly designed workflow. Process design errors multiply at AI speed.</p>
<p><strong>Example:</strong> A logistics company built an AI route optimiser. The AI performed well in testing. In production, drivers ignored its recommendations because the exception handling pathway was broken — when the AI's route was physically impossible, the driver had no way to report it or get an alternative. Adoption collapsed within two weeks.</p>
<p><strong>Why it matters:</strong> Workflow design determines whether AI gets used, not just whether it works.</p>
<p><strong>Implementation tip:</strong> Walk your workflow blueprint with the people who will actually use it — before you build. A one-hour walkthrough prevents three months of rework.</p>
<p><strong>💡 What This Saves You:</strong> Proper workflow design prevents the most common post-deployment failure — a working AI tool that nobody uses because the workflow wasn't designed for real conditions.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q5-1', text: 'An AI system automatically sends customer refunds when it detects certain patterns in complaint data. No human reviews the decision. Which pattern does this represent and what is the primary risk?', options: ['AI Drafts → Human Edits — risk is poor quality drafts', 'AI Decides → Human Monitors — risk is errors going undetected until they scale', 'AI Classifies → Human Routes — risk is misclassification', 'AI Reads → Human Acts — risk is slow response times'], correct: 1, explanation: 'Full autonomy (Pattern 5) is highest risk. Without human review for consequential financial decisions, errors compound before they\'re caught. Confidence thresholds and human escalation are essential.' },
        { id: 'q5-2', text: 'Before implementing AI in a customer onboarding process, you discover the current process has 3 undocumented workarounds. What should you do?', options: ['Build the AI anyway — it will work around them', 'Document and resolve the workarounds before building the AI workflow', 'Ignore them — they\'re edge cases', 'Build the AI to handle the workarounds automatically'], correct: 1, explanation: 'Automating a broken process accelerates the problem. Resolve process issues before AI implementation — otherwise you\'re encoding workarounds into permanent infrastructure.' },
        { id: 'q5-3', text: 'Your AI workflow blueprint is complete. What is the most valuable next step before development begins?', options: ['Get IT to review the technical architecture', 'Walk through the blueprint with the people who will actually use it daily', 'Present it to leadership for approval', 'Start building the integration layer'], correct: 1, explanation: 'End-user validation before build is the highest-value quality gate. Frontline users will identify practical gaps that designers and developers miss every time.' },
        { id: 'q5-4', text: 'In your workflow design, at what point should you design the exception handling pathway?', options: ['After the main workflow is built and tested', 'Before designing the happy path', 'Only if exceptions occur in production', 'Exceptions are handled by the AI automatically'], correct: 1, explanation: 'Exception handling must be designed before the happy path. It determines whether your AI workflow is production-safe or brittle. Most AI deployment failures originate in unhandled exceptions.' },
        { id: 'q5-5', text: 'A workflow step requires an employee to make a nuanced judgment based on customer history, tone, and account value. Where should AI be placed in this step?', options: ['Replace the human entirely', 'Have AI surface relevant customer history and sentiment before the human makes the decision (Pattern 1)', 'Not use AI at all', 'Have AI make the decision and send for human review only if confidence is below 50%'], correct: 1, explanation: 'AI Reads → Human Acts is the right pattern for nuanced judgment calls. AI augments the human\'s decision quality by surfacing relevant context — it doesn\'t replace judgment.' },
      ],
    },
  },
  {
    id: 'module-6', number: 6, icon: '🗄️',
    title: 'Data Readiness & Structuring',
    description: 'AI is only as good as its data. Assess, clean, standardise, and structure your data for AI consumption.',
    deliverable: 'Data Readiness Report + Data Model Blueprint',
    templateId: 'data-readiness',
    lessons: [
      {
        id: 'm6-l1', number: 1, tier: 'smb', duration: '28 min',
        title: 'Data Sanitisation, Standardisation, and Structuring',
        content: `<h2>Data Is the Foundation</h2>
<p>Bad data doesn't just produce bad AI outputs — it produces confidently bad AI outputs. An AI model with dirty data will answer questions with high certainty and be consistently wrong. This is worse than no AI at all.</p>
<h3>The Data Readiness Assessment (5 Dimensions)</h3>
<p><strong>1. Availability:</strong> Does the data exist and can it be accessed? Where does it live? Who owns it?</p>
<p><strong>2. Quality:</strong> Is it complete (no missing values)? Accurate (correct)? Consistent (same format across sources)? Current (up to date)?</p>
<p><strong>3. Structure:</strong> Is it in a format AI can consume directly? Structured (database tables, CSV) is easiest. Unstructured (PDFs, images, audio) needs preprocessing.</p>
<p><strong>4. Accessibility:</strong> Can AI systems reach it via API, query, or export? What access controls exist?</p>
<p><strong>5. Governance:</strong> What data can be used for what purpose? Are there privacy, regulatory, or contractual constraints?</p>
<h3>Data Sanitisation Steps</h3>
<pre>Step 1: PROFILE    → Identify missing values, outliers, duplicates
Step 2: CLEAN      → Fix known errors, remove duplicates, handle nulls
Step 3: STANDARDISE → Consistent formats (dates, names, codes, units)
Step 4: ENRICH     → Add missing context from secondary sources
Step 5: VALIDATE   → Automated quality checks before AI ingestion
Step 6: MONITOR    → Ongoing quality tracking in production</pre>
<h3>Data Mapping</h3>
<p>Data mapping documents the journey of each data element — where it originates, how it transforms, where it ends up. For AI systems, this is essential for debugging, compliance, and audit.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Data readiness is consistently underestimated. Teams allocate 20% of project time to data and 80% to building. In practice, data work takes 60–80% of the total project time.</p>
<p><strong>Example:</strong> A financial services firm spent 4 months building an AI credit assessment tool. When tested on real data, accuracy was 52% — barely better than random. Root cause: customer income data across 3 legacy systems used different formats, different currency assumptions, and different date ranges. The model had learned patterns from inconsistent data. Three months of data work followed before retraining.</p>
<p><strong>Why it matters:</strong> Data problems discovered in production are 10× more expensive to fix than data problems discovered before build.</p>
<p><strong>Implementation tip:</strong> Run a data quality audit on your intended AI data source before writing a single line of code or prompt. Score it across the 5 dimensions. Anything below 3/5 on quality or structure needs remediation before proceeding.</p>
<p><strong>💡 What This Saves You:</strong> A data readiness assessment before build typically saves 2–4 months of rework and prevents the most demoralising outcome in AI programs — a technically correct system producing wrong answers.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q6-1', text: 'Your AI model is producing outputs with 65% accuracy when you expected 90%+. After investigation, you find customer names are stored in 4 different formats across source systems. What dimension of data readiness has failed?', options: ['Availability', 'Governance', 'Standardisation / Consistency', 'Accessibility'], correct: 2, explanation: 'Inconsistent data formats are a standardisation failure. AI models learn patterns — if the same entity appears in 4 formats, the model learns 4 different patterns for the same thing, degrading accuracy.' },
        { id: 'q6-2', text: 'Before starting an AI project, what is the most valuable data readiness action you can take?', options: ['Buy more data storage', 'Profile your existing data across the 5 readiness dimensions before committing to a build timeline', 'Assume the data is good enough and start building', 'Hire a data scientist'], correct: 1, explanation: 'Profiling first gives you an objective baseline. It reveals the real timeline and cost of data preparation — which is almost always longer than initial estimates.' },
        { id: 'q6-3', text: 'Customer transaction data is stored in 3 separate legacy systems, each using different date formats and currency codes. What must happen before this data can be used for AI?', options: ['Feed it directly to the AI and let the model figure it out', 'Standardise formats and create a unified data model before AI ingestion', 'Use only the most recent system\'s data', 'Convert everything to text'], correct: 1, explanation: 'Data standardisation must precede AI ingestion. Mixing inconsistent formats creates noise that degrades model performance and produces unpredictable outputs.' },
        { id: 'q6-4', text: 'Your AI use case will process customer records that include health information. What data readiness dimension is most critical to assess?', options: ['Structure', 'Availability', 'Governance and compliance', 'Currency'], correct: 2, explanation: 'Health information is subject to strict regulatory controls (Privacy Act, HIPAA equivalents). Governance assessment must precede any use of sensitive personal data in AI systems.' },
        { id: 'q6-5', text: 'What is "data mapping" and why does it matter for AI systems?', options: ['A visualisation of where your data centres are located', 'Documentation of each data element\'s source, transformation, and destination — essential for debugging, compliance, and audit', 'A diagram showing which users can access which data', 'A process for moving data between systems'], correct: 1, explanation: 'Data lineage documentation (mapping) is essential for AI systems. When outputs are questioned — by regulators, customers, or leadership — you must be able to trace exactly what data produced them.' },
      ],
    },
  },
  {
    id: 'module-7', number: 7, icon: '🔧',
    title: 'Tools & Infrastructure',
    description: 'Select the right models, design your integration architecture, and manage costs at scale.',
    deliverable: 'AI Architecture Decision Document',
    templateId: 'architecture-decision',
    lessons: [
      {
        id: 'm7-l1', number: 1, tier: 'smb', duration: '28 min',
        title: 'Build vs Buy vs Configure — and Which Model to Choose',
        content: `<h2>The Most Expensive Decision in AI</h2>
<p>Architecture decisions made in week one lock in costs and constraints for years. This lesson gives you the framework to make them well.</p>
<h3>Build vs Buy vs Configure</h3>
<p><strong>Buy (SaaS AI tools):</strong> Pre-built solutions for common use cases. Fastest to value. Limited customisation. Best when your use case is standard and speed matters.</p>
<p><strong>Configure (Platform AI):</strong> AI capabilities embedded in your existing platforms — Microsoft Copilot, Salesforce Einstein, ServiceNow AI. Best when you're deeply embedded in a platform ecosystem and the use case fits its scope.</p>
<p><strong>Build (Custom implementation):</strong> Direct API integration with foundation models. Maximum flexibility and control. Highest upfront investment. Best when your use case is unique or requires data privacy control.</p>
<h3>Integration Patterns</h3>
<pre>Pattern 1 — Direct API
  Your system → AI API → Your system
  Best for: simple, low-volume use cases

Pattern 2 — Middleware  
  Trigger → Workflow tool → AI API → Output system
  Best for: multi-step workflows without engineering team

Pattern 3 — RAG Architecture
  Query → Retrieve relevant docs → AI synthesises → Answer
  Best for: knowledge base search, document Q&A

Pattern 4 — Agent Pattern
  Goal → AI plans steps → AI uses tools → Goal achieved
  Best for: complex multi-step autonomous tasks (use with guardrails)</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The "best" AI model is the one that meets your accuracy requirements at the lowest cost — not the most powerful one available.</p>
<p><strong>Example:</strong> A retail business evaluated GPT-4o, Claude 3.5, and GPT-4o-mini for product description generation. GPT-4o-mini matched the quality of the others for this specific task at 95% lower cost. The difference over 12 months: $2,400 vs $48,000 in API costs.</p>
<p><strong>Why it matters:</strong> Model selection is a business decision, not just a technical one. Always benchmark before committing.</p>
<p><strong>Implementation tip:</strong> Create a model evaluation matrix for your specific use case — score each candidate on accuracy, speed, cost, and data privacy compliance. Run 100 real examples before deciding.</p>
<p><strong>💡 What This Saves You:</strong> Structured architecture decisions save organisations an average of 40–70% in AI infrastructure costs compared to choosing based on brand recognition alone.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q7-1', text: 'Your organisation uses Microsoft 365 and wants to add AI to internal document search. What is the most logical starting architecture?', options: ['Build a custom RAG system from scratch', 'Use Microsoft Copilot or SharePoint AI — you\'re already in the ecosystem', 'Switch to Google Workspace for its AI features', 'Buy a standalone AI search tool'], correct: 1, explanation: 'When you\'re embedded in a platform ecosystem, using that platform\'s AI capabilities avoids integration complexity, data residency issues, and additional vendor relationships.' },
        { id: 'q7-2', text: 'You need to build an AI system that can answer questions using your company\'s 5-year archive of internal reports. Which architecture is most appropriate?', options: ['Fine-tune a model on your documents', 'RAG (Retrieval-Augmented Generation) — retrieve relevant sections, then generate answers', 'Use a chatbot with pre-programmed responses', 'Store all documents in the AI\'s system prompt'], correct: 1, explanation: 'RAG is the standard architecture for knowledge base Q&A. Fine-tuning is expensive and doesn\'t update dynamically. System prompt storage is limited by context windows.' },
        { id: 'q7-3', text: 'Which factor should be the primary driver of model selection for a production AI use case?', options: ['The model that appears most frequently in the news', 'The model used by your largest competitor', 'Benchmarked accuracy on your specific task type combined with cost-at-expected-volume', 'The model recommended by your AI vendor'], correct: 2, explanation: 'Task-specific benchmarking combined with cost modelling is the only reliable method. General benchmarks don\'t predict performance on your specific data and use case.' },
        { id: 'q7-4', text: 'An AI agent is being considered to autonomously handle customer refund requests end-to-end. What is the most important design consideration?', options: ['Choosing the most powerful model available', 'Defining clear guardrails, escalation triggers, and confidence thresholds before deployment', 'Making the agent as autonomous as possible', 'Ensuring the agent can access all customer data'], correct: 1, explanation: 'Agentic AI with financial consequences requires guardrails first. Define what the agent can and cannot do, when it escalates, and what confidence threshold triggers human review.' },
        { id: 'q7-5', text: 'Your AI use case requires that customer data never leaves your geographic region due to regulatory requirements. What architecture consideration is paramount?', options: ['Use the fastest model regardless of location', 'Select models and infrastructure with data residency controls that match your regulatory requirements', 'Use only on-premise solutions', 'Store data in an encrypted format before sending to any AI'], correct: 1, explanation: 'Data residency is a compliance requirement, not a preference. Azure OpenAI, AWS Bedrock, and Google Vertex all offer regional data residency. This must be evaluated before model selection.' },
      ],
    },
  },
  {
    id: 'module-8', number: 8, icon: '🏗️',
    title: 'Building Your Use Cases',
    description: 'Build the three highest-impact enterprise AI use cases: summarisation, triage, and reporting. With prompt design and testing frameworks.',
    deliverable: 'Use Case Build Plan',
    templateId: 'use-case-build',
    lessons: [
      {
        id: 'm8-l1', number: 1, tier: 'smb', duration: '30 min',
        title: 'Prompt Design, Testing, and Production Deployment',
        content: `<h2>From Prompt to Production</h2>
<p>A prompt is a program. It defines inputs, constraints, output format, and behaviour. Like all programs, it needs to be designed, tested, and versioned — not improvised.</p>
<h3>Prompt Design Principles</h3>
<p><strong>Be explicit about format:</strong> Specify exactly what structure you want. "Return a JSON object with keys: summary, sentiment, priority" is better than "summarise this".</p>
<p><strong>Define constraints:</strong> What should the model NOT do? "Only use information provided. Do not infer. If information is missing, say so."</p>
<p><strong>Include examples:</strong> Few-shot examples dramatically improve consistency. Show the model one correct input/output pair before asking it to process your real input.</p>
<p><strong>Set the persona:</strong> "You are a customer service quality analyst reviewing support tickets" produces better results than a generic prompt for classification tasks.</p>
<h3>Prompt Testing Framework</h3>
<pre>Phase 1: Unit testing (50 examples)
  → Manual review of output quality
  → Identify failure patterns
  → Iterate prompt

Phase 2: Edge case testing (100+ examples)
  → Intentionally challenging inputs
  → Missing data scenarios
  → Adversarial inputs

Phase 3: Volume testing
  → Run at expected production volume
  → Measure latency, cost, and accuracy
  → Identify degradation patterns</pre>
<h3>Case Summarisation — Production Architecture</h3>
<pre>System Prompt:
"You are a customer service assistant. Given the case 
history below, produce a structured summary:

CUSTOMER: [name, tier, tenure]
ISSUE: [one sentence — the core problem]
HISTORY: [3 bullet points of key prior interactions]
STATUS: [current state]
SENTIMENT: [Positive/Neutral/Frustrated/Escalated]
RECOMMENDED ACTION: [one specific next step]

Rules:
- Only use information provided
- Do not infer or assume
- If a field cannot be determined, write 'Unknown'
- Maximum 150 words total"

User: [case history text]</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The difference between a prompt that works in testing and one that works in production is almost always edge case handling. Production data is messier than test data.</p>
<p><strong>Example:</strong> A telco built a case summarisation tool. Testing on 50 clean examples gave 94% accuracy. In production, 12% of cases had missing fields, non-English characters, or internal codes the model hadn't seen. Accuracy dropped to 71% in week one. Edge case testing before go-live would have caught this.</p>
<p><strong>Why it matters:</strong> Production failures erode trust in AI faster than any other cause. One bad output seen by the wrong person can set a program back by months.</p>
<p><strong>Implementation tip:</strong> Collect 200 real examples from production data before testing. Include the 10% most unusual cases. If your prompt handles those, it handles anything.</p>
<p><strong>💡 What This Saves You:</strong> Systematic prompt testing before deployment prevents the trust damage of public AI failures — which typically cost 3–6 months of adoption recovery time.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q8-1', text: 'Your AI summarisation tool works well in testing but produces inconsistent output formats in production — sometimes JSON, sometimes plain text. What is the most likely cause?', options: ['The model is too small', 'The system prompt doesn\'t specify output format explicitly', 'The production data is too complex', 'The context window is too small'], correct: 1, explanation: 'Inconsistent output format is almost always a prompt specification issue. Explicit format instructions with examples dramatically improve consistency.' },
        { id: 'q8-2', text: 'You want to classify 500 customer enquiries into 6 categories. What is the minimum number of test examples you should evaluate before going to production?', options: ['10', '30', '100+', '500'], correct: 2, explanation: '100+ examples is the minimum for a meaningful accuracy benchmark. Less than that gives you insufficient coverage of edge cases and category distribution.' },
        { id: 'q8-3', text: 'A few-shot prompt includes 3 input/output examples before the actual task. What is the primary benefit of this approach?', options: ['It reduces token costs', 'It dramatically improves output consistency by showing the model exactly what format and quality you expect', 'It speeds up response time', 'It allows the model to learn permanently'], correct: 1, explanation: 'Few-shot examples are one of the most effective prompt engineering techniques. They anchor the model\'s output to your specific quality standard.' },
        { id: 'q8-4', text: 'Your AI triage system flags all escalated tickets with "URGENT". You discover that 40% of tickets flagged as urgent don\'t meet the business definition of urgent. What should you do?', options: ['Accept it — AI isn\'t perfect', 'Review and refine the criteria in your system prompt, add examples of urgent vs non-urgent cases, retest', 'Switch to a more powerful model', 'Add a human to review every ticket before action'], correct: 1, explanation: 'Precision failures (too many false positives) are fixed by refining criteria and adding negative examples to your prompt. Always diagnose before escalating to a more expensive model.' },
        { id: 'q8-5', text: 'At what stage should you measure token costs and latency in your testing process?', options: ['Only in production', 'During volume testing — after unit and edge case testing but before production', 'Before writing any prompts', 'It\'s not necessary to measure these during testing'], correct: 1, explanation: 'Volume testing measures real-world cost and latency at expected scale. Surprises here are manageable. Surprises in production are expensive.' },
      ],
    },
  },
  {
    id: 'module-9', number: 9, icon: '📈',
    title: 'ROI & Measurement',
    description: 'Build and present the financial case for AI investment. Token-based cost models, value frameworks, and executive reporting.',
    deliverable: 'Full ROI Model & Measurement Framework',
    templateId: 'roi-model',
    lessons: [
      {
        id: 'm9-l1', number: 1, tier: 'smb', duration: '28 min',
        title: 'Building the Complete AI ROI Model',
        content: `<h2>ROI Is Your Proof</h2>
<p>Without a credible ROI model, AI programs remain vulnerable to budget cuts the moment a more urgent priority emerges. With one, they become defensible investments with committed stakeholders.</p>
<h3>The Three Value Categories</h3>
<p><strong>Efficiency value:</strong> Cost saved through automation and time recovery.</p>
<pre>Annual efficiency value = 
  Time saved per person per day (hrs)
  × Number of people affected
  × Working days per year (250)
  × Fully loaded hourly cost ($)</pre>
<p><strong>Quality value:</strong> Error reduction, compliance improvement, output consistency.</p>
<pre>Annual quality value = 
  (Error rate reduction %)
  × (Cost per error × Annual errors)</pre>
<p><strong>Revenue value:</strong> Capacity freed enabling more revenue-generating activity.</p>
<pre>Annual revenue value = 
  Hours recovered per person per day
  × Conversion of hours to revenue-generating activity
  × Revenue per hour of productive time</pre>
<h3>The Complete KPI Framework</h3>
<p><strong>Primary KPI:</strong> The one metric that proves the use case is working. Baseline this before go-live.</p>
<p><strong>Secondary KPIs:</strong> Supporting metrics that explain the primary. Agent satisfaction. First contact resolution. Processing time.</p>
<p><strong>Guardrail KPIs:</strong> Metrics that must NOT worsen. Customer satisfaction. Error rate. Compliance incidents. If these move in the wrong direction, pause and investigate.</p>
<p><strong>Financial KPIs:</strong> Token cost per interaction. Monthly AI spend. Cost per automated task. ROI against baseline.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The most common ROI model failure is measuring the wrong things — activity metrics instead of outcome metrics. Counting AI calls tells you nothing. Counting time saved tells you everything.</p>
<p><strong>Example:</strong> A professional services firm measured "number of AI-generated drafts" as their primary KPI. At the 3-month review, the number was impressive. But when leadership asked "what did this save?", nobody knew — they hadn't measured baseline document creation time. The program lost funding despite working correctly.</p>
<p><strong>Why it matters:</strong> Measurement design must happen before go-live — you can't establish a baseline retrospectively.</p>
<p><strong>Implementation tip:</strong> Spend one week measuring baseline metrics before deploying AI. Time each process step. Count errors. Record volumes. This data is your proof of value.</p>
<p><strong>💡 What This Saves You:</strong> A properly measured AI program is virtually immune to budget cuts. An unmeasured one is cancelled at the first sign of organisational pressure.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q9-1', text: 'A team of 12 analysts each saves 2 hours per day due to AI automation. Their fully loaded cost is $80/hour and they work 250 days/year. What is the annual efficiency value?', options: ['$384,000', '$480,000', '$560,000', '$768,000'], correct: 1, explanation: '2 hrs × 12 people × 250 days × $80/hr = $480,000/year. This is the core efficiency value formula used in every AI business case.' },
        { id: 'q9-2', text: 'Why must baseline metrics be established BEFORE AI deployment?', options: ['They don\'t need to be — estimates are fine', 'Because you can\'t prove improvement without a starting point to compare against', 'Because regulators require it', 'To satisfy vendor contracts'], correct: 1, explanation: 'Without a pre-deployment baseline, you have no evidence of improvement. This is the single most common measurement failure in AI programs.' },
        { id: 'q9-3', text: 'Your AI system processes 800 interactions per day. The AI cost is $0.008 per interaction. Your team of 6 would have spent 45 minutes on each. At $65/hour, what is the daily net benefit?', options: ['$2,860', '$2,860 + daily AI cost reduction', '$2,925 value − $6.40 AI cost = $2,918.60 net benefit', '$6.40'], correct: 2, explanation: '6 people × 45min × $65/hr per interaction doesn\'t scale this way — value is: 800 interactions × 45min × ($65/60) = $39,000/day value for full automation. But realistically, 800 × $65 × 0.75hr = $39,000 value, minus $6.40 AI cost.' },
        { id: 'q9-4', text: 'Customer satisfaction scores drop from 4.2 to 3.8 after AI deployment. What type of KPI is this and what action should you take?', options: ['Primary KPI — celebrate the AI is being used', 'Guardrail KPI — pause and investigate the cause immediately', 'Secondary KPI — monitor for one more month', 'Financial KPI — reduce AI usage to cut costs'], correct: 1, explanation: 'Guardrail KPIs signal when AI is creating harm. A CSAT drop of this magnitude requires immediate investigation — the AI may be degrading customer experience despite operational efficiency gains.' },
        { id: 'q9-5', text: 'Which is the most credible way to present AI ROI to a sceptical CFO?', options: ['Show high-level estimates with optimistic assumptions', 'Present a conservative scenario with documented assumptions, baseline data, and a clear measurement methodology', 'Show competitor case studies only', 'Present the technology benefits without financial figures'], correct: 1, explanation: 'CFOs respond to methodology transparency and conservative assumptions. Documented baselines + conservative scenarios + clear measurement plan = credible business case.' },
      ],
    },
  },
  {
    id: 'module-10', number: 10, icon: '⚖️',
    title: 'Responsible AI',
    description: 'Build AI that is trustworthy, fair, explainable, and compliant — from day one, not as an afterthought.',
    deliverable: 'Responsible AI Framework',
    templateId: 'responsible-ai',
    lessons: [
      {
        id: 'm10-l1', number: 1, tier: 'enterprise', duration: '25 min',
        title: 'Bias, Hallucination, Governance, and Guardrails',
        content: `<h2>Responsible AI Is Not Optional</h2>
<p>Responsible AI isn't ethics for its own sake — it's risk management. AI systems that are biased, opaque, or ungoverned create legal, reputational, and operational liabilities that dwarf the cost of getting it right upfront.</p>
<h3>Bias: Where It Comes From and How to Catch It</h3>
<p><strong>Training data bias:</strong> If historical data reflects past discrimination or imbalance, the model learns and replicates it. A hiring AI trained on historical acceptance data will perpetuate historical biases.</p>
<p><strong>Measurement bias:</strong> If you measure outcomes only for some groups, the model optimises for those groups.</p>
<p><strong>Feedback loop bias:</strong> AI decisions influence future data which trains future models — compounding initial biases over time.</p>
<p><strong>Detection approach:</strong> Test your model's outputs across demographic segments. If performance differs significantly between groups, investigate the cause before deploying.</p>
<h3>Hallucination: Design for It, Don't Hope Against It</h3>
<p>Hallucination is not a bug to be fixed — it's a fundamental property of probabilistic language models. Design your systems assuming hallucination will occur.</p>
<p><strong>Guardrail design:</strong> Never allow AI to be the only source for consequential decisions. Human review, confidence thresholds, and source citation requirements all reduce hallucination risk.</p>
<p><strong>RAG as mitigation:</strong> Grounding AI responses in retrieved documents dramatically reduces hallucination because the model is constrained to cite its source material.</p>
<h3>The Governance Framework</h3>
<pre>1. ACCOUNTABILITY  → Named owner for every AI system
2. TRANSPARENCY    → AI Use Register: what AI does, where, with what data
3. EXPLAINABILITY  → Can you explain why AI made each decision?
4. CONTROL         → Kill switch: can you pause any system within minutes?
5. IMPROVEMENT     → Regular review cycles. Undreviewed AI degrades.</pre>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The organisations that treat responsible AI as a compliance checkbox are the ones that end up in the news for the wrong reasons.</p>
<p><strong>Example:</strong> A recruitment platform deployed AI screening that achieved 85% efficiency improvement. 18 months later, an audit revealed the model was systematically downranking candidates from certain postcodes — a proxy for socioeconomic background. The business faced regulatory investigation, significant legal costs, and had to rebuild their entire screening process. Bias testing before deployment would have cost $15,000. The remediation cost $2.3 million.</p>
<p><strong>Why it matters:</strong> AI bias and governance failures are not edge cases — they're predictable outcomes of deploying AI without responsible design.</p>
<p><strong>Implementation tip:</strong> Before any AI deployment, complete a Responsible AI checklist covering: bias testing, explainability requirements, data privacy review, governance ownership, and incident response plan.</p>
<p><strong>💡 What This Saves You:</strong> Responsible AI design prevents the most catastrophic AI outcomes — regulatory action, litigation, and reputational damage — which routinely cost 100× more than the prevention.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q10-1', text: 'An AI loan approval system approves 78% of applications from Group A but only 43% of applications from Group B with similar financial profiles. This is an example of:', options: ['Expected AI variability', 'Algorithmic bias — the model is producing systematically different outcomes for different groups', 'A calibration setting that needs adjustment', 'Normal statistical distribution'], correct: 1, explanation: 'Systematic outcome differences between groups with similar profiles is the definition of algorithmic bias. This requires immediate investigation of training data and model behaviour before any further deployment.' },
        { id: 'q10-2', text: 'Which design approach most effectively reduces AI hallucination risk in a customer-facing knowledge base?', options: ['Using a more powerful model', 'RAG — grounding AI responses in retrieved source documents with citation requirements', 'Increasing response length limits', 'Using temperature setting of 0'], correct: 1, explanation: 'RAG constrains the model to retrieved sources, dramatically reducing hallucination. Citation requirements allow users to verify claims. This is the gold standard for factual accuracy in knowledge-based applications.' },
        { id: 'q10-3', text: 'Your AI system makes a credit decision that a customer wants to challenge. What governance requirement must be in place?', options: ['The decision doesn\'t need to be explained — AI is objective', 'Explainability — the ability to provide a meaningful explanation of why the AI reached that decision', 'Only the model\'s accuracy statistics need to be provided', 'The customer can appeal but the AI decision stands'], correct: 1, explanation: 'Explainability is a regulatory requirement in many jurisdictions for consequential automated decisions (credit, employment, insurance). It must be designed in from the start.' },
        { id: 'q10-4', text: 'You discover your AI system has been producing incorrect outputs for 3 days. What governance capability must exist to respond effectively?', options: ['A public apology plan', 'A kill switch — the ability to pause or shut down the system within minutes, and an incident response plan', 'A model retrain procedure', 'A customer notification template'], correct: 1, explanation: 'A documented kill switch procedure is a non-negotiable governance requirement. Every AI system needs a rapid shutdown capability and a defined incident response process.' },
        { id: 'q10-5', text: 'Responsible AI governance requires that every deployed AI system has:', options: ['Only technical documentation', 'A named accountable owner, a use register entry, a review cadence, and a shutdown procedure', 'Regulatory approval before use', 'An external audit each year'], correct: 1, explanation: 'The minimum governance requirements for any production AI system: named owner (accountability), use register entry (transparency), review cadence (improvement), shutdown procedure (control).' },
      ],
    },
  },
  {
    id: 'module-11', number: 11, icon: '🌱',
    title: 'Sustainability & AI',
    description: 'Understand the energy and carbon footprint of AI — and build practices that optimise impact.',
    deliverable: 'AI Sustainability Checklist',
    templateId: 'sustainability-checklist',
    lessons: [
      {
        id: 'm11-l1', number: 1, tier: 'enterprise', duration: '20 min',
        title: 'The Environmental Impact of AI and How to Optimise It',
        content: `<h2>AI Has a Carbon Footprint</h2>
<p>Every AI inference — every call to a language model — consumes energy. At individual scale, this is negligible. At enterprise scale, with millions of calls per month, it becomes a meaningful part of your organisation's environmental footprint.</p>
<h3>The Energy Reality</h3>
<p><strong>Training vs inference:</strong> Training a large model like GPT-4 consumed an estimated 50+ gigawatt-hours of electricity — equivalent to the annual energy use of several hundred homes. Your usage doesn't contribute to training costs, but inference at scale adds up.</p>
<p><strong>Inference energy:</strong> A single GPT-4 query consumes approximately 10× the energy of a standard Google search. At 10,000 queries per day, that's the energy equivalent of 100,000 searches daily.</p>
<p><strong>Data centre water usage:</strong> AI data centres use significant water for cooling. Microsoft reported that training GPT-4 consumed approximately 700,000 litres of water.</p>
<h3>Sustainability Optimisation Strategies</h3>
<p><strong>Right-size your model:</strong> Using a smaller model for tasks that don't require frontier capabilities is both cost-effective and more energy-efficient. GPT-4o-mini uses significantly less energy per call than GPT-4o.</p>
<p><strong>Implement caching:</strong> Caching responses for repeated queries eliminates redundant AI calls entirely. For FAQ-style applications, cache hit rates of 40–70% are achievable.</p>
<p><strong>Batch processing:</strong> Processing multiple requests in a single API call is more energy-efficient than individual calls. Applicable for non-real-time use cases.</p>
<p><strong>Choose green infrastructure:</strong> Cloud providers differ significantly in their renewable energy commitments. Google Cloud and Microsoft Azure both offer carbon-neutral commitments in certain regions.</p>
<p><strong>Measure and report:</strong> Include AI energy usage in your environmental reporting. Most major cloud providers offer carbon dashboards that track compute emissions.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Sustainability and cost efficiency in AI are almost perfectly aligned — the strategies that reduce energy consumption reduce costs by the same proportion.</p>
<p><strong>Example:</strong> A retail business running 500,000 AI queries per month implemented response caching for their top 200 FAQ queries. Cache hit rate reached 55% within 30 days. Result: 275,000 fewer AI calls per month, 45% reduction in AI costs, and a measurable reduction in their compute carbon footprint that was reported in their annual sustainability disclosure.</p>
<p><strong>Why it matters:</strong> As ESG reporting requirements expand, AI's environmental impact will become a material disclosure item for many organisations. Building sustainable AI practices now avoids future compliance costs.</p>
<p><strong>Implementation tip:</strong> Add an "AI Energy Efficiency" metric to your AI governance dashboard: track tokens consumed per unit of value delivered. Optimise this metric over time as you would any operational efficiency metric.</p>
<p><strong>💡 What This Saves You:</strong> Sustainable AI practices reduce operating costs by 20–50% through right-sizing and caching while positioning your organisation ahead of emerging ESG disclosure requirements for AI.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q11-1', text: 'Your AI system makes 200,000 calls per month to GPT-4o. You discover 60% of calls ask similar questions. What is the most impactful sustainability action?', options: ['Switch to a different cloud provider', 'Implement response caching — eliminating 120,000 redundant calls per month', 'Reduce the number of users', 'Switch to a smaller model only'], correct: 1, explanation: 'Caching eliminates calls entirely — the most effective sustainability and cost action. 60% cache hit rate means 120,000 fewer calls, 120,000 fewer energy-consuming inferences.' },
        { id: 'q11-2', text: 'From a sustainability perspective, using GPT-4o for simple text classification tasks instead of a smaller model is:', options: ['Recommended for maximum accuracy', 'Wasteful — larger models consume more energy and cost more for tasks smaller models handle equally well', 'Required for enterprise use cases', 'No different from a sustainability standpoint'], correct: 1, explanation: 'Right-sizing models is fundamental to sustainable AI. Larger models consume significantly more energy per inference. If a smaller model meets accuracy requirements, it should be used.' },
        { id: 'q11-3', text: 'Your organisation is required to include AI in its annual sustainability disclosure. What metrics should you track?', options: ['Only the number of AI users', 'Compute energy consumption, estimated carbon emissions, water usage (if applicable), and efficiency improvements over time', 'Model accuracy scores', 'API call volumes only'], correct: 1, explanation: 'Meaningful sustainability disclosure requires actual impact metrics, not proxy metrics. Cloud providers offer carbon dashboards that provide the underlying data for these calculations.' },
        { id: 'q11-4', text: 'Batch processing AI requests rather than real-time processing primarily benefits:', options: ['Response quality', 'User experience', 'Energy efficiency and cost — multiple items processed together require less overhead than individual calls', 'Model accuracy'], correct: 2, explanation: 'Batching reduces per-unit energy and cost by eliminating repeated API connection overhead. Applicable for any use case that doesn\'t require immediate real-time response.' },
        { id: 'q11-5', text: 'Why is there a strong alignment between AI cost optimisation and AI sustainability?', options: ['There isn\'t — they often conflict', 'Because energy consumption directly drives both token costs and carbon emissions — reducing one reduces the other', 'Because cheaper models are always more sustainable', 'Because sustainability reporting reduces model prices'], correct: 1, explanation: 'Token cost reflects compute cost, which reflects energy consumption. Every optimisation that reduces tokens (caching, right-sizing, prompt compression) reduces both cost and energy use simultaneously.' },
      ],
    },
  },
  {
    id: 'module-12', number: 12, icon: '🤝',
    title: 'People, Change & Adoption',
    description: 'Technology is 20% of an AI program. People are 80%. Build the adoption strategy that makes AI stick — and the opportunity map that makes people want it to.',
    deliverable: 'Adoption Strategy + Opportunity Creation Plan',
    templateId: 'adoption-plan',
    lessons: [
      {
        id: 'm12-l1', number: 1, tier: 'smb', duration: '28 min',
        title: 'Adoption Strategy, Resistance Management, and Role Evolution',
        content: `<h2>Why People Resist AI — and How to Change That</h2>
<p>Resistance to AI is rational. People protecting their roles, their expertise, and their value are doing exactly what they should be doing. Your job isn't to overcome that resistance — it's to show them a better version of the future that includes them.</p>
<h3>The Adoption Strategy Framework</h3>
<p><strong>Phase 1 — Awareness:</strong> Help people understand what AI is and isn't. Most resistance comes from fear of science fiction scenarios, not realistic ones. Education reduces anxiety before it becomes resistance.</p>
<p><strong>Phase 2 — Demonstration:</strong> Show, don't tell. A 15-minute demonstration of AI saving 2 hours of work does more than 10 executive presentations. Let people experience the tool before they're asked to adopt it.</p>
<p><strong>Phase 3 — Involvement:</strong> Include frontline users in the design and testing of AI tools. People adopt what they helped build. Exclusion creates opposition.</p>
<p><strong>Phase 4 — Support:</strong> Intensive support during the first 30 days of adoption. Champions available for questions. Clear escalation path for problems. Regular feedback loops.</p>
<p><strong>Phase 5 — Embedding:</strong> Make AI the default workflow, not the optional one. Integrate into existing tools and processes. Measure adoption explicitly and celebrate milestones.</p>
<h3>Stakeholder Mapping</h3>
<pre>For each stakeholder group, document:
  - Current attitude (Advocate / Neutral / Resistant)
  - Primary concern or objection
  - Their definition of "what's in it for me"
  - Communication approach
  - Engagement touchpoints</pre>
<h3>Opportunity Creation: The Future of Roles</h3>
<p>The most powerful adoption tool is showing people what they will do with the time AI recovers for them. AI doesn't eliminate roles — it eliminates the worst parts of roles and creates space for higher-value work.</p>
<p><strong>Role evolution framework:</strong></p>
<pre>Current role activities → AI handles → Human focuses on
───────────────────────────────────────────────────────
Manual data entry        → Automated   → Analysis & insight
Routine report writing   → Generated   → Strategic interpretation
Email triage             → Automated   → Complex relationship management
Document summarisation   → AI-produced → Decision-making & judgment
Standard Q&A responses   → Automated   → Escalations & experience design</pre>
<h3>Future Skills That AI Makes More Valuable</h3>
<p>Critical thinking · Complex judgment · Emotional intelligence · Creative problem-solving · Ethical reasoning · AI prompt design and quality review · Stakeholder communication · Systems thinking</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The organisations with highest AI adoption rates share one characteristic — they actively co-created opportunity maps showing staff what new roles and activities become available when AI handles the routine.</p>
<p><strong>Example:</strong> A financial services contact centre deployed AI to handle 60% of routine enquiries. Before launch, leadership presented two scenarios: "AI replaces 40% of staff" vs "AI frees 40% of staff time to handle complex cases and become AI quality reviewers, with a 15% salary uplift for those roles". Same technology. Completely different adoption outcome — 87% adoption in the second scenario vs projected resistance and attrition in the first.</p>
<p><strong>Why it matters:</strong> How you frame AI transformation determines whether your best people stay and adopt it, or leave and undermine it.</p>
<p><strong>Implementation tip:</strong> Before announcing any AI initiative, draft the "opportunity map" — a concrete description of what people will do with the time recovered. Make this the centrepiece of your communication, not the technology.</p>
<p><strong>💡 What This Saves You:</strong> Effective change management prevents the 40–70% of AI programs that technically succeed but fail through non-adoption — delivering none of the projected value despite full investment.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q12-1', text: 'Three months after deploying an AI tool that genuinely works, only 22% of the team is using it. What is the most likely cause?', options: ['The AI isn\'t good enough', 'Insufficient change management — adoption strategy, communication, and support were inadequate', 'The tool is too complex', 'The team wasn\'t informed about the tool'], correct: 1, explanation: 'A working tool with low adoption is almost always a change management failure. Technology readiness and people readiness are separate problems requiring separate solutions.' },
        { id: 'q12-2', text: 'A team member says "AI is going to take my job." What is the most effective response?', options: ['Reassure them that won\'t happen without evidence', 'Show them a concrete opportunity map — what their role looks like with AI handling the routine work, and what higher-value activities become available', 'Explain the technology limitations', 'Ask HR to manage the conversation'], correct: 1, explanation: 'Concrete opportunity mapping — showing specifically what higher-value work becomes available — is significantly more effective than general reassurance. People need to see their future role, not just be told it exists.' },
        { id: 'q12-3', text: 'Which approach produces the highest AI adoption rates according to change management research?', options: ['Top-down mandate from leadership', 'Co-creation — involving frontline users in design, testing, and feedback before launch', 'Financial incentives for using the tool', 'Making the old process unavailable'], correct: 1, explanation: 'Co-creation is the most consistently effective adoption strategy. People adopt what they helped build. Involvement creates ownership. Exclusion creates opposition.' },
        { id: 'q12-4', text: 'What is an "opportunity map" in the context of AI change management?', options: ['A diagram of AI implementation risks', 'A document showing stakeholders specifically what higher-value activities become available when AI handles routine tasks', 'A map of which departments need AI most', 'A project plan for AI deployment'], correct: 1, explanation: 'An opportunity map is a practical tool that answers "what do I do with the time AI saves me?" It transforms AI from a threat to a career enabler — the most powerful reframing in change management.' },
        { id: 'q12-5', text: 'At what point in an AI program should you begin stakeholder mapping?', options: ['After technical build is complete', 'After the pilot is done', 'Before any technical work begins — stakeholder mapping informs design and communication from day one', 'At the change management phase'], correct: 2, explanation: 'Stakeholder mapping is an input to design, not an output of it. Knowing who will resist and why shapes what you build, how you test it, and how you communicate before launch.' },
      ],
    },
  },
  {
    id: 'module-13', number: 13, icon: '🎛️',
    title: 'Multimodal AI & Orchestration',
    description: 'Go beyond text. Design multi-model workflows using text, image, voice, and agentic AI — with cost trade-offs and fallback strategies.',
    deliverable: 'AI Orchestration Blueprint',
    templateId: 'orchestration-blueprint',
    lessons: [
      {
        id: 'm13-l1', number: 1, tier: 'enterprise', duration: '30 min',
        title: 'Text, Image, Voice: Designing Multimodal Workflows',
        content: `<h2>Beyond Text: The Multimodal Opportunity</h2>
<p>The next wave of AI value in business doesn't come from better text models — it comes from combining modalities. Text plus image plus voice plus action creates workflows that weren't possible two years ago.</p>
<h3>The Four Modalities and Their Business Applications</h3>
<p><strong>Text (LLMs):</strong> The foundation. Summarisation, classification, generation, reasoning. The modality with the most mature tooling and the widest range of applications.</p>
<p><strong>Image (Vision models):</strong> Document processing (invoices, forms, medical images), quality inspection, visual search, content moderation, accessibility (image description).</p>
<p><strong>Voice (Speech models):</strong> Call centre analytics, meeting transcription and summarisation, voice-enabled workflows, real-time translation, accessibility.</p>
<p><strong>Structured action (Agentic AI):</strong> Autonomous multi-step task execution using tools — web search, database query, API calls, form completion. Emerging rapidly.</p>
<h3>Multimodal Workflow Design</h3>
<pre>Example: Invoice Processing Workflow
  Step 1: Image model → Extract structured data from invoice image
  Step 2: LLM → Validate extracted data against expected format
  Step 3: LLM → Flag anomalies and generate exception report  
  Step 4: API → Post validated invoice to accounting system
  Result: 95% straight-through processing, 5% human review queue</pre>
<h3>Orchestration Layer Design</h3>
<p>Orchestration is the layer that coordinates multiple AI models and tools to complete a complex task. It handles routing (which model for which task), context management (passing relevant information between steps), error handling, and monitoring.</p>
<pre>Orchestration components:
  Router      → Decides which model handles each step
  Context mgr → Passes relevant information between steps
  Error handler → Manages failures and fallbacks
  Monitor     → Tracks cost, latency, and accuracy
  Guardrails  → Enforces rules and safety constraints</pre>
<h3>Cost Trade-offs Across Modalities</h3>
<p>Multimodal workflows can be significantly more expensive than text-only. Image processing typically costs 5–20× more per interaction than text. Voice transcription adds cost at the front of the pipeline. Agent tasks that make multiple API calls multiply token usage.</p>
<p><strong>Fallback strategy:</strong> Design cheaper fallback paths for when expensive model calls aren't necessary. Route simple text queries to text models only, invoking image or voice models only when the input requires it.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The organisations seeing the highest AI ROI in 2024-25 are combining modalities — not adding more of the same modality.</p>
<p><strong>Example:</strong> A property management company built a multimodal maintenance workflow. Tenants photograph the issue (image model extracts defect type and severity), describe it by voice (speech model transcribes and extracts key details), and the orchestration layer creates a prioritised work order with contractor assignment based on severity, location, and contractor availability. What previously took 48 hours of back-and-forth now completes in 4 minutes. Volume processed: 3× higher with the same team.</p>
<p><strong>Why it matters:</strong> Multimodal AI enables workflows that are genuinely impossible with human-only processes at scale — not just the same process done faster.</p>
<p><strong>Implementation tip:</strong> Start with one modality, prove value, then add the second modality to the same workflow. The jump from text-only to text+image is the highest-value first multimodal step for most businesses.</p>
<p><strong>💡 What This Saves You:</strong> Multimodal AI design prevents the "AI ceiling" — the point where you've automated all your text workflows and wonder what's next. Multimodal is what's next.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q13-1', text: 'A customer sends a photo of a damaged product alongside a written complaint. Which AI architecture handles this most effectively?', options: ['Text-only LLM that reads the written complaint', 'A multimodal model or orchestrated pipeline that processes both the image (damage assessment) and text (complaint classification) together', 'Image model only', 'Route to a human — AI can\'t handle this'], correct: 1, explanation: 'Multimodal processing enables simultaneous handling of both inputs. The image provides damage evidence that the text cannot convey — combining both gives complete context for automated resolution.' },
        { id: 'q13-2', text: 'Your orchestrated AI workflow calls an image model, then an LLM, then an API, totalling 8,000 tokens per transaction. At 1,000 transactions per day, how does this compare in cost to a text-only workflow using 1,500 tokens?', options: ['Same cost', 'The orchestrated workflow costs approximately 5.3× more in token terms — image tokens are also priced differently', 'The orchestrated workflow is cheaper because it\'s automated', 'Cannot be compared'], correct: 1, explanation: 'Multi-step orchestrated workflows multiply token costs at each step. Image tokens are priced separately and typically at a premium. Cost modelling must account for every step in the pipeline.' },
        { id: 'q13-3', text: 'What is the primary purpose of an orchestration layer in a multi-model AI workflow?', options: ['To make the AI smarter', 'To reduce hallucination', 'To coordinate multiple models and tools — routing, context passing, error handling, and monitoring', 'To improve response speed'], correct: 2, explanation: 'Orchestration is the coordination infrastructure of multi-model workflows. Without it, multi-model systems become unmanageable, costs spiral, and errors compound across steps.' },
        { id: 'q13-4', text: 'A voice AI transcription service has 95% accuracy for Australian English but 72% accuracy for customers with strong accents. What should you do?', options: ['Accept 72% as reasonable for accented speech', 'Implement a confidence threshold — below 85% accuracy routes to human transcription, with ongoing accent-specific model fine-tuning', 'Remove the service for those customer segments', 'Use a different language model'], correct: 1, explanation: 'Accuracy thresholds with human fallback maintain service quality while you improve model performance for underserved segments. This is responsible AI design for multimodal systems.' },
        { id: 'q13-5', text: 'What is the recommended approach when introducing multimodal AI to an organisation new to AI?', options: ['Deploy full multimodal orchestration immediately for maximum impact', 'Start with one modality, prove value and build capability, then add the second modality to the same workflow', 'Skip text-only AI and go straight to multimodal', 'Use multimodal only for enterprise tier'], correct: 1, explanation: 'Phased modality introduction reduces risk and builds organisational confidence. Each modality adds complexity and cost. Proving value before adding complexity is the right sequencing.' },
      ],
    },
  },
  {
    id: 'module-14', number: 14, icon: '🚀',
    title: '90-Day Execution Plan',
    description: 'Build your week-by-week plan from approved use case to live, measured AI in production. Sequenced. Realistic. Deliverable.',
    deliverable: '90-Day AI Execution Roadmap',
    templateId: '90-day-plan',
    lessons: [
      {
        id: 'm14-l1', number: 1, tier: 'enterprise', duration: '30 min',
        title: 'Prioritisation, Sequencing, and the 90-Day Roadmap',
        content: `<h2>From Plan to Production in 90 Days</h2>
<p>90 days is enough to take a prioritised use case from approved investment to live, measured AI in production. The teams that fail this timeline share one characteristic: they underestimate the non-technical work.</p>
<h3>Phase 1: Foundation (Weeks 1–4)</h3>
<pre>Week 1 — Discovery & Confirmation
  □ AI Readiness Assessment completed (Module 1)
  □ Role mapping confirmed (Module 2)
  □ Top 3 use cases identified (Module 3)
  □ Prioritisation scores completed (Module 4)
  □ Use case 1 selected and stakeholder-approved

Week 2 — Design
  □ Workflow blueprint completed (Module 5)
  □ Data readiness assessed (Module 6)
  □ Data remediation plan in place
  □ Architecture decision made (Module 7)

Week 3 — Financial Case
  □ 5-year cost model completed (Module 4)
  □ Baseline metrics established (Module 9)
  □ ROI model presented and approved
  □ Responsible AI checklist completed (Module 10)

Week 4 — Setup
  □ Tool/platform procurement complete
  □ Data preparation underway
  □ Technical environment configured
  □ Change management plan drafted (Module 12)</pre>
<h3>Phase 2: Build (Weeks 5–10)</h3>
<pre>Weeks 5–6 — Build
  □ Prompt design and unit testing (Module 8)
  □ Integration development
  □ Edge case testing (100+ examples)
  □ Cost and latency measurement

Weeks 7–8 — Pilot
  □ 3–5 user pilot launched
  □ Structured feedback collected daily
  □ Accuracy measured against baseline
  □ Prompt iteration based on real data

Weeks 9–10 — Hardening
  □ Exception handling tested
  □ Logging and monitoring configured
  □ User training materials complete
  □ Adoption plan activated (Module 12)</pre>
<h3>Phase 3: Launch (Weeks 11–12)</h3>
<pre>Week 11 — Controlled Launch
  □ Full team rollout
  □ Daily monitoring active
  □ Champion support programme running
  □ Feedback channels open

Week 12 — Measure & Report
  □ Month 1 ROI calculated
  □ Stakeholder report prepared
  □ Lessons learned documented
  □ Use case 2 planning begins</pre>
<h3>Sequencing Principles</h3>
<p><strong>Quick win first:</strong> Use case 1 should be deliverable in 90 days. Use the ROI and confidence to fund use case 2.</p>
<p><strong>Build reusable infrastructure:</strong> Every use case should leave behind reusable components — prompt libraries, data pipelines, integration patterns — that make use case 2 faster and cheaper.</p>
<p><strong>Don't start use case 2 until use case 1 is measured:</strong> You need the proof before the next investment conversation.</p>
<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The teams that complete successful 90-day AI deployments share one discipline: they protect the plan from scope creep relentlessly. Every week of scope expansion adds two weeks of delay.</p>
<p><strong>Example:</strong> A professional services firm planned a 90-day deployment of an AI proposal drafting tool. At week 6, leadership requested they also automate the pricing model and client reporting. The project lead declined, delivered the drafting tool on day 88, reported 68% time reduction in proposal creation, and used that result to secure a larger budget for the expanded scope in the next quarter. The alternative — agreeing to scope expansion — would have delivered nothing on day 90 and likely nothing by month 6.</p>
<p><strong>Why it matters:</strong> A delivered 60% solution is worth infinitely more than a perfect solution that never ships.</p>
<p><strong>Implementation tip:</strong> Create a "parking lot" for good ideas that arrive mid-project. Write them down, acknowledge them, commit to evaluating them in the next planning cycle. This respects the idea without derailing the delivery.</p>
<p><strong>💡 What This Saves You:</strong> Disciplined 90-day execution produces the proof of value that funds every subsequent AI investment. Without it, AI programs are perpetually "in progress" and perpetually vulnerable to cancellation.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q14-1', text: 'At week 6 of a 90-day AI project, your CEO asks you to add two new features that weren\'t in the original scope. What is the right response?', options: ['Add them immediately — leadership requests take priority', 'Evaluate the impact on timeline, add them to a parking lot, deliver the original scope on time, and include the new features in the next cycle', 'Cancel the project and restart with the new requirements', 'Add one feature and drop one from the original scope'], correct: 1, explanation: 'Scope management is the primary determinant of 90-day delivery success. A parking lot respects the idea while protecting the delivery. Proof of value funds everything that follows.' },
        { id: 'q14-2', text: 'Why should baseline metrics be established in Week 3 rather than after deployment?', options: ['It doesn\'t matter when you establish them', 'Because you cannot prove improvement without a pre-deployment benchmark — retrospective baselines are estimates, not evidence', 'Because Week 3 is the only time stakeholders are available', 'So you can adjust the AI to match the baseline'], correct: 1, explanation: 'Pre-deployment baselines are evidence. Post-deployment estimates are guesses. Every AI program needs documented baseline metrics before go-live to produce credible ROI measurements.' },
        { id: 'q14-3', text: 'What is the minimum pilot size recommended before full team rollout?', options: ['1 person', '3–5 users', '50% of the team', 'No pilot needed — go straight to full deployment'], correct: 1, explanation: '3–5 users is the minimum meaningful pilot. Small enough to manage feedback intensively. Large enough to surface real-world edge cases that testing missed. Essential quality gate before full deployment.' },
        { id: 'q14-4', text: 'You successfully deploy use case 1 in 90 days with a documented 52% time reduction. When should you begin use case 2?', options: ['Immediately — momentum is critical', 'After presenting the use case 1 results and securing investment approval for use case 2', 'Only after 12 months of use case 1 data', 'Use case 2 should run in parallel with use case 1'], correct: 1, explanation: 'The result of use case 1 is the business case for use case 2. Present before proceeding. This creates a self-funding AI program where each success funds the next.' },
        { id: 'q14-5', text: 'What infrastructure should every AI use case leave behind for future projects?', options: ['Nothing — each use case is independent', 'Reusable components: prompt libraries, data pipelines, integration patterns, and lessons learned documentation', 'A full rebuild of the technical environment', 'Only the final model output'], correct: 1, explanation: 'Reusable infrastructure is what makes AI programs compound in value. Use case 2 built on use case 1\'s foundations should take 40–60% less time to deliver.' },
      ],
    },
  },
]

export const ALL_LESSONS = MODULES.flatMap(m =>
  m.lessons.map(l => ({
    ...l, moduleId: m.id, moduleNumber: m.number,
    moduleTitle: m.title, moduleIcon: m.icon,
  }))
)

export const getLessonsForTier = (tier) => {
  const order = ['individual', 'smb', 'enterprise']
  const level = order.indexOf(tier)
  return ALL_LESSONS.filter(l => order.indexOf(l.tier) <= level)
}
