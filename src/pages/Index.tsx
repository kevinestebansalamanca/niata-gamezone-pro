import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Consoles } from "@/components/Consoles";
import { TimerSection } from "@/components/TimerSection";
import { Services } from "@/components/Services";
import { Reservation } from "@/components/Reservation";
import { DeveloperSection } from "@/components/DeveloperSection";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Consoles />
        <TimerSection />
        <Services />
        <Reservation />
        <DeveloperSection />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Index;
