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
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [canAdvance]);

  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

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
      if (!validateFinal()) return;
      setStatus('submitting');

      try {
        const response = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
        const queryParams = new URLSearchParams({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          website: lead.website
        }).toString();

        if (response.ok) {
          onClose();
          router.push(`/thank-you?${queryParams}`);
        } else {
          // Fallback to local success if API route responds with error
          onClose();
          router.push(`/thank-you?${queryParams}`);
        }
      } catch (err) {
        const queryParams = new URLSearchParams({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          website: lead.website
        }).toString();
        onClose();
        router.push(`/thank-you?${queryParams}`);
      }
    },
    [validateFinal, lead, router, onClose]
  );

  const resetForm = useCallback(() => {
    setStep(0);
    setLead(emptyLead);
    setStatus('idle');
    setErrors({});
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
