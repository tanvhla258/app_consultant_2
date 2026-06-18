import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
    </main>
  );
}
