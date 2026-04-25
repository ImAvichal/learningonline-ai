// data/templates.js — template registry
// Add templates here. Pages import this — never hardcode in components.

export const TEMPLATES = [
  { id:'ai-readiness',          name:'AI Readiness Snapshot',         format:'PDF',  tier:'individual', moduleId:'module-1', icon:'📋', desc:'Assess AI readiness across 5 dimensions.' },
  { id:'use-case-scoring',      name:'Use Case Scoring Matrix',        format:'XLSX', tier:'individual', moduleId:'module-2', icon:'🎯', desc:'Score and prioritise AI opportunities.' },
  { id:'workflow-design',       name:'Workflow Design Template',       format:'PPTX', tier:'individual', moduleId:'module-3', icon:'⚡', desc:'Map human + AI workflow with swim-lane.' },
  { id:'architecture-decision', name:'Architecture Decision Template', format:'DOCX', tier:'individual', moduleId:'module-4', icon:'🔧', desc:'Document build vs buy vs configure.' },
  { id:'use-case-build',        name:'Use Case Build Plan',            format:'XLSX', tier:'individual', moduleId:'module-5', icon:'🏗️', desc:'Plan your implementation sprint.' },
  { id:'roi-calculator',        name:'ROI Calculator',                 format:'XLSX', tier:'individual', moduleId:'module-6', icon:'💰', desc:'Calculate and present your AI business case.' },
  { id:'governance-checklist',  name:'Governance Checklist',           format:'DOCX', tier:'individual', moduleId:'module-7', icon:'⚖️', desc:'Governance framework with risk register.' },
  { id:'90-day-plan',           name:'90-Day Execution Plan',          format:'XLSX', tier:'individual', moduleId:'module-8', icon:'🚀', desc:'Week-by-week implementation roadmap.' },
  // SMB
  { id:'use-case-playbooks',    name:'Use Case Playbooks by Function', format:'PDF',  tier:'smb',        moduleId:'module-2', icon:'📚', desc:'Industry-specific AI use case playbooks.' },
  { id:'smb-implementation',    name:'SMB Implementation Guide',       format:'PDF',  tier:'smb',        moduleId:'module-5', icon:'⚙️', desc:'End-to-end SMB AI deployment guide.' },
  { id:'vendor-selection',      name:'Vendor Selection Framework',     format:'XLSX', tier:'smb',        moduleId:'module-4', icon:'🛒', desc:'Evaluate and compare AI vendors.' },
  // Enterprise
  { id:'operating-model',       name:'AI Operating Model Framework',   format:'PPTX', tier:'enterprise', moduleId:'module-3', icon:'🏢', desc:'Four-layer enterprise operating model.' },
  { id:'data-readiness',        name:'Data Readiness Report',          format:'DOCX', tier:'enterprise', moduleId:'module-5', icon:'🗄️', desc:'Assess and document data readiness.' },
  { id:'data-standardisation',  name:'Data Standardisation Plan',      format:'XLSX', tier:'enterprise', moduleId:'module-5', icon:'📐', desc:'Plan legacy data standardisation.' },
  { id:'data-model-blueprint',  name:'Data Model Blueprint',           format:'DOCX', tier:'enterprise', moduleId:'module-5', icon:'🗺️', desc:'Target data model for AI consumption.' },
  { id:'governance-program',    name:'AI Ethics & Compliance Program', format:'DOCX', tier:'enterprise', moduleId:'module-7', icon:'🛡️', desc:'Full enterprise ethics and compliance framework.' },
  { id:'coe-setup',             name:'AI Centre of Excellence Setup',  format:'PPTX', tier:'enterprise', moduleId:'module-8', icon:'🎖️', desc:'CoE structure, responsibilities, roadmap.' },
  { id:'command-centre',        name:'AI Command Centre Design',       format:'PPTX', tier:'enterprise', moduleId:'module-6', icon:'🖥️', desc:'Design your AI operational oversight centre.' },
]

export const getTemplatesForTier = (tier) => {
  const order = ['individual', 'smb', 'enterprise']
  const level = order.indexOf(tier)
  return TEMPLATES.filter(t => order.indexOf(t.tier) <= level)
}
