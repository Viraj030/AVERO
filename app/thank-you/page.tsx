'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2Icon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const website = searchParams.get('website') || 'your website';
  
  let contactText = '';
  if (phone && email) contactText = `${phone} or ${email}`;
  else if (phone) contactText = phone;
  else if (email) contactText = email;
  else contactText = 'you';

  return (
    <div className="avero-grid-lines flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 py-20 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center bg-navy-800/40 backdrop-blur-sm border border-white/10 rounded-[24px] p-10 sm:p-14 shadow-2xl">
        <span
          aria-hidden="true"
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold shadow-[0_0_40px_rgba(212,175,55,0.2)]"
        >
          <CheckCircle2Icon className="h-10 w-10 text-gold" />
        </span>
        
        <h1 className="mt-8 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Audit Request Received.
        </h1>
        
        <div className="mt-6 h-px w-16 bg-gold/50 mx-auto" />
        
        <p className="mx-auto mt-8 max-w-lg text-[17px] sm:text-[19px] leading-[1.65] text-white/80">
          Thank you, <span className="font-semibold text-gold">{name}</span>. 
          We will review your ad setup for <span className="font-semibold text-white">{website}</span> and reach out to <span className="font-semibold text-gold">{contactText}</span> within 24 hours.
        </p>

        <div className="mt-12 flex justify-center">
          <Link href="/">
            <Button variant="onDark" className="px-8 flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-900" />}>
      <ThankYouContent />
    </Suspense>
  );
}
