/**
 * Production Subscription Tiers & Platform Policy Config
 */

export const COUNSELLOR_SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'FREE',
    name: 'Tier 1: Sign-Up & Public Directory',
    priceINR: 0,
    priceUSD: 0,
    billingPeriod: 'Free Forever',
    hasPortalAccess: false,
    badge: 'Public Directory',
    description: 'Basic listing on the public marketplace. Portal tools and student assignments are locked.',
    features: [
      'Public Marketplace Profile Listing',
      'Search & Filter Visibility',
      'Public Reviews & Star Rating Display',
      '❌ Access to Counsellor Portal Tools',
      '❌ Student Intake & Roadmap Builder',
      '❌ Application Pipeline & Recommendation Dispatch'
    ]
  },
  PRO: {
    id: 'PRO',
    name: 'Tier 2: Pro Portal Access',
    priceINR: 3999,
    priceUSD: 49,
    billingPeriod: '/ month',
    hasPortalAccess: true,
    badge: 'Pro Verified',
    description: 'Full access to production portal tools, student assignments, intake review, and roadmap builder.',
    features: [
      'Everything in Tier 1',
      '✅ Full Counsellor Portal Access',
      '✅ Direct Student Assignments & Pipeline Tracker',
      '✅ Interactive Tabular Roadmap Builder & Drag-and-Drop',
      '✅ Assign Psychometric Tests (Choose 2-3 of 5 tests)',
      '✅ Meeting Link Integration (Zoom/Google Meet)',
      '✅ Direct University Recommendation Dispatcher'
    ]
  },
  PREMIUM_BOOST: {
    id: 'PREMIUM_BOOST',
    name: 'Tier 3: Featured Marketplace Boost',
    priceINR: 7999,
    priceUSD: 99,
    billingPeriod: '/ month',
    hasPortalAccess: true,
    badge: 'Featured Advisor',
    description: 'Full portal access plus top placement on the Homepage Hero Carousel & priority search ranking.',
    features: [
      'Everything in Tier 2',
      '🚀 Featured Hero Boost Carousel Placement',
      '🚀 Priority Search & Category Filter Ranking',
      '🚀 3x Higher Student Profile Views',
      '🚀 Verified Partner Gold Badge',
      '🚀 Priority Admin Support'
    ]
  }
};

export const PLATFORM_COMMISSION = {
  percentage: 15, // 15% platform cut on student package bookings
  escrowHoldingDays: 14 // 14 days refund guarantee period
};

export const STUDENT_GUARANTEE_POLICY = {
  maxRefundDays: 14, // 2 weeks refund window
  maxRefundSessions: 3, // Up to 3 sessions allowed for full refund
  maxMonthlyCounsellorSwitches: 3
};
