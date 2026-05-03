// data/modules.js — Full 16-module Le On AI curriculum
// Each module includes: lessons, Q&A questions, real-world practice section

export const MODULES = [
  {
    id: 'module-1', number: 1, icon: '🧠',
    title: 'AI Foundations',
    description: 'Cut through the noise. Understand what AI is, how models work, what tokens cost, how to write production-quality prompts, and how to apply AI in your daily work this week.',
    deliverable: 'AI Readiness Assessment + Prompt Library Starter',
    templateId: 'ai-readiness',
    lessons: [
      {
        id: 'm1-l1', number: 1, tier: 'individual', duration: '20 min',
        title: 'Introduction to AI: What It Is and Isn\'t',
        content: `<h2>What AI Actually Is</h2>
<p>Artificial Intelligence is pattern recognition at scale. Every AI system — from ChatGPT to Netflix recommendations to fraud detection — does one thing: it finds patterns in data and uses those patterns to predict the most useful output. It does not think. It does not understand. It predicts.</p>
<p>That distinction is not academic. It determines what AI can and cannot do, where it succeeds and where it fails, and why "just ask the AI" is not a strategy.</p>

<h3>The Three Categories You Need to Know</h3>
<table>
<thead><tr><th>Category</th><th>What It Is</th><th>Where We Are</th><th>Your Action</th></tr></thead>
<tbody>
<tr><td><strong>Narrow AI</strong></td><td>Designed for one specific task. Exceptional at it. Useless at everything else.</td><td>Here now. GPT-4o, DALL-E, Whisper, AlphaFold.</td><td>This is what you build with today.</td></tr>
<tr><td><strong>Agentic AI</strong></td><td>Takes sequences of autonomous actions to achieve a goal using tools and reasoning.</td><td>Emerging in 2024–2025. In production at leading orgs.</td><td>Pilot now. Govern carefully.</td></tr>
<tr><td><strong>General AI</strong></td><td>Performs any intellectual task a human can.</td><td>Not here yet.</td><td>Ignore for your 90-day plan.</td></tr>
</tbody>
</table>

<h3>The Workflow Gap — Where AI Value Actually Lives</h3>
<p>Most organisations ask "what can AI do?" The better question is "where in our workflows is there a gap between manual effort and business value?"</p>
<p>AI value isn't in the model. It's in identifying a specific process step where:</p>
<ul>
<li>The input is consistent enough for AI to process reliably</li>
<li>The output is defined clearly enough to be measurable</li>
<li>The volume is high enough that automation has meaningful impact</li>
<li>The manual cost is high enough that savings justify implementation</li>
</ul>
<p>Find that gap first. Then choose the AI. Not the other way around.</p>

<h3>AI Myths vs Reality — The 8 You Will Encounter</h3>
<table>
<thead><tr><th>The Myth</th><th>The Reality</th><th>What To Do Instead</th></tr></thead>
<tbody>
<tr><td>"AI understands our business"</td><td>AI predicts based on patterns. It has no understanding. It needs explicit instructions for every context.</td><td>Write precise prompts. Assume nothing is implied.</td></tr>
<tr><td>"Bigger model = better results"</td><td>For most business tasks, smaller cheaper models match frontier quality.</td><td>Benchmark 3 models before committing to one.</td></tr>
<tr><td>"AI will replace our team"</td><td>AI replaces specific tasks within roles. Roles evolve — they rarely disappear in the first wave.</td><td>Map tasks to automation. Plan role evolution.</td></tr>
<tr><td>"We need to wait for AI to mature"</td><td>GPT-4 level capability has existed since 2023. The cost of waiting is real and measurable.</td><td>Calculate the annual cost of your top 3 manual processes. That's your delay cost.</td></tr>
<tr><td>"AI is objective and unbiased"</td><td>AI reflects its training data. Biased historical data produces biased outputs.</td><td>Test accuracy across demographic groups for any consequential AI decision.</td></tr>
<tr><td>"You need data scientists"</td><td>No-code AI tools handle most SMB use cases. API-level integration requires one developer, not a team.</td><td>Start with turnkey tools. Custom build only when off-the-shelf fails.</td></tr>
<tr><td>"AI is always right"</td><td>It hallucinates. It's confidently wrong. Design your workflow around this — not around the assumption it won't happen.</td><td>Build confidence thresholds and human review into every consequential workflow.</td></tr>
<tr><td>"Implementation takes years"</td><td>Simple use cases: 4–8 weeks. Data preparation is almost always the bottleneck — not the AI.</td><td>Start with data readiness. Assess before you plan the timeline.</td></tr>
</tbody>
</table>

<h3>When NOT to Use AI — 7 Disqualifiers</h3>
<ul>
<li><strong>You can't define "correct" in one sentence.</strong> If you can't tell a human what good looks like, you can't tell AI either.</li>
<li><strong>The process changes more than monthly.</strong> AI learns patterns. Changing processes break those patterns.</li>
<li><strong>Errors have catastrophic consequences with no human review.</strong> Medical diagnosis, legal liability, financial decisions — AI augments, it doesn't replace oversight.</li>
<li><strong>You have less than 6 months of historical data.</strong> AI needs examples. Without data, you're deploying guesswork.</li>
<li><strong>The AI cost exceeds 70% of the manual cost.</strong> If the economics don't work, don't build it.</li>
<li><strong>The task requires deep relational trust.</strong> Grief counselling, complex negotiation, crisis management — these remain human.</li>
<li><strong>The process isn't documented.</strong> Never automate a process you can't describe. Fix the process first.</li>
</ul>

<h3>The 5 Failure Modes — Memorise These</h3>
<table>
<thead><tr><th>Failure Mode</th><th>What Happens</th><th>How to Prevent It</th></tr></thead>
<tbody>
<tr><td>Wrong starting point</td><td>Organisation buys platform before defining use case</td><td>Define the specific process problem before evaluating any technology</td></tr>
<tr><td>Automating a broken process</td><td>AI now runs a broken process faster and at scale</td><td>Map and optimise the process first. Then automate.</td></tr>
<tr><td>No baseline measurement</td><td>AI deployed — nobody can prove it worked</td><td>Measure current state for 4 weeks before deployment</td></tr>
<tr><td>No adoption plan</td><td>Working AI. 18% adoption. Declared "failed."</td><td>Build change management in parallel with technical build</td></tr>
<tr><td>No human fallback</td><td>AI error causes real harm with no correction path</td><td>Every AI workflow needs a confidence threshold and human escalation path</td></tr>
</tbody>
</table>

<h3>Decision Checklist</h3>
<pre>□ Have I identified a SPECIFIC process problem (not "we need AI")?
□ Can I define what a correct AI output looks like in one sentence?
□ Do I know what data exists and where it lives?
□ Have I identified who owns this AI system when it goes live?
□ Have I calculated the annual cost of NOT automating this process?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Most AI failures aren't technical — they're expectational. Teams deploy AI expecting human-like contextual understanding and get inconsistent outputs they weren't designed to handle.</p>
<p><strong>Example:</strong> A 350-person professional services firm spent $180K building an AI to "improve proposal quality." After 6 months, adoption was 4%. The root cause: nobody could define what "quality" meant in measurable terms. Without a definition, the AI had nothing to optimise for. The project was shelved. A $5K workshop to define quality criteria upfront would have changed the outcome.</p>
<p><strong>Why it matters:</strong> Specificity of problem definition is the single highest-leverage activity before any AI project. It costs nothing and determines everything.</p>
<p><strong>Implementation tip:</strong> Before any AI initiative, complete this sentence in one sentence: "We will know AI is working when [specific measurable outcome] improves from [baseline] to [target] within [timeframe]." If you cannot complete it, do not start.</p>
<p><strong>💡 What This Saves You:</strong> Organisations that define success criteria before build begins are 3× more likely to deliver on time and within budget. For a mid-size organisation, that's the difference between a $45K successful deployment and a $180K shelved project.</p>
</div>`,
      },
      {
        id: 'm1-l2', number: 2, tier: 'individual', duration: '25 min',
        title: 'Types of AI Models and When to Use Each',
        content: `<h2>The Model Landscape</h2>
<p>Choosing the wrong model is like using a forklift to move a coffee cup — technically possible, expensive, and unnecessary. Most organisations default to the frontier model they've heard of (usually GPT-4) for everything. This typically costs 10–20× more than necessary for the majority of tasks.</p>
<p>The right question is never "which model is best?" It's "which model is sufficient for this specific task at this volume and this accuracy requirement?"</p>

<h3>The 5 Model Types You Need to Know</h3>
<table>
<thead><tr><th>Model Type</th><th>Best For</th><th>Key Examples</th><th>Business Use Cases</th></tr></thead>
<tbody>
<tr><td><strong>Large Language Models (LLMs)</strong></td><td>Text generation, summarisation, classification, reasoning, Q&A</td><td>GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3</td><td>Email drafting, document review, report generation, customer service responses</td></tr>
<tr><td><strong>Efficient LLMs</strong></td><td>Same tasks as above at high volume, lower cost</td><td>GPT-4o-mini, Claude 3 Haiku, Gemini 1.5 Flash</td><td>High-volume classification, extraction, triage — where cost matters</td></tr>
<tr><td><strong>Embedding Models</strong></td><td>Semantic search, document similarity, RAG systems</td><td>text-embedding-3-large (OpenAI), embed-v3 (Cohere)</td><td>Searching your documents, finding similar cases, knowledge base Q&A</td></tr>
<tr><td><strong>Vision/Multimodal Models</strong></td><td>Processing images, PDFs with visual content, forms</td><td>GPT-4o Vision, Claude 3.5 Sonnet Vision</td><td>Invoice extraction, quality inspection, form processing, document scanning</td></tr>
<tr><td><strong>Speech Models</strong></td><td>Transcription, voice-to-text, speech analysis</td><td>Whisper (OpenAI), Azure Speech, Google STT</td><td>Meeting transcription, call centre analysis, voice interfaces</td></tr>
</tbody>
</table>

<h3>The 3-Question Model Selection Framework</h3>
<p>Before selecting any model, answer these three questions:</p>

<p><strong>Question 1: Is accuracy critical or threshold-acceptable?</strong><br>
Critical (errors have significant consequences) → Use frontier models: GPT-4o, Claude Sonnet<br>
Threshold-acceptable (85%+ is fine) → Use efficient models: GPT-4o-mini, Claude Haiku</p>

<p><strong>Question 2: What is the volume?</strong><br>
Low (under 1,000 calls/day) → Cost barely matters. Choose on quality.<br>
High (over 10,000 calls/day) → Cost matters significantly. Benchmark first.</p>

<p><strong>Question 3: Does data need to stay in-region?</strong><br>
Yes (regulated data, data sovereignty) → Azure OpenAI (Australia East) or AWS Bedrock (Sydney)<br>
No → Any provider works</p>

<h3>Real-World Model Selection Examples</h3>
<table>
<thead><tr><th>Use Case</th><th>Volume</th><th>Recommended Model</th><th>Annual Cost</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Email classification (12 categories)</td><td>800/day</td><td>GPT-4o-mini or Claude Haiku</td><td>$13–22/yr</td><td>Classification is proven for smaller models. 91–93% accuracy — sufficient.</td></tr>
<tr><td>Executive report generation</td><td>1/week</td><td>GPT-4o or Claude Sonnet</td><td>$1.40–1.70/yr</td><td>Low volume makes cost irrelevant. Choose quality.</td></tr>
<tr><td>Document Q&A (RAG)</td><td>200 queries/day</td><td>GPT-4o-mini with RAG architecture</td><td>$55/yr</td><td>RAG retrieval does the heavy lifting. Model just synthesises clean chunks.</td></tr>
<tr><td>Meeting transcription + action items</td><td>20 meetings/day</td><td>Whisper + Claude Haiku</td><td>$1,978/yr</td><td>Whisper is the cheapest accurate transcription. Haiku handles extraction.</td></tr>
<tr><td>Invoice data extraction</td><td>500 invoices/day</td><td>GPT-4o Vision</td><td>~$2,400/yr</td><td>Visual processing required. No cheaper multimodal option with same accuracy.</td></tr>
</tbody>
</table>

<h3>The RAG Pattern — Your Most Important Architecture Decision</h3>
<p>RAG (Retrieval-Augmented Generation) is the most important AI architecture pattern for business. It solves the three biggest problems with raw LLMs:</p>
<ul>
<li><strong>Hallucination:</strong> AI answers from retrieved documents, not invented knowledge</li>
<li><strong>Knowledge cutoff:</strong> Your documents are always current, regardless of model training date</li>
<li><strong>Data privacy:</strong> Your documents never leave your infrastructure unless you send them explicitly</li>
</ul>
<p><strong>How RAG works (simply):</strong> Documents are converted to numerical representations (embeddings) and stored in a vector database. When a user asks a question, the question is also converted to an embedding, the most relevant document sections are retrieved, and only those sections are sent to the LLM to answer the question.</p>
<p><strong>Result:</strong> AI that answers questions about your specific documents, accurately, with citations, without hallucinating.</p>

<h3>The Mixing Strategy — When to Use Multiple Models</h3>
<p>The highest-ROI AI architectures often use different models for different steps:</p>
<ul>
<li>Use a small model for first-pass classification (99% of volume, very cheap)</li>
<li>Route low-confidence outputs to a frontier model for review (1% of volume)</li>
<li>Use embedding models for search, LLMs only for final answer synthesis</li>
<li>Use Whisper for transcription, then a small LLM for extraction</li>
</ul>
<p>Result: frontier-model accuracy at efficient-model cost.</p>

<h3>The Enterprise Model Governance Principle</h3>
<p><strong>Wrong approach:</strong> "We standardise on GPT-4o for all use cases." — Over-engineered for simple tasks. Over-budget at scale. Vendor lock-in.</p>
<p><strong>Right approach:</strong> "We standardise on our orchestration layer and abstract model selection." — Switch models without changing code. A/B test in production. Apply cost governance centrally.</p>

<h3>Decision Checklist</h3>
<pre>□ Have I identified the task type (classification/generation/extraction/search)?
□ Have I determined whether accuracy is critical or threshold-acceptable?
□ Have I estimated daily volume to assess cost significance?
□ Have I checked data residency requirements?
□ Have I benchmarked at least 2 models before committing to one?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Most organisations choose their AI model based on marketing demos and brand recognition, not performance benchmarks on their actual task. This is the most common source of unnecessary AI cost.</p>
<p><strong>Example:</strong> A retail company with 800 customer service emails per day defaulted to GPT-4o without benchmarking. Annual token cost: $219. After a 2-hour benchmark exercise comparing GPT-4o-mini: 91% accuracy vs 94% — a 3% difference that doesn't affect routing quality. Switch to mini. Annual saving: $206. Small individually — but they had 14 other use cases in the pipeline. Right-sizing across all 15 saved $38,000 per year.</p>
<p><strong>Why it matters:</strong> Model selection is the highest-ROI 2-hour investment in any AI implementation. It compounds across every use case you build.</p>
<p><strong>Implementation tip:</strong> Before finalising any AI build, run 500 real production examples through 3 models side by side. Score accuracy manually on 50 samples. The cheapest model meeting your accuracy threshold is always the right choice.</p>
<p><strong>💡 What This Saves You:</strong> Benchmarking before committing to a model takes 2 hours and typically saves $5,000–$50,000 per year across a portfolio of use cases. At scale, this is the most valuable habit in AI program management.</p>
</div>`,
      },
      {
        id: 'm1-l3', number: 3, tier: 'individual', duration: '22 min',
        title: 'Tokens, Cost & the Economics of AI',
        content: `<h2>Why Token Economics Determine AI Program Success</h2>
<p>Token costs look tiny — fractions of a cent per call. But at business scale they compound fast. The difference between choosing the right model and the wrong one, across a portfolio of 10 use cases, is typically $20,000–$100,000 per year. Understanding token economics is not a technical detail — it's a financial decision.</p>

<h3>What Is a Token?</h3>
<p>A token is the basic unit AI models use to read and generate text. Approximately:</p>
<ul>
<li>1 token ≈ 4 characters ≈ ¾ of an English word</li>
<li>"The quick brown fox" = 5 tokens</li>
<li>A 200-word email ≈ 270 tokens</li>
<li>A 10-page PDF document ≈ 5,000–8,000 tokens</li>
<li>GPT-4o's context window (128K tokens) ≈ a 96,000-word novel</li>
</ul>
<p>You are charged separately for <strong>input tokens</strong> (everything you send) and <strong>output tokens</strong> (everything the model generates back). Output tokens cost 4–6× more than input tokens. This matters when designing what format you ask AI to respond in.</p>

<h3>Model Pricing Reference (Q1 2025)</h3>
<table>
<thead><tr><th>Model</th><th>Input (per 1M tokens)</th><th>Output (per 1M tokens)</th><th>AUD Input</th><th>AUD Output</th><th>Tier</th></tr></thead>
<tbody>
<tr><td>GPT-4o</td><td>$2.50</td><td>$10.00</td><td>$3.88</td><td>$15.50</td><td>Frontier</td></tr>
<tr><td>GPT-4o-mini</td><td>$0.15</td><td>$0.60</td><td>$0.23</td><td>$0.93</td><td>Efficient</td></tr>
<tr><td>Claude 3.5 Sonnet</td><td>$3.00</td><td>$15.00</td><td>$4.65</td><td>$23.25</td><td>Frontier</td></tr>
<tr><td>Claude 3 Haiku</td><td>$0.25</td><td>$1.25</td><td>$0.39</td><td>$1.94</td><td>Efficient</td></tr>
<tr><td>Gemini 1.5 Pro</td><td>$1.25</td><td>$5.00</td><td>$1.94</td><td>$7.75</td><td>Frontier</td></tr>
<tr><td>Gemini 1.5 Flash</td><td>$0.075</td><td>$0.30</td><td>$0.12</td><td>$0.47</td><td>Efficient</td></tr>
</tbody>
</table>
<p>Prices as of Q1 2025. AUD at 1.55× USD. Always verify at provider pricing pages before financial commitments.</p>

<h3>Monthly Cost Simulations — The Numbers That Matter</h3>
<p><strong>Scenario A: Email Classification (800 emails/day, 300 tokens/email)</strong></p>
<table>
<thead><tr><th>Model</th><th>Daily Cost</th><th>Monthly Cost</th><th>Annual Cost</th></tr></thead>
<tbody>
<tr><td>GPT-4o</td><td>$0.60</td><td>$18</td><td>$219</td></tr>
<tr><td>GPT-4o-mini</td><td>$0.04</td><td>$1.10</td><td>$13</td></tr>
<tr><td>Claude Haiku</td><td>$0.06</td><td>$1.80</td><td>$22</td></tr>
</tbody>
</table>
<p>GPT-4o costs 17× more than mini for this task. If mini achieves ≥ 90% accuracy (benchmark this): use mini.</p>

<p><strong>Scenario B: Document Summarisation (50 docs/day, 4,000 tokens/doc)</strong></p>
<table>
<thead><tr><th>Model</th><th>Monthly Cost</th><th>Annual Cost</th></tr></thead>
<tbody>
<tr><td>GPT-4o</td><td>$135</td><td>$1,825</td></tr>
<tr><td>Claude 3.5 Sonnet</td><td>$180</td><td>$2,160</td></tr>
<tr><td>Claude Haiku</td><td>$11.25</td><td>$135</td></tr>
</tbody>
</table>
<p>For complex document summarisation requiring nuance and structure: Claude Sonnet or GPT-4o. For straightforward summaries: benchmark Haiku first.</p>

<p><strong>Scenario C: Executive Reporting (1 report/week, 8,000 tokens)</strong></p>
<table>
<thead><tr><th>Model</th><th>Annual Cost</th></tr></thead>
<tbody>
<tr><td>GPT-4o</td><td>$1.69</td></tr>
<tr><td>Claude Sonnet</td><td>$1.40</td></tr>
</tbody>
</table>
<p>At this volume, cost is irrelevant. Choose entirely on output quality. Benchmark on your actual reports.</p>

<h3>The 5 Token Optimisation Techniques</h3>
<p><strong>1. Compress your system prompt</strong><br>
Every token in your system prompt is charged on every single API call.<br>
Example: 500-token system prompt × 10,000 calls/day = 5M extra input tokens/day.<br>
At GPT-4o: $12.50/day = $4,562/year from the prompt alone.<br>
Action: Audit and compress system prompts quarterly.</p>

<p><strong>2. Implement response caching</strong><br>
Store AI responses for identical or near-identical queries. Return the cached response instead of making a new API call.<br>
FAQ applications: 40–70% cache hit rates achievable.<br>
A 50% cache hit rate at 1,000 calls/day = 500 free calls/day.<br>
Action: Implement Redis or similar caching layer from day one.</p>

<p><strong>3. Right-size your model</strong><br>
Use the smallest model that meets your accuracy requirement.<br>
Action: Benchmark before committing. The cheapest model meeting 90%+ accuracy is always the right choice.</p>

<p><strong>4. Truncate inputs intelligently (use RAG)</strong><br>
Don't send a 200-page document when only 3 sections are relevant.<br>
RAG: retrieve only relevant chunks (2–5K tokens vs 100K+ for the full document).<br>
Action: For any use case involving large documents, implement RAG before building.</p>

<p><strong>5. Batch non-real-time requests</strong><br>
For tasks that don't require immediate response (nightly reports, daily summaries):<br>
OpenAI Batch API: 50% discount.<br>
Action: Identify which use cases are batch-compatible and schedule accordingly.</p>

<h3>The Cost-Optimisation Compounding Effect</h3>
<p>These techniques compound. A typical 10-use-case AI program applying all five techniques achieves:</p>
<ul>
<li>Model right-sizing: 40–70% cost reduction on affected use cases</li>
<li>Caching: 30–50% reduction on repetitive queries</li>
<li>Prompt compression: 10–20% reduction across all use cases</li>
<li>RAG vs full document: 60–90% reduction on document-heavy use cases</li>
</ul>
<p>Combined: total AI operating cost typically 60–80% lower than an unoptimised program at equivalent capability.</p>

<h3>Decision Checklist</h3>
<pre>□ Have I calculated the annual token cost at expected production volume?
□ Have I compared at least 2 models on cost for high-volume use cases?
□ Have I specified output format to minimise unnecessary output tokens?
□ Is my system prompt as compressed as possible?
□ Have I identified which use cases are cacheable or batch-compatible?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations that don't monitor token costs in production consistently overspend by 3–5× compared to optimised programs. The cost looks trivial per call and becomes significant at scale — the classic "boiling frog" pattern.</p>
<p><strong>Example:</strong> A financial services firm's AI program started at $800/month in token costs. After 12 months of adding use cases without optimisation: $14,200/month. A 2-day cost optimisation exercise identified: system prompts that had grown to 800+ tokens each (compressible to 280), no caching implemented, frontier model used for all 18 use cases regardless of task complexity. After optimisation: $3,100/month — a $134,400/year saving. The optimisation took 16 hours of engineering time.</p>
<p><strong>Why it matters:</strong> AI economics are invisible until they're painful. Monthly token cost reviews should be a standard operating procedure for any organisation running more than 3 AI use cases in production.</p>
<p><strong>Implementation tip:</strong> Set up token usage alerts from day one. OpenAI, Anthropic, and Google all provide usage dashboards. Review monthly. If any use case exceeds its cost projection by 20%, investigate before the next billing cycle.</p>
<p><strong>💡 What This Saves You:</strong> A quarterly token cost review across a 10-use-case portfolio typically identifies $15,000–$60,000 in annual savings. The review takes half a day.</p>
</div>`,
      },
      {
        id: 'm1-l4', number: 4, tier: 'individual', duration: '20 min',
        title: 'Prompts: The Skill That Multiplies Everything Else',
        content: `<h2>Your Prompt Is Your Program</h2>
<p>Every AI output you'll ever get starts with a prompt. The quality gap between a mediocre prompt and a production-quality prompt is not small — it's the difference between 60% accuracy and 95% accuracy on the same model, the same task, and the same data.</p>
<p>Prompt engineering is the highest-ROI skill in AI adoption. A 2-hour investment in prompt quality saves hundreds of hours of manual correction downstream.</p>

<h3>The 5-Component Prompt Framework</h3>
<table>
<thead><tr><th>Component</th><th>What It Does</th><th>Bad Version</th><th>Good Version</th></tr></thead>
<tbody>
<tr><td><strong>Role / Persona</strong></td><td>Anchors the AI's expertise, tone, and perspective</td><td>(no persona)</td><td>"You are a senior customer service quality analyst with 10 years in financial services."</td></tr>
<tr><td><strong>Context</strong></td><td>Background the AI needs that it can't assume</td><td>"Summarise this."</td><td>"The document below is a customer complaint. We have 8 escalation categories. The customer is a VIP account holder."</td></tr>
<tr><td><strong>Task</strong></td><td>Exactly one thing to do — no multitasking</td><td>"Summarise and tell me what to do and rate sentiment."</td><td>"Categorise this complaint into exactly one of the 8 categories below."</td></tr>
<tr><td><strong>Format</strong></td><td>Exactly how the output must be structured</td><td>(no format)</td><td>"Return JSON only: {category: string, confidence: 0.0-1.0, urgency: high/medium/low}"</td></tr>
<tr><td><strong>Constraints</strong></td><td>What NOT to do — prevents hallucination and scope creep</td><td>(no constraints)</td><td>"Use only information in the complaint. If confidence &lt; 0.7, set category to Needs-Review. No commentary."</td></tr>
</tbody>
</table>

<h3>5 Before/After Prompt Transformations</h3>

<p><strong>Example 1: Email Classification</strong></p>
<pre>BEFORE: "What type of email is this?"

AFTER:
You are a customer service routing specialist.
Context: The email below is an inbound support request.
Our 6 routing categories are: Billing, Technical, Account, Complaint, General, Escalation.
Task: Classify this email into exactly one category.
Format: Return JSON — {"category": string, "confidence": float 0-1, "reason": string max 15 words}
Constraints: Use only information stated in the email. If confidence below 0.75, set category to "Escalation".</pre>

<p><strong>Example 2: Meeting Notes → Action Items</strong></p>
<pre>BEFORE: "Get the action items from this transcript."

AFTER:
You are an executive assistant extracting action items.
Context: This is a transcript from a project status meeting.
Task: Extract all explicitly agreed action items.
Format: Return a JSON array. Each item: {"action": string, "owner": string or "Unassigned", "due": "YYYY-MM-DD" or null, "priority": "High/Medium/Low"}
Constraints: Only include items explicitly agreed — not discussed possibilities. If owner not stated: "Unassigned".</pre>

<p><strong>Example 3: Weekly Report Generation</strong></p>
<pre>BEFORE: "Write a report on our sales data."

AFTER:
You are a business intelligence analyst writing for a CFO audience.
Context: Below is last week's sales data across 4 regions. The prior week's data follows for comparison.
Task: Write a 250-word weekly performance narrative.
Format: 3 paragraphs: (1) Performance vs prior week (2) Top 3 concerns with specific numbers (3) Recommended actions
Constraints: Every claim must reference a specific number from the data. No editorialising. Active voice. Maximum 250 words.</pre>

<p><strong>Example 4: Contract Risk Review</strong></p>
<pre>BEFORE: "Check this contract for problems."

AFTER:
You are a commercial lawyer reviewing contracts for an Australian SMB.
Task: Identify clauses representing elevated commercial or legal risk.
Format: JSON array. Each item: {"clause_ref": string, "risk_type": string, "severity": "High/Medium/Low", "explanation": string max 25 words, "action": string max 20 words}
Constraints: Only flag clauses explicitly present. Do not infer risk from absent clauses. If no elevated risk: return empty array [].</pre>

<p><strong>Example 5: Customer Response Drafting</strong></p>
<pre>BEFORE: "Write a reply to this customer."

AFTER:
You are a senior customer service representative for [Company].
Tone: Professional, empathetic, solution-focused. Never defensive.
Context: The customer complaint is below. Their account history: VIP tier, customer since 2019, 2 prior escalations this year.
Task: Draft a response that acknowledges the issue, explains the resolution, and offers a goodwill gesture appropriate to VIP tier.
Format: Email format. Max 150 words. No bullet points.
Constraints: Never admit liability. Never promise a specific resolution timeline unless confirmed. Always offer to call if needed.</pre>

<h3>The Most Common Prompt Mistakes</h3>
<table>
<thead><tr><th>Mistake</th><th>Consequence</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>No persona</td><td>Generic, inconsistent tone and expertise level</td><td>Always name who the AI is for this task</td></tr>
<tr><td>Multiple tasks in one prompt</td><td>Accuracy drops on each task when combined</td><td>One prompt, one task. Chain prompts for multi-step workflows.</td></tr>
<tr><td>No output format specified</td><td>Inconsistent structure that breaks downstream systems</td><td>Always specify format explicitly — JSON, table, numbered list, max word count</td></tr>
<tr><td>No constraints</td><td>AI adds unsolicited commentary, caveats, or wanders off-topic</td><td>Explicit "do not" instructions are as important as "do" instructions</td></tr>
<tr><td>Tested on ideal examples only</td><td>Works in testing. Fails on messy production data.</td><td>Test on 50 real examples including edge cases before going live</td></tr>
</tbody>
</table>

<h3>Prompt Iteration Protocol</h3>
<p>A prompt is never finished. It's always in a version. Follow this cycle:</p>
<ol>
<li>Write v1 using the 5-component framework</li>
<li>Test on 20 real examples — score each output 1–5</li>
<li>Identify the failure pattern (wrong format? wrong category? hallucination?)</li>
<li>Add one constraint that addresses the pattern</li>
<li>Retest on the same 20 examples</li>
<li>Repeat until accuracy &gt; 90% on test set</li>
<li>Test on 100 new examples never seen in development</li>
<li>Production threshold: 90%+ on unseen examples</li>
</ol>

<h3>Decision Checklist</h3>
<pre>□ Have I given the AI a specific role/persona?
□ Have I provided all necessary context — nothing assumed?
□ Is there exactly ONE task in this prompt?
□ Have I specified output format precisely (including field names if JSON)?
□ Have I added at least 2 "do not" constraints?
□ Have I tested on 20+ real production examples?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The performance gap between a first-draft prompt and a production-ready prompt is consistently 25–40 percentage points on real business tasks. Most teams stop at the first draft.</p>
<p><strong>Example:</strong> A professional services firm's first prompt for proposal classification achieved 67% accuracy. After applying the 5-component framework and running 3 iteration cycles (total: 4 hours of work), accuracy reached 94%. The firm processes 800 proposals/year. At 67% accuracy, 264 needed manual correction — 3 hours each = 792 hours/year. At 94%: 48 needed correction = 144 hours/year. The 4-hour prompt investment saved 648 hours/year at $120/hour = $77,760/year. Every year.</p>
<p><strong>Why it matters:</strong> Prompt quality is not a technical problem — it's a communication problem. Every business professional can learn to write excellent prompts. It is the highest-leverage skill in AI adoption.</p>
<p><strong>Implementation tip:</strong> Keep a Prompt Library. Every prompt that reaches 90%+ accuracy in production gets saved with its version number, test results, and the context it was designed for. This library becomes a competitive asset — the institutional knowledge of what works in your specific business context.</p>
<p><strong>💡 What This Saves You:</strong> A well-maintained Prompt Library prevents teams from starting from scratch on every new AI use case. Each new use case starts from a tested template rather than a blank page — typically cutting prompt development time by 60–70%.</p>
</div>`,
      },
      {
        id: 'm1-l5', number: 5, tier: 'individual', duration: '18 min',
        title: 'AI in Your Daily Work — Practical Application',
        content: `<h2>From Understanding to Doing — Starting This Week</h2>
<p>This lesson is different from the others. It's not conceptual. It's a practical guide to the AI tools and workflows you can implement in your daily work today — with no technical setup, no developer, and minimal cost.</p>

<h3>Before You Start — Check Your Organisation\'s AI Policy</h3>
<p>Before using any AI tool with business information, take these steps:</p>
<ul>
<li><strong>Check for approved tools:</strong> Many organisations now provide licensed AI assistants (Microsoft Copilot, Google Gemini Enterprise, etc.). Using an approved tool means your data stays within your organisation\'s security boundary.</li>
<li><strong>Ask your IT or security team:</strong> If your organisation hasn\'t communicated an AI policy, ask. A simple question — "Which AI tools are approved for business use?" — protects you and the organisation.</li>
<li><strong>Never upload confidential data to unapproved public tools:</strong> Free-tier AI tools may use your inputs for training. Client data, financial records, HR information, and proprietary documents should only go into enterprise-licensed or approved tools.</li>
<li><strong>Understand your obligations:</strong> If you work in a regulated industry (finance, healthcare, legal, government), AI usage may have specific compliance requirements. Check before you start.</li>
</ul>
<p><strong>Practical rule:</strong> If you wouldn\'t email the information to an external contact, don\'t paste it into an unapproved AI tool.</p>

<h3>The 6 Categories of Turnkey AI Tools</h3>
<table>
<thead><tr><th>Category</th><th>What It Does</th><th>Best Tools</th><th>Monthly Cost</th><th>Time to Value</th></tr></thead>
<tbody>
<tr><td><strong>AI Writing Assistants</strong></td><td>Draft, edit, summarise, rewrite</td><td>ChatGPT, Claude, Gemini</td><td>$20–$30/user</td><td>Same day</td></tr>
<tr><td><strong>Meeting AI</strong></td><td>Transcribe, summarise, extract actions</td><td>Otter.ai, Fireflies, Notion AI</td><td>$10–$20/user</td><td>First meeting</td></tr>
<tr><td><strong>AI in Your Existing Tools</strong></td><td>AI within tools you already use</td><td>Microsoft 365 Copilot, Google Workspace AI</td><td>$20–$30/user add-on</td><td>1–2 days setup</td></tr>
<tr><td><strong>AI Research Tools</strong></td><td>Search, summarise, synthesise</td><td>Perplexity, ChatGPT Browse, Claude</td><td>Free–$20</td><td>Same day</td></tr>
<tr><td><strong>AI for Documents</strong></td><td>Q&A over your files, contracts, reports</td><td>Claude, ChatGPT, NotebookLM</td><td>Free–$20</td><td>Same day</td></tr>
<tr><td><strong>AI Automation (No-Code)</strong></td><td>Connect apps, automate workflows</td><td>Zapier AI, Make, n8n</td><td>$20–$50/month</td><td>1–2 days</td></tr>
</tbody>
</table>

<h3>The "Start This Week" Task List by Role</h3>

<p><strong>For any knowledge worker:</strong></p>
<ul>
<li>Upload your next long report to Claude or ChatGPT. Ask it to summarise, then ask 3 specific questions about it. Compare to reading it yourself. (Time: 10 minutes to set up. Time saved: 45–90 minutes per report)</li>
<li>Enable Otter.ai or Fireflies for your next meeting. Review the action item list it generates. Edit what's wrong. Discard what you would have done manually. (Setup: 15 minutes. Time saved: 20–30 minutes per meeting)</li>
<li>Draft your next difficult email in 2 bullet points. Ask Claude to turn it into a professional email. Edit the output. Send. (Time: 3 minutes. Versus: 20 minutes of staring at a blank page)</li>
</ul>

<p><strong>For managers and team leads:</strong></p>
<ul>
<li>Take your last 5 weekly status reports. Ask AI to identify the 3 most common recurring issues and suggest a single root cause. (Time: 15 minutes. Value: insight that might have taken a strategy day to surface)</li>
<li>Draft your next performance review template by giving AI your role's key competencies and asking for a structured review framework. (Time: 20 minutes. Versus: 2 hours of blank-page writing)</li>
<li>Ask AI to generate 5 interview questions for your next hire based on the job description and your top 3 quality concerns. (Time: 5 minutes. Value: more structured, consistent interview process immediately)</li>
</ul>

<p><strong>For business owners and executives:</strong></p>
<ul>
<li>Give AI your last board report and ask: "What are the 3 questions a board member would most likely challenge?" (Time: 10 minutes. Value: pre-meeting preparation that used to take an hour)</li>
<li>Ask AI to analyse your top 3 competitor websites and summarise their positioning, pricing approach, and what they say better than you. (Time: 30 minutes. Value: competitive intelligence that took a junior analyst a day)</li>
<li>Upload your last 10 customer complaints. Ask AI to identify the most common root causes and rank them by frequency. (Time: 15 minutes. Value: product/service insight usually buried in a quarterly review)</li>
</ul>

<h3>The 3 Daily AI Habits That Compound</h3>
<p>Individual AI tools save individual hours. Daily habits change how you work permanently.</p>

<p><strong>Habit 1: First Draft by AI</strong><br>
Before writing anything that takes more than 10 minutes: give AI a brief and let it produce the first draft. Edit the output rather than writing from scratch. This works for emails, reports, proposals, meeting agendas, job descriptions — anything.<br>
Time saved: 60–70% of writing time. At 2 hours of writing/day: saves 70–85 minutes daily.</p>

<p><strong>Habit 2: Document Q&A Before the Meeting</strong><br>
Before any meeting where you need to review a document: upload it to AI and ask the 3 questions you would ask in the meeting. Arrive already knowing the answers.<br>
Time saved: Reduces meeting time by 20–30% and eliminates follow-up "I'll check and get back to you" loops.</p>

<p><strong>Habit 3: End-of-Week Synthesis</strong><br>
Friday afternoon: paste your email thread summaries or notes from the week into AI. Ask: "What were the 3 most important decisions made this week, what's unresolved, and what needs attention Monday?" Review takes 5 minutes instead of 45.<br>
Value: Clarity and continuity that most knowledge workers never achieve.</p>

<h3>What to Do When AI Output Is Wrong</h3>
<p>AI will produce wrong, incomplete, or mediocre output. This is normal. The response is not to stop using it — it's to iterate.</p>
<ol>
<li><strong>Name the specific problem.</strong> "This is too formal" or "it missed the key financial figure" — not "this is bad."</li>
<li><strong>Give the specific correction in the same session.</strong> "Rewrite in a more direct tone, reduce to 100 words, and include the Q3 revenue figure from the data I provided."</li>
<li><strong>If it fails twice, improve the prompt.</strong> The problem is in your instructions, not the model. Add the missing constraint.</li>
<li><strong>Track what worked.</strong> When a prompt produces great output, save it. You now have a template.</li>
</ol>

<h3>Decision Checklist</h3>
<pre>□ Have I identified 3 tasks in my weekly work that AI could handle or accelerate?
□ Have I set up at least one AI writing assistant (ChatGPT or Claude)?
□ Have I tried AI on at least one document I would normally read manually?
□ Have I started a Prompt Library — even just a Notes document?
□ Have I calculated the weekly hours I could recover if AI handled my 3 target tasks?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The professionals who get the most from AI are not the most technical ones. They're the ones with the clearest sense of where their time goes and the discipline to actually change their habits. The technology is not the constraint — the behaviour change is.</p>
<p><strong>Example:</strong> A senior consultant at a professional services firm tracked her time for two weeks before and after adopting 3 AI habits (first-draft by AI, document Q&A, end-of-week synthesis). Before: 2.8 hours/day on writing and document review. After: 1.1 hours/day. Time recovered: 1.7 hours/day = 8.5 hours/week = 442 hours/year. At her billing rate of $280/hour, that's $123,760/year in reclaimed capacity — from three habits, with a $30/month tool investment. She used the recovered time for two additional client relationships.</p>
<p><strong>Why it matters:</strong> AI adoption is not a technology program — it's a personal productivity program with technology as the enabler. The ROI comes from changed behaviour, not from the subscription.</p>
<p><strong>Implementation tip:</strong> Pick one habit this week — just one. Do it for 5 consecutive working days before adding a second. Habit stacking doesn't work if habits aren't embedded individually first. Which 10-minute task will you give to AI first?</p>
<p><strong>💡 What This Saves You:</strong> Three embedded AI habits for a knowledge worker typically recover 1.5–2.5 hours per day. At an average knowledge worker cost of $80/hour fully loaded, that's $30,000–$50,000 per person per year in reclaimed productive capacity.</p>
</div>`,
      },
      {
        id: 'm1-l6', number: 6, tier: 'individual', duration: '15 min',
        title: 'Why AI Has a Cost — Understanding What You Pay For',
        content: `<h2>Why AI Responses Cost Money</h2>
<p>Every time you use an AI tool — whether it's ChatGPT, Claude, Gemini, or a custom business AI — something happens behind the scenes: a powerful computer processes your request. That processing costs money, just like electricity, bandwidth, or cloud hosting.</p>
<p>Understanding why AI costs what it costs gives you the power to make smarter decisions about which AI to use, when, and how — and to avoid overspending on capability you don't need.</p>

<h3>The Train Analogy</h3>
<p>Think of AI providers as running many trains at once. Each train carries passenger requests. The more efficiently requests are grouped together on the same train, the cheaper each individual journey becomes.</p>
<p>This is called <strong>batching</strong> — combining multiple requests into a single processing run. It's one of the most important cost levers in AI.</p>
<ul>
<li><strong>Single request:</strong> Like booking a private taxi. Fast, but expensive per trip.</li>
<li><strong>Batched requests:</strong> Like a scheduled bus route. Slightly slower, but dramatically cheaper per passenger.</li>
</ul>
<p>When your AI task doesn't need an instant response — like summarising yesterday's reports or classifying last week's emails — batching can reduce costs by 30–50%.</p>

<h3>What Are Tokens and Why Do They Drive Cost?</h3>
<p>AI models don't read words — they read <strong>tokens</strong>. A token is roughly ¾ of an English word. Every token you send (your prompt) and every token the AI generates (its response) costs money.</p>
<table>
<thead><tr><th>What You Send</th><th>Approximate Tokens</th><th>Cost Impact</th></tr></thead>
<tbody>
<tr><td>A short question</td><td>20–50 tokens</td><td>Negligible</td></tr>
<tr><td>A 200-word email</td><td>~270 tokens</td><td>Very low</td></tr>
<tr><td>A 10-page document</td><td>5,000–8,000 tokens</td><td>Noticeable at volume</td></tr>
<tr><td>A 100-page report</td><td>50,000–80,000 tokens</td><td>Significant — consider chunking</td></tr>
</tbody>
</table>
<p><strong>Key insight:</strong> Output tokens cost 4–6× more than input tokens. Asking AI for a 2,000-word essay costs significantly more than asking for a 3-sentence summary. Design your output format deliberately.</p>

<h3>Why Longer Conversations Cost More</h3>
<p>When you have a long conversation with AI, the model needs to remember everything said so far. This memory is called the <strong>context window</strong>. The longer the conversation, the more the AI has to process on every single response.</p>
<p>Think of it like a meeting: the more background documents everyone has to re-read before each discussion point, the longer and more expensive the meeting becomes.</p>
<p><strong>Practical implication:</strong> Start new conversations for new topics rather than continuing one very long thread. This keeps context short and costs low.</p>

<h3>Why Faster AI Can Cost More</h3>
<p>Speed in AI isn't free. Getting a response in 1 second instead of 10 seconds requires more powerful infrastructure running at higher capacity.</p>
<table>
<thead><tr><th>Speed</th><th>Best For</th><th>Cost</th></tr></thead>
<tbody>
<tr><td><strong>Real-time</strong> (under 2 seconds)</td><td>Live chat, customer service, interactive tools</td><td>Higher — dedicated infrastructure</td></tr>
<tr><td><strong>Near-time</strong> (5–30 seconds)</td><td>Document analysis, report generation, email drafting</td><td>Moderate — shared infrastructure</td></tr>
<tr><td><strong>Background</strong> (minutes to hours)</td><td>Batch email classification, nightly summaries, data processing</td><td>Lowest — batched and scheduled</td></tr>
</tbody>
</table>
<p><strong>Decision rule:</strong> Not every AI task needs to be fast. Use real-time models for live user-facing tasks. Use slower, cheaper processing for everything else.</p>

<h3>The Four Cost Levers You Control</h3>
<ol>
<li><strong>Model choice:</strong> Smaller models cost 10–20× less than frontier models for many tasks.</li>
<li><strong>Prompt length:</strong> Shorter, more precise prompts cost less and often produce better results.</li>
<li><strong>Output format:</strong> Ask for concise outputs. A JSON classification costs a fraction of a 500-word narrative.</li>
<li><strong>Speed requirement:</strong> If it doesn't need to be instant, batch it.</li>
</ol>

<h3>Decision Checklist</h3>
<pre>□ Do I know how many tokens my typical request uses (input + output)?
□ Am I using the smallest model that meets my accuracy needs?
□ Have I specified a concise output format?
□ Does this task actually need a real-time response?
□ Can any of my AI tasks run in batch mode overnight?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Most organisations don't overspend on AI because the model is too expensive — they overspend because they haven't thought about speed, format, and batching. These three decisions typically account for 60–70% of the cost reduction opportunity.</p>
<p><strong>Example:</strong> A professional services firm processed 2,000 client emails daily using GPT-4o in real-time mode. Annual cost: $18,400. After analysis, only 12% of emails needed real-time classification (urgent client requests). The remaining 88% were reclassified nightly in batch using GPT-4o-mini. New annual cost: $2,100. Same accuracy. 89% cost reduction. The only change was asking: "Does this actually need to be instant?"</p>
<p><strong>Implementation tip:</strong> For every AI use case, ask three questions before choosing your model: (1) What's the smallest model that works? (2) What's the shortest useful output? (3) Does it need to be real-time? These three questions save more money than any other optimisation.</p>
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
        title: 'Why AI Requires Multiple Roles — The 5-Role Framework',
        content: `<h2>The Single Biggest Cause of AI Program Failure</h2>
<p>Surveys of failed AI programs consistently identify the same root cause: unclear ownership. Not bad technology. Not poor data. Not insufficient budget. Unclear ownership.</p>
<p>Every AI program that fails can be traced to one of five ownership gaps. These five roles don't require five separate people — but they require five distinct conversations, and one named person accountable for each.</p>

<h3>The 5 Roles Every AI Program Needs</h3>
<table>
<thead><tr><th>Role</th><th>Owns</th><th>Key Question They Answer</th><th>What Failure Looks Like</th></tr></thead>
<tbody>
<tr><td><strong>Business Sponsor</strong></td><td>Problem definition, success criteria, budget authority, stakeholder alignment</td><td>"Why are we doing this and what does success look like in business terms?"</td><td>Delegated to a committee. Nobody can approve a change or kill a failing project.</td></tr>
<tr><td><strong>Data Owner</strong></td><td>Data quality, access, governance, compliance</td><td>"Is our data ready for this and what can it legally be used for?"</td><td>Build completes. Data is in 3 formats across 4 systems with no reconciliation process. 60% accuracy.</td></tr>
<tr><td><strong>Process Owner</strong></td><td>Workflow design, exception path, output validation</td><td>"Does this actually work in practice, and what happens when it doesn't?"</td><td>AI built against the documented process. Actual process has 8 undocumented workarounds the AI doesn't handle.</td></tr>
<tr><td><strong>Technical / AI Role</strong></td><td>Model selection, integration, cost management, monitoring</td><td>"How do we build this well, at the right cost, with the right safeguards?"</td><td>Selected based on vendor relationship. Architecture decisions made by someone who hasn't deployed production AI before.</td></tr>
<tr><td><strong>Change Lead</strong></td><td>Adoption, training, communication, resistance management</td><td>"Will people actually use this, and what do we do about those who won't?"</td><td>Working system. 22% adoption at month 3. No change plan, no training, no champion network.</td></tr>
</tbody>
</table>

<h3>The Role Gap Diagnostic — 5 Warning Signs Per Role</h3>
<p><strong>Business Sponsor role is vacant when:</strong></p>
<ul>
<li>Nobody can define success in a single measurable sentence</li>
<li>Scope changes happen without formal approval</li>
<li>The program is "sponsored" by a committee that meets quarterly</li>
<li>There's no budget owner — costs are absorbed from multiple department budgets</li>
<li>The program continues past its review date without a go/no-go decision</li>
</ul>
<p><strong>Data Owner role is vacant when:</strong></p>
<ul>
<li>Nobody knows exactly where the training data lives</li>
<li>Data access requests sit in IT queues for weeks</li>
<li>Privacy impact assessments haven't been done</li>
<li>Data quality hasn't been assessed before the build starts</li>
<li>Multiple people claim to own the data but nobody owns quality</li>
</ul>
<p><strong>Process Owner role is vacant when:</strong></p>
<ul>
<li>The "documented process" hasn't been reviewed in 2+ years</li>
<li>Nobody from the operational team is involved in the design</li>
<li>Exception handling paths aren't defined before build</li>
<li>The AI is tested against ideal examples, not messy production ones</li>
<li>Nobody is accountable for validating AI outputs day-to-day</li>
</ul>

<h3>The Small Team Reality</h3>
<p>In a 10-person business, one person may cover multiple roles. What matters is not five separate people — it's that all five conversations happen explicitly.</p>
<p>The minimum viable version:</p>
<ul>
<li>Business owner covers: Business Sponsor + Process Owner (they know both the why and the how)</li>
<li>Developer/contractor covers: Technical role + Data Owner (with input from business owner on data access)</li>
<li>Business owner also drives: Change Lead activities (they own the team)</li>
</ul>
<p>This works for simple use cases. For programs affecting 50+ people or carrying regulatory risk, separate role ownership is non-negotiable.</p>

<h3>The Accountability Matrix</h3>
<table>
<thead><tr><th>Decision</th><th>Accountable</th><th>Consulted</th><th>Informed</th></tr></thead>
<tbody>
<tr><td>Problem definition and success criteria</td><td>Business Sponsor</td><td>Process Owner</td><td>All roles</td></tr>
<tr><td>Data access and usage approval</td><td>Data Owner</td><td>Business Sponsor</td><td>Technical role</td></tr>
<tr><td>Workflow design and exception paths</td><td>Process Owner</td><td>Technical, Change Lead</td><td>Business Sponsor</td></tr>
<tr><td>Model selection and architecture</td><td>Technical role</td><td>Data Owner</td><td>Business Sponsor</td></tr>
<tr><td>Training and communication approach</td><td>Change Lead</td><td>Process Owner</td><td>Business Sponsor</td></tr>
<tr><td>Go/no-go for production deployment</td><td>Business Sponsor</td><td>All roles</td><td>Affected teams</td></tr>
</tbody>
</table>

<h3>Decision Checklist</h3>
<pre>□ Is there a named Business Sponsor with budget authority?
□ Is there a named Data Owner who has approved data usage?
□ Is there a named Process Owner who has mapped the actual current process?
□ Is there a named Technical role with relevant AI deployment experience?
□ Is there a named Change Lead with a plan that started before the build?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The most expensive AI programs are rarely those with the worst technology. They're the ones where ownership was assumed rather than assigned. "Everyone owns it" means nobody owns it.</p>
<p><strong>Example:</strong> A $2.4M government AI program stalled for 7 months. Investigation revealed: the Business Sponsor had delegated to a 9-person steering committee with no individual authority. The Data Owner was a team title, not a person — nobody had approved data access. The Process Owner was "the operations division" — no single person accountable. The Technical role was a vendor whose contract didn't cover post-deployment support. The Change Lead role didn't exist at all. Restructuring: named individuals in all 5 roles, clear accountability matrix, weekly 30-minute triad call. First use case delivered 11 weeks later.</p>
<p><strong>Why it matters:</strong> Clear role ownership is the highest-leverage governance action before any AI program begins. It costs nothing and determines whether $2M gets spent effectively or wasted.</p>
<p><strong>Implementation tip:</strong> In your first programme meeting, put 5 role names on a whiteboard. Don't leave the room until every role has one name next to it — not a team name, not a title. A person's name.</p>
<p><strong>💡 What This Saves You:</strong> Programmes with clearly named role owners in all 5 positions deliver 3× more often on time and within budget than those with ambiguous ownership. On a $500K programme, that's the difference between delivery and waste.</p>
</div>`,
      },
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
<p><strong>💡 What This Saves You:</strong> Organisations that establish clear triad roles before build begins are 3× more likely to deliver on time and within budget. Unclear triad = guaranteed scope creep, rework, and stakeholder conflict.</p>
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
    description: 'Find AI opportunities that are real and valuable. Score them systematically. Build the business case that gets approved — with a framework used in real programmes.',
    deliverable: 'Top 3 Scored AI Use Cases with 5-Year ROI Model',
    templateId: 'use-case-identification',
    lessons: [
      {
        id: 'm3-l1', number: 1, tier: 'individual', duration: '20 min',
        title: 'Finding AI Opportunities That Actually Deliver',
        content: `<h2>The Opportunity Landscape</h2>
<p>The average knowledge worker has 15–20 tasks per week that are potential AI candidates. Most organisations focus on the most visible or exciting ones — and miss the highest-value ones, which are usually invisible, repetitive, and boring.</p>
<p>This lesson gives you the systematic method for finding, qualifying, and ranking AI opportunities so you spend time on the ones that deliver real returns.</p>

<h3>The 4 Signals of a Strong AI Opportunity</h3>
<table>
<thead><tr><th>Signal</th><th>What It Means</th><th>Strong Signal</th><th>Weak Signal</th></tr></thead>
<tbody>
<tr><td><strong>Repetition</strong></td><td>The task is done the same way, many times</td><td>"We process 400 of these every week and they're all structured the same way"</td><td>"We do this occasionally and it varies each time"</td></tr>
<tr><td><strong>Pain</strong></td><td>The task causes measurable friction — time, cost, errors, or staff frustration</td><td>"This takes 45 minutes and our team hates it. Errors here cost us $8K last quarter."</td><td>"It takes a while but it's fine. No major issues."</td></tr>
<tr><td><strong>Data</strong></td><td>Historical examples of the task exist in a usable format</td><td>"We have 3 years of labelled examples in Salesforce, accessible via API"</td><td>"We've been doing this for 6 weeks and it's all in email threads"</td></tr>
<tr><td><strong>Defined Decision</strong></td><td>You can describe what "correct" looks like in one sentence</td><td>"A complaint is urgent if it mentions legal action, regulator contact, or cancellation intent"</td><td>"Our experienced staff just know when something needs escalation"</td></tr>
</tbody>
</table>
<p><strong>Scoring guide:</strong> Count how many signals are present. 4/4 = immediate candidate. 3/4 = strong candidate. 2/4 = possible with preparation. 1/4 = not yet ready.</p>

<h3>The Value vs Complexity Matrix</h3>
<pre>
HIGH VALUE │ STRATEGIC          │ QUICK WIN ← START HERE
           │ Plan for wave 2–3  │ Build first. Prove value.
           │────────────────────│────────────────────────
LOW VALUE  │ AVOID              │ FILLER
           │ Don't build.       │ Only if it builds capability
           │                    │ for higher-value work
           └────────────────────┴────────────────────────
                HIGH COMPLEXITY      LOW COMPLEXITY
</pre>

<p><strong>Quick Win characteristics:</strong> Well-documented process, good data available, clearly defined output, low integration complexity, high volume, measurable current cost.</p>
<p><strong>Strategic characteristics:</strong> High potential value, but requires significant data work, complex integration, or regulatory approval. Plan these for 6–12 months out after proving AI delivery capability.</p>
<p><strong>Avoid characteristics:</strong> High complexity to build, expensive to maintain, unclear value return. If you can't show a 3× ROI in year 1, don't start.</p>

<h3>Where NOT to Start — 6 Common Traps</h3>
<table>
<thead><tr><th>The Trap</th><th>Why It's Tempting</th><th>Why It's Wrong</th></tr></thead>
<tbody>
<tr><td>The CEO's favourite idea</td><td>Easy approval, political support</td><td>Often Q4 (low value, high complexity). Political pressure prevents honest evaluation.</td></tr>
<tr><td>The most visible process</td><td>High profile = easy to justify</td><td>Visibility and value are not the same. The highest-value processes are often invisible to leadership.</td></tr>
<tr><td>Undocumented expert judgment</td><td>"Our best people make this decision"</td><td>If the criteria aren't documented, AI has nothing to learn from. This is a year-2 problem.</td></tr>
<tr><td>A process that changes monthly</td><td>Seems like a dynamic opportunity</td><td>AI learns patterns. Changing processes break patterns. Stable processes first.</td></tr>
<tr><td>Data that doesn't exist yet</td><td>"We'll collect the data as we build"</td><td>Without historical data, you're deploying guesswork. Wait until you have 6+ months.</td></tr>
<tr><td>The largest possible use case</td><td>"Let's do this properly and transform the whole department"</td><td>Larger scope = longer timeline = higher risk of failure before value is proven. Start small, expand after.</td></tr>
</tbody>
</table>

<h3>The Time Audit Method — Finding Hidden Opportunities</h3>
<p>The most reliable way to surface high-value AI opportunities is a structured time audit. It takes 5 working days and consistently reveals opportunities that leadership has never noticed.</p>
<p><strong>Step-by-step process:</strong></p>
<ol>
<li><strong>Select 5–8 participants</strong> across different functions. Include one person who will say "that's not how we really do it."</li>
<li><strong>Ask them to log every task for 5 working days.</strong> Task name, estimated time, frequency, and a 1–5 rating of how much they dislike it.</li>
<li><strong>Aggregate and categorise.</strong> Group similar tasks. Calculate annual hours and cost (hours × hourly rate × 52 weeks).</li>
<li><strong>Apply the 4-signal score</strong> to the top 10 by annual cost.</li>
<li><strong>Plot on the Value-Complexity Matrix.</strong> Your first wave of use cases will be obvious.</li>
</ol>
<p><strong>What you typically find:</strong> 2–4 high-value, low-complexity automation opportunities that the organisation has accepted as "just how it is" for years. Combined annual cost: typically 3–8× the cost of automating them.</p>

<h3>The 5-Year Cost Reality</h3>
<p>When evaluating an AI use case, always model 5-year economics — not just implementation cost.</p>
<table>
<thead><tr><th>Cost Component</th><th>One-Time</th><th>Annual</th><th>5-Year Total</th></tr></thead>
<tbody>
<tr><td>Implementation (build + test)</td><td>$45,000</td><td>—</td><td>$45,000</td></tr>
<tr><td>Token / API costs</td><td>—</td><td>$2,400</td><td>$12,000</td></tr>
<tr><td>Support and monitoring</td><td>—</td><td>$8,000</td><td>$40,000</td></tr>
<tr><td>Annual maintenance (prompts, updates)</td><td>—</td><td>$5,000</td><td>$25,000</td></tr>
<tr><td><strong>Total</strong></td><td></td><td></td><td><strong>$122,000</strong></td></tr>
</tbody>
</table>
<p>Compare this to 5-year value: if the use case saves $80,000/year in staff time, 5-year value = $400,000. Net benefit = $278,000. ROI = 228%.</p>
<p><strong>Key principle:</strong> If the 5-year ROI is below 100% at conservative assumptions, either the use case isn't right or the approach needs redesigning. Never approve a use case build without a 5-year model.</p>

<h3>Worked Example — Ranking 3 Use Cases</h3>
<table>
<thead><tr><th>Use Case</th><th>Signals (4)</th><th>Annual Value</th><th>5-Year Cost</th><th>ROI</th><th>Recommendation</th></tr></thead>
<tbody>
<tr><td>Support email classification (800/day)</td><td>4/4</td><td>$180,000</td><td>$95,000</td><td>848%</td><td>Build first</td></tr>
<tr><td>Weekly management report generation</td><td>4/4</td><td>$52,000</td><td>$68,000</td><td>282%</td><td>Build second</td></tr>
<tr><td>Predictive staff scheduling</td><td>2/4</td><td>$220,000</td><td>$380,000</td><td>190%</td><td>Plan for year 2</td></tr>
</tbody>
</table>

<h3>Decision Checklist</h3>
<pre>□ Have I identified the top 5 repetitive, high-volume tasks in my area?
□ Have I scored each against all 4 signals?
□ Have I calculated the annual manual cost of each (hours × rate × volume)?
□ Have I plotted each on the Value-Complexity Matrix?
□ Have I modelled the 5-year cost and ROI for the top 2?</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The best AI use cases are rarely the most exciting ones. They're the most painful, repetitive, data-rich processes — which are often invisible to leadership because the people doing them have accepted the pain as normal.</p>
<p><strong>Example:</strong> A hospitality chain's leadership team wanted to build an AI concierge — high profile, exciting, complex. Meanwhile, their operations team spent 4 hours every morning manually compiling occupancy, F&B, and maintenance reports from 3 separate systems into one spreadsheet — a task performed by 6 properties × 365 days × 4 hours = 8,760 staff-hours per year. At $35/hour: $306,600/year in manual effort. The automation took 3 weeks to build ($22,000). Year-1 ROI: 1,294%. The concierge project cost $1.2M and was shelved after 11 months with no measurable outcome.</p>
<p><strong>Why it matters:</strong> Selecting the right use case is more valuable than selecting the right technology. The right use case with average technology beats the wrong use case with best-in-class technology every time.</p>
<p><strong>Implementation tip:</strong> Run the time audit before any AI strategy conversation. Come to the table with data — specific tasks, specific hours, specific costs. The conversation changes completely when you replace "we should use AI" with "these 3 tasks cost us $420,000/year and each has a 4-signal score."</p>
<p><strong>💡 What This Saves You:</strong> Organisations that select their first use case using a structured scoring methodology rather than intuition or politics are 4× more likely to deliver measurable ROI within 6 months. That's the difference between a programme that builds momentum and one that consumes it.</p>
</div>`,
      },
      {
        id: 'm3-l2', number: 2, tier: 'individual', duration: '22 min',
        title: 'How to Qualify, Score and Document a Use Case',
        content: `<h2>From Idea to Investment Decision</h2>
<p>Every AI program has too many ideas and too few resources. The use case that gets built is rarely the best one — it's usually the loudest one, or the one the CEO mentioned last. This lesson gives you a scoring framework that removes politics from use case selection and replaces it with evidence.</p>

<h3>The 6-Step Use Case Qualification Process</h3>

<p><strong>Step 1: Name it specifically</strong><br>
Not: "Use AI for customer service"<br>
Yes: "AI classifies 800 inbound support emails/day into 12 categories with confidence scoring, routing automatically, with human review for low-confidence items"<br>
Rule: If you can't say it in 2 sentences with volume and outcome, it's not ready to qualify.</p>

<p><strong>Step 2: Describe current state with numbers</strong></p>
<table>
<thead><tr><th>Field</th><th>Example Entry</th></tr></thead>
<tbody>
<tr><td>Process steps (as actually performed)</td><td>Email arrives → agent reads → agent manually selects category → agent routes to queue → supervisor corrects ~15%</td></tr>
<tr><td>Volume</td><td>800 emails/day, 22 working days/month</td></tr>
<tr><td>People involved</td><td>12 agents, 2 supervisors</td></tr>
<tr><td>Time per item</td><td>4.5 min/email for classification only</td></tr>
<tr><td>Annual manual cost</td><td>4.5 min × 800/day × 250 days = 150,000 min = 2,500 hrs × $45/hr = $112,500/yr</td></tr>
<tr><td>Current error rate</td><td>15% mis-routed (supervisor correction)</td></tr>
<tr><td>Cost of errors</td><td>$15/re-route × 800 × 15% × 250 days = $450,000/yr in re-work cost</td></tr>
</tbody>
</table>

<p><strong>Step 3: Define the future state</strong></p>
<ul>
<li>What does AI do? Classifies email into 1 of 12 categories, assigns confidence score, routes automatically</li>
<li>What does the human do? Reviews items with confidence &lt; 75% (estimated 8% of volume)</li>
<li>Required accuracy threshold: ≥ 91% (matches current best human performance)</li>
<li>Exception handling: below threshold → human queue; missing category → "Other/Review" queue</li>
</ul>

<p><strong>Step 4: Assess data readiness (score 1–5 each)</strong></p>
<table>
<thead><tr><th>Dimension</th><th>Question</th><th>Score 1–5</th><th>This Example</th></tr></thead>
<tbody>
<tr><td>Availability</td><td>Does the data exist and can we access it?</td><td>_</td><td>5 — 3 years in Salesforce, API access confirmed</td></tr>
<tr><td>Quality</td><td>Is it complete, accurate, and consistent?</td><td>_</td><td>3 — 15% have wrong labels from historical mis-routing</td></tr>
<tr><td>Volume</td><td>Do we have enough examples for each category?</td><td>_</td><td>4 — 200K+ examples across all 12 categories</td></tr>
<tr><td>Accessibility</td><td>Can it be extracted without major engineering?</td><td>_</td><td>4 — Salesforce API, some data cleansing needed</td></tr>
<tr><td>Governance</td><td>Are there privacy or compliance restrictions?</td><td>_</td><td>3 — PII stripping required before model training</td></tr>
<tr><td><strong>Total</strong></td><td></td><td><strong>_/25</strong></td><td><strong>19/25</strong></td></tr>
</tbody>
</table>
<p>Score interpretation: 20–25 = AI-ready. 15–19 = Proceed with preparation plan. 10–14 = Significant data work needed. Below 10 = Pause and fix data first.</p>

<p><strong>Step 5: Score the priority using 5 factors</strong></p>
<table>
<thead><tr><th>Factor</th><th>Score 1–5</th><th>Weight</th><th>Weighted Score</th><th>This Example</th></tr></thead>
<tbody>
<tr><td>Business Value</td><td>_</td><td>×2</td><td>_</td><td>5 × 2 = 10</td></tr>
<tr><td>Implementation Complexity (inverted — lower = better)</td><td>_</td><td>×1.5</td><td>_</td><td>2 complexity → score 4 × 1.5 = 6</td></tr>
<tr><td>Data Readiness</td><td>_</td><td>×1.5</td><td>_</td><td>4 × 1.5 = 6</td></tr>
<tr><td>Team Readiness</td><td>_</td><td>×1</td><td>_</td><td>4 × 1 = 4</td></tr>
<tr><td>Strategic Fit</td><td>_</td><td>×1</td><td>_</td><td>5 × 1 = 5</td></tr>
<tr><td><strong>Priority Score</strong></td><td></td><td></td><td><strong>_/32.5</strong></td><td><strong>31/32.5</strong></td></tr>
</tbody>
</table>
<p>Score ≥ 25: Top priority. Build in wave 1. Score 18–24: Second wave. Score &lt; 18: Defer or redesign.</p>

<p><strong>Step 6: Quick ROI estimate</strong><br>
Annual value = hours saved × hourly cost + error cost reduced<br>
= (2,500 hrs × $45) + ($450,000 × 0.7 error reduction)<br>
= $112,500 + $315,000 = $427,500/year<br><br>
Quick ROI = Annual value / Implementation cost<br>
= $427,500 / $65,000 = 658% year-1 ROI<br><br>
Decision: If quick ROI &gt; 200%, build the formal business case. This one: build immediately.</p>

<h3>The 3-Minute Use Case Shortlist Test</h3>
<p>Before spending time on full qualification, run this quick filter:</p>
<pre>□ Can I describe the task in one sentence with a volume number?
□ Does this task happen at least 100 times per month?
□ Do I have at least 6 months of historical data in an accessible format?
□ Can I define "correct output" in one sentence?
□ Would automating this free up meaningful staff time (5+ hrs/week)?</pre>
<p>If any answer is No — either it's not ready yet, or you need to do more discovery before qualifying it.</p>

<h3>Common Qualification Mistakes</h3>
<table>
<thead><tr><th>Mistake</th><th>What Happens</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Using estimated numbers instead of measured ones</td><td>ROI model looks great. Actual saving is 40% of projection.</td><td>Time-and-motion study on 50 real examples before building ROI model</td></tr>
<tr><td>Qualifying the aspirational process, not the actual one</td><td>AI built for the documented process. Actual process has 6 workarounds.</td><td>Shadow 2–3 people doing the work. Map what actually happens.</td></tr>
<tr><td>Skipping data quality assessment</td><td>Model trained on mislabelled data achieves 61% accuracy</td><td>Data quality assessment before any architecture decision</td></tr>
<tr><td>One person qualifies in isolation</td><td>Process Owner finds 4 undocumented exception types post-build</td><td>Qualification must include: Business Sponsor + Process Owner + Data Owner</td></tr>
</tbody>
</table>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The quality of use case documentation directly predicts build quality. Vague qualification produces vague AI. Teams that spend one extra week on qualification typically save 6–8 weeks of rework post-deployment.</p>
<p><strong>Example:</strong> A financial services firm qualified an AI for loan application triage. Full qualification including Process Owner involvement revealed: 7 exception types not in the documented process, 2 data fields required that weren't in the original data schema, a compliance requirement that affected how confidence thresholds should be set. Total qualification time: 9 days. Estimated rework avoided: 11 weeks. The same firm's previous AI project (no structured qualification) took 14 months to reach production. This one: 9 weeks.</p>
<p><strong>Why it matters:</strong> Use case qualification is not overhead — it is the highest-leverage activity in an AI program. Cutting it short to start building faster is the single most reliable way to extend your total timeline.</p>
<p><strong>Implementation tip:</strong> Print and complete the Use Case Identification Template (in your downloads) for every use case before any engineering work begins. Gate your build start on having a completed, signed-off template.</p>
<p><strong>💡 What This Saves You:</strong> Structured qualification reduces post-deployment rework by an average of 60%. On a $100K implementation, that's $60K in avoided rework and 6–8 weeks of timeline saved.</p>
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
                 − Normalised Cost Score

Where:
  Complexity Score   = (6 − Implementation Complexity score)
  Adoption Score     = (6 − Adoption Effort score)
  Normalised Cost    = Implementation cost + (Annual maintenance × 5)
                       scaled to 1–5 where:
                       1 = under $25K total, 2 = $25–75K,
                       3 = $75–150K, 4 = $150–300K, 5 = over $300K

Maximum possible score = 10 + 5 + 5 − 1 = 19
Minimum possible score = 2 + 1 + 1 − 5 = −1</pre>`,
      },
      {
        id: 'm4-l2', number: 2, tier: 'smb', duration: '28 min',
        title: 'Building the Business Case: From Score to Approved Investment',
        content: `<h2>Turning a Priority Score Into an Approved Decision</h2>
<p>A prioritisation score tells you which use case to build. A business case tells your organisation why to fund it. Most AI initiatives fail to get approved not because the ROI is poor — but because the case is presented in technology language to a business audience, or business language to a finance audience.</p>
<p>This lesson gives you the exact structure for a business case that gets approved — built on the 5-year cost model, presented for the decision-maker in front of you.</p>

<h3>The 5-Year Financial Model — Complete Framework</h3>
<table>
<thead><tr><th>Cost Component</th><th>Formula</th><th>Worked Example</th></tr></thead>
<tbody>
<tr><td>Build cost</td><td>Developer weeks × day rate × 5 days</td><td>8 weeks × $1,200/day × 5 = $48,000</td></tr>
<tr><td>Setup cost</td><td>Platform + infrastructure + data prep</td><td>$3,500 platform + $8,000 data prep = $11,500</td></tr>
<tr><td><strong>Implementation Cost</strong></td><td>Build + Setup</td><td><strong>$59,500</strong></td></tr>
<tr><td>Annual token cost</td><td>Calls/day × tokens/call × cost/token × 250 days</td><td>800 × 600 × $0.00000015 × 250 = $18/yr</td></tr>
<tr><td>Annual support</td><td>Hours/week × hourly rate × 52</td><td>3 hrs × $85 × 52 = $13,260/yr</td></tr>
<tr><td>Annual data maintenance</td><td>Hours/month × hourly rate × 12</td><td>5 hrs × $85 × 12 = $5,100/yr</td></tr>
<tr><td>Annual governance</td><td>Review hours × rate (quarterly + annual)</td><td>$2,800/yr</td></tr>
<tr><td><strong>Annual Maintenance</strong></td><td>Sum of above annual costs</td><td><strong>$21,178/yr</strong></td></tr>
<tr><td><strong>5-Year Cost</strong></td><td>Implementation + (Annual × 5)</td><td><strong>$59,500 + $105,890 = $165,390</strong></td></tr>
</tbody>
</table>

<h3>The Value Model — 3 Streams</h3>
<table>
<thead><tr><th>Value Stream</th><th>Formula</th><th>Worked Example</th></tr></thead>
<tbody>
<tr><td><strong>Efficiency value</strong></td><td>Hours saved/person/day × people × hourly rate × working days</td><td>1.5 hrs × 12 agents × $45/hr × 250 days = $202,500/yr</td></tr>
<tr><td><strong>Quality value</strong></td><td>Error rate reduction × cost per error × annual volume</td><td>8% reduction × $15/error × 200,000 errors = $24,000/yr</td></tr>
<tr><td><strong>Revenue value</strong></td><td>Hours recovered → converted to revenue-generating activity</td><td>450 hrs recovered × $180/hr billing rate × 40% conversion = $32,400/yr</td></tr>
<tr><td><strong>Total Annual Value</strong></td><td>Sum of above</td><td><strong>$258,900/yr</strong></td></tr>
<tr><td><strong>5-Year Value</strong></td><td>Annual value × 5</td><td><strong>$1,294,500</strong></td></tr>
</tbody>
</table>

<h3>The Three Summary Numbers for the Business Case</h3>
<pre>Net Benefit (5-Year)  = 5-Year Value − 5-Year Cost
                      = $1,294,500 − $165,390
                      = $1,129,110

ROI %                 = (Net Benefit / 5-Year Cost) × 100
                      = ($1,129,110 / $165,390) × 100
                      = 682%

Break-Even            = Implementation Cost / Monthly Net Benefit
                      = $59,500 / ($258,900/12 − $21,178/12)
                      = $59,500 / $19,810
                      = 3 months</pre>

<h3>Sensitivity Analysis — The 3 Scenarios Every CFO Expects</h3>
<table>
<thead><tr><th>Scenario</th><th>Adoption Rate</th><th>Annual Value</th><th>5-Year Net</th><th>ROI</th><th>Break-Even</th></tr></thead>
<tbody>
<tr><td>Conservative</td><td>50%</td><td>$129,450</td><td>$481,860</td><td>291%</td><td>6 months</td></tr>
<tr><td>Base Case</td><td>75%</td><td>$194,175</td><td>$805,485</td><td>487%</td><td>4 months</td></tr>
<tr><td>Target</td><td>100%</td><td>$258,900</td><td>$1,129,110</td><td>682%</td><td>3 months</td></tr>
</tbody>
</table>
<p>Always lead with the conservative scenario. If it still shows strong ROI, your case is robust. If conservative is marginal, redesign the approach before presenting.</p>

<h3>The One-Page Business Case Structure</h3>
<p>Every business case — regardless of audience — should fit on one page before appendices:</p>
<ol>
<li><strong>Problem statement:</strong> What is this costing us today? (1 sentence + 1 number)</li>
<li><strong>Proposed solution:</strong> What will AI do? (2 sentences, no jargon)</li>
<li><strong>Financial case:</strong> Conservative ROI + break-even (1 table, 3 scenarios)</li>
<li><strong>Implementation plan:</strong> Timeline + key milestones (5 lines max)</li>
<li><strong>Risk summary:</strong> Top 2 risks + mitigations (4 lines)</li>
<li><strong>Decision required:</strong> What you're asking for + by when (1 sentence)</li>
</ol>

<h3>Common Business Case Failures</h3>
<table>
<thead><tr><th>Failure</th><th>Why It Happens</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>No baseline numbers</td><td>Current state was estimated not measured</td><td>Time-and-motion study before any modelling</td></tr>
<tr><td>100% adoption assumed</td><td>Optimism bias in projections</td><td>Always model 50/75/100% — present conservative first</td></tr>
<tr><td>Technology language for business audience</td><td>Builder wrote the case instead of business owner</td><td>Business Sponsor writes the case. Technical team provides cost inputs only.</td></tr>
<tr><td>Ongoing costs understated</td><td>Implementation cost is visible; maintenance cost is not</td><td>Always show 5-year total cost — not just build cost</td></tr>
<tr><td>No risk section</td><td>Felt like admitting weakness</td><td>Boards distrust cases without risks. Two risks + mitigations builds credibility.</td></tr>
</tbody>
</table>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The business cases that get approved fastest are not the most technically impressive — they're the ones where every number on the page can be sourced back to a real data point. "We measured this" beats "we estimated this" in every approval meeting.</p>
<p><strong>Example:</strong> A telecommunications company submitted two AI business cases in the same quarter. Case A: $2.1M program with $8.4M projected 3-year return, based on industry benchmarks. Approved in principle but deferred pending "further validation." Case B: $340K program with $1.7M 3-year return, every number sourced from 4-week time-and-motion study, conservative scenario modelled at 55% adoption, break-even at 7 months. Approved at first submission. The difference was not the ROI — it was the credibility of the numbers.</p>
<p><strong>Why it matters:</strong> In most organisations, AI business cases compete with capital projects, headcount requests, and technology investments for the same budget. Credible numbers win that competition. Ambitious projections lose it.</p>
<p><strong>Implementation tip:</strong> Before finalising any financial model, ask: "Can I source every input number to a specific data point I can show in an appendix?" If any number is an estimate or benchmark, either measure it or explicitly label it as an assumption with its basis. Reviewers respect honesty about uncertainty far more than false precision.</p>
<p><strong>💡 What This Saves You:</strong> Business cases built on measured data rather than estimates typically get approved 2–3 review cycles faster. At a typical 6-week cycle, that's 12–18 weeks faster to implementation start — and 12–18 weeks earlier return on investment.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q4-1', text: 'A use case scores: Business Value 5, Implementation Complexity 2, Adoption Effort 5, Normalised Cost 3. What is its Priority Score?', options: ['12', '15', '10', '14'], correct: 0, explanation: 'Score = (5×2) + (6−2) + (6−5) − 3 = 10 + 4 + 1 − 3 = 12. High adoption effort (score of only 1 after inversion) significantly reduces the attractiveness of otherwise strong use cases.' },
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
      {
        id: 'm5-l2', number: 2, tier: 'smb', duration: '24 min',
        title: 'Exception Handling, Testing, and Workflow Validation',
        content: `<h2>Design for Failure First — Always</h2>
<p>The single most common cause of AI workflow failures in production is not the AI making wrong decisions — it's the absence of a defined path when the AI makes a wrong decision. Exception handling is not optional. It is the most important design decision in any AI workflow.</p>
<p>Most teams design the happy path first and bolt on exceptions later. This is backwards. Design the exception path first, then build the happy path around it.</p>

<h3>The 5 Human-AI Interaction Patterns</h3>
<table>
<thead><tr><th>Pattern</th><th>What AI Does</th><th>What Human Does</th><th>Best For</th><th>Risk Level</th></tr></thead>
<tbody>
<tr><td><strong>AI Reads → Human Acts</strong></td><td>Summarises, briefs, extracts</td><td>Reviews summary, makes decision</td><td>Document review, meeting prep, research synthesis</td><td>Low — human always decides</td></tr>
<tr><td><strong>AI Classifies → Human Routes</strong></td><td>Assigns category and confidence</td><td>Reviews low-confidence items, approves routing</td><td>Email triage, ticket classification, lead scoring</td><td>Low-medium — human handles exceptions</td></tr>
<tr><td><strong>AI Drafts → Human Edits</strong></td><td>Generates first draft</td><td>Reviews, edits, approves</td><td>Customer responses, proposals, reports</td><td>Medium — human must review before send</td></tr>
<tr><td><strong>AI Alerts → Human Investigates</strong></td><td>Detects anomalies, flags issues</td><td>Investigates flagged items</td><td>Fraud detection, quality control, compliance monitoring</td><td>Medium — false positives are workload cost</td></tr>
<tr><td><strong>AI Decides → Human Monitors</strong></td><td>Makes decision autonomously within defined rules</td><td>Reviews dashboard, handles escalations</td><td>Auto-approval within thresholds, automated routing</td><td>High — requires robust guardrails and audit trail</td></tr>
</tbody>
</table>
<p><strong>Rule:</strong> Start at Pattern 1 or 2. Move to Pattern 4 or 5 only after Pattern 1–3 has demonstrated consistent accuracy in production for 60+ days.</p>

<h3>Exception Type Taxonomy</h3>
<table>
<thead><tr><th>Exception Type</th><th>Trigger</th><th>Response</th><th>Owner</th></tr></thead>
<tbody>
<tr><td>Low confidence</td><td>AI confidence score below threshold (e.g. &lt; 75%)</td><td>Route to human review queue</td><td>Process Owner</td></tr>
<tr><td>Missing required data</td><td>Required field is null or unreadable</td><td>Return to submitter with specific data request</td><td>Data Owner</td></tr>
<tr><td>Out-of-scope input</td><td>Input doesn't match any trained category</td><td>Route to "Other" queue with original input preserved</td><td>Process Owner</td></tr>
<tr><td>System failure</td><td>API timeout, model unavailable, integration error</td><td>Queue for retry; alert Technical role; human fallback</td><td>Technical role</td></tr>
<tr><td>Policy trigger</td><td>Input contains legal language, regulatory keywords, sensitive content</td><td>Immediate escalation to named human owner</td><td>Compliance / Business Sponsor</td></tr>
<tr><td>Volume spike</td><td>Volume exceeds system capacity or cost threshold</td><td>Queue overflow; alert Technical role; cost governance review</td><td>Technical role + Business Sponsor</td></tr>
</tbody>
</table>

<h3>The 3-Phase Testing Protocol</h3>
<p><strong>Phase 1 — Unit Testing (minimum 50 examples)</strong></p>
<ul>
<li>Select 50 real production examples — not ideal ones, representative ones</li>
<li>Include at least 5 from each category if multi-class</li>
<li>Include 10 edge cases and ambiguous examples</li>
<li>Score each output manually: correct / acceptable / wrong</li>
<li>Gate: 85%+ correct/acceptable before proceeding</li>
</ul>

<p><strong>Phase 2 — Edge Case Testing (minimum 100 examples)</strong></p>
<ul>
<li>Deliberately include examples designed to break the system: empty fields, very long inputs, unusual formatting, mixed languages, adversarial inputs</li>
<li>Test every exception path: what happens when confidence is 0.3? When the input is blank? When the API times out?</li>
<li>Gate: All exception paths return a defined, handled response (not an error)</li>
</ul>

<p><strong>Phase 3 — Volume Testing</strong></p>
<ul>
<li>Run at 2× expected production volume for 24 hours</li>
<li>Measure: latency at peak, accuracy at scale, token cost at volume, error rate</li>
<li>Gate: Performance within 15% of unit test results; cost within 20% of projection</li>
</ul>

<h3>The Go-Live Checklist</h3>
<pre>□ All 6 exception types have defined response paths (not "TBD")
□ Confidence threshold tested and set based on Phase 1 results
□ Human review queue exists and is staffed before go-live
□ Kill switch documented: who can pause the system, how, in under 5 minutes
□ Logging configured: every AI decision recorded with input, output, confidence, timestamp
□ Alert thresholds set: accuracy drop >5%, cost spike >20%, volume spike >50%
□ Process Owner has reviewed and signed the exception handling specification
□ Phase 1, 2, and 3 test results documented and approved</pre>

<h3>The Workflow Validation Canvas</h3>
<p>Before any AI system goes live, map the complete workflow across these 5 questions:</p>
<ol>
<li><strong>What triggers this workflow?</strong> (Email arrives / form submitted / scheduled batch)</li>
<li><strong>What is the happy path?</strong> (Step-by-step from trigger to outcome)</li>
<li><strong>What are the exception paths?</strong> (One per exception type from the taxonomy above)</li>
<li><strong>Who is notified at each step?</strong> (Named person, not role)</li>
<li><strong>How do we know it worked?</strong> (The success metric measured daily in week 1)</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Every AI system that has failed in production had one thing in common: the exception handling was an afterthought. Every AI system that has succeeded had exception handling designed before the happy path.</p>
<p><strong>Example:</strong> A healthcare network deployed an AI for patient appointment scheduling. Happy path worked perfectly in testing — 96% accuracy. Go-live day 3: the system received a batch of appointments for a new clinic type that wasn't in the training data. No "out-of-scope" exception path existed. The system attempted to classify them, failed silently, and 340 appointments were never scheduled. The error was discovered 4 days later when patients called to confirm appointments that didn't exist. Fix: 2 days of rework, 340 patient calls, 3 weeks of delayed go-live for a complete exception handling review. The same issue, caught in Phase 2 testing, would have taken 4 hours to resolve.</p>
<p><strong>Why it matters:</strong> Exception handling is not extra work — it is core work. The time invested in designing it before build is always less than the time spent recovering from its absence after go-live.</p>
<p><strong>Implementation tip:</strong> Use the 6-exception taxonomy as a checklist in every design review. For each exception type, require the team to describe the specific response in one sentence before the build review meeting ends. "We'll handle it" is not an answer. "Appointments with no matching clinic type route to the scheduling team's Unmatched queue, triggering a Slack alert to Sarah within 30 minutes" is an answer.</p>
<p><strong>💡 What This Saves You:</strong> Organisations that build exception handling into the design phase rather than the post-incident phase spend an average of 70% less time on production incidents in the first 90 days. On a system processing 500 transactions/day, that difference is typically 15–40 hours of incident management time avoided per month.</p>
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
      {
        id: 'm6-l2', number: 2, tier: 'smb', duration: '26 min',
        title: 'Data Quality Assessment and AI Readiness Scoring',
        content: `<h2>Data Quality Is Not a Pre-Build Activity — It's a Go/No-Go Decision</h2>
<p>The single most reliable predictor of AI model accuracy is data quality — not model choice, not prompt engineering, not architecture. Bad data produces bad AI. Every time. Without exception.</p>
<p>Most organisations discover data quality problems after build, when accuracy is disappointing and the root cause investigation begins. This lesson gives you the framework to identify and resolve data quality issues before a single line of AI code is written.</p>

<h3>The 5-Dimension Data Readiness Framework</h3>
<table>
<thead><tr><th>Dimension</th><th>Definition</th><th>Assessment Questions</th><th>Score 1–5</th></tr></thead>
<tbody>
<tr><td><strong>Availability</strong></td><td>The data exists and can be accessed</td><td>Where does it live? Who owns it? Can it be extracted? Is API access possible?</td><td>1=Doesn't exist, 5=Clean API access confirmed</td></tr>
<tr><td><strong>Completeness</strong></td><td>Required fields are populated</td><td>What % of records have the key field populated? What causes nulls?</td><td>1=&lt;50% complete, 5=&gt;98% complete</td></tr>
<tr><td><strong>Accuracy</strong></td><td>Data values reflect reality</td><td>Sample 100 records manually. What % are correct? How were errors introduced?</td><td>1=&lt;70% accurate, 5=&gt;97% accurate</td></tr>
<tr><td><strong>Consistency</strong></td><td>Same concept represented the same way everywhere</td><td>Are date formats consistent? Naming conventions? Currency? Units of measure?</td><td>1=Multiple conflicting formats, 5=Fully standardised</td></tr>
<tr><td><strong>Currency</strong></td><td>Data reflects the current state</td><td>When was this last updated? How long is data retained? What's the lag?</td><td>1=&gt;12 months old or unknown, 5=Real-time or daily refresh</td></tr>
</tbody>
</table>

<h3>Interpreting Your Score</h3>
<table>
<thead><tr><th>Total Score (out of 25)</th><th>Readiness Status</th><th>Recommended Action</th><th>Typical Timeline to AI-Ready</th></tr></thead>
<tbody>
<tr><td>22–25</td><td>AI-Ready</td><td>Proceed to build. Light data preparation only.</td><td>1–2 weeks</td></tr>
<tr><td>18–21</td><td>Mostly Ready</td><td>Address specific gaps before build. Document remediation plan.</td><td>2–4 weeks</td></tr>
<tr><td>13–17</td><td>Significant Preparation Needed</td><td>Do not start build until gaps addressed. Risk of rework is high.</td><td>4–8 weeks</td></tr>
<tr><td>Below 13</td><td>Not Ready</td><td>Pause use case. Fix data foundation first. Consider different use case.</td><td>8+ weeks or pivot</td></tr>
</tbody>
</table>

<h3>The Before/After Data Transformation — Worked Example</h3>
<p><strong>Scenario:</strong> Customer support team, 3-year email archive, training an AI classifier</p>

<p><strong>BEFORE (raw data state):</strong></p>
<table>
<thead><tr><th>Issue Found</th><th>Volume</th><th>Impact on AI</th></tr></thead>
<tbody>
<tr><td>Date field in 4 formats (DD/MM/YY, MM-DD-YYYY, "Jan 15 2023", Unix timestamp)</td><td>All records</td><td>Date-based features unusable</td></tr>
<tr><td>Category labels: 12 categories in 2019, changed to 8 in 2021 — no mapping exists</td><td>40% of records</td><td>Training set has conflicting labels</td></tr>
<tr><td>Customer names in email body (PII)</td><td>~85% of records</td><td>Privacy compliance blocker</td></tr>
<tr><td>Empty subject line (15% of records)</td><td>15%</td><td>Subject-line feature unavailable for 15%</td></tr>
<tr><td>HTML tags in email body not stripped</td><td>~60% of records</td><td>Token waste + noise in classification signal</td></tr>
</tbody>
</table>

<p><strong>AFTER (4-week data preparation):</strong></p>
<table>
<thead><tr><th>Action Taken</th><th>Method</th><th>Outcome</th></tr></thead>
<tbody>
<tr><td>Date standardisation</td><td>Python script: parse all formats → ISO 8601</td><td>100% consistent date field</td></tr>
<tr><td>Category label mapping</td><td>Process Owner manually mapped old 12 → new 8 categories for sample; AI-assisted mapping validated by human for remainder</td><td>Consistent labels across full dataset</td></tr>
<tr><td>PII removal</td><td>Named entity recognition model strips names, emails, phone numbers</td><td>Compliance cleared; no customer data in training set</td></tr>
<tr><td>Empty subject handling</td><td>Null replaced with "[No Subject]" token; flagged as feature</td><td>Feature preserved; model handles nulls explicitly</td></tr>
<tr><td>HTML stripping</td><td>BeautifulSoup library removes all tags; plain text retained</td><td>Cleaner input signal; 18% token reduction</td></tr>
</tbody>
</table>

<p><strong>Result:</strong> Model accuracy before data preparation: 61%. After: 89%. Same model, same architecture, same prompt. Data quality was the entire difference.</p>

<h3>The CRM Readiness Checklist</h3>
<p>CRM data is the most common source for customer-facing AI use cases — and the most commonly broken:</p>
<pre>□ Customer records: what % have email + name + account status populated?
□ Interaction history: is every customer contact logged with date and type?
□ Product/service data: are product names and codes consistent across records?
□ Account status: is "active/inactive/churned" populated and current?
□ Duplicate records: have duplicates been merged or flagged?
□ Data age: when was the last full data audit?
□ API access: can your CRM export records via API or structured export?
□ Privacy: which fields contain PII that must be stripped before AI processing?</pre>

<h3>Data Governance for AI — The Minimum Viable Setup</h3>
<p>You don't need an enterprise data governance program to use AI responsibly. You need four things:</p>
<ol>
<li><strong>A named Data Owner</strong> for each dataset used in AI — one person, not a team</li>
<li><strong>A data usage policy</strong> that states which data can be sent to which AI providers (1 page maximum)</li>
<li><strong>A PII handling procedure</strong> that defines which fields are stripped before any external API call</li>
<li><strong>A data quality review cadence</strong> — quarterly for live AI systems, not "when something breaks"</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Data preparation consistently takes 40–70% of the total AI implementation timeline. This is not a sign of poor planning — it is the nature of AI projects. The teams that plan for it succeed. The teams that treat it as a 2-week task before the "real" build typically spend 3 months in data rework after the build.</p>
<p><strong>Example:</strong> A retail chain planned an 8-week AI build for demand forecasting. Week 1 data audit found: product codes inconsistent across 3 legacy POS systems (12,000 products with 3 different naming conventions), 4 years of sales data with a 6-month gap due to a system migration, promotional pricing not flagged in sales data (causing demand signal distortion). Revised plan: 6 weeks data preparation + 8 weeks build = 14 weeks total. Actual result: data preparation took 9 weeks. Build took 6 weeks. Total: 15 weeks. The team that budgeted for this delivered on time. If they'd ignored it, they'd have delivered 63% accuracy at week 8 and spent 6 more months investigating why.</p>
<p><strong>Why it matters:</strong> Data preparation is not overhead — it is the foundation. Every week invested in data quality before build returns multiple weeks of avoided rework after build.</p>
<p><strong>Implementation tip:</strong> Run a data audit as the first formal project activity — before architecture decisions, before vendor selection, before timeline commitments. The data audit output determines all three. A 5-day data audit that changes your timeline estimate is the best $5,000 you will spend on an AI project.</p>
<p><strong>💡 What This Saves You:</strong> Organisations that complete a structured data readiness assessment before build begin spend an average of 55% less time on post-deployment accuracy issues. On a typical 12-week build, that's 6–7 weeks of rework avoided.</p>
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
      {
        id: 'm7-l2', number: 2, tier: 'smb', duration: '22 min',
        title: 'Cost, Latency and Architecture Trade-offs',
        content: `<h2>The Architecture Decisions That Determine Your AI Bill</h2>
<p>Architecture decisions made in week one lock in costs for years. Understanding the trade-offs between cost, speed, and capability is the difference between an AI program that scales affordably and one that becomes unaffordable at volume.</p>

<h3>Key Principle: Larger Models Are Not Always Better</h3>
<p>The instinct to use the most powerful model available is natural — and expensive. For most business tasks, efficient models deliver 90–95% of frontier model quality at 5–10% of the cost.</p>
<table>
<thead><tr><th>Task Type</th><th>Recommended Approach</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Simple classification</td><td>Efficient model (GPT-4o-mini, Haiku)</td><td>Classification accuracy plateaus — bigger models add cost, not accuracy</td></tr>
<tr><td>Complex reasoning</td><td>Frontier model (GPT-4o, Sonnet)</td><td>Nuanced analysis genuinely benefits from larger models</td></tr>
<tr><td>High-volume extraction</td><td>Efficient model with structured output</td><td>Volume makes cost the dominant factor</td></tr>
<tr><td>Customer-facing generation</td><td>Frontier model at low volume, efficient at high</td><td>Quality matters for customer experience; benchmark to find the threshold</td></tr>
</tbody>
</table>

<h3>Why Long Context Is Expensive</h3>
<p>When you send a large document to an AI model, the model doesn't just read it — it builds an internal memory structure called a <strong>KV cache</strong> (key-value cache). This is how the model remembers everything in the document while generating its response.</p>
<p>The cost of this memory grows with the length of the document. Processing a 100-page report costs significantly more than 10 separate 10-page requests — because the model has to hold all 100 pages in active memory simultaneously.</p>
<p><strong>Practical implication:</strong> Don't send entire documents when you only need specific sections. Use RAG (Retrieval-Augmented Generation) to extract relevant chunks first, then send only those chunks to the model.</p>

<h3>Five Cost Reduction Strategies</h3>
<ol>
<li><strong>Model routing:</strong> Route simple tasks to cheap models, complex tasks to powerful models. This is called a routing layer or orchestration layer. A single task might cost $0.001 on a small model vs $0.02 on a large one — at 10,000 tasks/day, that's $10 vs $200.</li>
<li><strong>Batch processing:</strong> Group non-urgent requests and process them together. Most AI providers offer 30–50% discounts for batch processing.</li>
<li><strong>Response caching:</strong> Store AI responses for frequently asked identical questions. FAQ-style applications can achieve 40–70% cache hit rates, eliminating those API calls entirely.</li>
<li><strong>Prompt compression:</strong> Shorter system prompts cost less on every single call. A 500-token system prompt run 10,000 times/day = 5 million tokens/day from the prompt alone.</li>
<li><strong>Context chunking:</strong> Instead of sending a full 200-page document, retrieve only the 3–5 relevant pages using RAG. Reduce 100K tokens to 5K tokens per request.</li>
</ol>

<h3>Key Terms (Plain English)</h3>
<table>
<thead><tr><th>Term</th><th>What It Means</th><th>Why It Matters to You</th></tr></thead>
<tbody>
<tr><td><strong>Batch processing</strong></td><td>Grouping multiple AI requests and running them together</td><td>30–50% cheaper than processing one at a time</td></tr>
<tr><td><strong>KV cache</strong></td><td>The AI model's short-term memory during a conversation</td><td>Longer conversations = larger cache = higher cost per response</td></tr>
<tr><td><strong>Context length</strong></td><td>How much text the model can read and remember at once</td><td>Sending less text = lower cost and often better accuracy</td></tr>
<tr><td><strong>Model routing</strong></td><td>Sending different tasks to different AI models based on complexity</td><td>Use cheap models for simple tasks, expensive models only when needed</td></tr>
<tr><td><strong>Mixture of Experts</strong></td><td>A model architecture where only part of the model activates for each request</td><td>More efficient — you get large-model quality without large-model cost on every token</td></tr>
<tr><td><strong>Inference</strong></td><td>The process of the AI generating a response to your request</td><td>Every inference costs compute — this is what you're billed for</td></tr>
</tbody>
</table>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Enterprise AI programs that standardise on their orchestration layer rather than on a single model consistently achieve 40–70% lower operating costs than those that commit to one vendor's frontier model for everything.</p>
<p><strong>Example:</strong> A telco standardised on GPT-4o for all 12 AI use cases. Annual token cost: $186,000. After implementing a routing layer that sent classification tasks to GPT-4o-mini, extraction to Haiku, and only complex customer interactions to GPT-4o, the annual cost dropped to $52,000 — a 72% reduction with no measurable accuracy difference on 10 of 12 use cases.</p>
<p><strong>Implementation tip:</strong> Don't standardise on one model. Standardise on your orchestration layer — the routing and coordination system that decides which model handles which task. This gives you the flexibility to swap models, A/B test, and optimise cost without changing any application code.</p>
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
      {
        id: 'm9-l2', number: 2, tier: 'smb', duration: '24 min',
        title: 'KPI Framework, Baseline Measurement, and Continuous Improvement',
        content: `<h2>Measurement Is Not the End — It Is the System</h2>
<p>Most organisations measure AI performance once — at go-live — and then assume the system continues to work. This is wrong. AI systems degrade, drift, and encounter data patterns they weren't trained on. Without continuous measurement, you discover problems through customer complaints and business impact rather than through your own monitoring.</p>
<p>This lesson gives you the complete KPI framework for any AI use case — from baseline setup through ongoing measurement to the triggers that should cause you to act.</p>

<h3>The 4-Tier KPI Hierarchy</h3>
<table>
<thead><tr><th>KPI Tier</th><th>What It Measures</th><th>Review Frequency</th><th>Action Trigger</th></tr></thead>
<tbody>
<tr><td><strong>Primary KPI</strong></td><td>The single metric that proves the use case works. Must be directly causally linked to the AI output.</td><td>Daily in weeks 1–4, then weekly</td><td>Drops &gt;5% from baseline for 3 consecutive days</td></tr>
<tr><td><strong>Secondary KPIs</strong></td><td>Explain the primary. Help identify root cause when primary drops.</td><td>Weekly</td><td>Any material movement that doesn't match primary trend</td></tr>
<tr><td><strong>Guardrail KPIs</strong></td><td>Things that must NOT worsen. Non-negotiable thresholds. If breached: pause and investigate immediately.</td><td>Daily</td><td>Any breach of defined threshold — no grace period</td></tr>
<tr><td><strong>Financial KPIs</strong></td><td>Actual cost vs projected; actual value delivered vs projected.</td><td>Monthly</td><td>Cost &gt;20% above projection OR value &gt;20% below projection</td></tr>
</tbody>
</table>

<h3>KPI Examples by Use Case Type</h3>
<table>
<thead><tr><th>Use Case</th><th>Primary KPI</th><th>Secondary KPIs</th><th>Guardrail KPIs</th></tr></thead>
<tbody>
<tr><td>Email classification</td><td>Classification accuracy (%)</td><td>Volume processed, human review rate, processing time</td><td>Customer complaint rate (cannot increase), routing error rate (&lt;5%)</td></tr>
<tr><td>Document summarisation</td><td>Time-to-summary (minutes)</td><td>Summary quality rating (1–5 from users), edit rate</td><td>Factual accuracy rate (cannot drop below 92%)</td></tr>
<tr><td>Invoice processing</td><td>Straight-through processing rate (%)</td><td>Exception rate, processing time, field accuracy</td><td>Payment error rate (must be zero), compliance flag rate</td></tr>
<tr><td>Customer response drafting</td><td>Agent handle time (minutes)</td><td>CSAT score, edit time, draft acceptance rate</td><td>CSAT (cannot drop &gt;0.2 points), complaint escalation rate</td></tr>
<tr><td>Report generation</td><td>Report delivery time (hours from data receipt)</td><td>Review cycle time, revision count, stakeholder satisfaction</td><td>Data accuracy rate (&gt;99% factual accuracy required)</td></tr>
</tbody>
</table>

<h3>The Baseline Measurement Protocol — Non-Negotiable</h3>
<p>You cannot prove ROI if you didn't measure before deployment. This is not optional.</p>

<p><strong>4-Week Baseline Plan:</strong></p>
<table>
<thead><tr><th>Week</th><th>Activity</th><th>Output</th></tr></thead>
<tbody>
<tr><td>Week -4 to -3</td><td>Time-and-motion study on target process: clock every step for 50 real cases. Record time per step, error rate, and rework rate.</td><td>Baseline time per case (measured, not estimated)</td></tr>
<tr><td>Week -3 to -2</td><td>Survey affected staff: current process satisfaction (1–10), biggest pain points, time spent on rework.</td><td>Baseline satisfaction score + rework volume</td></tr>
<tr><td>Week -2 to -1</td><td>Establish volume baseline: exact count of transactions processed per day/week over the last 90 days.</td><td>Volume baseline + seasonality pattern</td></tr>
<tr><td>Week -1</td><td>Lock all baselines. Get Process Owner sign-off. No changes to baseline methodology after this point.</td><td>Signed baseline document</td></tr>
</tbody>
</table>
<p><strong>Critical rule:</strong> Once baselines are locked, they cannot be changed. Post-deployment, you measure the same things the same way. Any change to measurement methodology invalidates the comparison.</p>

<h3>The Monthly ROI Review Structure</h3>
<p>Every live AI system should have a monthly 30-minute review covering:</p>
<ol>
<li><strong>Primary KPI trend</strong> vs baseline and vs prior month (chart — not just number)</li>
<li><strong>Guardrail KPI status</strong> — green/amber/red with explanation for any amber or red</li>
<li><strong>Financial actuals</strong> — token cost vs projection, value delivered vs projection</li>
<li><strong>Notable incidents</strong> — any exceptions, failures, or near-misses in the month</li>
<li><strong>One improvement</strong> — what single change would most improve performance next month?</li>
</ol>
<p>This meeting should produce one decision: continue as-is, implement the identified improvement, or escalate for deeper review.</p>

<h3>Model Drift — The Silent Performance Killer</h3>
<p>AI models degrade over time as the real world changes. This is called model drift. It happens when:</p>
<ul>
<li>Your customers change how they communicate (new language, new products, new complaint types)</li>
<li>Your business processes change but the AI wasn't retrained</li>
<li>External conditions change (new regulations, competitor actions, seasonal patterns the model wasn't trained on)</li>
</ul>
<p><strong>Drift detection rule:</strong> If primary KPI drops more than 5% from 3-month average and doesn't recover within 10 business days — investigate for model drift. Typical fix: retrain on the last 6 months of production data.</p>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations that set up baseline measurement before deployment consistently report 2–3× more credible ROI outcomes than those that estimate retrospectively. The discipline of pre-measurement also surfaces business problems that AI could address — it's never wasted effort.</p>
<p><strong>Example:</strong> A professional services firm deployed an AI for proposal classification. At 3 months post-deployment, accuracy was 91% — matching the target. At 6 months: 84%. At 9 months: 77%. Nobody noticed until a client complained about a mis-routed proposal. Investigation: proposal language had changed significantly due to a rebrand 5 months prior. The AI was classifying based on old language patterns. Fix: 2-week retrain on post-rebrand proposals. Accuracy restored to 93%. The drift would have been caught at month 6 if anyone had been monitoring the weekly trend. Instead it was caught at month 9 via a client complaint.</p>
<p><strong>Why it matters:</strong> A production AI system without monitoring is not an asset — it's a liability waiting to be discovered. The cost of monitoring is a weekly 15-minute dashboard review. The cost of not monitoring is discovered in customer complaints.</p>
<p><strong>Implementation tip:</strong> Set up automated weekly email reports from your AI system from day one. Include: volume processed, accuracy rate (if measurable), exception rate, token cost. If any metric is missing, build it before go-live. A 15-minute automated report prevents the 15-hour incident investigation.</p>
<p><strong>💡 What This Saves You:</strong> Organisations with structured AI monitoring detect and resolve performance issues an average of 6 weeks earlier than those without. On a system generating $200,000/year in value, 6 weeks of degraded performance at 20% below target = $46,000 in unrealised value — prevented by a weekly dashboard review.</p>
</div>`,
      },
      {
        id: 'm9-l3', number: 3, tier: 'smb', duration: '20 min',
        title: 'AI Cost Drivers — What Actually Determines Your AI Bill',
        content: `<h2>Understanding What Drives AI Cost</h2>
<p>AI costs are not fixed — they scale based on how you use it. Understanding the six cost drivers gives you control over your AI budget before you commit to a build.</p>

<h3>The 6 AI Cost Drivers</h3>
<table>
<thead><tr><th>Driver</th><th>What It Means</th><th>Impact</th></tr></thead>
<tbody>
<tr><td><strong>Token volume</strong></td><td>Total tokens processed per month (input + output)</td><td>Direct linear cost — double the tokens, double the cost</td></tr>
<tr><td><strong>Number of users</strong></td><td>How many people or systems are calling the AI</td><td>Multiplies token volume — 10 users × 100 calls = 1,000 calls</td></tr>
<tr><td><strong>Request frequency</strong></td><td>How often requests are sent</td><td>High frequency = higher concurrent infrastructure needs</td></tr>
<tr><td><strong>Context length</strong></td><td>How much text the AI processes per request</td><td>Longer context = exponentially more compute per request</td></tr>
<tr><td><strong>Model size</strong></td><td>Frontier vs efficient model</td><td>Frontier models cost 10–20× more than efficient alternatives</td></tr>
<tr><td><strong>Latency requirement</strong></td><td>How fast the response must arrive</td><td>Real-time costs more than background processing</td></tr>
</tbody>
</table>

<h3>The AI Cost Planning Checklist</h3>
<p>Before building any AI use case, answer these questions:</p>
<pre>□ How many users will use this?
□ How often will each user trigger it? (per day/week)
□ How long are the typical prompts? (short / medium / long document)
□ How long should the AI output be?
□ Does it need to respond instantly, or can it run in background?
□ Can identical or similar requests be cached?
□ Can requests be grouped and processed in batch?</pre>

<h3>Worked Example: Email Processing</h3>
<p>A business processes 10,000 customer emails per month and wants AI to classify and draft responses.</p>
<table>
<thead><tr><th>Approach</th><th>Model</th><th>Speed</th><th>Monthly Cost</th><th>Accuracy</th></tr></thead>
<tbody>
<tr><td><strong>Option A:</strong> Real-time premium</td><td>GPT-4o</td><td>Under 2 seconds per email</td><td>~$285/month</td><td>94%</td></tr>
<tr><td><strong>Option B:</strong> Batched efficient</td><td>GPT-4o-mini, nightly batch</td><td>Processed overnight</td><td>~$18/month</td><td>91%</td></tr>
<tr><td><strong>Option C:</strong> Hybrid</td><td>Mini for classification, GPT-4o for complex drafts only</td><td>Classification instant, drafts 5 seconds</td><td>~$42/month</td><td>93%</td></tr>
</tbody>
</table>
<p><strong>Decision:</strong> Option C delivers near-premium accuracy at 85% lower cost than Option A. The 1% accuracy difference is not meaningful for email classification. The hybrid approach is almost always the right answer.</p>

<h3>Fast Mode vs Cost Mode</h3>
<p>Not every task needs the fastest model. Categorise your AI tasks:</p>
<table>
<thead><tr><th>Mode</th><th>When to Use</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>Fast Mode</strong></td><td>Live user-facing interactions where delay = poor experience</td><td>Customer chat, real-time search, interactive tools</td></tr>
<tr><td><strong>Cost Mode</strong></td><td>Background processing where speed doesn't affect user experience</td><td>Monthly report summaries, batch email classification, nightly data processing</td></tr>
</tbody>
</table>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The businesses that control AI costs best are not the ones that pick the cheapest model — they're the ones that categorise every task into "needs to be fast" or "can run in background" before choosing any model.</p>
<p><strong>Example:</strong> A retail chain had 8 AI use cases in production, all running on GPT-4o in real-time. Monthly AI cost: $4,200. After categorising each use case, only 2 needed real-time (customer chat and live product search). The other 6 were switched to batched GPT-4o-mini processing. New monthly cost: $680. Same business outcomes. 84% cost reduction from one afternoon of categorisation work.</p>
<p><strong>Implementation tip:</strong> Use the AI Cost Driver Checklist (downloadable template) for every use case before choosing a model or architecture. The 15 minutes spent filling it in typically saves thousands per year.</p>
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
      {
        id: 'm12-l2', number: 2, tier: 'smb', duration: '22 min',
        title: 'Building Champions, Sustaining Adoption, and Role Evolution',
        content: `<h2>Technology Adoption Follows People — Not the Other Way Around</h2>
<p>Working AI with 20% adoption is a failed project. Working AI with 85% adoption is a transformational one. The only difference is the human program running alongside the technology program.</p>
<p>Most organisations treat adoption as a training problem. It is not. Training solves knowledge gaps. Adoption programs solve motivation, trust, and behavioural change gaps — which are entirely different.</p>

<h3>Why People Don't Adopt AI (The Real Reasons)</h3>
<table>
<thead><tr><th>The Stated Reason</th><th>The Actual Reason</th><th>The Response That Works</th></tr></thead>
<tbody>
<tr><td>"It doesn't work well enough"</td><td>It works but differently — users expected it to replace their judgment, not assist it</td><td>Reframe: "AI handles the routine. You handle the judgment." Show specific time savings.</td></tr>
<tr><td>"I don't have time to learn it"</td><td>The perceived effort of changing habits exceeds the perceived benefit</td><td>Make it take less time to use than not to use — on day one, not week three.</td></tr>
<tr><td>"What happens to my job?"</td><td>Rational concern about automation threat — often unaddressed by leadership</td><td>Opportunity map: show specifically what people will do with recovered time.</td></tr>
<tr><td>"I tried it and it was wrong"</td><td>One bad experience sets the mental model; subsequent good experiences don't override it</td><td>Champions: a peer who uses it successfully, willing to show others. Not IT. A peer.</td></tr>
<tr><td>"My manager doesn't use it"</td><td>Behaviour is modelled from above. If leaders don't use it, teams won't.</td><td>Manager adoption is non-negotiable. Leaders go first.</td></tr>
</tbody>
</table>

<h3>The Champion Network — Your Most Important Adoption Investment</h3>
<p>A champion is a peer who uses the AI successfully, believes in it, and is willing to help others. Champions are not IT staff, not change managers, not the project team. They are members of the affected team who got results and will share them.</p>

<p><strong>Champion selection criteria:</strong></p>
<ul>
<li>Respected by peers — not necessarily the most senior person</li>
<li>Willing to spend 2–3 hours/month supporting colleagues</li>
<li>Comfortable being visible about their own results (shares metrics openly)</li>
<li>Not cynical about the program — but can articulate real limitations honestly</li>
</ul>

<p><strong>Champion activation:</strong></p>
<ol>
<li>Identify champions in pilot phase — they're the ones who lean in and get results</li>
<li>Brief them on their role before general rollout: "You're not a trainer. You're a peer who shares what works."</li>
<li>Give them a communication channel (Slack/Teams channel) to answer questions</li>
<li>Feature their results in the month-1 launch communication</li>
<li>Monthly 30-minute champion check-in: what questions are you getting? What's still not working?</li>
</ol>

<h3>The Opportunity Map — Making Role Evolution Visible</h3>
<p>The most effective response to "what happens to my job?" is not a promise — it's a map. The Opportunity Map shows, for each role, what AI handles and what the person now focuses on with recovered time.</p>

<table>
<thead><tr><th>Role</th><th>Current Time Allocation</th><th>AI Handles</th><th>Person Now Focuses On</th><th>Hours Recovered/Week</th></tr></thead>
<tbody>
<tr><td>Customer Service Agent</td><td>60% routine queries, 20% complex, 20% admin</td><td>Classifies and drafts responses to routine queries</td><td>Complex cases, relationship management, complaint resolution</td><td>~8 hrs/week</td></tr>
<tr><td>Operations Analyst</td><td>50% report production, 30% data gathering, 20% analysis</td><td>Generates weekly reports from data automatically</td><td>Interpretation, recommendations, strategic analysis</td><td>~10 hrs/week</td></tr>
<tr><td>Finance Manager</td><td>40% invoice processing, 30% reconciliation, 30% advisory</td><td>Extracts invoice data, flags discrepancies</td><td>Exception resolution, supplier relationships, financial planning</td><td>~6 hrs/week</td></tr>
</tbody>
</table>

<p>Build this map for your specific team. Present it before the launch — not after. People need to see where they're going before they'll walk toward it.</p>

<h3>The 5-Phase Adoption Framework</h3>
<table>
<thead><tr><th>Phase</th><th>Goal</th><th>Key Activities</th><th>Success Metric</th></tr></thead>
<tbody>
<tr><td><strong>1. Awareness</strong></td><td>Everyone knows what's changing and why</td><td>Leadership announcement, FAQ document, Q&A session</td><td>100% of affected staff have been informed</td></tr>
<tr><td><strong>2. Demonstration</strong></td><td>People see it working with their own eyes</td><td>Live demo with real team data, champion stories, before/after comparison</td><td>50%+ rate demo as "useful" or "very useful"</td></tr>
<tr><td><strong>3. Involvement</strong></td><td>People co-design how they use it</td><td>User feedback sessions, prompt refinement with team input, process adaptation</td><td>At least 20% of team actively providing feedback</td></tr>
<tr><td><strong>4. Support</strong></td><td>People use it successfully and know where to get help</td><td>Champion network active, help channel live, regular usage tips shared</td><td>60%+ adoption rate; &lt;5% reporting they can't use it</td></tr>
<tr><td><strong>5. Embedding</strong></td><td>AI use is the new normal — not using it is the exception</td><td>KPIs updated to reflect AI-augmented performance, usage in onboarding, manager modelling</td><td>85%+ sustained adoption at 90 days</td></tr>
</tbody>
</table>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Champion networks are the single highest-ROI adoption investment. A paid consultant explaining the tool achieves 30–40% adoption. A respected peer saying "this saved me 6 hours last week — let me show you" achieves 70–80% adoption. The content is identical. The messenger is everything.</p>
<p><strong>Example:</strong> A 120-person insurance company deployed an AI for claims triage across 4 teams. Team A had a natural champion — a senior claims officer who got results in the pilot and shared them openly in team meetings. Team A adoption at 90 days: 87%. Teams B, C, D received identical training with no champion. Adoption at 90 days: 31%, 28%, 34%. The company identified and activated champions in Teams B, C, D at month 4. Adoption in those teams reached 74% by month 6. The 4-month gap cost an estimated $180,000 in unrealised efficiency value.</p>
<p><strong>Why it matters:</strong> Champion identification is not an HR activity — it's a program delivery activity with direct financial consequences. Building a champion network should be on the critical path of every AI program, not in the "nice to have" column.</p>
<p><strong>Implementation tip:</strong> In your pilot phase, watch for people who lean in. Who asks the most questions? Who figures out a use case nobody planned for? Who tells their colleague about it before you do? Those are your champions. Activate them explicitly — don't assume they'll do it naturally.</p>
<p><strong>💡 What This Saves You:</strong> The difference between 30% and 80% adoption on a system generating $300,000/year in value is $150,000/year. The investment in a champion network — typically 10–15 hours per champion per year — is the cheapest $150,000 you will ever save.</p>
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
      {
        id: 'm13-l2', number: 2, tier: 'enterprise', duration: '18 min',
        title: 'The Model Routing Principle',
        content: `<h2>Route the Right Task to the Right Model</h2>
<p>The single most impactful cost and quality decision in a multi-model AI system is routing — deciding which model handles which task. Poor routing means you're paying frontier prices for tasks that a model 20× cheaper would handle equally well.</p>

<h3>The Routing Framework</h3>
<table>
<thead><tr><th>Task Complexity</th><th>Model Tier</th><th>Examples</th><th>Typical Cost</th></tr></thead>
<tbody>
<tr><td><strong>Simple</strong> — classification, extraction, formatting</td><td>Efficient (GPT-4o-mini, Haiku, Flash)</td><td>Email categorisation, data extraction, sentiment tagging</td><td>$0.0001–$0.001 per request</td></tr>
<tr><td><strong>Medium</strong> — summarisation, drafting, Q&A</td><td>Mid-tier or efficient with strong prompts</td><td>Meeting summaries, first-draft emails, document Q&A</td><td>$0.001–$0.01 per request</td></tr>
<tr><td><strong>Complex</strong> — reasoning, analysis, nuanced generation</td><td>Frontier (GPT-4o, Sonnet, Gemini Pro)</td><td>Strategic analysis, complex customer responses, legal review</td><td>$0.01–$0.05 per request</td></tr>
<tr><td><strong>Multimodal</strong> — image + text, voice + text</td><td>Vision/multimodal models</td><td>Invoice processing, damage assessment, form extraction</td><td>$0.01–$0.10 per request</td></tr>
</tbody>
</table>

<h3>Long-Document Strategy</h3>
<p>Long documents are the most expensive input type in AI. A 200-page document can consume 100,000+ tokens in a single request. The solution is never to send the full document:</p>
<ol>
<li><strong>Chunk the document</strong> into sections (1,000–2,000 tokens each)</li>
<li><strong>Index the chunks</strong> using an embedding model (very cheap)</li>
<li><strong>Retrieve only relevant chunks</strong> when a question is asked (RAG pattern)</li>
<li><strong>Send 3–5 chunks to the LLM</strong> instead of the full document</li>
</ol>
<p>Result: 95% cost reduction on document-heavy workflows with equal or better accuracy, because the model focuses on relevant content rather than processing noise.</p>

<h3>Orchestration Architecture</h3>
<p>A well-designed orchestration layer handles:</p>
<ul>
<li><strong>Routing:</strong> Which model for which task type</li>
<li><strong>Fallback:</strong> If the primary model is unavailable, route to an alternative</li>
<li><strong>Cost monitoring:</strong> Track spend per model, per use case, per day</li>
<li><strong>Quality monitoring:</strong> Track accuracy per model to detect drift</li>
<li><strong>Caching:</strong> Return stored responses for repeated identical queries</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations with 5+ AI use cases in production that implement routing consistently spend 50–70% less than those using a single model for everything — with no measurable quality difference on 80% of their use cases.</p>
<p><strong>Example:</strong> An insurance company processed claims across 4 AI use cases: document classification, damage assessment (images), policy Q&A, and customer communications. Without routing: all on GPT-4o Vision at $12,400/month. With routing: classification on Haiku ($180/month), damage assessment on GPT-4o Vision ($3,200/month), policy Q&A via RAG + mini ($420/month), customer comms on Sonnet ($1,800/month). Total: $5,600/month — 55% reduction.</p>
<p><strong>Implementation tip:</strong> Build your routing logic as a separate layer, not hard-coded into each application. When a better or cheaper model launches — and they launch every few months — you want to swap it in one place, not twelve.</p>
</div>`,
      },
          {
        id: 'm13-l3', number: 3, tier: 'enterprise', duration: '25 min',
        title: 'The AI Operating Model — Interactive Reference',
        content: `<h2>Multimodal AI Operating Model</h2>
<p>A production AI system is not one model — it is an operating model with three layers: the experience users interact with, the AI models that do the work, and the controls that keep everything safe, accurate, and affordable.</p>
<p>This reference maps every component you need to consider when designing an enterprise AI capability. Select any block below to understand what it does, why it matters, and how it works in practice.</p>

<h3>🖥️ Frontend — User Experience Layer</h3>
<p>These components define how people interact with AI. Get these wrong and adoption fails regardless of how good the AI is.</p>

<table>
<thead><tr><th>Component</th><th>What It Does</th><th>Why It Matters</th></tr></thead>
<tbody>
<tr><td><strong>Experience Consistency</strong></td><td>Ensures users get a consistent AI experience regardless of which model or tool sits behind the scenes</td><td>Prevents confusion and builds user trust across different AI touchpoints</td></tr>
<tr><td><strong>Interaction Design</strong></td><td>Defines how users interact with AI — prompts, forms, chat, workflows, and guided experiences</td><td>Good interaction design reduces mistakes and directly improves adoption rates</td></tr>
<tr><td><strong>Transparency & Trust</strong></td><td>Explains what AI is doing, where answers come from, and when human review is needed</td><td>Trust is essential when AI supports business decisions — opacity kills adoption</td></tr>
<tr><td><strong>Personalisation</strong></td><td>Tailors AI responses based on user role, context, preferences, or workflow stage</td><td>Generic AI is ignored. Personalised AI becomes indispensable</td></tr>
<tr><td><strong>Guidance & Guardrails</strong></td><td>Provides safe boundaries, instructions, policies, and limits for AI usage</td><td>Prevents misuse, reduces operational risk, and protects the organisation</td></tr>
<tr><td><strong>Performance Expectations</strong></td><td>Sets clear expectations around speed, accuracy, limitations, and when AI may be wrong</td><td>Prevents over-reliance and manages the gap between expectation and reality</td></tr>
<tr><td><strong>Feedback & Adoption</strong></td><td>Captures user feedback and usage signals to improve the AI experience over time</td><td>AI that doesn't improve based on usage becomes stale and abandoned</td></tr>
<tr><td><strong>Exception Management</strong></td><td>Defines what happens when AI is uncertain, wrong, or unable to complete the task</td><td>Good exception handling prevents silent failures — the most dangerous AI outcome</td></tr>
<tr><td><strong>Operating Model</strong></td><td>Defines roles, responsibilities, support processes, governance, and ownership</td><td>AI needs an operating model, not just a tool — someone must own it after launch</td></tr>
</tbody>
</table>

<h3>🤖 AI Provider & Model Layer</h3>
<p>Enterprises rarely use one AI provider. The model layer shows the range of AI capabilities an organisation might draw from — each suited to different tasks, costs, and risk profiles.</p>

<table>
<thead><tr><th>Provider / Capability</th><th>What It Represents</th><th>When to Use It</th></tr></thead>
<tbody>
<tr><td><strong>Platform AI</strong> (e.g. ServiceNow Now Assist)</td><td>AI embedded into your existing workflow platform</td><td>When your workflows already live in a platform — fastest path to adoption</td></tr>
<tr><td><strong>Enterprise AI Assistant</strong> (e.g. Amazon Q)</td><td>AI for calls, chats, summaries, and customer routing</td><td>Connects AI to organisational data, applications, and enterprise workflows</td></tr>
<tr><td><strong>Productivity AI</strong> (e.g. Microsoft Copilot)</td><td>AI across documents, email, meetings, and office workflows</td><td>Often the fastest entry point for everyday AI adoption across teams</td></tr>
<tr><td><strong>Enterprise AI</strong> (e.g. IBM Watsonx, Google Vertex)</td><td>Structured business, knowledge, and decision-support AI</td><td>Complex enterprise tasks requiring governance, audit, and data residency</td></tr>
<tr><td><strong>In-House AI</strong></td><td>Custom AI built or configured internally for specific organisational needs</td><td>When privacy, control, specialisation, or deep integration matters</td></tr>
<tr><td><strong>Foundation Models</strong></td><td>The underlying LLMs (GPT-4o, Claude, Gemini, Llama) that power reasoning and generation</td><td>Right-size per task: frontier for complex reasoning, efficient for high-volume classification</td></tr>
</tbody>
</table>

<h3>⚙️ Backend — Control & Governance Layer</h3>
<p>This is where AI quality, safety, and cost are managed. Most AI failures trace back to a gap in this layer.</p>

<table>
<thead><tr><th>Component</th><th>What It Does</th><th>Why It Matters</th></tr></thead>
<tbody>
<tr><td><strong>Knowledge</strong></td><td>Curated organisational knowledge used by AI to provide accurate, relevant answers</td><td>AI is only as good as the knowledge it can access — garbage in, garbage out</td></tr>
<tr><td><strong>Prompts</strong></td><td>Structured instructions that guide AI behaviour and output format</td><td>Prompts shape consistency, quality, and reliability of every AI response</td></tr>
<tr><td><strong>Ethics, Compliance & Responsible AI</strong></td><td>Policies and controls ensuring AI is safe, fair, compliant, and accountable</td><td>Non-negotiable for trust, regulation, and risk management</td></tr>
<tr><td><strong>Dataset & Training</strong></td><td>Data used to train, tune, test, or ground AI systems</td><td>Poor data creates poor AI outcomes — data quality is the foundation</td></tr>
<tr><td><strong>Orchestrator</strong></td><td>The coordination layer that decides which model, tool, or workflow should handle each request</td><td>Standardise orchestration, not one model — the key to cost control and flexibility</td></tr>
<tr><td><strong>Command Centre</strong></td><td>Central monitoring and management for AI performance, incidents, governance, and adoption</td><td>AI needs operational oversight after launch — not set-and-forget</td></tr>
<tr><td><strong>Context & Memory</strong></td><td>Information AI uses to understand the current user, situation, history, and workflow</td><td>Better context produces better outcomes — and reduces hallucination</td></tr>
<tr><td><strong>Model Strategy</strong></td><td>The plan for choosing which models to use, when, and why</td><td>Controls cost, performance, risk, and scalability across the AI portfolio</td></tr>
<tr><td><strong>Monitoring & Feedback Loop</strong></td><td>Continuous measurement of quality, usage, errors, risk, and user feedback</td><td>AI must be continuously improved — unmonitored AI degrades silently</td></tr>
</tbody>
</table>

<h3>📊 Operating Controls</h3>
<p>These cross-cutting controls apply to every AI capability in the organisation.</p>

<table>
<thead><tr><th>Control</th><th>What It Covers</th><th>Why It Matters</th></tr></thead>
<tbody>
<tr><td><strong>Commercial Model</strong></td><td>How AI costs, licences, usage, and vendor contracts are managed</td><td>Prevents cost surprises and ensures sustainable AI investment</td></tr>
<tr><td><strong>Performance & Efficiency</strong></td><td>Measures speed, accuracy, throughput, cost, and resource usage</td><td>AI must be effective and economically sustainable at scale</td></tr>
<tr><td><strong>Critical Functions</strong></td><td>High-risk or business-critical workflows requiring stronger controls, fallback, and human oversight</td><td>Not every workflow should be automated with the same level of autonomy</td></tr>
</tbody>
</table>

<h3>How to Use This Reference</h3>
<ol>
<li><strong>For new AI initiatives:</strong> Walk through each layer and ask "have we addressed this?" Any blank is a gap that will surface in production.</li>
<li><strong>For existing AI systems:</strong> Audit your current setup against this model. The most common gaps are in the backend control layer — especially monitoring, exception handling, and model strategy.</li>
<li><strong>For AI strategy presentations:</strong> Use this as a communication framework with leadership. It shows AI is not just a model — it is an operating capability.</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The organisations that succeed with AI at scale are not the ones with the best models — they are the ones with the most complete operating model. Every gap in this reference creates a failure mode in production.</p>
<p><strong>Example:</strong> A financial services firm deployed AI for claims processing with strong model performance (94% accuracy). But they had no exception management, no monitoring, and no feedback loop. Within 3 months, model drift reduced accuracy to 78% — discovered only when a client escalated a complaint. A complete operating model audit revealed 7 of 27 components were unaddressed. Fixing those 7 gaps took 4 weeks and prevented an estimated $340,000 in operational losses over the following year.</p>
<p><strong>Implementation tip:</strong> Print this reference and use it as a checklist for every AI initiative. Before any go-live decision, every component should have a named owner and a defined approach — even if the approach is "not applicable for this use case" with documented reasoning.</p>
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
    id: 'module-14', number: 14, icon: '💰',
    title: 'AI Economics',
    description: 'Understand why AI costs what it costs — and how to design for cost control, speed, and scale without overspending.',
    deliverable: 'AI Cost Driver Checklist',
    templateId: 'ai-cost-checklist',
    lessons: [
      {
        id: 'm14-l1', number: 1, tier: 'enterprise', duration: '12 min',
        title: 'Why AI Responses Cost Money',
        content: `<h2>The Economics Behind Every AI Response</h2>
<p>Every AI response you receive is the output of a powerful computer processing your request. Unlike traditional software — where the cost of serving one more user is near-zero — AI compute scales directly with usage. More requests, longer prompts, and faster responses all cost more.</p>
<p>This lesson explains why, so you can make informed decisions about when to invest in AI speed and when to optimise for cost.</p>

<h3>What Happens When You Send a Prompt</h3>
<ol>
<li>Your text is converted into <strong>tokens</strong> (the units AI models read)</li>
<li>The tokens are sent to a GPU (graphics processing unit) — specialised hardware designed for AI workloads</li>
<li>The model processes every token in your prompt, building an internal understanding of the request</li>
<li>The model generates output tokens one at a time, each based on everything that came before it</li>
<li>The output is sent back to you</li>
</ol>
<p>Every step costs compute time, energy, and infrastructure — which is why you're charged per token.</p>

<h3>Why Output Costs More Than Input</h3>
<p>Input tokens (your prompt) are processed in parallel — the model reads them all at once. Output tokens are generated sequentially — one after another. Sequential processing is slower and uses more compute per token.</p>
<p>This is why output tokens typically cost 4–6× more than input tokens. It's also why asking for a concise 3-line summary costs far less than asking for a 2,000-word essay — even if the input is identical.</p>

<h3>The Practical Implication</h3>
<p>You control AI costs more than you think. The three biggest levers are: (1) how much text you send, (2) how much text you ask for back, and (3) how fast you need the response. All three are design decisions, not technical constraints.</p>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Example:</strong> A consulting firm asked AI to generate 800-word client briefings. Cost per briefing: $0.04. After reformatting to 200-word executive summaries with the same core content, cost dropped to $0.012 — a 70% reduction with higher client satisfaction because the shorter format was actually preferred.</p>
</div>`,
      },
      {
        id: 'm14-l2', number: 2, tier: 'enterprise', duration: '14 min',
        title: 'Tokens, Batching and Scale',
        content: `<h2>How Volume Changes the Economics</h2>
<p>AI costs are trivial at small scale and significant at large scale. The difference between a well-optimised and poorly-optimised AI program across 10 use cases is typically $20,000–$100,000 per year.</p>

<h3>The Batching Advantage</h3>
<p>AI providers process requests most efficiently when they can group them together. This is called <strong>batch processing</strong> — sending multiple requests in a single run rather than one at a time.</p>
<table>
<thead><tr><th>Processing Mode</th><th>Speed</th><th>Cost</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Real-time</strong></td><td>1–3 seconds</td><td>Full price</td><td>Live customer interactions</td></tr>
<tr><td><strong>Batch</strong></td><td>Minutes to hours</td><td>30–50% discount</td><td>Report generation, data classification, nightly processing</td></tr>
</tbody>
</table>
<p><strong>Rule of thumb:</strong> If the user isn't waiting for the response, it should be batched.</p>

<h3>How Scale Changes the Conversation</h3>
<p>At 10 requests per day, model choice barely matters — the cost difference between GPT-4o and GPT-4o-mini is cents. At 10,000 requests per day, the same choice is the difference between $200/day and $12/day. Scale makes every optimisation decision meaningful.</p>

<h3>The Caching Opportunity</h3>
<p>Many AI applications receive the same or very similar questions repeatedly. Storing the AI's response and returning it for identical future questions — <strong>caching</strong> — eliminates the API call entirely.</p>
<p>FAQ-style applications typically achieve 40–70% cache hit rates. At 1,000 requests/day with a 50% hit rate, you eliminate 500 API calls daily — for free.</p>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Example:</strong> An e-commerce company's product Q&A AI handled 3,000 queries/day. After implementing response caching for the top 200 most common questions, 58% of queries were served from cache. Monthly API cost dropped from $2,400 to $1,010 — with faster response times for cached queries.</p>
</div>`,
      },
      {
        id: 'm14-l3', number: 3, tier: 'enterprise', duration: '12 min',
        title: 'Why Long Context Is Expensive',
        content: `<h2>The Hidden Cost of Long Documents and Conversations</h2>
<p>Context length — how much text the AI holds in memory during a single request — is one of the most misunderstood cost drivers in AI.</p>

<h3>How Context Works</h3>
<p>When you send a document to an AI model, it builds an internal memory structure (called a <strong>KV cache</strong>) that lets it reference any part of the document while generating its response. The longer the document, the larger this memory structure, and the more compute required.</p>
<p>The relationship is not linear — it's closer to quadratic for some operations. A document twice as long can cost significantly more than twice as much to process.</p>

<h3>Practical Context Cost Comparison</h3>
<table>
<thead><tr><th>Input Size</th><th>Tokens</th><th>Relative Cost</th></tr></thead>
<tbody>
<tr><td>Short email</td><td>~300</td><td>1×</td></tr>
<tr><td>5-page report</td><td>~4,000</td><td>13×</td></tr>
<tr><td>50-page document</td><td>~40,000</td><td>133×</td></tr>
<tr><td>200-page report</td><td>~160,000</td><td>533×</td></tr>
</tbody>
</table>

<h3>The Solution: Don't Send Everything</h3>
<p>The RAG (Retrieval-Augmented Generation) pattern solves this: instead of sending a full 200-page document, you search for the 3–5 most relevant pages and send only those. Cost drops from 160,000 tokens to 5,000 tokens — a 97% reduction.</p>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Example:</strong> A legal firm sent full contracts (80–120 pages) to AI for clause review. Cost per contract: $1.20. After implementing RAG to extract only the 5–8 relevant clauses per query, cost per contract dropped to $0.08. Same accuracy — the model actually performed better because it focused on relevant content rather than processing 100 pages of boilerplate.</p>
</div>`,
      },
      {
        id: 'm14-l4', number: 4, tier: 'enterprise', duration: '14 min',
        title: 'Fast vs Cheap vs Accurate',
        content: `<h2>The AI Trade-off Triangle</h2>
<p>In AI, you can optimise for three things — but you typically have to choose two:</p>
<table>
<thead><tr><th>Priority</th><th>What You Get</th><th>What It Costs</th></tr></thead>
<tbody>
<tr><td><strong>Fast + Accurate</strong></td><td>Real-time frontier model responses</td><td>Highest cost — premium infrastructure + premium model</td></tr>
<tr><td><strong>Fast + Cheap</strong></td><td>Real-time efficient model responses</td><td>Slightly lower accuracy on complex tasks</td></tr>
<tr><td><strong>Accurate + Cheap</strong></td><td>Frontier model in batch mode</td><td>Slower — minutes to hours instead of seconds</td></tr>
</tbody>
</table>
<p>The right choice depends on the use case, not the technology. Most businesses need all three modes — the skill is knowing which mode fits which task.</p>

<h3>Decision Framework</h3>
<p>For each AI use case, ask:</p>
<ol>
<li>Is a human waiting for this response? → Fast mode</li>
<li>Does accuracy have financial or reputational consequences? → Accurate mode</li>
<li>Is this processing volume data overnight? → Cheap mode</li>
<li>Is it customer-facing at high volume? → Benchmark efficient models first</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Example:</strong> A financial services firm categorised their 8 AI use cases: 2 needed fast+accurate (customer chat, fraud alerts), 3 needed fast+cheap (email triage, ticket routing, FAQ), and 3 needed accurate+cheap (compliance reports, quarterly analysis, training content). Matching mode to use case reduced their monthly AI spend from $8,200 to $2,900 — a 65% saving with no quality impact on any use case.</p>
</div>`,
      },
      {
        id: 'm14-l5', number: 5, tier: 'enterprise', duration: '15 min',
        title: 'Designing for Cost Control',
        content: `<h2>Building AI Systems That Stay Affordable at Scale</h2>
<p>The organisations that control AI costs best don't do it by choosing the cheapest model — they do it by designing their systems for cost control from day one.</p>

<h3>The 7 Cost Control Design Principles</h3>
<ol>
<li><strong>Right-size every model choice.</strong> Benchmark 2–3 models on your actual data before committing. The cheapest model meeting your accuracy threshold is always the right choice.</li>
<li><strong>Compress every system prompt.</strong> System prompts run on every single API call. A 500-token prompt at 10,000 calls/day = 5M tokens/day from the prompt alone.</li>
<li><strong>Specify concise output formats.</strong> JSON with defined fields costs a fraction of narrative prose. Design output format deliberately.</li>
<li><strong>Cache everything cacheable.</strong> If the same question gets asked twice, the second answer should come from cache, not from an API call.</li>
<li><strong>Batch everything batchable.</strong> If the user isn't waiting, it shouldn't run in real-time.</li>
<li><strong>Chunk documents, don't send whole files.</strong> Use RAG to retrieve relevant sections. Never send 100 pages when 5 will do.</li>
<li><strong>Monitor monthly.</strong> Set up cost alerts. Review token usage monthly. Investigate any use case exceeding projections by 20%.</li>
</ol>

<h3>The AI Cost Driver Checklist</h3>
<p>Use this checklist (available as a downloadable template) for every AI use case before build:</p>
<pre>□ Use case name: _______________
□ Number of users: ___
□ Requests per user per day: ___
□ Average input length: short / medium / long document
□ Average output length: ___
□ Context length required: ___
□ Real-time or background? ___
□ Model required: frontier / efficient / either
□ Can it be batched? Yes / No
□ Can responses be cached? Yes / No
□ Estimated monthly token volume: ___
□ Cost risk: Low / Medium / High</pre>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Organisations that complete a cost driver checklist for every use case before build spend an average of 55% less on AI operations than those that choose models based on capability alone. The checklist takes 15 minutes. The savings compound across every use case, every month, for years.</p>
<p><strong>Implementation tip:</strong> Make the AI Cost Driver Checklist a mandatory gate before any AI build is approved. No completed checklist = no build approval. This single process change prevents more overspend than any technology decision.</p>
</div>`,
      },
    ],
    quiz: {
      questions: [
        { id: 'q14-1', text: 'Your AI system processes 5,000 customer queries per day. 60% are identical FAQ-style questions. What is the highest-impact cost reduction action?', options: ['Switch to a cheaper model', 'Implement response caching — eliminating 3,000 API calls daily', 'Reduce the system prompt length', 'Process all queries in batch mode'], correct: 1, explanation: 'Caching eliminates API calls entirely for repeated queries. At 60% hit rate on 5,000 queries, that is 3,000 free responses daily — the single highest-impact cost action.' },
        { id: 'q14-2', text: 'A 200-page legal contract is sent to AI for review. What is the most cost-effective approach?', options: ['Send the full document — the model can handle it', 'Use RAG to extract only the relevant clauses and send those to the model', 'Split it into 20 separate 10-page requests', 'Use a smaller model for the full document'], correct: 1, explanation: 'RAG extracts only relevant sections, reducing token count from 160,000 to 5,000–10,000. This is a 95%+ cost reduction with equal or better accuracy.' },
        { id: 'q14-3', text: 'Your business has 8 AI use cases. 3 are customer-facing chat, 5 are internal processing. What is the best cost strategy?', options: ['Use the same frontier model for all 8 for consistency', 'Use frontier models for the 3 customer-facing tasks and efficient models in batch mode for the 5 internal tasks', 'Use the cheapest model for everything', 'Only deploy the 3 customer-facing use cases'], correct: 1, explanation: 'Matching model tier and processing mode to task requirements is the most effective cost strategy. Customer-facing needs quality; internal processing needs cost efficiency.' },
        { id: 'q14-4', text: 'Output tokens cost 4-6x more than input tokens. How should this affect your prompt design?', options: ['It should not — output quality is more important than cost', 'Always ask for the shortest possible output — specify format, word count, and structure explicitly', 'Only use models that charge the same for input and output', 'Avoid generating any output longer than 100 words'], correct: 1, explanation: 'Specifying concise output formats (JSON, structured summaries, word limits) dramatically reduces output token cost without sacrificing quality. Design output format deliberately.' },
        { id: 'q14-5', text: 'When should you use batch processing instead of real-time AI?', options: ['Never — users expect instant responses', 'Whenever the end user is not actively waiting for the response', 'Only for tasks that run once per month', 'Only when using the cheapest model'], correct: 1, explanation: 'Batch processing is appropriate for any task where the user is not waiting — nightly reports, scheduled classifications, data processing. It typically costs 30-50% less than real-time.' },
      ],
    },
  },
  {
    id: 'module-15', number: 15, icon: '🚀',
    title: '90-Day Execution Plan',
    description: 'Build your week-by-week plan from approved use case to live, measured AI in production. Sequenced. Realistic. Deliverable.',
    deliverable: '90-Day AI Execution Roadmap',
    templateId: '90-day-plan',
    lessons: [
      {
        id: 'm15-l1', number: 1, tier: 'enterprise', duration: '30 min',
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
        { id: 'q15-1', text: 'At week 6 of a 90-day AI project, your CEO asks you to add two new features that weren\'t in the original scope. What is the right response?', options: ['Add them immediately — leadership requests take priority', 'Evaluate the impact on timeline, add them to a parking lot, deliver the original scope on time, and include the new features in the next cycle', 'Cancel the project and restart with the new requirements', 'Add one feature and drop one from the original scope'], correct: 1, explanation: 'Scope management is the primary determinant of 90-day delivery success. A parking lot respects the idea while protecting the delivery. Proof of value funds everything that follows.' },
        { id: 'q15-2', text: 'Why should baseline metrics be established in Week 3 rather than after deployment?', options: ['It doesn\'t matter when you establish them', 'Because you cannot prove improvement without a pre-deployment benchmark — retrospective baselines are estimates, not evidence', 'Because Week 3 is the only time stakeholders are available', 'So you can adjust the AI to match the baseline'], correct: 1, explanation: 'Pre-deployment baselines are evidence. Post-deployment estimates are guesses. Every AI program needs documented baseline metrics before go-live to produce credible ROI measurements.' },
        { id: 'q15-3', text: 'What is the minimum pilot size recommended before full team rollout?', options: ['1 person', '3–5 users', '50% of the team', 'No pilot needed — go straight to full deployment'], correct: 1, explanation: '3–5 users is the minimum meaningful pilot. Small enough to manage feedback intensively. Large enough to surface real-world edge cases that testing missed. Essential quality gate before full deployment.' },
        { id: 'q15-4', text: 'You successfully deploy use case 1 in 90 days with a documented 52% time reduction. When should you begin use case 2?', options: ['Immediately — momentum is critical', 'After presenting the use case 1 results and securing investment approval for use case 2', 'Only after 12 months of use case 1 data', 'Use case 2 should run in parallel with use case 1'], correct: 1, explanation: 'The result of use case 1 is the business case for use case 2. Present before proceeding. This creates a self-funding AI program where each success funds the next.' },
        { id: 'q15-5', text: 'What infrastructure should every AI use case leave behind for future projects?', options: ['Nothing — each use case is independent', 'Reusable components: prompt libraries, data pipelines, integration patterns, and lessons learned documentation', 'A full rebuild of the technical environment', 'Only the final model output'], correct: 1, explanation: 'Reusable infrastructure is what makes AI programs compound in value. Use case 2 built on use case 1\'s foundations should take 40–60% less time to deliver.' },
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
