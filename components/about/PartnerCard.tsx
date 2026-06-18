// components/about/PartnerCard.tsx
import Image from "next/image";
import type { Partner } from "./data/partners";

export function PartnerCard({ name, title, credentials, image, alt }: Partner) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-primary-50">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 140px, (min-width: 768px) 25vw, 30vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent"
        />
      </div>
      <figcaption className="mt-3">
        <div className="text-sm font-semibold text-primary-700">{name}</div>
        <div className="text-xs text-primary-700/60">{title}</div>
        <div className="text-xs font-medium tracking-wide text-secondary-600">
          {credentials}
        </div>
      </figcaption>
    </figure>
  );
}
