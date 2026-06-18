// components/about/AboutSection.tsx
import { AboutHeadline } from "./AboutHeadline";
import { AboutCopy } from "./AboutCopy";
import { PartnerTriptych } from "./PartnerTriptych";
import { ValueCallout } from "./ValueCallout";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <AboutHeadline />

        {/* Desktop: 3-column. Tablet: triptych on top, copy + callout below. Mobile: single stack. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Triptych — first on tablet/mobile, center on desktop */}
          <div className="order-1 md:order-1 md:col-span-2 lg:order-2 lg:col-span-6 lg:flex">
            <PartnerTriptych />
          </div>

          {/* AboutCopy — left on desktop, bottom-left on tablet, second on mobile */}
          <div className="order-2 md:order-2 md:col-span-1 lg:order-1 lg:col-span-3 lg:flex">
            <AboutCopy />
          </div>

          {/* ValueCallout — right on desktop, bottom-right on tablet, third on mobile */}
          <div className="order-3 md:order-3 md:col-span-1 lg:order-3 lg:col-span-3 lg:flex">
            <ValueCallout />
          </div>
        </div>
      </div>
    </section>
  );
}
