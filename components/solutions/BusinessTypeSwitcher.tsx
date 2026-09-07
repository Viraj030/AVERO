'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { businessOrder, businessPanels } from '@/data/businessTypes';
import type { BusinessType } from '@/types/avero';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { useAuditModal } from '@/components/audit/AuditModalContext';

interface BusinessTypeSwitcherProps {
  onOpenAudit?: () => void;
}

export function BusinessTypeSwitcher({ onOpenAudit }: BusinessTypeSwitcherProps) {
  const modal = useAuditModal();
  const handleOpenAudit = () => {
    if (onOpenAudit) {
      onOpenAudit();
    } else if (modal.openAuditWithObjective) {
      modal.openAuditWithObjective(businessPanels[active].label);
    } else {
      modal.openAudit();
    }
  };

  const [active, setActive] = useState<BusinessType>('ecommerce');
  const panel = businessPanels[active];

  return (
    <Section
      aria-labelledby="business-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="flex flex-col gap-8 border-b border-navy/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Who we work with</Eyebrow>
          <h2
            id="business-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
          >
            Different businesses. Same objective.
          </h2>
          <p className="mt-4 text-[17px] text-charcoal/70">
            Turn ad spend into profitable customers.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Business type"
          className="inline-flex mx-auto lg:mx-0 shrink-0 rounded-[12px] border border-navy/15 p-1"
        >
          {businessOrder.map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                role="tab"
                id={`tab-${id}`}
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                onClick={() => setActive(id)}
                className={`avero-focus relative rounded-[9px] px-3 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium transition-colors duration-200 ease-premium ${isActive ? 'text-white' : 'text-charcoal/65 hover:text-navy'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="business-pill"
                    className="absolute inset-0 rounded-[9px] bg-navy"
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
                <span className="relative">{businessPanels[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
        >
          <div>
            <h3 className="max-w-[16ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[30px]">
              {panel.headline}
            </h3>
            <p className="mt-5 max-w-[44ch] text-[15.5px] leading-[1.7] text-charcoal/70">
              {panel.copy}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {panel.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-navy/12 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-navy/60"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button variant="secondary" size="lg" onClick={handleOpenAudit}>
                {panel.cta}
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-navy/12 bg-offwhite">
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3.5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-navy/80">
                {panel.label} performance view
              </p>
              <p className="font-mono text-[11px] font-semibold text-navy/70">Trailing 30d</p>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-navy/10 sm:grid-cols-4">
              {panel.metrics.map((metric) => (
                <div key={metric.label} className="bg-offwhite px-4 py-5">
                  <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-navy/75">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-display text-[22px] font-semibold tabular-nums text-navy">
                    {metric.value}
                  </dd>
                  <p className="mt-1 text-[11.5px] text-charcoal/75">
                    {metric.caption}
                  </p>
                </div>
              ))}
            </dl>

            <div className="border-t border-navy/10 px-5 py-6">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-navy/75">
                Budget allocation
              </p>
              <ul className="mt-4 space-y-3.5">
                {panel.bars.map((bar, i) => (
                  <li key={bar.label} className="flex items-center gap-4">
                    <span className="w-[38%] shrink-0 text-[13px] text-charcoal/75 sm:w-[30%]">
                      {bar.label}
                    </span>
                    <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-navy/[0.08]">
                      <motion.span
                        className={`block h-full rounded-full ${i === 0 ? 'bg-navy' : 'bg-navy/35'
                          }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.value}%` }}
                        transition={{
                          duration: 0.6,
                          delay: 0.1 + i * 0.08,
                          ease: [0.23, 1, 0.32, 1]
                        }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right font-mono text-[12px] tabular-nums text-navy/70">
                      {bar.value}%
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-navy/70">
                Illustrative figures · replace with account data
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
