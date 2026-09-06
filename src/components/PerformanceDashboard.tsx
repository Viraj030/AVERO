import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityIcon, TriangleAlertIcon } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { formatCurrency, formatDecimal } from '../utils/format';

const leaks = [
{ system: 'Creative', signal: 'CTR', direction: 'down', severity: 62 },
{ system: 'Landing Page', signal: 'CVR', direction: 'down', severity: 78 },
{ system: 'Tracking', signal: 'Attribution gap', direction: 'flat', severity: 54 },
{ system: 'Campaign', signal: 'Wasted spend', direction: 'up', severity: 71 }];


const spendSeries = [38, 44, 41, 52, 49, 58, 61, 57, 66, 72, 69, 78];
const revenueSeries = [40, 43, 47, 46, 51, 50, 54, 52, 56, 55, 58, 57];

function buildPath(series: number[], width: number, height: number) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const step = width / (series.length - 1);
  return series.
  map((point, i) => {
    const x = i * step;
    const y = height - (point - min) / (max - min || 1) * (height - 8) - 4;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).
  join(' ');
}

export function PerformanceDashboard() {
  const spend = useCountUp(48620, { duration: 1400 });
  const revenue = useCountUp(112400, { duration: 1600 });
  const roas = useCountUp(2.31, { duration: 1500, decimals: 2 });
  const [activeLeak, setActiveLeak] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setInterval(
      () => setActiveLeak((prev) => (prev + 1) % leaks.length),
      2600
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-card border border-white/10 bg-navy-900 text-white shadow-[0_40px_90px_-50px_rgba(12,40,70,0.9)]">
      <div className="avero-grid-lines absolute inset-0" aria-hidden="true" />

      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-white/55">
          <ActivityIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          Account Diagnostic
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          Live · 30d
        </div>
      </div>

      <div className="relative grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
        <Metric label="Ad Spend" value={formatCurrency(spend)} />
        <Metric label="Revenue" value={formatCurrency(revenue)} />
        <Metric label="ROAS" value={`${formatDecimal(roas)}x`} accent />
      </div>

      <div className="relative border-b border-white/10 px-5 py-5">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
          <span>Spend vs revenue index</span>
          <span className="flex items-center gap-4">
            <LegendDot className="bg-gold" label="Spend" />
            <LegendDot className="bg-white/45" label="Revenue" />
          </span>
        </div>
        <svg
          viewBox="0 0 320 84"
          className="h-[84px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Ad spend climbing faster than revenue over the last 12 weeks">
          
          <motion.path
            d={buildPath(revenueSeries, 320, 84)}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }} />
          
          <motion.path
            d={buildPath(spendSeries, 320, 84)}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }} />
          
        </svg>
      </div>

      <div className="relative px-5 py-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-gold">
          <TriangleAlertIcon className="h-3.5 w-3.5" aria-hidden="true" />
          4 potential leaks detected
        </div>
        <ul className="space-y-px">
          {leaks.map((leak, i) => {
            const active = i === activeLeak;
            return (
              <li
                key={leak.system}
                className={`relative flex items-center justify-between gap-4 rounded-[8px] px-3 py-2.5 transition-colors duration-300 ease-premium ${
                active ? 'bg-white/[0.07]' : 'bg-transparent'}`
                }>
                
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 transition-colors duration-300 ease-premium ${
                  active ? 'bg-gold' : 'bg-white/10'}`
                  } />
                
                <span className="flex min-w-0 items-baseline gap-2.5">
                  <span className="text-[13px] font-medium text-white/90">
                    {leak.system}
                  </span>
                  <span className="truncate font-mono text-[11px] text-white/45">
                    → {leak.signal}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden h-[3px] w-20 overflow-hidden rounded-full bg-white/10 sm:block">
                    <motion.span
                      className="block h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: active ? `${leak.severity}%` : '18%' }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} />
                    
                  </span>
                  <span
                    className={`font-mono text-[12px] ${
                    active ? 'text-gold' : 'text-white/40'}`
                    }>
                    
                    {leak.direction === 'down' ?
                    '↓' :
                    leak.direction === 'up' ?
                    '↑' :
                    '—'}
                  </span>
                </span>
              </li>);

          })}
        </ul>
      </div>

      <div className="relative border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-eyebrow text-white/35">
        Illustrative account data · replace with client figures
      </div>
    </div>);

}

function Metric({
  label,
  value,
  accent




}: {label: string;value: string;accent?: boolean;}) {
  return (
    <div className="px-5 py-5">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-[26px] font-semibold leading-none tabular-nums sm:text-[30px] ${
        accent ? 'text-gold' : 'text-white'}`
        }>
        
        {value}
      </p>
    </div>);

}

function LegendDot({ className, label }: {className: string;label: string;}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-[2px] w-3 ${className}`} aria-hidden="true" />
      {label}
    </span>);

}