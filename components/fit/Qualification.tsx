import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';

const fit = [
  'You’re already spending on Meta or Google',
  'You have a proven product or service',
  'You want profitable growth, not vanity metrics',
  'You’re willing to fix the funnel, not just increase budget',
  'You care about data and measurable outcomes'
];

const notFit = [
  'You want guaranteed results',
  'You only want cheap leads',
  'Your business has no proven offer',
  'You want someone to simply “run ads”'
];

export function Qualification() {
  return (
    <Section
      aria-labelledby="fit-heading"
      className="bg-white py-20 lg:py-28"
    >
      <Eyebrow>Fit</Eyebrow>
      <h2
        id="fit-heading"
        className="mt-6 max-w-[20ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
      >
        AVERO is probably a good fit if&hellip;
      </h2>

      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-navy/12 bg-navy/10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="bg-white p-6 sm:p-9">
          <p className="font-mono text-[10.5px] uppercase tracking-eyebrow text-gold-deep">
            Good fit
          </p>
          <ul className="mt-6 space-y-4">
            {fit.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-gold/60 bg-gold/10 text-gold-deep"
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className="text-[15.5px] leading-[1.6] text-charcoal/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-offwhite p-6 sm:p-9">
          <p className="font-mono text-[10.5px] uppercase tracking-eyebrow text-navy/45">
            Probably not a fit if&hellip;
          </p>
          <ul className="mt-6 space-y-4">
            {notFit.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-navy/20 text-navy/45"
                >
                  <XIcon className="h-3 w-3" />
                </span>
                <span className="text-[15px] leading-[1.6] text-charcoal/60">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
