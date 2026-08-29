// Marketplace Subscription Tiers & Feature Matrix

export const SUBSCRIPTION_TIERS = {
  STARTER: {
    id: "STARTER",
    name: "Starter Advisor",
    priceMonthly: 0,
    badgeLabel: "Standard Mentor",
    commissionRate: 0.15, // 15% platform escrow commission
    maxActiveStudents: 5,
    boostTokensIncluded: 0,
    hasRightOfReply: false,
    hasPrioritySearch: false,
    hasCustomBranding: false,
    features: [
      "Public Marketplace Listing",
      "Up to 5 Active Students",
      "Standard Session Escrow (15% platform fee)",
      "Standard Response SLA (4-6 hours)",
      "Basic Calendar Booking"
    ]
  },
  PRO: {
    id: "PRO",
    name: "Pro Verified Consultant",
    priceMonthly: 4999,
    badgeLabel: "Verified Pro Advisor",
    commissionRate: 0.08, // 8% platform escrow commission
    maxActiveStudents: 25,
    boostTokensIncluded: 2,
    hasRightOfReply: true,
    hasPrioritySearch: true,
    hasCustomBranding: false,
    features: [
      "Verified Priority Profile Seal",
      "Up to 25 Active Students",
      "Reduced Escrow Commission (8% platform fee)",
      "Right-of-Reply on Student Reviews",
      "Priority Search Indexing",
      "2 Monthly Boost Tokens Included",
      "Custom Milestone Templates"
    ]
  },
  ELITE: {
    id: "ELITE",
    name: "Elite Sponsored Partner",
    priceMonthly: 14999,
    badgeLabel: "Featured Boosted Partner",
    commissionRate: 0.05, // 5% platform escrow commission
    maxActiveStudents: 100,
    boostTokensIncluded: 10,
    hasRightOfReply: true,
    hasPrioritySearch: true,
    hasCustomBranding: true,
    features: [
      "Gold Featured Boost Badge",
      "Homepage Hero Carousel Placement",
      "Top Priority Search Ranking",
      "Unlimited Active Students",
      "Lowest Escrow Commission (5% platform fee)",
      "Direct Student Lead Matching",
      "10 Monthly Boost Tokens Included",
      "Dedicated Account Manager"
    ]
  }
};
