import Image from "next/image";
import { GraduationCap, BarChart2, Building2 } from "lucide-react";
import { GlobeBackdrop } from "./GlobeBackdrop";
import { TrustBadge } from "./TrustBadge";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[520px] items-end justify-center">
      <GlobeBackdrop className="absolute inset-0 m-auto h-[120%] w-[120%]" />

      <div
        className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-primary-400/30 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="relative z-10 aspect-[4/5] w-full overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 55%, black 55%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 55%, black 55%, transparent 95%)",
        }}
      >
        <Image
          src="/images/partners/michael_2.jpg"
          alt="Michael Pham, Partner at APP Consultancy"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover object-top"
        />
      </div>

      <TrustBadge
        icon={GraduationCap}
        label="Ex-Big4 Partners"
        sublabel="KPMG · BDO · Mazars"
        className="absolute top-10 -right-2 z-20 hidden md:flex"
      />
      <TrustBadge
        icon={BarChart2}
        label="VAS & IFRS"
        sublabel="Expertise"
        className="absolute top-1/2 -left-6 z-20 hidden md:flex"
      />
      <TrustBadge
        icon={Building2}
        label="15+ Industries Served"
        sublabel="Manufacturing · F&B · Real Estate"
        className="absolute bottom-12 -right-10 z-20 hidden lg:flex"
      />

      <div className="mt-6 flex w-full flex-wrap justify-center gap-3 md:hidden">
        <TrustBadge icon={GraduationCap} label="Ex-Big4 Partners" />
        <TrustBadge icon={BarChart2} label="VAS & IFRS" />
      </div>
    </div>
  );
}
