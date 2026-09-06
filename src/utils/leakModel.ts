export interface LeakInputs {
  spend: number;
  roas: number;
  cvr: number;
  trackingConfidence: number;
}

export interface LeakModel {
  currentRevenue: number;
  wastedPercent: number;
  recoverableSpend: number;
  cvrTarget: number;
  projectedRoas: number;
  projectedRevenue: number;
  monthlyUpside: number;
  annualUpside: number;
  attributionGap: number;
  drivers: {label: string;share: number;}[];
}

const clamp = (value: number, min: number, max: number) =>
Math.min(Math.max(value, min), max);

/**
 * A transparent, deliberately conservative model. It exists to size the
 * opportunity, not to promise a return — the copy alongside it says so.
 */
export function modelLeak({
  spend,
  roas,
  cvr,
  trackingConfidence
}: LeakInputs): LeakModel {
  const currentRevenue = spend * roas;

  // Weaker efficiency implies more budget sitting in unproven campaigns.
  const wastedPercent = clamp(36 - (roas - 1) * 7.5, 9, 36);
  const recoverableSpend = spend * wastedPercent / 100;

  // Reallocating half of the identified waste at account-average efficiency.
  const reallocationLift = wastedPercent / 100 * 0.5;

  // Conversion rate improvement, capped in absolute percentage points.
  const cvrTarget = cvr + Math.min(cvr * 0.32, 1.6);
  const cvrMultiplier = cvrTarget / cvr;

  // Under-measurement hides conversions that already happened.
  const attributionGap = (100 - trackingConfidence) / 100 * 0.45;
  const measurementMultiplier = 1 + attributionGap * 0.5;

  const projectedRoas =
  roas * (1 + reallocationLift) * cvrMultiplier * measurementMultiplier;
  const projectedRevenue = spend * projectedRoas;
  const monthlyUpside = projectedRevenue - currentRevenue;

  const rawDrivers = [
  { label: 'Budget reallocation', share: reallocationLift },
  { label: 'Conversion rate', share: cvrMultiplier - 1 },
  { label: 'Measurement recovery', share: measurementMultiplier - 1 }];

  const total = rawDrivers.reduce((sum, d) => sum + d.share, 0) || 1;

  return {
    currentRevenue,
    wastedPercent,
    recoverableSpend,
    cvrTarget,
    projectedRoas,
    projectedRevenue,
    monthlyUpside,
    annualUpside: monthlyUpside * 12,
    attributionGap: attributionGap * 100,
    drivers: rawDrivers.map((d) => ({
      label: d.label,
      share: Math.round(d.share / total * 100)
    }))
  };
}

export function spendBucket(spend: number): string {
  if (spend < 50000) return '< ₹50K';
  if (spend < 100000) return '₹50K–₹1L';
  if (spend < 200000) return '₹1L–₹2L';
  return '₹2L+';
}