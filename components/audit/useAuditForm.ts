'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { AuditLead } from '@/types/avero';

export type SubmitState = 'idle' | 'submitting' | 'success';

const emptyLead: AuditLead = {
  objective: '',
  channels: [],
  spend: '',
  name: '',
  email: '',
  website: '',
  phone: ''
};

export const TOTAL_STEPS = 4;

export function useAuditForm(onClose: () => void) {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<AuditLead>(emptyLead);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const update = useCallback(<K extends keyof AuditLead>(key: K, value: AuditLead[K]) => {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }, []);

  const applyPrefill = useCallback((spendValue?: string, objectiveValue?: string) => {
    setLead((prev) => {
      let next = prev;
      if (spendValue && !prev.spend) next = { ...next, spend: spendValue };
      if (objectiveValue && !prev.objective) next = { ...next, objective: objectiveValue };
      return next;
    });
    setErrors({});
    setHasAttemptedSubmit(false);
    if (objectiveValue) {
      setStep(1);
    } else {
      setStep(0);
    }
  }, []);

  const toggleChannel = useCallback((value: string) => {
    setLead((prev) => ({
      ...prev,
      channels: prev.channels.includes(value)
        ? prev.channels.filter((c) => c !== value)
        : [...prev.channels, value]
    }));
  }, []);

  const canAdvance = useMemo(() => {
    if (step === 0) return lead.objective !== '';
    if (step === 1) return lead.channels.length > 0;
    if (step === 2) return lead.spend !== '';
    return true;
  }, [step, lead]);

  const next = useCallback(() => {
    if (!canAdvance) return;
    setErrors({});
    setHasAttemptedSubmit(false);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [canAdvance]);

  const back = useCallback(() => {
    setErrors({});
    setHasAttemptedSubmit(false);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const validateFinal = useCallback(() => {
    const nextErrors: Record<string, string> = {};
    if (!lead.name.trim()) nextErrors.name = 'Enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
      nextErrors.email = 'Enter a valid work email';
    if (!lead.website.trim()) nextErrors.website = 'Enter your website';
    const cleanPhone = lead.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      nextErrors.phone = 'Contact number must be exactly 10 digits';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [lead]);

  const router = useRouter();

  const submit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (step < TOTAL_STEPS - 1) {
        if (canAdvance) {
          setErrors({});
          setHasAttemptedSubmit(false);
          setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
        }
        return;
      }

      setHasAttemptedSubmit(true);
      const isValid = validateFinal();
      if (!isValid) return;
      setStatus('submitting');

      const GOOGLE_SCRIPT_URL =
        process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbzPYxeL-eiA9S5Jpv0Q4Y40wkFbEA9mBBwk5NZI0UmIHO3hb-xxxVvv2J1eVHAvX0owzg/exec';

      const payload = {
        formType: 'Popup Form',
        ...lead,
        channels: Array.isArray(lead.channels) ? lead.channels.join(', ') : lead.channels || 'N/A'
      };

      // Fire API request in background and immediately navigate to thank-you
      fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('Backend API route error, logging directly to Google Sheets...', err);
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            ...payload
          })
        }).catch((e) => console.error('Fallback sheet error:', e));
      });

      onClose();
      router.push('/thank-you');
    },
    [step, canAdvance, validateFinal, lead, router, onClose]
  );

  const resetForm = useCallback(() => {
    setStep(0);
    setLead(emptyLead);
    setStatus('idle');
    setErrors({});
    setHasAttemptedSubmit(false);
  }, []);

  const reset = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const selectAndNext = useCallback(<K extends keyof AuditLead>(key: K, value: AuditLead[K]) => {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const nextObj = { ...prev };
      delete nextObj[key as string];
      return nextObj;
    });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const toggleChannelAndNext = useCallback((value: string) => {
    setLead((prev) => ({
      ...prev,
      channels: prev.channels.includes(value)
        ? prev.channels.filter((c) => c !== value)
        : [...prev.channels, value]
    }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  return {
    step,
    lead,
    status,
    errors,
    canAdvance,
    update,
    selectAndNext,
    applyPrefill,
    toggleChannel,
    toggleChannelAndNext,
    next,
    back,
    submit,
    reset,
    resetForm
  };
}
