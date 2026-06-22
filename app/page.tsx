import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { CoreServicesSection } from "@/components/services/CoreServicesSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
      <CoreServicesSection />
    </main>
  );
}
