'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { processSteps } from '@/data/process';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%']
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4
  });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="max-w-[46ch]">
        <Eyebrow>Process</Eyebrow>
        <h2
          id="process-heading"
          className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
        >
          No black box. Here&rsquo;s how we work.
        </h2>
      </div>

      <ol ref={ref} className="relative mt-14 pl-10 sm:pl-14">
        {/* Animated gold line centered on diamond center (1px width) */}
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 left-[16px] sm:left-[22px] top-0 w-px -translate-x-1/2 origin-top bg-gold"
          aria-hidden="true"
        />

        {processSteps.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="relative grid gap-2 border-b border-navy/10 py-7 last:border-0 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10"
          >
            {/* Diamond node centered on vertical line */}
            <span
              className="absolute -left-[28px] sm:-left-[38px] top-[34px] sm:top-[36px] h-[9px] w-[9px] rotate-45 bg-navy shadow-sm"
              aria-hidden="true"
            />

            <div className="flex items-baseline gap-4 sm:w-[220px] sm:flex-col sm:gap-2">
              <span className="font-mono text-[11px] font-bold text-gold-deep">
                {step.index}
              </span>
              <h3 className="font-display text-[24px] font-semibold tracking-[-0.015em] text-navy sm:text-[28px]">
                {step.title}
              </h3>
            </div>
            <p className="max-w-[52ch] self-center text-[15.5px] leading-[1.7] text-charcoal/75 font-medium">
              {step.copy}
            </p>
            <span className="sr-only">
              Step {i + 1} of {processSteps.length}
            </span>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
