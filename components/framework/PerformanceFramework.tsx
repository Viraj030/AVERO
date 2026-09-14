'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
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
  const scrollRef = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % stages.length;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + stages.length) % stages.length;
    scrollToCard(prevIdx);
  };

  const handleDotClick = (idx: number) => {
    scrollToCard(idx);
  };

  return (
    <Section
      aria-labelledby="framework-heading"
      className="relative overflow-hidden bg-navy-900 pt-8 pb-16 text-white lg:py-22"
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

          {/* Cards container: Carousel on mobile with 20% next card preview. Manual swipe */}
          <ol
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4 md:pb-0 md:grid md:grid-cols-3 gap-5 md:gap-10 lg:gap-12 snap-x snap-mandatory"
          >
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
                className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-0 md:bg-transparent md:border-none lg:pr-8 w-[78vw] sm:w-[65vw] md:w-auto shrink-0 snap-start transition-all duration-300"
              >
                <span
                  className="absolute left-0 top-[3px] hidden h-[9px] w-[9px] rotate-45 bg-gold lg:block"
                  aria-hidden="true"
                />

                <div className="lg:pt-10 pt-2">
                  <p className="font-mono text-[13px] md:text-[14px] uppercase tracking-eyebrow text-gold font-semibold">
                    {stage.index} — {stage.title}
                  </p>
                  <p className="mt-4 max-w-[38ch] text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] text-white/85">
                    {stage.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Mobile Carousel Navigation Controls (Arrows & Indicators) */}
          <div className="mt-6 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              {stages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-7 bg-gold' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous step"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white active:scale-95 transition-transform"
              >
                <ChevronLeftIcon className="h-4 w-4 text-gold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next step"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white active:scale-95 transition-transform"
              >
                <ChevronRightIcon className="h-4 w-4 text-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
