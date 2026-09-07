'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckIcon,
  RotateCwIcon,
  TriangleAlertIcon
} from 'lucide-react';
import { auditChecks } from '@/data/auditChecks';
import { HealthGauge } from '@/components/ui/HealthGauge';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { useAuditModal } from '@/components/audit/AuditModalContext';

interface AuditDiagnosticProps {
  onOpenAudit?: () => void;
}

const statusStyles = {
  clear: { dot: 'bg-white/40', text: 'text-white/50', label: 'Clear' },
  watch: { dot: 'bg-white/70', text: 'text-white/75', label: 'Watch' },
  leak: { dot: 'bg-gold', text: 'text-gold', label: 'Leak' }
} as const;

export function AuditDiagnostic({ onOpenAudit }: AuditDiagnosticProps) {
  const modal = useAuditModal();
  const handleOpenAudit = onOpenAudit || modal.openAudit;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [scanned, setScanned] = useState(0);
  const [runId, setRunId] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setScanned(auditChecks.length);
      return;
    }
    setScanned(0);
    const id = window.setInterval(() => {
      setScanned((prev) => {
        if (prev >= auditChecks.length) {
          window.clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, 330);
    return () => window.clearInterval(id);
  }, [inView, runId]);

  const rerun = useCallback(() => {
    setSelected(null);
    setRunId((v) => v + 1);
  }, []);

  const complete = scanned >= auditChecks.length;
  const leaksFound = auditChecks
    .slice(0, scanned)
    .filter((c) => c.status === 'leak').length;

  const statusWeight = { clear: 100, watch: 58, leak: 18 } as const;
  const healthScore = Math.round(
    auditChecks.reduce((sum, c) => sum + statusWeight[c.status], 0) /
      auditChecks.length
  );
  const activeCheck =
    auditChecks.find((c) => c.id === selected) ??
    auditChecks.slice(0, scanned).filter((c) => c.status === 'leak').slice(-1)[0];

  return (
    <Section
      id="audit"
      aria-labelledby="audit-heading"
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>The 15-Minute Audit</Eyebrow>
          <h2
            id="audit-heading"
            className="mt-6 max-w-[17ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
          >
            Give me 15 minutes. I&rsquo;ll show you where your ads are{' '}
            <span className="text-gold-deep">losing money.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.7] text-charcoal/70">
            We&rsquo;ll look beyond surface-level metrics and identify the
            biggest opportunities across your campaigns, creative, funnel,
            tracking, and conversion flow.
          </p>

          <div className="mt-9">
            <Button size="lg" onClick={handleOpenAudit} aria-haspopup="dialog">
              Get My 15-Mins Audit
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <p className="mt-4 max-w-[42ch] text-[13px] leading-[1.6] text-charcoal/60">
              No long sales presentation. Just the problems, priorities, and
              what we&rsquo;d fix first.
            </p>
          </div>
        </div>

        <div
          ref={ref}
          className="relative overflow-hidden rounded-card border border-white/10 bg-navy-900 text-white shadow-[0_40px_90px_-55px_rgba(12,40,70,0.95)]"
        >
          <div className="avero-grid-lines absolute inset-0" aria-hidden="true" />

          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/55">
              Diagnostic sweep
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tabular-nums text-white/40">
                {String(Math.min(scanned, auditChecks.length)).padStart(2, '0')} /{' '}
                {auditChecks.length}
              </span>
              <button
                type="button"
                onClick={rerun}
                className="avero-focus inline-flex h-7 items-center gap-1.5 rounded-[8px] border border-white/15 px-2.5 font-mono text-[10px] uppercase tracking-eyebrow text-white/60 transition-colors duration-200 ease-premium hover:border-gold/60 hover:text-gold"
              >
                <RotateCwIcon className="h-3 w-3" aria-hidden="true" />
                Rerun
              </button>
            </div>
          </div>

          <div className="relative h-[2px] w-full bg-white/10">
            <motion.div
              className="h-full bg-gold"
              animate={{ width: `${(scanned / auditChecks.length) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>

          <ul className="relative divide-y divide-white/[0.07]">
            {auditChecks.map((check, i) => {
              const done = i < scanned;
              const style = statusStyles[check.status];
              const isSelected = selected === check.id;
              return (
                <li key={check.id}>
                  <button
                    type="button"
                    disabled={!done}
                    onClick={() =>
                      setSelected((prev) => (prev === check.id ? null : check.id))
                    }
                    aria-pressed={isSelected}
                    className={`avero-focus flex w-full items-center gap-3.5 px-5 py-3 text-left transition-colors duration-200 ease-premium ${
                      done ? 'hover:bg-white/[0.05]' : 'cursor-default'
                    } ${isSelected ? 'bg-white/[0.06]' : ''}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-300 ease-premium ${
                        done
                          ? check.status === 'leak'
                            ? 'border-gold/60 bg-gold/15 text-gold'
                            : 'border-white/25 text-white/70'
                          : 'border-white/10 text-transparent'
                      }`}
                    >
                      {done &&
                        (check.status === 'leak' ? (
                          <TriangleAlertIcon className="h-3 w-3" />
                        ) : (
                          <CheckIcon className="h-3 w-3" />
                        ))}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[13.5px] transition-colors duration-300 ease-premium ${
                          done ? 'text-white/90' : 'text-white/25'
                        }`}
                      >
                        {check.label}
                      </span>
                      <span
                        className={`mt-0.5 block truncate text-[11.5px] transition-colors duration-300 ease-premium ${
                          done ? 'text-white/40' : 'text-white/15'
                        }`}
                      >
                        {check.detail}
                      </span>
                    </span>

                    <span
                      className={`flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow ${
                        done ? style.text : 'text-white/15'
                      }`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          done ? style.dot : 'bg-white/10'
                        }`}
                        aria-hidden="true"
                      />
                      {done ? style.label : 'Queued'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative border-t border-white/10 px-5 py-5">
            <HealthGauge score={healthScore} active={complete} />
          </div>

          <div
            className="relative border-t border-white/10 px-5 py-5"
            aria-live="polite"
          >
            {complete || leaksFound > 0 ? (
              <motion.div
                key={activeCheck?.id ?? 'summary'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-gold">
                  <TriangleAlertIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Potential leak detected — {leaksFound} of {auditChecks.length}{' '}
                  systems
                </p>
                {activeCheck && (
                  <p className="mt-3 text-[14px] leading-[1.6] text-white/80">
                    {activeCheck.finding}
                  </p>
                )}
                <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-white/30">
                  Select any line to inspect the finding
                </p>
              </motion.div>
            ) : (
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">
                Scanning account systems…
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
