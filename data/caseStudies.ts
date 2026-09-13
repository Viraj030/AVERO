import type { CaseStudy } from '@/types/avero';

export const caseStudies: CaseStudy[] = [
  {
    id: 'lawrence-mayo',
    client: 'Lawrence & Mayo',
    logoSrc: '/images/L&M-logo.png',
    sector: 'Sales / Conversions',
    channelTag: 'GOOGLE ADS',
    typeTag: 'SALES / CONVERSIONS',
    headline: '10,238 conversions from ₹11.49L in ad spend.',
    description:
      'We managed Google Ads to drive high-volume traffic and conversions while maintaining cost-efficient campaign performance.',
    challenge:
      'The campaign delivered strong engagement and efficiently drove conversions while maintaining cost effective performance. Continued optimization of audience targeting, creative messaging, and landing page experience can further improve engagement, increase conversion efficiency, and maximize overall campaign results.',
    changed:
      'Restructured Google Ads campaign targeting, refined conversion tracking, and optimized ad copy for high-intent search terms.',
    result:
      'Generated 10,238 conversions from ₹11.49L in total ad spend while achieving 3,28,085 clicks at a 2.24% CTR.',
    metrics: [
      { label: 'Ad Spend', value: '₹11.49L' },
      { label: 'Clicks', value: '3,28,085' },
      { label: 'CTR', value: '2.24%' },
      { label: 'Conversions', value: '10,238' }
    ],
    dateRange: '14 FEB 2011 – 29 JUL 2026',
    dashboardImage: '/images/L&M-dashboard.png.jpg'
  },
  {
    id: 'paradox-museum',
    client: 'Paradox Museum',
    logoSrc: '/images/paradox-museum-logo.webp',
    sector: 'Ticket Sales',
    channelTag: 'GOOGLE ADS',
    typeTag: 'TICKET SALES',
    headline: '61.08x ROAS from a ₹1.04L ad spend.',
    description:
      'We helped Paradox Museum launch and scale in India with performance-driven Google Ads campaigns, generating high revenue and ticket sales at an exceptional ROAS.',
    challenge:
      'This was a new brand launching in India, with objectives focused on building brand awareness, increasing audience engagement, and driving ticket sales through strategic digital marketing campaigns.',
    changed:
      'Expanded to a full-funnel acquisition strategy with UGC, reels & carousel creative testing, lookalike audiences, CBO/Advantage+ placements, and purchase optimization.',
    result:
      'Achieved 61.08x ROAS generating ₹6.38L revenue from ₹1.04L spend on Google Ads with 1,902 purchases, and scaled Meta campaigns to 15.47x ROAS.',
    metrics: [
      { label: 'Ad Spend', value: '₹1.04L' },
      { label: 'Revenue', value: '₹6.38L' },
      { label: 'ROAS', value: '61.08x' },
      { label: 'Purchases', value: '1,902' }
    ],
    dateRange: '1 NOV 2024 – 30 NOV 2024',
    dashboardImage: '/images/Paradox-dashboard.png.jpg'
  }
];
