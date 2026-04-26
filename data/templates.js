// data/templates.js — template registry for 14-module curriculum

export const TEMPLATES = [
  { id:'ai-readiness',          name:'AI Readiness & Token Assessment',    format:'PDF',  tier:'individual', moduleId:'module-1',  icon:'🧠', desc:'Assess AI readiness and model token awareness across 5 dimensions.' },
  { id:'role-mapping',          name:'AI Role Mapping Document',           format:'DOCX', tier:'individual', moduleId:'module-2',  icon:'👥', desc:'Map the 5 key AI roles to named owners in your organisation.' },
  { id:'use-case-identification',name:'Use Case Identification Template',  format:'XLSX', tier:'individual', moduleId:'module-3',  icon:'🔍', desc:'Structured template for identifying and qualifying AI opportunities.' },
  { id:'prioritisation-model',  name:'Use Case Prioritisation Model',      format:'XLSX', tier:'individual', moduleId:'module-4',  icon:'📊', desc:'5-year cost model, ROI calculator, and priority scoring framework.' },
  { id:'workflow-design',       name:'AI Workflow Blueprint Template',     format:'PPTX', tier:'individual', moduleId:'module-5',  icon:'⚡', desc:'Swim-lane workflow design template with exception handling paths.' },
  { id:'data-readiness',        name:'Data Readiness Report Template',     format:'DOCX', tier:'individual', moduleId:'module-6',  icon:'🗄️', desc:'5-dimension data readiness assessment and remediation plan.' },
  { id:'architecture-decision', name:'AI Architecture Decision Record',    format:'DOCX', tier:'individual', moduleId:'module-7',  icon:'🔧', desc:'Document and justify your build/buy/configure and model decisions.' },
  { id:'use-case-build',        name:'Use Case Build Plan',                format:'XLSX', tier:'individual', moduleId:'module-8',  icon:'🏗️', desc:'Sprint plan template for AI use case implementation.' },
  { id:'roi-model',             name:'ROI Model & KPI Framework',          format:'XLSX', tier:'individual', moduleId:'module-9',  icon:'📈', desc:'Complete financial model with efficiency, quality, and revenue value.' },
  { id:'responsible-ai',        name:'Responsible AI Framework',           format:'DOCX', tier:'individual', moduleId:'module-10', icon:'⚖️', desc:'Governance checklist covering bias, hallucination, explainability, and control.' },
  { id:'sustainability-checklist', name:'AI Sustainability Checklist',     format:'PDF',  tier:'individual', moduleId:'module-11', icon:'🌱', desc:'Energy optimisation, carbon footprint, and ESG reporting template.' },
  { id:'adoption-plan',         name:'Adoption Strategy & Opportunity Map', format:'PPTX', tier:'individual', moduleId:'module-12', icon:'🤝', desc:'Change management plan with stakeholder mapping and role evolution framework.' },
  { id:'90-day-plan',           name:'90-Day Execution Roadmap',           format:'XLSX', tier:'individual', moduleId:'module-14', icon:'🚀', desc:'Week-by-week plan from approved use case to live production AI.' },
  // Business tier
  { id:'industry-playbooks',    name:'Industry Use Case Playbooks',        format:'PDF',  tier:'smb',        moduleId:'module-3',  icon:'📚', desc:'Sector-specific AI use case playbooks for 8 industries.' },
  { id:'token-cost-calculator', name:'Token Cost Calculator (Advanced)',   format:'XLSX', tier:'smb',        moduleId:'module-4',  icon:'💰', desc:'Advanced token cost modelling tool with volume scenarios.' },
  { id:'data-mapping-template', name:'Data Mapping & Standardisation Plan', format:'XLSX', tier:'smb',        moduleId:'module-6',  icon:'📐', desc:'Data element mapping with transformation rules and quality scoring.' },
  { id:'5yr-financial-model',   name:'5-Year AI Financial Model',          format:'XLSX', tier:'smb',        moduleId:'module-4',  icon:'📉', desc:'Full 5-year cost, value, and ROI model with sensitivity analysis.' },
  // Enterprise tier
  { id:'operating-model',       name:'Enterprise AI Operating Model',      format:'PPTX', tier:'enterprise', moduleId:'module-5',  icon:'🏢', desc:'Four-layer enterprise operating model framework.' },
  { id:'orchestration-blueprint', name:'AI Orchestration Blueprint',       format:'PPTX', tier:'enterprise', moduleId:'module-13', icon:'🎛️', desc:'Multi-model orchestration design with fallback strategies and cost trade-offs.' },
  { id:'governance-program',    name:'Enterprise AI Ethics & Governance',  format:'DOCX', tier:'enterprise', moduleId:'module-10', icon:'🛡️', desc:'Full enterprise ethics, compliance, and governance program.' },
  { id:'coe-setup',             name:'AI Centre of Excellence Setup',      format:'PPTX', tier:'enterprise', moduleId:'module-14', icon:'🎖️', desc:'CoE structure, responsibilities, and scaling roadmap.' },
  { id:'command-centre',        name:'AI Command Centre Design',           format:'PPTX', tier:'enterprise', moduleId:'module-9',  icon:'🖥️', desc:'Operational monitoring and oversight centre design.' },
]

export const getTemplatesForTier = (tier) => {
  const order = ['individual', 'smb', 'enterprise']
  const level = order.indexOf(tier)
  return TEMPLATES.filter(t => order.indexOf(t.tier) <= level)
}
