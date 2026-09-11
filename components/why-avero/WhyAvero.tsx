'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const cards = [
  {
    index: '01',
    image: '/images/img1.png',
    alt: 'Ads Manager connected to Website, Analytics, CRM, and Revenue',
    title: 'We look beyond Ads Manager.',
    description: 'Your ad account is only one part of the system.'
  },
  {
    index: '02',
    image: '/images/img2.png',
    alt: 'Clicks, CTR, and Leads funneling into Rupee revenue outcome',
    title: 'We optimize for business outcomes.',
    description: 'Clicks, CTR and cheap leads mean nothing if they don’t turn into revenue.'
  },
  {
    index: '03',
    image: '/images/img3.png',
    alt: 'Performance growth chart showing Proof first inflection point',
    title: 'We scale after proof.',
    description: 'More budget comes after efficiency — not before.'
  }
];

export function WhyAvero() {
  return (
    <Section
      id="why-avero"
      aria-labelledby="why-heading"
      className="relative bg-[#FAF9F5] py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-shell">
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-navy/75">
            <span className="inline-block h-2 w-2 rotate-45 bg-gold" aria-hidden="true" />
            <span>Why AVERO</span>
          </div>

          {/* Heading */}
          <h2
            id="why-heading"
            className="mt-4 font-display text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[46px] lg:text-[54px]"
          >
            Because spending more isn’t a strategy.
          </h2>

          {/* Golden Badge Pill */}
          <div className="mt-5 inline-flex items-center justify-center rounded-full bg-[#FDF5E6] px-5 py-1.5 shadow-sm border border-gold/20">
            <span className="font-display text-[16px] sm:text-[18px] font-bold text-navy">
              More spend &ne; more profit
            </span>
          </div>

          {/* Subtitle */}
          <p className="mt-3 text-[15px] sm:text-[16.5px] font-normal text-charcoal/75">
            Better system &rarr; better economics &rarr; scalable growth
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 items-stretch">
          {cards.map((card, i) => (
            <motion.div
              key={card.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col justify-between rounded-[24px] border border-navy/10 bg-white p-6 sm:p-7 shadow-[0_4px_25px_rgba(18,59,109,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl"
            >
              {/* Card Top: Number badge */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-mono text-[12.5px] font-bold text-navy">
                    {card.index}
                  </span>
                </div>

                {/* Card Image Illustration - Fixed Height for Uniform Alignment */}
                <div className="relative my-3 flex h-[175px] sm:h-[195px] w-full items-center justify-center">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={500}
                    height={333}
                    priority
                    loading="eager"
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card Bottom: Gold Bar, Title & Description */}
              <div className="flex flex-col pt-3">
                <div className="mb-3 h-[3.5px] w-8 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <h3 className="font-display text-[19px] sm:text-[21px] font-bold leading-[1.25] tracking-[-0.015em] text-navy">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14px] sm:text-[14.5px] leading-[1.55] text-charcoal/75">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
