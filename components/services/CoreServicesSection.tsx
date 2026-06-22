// components/services/CoreServicesSection.tsx
import { ServicesHeadline } from "./ServicesHeadline";
import { ServiceAccordion } from "./ServiceAccordion";
import { ServiceImage } from "./ServiceImage";

export function CoreServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <ServicesHeadline />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:items-start">
          <div className="order-2 lg:order-1">
            <ServiceAccordion />
          </div>
          <div className="order-1 lg:order-2">
            <ServiceImage />
          </div>
        </div>
      </div>
    </section>
  );
}
