"use client";

import { PillButton } from "@/components/ui/PillButton";
import { useLang } from "@/lib/i18n/useLang";

export function HeroCopy() {
  const { t } = useLang();
  const headingParts = t("hero.heading").split("\n");

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-semibold leading-none tracking-tight text-white lg:text-5xl">
        {headingParts[0]}
        {headingParts[1] && <><br />{headingParts[1]}</>}
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-white/70">
        {t("hero.subheading")}
      </p>

      <div className="mt-8">
        <PillButton href="#contact" variant="white">
          {t("hero.cta")}
        </PillButton>
      </div>

      <div className="mt-16 h-px w-24 bg-secondary-400/30" />

      <p className="mt-6 font-medium text-white">
        {t("hero.partner_name")}
      </p>
      <p className="mt-2 max-w-md text-sm italic text-white/60">
        &ldquo;{t("hero.quote")}&rdquo;
      </p>
    </div>
  );
}
