'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OptionGroup } from './OptionGroup';
import { TOTAL_STEPS, useAuditForm } from './useAuditForm';

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
  /** Spend bucket carried in from the leak calculator, if any. */
  prefillSpend?: string;
  prefillObjective?: string;
}

const stepTitles = [
  'What are you trying to improve?',
  'What are you currently running?',
  'Approximate monthly ad spend?',
  'Where should we send the diagnosis?'
];

export function AuditModal({ open, onClose, prefillSpend, prefillObjective }: AuditModalProps) {
  const form = useAuditForm(onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  const { applyPrefill, resetForm } = form;

  useEffect(() => {
    if (open) {
      applyPrefill(prefillSpend, prefillObjective);
    } else {
      const timer = setTimeout(() => resetForm(), 300);
      return () => clearTimeout(timer);
    }
  }, [open, prefillSpend, prefillObjective, applyPrefill, resetForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const { step, lead, status, errors } = form;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            className="avero-focus avero-grid-lines relative w-full max-w-[540px] overflow-hidden rounded-t-[18px] border border-white/15 bg-navy-900 text-white shadow-2xl sm:rounded-[18px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-gold">
                  15-Minute Ad Audit
                </p>
                <p
                  id="audit-modal-title"
                  className="mt-1 font-display text-[17px] font-bold text-white"
                >
                  {status === 'success' ? 'Request received' : stepTitles[step]}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close audit request"
                className="avero-focus flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/20 text-white transition-colors duration-200 ease-premium hover:border-gold hover:bg-white/10"
              >
                <XIcon className="h-4 w-4 text-white" aria-hidden="true" />
              </button>
            </div>

            {status !== 'success' && (
              <div className="flex items-center gap-3 border-b border-white/10 px-6 py-3">
                <span className="font-mono text-[12px] font-semibold tabular-nums text-gold">
                  {String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
                </span>
                <span className="flex flex-1 gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/15"
                    >
                      <motion.span
                        className="block h-full bg-gold"
                        initial={false}
                        animate={{ width: i <= step ? '100%' : '0%' }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      />
                    </span>
                  ))}
                </span>
              </div>
            )}

            {status === 'success' ? (
              <SuccessPanel onDone={form.reset} email={lead.email} />
            ) : (
              <form onSubmit={form.submit} className="px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {step === 0 && (
                      <OptionGroup
                        name="objective"
                        legend="What are you trying to improve?"
                        options={['E-commerce', 'Lead Generation', 'Both']}
                        value={lead.objective}
                        onChange={(v) => form.update('objective', v)}
                      />
                    )}

                    {step === 1 && (
                      <OptionGroup
                        name="channels"
                        legend="What are you currently running?"
                        multiple
                        options={['Meta Ads', 'Google Ads', 'Both', 'Other']}
                        values={lead.channels}
                        onToggle={(v) => form.toggleChannel(v)}
                      />
                    )}

                    {step === 2 && (
                      <OptionGroup
                        name="spend"
                        legend="Approximate monthly ad spend?"
                        columns={2}
                        options={[
                          '₹0 - ₹50,000',
                          '₹50,000 - ₹1,00,000/-',
                          '₹1,00,000 - ₹2,00,000/-',
                          '₹2,00,000 - ₹5,00,000/-',
                          '₹5,00,000+'
                        ]}
                        value={lead.spend}
                        onChange={(v) => form.update('spend', v)}
                      />
                    )}

                    {step === 3 && (
                      <fieldset className="space-y-3.5">
                        <legend className="sr-only">Your details</legend>
                        <Field
                          id="lead-name"
                          label="Name"
                          value={lead.name}
                          error={errors.name}
                          onChange={(v) => form.update('name', v)}
                          autoComplete="name"
                        />

                        <Field
                          id="lead-email"
                          label="Work email"
                          type="email"
                          value={lead.email}
                          error={errors.email}
                          onChange={(v) => form.update('email', v)}
                          autoComplete="email"
                        />

                        <Field
                          id="lead-website"
                          label="Website"
                          value={lead.website}
                          error={errors.website}
                          onChange={(v) => form.update('website', v)}
                          placeholder="yourbrand.com"
                          autoComplete="url"
                        />

                        <Field
                          id="lead-phone"
                          label="Contact Number"
                          type="tel"
                          maxLength={10}
                          value={lead.phone}
                          error={errors.phone}
                          onChange={(v) =>
                            form.update('phone', v.replace(/\D/g, '').slice(0, 10))
                          }
                          placeholder="e.g. 9876543210"
                          autoComplete="tel"
                        />
                      </fieldset>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={form.back}
                    disabled={step === 0}
                    className="avero-focus inline-flex items-center gap-1.5 rounded-[10px] px-1 py-2 text-[13.5px] font-semibold text-white transition-colors duration-200 ease-premium hover:text-gold disabled:opacity-0"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    Back
                  </button>

                  {step < TOTAL_STEPS - 1 ? (
                    <Button
                      type="button"
                      onClick={form.next}
                      disabled={!form.canAdvance}
                    >
                      Continue
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Request My Audit'}
                    </Button>
                  )}
                </div>

                <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[11px] font-semibold uppercase leading-[1.7] tracking-eyebrow text-white/70">
                  No long sales presentation · Just the problems and priorities
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SuccessPanel({ onDone, email }: { onDone: () => void; email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      className="px-6 py-10 text-center"
      role="status"
    >
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold"
      >
        <CheckIcon className="h-5 w-5 text-gold" />
      </span>
      <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.02em] text-white">
        Your audit request is in.
      </h3>
      <p className="mx-auto mt-3 max-w-[38ch] text-[14.5px] leading-[1.7] text-white/75">
        We&rsquo;ll review the account details and reply to{' '}
        <span className="font-medium text-gold">{email}</span> with a time and
        what we&rsquo;ll need access to.
      </p>
      <div className="mt-7 flex justify-center">
        <Button variant="onDark" onClick={onDone}>
          Close
        </Button>
      </div>
    </motion.div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  placeholder,
  autoComplete,
  maxLength
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-white/80"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`avero-focus mt-1.5 h-10 w-full rounded-[10px] border bg-navy-800/80 px-3.5 text-[14px] text-white transition-colors duration-200 ease-premium placeholder:text-white/40 ${
          error ? 'border-red-500 bg-red-950/40' : 'border-white/20 hover:border-white/40 focus:border-gold'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
