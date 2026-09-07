import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { TrustBar } from '@/components/marquee/TrustBar';
import { LeakVisualization } from '@/components/problem/LeakVisualization';
import { LeakCalculator } from '@/components/leah/LeakCalculator';
import { AuditDiagnostic } from '@/components/audit/AuditDiagnostic';
import { BusinessTypeSwitcher } from '@/components/solutions/BusinessTypeSwitcher';
import { PerformanceFramework } from '@/components/framework/PerformanceFramework';
import { FixAccordion } from '@/components/scope/FixAccordion';
import { ProcessTimeline } from '@/components/process/ProcessTimeline';
import { CaseStudies } from '@/components/proof/CaseStudies';
import { WhyAvero } from '@/components/why-avero/WhyAvero';
import { Qualification } from '@/components/fit/Qualification';
import { FAQ } from '@/components/faq/FAQ';
import { FinalCTA } from '@/components/cta/FinalCTA';
import { Footer } from '@/components/footer/Footer';
import { StickyMobileCTA } from '@/components/sticky/StickyMobileCTA';
import { AuditModalProvider } from '@/components/audit/AuditModalContext';

export default function Page() {
  return (
    <AuditModalProvider>
      <div className="min-h-full w-full bg-white">
        <Navbar />

        <main>
          {/* 1. Hero section & 2. Free 15-Min Audit Form */}
          <Hero />

          {/* 3. Running service marquee */}
          <TrustBar />

          {/* 4. Problem / Leak Funnel */}
          <LeakVisualization />

          {/* 5. LEAH Leak Model Calculator */}
          <LeakCalculator />

          {/* 6. 15-Minute Audit section & Diagnostic Sweep */}
          <AuditDiagnostic />

          {/* 7. E-commerce / Lead Generation section */}
          <BusinessTypeSwitcher />

          {/* 8. Framework */}
          <PerformanceFramework />

          {/* 9. Scope / What We Actually Fix */}
          <FixAccordion />

          {/* 10. Process */}
          <ProcessTimeline />

          {/* 11. Proof / Case Studies */}
          <CaseStudies />

          {/* 12. Why AVERO */}
          <WhyAvero />

          {/* 13. Fit */}
          {/* <Qualification /> */}

          {/* 14. FAQ */}
          <FAQ />

          {/* 15. Final CTA */}
          <FinalCTA variant="leak" />
        </main>

        {/* Footer */}
        <Footer />

        {/* Sticky Free Audit CTA (Mobile & Desktop) */}
        <StickyMobileCTA />
      </div>
    </AuditModalProvider>
  );
}
