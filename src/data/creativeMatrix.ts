export interface MatrixCell {
  ctr: number;
  cvr: number;
  spendShare: number;
  verdict: 'scale' | 'iterate' | 'retire' | 'untested';
  note: string;
}

export const hooks = [
'Problem-first',
'Proof / result',
'Comparison',
'Founder POV'];


export const formats = ['Static', 'UGC video', 'Motion', 'Carousel'];

/** Rows = hooks, columns = formats. Placeholder test data. */
export const matrix: MatrixCell[][] = [
[
{ ctr: 1.9, cvr: 2.4, spendShare: 11, verdict: 'iterate', note: 'Clicks well, converts average — offer framing is the blocker.' },
{ ctr: 2.8, cvr: 3.6, spendShare: 34, verdict: 'scale', note: 'Carrying the account. Needs three fresh variants before fatigue.' },
{ ctr: 1.4, cvr: 1.9, spendShare: 6, verdict: 'retire', note: 'Underperforms the account average on both metrics.' },
{ ctr: 1.7, cvr: 2.1, spendShare: 4, verdict: 'iterate', note: 'Frame one is doing the work — cut the length.' }],

[
{ ctr: 2.4, cvr: 3.1, spendShare: 18, verdict: 'scale', note: 'Second-strongest angle. Under-funded relative to results.' },
{ ctr: 2.1, cvr: 2.8, spendShare: 9, verdict: 'iterate', note: 'Strong hook, weak middle. Re-cut around the result.' },
{ ctr: 1.6, cvr: 2.2, spendShare: 5, verdict: 'iterate', note: 'Motion adds cost without adding clarity here.' },
{ ctr: 0, cvr: 0, spendShare: 0, verdict: 'untested', note: 'No spend has ever reached this combination.' }],

[
{ ctr: 1.5, cvr: 1.6, spendShare: 7, verdict: 'retire', note: 'Invites price shopping. Costs rise, quality falls.' },
{ ctr: 1.8, cvr: 2.0, spendShare: 3, verdict: 'iterate', note: 'Needs a sharper single point of comparison.' },
{ ctr: 0, cvr: 0, spendShare: 0, verdict: 'untested', note: 'No spend has ever reached this combination.' },
{ ctr: 1.3, cvr: 1.4, spendShare: 2, verdict: 'retire', note: 'Format fragments the argument across frames.' }],

[
{ ctr: 2.2, cvr: 3.4, spendShare: 1, verdict: 'scale', note: 'Best conversion rate in the account on 1% of budget.' },
{ ctr: 2.0, cvr: 2.9, spendShare: 0, verdict: 'untested', note: 'Directionally promising — never given real budget.' },
{ ctr: 0, cvr: 0, spendShare: 0, verdict: 'untested', note: 'No spend has ever reached this combination.' },
{ ctr: 0, cvr: 0, spendShare: 0, verdict: 'untested', note: 'No spend has ever reached this combination.' }]];



export const verdictLabels: Record<MatrixCell['verdict'], string> = {
  scale: 'Scale',
  iterate: 'Iterate',
  retire: 'Retire',
  untested: 'Untested'
};