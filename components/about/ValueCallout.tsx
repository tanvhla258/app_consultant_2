"use client";

import { Compass } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";

export function ValueCallout() {
  const { t } = useLang();
  const headingParts = t("about.value_heading").split("\n");

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-secondary-400">
        <Compass size={22} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-tight tracking-tight text-primary-700 lg:text-2xl">
        {headingParts[0]}
        {headingParts[1] && <><br />{headingParts[1]}</>}
      </h3>
      <p className="text-sm leading-relaxed text-primary-700/70">
        {t("about.value_body")}
      </p>
    </div>
  );
}
