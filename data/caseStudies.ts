import type { CaseStudy } from '@/types/avero';

export const caseStudies: CaseStudy[] = [
  {
    id: 'lawrence-mayo',
    client: 'Lawrence & Mayo',
    logoSrc: '/images/L&M-logo.png',
    sector: 'Lead / Conversions',
    channelTag: 'GOOGLE ADS',
    typeTag: 'LEAD / CONVERSIONS',
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
    sector: 'Sales Conversions',
    channelTag: 'META & GOOGLE ADS',
    typeTag: 'SALES CONVERSIONS',
    headline: '15.47x ROAS & ₹17.75L revenue from ₹1.14L ad spend.',
    description:
      'Scaled ad spend while maintaining a 15.47x ROAS, generating ₹17.75L in revenue from ₹1.14L in ad spend.',
    challenge:
      'This was a new brand launching in India, with objectives focused on building brand awareness, increasing audience engagement, and driving ticket sales through strategic digital marketing campaigns.',
    changed:
      'Expanded to a full-funnel acquisition strategy with UGC, reels & carousel creative testing, lookalike audiences, CBO/Advantage+ placements, and purchase optimization.',
    result:
      'Scaled ad spend while maintaining a 15.47x ROAS, generating ₹17.75L in revenue from ₹1.14L in ad spend. Generated 730 ticket purchases at an average Cost Per Purchase (CPP) of ₹157.23. Achieved an estimated Average Order Value (AOV) of ₹2,432, enabling profitable campaign scaling. Delivered approximately 15.5x return on every ₹1 spent on Meta Ads.',
    metrics: [
      { label: 'Ad Spend', value: '₹1.14L' },
      { label: 'Revenue', value: '₹17.75L' },
      { label: 'ROAS', value: '15.47x' },
      { label: 'Ticket Purchases', value: '730' }
    ],
    dateRange: '1 NOV 2024 – 30 NOV 2024',
    dashboardImage: '/images/Paradox-dashboard.png.jpg'
  }
];
