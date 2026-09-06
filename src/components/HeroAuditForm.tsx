import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircle2Icon, StarIcon } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroAuditFormProps {
  id?: string;
  onSuccess?: () => void;
}

export function HeroAuditForm({ id = 'free-audit-form', onSuccess }: HeroAuditFormProps) {
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
  };

  if (submitted) {
    return (
      <div
        id={id}
        className="relative overflow-hidden rounded-card border border-navy/15 bg-white p-8 shadow-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
            <CheckCircle2Icon className="h-10 w-10 text-gold-deep" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-navy">
            Audit Request Received!
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
            Thank you <span className="font-semibold text-navy">{fullName}</span>. We&rsquo;ll review your ad setup for <span className="font-semibold text-navy">{website || 'your website'}</span> and reach out to <span className="font-semibold text-navy">{phone}</span> within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 text-xs font-mono text-navy/50 underline hover:text-navy">
            Submit another audit request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="relative overflow-hidden rounded-card border border-navy/15 bg-white p-6 shadow-xl sm:p-8">
      
      <div className="border-b border-navy/10 pb-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gold-deep">
            <span className="h-2 w-2 rounded-full bg-gold-deep animate-pulse" />
            Free Account Diagnostic
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-3 w-3 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span>4.9/5</span>
          </div>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-navy">
          Get Your 15-Minute Free Ad Audit
        </h3>
        <p className="mt-1 text-xs text-charcoal/65">
          Fill in your details to get a direct teardown of where your ad budget is leaking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="hero-fullname" className="block text-xs font-medium text-navy/80 uppercase tracking-wider font-mono">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="hero-fullname"
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/20 bg-offwhite px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="hero-phone" className="block text-xs font-medium text-navy/80 uppercase tracking-wider font-mono">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            id="hero-phone"
            type="tel"
            required
            maxLength={10}
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={handlePhoneChange}
            className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
              phoneError
                ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-200'
                : 'border-navy/20 bg-offwhite focus:border-gold focus:ring-gold/30'
            }`}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-red-500">{phoneError}</p>
          )}
        </div>

        <div>
          <label htmlFor="hero-website" className="block text-xs font-medium text-navy/80 uppercase tracking-wider font-mono">
            Website URL <span className="text-red-500">*</span>
          </label>
          <input
            id="hero-website"
            type="text"
            required
            placeholder="e.g. www.yourbrand.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/20 bg-offwhite px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="hero-spend" className="block text-xs font-medium text-navy/80 uppercase tracking-wider font-mono">
            Monthly Ad Spend <span className="text-red-500">*</span>
          </label>
          <select
            id="hero-spend"
            value={adSpend}
            onChange={(e) => setAdSpend(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/20 bg-offwhite px-3.5 py-2.5 text-sm text-navy focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors">
            <option value="0 - 50,000">₹0 - ₹50,000</option>
            <option value="50,000 - 1,00,000/-">₹50,000 - ₹1,00,000/-</option>
            <option value="1,00,000 - 2,00,000/-">₹1,00,000 - ₹2,00,000/-</option>
            <option value="2,00,000 - 5,00,000/-">₹2,00,000 - ₹5,00,000/-</option>
            <option value="5,00,000+">₹5,00,000+</option>
          </select>
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full justify-center">
            Submit Form
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <p className="text-center font-mono text-[11px] font-semibold text-navy/75 uppercase tracking-wider">
          🔒 100% Free · No sales pressure · Confidential
        </p>
      </form>
    </div>
  );
}
