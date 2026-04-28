// data/templates.js — Downloadable resources per module
// tier: minimum tier required to access
// moduleId: which module this belongs to

export const RESOURCES = [
  // Module 1 — AI Foundations
  { id: 'ai-cheat-sheet',      moduleId: 'module-1',  tier: 'individual', title: 'AI Basics Cheat Sheet',        format: 'PDF',  icon: '🧠', desc: 'Quick reference for key AI concepts, terminology, and mental models.' },
  { id: 'model-types-guide',   moduleId: 'module-1',  tier: 'individual', title: 'Model Types Guide',            format: 'PDF',  icon: '📋', desc: 'Overview of LLMs, image, speech, and embedding models with use cases.' },
  { id: 'token-awareness',     moduleId: 'module-1',  tier: 'individual', title: 'Token Awareness Guide',        format: 'PDF',  icon: '🔢', desc: 'Understand tokens, input vs output costs, and optimisation strategies.' },
  { id: 'prompt-tips',         moduleId: 'module-1',  tier: 'individual', title: 'Prompt Tips & Tricks',         format: 'PDF',  icon: '💡', desc: 'Practical prompt engineering techniques for business use cases.' },


  // Module 2 — Triad additions
  { id: 'ai-execution-triad',      moduleId: 'module-2', tier: 'individual', title: 'AI Execution Triad Template',          format: 'DOCX', icon: '🔺', desc: 'Define Business, Solution, and Delivery accountability for any AI initiative.' },
  { id: 'role-clarity-matrix',     moduleId: 'module-2', tier: 'individual', title: 'Role Clarity & Accountability Matrix',  format: 'DOCX', icon: '📋', desc: 'Ownership table, boundaries, alignment checklist, and escalation path.' },
  // Module 2 — Key Roles
  { id: 'role-mapping',        moduleId: 'module-2',  tier: 'individual', title: 'Role Mapping Template',        format: 'DOCX', icon: '👥', desc: 'Map the 5 key AI roles to named owners in your organisation.' },
  { id: 'leadership-guide',    moduleId: 'module-2',  tier: 'individual', title: 'Leadership Conversation Guide', format: 'PDF',  icon: '🗣️', desc: 'How to discuss AI strategy with executives and board members.' },

  // Module 3 — Use Cases
  { id: 'use-case-template',   moduleId: 'module-3',  tier: 'individual', title: 'Use Case Template',            format: 'DOCX', icon: '🔍', desc: 'Structured template for identifying and qualifying AI opportunities.' },
  { id: 'opportunity-canvas',  moduleId: 'module-3',  tier: 'smb',        title: 'Opportunity Canvas',           format: 'PPTX', icon: '🎨', desc: 'Visual canvas for mapping AI opportunity landscape across your organisation.' },
  { id: 'example-library',     moduleId: 'module-3',  tier: 'smb',        title: 'AI Example Library',           format: 'PDF',  icon: '📚', desc: '50+ real-world AI use case examples across 8 industries.' },

  // Module 4 — Prioritisation
  { id: 'prioritisation-scorecard', moduleId: 'module-4', tier: 'smb',   title: 'Prioritisation Scorecard',    format: 'XLSX', icon: '📊', desc: '5-factor scoring model for ranking AI use cases objectively.' },
  { id: '5yr-cost-model',      moduleId: 'module-4',  tier: 'smb',        title: '5-Year Cost Model',            format: 'XLSX', icon: '💰', desc: 'Full 5-year implementation, maintenance, and ROI model with token costing.' },
  { id: 'ranking-sheet',       moduleId: 'module-4',  tier: 'smb',        title: 'Use Case Ranking Sheet',       format: 'XLSX', icon: '🏆', desc: 'Compare and rank multiple use cases side by side with weighted scoring.' },

  // Module 5 — Workflow Design
  { id: 'workflow-templates',  moduleId: 'module-5',  tier: 'smb',        title: 'Workflow Design Templates',   format: 'PPTX', icon: '⚡', desc: 'Swim-lane workflow templates with AI placement and exception handling.' },
  { id: 'exception-checklist', moduleId: 'module-5',  tier: 'smb',        title: 'Exception Handling Checklist', format: 'PDF',  icon: '⚠️', desc: 'Ensure every AI workflow has robust exception and fallback paths.' },

  // Module 6 — Data Readiness
  { id: 'data-readiness-check', moduleId: 'module-6', tier: 'smb',        title: 'Data Readiness Checklist',    format: 'PDF',  icon: '🗄️', desc: '5-dimension data readiness assessment framework.' },
  { id: 'data-cleaning-check', moduleId: 'module-6',  tier: 'smb',        title: 'Data Cleaning Checklist',     format: 'PDF',  icon: '🧹', desc: 'Step-by-step data sanitisation and standardisation checklist.' },
  { id: 'data-mapping',        moduleId: 'module-6',  tier: 'smb',        title: 'Data Mapping Template',       format: 'XLSX', icon: '📐', desc: 'Map data elements from source to AI consumption layer.' },
  { id: 'data-quality',        moduleId: 'module-6',  tier: 'enterprise', title: 'Data Quality Scorecard',      format: 'XLSX', icon: '✅', desc: 'Score data quality across completeness, accuracy, consistency, and currency.' },

  // Module 7 — Tools & Infrastructure
  { id: 'tool-decision-tree',  moduleId: 'module-7',  tier: 'smb',        title: 'Tool Decision Tree',          format: 'PDF',  icon: '🔧', desc: 'Build vs buy vs configure decision framework with vendor comparison.' },
  { id: 'architecture-template', moduleId: 'module-7', tier: 'enterprise', title: 'Architecture Decision Template', format: 'DOCX', icon: '🏗️', desc: 'Document and justify your AI architecture and model selection decisions.' },

  // Module 8 — Building Use Cases
  { id: 'build-plan',          moduleId: 'module-8',  tier: 'smb',        title: 'Use Case Build Plan',         format: 'XLSX', icon: '📅', desc: 'Sprint-based implementation plan for AI use case delivery.' },
  { id: 'prompt-guide',        moduleId: 'module-8',  tier: 'individual', title: 'Prompt Engineering Guide',    format: 'PDF',  icon: '✍️', desc: 'Structured prompt design principles with production-ready templates.' },
  { id: 'testing-checklist',   moduleId: 'module-8',  tier: 'smb',        title: 'AI Testing Checklist',        format: 'PDF',  icon: '🧪', desc: 'Unit, edge case, and volume testing framework for AI systems.' },

  // Module 9 — ROI
  { id: 'roi-calculator-tmpl', moduleId: 'module-9',  tier: 'smb',        title: 'ROI Calculator Template',     format: 'XLSX', icon: '📈', desc: 'Complete ROI model with efficiency, quality, and revenue value streams.' },
  { id: 'kpi-template',        moduleId: 'module-9',  tier: 'smb',        title: 'KPI Framework Template',      format: 'XLSX', icon: '🎯', desc: 'Primary, secondary, and guardrail KPI definition with baseline tracking.' },
  { id: 'token-cost-sheet',    moduleId: 'module-9',  tier: 'individual', title: 'Token Cost Sheet',             format: 'XLSX', icon: '🔢', desc: 'Calculate and model token costs at expected production volumes.' },
  { id: 'business-case-tmpl',  moduleId: 'module-9',  tier: 'smb',        title: 'AI Business Case Template',   format: 'PPTX', icon: '💼', desc: 'Executive-ready business case presentation template with financial model.' },

  // Module 10 — Responsible AI
  { id: 'responsible-ai-check', moduleId: 'module-10', tier: 'enterprise', title: 'Responsible AI Checklist',   format: 'PDF',  icon: '⚖️', desc: 'Pre-deployment checklist covering bias, hallucination, governance, and control.' },
  { id: 'risk-assessment',     moduleId: 'module-10', tier: 'enterprise', title: 'AI Risk Assessment Template', format: 'DOCX', icon: '🛡️', desc: 'Structured risk assessment for AI systems with mitigation strategies.' },

  // Module 11 — Sustainability
  { id: 'sustainability-check', moduleId: 'module-11', tier: 'enterprise', title: 'AI Sustainability Checklist', format: 'PDF',  icon: '🌱', desc: 'Energy optimisation, carbon footprint, and ESG disclosure framework.' },
  { id: 'resource-awareness',  moduleId: 'module-11', tier: 'enterprise', title: 'Resource Awareness Guide',    format: 'PDF',  icon: '♻️', desc: 'Understand and reduce the environmental impact of AI at scale.' },

  // Module 12 — People & Change
  { id: 'stakeholder-map',     moduleId: 'module-12', tier: 'smb',        title: 'Stakeholder Map Template',    format: 'PPTX', icon: '🗺️', desc: 'Map stakeholder attitudes, concerns, and engagement strategies.' },
  { id: 'adoption-plan',       moduleId: 'module-12', tier: 'smb',        title: 'AI Adoption Plan',            format: 'DOCX', icon: '🤝', desc: '5-phase adoption strategy with milestones and success metrics.' },
  { id: 'comms-plan',          moduleId: 'module-12', tier: 'smb',        title: 'Communication Plan Template', format: 'DOCX', icon: '📢', desc: 'Structured communication plan for AI program rollout.' },
  { id: 'role-evolution',      moduleId: 'module-12', tier: 'enterprise', title: 'Role Evolution Guide',        format: 'PDF',  icon: '🚀', desc: 'Map how roles evolve with AI and create opportunity maps for your team.' },

  // Module 13 — Multimodal
  { id: 'multimodal-workflow', moduleId: 'module-13', tier: 'enterprise', title: 'Multimodal Workflow Template', format: 'PPTX', icon: '🎛️', desc: 'Design multi-model workflows combining text, image, and voice.' },
  { id: 'model-selection-map', moduleId: 'module-13', tier: 'enterprise', title: 'Model Selection Map',         format: 'PDF',  icon: '🗺️', desc: 'Framework for selecting the right model for each task in a pipeline.' },
  { id: 'orchestration-blueprint', moduleId: 'module-13', tier: 'enterprise', title: 'Orchestration Blueprint', format: 'PPTX', icon: '🏛️', desc: 'Design the orchestration layer for multi-model AI systems.' },

  // Module 14 — Execution Plan
  { id: '90-day-roadmap',      moduleId: 'module-14', tier: 'enterprise', title: '90-Day Execution Roadmap',    format: 'XLSX', icon: '🗓️', desc: 'Week-by-week roadmap from approved use case to live production AI.' },
  { id: 'execution-tracker',   moduleId: 'module-14', tier: 'enterprise', title: 'Execution Tracker',           format: 'XLSX', icon: '✅', desc: 'Track progress, blockers, and milestones across your 90-day plan.' },
]

export const getResourcesForTier = (tier) => {
  const order = ['individual', 'smb', 'enterprise']
  const level = order.indexOf(tier)
  return RESOURCES.filter(r => order.indexOf(r.tier) <= level)
}

export const getResourcesByModule = (moduleId, tier) => {
  const all = getResourcesForTier(tier)
  return all.filter(r => r.moduleId === moduleId)
}

export const getTemplatesForTier = getResourcesForTier
export const TEMPLATES = RESOURCES

// AI Execution Triad templates (appended)
// These are in addition to getTemplatesForTier alias exports at bottom
