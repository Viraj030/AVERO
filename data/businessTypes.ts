import type { BusinessType } from '@/types/avero';

interface BusinessPanel {
  id: BusinessType;
  label: string;
  headline: string;
  copy: string;
  cta: string;
  metrics: { label: string; value: string; caption: string }[];
  focus: string[];
  bars: { label: string; value: number }[];
}

export const businessPanels: Record<BusinessType, BusinessPanel> = {
  ecommerce: {
    id: 'ecommerce',
    label: 'E-commerce',
    headline: 'More profitable purchases, not just more orders.',
    copy: 'We build and scale e-commerce campaigns around what actually drives profitable growth. From audience targeting and retargeting to creative testing and purchase optimization.',
    cta: 'Scale My Store',
    metrics: [
      { label: 'PURCHASE ROAS', value: '16.24x', caption: 'Average across campaigns' },
      { label: 'PURCHASES', value: '3,218', caption: 'Total purchases' },
      { label: 'AD SPEND', value: '₹6.37L', caption: 'Total spend' },
      { label: 'AVG. PURCHASE VALUE', value: '₹3,213', caption: 'Average purchase value' }
    ],

    focus: [
      'PURCHASE OPTIMIZATION',
      'RETARGETING',
      'CREATIVE TESTING',
      'AUDIENCE TARGETING'
    ],

    bars: [
      { label: 'Prospecting', value: 62 },
      { label: 'Retargeting', value: 24 },
      { label: 'Brand search', value: 14 }
    ]
  },
  leadgen: {
    id: 'leadgen',
    label: 'Lead Generation',
    headline: 'Qualified leads, not just cheap form fills.',
    copy: 'We build full-funnel lead generation campaigns that combine audience testing, creative iteration and retargeting to attract the right prospects and improve acquisition efficiency.',
    cta: 'Generate Better Leads',
    metrics: [
      { label: 'COST PER LEAD', value: '$31', caption: 'Average CPL' },
      { label: 'LEADS GENERATED', value: '90+', caption: 'Total leads' },
      { label: 'WEBSITE CLICKS', value: '1,809', caption: 'Total clicks' },
      { label: 'AD SPEND', value: '$2,825', caption: 'Total spend' }
    ],

    focus: [
      'FULL-FUNNEL APPROACH',
      'AUDIENCE TESTING',
      'CREATIVE ITERATION',
      'RETARGETING',
      'LEAD GENERATION',
      'CAMPAIGN SCALING'
    ],

    bars: [
      { label: 'High intent search', value: 58 },
      { label: 'Demand capture', value: 27 },
      { label: 'Nurture / retarget', value: 15 }
    ]
  }
};

export const businessOrder: BusinessType[] = ['ecommerce', 'leadgen'];
