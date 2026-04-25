// data/tiers.js — single source of truth for all tier config
// Edit prices HERE only — never in components or pages.

export const TIERS = {
  individual: {
    id: 'individual', name: 'Individual', label: 'Self-Paced',
    price: 499, priceDisplay: '$499', priceRange: '$399–$499',
    billing: 'One-time · Lifetime access',
    colorClass: 'tier-individual',
    description: 'For professionals embedding AI into their own workflows.',
    features: [
      'Full 8-module core curriculum',
      'Core lesson content (all modules)',
      'Basic template library (8 templates)',
      'AI Readiness Snapshot',
      'ROI Calculator',
      '90-Day Execution Plan template',
      'Lifetime access + all future updates',
    ],
    cta: 'Enrol Now',
    highlighted: false,
  },
  smb: {
    id: 'smb', name: 'SMB', label: 'Implementation',
    price: 1499, priceDisplay: '$1,499', priceRange: '$1,200–$1,800',
    billing: 'One-time · Up to 5 team seats',
    colorClass: 'tier-smb',
    description: 'For small and mid-size businesses implementing AI across operations.',
    features: [
      'Everything in Individual',
      'SMB business examples per module',
      'Use case playbooks (by industry)',
      'Implementation templates',
      'Workflow design workshop guide',
      'Vendor selection framework',
      'Up to 5 team seats',
      'Priority email support',
    ],
    cta: 'Enrol Your Team',
    highlighted: true,
  },
  enterprise: {
    id: 'enterprise', name: 'Enterprise', label: 'Transformation',
    price: null, priceDisplay: '$5,000+', priceRange: '$5,000–$15,000+',
    billing: 'Custom · Unlimited team seats',
    colorClass: 'tier-enterprise',
    description: 'For organisations deploying AI at scale with governance and advisory.',
    features: [
      'Everything in SMB',
      'Enterprise AI operating model',
      'Data readiness & standardisation program',
      'Governance & ethics framework',
      'AI command centre design',
      'Orchestration strategy',
      'Unlimited team seats',
      'Monthly advisory session (1hr)',
      'Custom use case review',
    ],
    cta: 'Contact for Pricing',
    highlighted: false,
  },
}

export const TIER_ORDER = ['individual', 'smb', 'enterprise']

export const canAccessTier = (userTier, contentTier) =>
  TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(contentTier)
