"use client";

import { useLang } from "@/lib/i18n/useLang";

export function TeamHeadline() {
  const { t } = useLang();

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
      <h2
        id="team-heading"
        className="text-3xl font-semibold leading-tight text-primary-700 md:text-4xl lg:text-5xl"
      >
        {t("team.heading")}
        <br />
        <span className="text-secondary-400">{t("team.heading_accent")}</span>
      </h2>
      <p className="text-base text-primary-700/70 lg:text-lg">
        {t("team.subheading")}
      </p>
    </div>
  );
}
