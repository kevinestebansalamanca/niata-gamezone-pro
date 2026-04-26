import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Code-split below-the-fold sections to reduce initial JS payload (better LCP/TBT/FCP)
const Consoles = lazy(() => import("@/components/Consoles").then(m => ({ default: m.Consoles })));
const TimerSection = lazy(() => import("@/components/TimerSection").then(m => ({ default: m.TimerSection })));
const Services = lazy(() => import("@/components/Services").then(m => ({ default: m.Services })));
const Reservation = lazy(() => import("@/components/Reservation").then(m => ({ default: m.Reservation })));
const DeveloperSection = lazy(() => import("@/components/DeveloperSection").then(m => ({ default: m.DeveloperSection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const StickyWhatsApp = lazy(() => import("@/components/StickyWhatsApp").then(m => ({ default: m.StickyWhatsApp })));

const SectionFallback = () => <div className="min-h-[300px]" aria-hidden="true" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Consoles />
          <TimerSection />
          <Services />
          <Reservation />
          <DeveloperSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <StickyWhatsApp />
      </Suspense>
    </div>
  );
};

export default Index;
