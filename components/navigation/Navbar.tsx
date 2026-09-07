'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Button } from '@/components/ui/Button';
import { useAuditModal } from '@/components/audit/AuditModalContext';

const links = [
  { label: 'What We Fix', href: '#what-we-fix', id: 'what-we-fix' },
  { label: 'How It Works', href: '#process', id: 'process' },
  { label: 'Results', href: '#results', id: 'results' },
  { label: 'FAQ', href: '#faq', id: 'faq' }
];

interface NavbarProps {
  onOpenAudit?: () => void;
}

export function Navbar({ onOpenAudit }: NavbarProps) {
  const modal = useAuditModal();
  const handleOpenAudit = onOpenAudit || modal.openAudit;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => links.map((l) => l.id), []);
  const activeId = useScrollSpy(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-premium ${
        scrolled
          ? 'border-b border-navy/10 bg-offwhite/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[64px] w-full max-w-shell items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="avero-focus font-display text-[19px] font-semibold tracking-[0.16em] text-navy"
        >
          AVERO
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleOpenAudit}
            aria-haspopup="dialog"
          >
            Get My 15-Mins Audit
          </Button>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        className="h-[2px] origin-left bg-gold transition-opacity duration-300 ease-premium"
        aria-hidden="true"
      />


    </header>
  );
}
