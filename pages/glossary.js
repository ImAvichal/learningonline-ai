// pages/glossary.js — LeO AI Glossary
// Full interactive glossary with search, category filter, and alphabetical index
// Additive new page — no existing files modified

import Head from 'next/head'
import Footer from '../components/Footer'
import { useState, useMemo } from 'react'
import { Nav, SectionLabel, Card } from '../components/ui'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// GLOSSARY DATA
// ─────────────────────────────────────────────────────────────────────────────

const TERMS = [
  // ── CORE AI ──────────────────────────────────────────────────────────────
  {
    term: 'Artificial Intelligence (AI)',
    short: 'AI',
    category: 'Core AI',
    mustKnow: true,
    definition: 'Software that performs tasks typically requiring human intelligence — recognising patterns, generating text, making decisions.',
    simple: 'A tool that takes inputs and produces useful outputs by recognising patterns it learned from training data. Not magic — very sophisticated pattern matching.',
    example: "Illustrative scenario: an AI system classifies incoming customer emails and routes uncertain cases for human review. Measure time saved and routing accuracy before claiming benefits.",
    matters: 'AI is only useful when applied to a specific, well-defined task. "We need AI" is not a strategy. "We need AI to classify support emails by urgency" is.',
    related: ['Machine Learning', 'Large Language Model (LLM)', 'Prompt', 'Automation'],
  },
  {
    term: 'Machine Learning (ML)',
    short: 'ML',
    category: 'Core AI',
    definition: 'A subset of AI where systems learn from data to improve their performance on a task without being explicitly programmed for every scenario.',
    simple: 'Instead of writing rules ("if X then Y"), you feed the system thousands of examples and it learns the rules itself.',
    example: 'A fraud detection model trained on 5 years of transactions. It learns what fraud looks like — without a human writing every fraud rule.',
    matters: 'Most modern AI tools you use are built on ML. Understanding this helps you know why AI needs good data before it can work well.',
    related: ['Deep Learning', 'Model Training', 'Fine-tuning', 'Artificial Intelligence (AI)'],
  },
  {
    term: 'Deep Learning',
    short: '',
    category: 'Core AI',
    definition: 'A type of machine learning using neural networks with many layers that can learn complex patterns from large amounts of data.',
    simple: 'The technology behind modern AI breakthroughs — image recognition, language models, voice assistants. More layers = more complex patterns learned.',
    example: "Illustrative scenario: a visual inspection model flags potential manufacturing defects. Its performance must be measured on representative, independently labelled test images.",
    matters: 'Deep learning is why AI made a step-change in capability from 2017 onward. You don\'t need to understand it deeply — just know it\'s what powers LLMs.',
    related: ['Neural Network', 'Large Language Model (LLM)', 'Machine Learning (ML)'],
  },
  {
    term: 'Neural Network',
    short: '',
    category: 'Core AI',
    definition: 'A computational system loosely inspired by the human brain — layers of interconnected nodes that process information and learn patterns.',
    simple: 'Think of it as a very complex series of weighted decisions. Each layer of the network looks for increasingly abstract patterns in the data.',
    example: "A spam filter can use a neural network. Large language models also use neural networks, but proprietary model sizes are often undisclosed.",
    matters: 'The architecture that makes modern AI possible. You\'ll hear this term — knowing roughly what it means prevents confusion.',
    related: ['Deep Learning', 'Machine Learning (ML)', 'Parameters'],
  },
  {
    term: 'Large Language Model (LLM)',
    short: 'LLM',
    category: 'Core AI',
    definition: 'An AI model trained on vast amounts of text that can generate, summarise, classify, and reason about language at scale.',
    simple: 'The technology behind ChatGPT, Claude, and Gemini. It predicts what text should come next based on patterns learned from trillions of words.',
    example: "Illustrative task: an LLM drafts a summary of a 40-page RFP, which a consultant checks against the source document.",
    matters: 'LLMs are the engine behind most business AI use cases today — email, documents, reports, customer service, code. Understanding their capabilities and limits is essential.',
    related: ['Generative AI', 'Prompt', 'Context Window', 'Hallucination'],
  },
  {
    term: 'Generative AI',
    short: 'GenAI',
    category: 'Core AI',
    definition: 'AI that creates new content — text, images, audio, code, video — rather than just classifying or analysing existing content.',
    simple: 'AI that makes things. Not just "is this email urgent?" but "write a reply to this email."',
    example: 'Generating 500 personalised product descriptions from a data sheet. Or producing a first draft of a board paper from bullet points.',
    matters: 'Generative AI is what made AI accessible to every business function. Previously, AI was mostly for data scientists. Now, a marketer can use it.',
    related: ['Large Language Model (LLM)', 'Prompt', 'Structured Output', 'Hallucination'],
  },

  // ── INTERACTION LAYER ────────────────────────────────────────────────────
  {
    term: 'Prompt',
    short: '',
    category: 'Interaction Layer',
    mustKnow: true,
    definition: 'The instruction you give an AI model — including role, context, task, format, and constraints.',
    simple: "A prompt can be a question or detailed instructions. Clear context and testing often improve results, but cannot guarantee accuracy.",
    example: "Example prompt: classify a customer email into one of eight categories and return structured JSON. Test on real cases and route ambiguous or risky outputs to human review; a prompt alone is not production-ready.",
    matters: 'Most people write prompts like search queries. Treating them as precise instructions multiplies output quality immediately.',
    related: ['Prompt Engineering', 'System Prompt', 'Context', 'Structured Output'],
  },
  {
    term: 'Prompt Engineering',
    short: '',
    category: 'Interaction Layer',
    definition: 'The practice of designing, testing, and refining prompts to consistently produce high-quality outputs from AI models.',
    simple: "Writing clear instructions, examples and constraints, then testing whether outputs improve on representative tasks.",
    example: "Illustrative process: compare an initial classification prompt with a revised version on the same held-out test set; record errors, latency and any improvement.",
    matters: "Prompt design is a useful skill, but value depends on the task. Test quality and measure time saved rather than assuming a universal return.",
    related: ['Prompt', 'System Prompt', 'Context', 'Structured Output'],
  },
  {
    term: 'System Prompt',
    short: '',
    category: 'Interaction Layer',
    definition: 'Standing instructions given to an AI at the start of every session — defining its role, behaviour, constraints, and tone.',
    simple: 'The brief you give AI before it starts work. "You are a legal document reviewer. You never give legal advice. You always cite the source clause." — that\'s a system prompt.',
    example: 'A customer service AI system prompt: role, company name, product list, tone guidelines, escalation rules, and 3 things it must never say.',
    matters: "Repeated system prompts can add cost. For example, 500 input tokens across 10,000 daily calls is 5 million tokens/day; multiply by the model's current input rate, accounting for caching.",
    related: ['Prompt', 'Context', 'Token', 'Cost per Token'],
  },
  {
    term: 'User Prompt',
    short: '',
    category: 'Interaction Layer',
    definition: 'The specific input from a user in a given session — the question, document, or task provided to the AI at runtime.',
    simple: 'The thing you actually type or paste into the AI. Combined with the system prompt, this forms the full context the AI works with.',
    example: 'The customer\'s email pasted into the support tool. The financial data uploaded to the analyst AI. The meeting transcript sent for summarisation.',
    matters: 'The division between system prompt (standing instructions) and user prompt (session-specific input) is fundamental to building scalable AI systems.',
    related: ['System Prompt', 'Prompt', 'Context', 'Context Window'],
  },
  {
    term: 'Context',
    short: '',
    category: 'Interaction Layer',
    mustKnow: true,
    definition: 'All the information available to the AI when generating a response — including instructions, documents, history, and retrieved data.',
    simple: 'Everything the AI can "see" when answering. Better context = better answers. But more context is not always better — irrelevant context confuses the model.',
    example: 'Customer service AI context: the customer\'s email + their account history from CRM + relevant FAQ sections retrieved from the knowledge base = 3 sources combined.',
    matters: "Relevant, reliable context helps, but missing, irrelevant or untrusted information can still lead to errors. Evaluate outputs and protect sensitive data.",
    related: ['Context Window', 'Memory (Session)', 'Retrieval-Augmented Generation (RAG)', 'Prompt'],
  },
  {
    term: 'Context Window',
    short: '',
    category: 'Interaction Layer',
    definition: 'The maximum amount of text (measured in tokens) an AI model can process in a single request — its "working memory" for that session.',
    simple: 'How much the AI can hold in mind at once. Once you exceed it, the model starts "forgetting" earlier content.',
    example: "Context windows differ across models and versions. Check the provider's current model documentation before planning long-document workflows.",
    matters: 'For most business use cases, context windows are large enough not to be a constraint. For legal or research applications dealing with very long documents, they matter.',
    related: ['Context', 'Token', 'Memory (Session)', 'Retrieval-Augmented Generation (RAG)'],
  },
  {
    term: 'Memory (Session)',
    short: '',
    category: 'Interaction Layer',
    definition: "Information maintained within a conversation or session; how long it persists depends on the application and its settings.",
    simple: "A model can use prior messages included in its context. Some products also retain or retrieve information between chats when memory features are enabled.",
    example: "A support assistant refers to earlier messages in the current conversation. A separate session may or may not have access to that history, depending on the product configuration.",
    matters: "Do not assume every AI product forgets everything when a chat closes. Check memory, retention, privacy controls and whether prior conversations can be referenced.",
    related: ['Memory (Persistent)', 'Context', 'Context Window'],
  },
  {
    term: 'Memory (Persistent)',
    short: '',
    category: 'Interaction Layer',
    definition: "Information retained or retrieved across conversations, using product memory features, stored records or other persistent context mechanisms.",
    simple: "A system may save useful context and retrieve it later. The mechanism and user controls vary by product; design for privacy, consent and retention.",
    example: 'CRM AI that "knows" a customer has complained twice this month and has VIP status — because those facts are pulled from the database and loaded at session start.',
    matters: 'Persistent memory is an engineering decision — it must be deliberately built. If your AI use case benefits from remembering users or history, design the memory architecture early.',
    related: ['Memory (Session)', 'Context', 'Retrieval-Augmented Generation (RAG)', 'Knowledge Base'],
  },
  {
    term: 'Tool Use / Tool Calling',
    short: '',
    category: 'Interaction Layer',
    definition: 'The ability of an AI model to call external functions, APIs, or services during its reasoning process to retrieve information or take action.',
    simple: 'AI doesn\'t just talk — with tools, it can do things. Search the web, look up a database, send an email, create a calendar entry.',
    example: 'An HR AI asked "Can I book leave next Thursday?" uses tools: calendar tool (check team leave), data tool (check leave balance), communication tool (send request to manager).',
    matters: 'Tools are what turn AI from a text generator into a workflow automation. Without tools, AI can only answer. With tools, it can act.',
    related: ['AI Agent', 'Workflow', 'Automation', 'Orchestration'],
  },
  {
    term: 'Structured Output',
    short: '',
    category: 'Interaction Layer',
    definition: 'AI output in a specific, machine-readable format — such as JSON, XML, or a defined template — rather than free-form prose.',
    simple: 'Telling AI to return exactly {"category": "billing", "urgency": "high"} instead of a paragraph. Downstream systems need structured data, not essays.',
    example: 'Invoice processing AI returns: {"supplier": "Acme", "amount": 4250.00, "due_date": "2025-05-15", "po_match": true}. This feeds directly into the accounting system.',
    matters: 'Structured output is what connects AI to your existing systems. Without it, a human must read the AI\'s response and enter data manually — defeating the purpose.',
    related: ['Prompt', 'Prompt Engineering', 'Tool Use / Tool Calling', 'Data Pipeline'],
  },

  // ── MODEL & ARCHITECTURE ─────────────────────────────────────────────────
  {
    term: 'Model',
    short: '',
    category: 'Model & Architecture',
    mustKnow: true,
    definition: 'The trained AI system that processes inputs and generates outputs — the engine behind every AI product or feature.',
    simple: "The AI model itself. GPT, Claude and Gemini are model families, each with versions that differ in capabilities, speed, cost and context limits.",
    example: "Compare a small, fast model for high-volume classification with a more capable model for complex report drafting, using task-specific tests and current prices.",
    matters: "Model choice can materially affect cost, quality and risk. Compare options on your actual tasks rather than assuming one size always fits all.",
    related: ['Model Training', 'Fine-tuning', 'Cost per Token', 'Large Language Model (LLM)'],
  },
  {
    term: 'Model Training',
    short: '',
    category: 'Model & Architecture',
    definition: 'The process of exposing a model to large amounts of data so it learns patterns, relationships, and capabilities.',
    simple: "Models learn statistical patterns during training on datasets. The training methods, data and disclosure practices vary by provider.",
    example: 'You don\'t train models as a business — you use pre-trained models. The training was done by OpenAI, Anthropic, or Google. Your job is to use them well.',
    matters: 'You need to know this exists but you\'ll almost never do it. Understanding it helps explain why AI knows some things and not others, and why it has knowledge cutoffs.',
    related: ['Fine-tuning', 'Machine Learning (ML)', 'Deep Learning'],
  },
  {
    term: 'Fine-tuning',
    short: '',
    category: 'Model & Architecture',
    definition: 'Additional training of an existing pre-trained model on a specific dataset to improve its performance on a particular task or domain.',
    simple: 'Taking a general-purpose model and training it further on your specific data so it performs better on your specific tasks.',
    example: "Illustrative scenario: a legal team fine-tunes a model on labelled contract clauses, then compares its accuracy with prompting and retrieval approaches on held-out examples.",
    matters: "Fine-tuning can help with specialised behaviour, but adds data, evaluation and maintenance costs. Compare prompting, retrieval and fine-tuning using evidence from your task.",
    related: ['Model Training', 'Prompt Engineering', 'Machine Learning (ML)'],
  },
  {
    term: 'Embeddings',
    short: '',
    category: 'Model & Architecture',
    definition: 'Mathematical representations of text (or other content) as numerical vectors that capture semantic meaning — enabling similarity search.',
    simple: 'A way of turning text into numbers such that similar meanings are represented by similar numbers. "Customer complaint" and "client grievance" would have very similar embeddings.',
    example: 'A policy Q&A system embeds all 500 policy documents. When an employee asks a question, the query is also embedded and the most similar policy sections are retrieved.',
    matters: 'Embeddings are the foundation of RAG systems — the technology behind "AI that searches your documents." You don\'t need to build them, but knowing they exist helps when selecting AI tools.',
    related: ['Retrieval-Augmented Generation (RAG)', 'Vector Database', 'Latent Space', 'Knowledge Base'],
  },
  {
    term: 'Vector Database',
    short: '',
    category: 'Model & Architecture',
    definition: 'A database designed to store and search embeddings — enabling fast similarity search across large collections of documents or data.',
    simple: 'A special kind of database that stores documents as mathematical representations and can find the most relevant ones for any query, even without exact keyword matches.',
    example: 'Pinecone, Supabase pgvector, Weaviate. Store your 50,000 support articles as embeddings. Query: "What\'s your return policy?" retrieves the 5 most relevant articles in milliseconds.',
    matters: 'If you\'re building any AI that needs to search documents, a vector database is likely part of the architecture. Knowing the term helps you ask the right questions.',
    related: ['Embeddings', 'Retrieval-Augmented Generation (RAG)', 'Knowledge Base'],
  },
  {
    term: 'Retrieval-Augmented Generation (RAG)',
    short: 'RAG',
    category: 'Model & Architecture',
    definition: 'An architecture that combines document retrieval with language model generation — the AI retrieves relevant information before generating a response.',
    simple: "A retrieval system finds relevant source material and provides it to a model before it drafts an answer. Retrieval helps grounding but does not guarantee correctness.",
    example: "Illustrative scenario: a legal archive search retrieves relevant contract clauses. An AI drafts an answer with citations; a reviewer checks the clauses and any missing exceptions.",
    matters: "RAG can support document-based answers, but it does not eliminate hallucinations, retrieval errors or the need to verify consequential claims.",
    related: ['Embeddings', 'Vector Database', 'Hallucination', 'Knowledge Base'],
  },
  {
    term: 'Latent Space',
    short: '',
    category: 'Model & Architecture',
    definition: 'The multi-dimensional mathematical space in which a model represents and organises concepts internally.',
    simple: 'Where the model "thinks." Concepts with similar meanings end up close to each other in this space. You never see it — but it\'s what enables semantic understanding.',
    example: 'In latent space, "happy," "joyful," and "pleased" cluster together. "Refund," "return," and "money back" cluster together. This is why AI understands synonyms.',
    matters: 'A conceptual term — useful for understanding why embeddings and semantic search work. No action required.',
    related: ['Embeddings', 'Neural Network', 'Deep Learning'],
  },
  {
    term: 'Parameters',
    short: '',
    category: 'Model & Architecture',
    definition: 'The numerical values within a model that are adjusted during training — the "settings" that encode everything the model has learned.',
    simple: 'If the model is a brain, parameters are the synaptic strengths. More parameters generally = more knowledge and capability, but also more cost and slower speed.',
    example: "Some open-weight models disclose parameter counts; many proprietary models do not. More parameters do not automatically mean better results for your task.",
    matters: 'You won\'t configure parameters directly. Knowing this term helps when comparing model sizes and understanding why smaller models are cheaper and faster.',
    related: ['Model Training', 'Fine-tuning', 'Deep Learning'],
  },
  {
    term: 'Tokenisation',
    short: '',
    category: 'Model & Architecture',
    definition: 'The process of breaking text into tokens — the units the model reads and generates, which are the basis for pricing.',
    simple: 'Before AI reads your text, it splits it into chunks called tokens. English text: roughly 1 token per ¾ word. A 200-word email ≈ 270 tokens.',
    example: '"The quick brown fox" = 5 tokens. A full page document ≈ 700 tokens. Knowing this helps you estimate costs before building.',
    matters: 'Tokenisation is why understanding token counts matters for cost planning. Different languages tokenise differently — non-English text typically uses more tokens per word.',
    related: ['Token', 'Input Tokens', 'Output Tokens', 'Cost per Token'],
  },

  // ── TOKENS & COST ────────────────────────────────────────────────────────
  {
    term: 'Token',
    short: '',
    category: 'Tokens & Cost',
    mustKnow: true,
    definition: 'The basic unit of text that AI models read and generate — approximately 4 characters or ¾ of a word. The basis of AI pricing.',
    simple: 'Think of tokens as the "words" AI counts for billing. Every word you send and every word it generates costs tokens. Small individually — significant at scale.',
    example: "Illustrative maths: 800 emails/day at 300 input tokens each = 240,000 input tokens/day. At US$1 per million input tokens, input cost is US$0.24/day, excluding outputs and other charges.",
    matters: 'Token costs look tiny individually but compound at business scale. Choosing the right model for each task can save thousands per year across multiple use cases.',
    related: ['Input Tokens', 'Output Tokens', 'Cost per Token', 'Tokenisation'],
  },
  {
    term: 'Input Tokens',
    short: '',
    category: 'Tokens & Cost',
    definition: 'Tokens in the content you send to the model — your prompt, context, documents, and conversation history.',
    simple: 'Everything you send to the AI costs input tokens. Your instructions, the document you paste, the customer email — all input tokens.',
    example: 'System prompt (400 tokens) + customer email (280 tokens) + account history (320 tokens) = 1,000 input tokens per call.',
    matters: "Input and output token rates often differ; the ratio varies by model. Repeated prompts can add cost, though caching may reduce it.",
    related: ['Output Tokens', 'Token', 'Cost per Token', 'System Prompt'],
  },
  {
    term: 'Output Tokens',
    short: '',
    category: 'Tokens & Cost',
    definition: 'Tokens in the content generated by the model — its response, analysis, or output.',
    simple: "Generated content consumes output tokens. Output pricing varies by model, so check current rates and keep responses appropriate to the task.",
    example: 'A free-form essay response: 500 output tokens. The same information as structured JSON: 80 output tokens. Same information — 6× cost difference.',
    matters: 'Specifying output format in your prompt (JSON, bullet points, max 100 words) directly reduces output tokens and cost without reducing quality.',
    related: ['Input Tokens', 'Token', 'Cost per Token', 'Structured Output'],
  },
  {
    term: 'Cost per Token',
    short: '',
    category: 'Tokens & Cost',
    definition: 'The price charged per token by an AI provider — typically quoted per million tokens, varying by model.',
    simple: "AI API costs depend on model, input and output tokens, tool calls, caching and other usage. More expensive models are not necessarily better for every task.",
    example: "Illustrative comparison: US$1 versus US$0.10 per million input tokens yields a 10× difference in input cost. Accuracy must be tested rather than assumed.",
    matters: 'The most important cost lever in AI implementation. Always benchmark accuracy before committing to a model. The cheapest model that meets your accuracy threshold is the right choice.',
    related: ['Token', 'Input Tokens', 'Output Tokens', 'Token Efficiency'],
  },
  {
    term: 'Token Efficiency',
    short: '',
    category: 'Tokens & Cost',
    definition: 'Maximising the quality of AI output while minimising the number of tokens used — through prompt compression, caching, and smart retrieval.',
    simple: 'Getting more done with fewer tokens. The five levers: right-size model, compress prompts, cache responses, truncate inputs, batch requests.',
    example: "Illustrative maths: reducing a 600-token prompt to 280 tokens saves 3.2 million input tokens/day at 10,000 calls. At US$1 per million input tokens, that is US$3.20/day before caching effects.",
    matters: 'Token efficiency is ongoing work, not a one-time setup. A quarterly prompt audit often reveals significant cost savings as prompts accumulate unnecessary content.',
    related: ['Token', 'Cost per Token', 'System Prompt', 'Throughput'],
  },
  {
    term: 'Throughput',
    short: '',
    category: 'Tokens & Cost',
    definition: 'The number of tokens or requests an AI system can process per unit of time — a measure of system capacity and speed.',
    simple: 'How much work the AI can do per minute or per second. Relevant when processing high volumes — e.g. 10,000 emails at once.',
    example: 'Batch processing 5,000 monthly reports overnight vs real-time processing during business hours. Batch has higher throughput allowance and often lower cost.',
    matters: 'For real-time customer-facing applications, throughput affects response time. For batch processing, it determines job completion time. Design for your actual volume needs.',
    related: ['Latency', 'Scalability', 'Token', 'Cost per Token'],
  },

  // ── AGENTS & AUTOMATION ──────────────────────────────────────────────────
  {
    term: 'AI Agent',
    short: '',
    category: 'Agents & Automation',
    mustKnow: true,
    definition: 'An AI system that autonomously plans and executes a sequence of actions to achieve a goal — using tools, memory, and reasoning.',
    simple: 'An AI that does things, not just says things. You give it a goal; it figures out the steps and carries them out.',
    example: 'Research agent: given "summarise our top 3 competitors\' pricing," it searches each competitor\'s website, extracts pricing, compares, and delivers a formatted brief — without step-by-step instructions.',
    matters: 'Agents are where significant business automation value lives. But they also carry risk — over-automation, credential exposure, and cost runaway if not designed carefully.',
    related: ['Agentic AI', 'Multi-agent System', 'Tool Use / Tool Calling', 'Decision Loop'],
  },
  {
    term: 'Agentic AI',
    short: '',
    category: 'Agents & Automation',
    definition: 'AI systems capable of taking sequences of autonomous actions toward a goal — including planning, tool use, and self-correction.',
    simple: 'A category of AI behaviour, not a single product. Agentic = acts autonomously across multiple steps. The difference between "answer" and "accomplish."',
    example: 'Booking a meeting: agentic AI checks calendars, finds availability, sends invites, books the room, and notifies attendees — from one instruction.',
    matters: "Agentic AI is a significant area of AI development, but not every workflow benefits from autonomous agents.",
    related: ['AI Agent', 'Multi-agent System', 'Workflow', 'Orchestration'],
  },
  {
    term: 'Multi-agent System',
    short: '',
    category: 'Agents & Automation',
    definition: 'An architecture where multiple specialised AI agents work together — each handling a specific task, coordinated by an orchestration layer.',
    simple: 'Instead of one AI doing everything, a team of AIs each doing what they\'re best at. One classifies, one retrieves, one drafts, one checks quality.',
    example: 'Loan application pipeline: Agent 1 extracts data from documents → Agent 2 checks credit criteria → Agent 3 drafts decision letter → Agent 4 quality-checks → Human approves.',
    matters: 'Multi-agent systems are complex to build but enable sophisticated automation. Relevant for enterprise programs. For most business use cases, a single well-designed agent is sufficient.',
    related: ['AI Agent', 'Orchestration', 'Workflow', 'Agentic AI'],
  },
  {
    term: 'Workflow',
    short: '',
    category: 'Agents & Automation',
    mustKnow: true,
    definition: 'The sequence of steps — human and AI — that together complete a business process, with defined inputs, outputs, and decision points.',
    simple: 'The process map. Who does what, in what order, with what inputs and outputs. AI should be placed in the workflow at the right point — not bolted on.',
    example: 'Current: Email arrives → agent reads → agent researches → agent drafts reply → agent sends (45 min). Future: Email arrives → AI classifies + retrieves → agent reviews AI draft → agent sends (8 min).',
    matters: "AI rarely compensates for an unclear or poorly controlled workflow. Map the current process, define controls and measure the redesigned process.",
    related: ['Automation', 'AI Agent', 'Tool Use / Tool Calling', 'Orchestration'],
  },
  {
    term: 'Automation',
    short: '',
    category: 'Agents & Automation',
    mustKnow: true,
    definition: 'Using technology — including AI — to perform tasks with reduced or no human involvement.',
    simple: 'The task gets done without someone manually doing it. AI automation is different from traditional automation because it handles unstructured inputs (emails, documents, images) not just structured data.',
    example: "Illustrative invoice workflow: extract fields from a scanned PDF, validate against purchase orders and route exceptions for human approval. Measure accuracy before automating posting.",
    matters: 'Don\'t automate a broken process. Don\'t automate judgment that should stay human. Start with augmentation (AI assists human) before full automation (AI replaces human).',
    related: ['Workflow', 'AI Agent', 'Orchestration', 'Human-in-the-loop'],
  },
  {
    term: 'Orchestration',
    short: '',
    category: 'Agents & Automation',
    definition: 'The coordination layer that manages multiple AI models, tools, and steps in a complex workflow — routing tasks and combining results.',
    simple: 'The conductor. Multiple AI models are the orchestra. Orchestration decides which model does what, in what order, and how the results combine.',
    example: 'Orchestration layer receives a customer email → routes to classification model → routes to CRM lookup tool → routes to response generation model → routes to quality check model → returns final output.',
    matters: 'For enterprise AI programs: standardise on your orchestration layer, not on one model. This lets you swap models freely as better/cheaper options emerge.',
    related: ['Multi-agent System', 'Workflow', 'Tool Use / Tool Calling', 'AI Agent'],
  },
  {
    term: 'Toolchain',
    short: '',
    category: 'Agents & Automation',
    definition: 'The set of tools available to an AI agent — defining what actions it can take in the world.',
    simple: 'The AI\'s toolkit. A customer service agent\'s toolchain might include: CRM lookup, order status API, email sending, escalation flagging.',
    example: 'Defining the toolchain is a security decision as much as a capability decision. An agent should only have access to the tools it needs for its specific task.',
    matters: 'Over-permissioned toolchains are a security risk. A customer service AI should not have write access to financial systems. Define toolchains with minimum necessary permissions.',
    related: ['Tool Use / Tool Calling', 'AI Agent', 'Orchestration', 'Guardrails'],
  },
  {
    term: 'Decision Loop',
    short: '',
    category: 'Agents & Automation',
    definition: 'The plan-act-observe-adjust cycle that AI agents use to complete tasks iteratively, revising their approach based on results.',
    simple: 'The agent\'s thinking process: plan the steps → take an action → see what happened → adjust the next step → repeat until done.',
    example: 'Research agent: Plan (search 3 sources) → Act (search competitor 1) → Observe (result is a login page — no data) → Adjust (search for competitor 1 pricing blog instead) → Continue.',
    matters: 'Understanding the decision loop helps you design better agent workflows and debug when agents behave unexpectedly. Poorly designed loops can cycle indefinitely — always include a maximum iteration limit.',
    related: ['AI Agent', 'Agentic AI', 'Workflow', 'Guardrails'],
  },

  // ── TASK TYPES ───────────────────────────────────────────────────────────
  {
    term: 'Classification',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that assigns inputs to one of a set of predefined categories.',
    simple: 'Sorting. Is this email a complaint, a question, or a compliment? Is this transaction fraudulent or legitimate? Classification answers "which category?"',
    example: '800 support emails/day classified into 12 categories with confidence scores. Routed automatically. Agents only see unclassified or low-confidence items.',
    matters: 'Classification is the most common high-ROI AI use case in business. High volume, repetitive, well-defined — all the signals of a good first AI project.',
    related: ['Summarisation', 'Extraction', 'Structured Output', 'AI Use Case'],
  },
  {
    term: 'Summarisation',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that condenses longer content into a shorter, coherent representation while preserving key information.',
    simple: 'Making long things short. 40-page RFP → 3-page summary. 90-minute meeting transcript → 10 action items. Hour-long support call → 5-sentence case summary.',
    example: 'Customer service: AI reads the full case history (12 interactions over 3 weeks) and produces a 5-sentence handover brief before the agent picks up the call.',
    matters: 'Summarisation is immediately deployable in almost every business function. Low risk, high immediate value, easy to measure quality.',
    related: ['Extraction', 'Generation', 'Context', 'Token'],
  },
  {
    term: 'Extraction',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that pulls specific pieces of information from unstructured text — names, dates, amounts, clauses, entities.',
    simple: 'Finding the needle in the haystack. Pull all supplier names, amounts, and due dates from 200 invoices. Extract all risk clauses from a 50-page contract.',
    example: "Illustrative invoice extraction: measure field-level accuracy and processing time against a representative set of invoices, including exceptions and handwritten documents.",
    matters: 'Extraction enables AI to feed structured data into your existing systems — accounting, CRM, ERP. It\'s the bridge between unstructured documents and structured systems.',
    related: ['Classification', 'Structured Output', 'Data Pipeline', 'Summarisation'],
  },
  {
    term: 'Generation',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that creates new content — text, code, images, or other outputs — based on instructions and context.',
    simple: 'Making something new. Draft this email. Write this proposal section. Create this report narrative. Generate these product descriptions.',
    example: 'Automated weekly performance report: AI receives structured sales data → generates a 300-word narrative summary with highlights and concerns → finance manager reviews and sends.',
    matters: 'Generation is powerful but requires the most quality oversight. Always review generated content before it reaches customers or stakeholders. Hallucination risk is highest in generation tasks.',
    related: ['Summarisation', 'Prompt', 'Hallucination', 'Generative AI'],
  },
  {
    term: 'Sentiment Analysis',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that identifies the emotional tone of text — typically positive, negative, neutral, or more nuanced emotional states.',
    simple: 'Reading emotional temperature. Is this customer review positive, negative, or angry? Is this email escalation-worthy based on its tone?',
    example: 'Customer feedback AI: scores each review for sentiment, frustration level, and specific complaint type. Flags reviews mentioning legal action or cancellation for immediate human review.',
    matters: 'Sentiment analysis is a good second-wave use case after classification. Adds another dimension to routing and prioritisation decisions.',
    related: ['Classification', 'Extraction', 'Human-in-the-loop'],
  },
  {
    term: 'Decisioning',
    short: '',
    category: 'Task Types',
    definition: 'An AI task that evaluates inputs against defined criteria and produces a recommended or automated decision.',
    simple: 'AI making a call. Approve or decline this loan application. Escalate or resolve this support ticket. Promote or standard-ship this order.',
    example: 'Insurance claim triage: AI evaluates claim against policy criteria, fraud indicators, and amount thresholds. Auto-approves claims meeting all criteria under $5,000. Flags others for adjuster.',
    matters: 'Decisioning carries the highest risk of all AI task types. Ensure: defined criteria, confidence thresholds, human override path, audit trail, and regular accuracy reviews.',
    related: ['Classification', 'Human-in-the-loop', 'Guardrails', 'Responsible AI'],
  },

  // ── DATA & CONTEXT ───────────────────────────────────────────────────────
  {
    term: 'Structured Data',
    short: '',
    category: 'Data & Context',
    definition: 'Data organised in a defined format with consistent fields — typically in tables, spreadsheets, or databases.',
    simple: 'Data in rows and columns. Salesforce records, Excel spreadsheets, database tables. Every field has a name and type. Easy for machines to process.',
    example: 'A transaction database: date, amount, merchant, category, account_id. Every row has every field. AI can analyse this directly.',
    matters: 'AI works best with structured data. If your data is unstructured (emails, PDFs, voice), budget for a data preparation step before your AI project begins.',
    related: ['Unstructured Data', 'Data Quality', 'Data Pipeline', 'Data Mapping'],
  },
  {
    term: 'Unstructured Data',
    short: '',
    category: 'Data & Context',
    definition: 'Data with no predefined format — text, emails, PDFs, audio, images, videos.',
    simple: 'Everything that isn\'t in a spreadsheet. Emails, Word documents, PDFs, meeting recordings, customer reviews — all unstructured. LLMs exist largely to handle this.',
    example: 'Customer emails, support chat transcripts, meeting recordings, scanned invoices. These are all unstructured — and they represent the majority of business data.',
    matters: 'The rise of LLMs made unstructured data usable at scale. Most high-value AI use cases involve converting unstructured input into structured output.',
    related: ['Structured Data', 'Extraction', 'Data Pipeline', 'Large Language Model (LLM)'],
  },
  {
    term: 'Data Quality',
    short: '',
    category: 'Data & Context',
    definition: 'The degree to which data is accurate, complete, consistent, and current enough to be useful for AI applications.',
    simple: 'The single biggest factor in AI performance after prompt quality. Bad data in = bad outputs out — every time, no exceptions.',
    example: "Illustrative scenario: a support dataset contains duplicates, incorrect labels and unresolved cases. Cleaning and relabelling can improve performance; measure the change on a held-out test set.",
    matters: "Data quality often matters as much as model choice. Estimate preparation effort from your actual sources rather than assuming a universal share of project time.",
    related: ['Data Cleaning', 'Data Pipeline', 'Structured Data', 'Bias'],
  },
  {
    term: 'Data Cleaning',
    short: '',
    category: 'Data & Context',
    definition: 'The process of identifying and correcting errors, inconsistencies, and gaps in data to make it suitable for AI use.',
    simple: 'Fixing the data before the AI touches it. Standardising formats, removing duplicates, filling gaps, correcting errors.',
    example: "Illustrative scenario: dates arrive in several formats. Normalise them to ISO 8601 and test extraction on edge cases, rather than assuming a fixed failure rate.",
    matters: "Data cleaning and validation are essential. Their effort depends on source-system quality, complexity and the intended use.",
    related: ['Data Quality', 'Data Pipeline', 'Data Mapping', 'Structured Data'],
  },
  {
    term: 'Data Mapping',
    short: '',
    category: 'Data & Context',
    definition: 'The process of defining how data elements from source systems correspond to fields in the AI pipeline or target system.',
    simple: 'The translation guide. Source field "cust_name" maps to target field "customer_full_name". Source uses codes (1=active, 2=inactive) mapped to labels ("active", "inactive").',
    example: 'Three CRM systems merged into one AI pipeline. Data mapping documents: which field from which system maps to the AI input, what transformation is applied, who owns each field.',
    matters: 'Without data mapping, integration projects fail. It\'s also the governance document — it shows exactly what data flows through the AI and why.',
    related: ['Data Pipeline', 'Data Cleaning', 'Structured Data', 'Data Quality'],
  },
  {
    term: 'Data Pipeline',
    short: '',
    category: 'Data & Context',
    definition: 'The automated flow of data from source systems through transformation steps to the AI model and back to destination systems.',
    simple: 'The plumbing. Data comes in from one place, gets cleaned and transformed, feeds into the AI, and the output goes somewhere useful.',
    example: 'Email arrives → extracted to JSON → cleaned (PII removed) → sent to classification model → output written to CRM ticket with category and confidence score.',
    matters: 'The pipeline is as important as the model. A great model with a broken pipeline produces no value. Design and test the full pipeline before going live.',
    related: ['Data Mapping', 'Data Cleaning', 'Structured Output', 'Automation'],
  },
  {
    term: 'Knowledge Base',
    short: '',
    category: 'Data & Context',
    definition: 'A curated collection of documents, policies, or information used as the source for RAG-based AI systems.',
    simple: 'The documents your AI searches when it needs to answer questions. Policy manuals, product docs, FAQs, past cases. Quality of the knowledge base determines quality of answers.',
    example: 'HR AI knowledge base: 50 policy documents, 200 FAQ answers, 12 process guides. Employee asks about parental leave — AI searches the knowledge base, finds the relevant policy, answers accurately.',
    matters: 'Maintaining the knowledge base is ongoing work. Outdated or contradictory documents cause hallucination and incorrect answers. Assign a Knowledge Base Owner.',
    related: ['Retrieval-Augmented Generation (RAG)', 'Vector Database', 'Memory (Persistent)', 'Embeddings'],
  },

  // ── PERFORMANCE & TRADE-OFFS ─────────────────────────────────────────────
  {
    term: 'Accuracy',
    short: '',
    category: 'Performance & Trade-offs',
    definition: 'The percentage of AI outputs that are correct or acceptable according to a defined standard — measured against a validation dataset.',
    simple: 'How often the AI gets it right. Not a vague feeling — a specific number measured against real examples.',
    example: "Illustrative calculation: 462 correct classifications out of 500 gives 92.4% accuracy. Whether that is acceptable depends on the cost and severity of misroutes.",
    matters: "Set task-specific performance thresholds before deployment. Include error severity, subgroup performance, human review capacity and business outcomes; there is no universal safe accuracy percentage.",
    related: ['Hallucination', 'Bias', 'Model Drift', 'Human-in-the-loop'],
  },
  {
    term: 'Latency',
    short: '',
    category: 'Performance & Trade-offs',
    definition: 'The time delay between sending a request to an AI model and receiving its response.',
    simple: 'How fast the AI responds. Frontier models: typically 2–8 seconds. Smaller models: under 1 second. For real-time customer interactions, latency matters.',
    example: 'Live chat AI must respond within 1–2 seconds or it feels broken. Email processing AI can take 10 seconds — the email was already asynchronous.',
    matters: 'Latency influences model selection. For real-time applications, smaller faster models are often preferable even at some accuracy cost.',
    related: ['Throughput', 'Cost vs Performance', 'Model', 'Scalability'],
  },
  {
    term: 'Cost vs Performance',
    short: '',
    category: 'Performance & Trade-offs',
    definition: 'The trade-off between AI model capability and cost — the goal is the cheapest model that meets the required performance threshold.',
    simple: 'More expensive models are not always better for your use case. The goal is the cheapest model that meets your accuracy requirement. Always benchmark before committing.',
    example: "Illustrative model comparison: two options achieve different accuracy and cost on the same classification task. Evaluate the impact of errors before selecting the cheaper option.",
    matters: 'Most organisations default to frontier models out of caution. This is unnecessarily expensive. Benchmark first — it takes one afternoon and saves thousands per year.',
    related: ['Accuracy', 'Cost per Token', 'Latency', 'Token Efficiency'],
  },
  {
    term: 'Scalability',
    short: '',
    category: 'Performance & Trade-offs',
    definition: 'The ability of an AI system to maintain performance and cost-efficiency as volume increases.',
    simple: 'Does it still work well — and remain affordable — when you go from 100 users to 10,000? Scalability is designed in, not added later.',
    example: 'System designed for 500 queries/day hits 5,000 queries/day after a successful launch. Without scalability planning: costs 10× unexpectedly, latency spikes, API rate limits hit.',
    matters: 'Design for 10× your expected volume. Build in caching and rate limit handling from day one. Review cost projections at 1×, 5×, and 10× expected volume before launch.',
    related: ['Throughput', 'Cost per Token', 'Latency', 'Token Efficiency'],
  },
  {
    term: 'Determinism vs Variability',
    short: '',
    category: 'Performance & Trade-offs',
    definition: 'The spectrum from AI outputs that are always the same (deterministic) to outputs that vary (variable) — controlled by the temperature parameter.',
    simple: 'Temperature = 0: AI gives the same answer every time. Temperature = 1: AI gives creative, varied responses. For classification and extraction: use 0. For writing: use 0.5–0.8.',
    example: 'Fraud detection AI: temperature 0 (same result every time, auditable). Marketing copy AI: temperature 0.7 (varied, creative outputs).',
    matters: 'Set temperature based on your use case. Classification and decisioning need low temperature (consistency, auditability). Creative generation benefits from higher temperature.',
    related: ['Accuracy', 'Structured Output', 'Guardrails', 'Auditability'],
  },

  // ── RISKS & LIMITATIONS ──────────────────────────────────────────────────
  {
    term: 'Hallucination',
    short: '',
    category: 'Risks & Limitations',
    mustKnow: true,
    definition: 'When an AI model generates confidently stated but factually incorrect information — making things up.',
    simple: 'AI lying convincingly. It doesn\'t know it\'s wrong. It states false information with the same confidence as true information. Design your systems to handle this.',
    example: 'Asked about a specific legal case, AI invents a plausible-sounding but non-existent case citation. Asked about a product feature, AI describes a feature that doesn\'t exist.',
    matters: 'Hallucination is the most important risk to design around in business AI. Three mitigations: RAG (ground AI in real documents), confidence thresholds (discard uncertain outputs), human review for consequential decisions.',
    related: ['Retrieval-Augmented Generation (RAG)', 'Guardrails', 'Human-in-the-loop', 'Responsible AI'],
  },
  {
    term: 'Bias',
    short: '',
    category: 'Risks & Limitations',
    definition: 'Systematic unfairness in AI outputs caused by patterns in training data that reflect historical inequalities or human prejudice.',
    simple: 'If the training data was biased, the AI will be biased. An AI trained on historical hiring data from a company that hired mostly men will rate male candidates higher.',
    example: 'Loan approval AI trained on 15 years of approvals: approves 78% of applications from postcode A and 43% from postcode B. Investigation shows postcode is a proxy for demographics.',
    matters: 'For any AI making consequential decisions about people — hiring, lending, healthcare, benefits — bias testing is mandatory, not optional.',
    related: ['Responsible AI', 'AI Governance', 'Hallucination', 'Human-in-the-loop'],
  },
  {
    term: 'Model Drift',
    short: '',
    category: 'Risks & Limitations',
    definition: 'The gradual decline in AI model performance over time as real-world data patterns shift away from what the model was trained on.',
    simple: 'The world changes; the model doesn\'t. A model trained on pre-2023 data may perform worse as language, products, and processes evolve.',
    example: 'Customer sentiment classifier trained in 2023 starts misclassifying in 2025 because customer communication styles and product terminology have changed.',
    matters: 'Monitor accuracy metrics continuously after deployment. Set thresholds that trigger review — e.g. if weekly accuracy drops > 5%, investigate. Schedule quarterly model reviews.',
    related: ['Accuracy', 'Model Training', 'AI Governance', 'Responsible AI'],
  },
  {
    term: 'Overfitting',
    short: '',
    category: 'Risks & Limitations',
    definition: 'When a model performs extremely well on training data but poorly on new, real-world data — it has memorised rather than learned.',
    simple: 'The model learned the test answers by heart instead of understanding the subject. Works perfectly in testing, fails in production.',
    example: 'Fraud model achieves 99% accuracy in testing. In production: 60% accuracy. Investigation: training data was too small and the model memorised it.',
    matters: 'Always test on data the model has never seen. A 99% accuracy in training with 70% in production is overfitting. Require production performance metrics before signing off on any AI system.',
    related: ['Accuracy', 'Model Training', 'Data Quality'],
  },
  {
    term: 'Data Leakage',
    short: '',
    category: 'Risks & Limitations',
    definition: 'The unintended exposure of sensitive data — through AI model outputs, training data, or system integration vulnerabilities.',
    simple: 'AI accidentally reveals information it shouldn\'t. Customer data appears in a response to a different customer. Internal pricing leaks through a customer-facing AI.',
    example: 'Customer service AI trained on historical chats that included internal agent notes. AI occasionally surfaces those internal notes in customer-facing responses.',
    matters: 'Data leakage can violate privacy regulations and destroy customer trust. Review all training data for sensitive content. Implement output filtering for any customer-facing AI.',
    related: ['Responsible AI', 'AI Governance', 'Bias', 'Guardrails'],
  },

  // ── GOVERNANCE & RESPONSIBILITY ──────────────────────────────────────────
  {
    term: 'Responsible AI',
    short: '',
    category: 'Governance & Responsibility',
    definition: 'The practice of developing and deploying AI systems that are fair, transparent, accountable, safe, and compliant with applicable regulations.',
    simple: 'Building AI that you can defend to your customers, regulators, and board. Not an afterthought — designed in from the start.',
    example: 'Before deploying a claims processing AI: bias testing across demographic groups, confidence thresholds set, human review path built, audit trail configured, privacy assessment completed.',
    matters: 'Every AI system touching customers or making consequential decisions requires a Responsible AI review. In regulated industries, this is mandatory. In all industries, it\'s the right thing.',
    related: ['AI Governance', 'Guardrails', 'Human-in-the-loop', 'Auditability'],
  },
  {
    term: 'AI Governance',
    short: '',
    category: 'Governance & Responsibility',
    definition: 'The policies, processes, and controls that define how AI is developed, deployed, monitored, and managed within an organisation.',
    simple: 'The rules of the road for AI in your organisation. Who can approve AI use cases? What data can AI touch? Who reviews AI decisions? How are incidents handled?',
    example: 'AI governance framework: AI use register, pre-deployment checklist, data usage policy, incident response process, quarterly review cadence, named accountability for each AI system.',
    matters: 'Without governance, AI programs become ungovernable as they scale. Establish basic governance before the third use case — retrofitting it after 10 use cases is painful.',
    related: ['Responsible AI', 'Guardrails', 'Auditability', 'Compliance'],
  },
  {
    term: 'Guardrails',
    short: '',
    category: 'Governance & Responsibility',
    definition: 'Constraints and controls built into AI systems to prevent harmful, inappropriate, or unintended outputs.',
    simple: 'The fences. Confidence thresholds (discard uncertain outputs), topic restrictions (don\'t answer questions about X), content filters (never say Y), kill switches.',
    example: 'Customer service AI guardrails: confidence < 70% → human review, no legal advice, no pricing commitments without approval, no mention of competitor names, always offer escalation.',
    matters: 'Guardrails are not optional for customer-facing AI. Define them before build, not after the first incident. Test them explicitly as part of quality assurance.',
    related: ['Responsible AI', 'Human-in-the-loop', 'AI Governance', 'Hallucination'],
  },
  {
    term: 'Human-in-the-loop',
    short: 'HITL',
    category: 'Governance & Responsibility',
    definition: 'A design pattern where humans review, approve, or override AI decisions — especially for high-stakes or low-confidence outputs.',
    simple: 'The human review step. AI does the work; human checks and approves before it counts. Essential for consequential decisions, low-confidence outputs, and escalations.',
    example: "Illustrative loan-assistance workflow: AI flags incomplete applications for trained staff, records supporting evidence and preserves meaningful human review for consequential decisions.",
    matters: "Design human oversight according to risk, legal requirements and affected people. Do not remove review merely because a confidence score looks high.",
    related: ['Guardrails', 'Responsible AI', 'Accuracy', 'Decisioning'],
  },
  {
    term: 'Auditability',
    short: '',
    category: 'Governance & Responsibility',
    definition: 'The ability to trace, explain, and verify AI decisions — including what inputs were used, what logic was applied, and what output was produced.',
    simple: 'The paper trail. For every AI decision: what did it receive, what did it decide, why, and when. Required for compliance, debugging, and dispute resolution.',
    example: 'Customer denied a loan by AI. Audit log shows: inputs received (income, credit score, loan amount), criteria applied, score produced (64/100), threshold (70), decision (decline), timestamp.',
    matters: 'Auditability is not just good practice — in regulated industries it\'s a legal requirement. Build logging from day one. It\'s far cheaper than retrofitting.',
    related: ['AI Governance', 'Responsible AI', 'Compliance', 'Human-in-the-loop'],
  },
  {
    term: 'Compliance',
    short: '',
    category: 'Governance & Responsibility',
    definition: 'Adherence to laws, regulations, and standards governing how AI systems can collect, use, and process data.',
    simple: 'Following the rules. Australian Privacy Act, GDPR, industry regulations, internal policies. AI doesn\'t change your compliance obligations — it adds new dimensions to them.',
    example: 'Customer data cannot leave Australia under certain contracts. AI must use Azure Australia East or AWS Sydney — not the US endpoints. This is a compliance requirement driving architecture.',
    matters: 'Compliance requirements shape architecture choices (data residency), access controls (PII handling), and operational processes (retention, deletion). Involve legal early.',
    related: ['AI Governance', 'Responsible AI', 'Data Leakage', 'Auditability'],
  },

  // ── MODERN AI 2026 ────────────────────────────────────────────────────────
  {
    term: 'Multimodal AI',
    short: '',
    category: 'Modern AI (2026)',
    definition: 'AI systems that can process and generate multiple types of input/output — text, images, audio, video — in a single model.',
    simple: "Modern multimodal models can handle combinations of text, images, audio or video; supported inputs and outputs vary by model.",
    example: 'Customer sends a photo of a damaged product + a complaint text. Multimodal AI processes both together: identifies the damage type from the image, reads the complaint, drafts a response.',
    matters: 'Multimodal AI unlocks use cases that text-only AI can\'t handle: form processing, quality inspection, document extraction from scanned images, voice-to-action workflows.',
    related: ['Large Language Model (LLM)', 'Generative AI', 'Tool Use / Tool Calling', 'AI Agent'],
  },
  {
    term: 'AI Copilots',
    short: '',
    category: 'Modern AI (2026)',
    definition: 'AI tools embedded in existing applications that assist users with tasks — providing suggestions, completions, and automation within familiar interfaces.',
    simple: 'AI built into the tools you already use. Microsoft 365 Copilot in Word and Excel. GitHub Copilot in your IDE. Salesforce Einstein in your CRM.',
    example: 'Microsoft 365 Copilot: drafts email replies, creates PowerPoint from Word docs, generates Excel formulas, summarises Teams meeting recordings. All within existing Microsoft tools.',
    matters: 'Copilots have the lowest adoption barrier — users stay in familiar tools. Often the fastest path to widespread AI productivity gains across an organisation.',
    related: ['AI Assistants', 'Turnkey AI Tools', 'Workflow', 'Adoption'],
  },
  {
    term: 'AI Assistants',
    short: '',
    category: 'Modern AI (2026)',
    definition: 'Standalone AI tools that help users complete tasks through conversation — ChatGPT, Claude, Gemini, and similar products.',
    simple: 'The chat interfaces. You type, it responds. Great for one-off tasks, drafting, research, and analysis. Less suited to high-volume automated workflows.',
    example: 'A consultant uses Claude to analyse a 40-page report, draft a client update, prepare presentation talking points, and check a contract clause — in 35 minutes of total AI interaction.',
    matters: 'AI assistants are the entry point for most business professionals. High value for knowledge work. Limited by their manual, one-at-a-time interaction model for volume tasks.',
    related: ['AI Copilots', 'Turnkey AI Tools', 'Prompt', 'Generative AI'],
  },
  {
    term: 'Autonomous Systems',
    short: '',
    category: 'Modern AI (2026)',
    definition: 'AI systems that operate independently to complete complex goals — planning, executing, and adapting without ongoing human input.',
    simple: 'AI that runs itself. You set the goal; it figures out and executes everything needed. Highest capability, highest risk. Requires careful guardrail design.',
    example: 'Autonomous competitive intelligence system: runs weekly, searches competitor websites, extracts pricing/feature changes, compares with prior week, flags significant changes, emails the product team.',
    matters: 'Autonomous systems are powerful but require mature AI governance before deployment. Start with supervised agents, evolve to autonomous as trust is established.',
    related: ['AI Agent', 'Agentic AI', 'Guardrails', 'AI Governance'],
  },

  // ── PRACTICAL BUSINESS TERMS ─────────────────────────────────────────────
  {
    term: 'Turnkey AI Tools',
    short: '',
    category: 'Practical Business',
    definition: 'Ready-to-use AI products that require minimal technical setup — subscription-based tools for immediate business use.',
    simple: 'Off-the-shelf AI. Sign up, pay, use. No engineering required. ChatGPT, Otter.ai, Jasper, Microsoft Copilot.',
    example: 'A 50-person professional services firm deploys Otter.ai for meeting transcription ($20/user/month), ChatGPT Team for drafting ($30/user/month), and Microsoft Copilot for Excel ($30/user/month).',
    matters: 'Turnkey tools are the fastest path to AI value. Start here. Build custom AI only when turnkey tools can\'t meet your specific requirements.',
    related: ['AI Copilots', 'AI Assistants', 'AI Use Case', 'Adoption'],
  },
  {
    term: 'AI Use Case',
    short: '',
    category: 'Practical Business',
    definition: 'A specific, defined application of AI to a business process — with identified inputs, expected outputs, success criteria, and business value.',
    simple: 'A specific thing AI does in your business. Not "use AI for customer service" — "AI classifies 800 inbound emails daily into 12 categories with 90%+ accuracy to reduce manual sorting by 6 hours/day."',
    example: 'Good use case: "AI extracts invoice data (supplier, amount, line items, PO number) from PDF invoices and writes to the ERP system. Target: 95% extraction accuracy, processing time < 30 seconds."',
    matters: 'Specificity is everything. Vague use cases produce vague outcomes. Define the use case precisely before any technical work begins.',
    related: ['Workflow', 'Automation', 'ROI in AI', 'Classification'],
  },
  {
    term: 'ROI in AI',
    short: '',
    category: 'Practical Business',
    mustKnow: true,
    definition: 'Return on Investment for AI projects — the financial value delivered relative to the cost of implementation and operation.',
    simple: 'Does AI make or save more money than it costs? Measured as: (5-Year Value - 5-Year Cost) / 5-Year Cost × 100%. A positive ROI is the minimum bar.',
    example: 'Email classification AI: Implementation $45K, annual maintenance $15K, 5-year cost $120K. Time saved: 1,200 agent-hours/year × $45 = $54,000/year. 5-year value: $270K. ROI: 125%.',
    matters: 'Always model ROI before committing to build. If you can\'t show a positive 5-year ROI at conservative assumptions, reconsider the use case or approach.',
    related: ['AI Use Case', 'Token', 'Cost per Token', 'Workflow'],
  },
  {
    term: 'Adoption',
    short: '',
    category: 'Practical Business',
    definition: 'The percentage of intended users who actively and consistently use an AI system — the ultimate measure of whether an AI program succeeded.',
    simple: 'Working technology + nobody using it = failed project. Adoption is the metric that matters most after go-live. It rarely happens without active change management.',
    example: 'AI tool deployed to 50 agents. After 3 months: 11 agents using it consistently (22% adoption). Common reasons: no training, no champion, no clear instructions, managers not modelling usage.',
    matters: 'Plan change management in parallel with technical build. Adoption doesn\'t happen automatically. Budget explicitly for training, communications, and a champion network.',
    related: ['Change Management', 'Workflow', 'AI Use Case', 'Turnkey AI Tools'],
  },
  {
    term: 'Change Management',
    short: '',
    category: 'Practical Business',
    definition: 'The structured approach to transitioning people from current ways of working to AI-augmented processes — addressing awareness, skills, and motivation.',
    simple: "Supporting people through new ways of working: explain the purpose, involve users, train them, gather feedback and adapt processes.",
    example: '5-phase approach: Awareness (what is changing and why) → Demonstration (show it working) → Involvement (co-design with the team) → Support (training + champions) → Embedding (new normal).',
    matters: "Plan change management alongside technical delivery. Adoption depends on workflow fit, trust, training, incentives and leadership support; avoid unsupported universal failure rates.",
    related: ['Adoption', 'Workflow', 'AI Use Case', 'Human-in-the-loop'],
  },
]

const CATEGORIES = [
  'All',
  'Core AI',
  'Interaction Layer',
  'Model & Architecture',
  'Tokens & Cost',
  'Agents & Automation',
  'Task Types',
  'Data & Context',
  'Performance & Trade-offs',
  'Risks & Limitations',
  'Governance & Responsibility',
  'Modern AI (2026)',
  'Practical Business',
]

const MUST_KNOW = TERMS.filter(t => t.mustKnow)

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TermCard({ term, expanded, onToggle }) {
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden transition-all hover:border-blue/30">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-base text-white">{term.term}</span>
              {term.short && (
                <span className="px-2 py-0.5 bg-blue/10 border border-blue/20 rounded text-[10px] font-display font-bold text-blue-bright">{term.short}</span>
              )}
              {term.mustKnow && (
                <span className="px-2 py-0.5 bg-amber-400/10 border border-amber-400/25 rounded text-[10px] font-display font-bold text-amber-400">Must Know</span>
              )}
            </div>
            <p className="text-sm text-muted mt-0.5 line-clamp-1">{term.definition}</p>
          </div>
        </div>
        <svg className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-display font-bold text-blue-bright uppercase tracking-wider mb-2">In Simple Terms</div>
              <p className="text-sm text-white/80 leading-relaxed">{term.simple}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-display font-bold text-success uppercase tracking-wider mb-2">Real-World Example</div>
              <p className="text-sm text-white/80 leading-relaxed">{term.example}</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-amber-400/5 border border-amber-400/15">
            <div className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-wider mb-2">Why It Matters</div>
            <p className="text-sm text-white/80 leading-relaxed">{term.matters}</p>
          </div>
          <div>
            <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-2">Related Terms</div>
            <div className="flex flex-wrap gap-2">
              {term.related.map(r => (
                <span key={r} className="px-3 py-1 text-xs font-display border border-white/10 rounded-full text-muted hover:text-white hover:border-blue/30 cursor-pointer transition-colors">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Glossary() {
  const [search,      setSearch]      = useState('')
  const [category,    setCategory]    = useState('All')
  const [expanded,    setExpanded]    = useState({})
  const [showMustKnow, setShowMustKnow] = useState(false)

  const filtered = useMemo(() => {
    let list = TERMS
    if (showMustKnow) list = list.filter(t => t.mustKnow)
    if (category !== 'All') list = list.filter(t => t.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.simple.toLowerCase().includes(q) ||
        (t.short && t.short.toLowerCase().includes(q))
      )
    }
    return list.sort((a, b) => a.term.localeCompare(b.term))
  }, [search, category, showMustKnow])

  const toggle = (term) => setExpanded(prev => ({ ...prev, [term]: !prev[term] }))

  const letterGroups = useMemo(() => {
    if (search || category !== 'All' || showMustKnow) return null
    const groups = {}
    TERMS.sort((a, b) => a.term.localeCompare(b.term)).forEach(t => {
      const letter = t.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(t)
    })
    return groups
  }, [search, category, showMustKnow])

  return (
    <>
      <Head>
        <title>AI Terms Explained — LeO AI</title>
        <meta name="description" content="The plain-English AI glossary for business professionals. 70+ terms explained simply with real-world examples." />
      </Head>
      <Nav />

      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12">
            <SectionLabel>Reference Guide</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">AI Terms Explained</h1>
            <div className="max-w-2xl">
              <p className="text-muted text-lg leading-relaxed mb-4">
                Plain-English definitions for every AI term you'll encounter — with real-world business examples.
                Bookmark this page and return whenever you hit an unfamiliar term.
              </p>
              <div className="p-4 rounded-xl bg-blue/5 border border-blue/20 text-sm text-white/80">
                💡 <strong className="text-white">How to use this:</strong> You don't need to learn everything.
                Start with the <button onClick={() => setShowMustKnow(true)} className="text-blue-bright hover:underline font-display font-bold">10 Must-Know terms</button>,
                then look up others as you encounter them.
              </div>
            </div>
          </div>

          {/* Must Know spotlight */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">⭐ Top 10 Must-Know Terms</h2>
              <button onClick={() => { setShowMustKnow(!showMustKnow); setCategory('All'); setSearch('') }}
                className={`px-4 py-2 rounded-lg border text-xs font-display font-bold transition-all ${showMustKnow ? 'bg-amber-400/15 border-amber-400/40 text-amber-400' : 'border-white/15 text-muted hover:text-white'}`}>
                {showMustKnow ? '✓ Showing Must-Know only' : 'Filter to Must-Know'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MUST_KNOW.map(t => (
                <button key={t.term}
                  onClick={() => { setSearch(t.term); setShowMustKnow(false); setCategory('All'); setExpanded({ [t.term]: true }) }}
                  className="p-3 rounded-xl border border-amber-400/20 bg-amber-400/5 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all text-left">
                  <div className="text-xs font-display font-bold text-white leading-snug">{t.short || t.term}</div>
                  <div className="text-[10px] text-muted mt-0.5 line-clamp-1">{t.definition.substring(0, 40)}...</div>
                </button>
              ))}
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search terms, definitions, examples..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowMustKnow(false) }}
                className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-muted/50 outline-none focus:border-blue transition-colors"
              />
            </div>
            <select value={category} onChange={e => { setCategory(e.target.value); setShowMustKnow(false) }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue transition-colors min-w-[200px]">
              {CATEGORIES.map(c => <option key={c} value={c}>{c} {c !== 'All' ? `(${TERMS.filter(t => t.category === c).length})` : `(${TERMS.length})`}</option>)}
            </select>
            {(search || category !== 'All' || showMustKnow) && (
              <button onClick={() => { setSearch(''); setCategory('All'); setShowMustKnow(false); setExpanded({}) }}
                className="px-4 py-3 border border-white/15 rounded-xl text-sm text-muted hover:text-white transition-colors">
                Clear
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted">
              {filtered.length} term{filtered.length !== 1 ? 's' : ''}
              {search ? ` matching "${search}"` : ''}
              {category !== 'All' ? ` in ${category}` : ''}
            </p>
            {filtered.length > 0 && (
              <button onClick={() => {
                const newExp = {}
                filtered.forEach(t => { newExp[t.term] = true })
                setExpanded(newExp)
              }} className="text-xs text-muted hover:text-blue-bright transition-colors font-display">
                Expand all →
              </button>
            )}
          </div>

          {/* Term list */}
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map(term => (
                <TermCard
                  key={term.term}
                  term={term}
                  expanded={!!expanded[term.term]}
                  onToggle={() => toggle(term.term)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-lg mb-2">No terms found</h3>
              <p className="text-muted text-sm">Try a different search term or clear the filters.</p>
            </div>
          )}

          {/* A–Z index (shown when no filter active) */}
          {letterGroups && (
            <div className="mt-16 pt-10 border-t border-white/5">
              <h2 className="font-display font-bold text-2xl mb-6">A–Z Index</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-8">
                {Object.keys(letterGroups).map(letter => (
                  <a key={letter} href={`#letter-${letter}`}
                    className="p-2 text-center rounded-lg border border-white/8 text-sm font-display font-bold text-muted hover:text-white hover:border-blue/30 transition-all">
                    {letter}
                  </a>
                ))}
              </div>
              {Object.entries(letterGroups).map(([letter, terms]) => (
                <div key={letter} id={`letter-${letter}`} className="mb-8">
                  <div className="text-2xl font-display font-black text-blue mb-3">{letter}</div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {terms.map(t => (
                      <button key={t.term}
                        onClick={() => { setSearch(t.term); setExpanded({ [t.term]: true }); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="text-left px-4 py-2.5 rounded-lg border border-white/5 hover:border-blue/25 hover:bg-blue/5 transition-all">
                        <div className="text-sm font-display font-bold text-white">{t.term}</div>
                        <div className="text-xs text-muted">{t.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl border border-blue/20 bg-blue/5 text-center">
            <h3 className="font-display font-bold text-xl mb-2">Ready to put these concepts to work?</h3>
            <p className="text-muted text-sm mb-5 max-w-md mx-auto">
              The Starting the Journey program applies every term in this glossary to real business scenarios — with exercises and Q&A.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/pricing" className="px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(26,110,255,0.3)]">
                Enrol — $19 →
              </Link>
              <Link href="/preview" className="px-6 py-3 border border-white/15 text-muted hover:text-white font-display font-bold text-sm rounded-lg transition-all">
                Free Preview
              </Link>
            </div>
          </div>
        </div>
      </div>
    <Footer variant="dark" />
    </>
  )
}
