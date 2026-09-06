'use client';

import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuditModal } from '@/components/audit/AuditModalContext';

interface HeroCtaButtonsProps {
  onOpenAudit?: () => void;
}

export function HeroCtaButtons({ onOpenAudit }: HeroCtaButtonsProps) {
  const modal = useAuditModal();
  const handleOpenAudit = onOpenAudit || modal.openAudit;

  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button size="lg" onClick={handleOpenAudit} aria-haspopup="dialog">
        Get My 15-Minute Ad Audit
        <ArrowRightIcon
          className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Button>
      <a
        href="#leak"
        className="avero-focus inline-flex h-[52px] items-center justify-center rounded-[12px] border border-navy/25 px-7 text-[15px] font-medium text-navy transition-[transform,border-color,background-color] duration-200 ease-premium hover:-translate-y-0.5 hover:border-navy/60 hover:bg-navy/[0.04]"
      >
        See How We Find The Leak
      </a>
    </div>
  );
}
