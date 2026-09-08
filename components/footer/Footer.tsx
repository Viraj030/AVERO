import React from 'react';

const links = [
  { label: 'What We Fix', href: '#what-we-fix' },
  { label: 'How It Works', href: '#process' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' }
];

export function Footer() {
  return (
    <footer className="w-full border-t border-navy/10 bg-white px-5 sm:px-8 pb-[5rem] md:pb-0">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="font-display text-[18px] font-bold tracking-[0.16em] text-navy">
            AVERO
          </span>
          <span className="font-mono text-[11px] uppercase tracking-eyebrow text-navy/75 font-medium">
            Find the leak · Fix the problem · Scale what works
          </span>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="avero-focus text-[14px] text-charcoal/80 font-medium transition-colors duration-200 ease-premium hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-shell border-t border-navy/10 py-5">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-navy/80 font-semibold">
          © {new Date().getFullYear()} AVERO — Performance Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
