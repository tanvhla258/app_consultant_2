import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { CoreServicesSection } from "@/components/services/CoreServicesSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { TeamSection } from "@/components/team/TeamSection";
import { AvailabilitySection } from "@/components/availability/AvailabilitySection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
      <CoreServicesSection />
      <TestimonialsSection />
      <TeamSection />
      <AvailabilitySection />
    </main>
  );
}
