import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Button } from './ui/Button';

const links = [
{ label: 'What We Fix', href: '#what-we-fix', id: 'what-we-fix' },
{ label: 'How It Works', href: '#process', id: 'process' },
{ label: 'Results', href: '#results', id: 'results' },
{ label: 'FAQ', href: '#faq', id: 'faq' }];


interface NavbarProps {
  onOpenAudit: () => void;
}

export function Navbar({ onOpenAudit }: NavbarProps) {
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
      scrolled ?
      'border-b border-navy/10 bg-offwhite/85 backdrop-blur-md' :
      'border-b border-transparent bg-transparent'}`
      }>
      
      <div className="mx-auto flex h-[64px] w-full max-w-shell items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="avero-focus font-display text-[19px] font-semibold tracking-[0.16em] text-navy">
          
          AVERO
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`avero-focus relative py-1 text-[14px] transition-colors duration-200 ease-premium ${
                isActive ? 'text-navy' : 'text-charcoal/70 hover:text-navy'}`
                }>
                
                {link.label}
                {isActive &&
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gold"
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }} />

                }
              </a>);

          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={onOpenAudit}
            className="hidden sm:inline-flex"
            aria-haspopup="dialog">
            
            Get My 15-Minute Audit
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="avero-focus inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-navy/15 text-navy lg:hidden">
            
            {menuOpen ?
            <XIcon className="h-5 w-5" aria-hidden="true" /> :

            <MenuIcon className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        className="h-[2px] origin-left bg-gold transition-opacity duration-300 ease-premium"
        aria-hidden="true" />
      

      <AnimatePresence>
        {menuOpen &&
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden border-t border-navy/10 bg-offwhite/95 backdrop-blur-md lg:hidden">
          
            <ul className="mx-auto flex max-w-shell flex-col px-5 py-2 sm:px-8">
              {links.map((link) =>
            <li key={link.href} className="border-b border-navy/5 last:border-0">
                  <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="avero-focus block py-3.5 text-[15px] text-charcoal">
                
                    {link.label}
                  </a>
                </li>
            )}
              <li className="py-3 sm:hidden">
                <Button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full">
                
                  Get My 15-Minute Audit
                </Button>
              </li>
            </ul>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}