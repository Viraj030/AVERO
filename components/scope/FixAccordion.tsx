'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { fixCategories } from '@/data/fixCategories';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useAuditModal } from '@/components/audit/AuditModalContext';

export function FixAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  const modal = useAuditModal();

  return (
    <Section
      id="what-we-fix"
      aria-labelledby="fix-heading"
      className="bg-white pt-8 pb-16 lg:py-22"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Scope</Eyebrow>
          <h2
            id="fix-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
          >
            What we actually fix.
          </h2>
          <p className="mt-5 max-w-[36ch] text-[15.5px] leading-[1.7] text-charcoal/65">
            We find the leaks across your ads, creative, conversion and tracking — then focus on the fixes that can move your numbers.
          </p>
        </div>

        <div className="border-t border-navy/12">
          {fixCategories.map((cat, i) => {
            const isOpen = open === cat.id;
            return (
              <div key={cat.id} className="border-b border-navy/12">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`fix-panel-${cat.id}`}
                    className="avero-focus group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="font-mono text-[12px] font-semibold text-navy/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[22px] font-semibold tracking-[-0.015em] text-navy transition-colors duration-200 ease-premium group-hover:text-gold-deep sm:text-[26px]">
                        {cat.label}
                      </span>
                      <span className="mt-1 block text-[13.5px] text-charcoal/60">
                        {cat.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-transform duration-300 ease-premium ${isOpen ? 'rotate-45 border-gold bg-gold/10 text-gold-deep' : ''
                        }`}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`fix-panel-${cat.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                        <ul className="flex flex-wrap gap-x-4 gap-y-2.5 self-start sm:flex-col sm:gap-2">
                          {cat.items.map((item) => (
                            <li
                              key={item}
                              className="text-[13.5px] text-charcoal/70"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="rounded-card border border-navy/10 bg-offwhite p-5">
                          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-navy/75">
                            What we look for
                          </p>
                          <ul className="mt-4 space-y-3">
                            {cat.looksFor.map((problem) => (
                              <li
                                key={problem}
                                className="flex gap-3 text-[13.5px] leading-[1.6] text-charcoal/75"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[7px] inline-block h-[5px] w-[5px] shrink-0 rotate-45 bg-gold"
                                />
                                {problem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-only CTA after scope section */}
      <div className="mt-10 sm:hidden">
        <Button size="lg" onClick={modal.openAudit} aria-haspopup="dialog" className="w-full">
          Get My 15-Mins Audit
          <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
      </div>
    </Section>
  );
}
