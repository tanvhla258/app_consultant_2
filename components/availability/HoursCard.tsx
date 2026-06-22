"use client";

import { ArrowRight, Pin } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";
import { APPOINTMENT_MAILTO, HOURS } from "./data/hours";

export function HoursCard() {
  const { t } = useLang();

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl bg-[var(--color-cta-blue)] p-7 text-white shadow-[0_12px_40px_rgba(28,67,217,0.25)] lg:p-9">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
        <Pin className="h-5 w-5 text-white" aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold leading-tight">
          {t("availability.card.title")}
        </h3>
        <p className="text-sm text-white/80">{t("availability.card.subtitle")}</p>
      </div>

      <ul className="flex flex-col divide-y divide-white/15">
        {HOURS.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between py-3 text-sm"
          >
            <span className="text-white/90">{t(row.dayKey)}</span>
            <span className="tabular-nums text-white">{t(row.hoursKey)}</span>
          </li>
        ))}
      </ul>

      <a
        href={APPOINTMENT_MAILTO}
        className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-white/90"
      >
        {t("availability.cta")}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
