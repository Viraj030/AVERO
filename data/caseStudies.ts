import type { CaseStudy } from '@/types/avero';

export const caseStudies: CaseStudy[] = [
  {
    id: 'optical-eyewear-retail',
    client: 'National Optical & Eyewear Retail Chain',
    logoSrc: '',
    sector: 'Lead / Store Conversions',
    channelTag: 'GOOGLE ADS',
    typeTag: 'LEAD / STORE CONVERSIONS',
    headline: '10,238 conversions from ₹11.49L in ad spend.',
    description:
      'We managed Google Ads to drive high-volume footfall, eye test bookings, and eyewear purchases across 100+ retail locations in 30+ cities while maintaining cost-efficient acquisition.',
    challenge:
      'Scaling in-store footfall and eyewear conversions across 100+ physical optical centers in 30+ cities under intense local competition while improving search ad spend efficiency.',
    changed:
      'Restructured Google Ads campaign targeting with hyper-local geo-fencing, refined conversion tracking, and optimized ad copy for high-intent search terms across authentic branded eyewear.',
    result:
      'Generated 10,238 conversions from ₹11.49L in total ad spend while achieving 3,28,085 clicks at a 2.24% CTR across nationwide retail stores.',
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
    id: 'experiential-illusion-museum',
    client: 'Interactive Illusion Museum',
    logoSrc: '',
    sector: 'Ticket Sales Conversions',
    channelTag: 'META & GOOGLE ADS',
    typeTag: 'TICKET SALES CONVERSIONS',
    headline: '15.47x ROAS & ₹17.75L revenue from ₹1.14L ad spend.',
    description:
      'Launched and scaled digital ticket sales for a world-renowned interactive illusion and experiential entertainment venue entering the Indian market.',
    challenge:
      'Launching a premier interactive optical illusion and experiential entertainment venue in India, driving rapid brand buzz, viral social media engagement, and high-volume direct ticket sales.',
    changed:
      'Expanded to a full-funnel acquisition strategy with UGC creators, reels & carousel illusion demonstrations, lookalike audiences, Advantage+ placements, and instant checkout purchase optimization.',
    result:
      'Scaled ad spend while maintaining a 15.47x ROAS, generating ₹17.75L in revenue from ₹1.14L in ad spend. Delivered 730 ticket bookings at ₹157.23 CPP and ₹2,432 AOV, returning ~15.5x on every ad rupee spent.',
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
