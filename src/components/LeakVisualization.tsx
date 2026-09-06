import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { funnelStages } from '../data/funnel';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

export function LeakVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <Section
      id="leak"
      aria-labelledby="leak-heading"
      className="bg-white py-20 lg:py-28">
      
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>The Problem</Eyebrow>
          <h2
            id="leak-heading"
            className="mt-6 max-w-[16ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]">
            
            Most businesses don&rsquo;t have an ad problem. They have a{' '}
            <span className="text-gold-deep">leak problem.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-charcoal/70">
            More budget doesn&rsquo;t fix inefficient campaigns, weak creative,
            poor landing pages, broken tracking, or low-quality leads.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-navy/10 bg-navy/10">
            <Stat label="Spend entering the system" value="₹1,00,000" />
            <Stat label="Revenue leaving it" value="₹27,890" accent />
          </dl>
        </div>

        <div ref={ref} className="relative">
          <ol className="relative">
            {funnelStages.map((stage, i) =>
            <li key={stage.id}>
                <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: i * 0.09,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="flex items-baseline justify-between gap-6 border-b border-navy/10 py-4">
                
                  <div className="min-w-0">
                    <p className="flex items-baseline gap-3">
                      <span className="font-mono text-[12px] font-semibold text-navy/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[20px] font-semibold tracking-[-0.01em] text-navy sm:text-[23px]">
                        {stage.label}
                      </span>
                    </p>
                    <p className="mt-1 pl-[30px] text-[13px] text-charcoal/60">
                      {stage.caption}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-[15px] tabular-nums text-navy sm:text-[17px]">
                    {stage.value}
                  </p>
                </motion.div>

                {stage.lossPercent > 0 &&
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: i * 0.09 + 0.12,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="flex items-center gap-4 py-3.5 pl-[30px]">
                
                    <span className="font-mono text-[12px] text-gold-deep">
                      ↓ {stage.lossPercent}% lost
                    </span>
                    <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-navy/[0.07]">
                      <motion.span
                    className="block h-full bg-gold"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stage.lossPercent}%` } : {}}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.09 + 0.18,
                      ease: [0.23, 1, 0.32, 1]
                    }} />
                  
                    </span>
                    <span className="hidden max-w-[38%] shrink-0 text-right text-[12px] text-charcoal/55 sm:block">
                      {stage.lossLabel}
                    </span>
                  </motion.div>
              }
              </li>
            )}
          </ol>

          <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-navy/70">
            Illustrative funnel · loss rates vary by account
          </p>
        </div>
      </div>
    </Section>);

}

function Stat({
  label,
  value,
  accent




}: {label: string;value: string;accent?: boolean;}) {
  return (
    <div className="bg-white p-5">
      <dt className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-navy/75">
        {label}
      </dt>
      <dd
        className={`mt-2 font-display text-[26px] font-semibold tabular-nums ${
        accent ? 'text-gold-deep' : 'text-navy'}`
        }>
        
        {value}
      </dd>
    </div>);

}