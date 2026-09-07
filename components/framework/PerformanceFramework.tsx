'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';

const stages = [
  {
    index: '01',
    title: 'Find',
    copy: 'Identify wasted spend, weak campaigns, creative fatigue, targeting issues, tracking gaps, funnel problems, and conversion bottlenecks.'
  },
  {
    index: '02',
    title: 'Fix',
    copy: 'Prioritize the highest-impact changes and rebuild what is inefficient.'
  },
  {
    index: '03',
    title: 'Scale',
    copy: 'Increase spend only after the underlying system is working.'
  }
];

export function PerformanceFramework() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <Section
      aria-labelledby="framework-heading"
      className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28"
    >
      <div
        className="avero-grid-lines pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative">
        <Eyebrow tone="dark">The framework</Eyebrow>
        <h2
          id="framework-heading"
          className="mt-6 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[44px]"
        >
          Find the leak. Fix the problem.{' '}
          <span className="text-gold">Scale what works.</span>
        </h2>

        <div ref={ref} className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/12 lg:block"
            aria-hidden="true"
          />

          <motion.div
            className="absolute left-0 top-[7px] hidden h-px bg-gold lg:block"
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
            aria-hidden="true"
          />

          <ol className="flex flex-nowrap overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 gap-6 md:gap-10 lg:gap-12 snap-x snap-mandatory hide-scrollbar">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.14,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="relative lg:pr-8 w-[85vw] md:w-auto shrink-0 snap-center"
              >
                <span
                  className="absolute left-0 top-[3px] hidden h-[9px] w-[9px] rotate-45 bg-gold lg:block"
                  aria-hidden="true"
                />

                <div className="lg:pt-10 pt-6">
                  <p className="font-mono text-[13px] md:text-[14px] uppercase tracking-eyebrow text-gold font-semibold">
                    {stage.index} — {stage.title}
                  </p>
                  <p className="mt-4 max-w-[38ch] text-[16px] md:text-[18px] leading-[1.6] text-white/85">
                    {stage.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
