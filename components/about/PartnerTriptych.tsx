// components/about/PartnerTriptych.tsx
import { PartnerCard } from "./PartnerCard";
import { PARTNERS } from "./data/partners";

export function PartnerTriptych() {
  return (
    <figure className="relative flex w-full flex-col rounded-3xl border border-primary-100 bg-white p-5 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-6">
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -left-2 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <figcaption className="sr-only">APP Consultancy partners</figcaption>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-3 lg:gap-4">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.name} {...p} />
        ))}
      </div>
    </figure>
  );
}
