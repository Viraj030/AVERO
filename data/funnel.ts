import type { FunnelStage } from '@/types/avero';

export const funnelStages: FunnelStage[] = [
  {
    id: 'ad',
    label: 'Ad',
    caption: 'Impression served, budget spent',
    value: '₹1,00,000',
    lossLabel: 'Weak hooks, creative fatigue',
    lossPercent: 18
  },
  {
    id: 'click',
    label: 'Click',
    caption: 'Intent captured, traffic paid for',
    value: '₹82,000',
    lossLabel: 'Wrong audience, broad search terms',
    lossPercent: 31
  },
  {
    id: 'landing',
    label: 'Landing Page',
    caption: 'Message match and page speed',
    value: '₹56,580',
    lossLabel: 'Offer mismatch, slow or unclear page',
    lossPercent: 42
  },
  {
    id: 'conversion',
    label: 'Conversion',
    caption: 'Lead submitted or checkout completed',
    value: '₹32,810',
    lossLabel: 'Checkout friction, low lead quality',
    lossPercent: 15
  },
  {
    id: 'revenue',
    label: 'Revenue',
    caption: 'What the business actually keeps',
    value: '₹27,890',
    lossLabel: 'Attribution gap — unmeasured, unoptimised',
    lossPercent: 0
  }
];
