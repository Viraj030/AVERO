import type { CaseStudy } from '../types/avero';

/**
 * PLACEHOLDER DATA — replace every value below with verified client results
 * before publishing. Nothing here should be presented as a real outcome.
 */
export const caseStudies: CaseStudy[] = [
{
  id: 'ecom-01',
  client: 'E-commerce Brand',
  sector: 'DTC / Apparel',
  challenge:
  'Spend was increasing month over month while blended return stayed flat. Reported ROAS in Ads Manager did not match what the business actually banked.',
  changed:
  'Rebuilt campaign structure around proven angles, deduplicated conversion events across Pixel and CAPI, and reworked the product page above the fold.',
  result:
  'Efficiency improved before spend increased. Scaling started only after the account held its cost per acquisition for three consecutive weeks.',
  before: [
  { label: 'ROAS', value: '1.8x' },
  { label: 'CPA', value: '₹2,200' }],

  after: [
  { label: 'ROAS', value: '3.4x' },
  { label: 'CPA', value: '₹1,250' }],

  change: ['+89% ROAS', '-43% CPA'],
  series: {
    before: [42, 40, 46, 41, 44, 43, 45],
    after: [46, 52, 58, 63, 71, 78, 86]
  }
},
{
  id: 'leadgen-01',
  client: 'Lead Generation Business',
  sector: 'B2B Services',
  challenge:
  'Cost per lead looked healthy, but the sales team was closing a shrinking share of them. Optimisation was rewarding the cheapest, least qualified enquiries.',
  changed:
  'Fed CRM outcomes back into the ad platforms, pruned broad search terms, and rewrote the form to qualify instead of merely collect.',
  result:
  'Cost per lead rose slightly, cost per qualified opportunity fell. The metric that mattered moved in the right direction.',
  before: [
  { label: 'CPL', value: '₹650' },
  { label: 'Qualified rate', value: '21%' }],

  after: [
  { label: 'CPL', value: '₹750' },
  { label: 'Qualified rate', value: '48%' }],

  change: ['+129% qualified rate', '-37% cost per opportunity'],
  series: {
    before: [30, 33, 29, 34, 31, 32, 30],
    after: [34, 41, 47, 55, 62, 70, 79]
  }
}];