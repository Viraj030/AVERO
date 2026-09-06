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
    headline: 'Profit per order, not orders at any price.',
    copy: 'We work backwards from contribution margin — what the store keeps after product cost, shipping and ad spend — then find which part of the funnel is eroding it.',
    cta: 'Scale My Store',
    metrics: [
      { label: 'ROAS', value: '2.31x', caption: 'Platform reported' },
      { label: 'MER', value: '1.94x', caption: 'Blended, all channels' },
      { label: 'CAC', value: '₹1,250', caption: 'New customer' },
      { label: 'AOV', value: '₹2,490', caption: 'Trailing 30 days' }
    ],

    focus: [
      'Product economics',
      'Creative fatigue',
      'Funnel leakage',
      'Retargeting',
      'Checkout performance',
      'Conversion rate'
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
    headline: 'Qualified pipeline, not cheap form fills.',
    copy: 'Cost per lead is the easiest number to improve and the easiest to fool yourself with. We optimise against what the sales team can actually close.',
    cta: 'Improve My Lead Flow',
    metrics: [
      { label: 'CPL', value: '₹450', caption: 'All sources' },
      { label: 'Qualified rate', value: '48%', caption: 'CRM verified' },
      { label: 'CPA', value: '₹3,500', caption: 'Per closed deal' },
      { label: 'Lead → sale', value: '11.4%', caption: 'Trailing quarter' }
    ],

    focus: [
      'Search intent',
      'Landing page CVR',
      'Lead quality',
      'CRM feedback',
      'Sales conversion',
      'Form qualification'
    ],

    bars: [
      { label: 'High intent search', value: 58 },
      { label: 'Demand capture', value: 27 },
      { label: 'Nurture / retarget', value: 15 }
    ]
  }
};

export const businessOrder: BusinessType[] = ['ecommerce', 'leadgen'];
