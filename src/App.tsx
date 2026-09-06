import React, { useCallback, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { LeakVisualization } from './components/LeakVisualization';
import { LeakCalculator } from './components/LeakCalculator';
import { AuditDiagnostic } from './components/AuditDiagnostic';
import { BusinessTypeSwitcher } from './components/BusinessTypeSwitcher';
import { PerformanceFramework } from './components/PerformanceFramework';
import { FixAccordion } from './components/FixAccordion';
import { ProcessTimeline } from './components/ProcessTimeline';
import { CaseStudies } from './components/CaseStudies';
import { WhyAvero } from './components/WhyAvero';
import { Qualification } from './components/Qualification';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { AuditModal } from './components/audit/AuditModal';

interface AppProps {
  finalCtaHeadline?: 'leak' | 'budget';
  showStickyMobileCTA?: boolean;
  showLeakCalculator?: boolean;
}

export function App({
  finalCtaHeadline = 'leak',
  showStickyMobileCTA = true,
  showLeakCalculator = true
}: AppProps) {
  const [auditOpen, setAuditOpen] = useState(false);
  const [prefillSpend, setPrefillSpend] = useState<string | undefined>();

  const openAudit = useCallback(() => setAuditOpen(true), []);
  const openAuditWithSpend = useCallback((bucket?: string) => {
    setPrefillSpend(bucket);
    setAuditOpen(true);
  }, []);
  const closeAudit = useCallback(() => setAuditOpen(false), []);

  return (
    <div className="min-h-full w-full bg-white">
      <Navbar onOpenAudit={openAudit} />

      <main>
        {/* 1. Hero section */}
        <Hero onOpenAudit={openAudit} />

        {/* 2. Marquee */}
        <TrustBar />

        {/* 3. The Problem section */}
        <LeakVisualization />

        {/* 4. Leak model */}
        {showLeakCalculator && (
          <LeakCalculator onOpenAudit={openAuditWithSpend} />
        )}

        {/* 5. The 15-min audit */}
        <AuditDiagnostic onOpenAudit={openAudit} />

        {/* 6. Who we work with */}
        <BusinessTypeSwitcher onOpenAudit={openAudit} />

        {/* 7. The Framework */}
        <PerformanceFramework />

        {/* 8. Scope */}
        <FixAccordion />

        {/* 9. Process */}
        <ProcessTimeline />

        {/* 10. Proof */}
        <CaseStudies />

        {/* 11. Why AVERO */}
        <WhyAvero />

        {/* 12. FIT */}
        <Qualification />

        {/* 13. FAQ */}
        <FAQ />

        {/* 14. Next Step */}
        <FinalCTA onOpenAudit={openAudit} variant={finalCtaHeadline} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Free Audit CTA */}
      {showStickyMobileCTA && (
        <StickyMobileCTA onOpenAudit={openAudit} hidden={auditOpen} />
      )}

      {/* Popup Audit Form Modal */}
      <AuditModal
        open={auditOpen}
        onClose={closeAudit}
        prefillSpend={prefillSpend}
      />
    </div>
  );
}