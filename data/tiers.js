// data/tiers.js — Pricing structure: Free Parents + Starting the Journey + The Pro
// Subscription pricing (monthly + annual)

export const TIERS = {
  parents: {
    id: 'parents',
    name: 'Parents & Caregivers',
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
      'Parents & Caregivers downloadable guide',
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
    price: 19,
    priceDisplay: '$149 one-time',
    priceMonthly: 19,
    priceAnnual: 179,
    priceMonthlyDisplay: '$19/mo',
    priceAnnualDisplay: '$179/yr',
    billing: '$19/month or $179/yr',
    colorClass: 'tier-journey',
    description: 'Everything you need to actually use AI at work. Foundational concepts, hands-on prompting, identifying use cases, and building real workflows.',
    idealFor: 'Professionals, team leads, and business owners who want practical AI skills — not theory.',
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
    cta: 'Get Journey — One Payment',
    trialLabel: 'Free for your first month',
    highlighted: true,
    stripeEnvKeyMonthly: 'STRIPE_PRICE_JOURNEY_MONTHLY',
    stripeEnvKeyAnnual: 'STRIPE_PRICE_JOURNEY_ANNUAL',
  },

  pro: {
    id: 'pro',
    name: 'The Pro',
    label: 'The Pro',
    price: 39,
    priceDisplay: '$299 one-time',
    priceMonthly: 39,
    priceAnnual: 349,
    priceMonthlyDisplay: '$39/mo',
    priceAnnualDisplay: '$349/yr',
    billing: '$39/month or $349/yr',
    colorClass: 'tier-pro',
    description: 'For leaders rolling AI out across a business. Adds governance, AI economics, multi-team orchestration, and a 90-day execution roadmap.',
    idealFor: 'CIOs, transformation directors, and senior leaders running AI programs across multiple teams.',
    notFor: 'Professionals just beginning their AI journey \u2014 Starting the Journey is the right place to start.',
    features: [
      'Everything in Starting the Journey',
      'Enterprise AI operating model',
      'Responsible AI and governance',
      'Sustainability and AI impact planning',
      'Multimodal AI orchestration',
      'AI economics and cost management',
      '90-day execution roadmap',
      'All 16 modules and frameworks',
    ],
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    cta: 'Get Pro — One Payment',
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
  // ONE-TIME pricing model (v2.0): a single payment per tier, per region.
  // 'label' is the displayed launch price; 'listLabel' (optional) is the
  // anchor list price for promo framing. stripeEnvKey must point to a
  // ONE-TIME (non-recurring) Stripe Price object.
  AU: {
    currency: 'AUD',
    symbol: '$',
    plans: {
      journey: { oneTime: { amount: 149, label: '$149', stripeEnvKey: 'STRIPE_PRICE_JOURNEY_ONETIME' } },
      pro:     { oneTime: { amount: 299, label: '$299', stripeEnvKey: 'STRIPE_PRICE_PRO_ONETIME' } },
    },
  },
  IN: {
    currency: 'INR',
    symbol: '\u20b9',
    plans: {
      journey: { oneTime: { amount: 499, label: '\u20b9499', listLabel: '\u20b9999', stripeEnvKey: 'STRIPE_PRICE_JOURNEY_ONETIME_INR' } },
      pro:     { oneTime: { amount: 1999, label: '\u20b91,999', listLabel: '\u20b92,999', stripeEnvKey: 'STRIPE_PRICE_PRO_ONETIME_INR' } },
    },
  },
  PH: {
    currency: 'PHP',
    symbol: '\u20b1',
    plans: {
      journey: { oneTime: { amount: 599, label: '\u20b1599', listLabel: '\u20b1999', stripeEnvKey: 'STRIPE_PRICE_JOURNEY_ONETIME_PHP' } },
      pro:     { oneTime: { amount: 1999, label: '\u20b11,999', listLabel: '\u20b12,999', stripeEnvKey: 'STRIPE_PRICE_PRO_ONETIME_PHP' } },
    },
  },
  US: {
    currency: 'USD',
    symbol: 'US$',
    plans: {
      journey: { oneTime: { amount: 99, label: 'US$99', stripeEnvKey: 'STRIPE_PRICE_JOURNEY_ONETIME_USD' } },
      pro:     { oneTime: { amount: 199, label: 'US$199', stripeEnvKey: 'STRIPE_PRICE_PRO_ONETIME_USD' } },
    },
  },
}

export const DEFAULT_REGION = 'AU'

// Single source of truth for the one-time price label shown for a tier in a
// region. All pricing UI (homepage, pricing page, checkout) should call this
// rather than reaching into REGIONAL_PRICING directly — three independent
// copies of this lookup previously existed and could silently drift.
export function getPriceLabel(tierId, region = DEFAULT_REGION) {
  const config = REGIONAL_PRICING[region] || REGIONAL_PRICING[DEFAULT_REGION]
  return config?.plans?.[tierId]?.oneTime?.label || ''
}

// Helper: get currency symbol for region
export function getCurrencySymbol(region = DEFAULT_REGION) {
  return REGIONAL_PRICING[region]?.symbol || '$'
}
