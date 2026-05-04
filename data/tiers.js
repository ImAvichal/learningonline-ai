// data/tiers.js — Pricing structure: Free Parents + Starting the Journey + The Pro
// Subscription pricing (monthly + annual)

export const TIERS = {
  parents: {
    id: 'parents',
    name: 'AI for Parents',
    label: 'Free Module',
    price: 0,
    priceDisplay: 'Free',
    priceMonthly: 0,
    priceAnnual: 0,
    billing: 'Free \u00b7 Sign in required',
    colorClass: 'tier-parents',
    description: 'A practical, reassuring guide for parents wanting to better understand how AI is shaping how children learn, think, communicate, and grow.',
    idealFor: 'Parents and caregivers wanting healthier AI conversations and sensible boundaries at home.',
    notFor: 'Business professionals looking for AI implementation guidance.',
    features: [
      '9 practical lessons for parents',
      'What AI is and how kids use it',
      'Benefits vs risks',
      'Warning signs and conversation starters',
      'Practical household rules and boundaries',
      'AI for Parents downloadable guide',
      'No cost \u2014 just sign in',
    ],
    modules: [],
    cta: 'Start Free Module',
    highlighted: false,
    stripeEnvKeyMonthly: null,
    stripeEnvKeyAnnual: null,
    free: true,
    route: '/parents',
  },

  journey: {
    id: 'journey',
    name: 'Starting the Journey',
    label: 'Starting the Journey',
    price: 49,
    priceDisplay: '$49/mo',
    priceMonthly: 49,
    priceAnnual: 399,
    priceMonthlyDisplay: '$49/mo',
    priceAnnualDisplay: '$399/yr',
    billing: '$49/month or $399/year',
    colorClass: 'tier-journey',
    description: 'Practical AI awareness, foundational learning, and operational implementation guidance.',
    idealFor: 'Professionals, team members, business owners, and operational leaders wanting practical AI capability.',
    notFor: 'Enterprise leaders requiring orchestration, governance, and full operating-model design.',
    features: [
      'Foundational AI learning and model awareness',
      'Prompts, context, tools, and practical use',
      'Use case identification and prioritisation',
      'Workflow design and ROI frameworks',
      'Data readiness and people/change adoption',
      'Downloadable guides and templates',
      'Ongoing updates within the current release cycle',
    ],
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
    cta: 'Start the Journey',
    highlighted: true,
    stripeEnvKeyMonthly: 'STRIPE_PRICE_JOURNEY_MONTHLY',
    stripeEnvKeyAnnual: 'STRIPE_PRICE_JOURNEY_ANNUAL',
  },

  pro: {
    id: 'pro',
    name: 'The Pro',
    label: 'The Pro',
    price: 99,
    priceDisplay: '$99/mo',
    priceMonthly: 99,
    priceAnnual: 990,
    priceMonthlyDisplay: '$99/mo',
    priceAnnualDisplay: '$990/yr',
    billing: '$99/month or $990/year',
    colorClass: 'tier-pro',
    description: 'For leaders driving enterprise-scale AI adoption \u2014 orchestration, governance, operating models, and long-term transformation.',
    idealFor: 'CIOs, transformation directors, senior leaders, and enterprise teams responsible for scalable AI adoption.',
    notFor: 'Professionals just beginning their AI journey \u2014 Starting the Journey is the right place to start.',
    features: [
      'Everything in Starting the Journey',
      'Enterprise AI operating model',
      'Responsible AI and governance',
      'Sustainability and AI impact planning',
      'Multimodal AI orchestration',
      'AI economics and cost management',
      '90-day execution roadmap',
      'All 40 cumulative learning modules',
    ],
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    cta: 'Go Pro',
    highlighted: false,
    stripeEnvKeyMonthly: 'STRIPE_PRICE_PRO_MONTHLY',
    stripeEnvKeyAnnual: 'STRIPE_PRICE_PRO_ANNUAL',
  },
}

export const TIER_ORDER = ['journey', 'pro']
export const DISPLAY_ORDER = ['parents', 'journey', 'pro']
export const FREE_TIERS = ['parents']

export const canAccessTier = (userTier, contentTier) =>
  TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(contentTier)

export const INDUSTRIES = [
  {
    id: 'government', icon: '🏛️', name: 'Government & Public Sector',
    useCases: ['FOI request summarisation and triage', 'Policy document compliance checking', 'Constituent enquiry routing and response drafting', 'Procurement document review and risk flagging', 'Cross-department reporting automation'],
    recommendedTier: 'pro',
    outcome: 'Reduce administrative burden by 40–60% while improving service delivery consistency.',
  },
  {
    id: 'healthcare', icon: '🏥', name: 'Healthcare & Medical',
    useCases: ['Clinical notes summarisation for handover', 'Patient enquiry triage and routing', 'Compliance and audit documentation', 'Medical record review and flagging', 'Staff rostering and scheduling optimisation'],
    recommendedTier: 'pro',
    outcome: 'Reduce clinician administrative time by up to 30%, freeing capacity for patient care.',
  },
  {
    id: 'hospitality', icon: '🏨', name: 'Hospitality & Tourism',
    useCases: ['Guest enquiry and booking response automation', 'Review sentiment analysis and response drafting', 'Staff shift handover summaries', 'Supplier and inventory communication', 'Personalised guest experience recommendations'],
    recommendedTier: 'journey',
    outcome: 'Improve guest response times by 70% and free staff for high-value interactions.',
  },
  {
    id: 'travel', icon: '✈️', name: 'Travel & Transport',
    useCases: ['Disruption communication drafting and sending', 'Customer rebooking triage and prioritisation', 'Complaint summarisation and escalation routing', 'Route and schedule optimisation insights', 'Regulatory reporting automation'],
    recommendedTier: 'journey',
    outcome: 'Handle 3× the disruption volume with the same team during peak periods.',
  },
  {
    id: 'financial', icon: '🏦', name: 'Financial Services',
    useCases: ['KYC document review and risk summarisation', 'Customer complaint triage and response', 'Regulatory report drafting and checking', 'Fraud signal detection and alerting', 'Advisor meeting notes and action extraction'],
    recommendedTier: 'pro',
    outcome: 'Reduce compliance processing time by 50% while improving audit trail quality.',
  },
  {
    id: 'retail', icon: '🛒', name: 'Retail & E-commerce',
    useCases: ['Customer service enquiry automation', 'Product description and content generation', 'Inventory demand forecasting signals', 'Returns and refund triage', 'Competitor and market monitoring summaries'],
    recommendedTier: 'journey',
    outcome: 'Automate 60% of routine customer interactions and halve returns processing time.',
  },
  {
    id: 'professional', icon: '💼', name: 'Professional Services',
    useCases: ['Proposal and tender document drafting', 'Meeting notes and action item extraction', 'Client report generation from data', 'Contract review and risk summarisation', 'Billing narrative and timesheet generation'],
    recommendedTier: 'journey',
    outcome: 'Reclaim 6–8 hours per consultant per week from administrative work.',
  },
  {
    id: 'education', icon: '📚', name: 'Education & Training',
    useCases: ['Student enquiry routing and FAQ automation', 'Course content summarisation and adaptation', 'Assessment feedback generation assistance', 'Administrative reporting and compliance', 'Staff onboarding and knowledge management'],
    recommendedTier: 'journey',
    outcome: 'Reduce administrative burden on educators by 40%, improving focus on student outcomes.',
  },
]

export const REGIONAL_PRICING = {
  AU: {
    currency: 'AUD', symbol: '$',
    journey: { monthly: 49, annual: 399 },
    pro:     { monthly: 99, annual: 990 },
  },
  US: {
    currency: 'USD', symbol: '$',
    journey: { monthly: 35, annual: 285 },
    pro:     { monthly: 75, annual: 720 },
  },
  IN: {
    currency: 'INR', symbol: '\u20b9',
    journey: { monthly: 1499, annual: 11999 },
    pro:     { monthly: 2999, annual: 29999 },
  },
}

export const DEFAULT_REGION = 'AU'
