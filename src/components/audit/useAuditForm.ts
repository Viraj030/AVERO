import { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { AuditLead } from '../../types/avero';

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

  const update = useCallback(<K extends keyof AuditLead,>(key: K, value: AuditLead[K]) => {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }, []);

  const applyPrefill = useCallback((spendValue?: string) => {
    if (!spendValue) return;
    setLead((prev) => prev.spend ? prev : { ...prev, spend: spendValue });
  }, []);

  const toggleChannel = useCallback((value: string) => {
    setLead((prev) => ({
      ...prev,
      channels: prev.channels.includes(value) ?
      prev.channels.filter((c) => c !== value) :
      [...prev.channels, value]
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
    const next: Record<string, string> = {};
    if (!lead.name.trim()) next.name = 'Enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
      next.email = 'Enter a valid work email';
    if (!lead.website.trim()) next.website = 'Enter your website';
    const cleanPhone = lead.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      next.phone = 'Contact number must be exactly 10 digits';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [lead]);

  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!validateFinal()) return;
      setStatus('submitting');
      window.setTimeout(() => setStatus('success'), 900);
    },
    [validateFinal]
  );

  const reset = useCallback(() => {
    setStep(0);
    setLead(emptyLead);
    setStatus('idle');
    setErrors({});
    onClose();
  }, [onClose]);

  const selectAndNext = useCallback(<K extends keyof AuditLead,>(key: K, value: AuditLead[K]) => {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
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
    reset
  };
}