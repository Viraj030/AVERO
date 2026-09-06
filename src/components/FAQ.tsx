import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { faqItems } from '../data/faq';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" aria-labelledby="faq-heading" className="bg-offwhite py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[40px]">
            
            Questions worth asking.
          </h2>
        </div>

        <dl className="border-t border-navy/12">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-navy/12">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="avero-focus group flex w-full items-start gap-5 py-5 text-left">
                    
                    <span className="flex-1 font-display text-[17.5px] font-semibold leading-[1.4] text-navy transition-colors duration-200 ease-premium group-hover:text-gold-deep sm:text-[19px]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-navy/50">
                      
                      {isOpen ?
                      <MinusIcon className="h-4 w-4" /> :

                      <PlusIcon className="h-4 w-4" />
                      }
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen &&
                  <motion.dd
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden">
                    
                      <p className="max-w-[62ch] pb-6 pr-10 text-[15px] leading-[1.75] text-charcoal/70">
                        {item.a}
                      </p>
                    </motion.dd>
                  }
                </AnimatePresence>
              </div>);

          })}
        </dl>
      </div>
    </Section>);

}