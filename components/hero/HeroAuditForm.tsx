'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, CheckCircle2Icon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroAuditFormProps {
  id?: string;
  onSuccess?: () => void;
}

export function HeroAuditForm({ id = 'audit-form', onSuccess }: HeroAuditFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [adSpend, setAdSpend] = useState('50,000 - 1,00,000/-');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      setPhoneError('Contact number must be exactly 10 digits');
    } else {
      setPhoneError('');
    }
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setPhoneError('Contact number must be exactly 10 digits');
      return;
    }
    setSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
    
    const searchParams = new URLSearchParams({
      name: fullName,
      website: website,
      phone: phone,
    });
    router.push(`/thank-you?${searchParams.toString()}`);
  };

  return (
    <div
      id={id}
      className="avero-grid-lines relative overflow-hidden rounded-card border border-white/15 bg-navy-900 p-6 shadow-2xl sm:p-8 text-white"
    >
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Account Diagnostic
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white">4.9/5</span>
          </div>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white">
          Get My 15-Mins Audit
        </h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-white/70">
          Fill in your details to get a direct teardown of where your ad budget is leaking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="hero-fullname" className="block text-xs font-medium text-white/80 uppercase tracking-wider font-mono">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="hero-fullname"
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-navy-800/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="hero-phone" className="block text-xs font-medium text-white/80 uppercase tracking-wider font-mono">
            Contact Number <span className="text-gold">*</span>
          </label>
          <input
            id="hero-phone"
            type="tel"
            required
            maxLength={10}
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={handlePhoneChange}
            className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:bg-navy-800 focus:outline-none focus:ring-2 transition-colors ${phoneError
              ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-red-400/30'
              : 'border-white/20 bg-navy-800/80 focus:border-gold focus:ring-gold/30'
              }`}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-red-400">{phoneError}</p>
          )}
        </div>

        <div>
          <label htmlFor="hero-website" className="block text-xs font-medium text-white/80 uppercase tracking-wider font-mono">
            Website URL <span className="text-gold">*</span>
          </label>
          <input
            id="hero-website"
            type="text"
            required
            placeholder="e.g. www.yourbrand.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-navy-800/80 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="hero-spend" className="block text-xs font-medium text-white/80 uppercase tracking-wider font-mono">
            Monthly Ad Spend <span className="text-gold">*</span>
          </label>
          <select
            id="hero-spend"
            value={adSpend}
            onChange={(e) => setAdSpend(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-navy-800/80 px-3.5 py-2.5 text-sm text-white focus:border-gold focus:bg-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
          >
            <option value="0 - 50,000" className="bg-navy-900 text-white">₹0 - ₹50,000</option>
            <option value="50,000 - 1,00,000/-" className="bg-navy-900 text-white">₹50,000 - ₹1,00,000/-</option>
            <option value="1,00,000 - 2,00,000/-" className="bg-navy-900 text-white">₹1,00,000 - ₹2,00,000/-</option>
            <option value="2,00,000 - 5,00,000/-" className="bg-navy-900 text-white">₹2,00,000 - ₹5,00,000/-</option>
            <option value="5,00,000+" className="bg-navy-900 text-white">₹5,00,000+</option>
          </select>
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full justify-center">
            Submit Form
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* <p className="text-center font-mono text-[11px] font-semibold text-white/70 uppercase tracking-wider">
          🔒 Confidential · No sales pressure
        </p> */}
      </form>
    </div>
  );
}
