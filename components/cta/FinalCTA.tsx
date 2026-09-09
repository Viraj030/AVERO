'use client';

import React from 'react';
import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { useAuditModal } from '@/components/audit/AuditModalContext';

interface FinalCTAProps {
  onOpenAudit?: () => void;
  variant?: 'leak' | 'budget';
}

const auditHighlights = [
  'Direct Funnel & Tracking Teardown',
  'Prioritized Leaks & Fix Roadmap',
  '100% Free · Zero Sales Pressure'
];

export function FinalCTA({ onOpenAudit, variant = 'leak' }: FinalCTAProps) {
  const modal = useAuditModal();
  const handleOpenAudit = onOpenAudit || modal.openAudit;

  return (
    <Section
      id="next-step"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-navy-900 py-24 text-white lg:py-32"
    >
      <div
        className="avero-grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[760px] text-center">
        <Eyebrow tone="dark" className="justify-center">
          Next step
        </Eyebrow>

        <h2
          id="final-cta-heading"
          className="mt-7 font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[52px]"
        >
          {variant === 'leak' ? (
            <>
              Before you spend another rupee, find what&rsquo;s{' '}
              <span className="text-gold">leaking.</span>
            </>
          ) : (
            <>
              Your next ₹1 of ad spend should have a{' '}
              <span className="text-gold">clear job.</span>
            </>
          )}
        </h2>

        <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-white/70">
          Give us 15 minutes. We&rsquo;ll analyze your paid traffic, identify the exact leaks draining your ad budget, and hand you a clear, prioritized fix plan.
        </p>

        {/* Highlight Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {auditHighlights.map((highlight) => (
            <div
              key={highlight}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-sm"
            >
              <CheckCircle2Icon className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={handleOpenAudit} aria-haspopup="dialog" className="w-full sm:w-auto px-8">
            Get My 15-Mins Audit
            <ArrowRightIcon
              className="ml-1.5 h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>

          <a
            href="https://wa.me/918692918021"
            target="_blank"
            rel="noopener noreferrer"
            className="avero-focus inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] border border-white/20 bg-white/10 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:text-white"
          >
            <svg
              className="h-4 w-4 text-emerald-400 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-eyebrow text-white/40">
          Find the leak · Fix the problem · Scale what works
        </p>
      </div>
    </Section>
  );
}



