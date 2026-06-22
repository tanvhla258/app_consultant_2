import Image from "next/image";
import { AvailabilityHeadline } from "./AvailabilityHeadline";
import { HoursCard } from "./HoursCard";

export function AvailabilitySection() {
  return (
    <section
      id="availability"
      aria-labelledby="availability-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <AvailabilityHeadline />

        <div className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-full">
            <Image
              src="/images/sections/08-availability.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <HoursCard />
        </div>
      </div>
    </section>
  );
}
