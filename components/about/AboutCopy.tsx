"use client";

import { useLang } from "@/lib/i18n/useLang";
import { StatBlock } from "./StatBlock";

export function AboutCopy() {
  const { t } = useLang();

  return (
    <div className="flex w-full flex-col">
      <p className="max-w-sm text-base leading-relaxed text-primary-700/80">
        {t("about.body")}
      </p>
      <div className="mt-8">
        <StatBlock
          value="20+"
          label={t("about.stat_label")}
          sublabel={t("about.stat_sublabel")}
        />
      </div>
    </div>
  );
}
