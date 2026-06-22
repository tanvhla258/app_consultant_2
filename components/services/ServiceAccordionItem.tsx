// components/services/ServiceAccordionItem.tsx
"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";
import type { Service } from "./data/services";

type Props = {
  service: Service;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

export function ServiceAccordionItem({ service, isOpen, onToggle }: Props) {
  const { t } = useLang();
  const bodyId = `service-body-${service.id}`;

  return (
    <div className="border-b border-primary-700/15">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => onToggle(service.id)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-secondary-500"
      >
        <span className="flex items-center gap-3 text-base font-medium text-primary-700">
          <span className="text-primary-700/60">{service.index}</span>
          {t(service.titleKey)}
        </span>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full text-primary-700"
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <div
        id={bodyId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pl-10 pr-4">
            <p className="mb-4 text-sm leading-relaxed text-primary-700/80">
              {t(service.descKey)}
            </p>
            <ul className="mb-6 space-y-2">
              {service.bulletKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-2 text-sm text-primary-700"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-secondary-500 text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              // TODO: link to /services/<id> when the page exists
              className="inline-flex items-center gap-2 rounded-full border border-primary-700/30 px-4 py-2 text-xs font-medium text-primary-700 transition hover:border-secondary-500 hover:text-secondary-500"
            >
              {t("services.cta_item")}
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-white"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
