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
      className="bg-offwhite pt-8 pb-8 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14"
    >
      <div className="max-w-[46ch]">
        <Eyebrow>Process</Eyebrow>
        <h2
          id="process-heading"
          className="mt-3 sm:mt-4 font-display text-[28px] sm:text-[38px] lg:text-[42px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy"
        >
          Here&rsquo;s how we work.
        </h2>
      </div>

      <ol ref={ref} className="relative mt-6 sm:mt-8 lg:mt-10 pl-7 sm:pl-12">
        {/* Animated gold line centered on diamond center (1px width) */}
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 left-[12px] sm:left-[19px] top-0 w-px -translate-x-1/2 origin-top bg-gold"
          aria-hidden="true"
        />

        {processSteps.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="relative grid gap-1 sm:gap-2 border-b border-navy/10 py-3.5 sm:py-4.5 lg:py-5 last:border-0 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 lg:gap-10"
          >
            {/* Diamond node centered on vertical line */}
            <span
              className="absolute -left-[19.5px] sm:-left-[35px] top-[19px] sm:top-[22px] lg:top-[25px] h-[7px] w-[7px] sm:h-[8.5px] sm:w-[8.5px] rotate-45 bg-navy shadow-sm"
              aria-hidden="true"
            />

            <div className="flex items-baseline gap-2.5 sm:w-[200px] sm:flex-col sm:gap-1.5">
              <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-gold-deep">
                {step.index}
              </span>
              <h3 className="font-display text-[19px] sm:text-[23px] lg:text-[25px] font-semibold tracking-[-0.015em] text-navy">
                {step.title}
              </h3>
            </div>
            <p className="max-w-[52ch] self-center text-[13.5px] sm:text-[15px] lg:text-[16px] leading-[1.5] sm:leading-[1.65] text-charcoal/75 font-medium">
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
