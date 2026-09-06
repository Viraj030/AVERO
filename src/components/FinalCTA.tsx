import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

interface FinalCTAProps {
  onOpenAudit: () => void;
  variant?: 'leak' | 'budget';
}

export function FinalCTA({ onOpenAudit, variant = 'leak' }: FinalCTAProps) {
  return (
    <Section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      
      <div
        className="avero-grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
        aria-hidden="true" />
      
      <div className="relative mx-auto max-w-[760px] text-center">
        <Eyebrow tone="dark" className="justify-center">
          Next step
        </Eyebrow>
        <h2
          id="final-cta-heading"
          className="mt-7 font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[52px]">
          
          {variant === 'leak' ?
          <>
              Before you spend more, find what&rsquo;s{' '}
              <span className="text-gold">leaking.</span>
            </> :

          <>
              Your next ₹1 of ad spend should have a{' '}
              <span className="text-gold">job.</span>
            </>
          }
        </h2>
        <p className="mx-auto mt-6 max-w-[46ch] text-[17px] leading-[1.65] text-white/70">
          Give me 15 minutes. I&rsquo;ll show you what I&rsquo;d investigate
          first.
        </p>

        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={onOpenAudit} aria-haspopup="dialog">
            Get My 15-Minute Ad Audit
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
              aria-hidden="true" />
            
          </Button>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-eyebrow text-white/40">
          No fluff · No generic recommendations · Just a performance diagnosis
        </p>
      </div>
    </Section>);

}