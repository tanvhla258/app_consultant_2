"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";

const iconClassName = "h-5 w-5 text-secondary-400 shrink-0";
const labelClassName = "text-xs uppercase tracking-wider text-white/50";
const valueClassName = "text-sm text-white/80";

export function ContactInfo() {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-secondary-400">
          {t("contact.eyebrow")}
        </p>
        <h2
          id="contact-heading"
          className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl"
        >
          {t("contact.heading")}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
          {t("contact.body")}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <Mail className={iconClassName} />
          <div>
            <p className={labelClassName}>{t("contact.email_label")}</p>
            <p className={valueClassName}>{t("contact.email_value")}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className={iconClassName} />
          <div>
            <p className={labelClassName}>{t("contact.phone_label")}</p>
            <p className={valueClassName}>{t("contact.phone_value")}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className={iconClassName} />
          <div>
            <p className={labelClassName}>{t("contact.location_label")}</p>
            <p className={valueClassName}>{t("contact.location_value")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
