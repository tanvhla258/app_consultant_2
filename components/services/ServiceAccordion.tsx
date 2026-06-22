// components/services/ServiceAccordion.tsx
"use client";

import { useState } from "react";
import { services, defaultOpenServiceId } from "./data/services";
import { ServiceAccordionItem } from "./ServiceAccordionItem";

export function ServiceAccordion() {
  const [openId, setOpenId] = useState<string | null>(defaultOpenServiceId);

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="border-t border-primary-700/15">
      {services.map((service) => (
        <ServiceAccordionItem
          key={service.id}
          service={service}
          isOpen={openId === service.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
