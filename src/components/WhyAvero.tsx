import React from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

const principles = [
{
  index: '01',
  title: 'We look beyond Ads Manager.',
  copy: 'Your ad account is only one part of the system.'
},
{
  index: '02',
  title: 'We optimize for business outcomes.',
  copy: 'Clicks, CTR and cheap leads mean nothing if they don\u2019t turn into revenue.'
},
{
  index: '03',
  title: 'We scale after proof.',
  copy: 'More budget comes after efficiency — not before.'
}];


export function WhyAvero() {
  return (
    <Section
      aria-labelledby="why-heading"
      className="bg-offwhite py-20 lg:py-28">
      
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <Eyebrow>Why AVERO</Eyebrow>
          <h2
            id="why-heading"
            className="mt-6 max-w-[13ch] font-display text-[32px] font-semibold leading-[1.06] tracking-[-0.025em] text-navy sm:text-[44px]">
            
            Because spending more isn&rsquo;t a strategy.
          </h2>

          <div className="mt-12 border-t border-navy/12 pt-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-[24px] font-semibold tracking-[-0.02em] text-navy sm:text-[28px]">
              
              More spend <span className="text-gold-deep">&ne;</span> more profit
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{
                duration: 0.45,
                delay: 0.18,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="mt-3 font-mono text-[12.5px] uppercase tracking-eyebrow text-navy/55">
              
              Better system → better economics → scalable growth
            </motion.p>
          </div>
        </div>

        <ol className="divide-y divide-navy/12 border-y border-navy/12">
          {principles.map((p, i) =>
          <motion.li
            key={p.index}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="grid gap-3 py-9 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-8">
            
              <span className="font-mono text-[11px] text-gold-deep">
                {p.index}
              </span>
              <div>
                <h3 className="max-w-[24ch] font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[30px]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[15.5px] leading-[1.7] text-charcoal/65">
                  {p.copy}
                </p>
              </div>
            </motion.li>
          )}
        </ol>
      </div>
    </Section>);

}