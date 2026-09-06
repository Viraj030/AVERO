import type { FixCategory } from '../types/avero';

export const fixCategories: FixCategory[] = [
{
  id: 'paid-media',
  label: 'Paid Media',
  summary: 'Account structure, budget logic and scaling discipline.',
  items: [
  'Meta Ads',
  'Google Ads',
  'Campaign structure',
  'Budget allocation',
  'Audience strategy',
  'Search terms',
  'Scaling'],

  looksFor: [
  'Budget concentrated in campaigns that never proved efficiency',
  'Overlapping audiences competing in the same auction',
  'Search term waste hidden behind acceptable account averages',
  'Scaling attempts that break a structure never built to hold spend']

},
{
  id: 'creative',
  label: 'Creative',
  summary: 'The variable with the largest effect on cost per result.',
  items: [
  'Creative strategy',
  'Hooks',
  'Ad angles',
  'Testing systems',
  'Creative fatigue'],

  looksFor: [
  'One winning angle carrying the entire account',
  'Iteration without a hypothesis — new edits, same idea',
  'Frequency climbing while CTR quietly decays',
  'No system to promote or retire creative on evidence']

},
{
  id: 'conversion',
  label: 'Conversion',
  summary: 'Where paid traffic stops being potential revenue.',
  items: [
  'Landing pages',
  'Shopify / e-commerce funnel',
  'CRO',
  'Offer positioning',
  'Checkout issues'],

  looksFor: [
  'Ad promise and landing page message that do not match',
  'Checkout or form steps that lose users at a measurable point',
  'Offer positioning that competes on price by accident',
  'Mobile experience materially worse than desktop']

},
{
  id: 'data',
  label: 'Data',
  summary: 'If the measurement is wrong, every decision after it is too.',
  items: [
  'Tracking',
  'Attribution',
  'GA4',
  'Pixel / CAPI',
  'Reporting',
  'Lead quality feedback'],

  looksFor: [
  'Duplicate or missing conversion events inflating reported results',
  'Pixel and CAPI disagreeing with the platform of record',
  'No feedback loop from CRM outcomes back into optimisation',
  'Reporting that measures activity instead of profit']

}];