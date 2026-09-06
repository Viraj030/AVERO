import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { modelLeak, spendBucket } from '../utils/leakModel';
import { formatCurrency } from '../utils/format';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

interface LeakCalculatorProps {
  onOpenAudit: (spendBucketValue?: string) => void;
}

export function LeakCalculator({ onOpenAudit }: LeakCalculatorProps) {
  const [spend, setSpend] = useState(24000);
  const [roas, setRoas] = useState(2.3);
  const [cvr, setCvr] = useState(1.8);
  const [tracking, setTracking] = useState(72);

  const model = useMemo(
    () => modelLeak({ spend, roas, cvr, trackingConfidence: tracking }),
    [spend, roas, cvr, tracking]
  );

  return (
    <Section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      
      <div
        className="avero-grid-lines pointer-events-none absolute inset-0"
        aria-hidden="true" />
      

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <Eyebrow tone="dark">Leak model</Eyebrow>
          <h2
            id="calculator-heading"
            className="mt-6 max-w-[18ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[42px]">
            
            Size the leak before you{' '}
            <span className="text-gold">spend another dollar.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.7] text-white/65">
            Move the four inputs that decide your economics. The model reallocates
            half of identified waste, applies a capped conversion improvement, and
            recovers under-measured conversions. Conservative by design.
          </p>

          <div className="mt-10 space-y-7 rounded-card border border-white/10 bg-white/[0.03] p-6">
            <Slider
              id="input-spend"
              label="Monthly ad spend"
              value={formatCurrency(spend)}
              min={2000}
              max={200000}
              step={1000}
              raw={spend}
              onChange={setSpend} />
            
            <Slider
              id="input-roas"
              label="Current ROAS"
              value={`${roas.toFixed(1)}x`}
              min={0.8}
              max={5}
              step={0.1}
              raw={roas}
              onChange={setRoas} />
            
            <Slider
              id="input-cvr"
              label="Landing page conversion rate"
              value={`${cvr.toFixed(1)}%`}
              min={0.4}
              max={8}
              step={0.1}
              raw={cvr}
              onChange={setCvr} />
            
            <Slider
              id="input-tracking"
              label="Confidence in your tracking"
              value={`${tracking}%`}
              min={20}
              max={100}
              step={1}
              raw={tracking}
              onChange={setTracking} />
            
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-card border border-white/12 bg-navy-800/60">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
                Modelled monthly upside
              </p>
              <p
                className="mt-2 font-display text-[40px] font-semibold leading-none tabular-nums text-gold sm:text-[52px]"
                aria-live="polite">
                
                {formatCurrency(model.monthlyUpside)}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-white/40">
                {formatCurrency(model.annualUpside)} / year · not a guarantee
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-white/10">
              <Readout
                label="Revenue today"
                value={formatCurrency(model.currentRevenue)} />
              
              <Readout
                label="Revenue modelled"
                value={formatCurrency(model.projectedRevenue)}
                accent />
              
              <Readout label="ROAS today" value={`${roas.toFixed(2)}x`} />
              <Readout
                label="ROAS modelled"
                value={`${model.projectedRoas.toFixed(2)}x`}
                accent />
              
            </dl>

            <div className="border-t border-white/10 px-6 py-5">
              <p className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
                <span>Spend in unproven campaigns</span>
                <span className="text-gold">
                  {model.wastedPercent.toFixed(0)}% ·{' '}
                  {formatCurrency(model.recoverableSpend)}
                </span>
              </p>
              <span className="mt-3 block h-[6px] overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-gold"
                  animate={{ width: `${model.wastedPercent}%` }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} />
                
              </span>
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
                Where the upside comes from
              </p>
              <ul className="mt-4 space-y-3">
                {model.drivers.map((driver, i) =>
                <li key={driver.label} className="flex items-center gap-4">
                    <span className="w-[44%] shrink-0 text-[13px] text-white/70">
                      {driver.label}
                    </span>
                    <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                      className={`block h-full rounded-full ${
                      i === 0 ? 'bg-gold' : 'bg-white/40'}`
                      }
                      animate={{ width: `${driver.share}%` }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} />
                    
                    </span>
                    <span className="w-10 shrink-0 text-right font-mono text-[12px] tabular-nums text-white/55">
                      {driver.share}%
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className="border-t border-white/10 px-6 py-6">
              <Button
                size="lg"
                className="w-full"
                onClick={() => onOpenAudit(spendBucket(spend))}
                aria-haspopup="dialog">
                
                Pressure-test this in 15 minutes
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                  aria-hidden="true" />
                
              </Button>
              <p className="mt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-eyebrow text-white/30">
                A model is a hypothesis. The audit tells you which part of it is
                actually true for your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>);

}

interface SliderProps {
  id: string;
  label: string;
  value: string;
  raw: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Slider({
  id,
  label,
  value,
  raw,
  min,
  max,
  step,
  onChange
}: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-eyebrow text-white/50">
          
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-[19px] font-semibold tabular-nums text-white">
          
          {value}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="avero-range mt-3" />
      
    </div>);

}

function Readout({
  label,
  value,
  accent




}: {label: string;value: string;accent?: boolean;}) {
  return (
    <div className="bg-navy-800/80 px-6 py-4">
      <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
        {label}
      </dt>
      <dd
        className={`mt-1.5 font-display text-[22px] font-semibold tabular-nums ${
        accent ? 'text-gold' : 'text-white/80'}`
        }>
        
        {value}
      </dd>
    </div>);

}