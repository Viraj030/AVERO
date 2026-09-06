export interface AuditCheck {
  id: string;
  label: string;
  detail: string;
  status: 'clear' | 'watch' | 'leak';
  finding: string;
}

export const auditChecks: AuditCheck[] = [
{
  id: 'structure',
  label: 'Campaign structure',
  detail: 'Consolidation, overlap, auction competition',
  status: 'watch',
  finding: 'Two prospecting campaigns bidding against each other'
},
{
  id: 'budget',
  label: 'Budget allocation',
  detail: 'Spend distribution against proven efficiency',
  status: 'leak',
  finding: '31% of spend sitting in campaigns below target CPA'
},
{
  id: 'creative',
  label: 'Creative performance',
  detail: 'Hook variance, fatigue curve, testing cadence',
  status: 'leak',
  finding: 'One angle carrying 74% of results, CTR decaying'
},
{
  id: 'audience',
  label: 'Audience strategy',
  detail: 'Signal quality, exclusions, incrementality',
  status: 'clear',
  finding: 'Exclusions applied correctly across the account'
},
{
  id: 'search',
  label: 'Search terms',
  detail: 'Match type discipline and negative coverage',
  status: 'watch',
  finding: 'Broad terms absorbing budget with no conversions'
},
{
  id: 'landing',
  label: 'Landing page conversion',
  detail: 'Message match, speed, mobile experience',
  status: 'leak',
  finding: 'Mobile CVR 42% below desktop on the same traffic'
},
{
  id: 'tracking',
  label: 'Tracking & attribution',
  detail: 'Pixel, CAPI, GA4, event de-duplication',
  status: 'leak',
  finding: 'Duplicate purchase events inflating reported ROAS'
},
{
  id: 'economics',
  label: 'Lead quality / purchase economics',
  detail: 'What the business keeps after everything',
  status: 'watch',
  finding: 'No CRM outcome feeding back into optimisation'
}];