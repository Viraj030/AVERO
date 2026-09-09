'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2Icon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const website = searchParams.get('website') || 'your website';
  
  let contactText = '';
  if (email && phone) contactText = `${email} / ${phone}`;
  else if (phone) contactText = phone;
  else if (email) contactText = email;
  else contactText = 'you';

  return (
    <div className="avero-grid-lines flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 py-20 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center bg-navy-800/60 backdrop-blur-md border border-white/15 rounded-[24px] p-8 sm:p-14 shadow-2xl">
        {/* Brand Logo */}
        <div className="mb-6 rounded-xl bg-white px-5 py-2.5 shadow-md">
          <Image
            src="/images/logo.png"
            alt="AVERO"
            width={140}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        <span
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold shadow-[0_0_40px_rgba(212,175,55,0.25)]"
        >
          <CheckCircle2Icon className="h-8 w-8 text-gold" />
        </span>
        
        <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Audit Request Received.
        </h1>
        
        <div className="mt-4 h-px w-16 bg-gold/50 mx-auto" />
        
        <p className="mx-auto mt-6 max-w-lg text-[16px] sm:text-[18px] leading-[1.65] text-white/85">
          Thank you, <span className="font-semibold text-gold">{name}</span>. 
          We will review your ad setup for <span className="font-semibold text-white">{website}</span> and reach out to <span className="font-semibold text-gold">{contactText}</span> within 24 hours.
        </p>

        {/* Quick WhatsApp Support */}
        <div className="mt-8">
          <a
            href="https://wa.me/918692918021"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-mono font-medium text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
          >
            <svg
              className="h-4 w-4 text-emerald-400 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Questions? Chat with us: <strong>8692918021</strong></span>
          </a>
        </div>

        <div className="mt-10 flex justify-center">
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

