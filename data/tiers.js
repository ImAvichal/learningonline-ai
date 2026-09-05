// data/tiers.js — Pricing structure: Free Parents + Starting the Journey + The Pro
// One-time purchase model. Journey includes a complimentary first month for new users.

export const TIERS = {
  parents: {
    id: 'parents', name: 'Parents & Caregivers', label: 'Free Module', price: 0, priceDisplay: 'Free',
    billing: 'Free · Sign in required', colorClass: 'tier-parents',
    description: 'A practical, reassuring guide for parents wanting to better understand how AI is shaping how children learn, think, communicate, and grow.',
    idealFor: 'Parents and caregivers wanting healthier AI conversations and sensible boundaries at home.',
    notFor: 'Business professionals looking for AI implementation guidance.',
    features: ['9 practical lessons for parents','What AI is and how kids use it','Benefits vs risks','Warning signs and conversation starters','Practical household rules and boundaries','Parents & Caregivers downloadable guide','No cost — just sign in'],
    modules: [], cta: 'Start Free Module', highlighted: false, free: true, route: '/parents',
  },
  journey: {
    id: 'journey', name: 'Starting the Journey', label: 'Starting the Journey', price: 149, priceDisplay: '$149 one-time',
    billing: 'First month complimentary · then optional one-time purchase', colorClass: 'tier-journey',
    description: 'Everything you need to actually use AI at work. Foundational concepts, hands-on prompting, identifying use cases, and building real workflows.',
    idealFor: 'Professionals, team leads, and business owners who want practical AI skills — not theory.',
    notFor: 'Enterprise leaders requiring orchestration, governance, and full operating-model design.',
    features: ['Foundational AI learning and model awareness','Prompts, context, tools, and practical use','Use case identification and prioritisation','Workflow design and ROI frameworks','Data readiness and people/change adoption','Downloadable guides and templates','Ongoing AI landscape updates'],
    modules: [1,2,3,4,5,6,7,8,9,12], cta: 'Start Your Free Month', trialLabel: 'Free for your first month', highlighted: true,
  },
  pro: {
    id: 'pro', name: 'The Pro', label: 'The Pro', price: 299, priceDisplay: '$299 one-time', billing: 'One-time purchase', colorClass: 'tier-pro',
    description: 'For leaders rolling AI out across a business. Adds governance, security, AI economics, multimodal orchestration, policy, and a 90-day execution roadmap.',
    idealFor: 'CIOs, transformation directors, and senior leaders running AI programs across multiple teams.',
    notFor: 'Professionals just beginning their AI journey — Starting the Journey is the right place to start.',
    features: ['Everything in Starting the Journey','Enterprise AI operating model','Responsible AI and governance','AI security and data protection','AI policy framework','Sustainability and AI impact planning','Multimodal AI orchestration','AI economics and cost management','90-day execution roadmap','All 16 modules and frameworks'],
    modules: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], cta: 'Get Pro — One Payment', highlighted: false,
  },
}

export const TIER_ORDER = ['journey', 'pro']
export const DISPLAY_ORDER = ['parents', 'journey', 'pro']
export const FREE_TIERS = ['parents']
export const canAccessTier = (userTier, contentTier) => TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(contentTier)

export const INDUSTRIES = [
  { id:'government',icon:'🏛️',name:'Government & Public Sector',useCases:['FOI request summarisation and triage','Policy document compliance checking','Constituent enquiry routing and response drafting','Procurement document review and risk flagging','Cross-department reporting automation'],recommendedTier:'pro',outcome:'Reduce administrative burden while improving service delivery consistency.' },
  { id:'healthcare',icon:'🏥',name:'Healthcare & Medical',useCases:['Clinical notes summarisation for handover','Patient enquiry triage and routing','Compliance and audit documentation','Medical record review and flagging','Staff rostering and scheduling optimisation'],recommendedTier:'pro',outcome:'Reduce administrative load while preserving clinical oversight.' },
  { id:'hospitality',icon:'🏨',name:'Hospitality & Tourism',useCases:['Guest enquiry and booking response automation','Review sentiment analysis and response drafting','Staff shift handover summaries','Supplier and inventory communication','Personalised guest experience recommendations'],recommendedTier:'journey',outcome:'Improve response times and free staff for high-value interactions.' },
  { id:'travel',icon:'✈️',name:'Travel & Transport',useCases:['Disruption communication drafting and sending','Customer rebooking triage and prioritisation','Complaint summarisation and escalation routing','Route and schedule optimisation insights','Regulatory reporting automation'],recommendedTier:'journey',outcome:'Handle disruption volume more consistently with AI-assisted workflows.' },
  { id:'financial',icon:'🏦',name:'Financial Services',useCases:['KYC document review and risk summarisation','Customer complaint triage and response','Regulatory report drafting and checking','Fraud signal detection and alerting','Advisor meeting notes and action extraction'],recommendedTier:'pro',outcome:'Reduce processing time while improving auditability and human oversight.' },
  { id:'retail',icon:'🛒',name:'Retail & E-commerce',useCases:['Customer service enquiry automation','Product description and content generation','Inventory demand forecasting signals','Returns and refund triage','Competitor and market monitoring summaries'],recommendedTier:'journey',outcome:'Automate routine interactions while preserving escalation paths.' },
  { id:'professional',icon:'💼',name:'Professional Services',useCases:['Proposal and tender document drafting','Meeting notes and action item extraction','Client report generation from data','Contract review and risk summarisation','Billing narrative and timesheet generation'],recommendedTier:'journey',outcome:'Reclaim time from administrative work for client-facing and analytical activity.' },
  { id:'education',icon:'📚',name:'Education & Training',useCases:['Student enquiry routing and FAQ automation','Course content summarisation and adaptation','Assessment feedback generation assistance','Administrative reporting and compliance','Staff onboarding and knowledge management'],recommendedTier:'journey',outcome:'Reduce administrative burden while keeping educators accountable for learning outcomes.' },
]

export const REGIONAL_PRICING = {
  AU:{currency:'AUD',symbol:'$',plans:{journey:{oneTime:{amount:149,label:'$149'}},pro:{oneTime:{amount:299,label:'$299'}}}},
  IN:{currency:'INR',symbol:'₹',plans:{journey:{oneTime:{amount:499,label:'₹499',listLabel:'₹999'}},pro:{oneTime:{amount:1999,label:'₹1,999',listLabel:'₹2,999'}}}},
  PH:{currency:'PHP',symbol:'₱',plans:{journey:{oneTime:{amount:330,label:'₱330',listLabel:'₱999'}},pro:{oneTime:{amount:1999,label:'₱1,999',listLabel:'₱2,999'}}}},
  US:{currency:'USD',symbol:'US$',plans:{journey:{oneTime:{amount:99,label:'US$99'}},pro:{oneTime:{amount:199,label:'US$199'}}}},
}
export const DEFAULT_REGION='AU'
export function getPriceLabel(tierId,region=DEFAULT_REGION){const config=REGIONAL_PRICING[region]||REGIONAL_PRICING[DEFAULT_REGION];return config?.plans?.[tierId]?.oneTime?.label||''}
export function getCurrencySymbol(region=DEFAULT_REGION){return REGIONAL_PRICING[region]?.symbol||'$'}
