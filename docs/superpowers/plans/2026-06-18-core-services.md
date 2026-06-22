# Core Services Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Core Services section (04) — a single-open accordion of all seven service categories from `docs/requirement.md`, with a static photo on the right — mounted on the landing page.

**Architecture:** Server-rendered section composer (`CoreServicesSection`) wrapping a client accordion (`ServiceAccordion`) for open-state toggling, a presentational item (`ServiceAccordionItem`), a server `ServicesHeadline`, and a server `ServiceImage`. All user-facing strings flow through the existing `useLang().t()` i18n hook with new EN keys; VI gets the same English strings as placeholders (translation effort fills VI later).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, TypeScript, lucide-react (already in deps), existing `lib/i18n/useLang` hook, `next/image`.

**Spec:** `docs/superpowers/specs/2026-06-18-core-services-design.md`

**Note on testing:** This project has no test runner configured (per `CLAUDE.md`). Verification is `npm run lint` plus manual browser checks of `http://localhost:3000` using `npm run dev`. Where the TDD pattern would call for a unit test, this plan substitutes an explicit browser/lint verification step.

---

## File map

**Create:**
- `components/services/data/services.ts` — 7-entry data array with translation keys + bullet count.
- `components/services/ServicesHeadline.tsx` — server, headline + section CTA row.
- `components/services/ServiceImage.tsx` — server, right-column photo.
- `components/services/ServiceAccordionItem.tsx` — presentational item row.
- `components/services/ServiceAccordion.tsx` — `"use client"`, holds open-state.
- `components/services/CoreServicesSection.tsx` — composer.

**Modify:**
- `lib/i18n/en.json` — add `services.*` keys.
- `lib/i18n/vi.json` — add the same keys with EN strings as placeholders.
- `next.config.ts` — add `images.remotePatterns` for `images.unsplash.com`.
- `app/page.tsx` — render `<CoreServicesSection />` after `<AboutSection />`.

---

## Task 1: Add Unsplash to `next/image` remote patterns

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Open the file and replace contents**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify dev server still starts**

Run: `npm run dev`
Expected: server boots at http://localhost:3000 with no config errors. Kill the process (Ctrl+C) before continuing.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore(next): allow images.unsplash.com remote images"
```

---

## Task 2: Add EN i18n keys for the Services section

**Files:**
- Modify: `lib/i18n/en.json`

- [ ] **Step 1: Add the new key block before the closing `}` (after the last `about.*` key)**

The existing file ends with `"about.partners_sr": "APP Consultancy partners"`. Add a trailing comma to that line, then append the block below before the closing `}`:

```json
  "services.eyebrow": "Our Services",
  "services.heading": "Core Services To Simplify Your Finances",
  "services.heading_accent": "Simplify Your Finances",
  "services.cta_all": "View All Services",
  "services.cta_item": "Explore Service Details",

  "services.accounting.title": "Accounting",
  "services.accounting.description": "End-to-end bookkeeping, statutory reporting, and IFRS conversion handled by Big4-trained accountants.",
  "services.accounting.bullet_1": "Bookkeeping and preparation of financial statements",
  "services.accounting.bullet_2": "Audit and review of financial statements",
  "services.accounting.bullet_3": "Consulting on converting financial statements to IFRS",
  "services.accounting.bullet_4": "Payroll, tax and employee insurance services",

  "services.tax.title": "Tax",
  "services.tax.description": "Strategic planning, filing, and audit support to keep your business compliant and tax-efficient.",
  "services.tax.bullet_1": "Tax planning",
  "services.tax.bullet_2": "Tax support and filing",
  "services.tax.bullet_3": "Tax compliance consulting and review",
  "services.tax.bullet_4": "Tax audit support",

  "services.financial.title": "Financial Advisory",
  "services.financial.description": "Management reporting and budgeting systems built around how your leadership team actually makes decisions.",
  "services.financial.bullet_1": "Building a Management Reporting System According to the Needs and Management Purposes of the Enterprise",
  "services.financial.bullet_2": "Budget planning consulting",

  "services.training.title": "Training Services",
  "services.training.description": "Practical financial and IFRS training delivered on-site, tailored to your team's role and seniority.",
  "services.training.bullet_1": "Providing accounting training services at enterprises (including financial accounting and management accounting)",
  "services.training.bullet_2": "Training on International Financial Reporting Standards (IFRS)",

  "services.business.title": "Business Advisory",
  "services.business.description": "Restructuring, internal audit, and control improvements that strengthen how your business is run.",
  "services.business.bullet_1": "Business Restructuring Consulting",
  "services.business.bullet_2": "Establish and improve internal audit function",
  "services.business.bullet_3": "Improve internal control and financial management",

  "services.ma.title": "M&A Advisory",
  "services.ma.description": "Tax, financial, and legal due diligence to de-risk acquisitions, divestitures, and investment decisions.",
  "services.ma.bullet_1": "Tax Due Diligence",
  "services.ma.bullet_2": "Financial Due Diligence",
  "services.ma.bullet_3": "Legal Due Diligence",

  "services.transfer.title": "Transfer Pricing",
  "services.transfer.description": "Documentation, review, and authority-support services that protect your transfer pricing position.",
  "services.transfer.bullet_1": "Transfer pricing documentation",
  "services.transfer.bullet_2": "Transfer pricing review",
  "services.transfer.bullet_3": "Transfer pricing investigation support"
```

- [ ] **Step 2: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/en.json
git commit -m "feat(i18n): add EN keys for Core Services section"
```

---

## Task 3: Mirror keys into VI (English placeholders)

**Files:**
- Modify: `lib/i18n/vi.json`

- [ ] **Step 1: Append the same `services.*` block to `vi.json`**

Use the EXACT same block from Task 2, Step 1 — appended to `vi.json` in the same position (after the last existing key, with a leading comma on the previous line as needed).

The `useLang().t()` hook falls back to EN when a key is missing, so duplicating EN strings into `vi.json` is functionally equivalent to leaving them out. We duplicate so the translation effort sees the full key list in one file.

- [ ] **Step 2: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/vi.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/vi.json
git commit -m "feat(i18n): add VI placeholders for Core Services section"
```

---

## Task 4: Create the services data file

**Files:**
- Create: `components/services/data/services.ts`

- [ ] **Step 1: Write the file**

```ts
// components/services/data/services.ts

export type Service = {
  id: string;        // stable identifier; used as React key and for openId
  index: string;     // display label, e.g. "[01]"
  titleKey: string;  // i18n key for the title
  descKey: string;   // i18n key for the one-line description
  bulletKeys: string[]; // i18n keys for the bullet rows
};

export const services: Service[] = [
  {
    id: "accounting",
    index: "[01]",
    titleKey: "services.accounting.title",
    descKey: "services.accounting.description",
    bulletKeys: [
      "services.accounting.bullet_1",
      "services.accounting.bullet_2",
      "services.accounting.bullet_3",
      "services.accounting.bullet_4",
    ],
  },
  {
    id: "tax",
    index: "[02]",
    titleKey: "services.tax.title",
    descKey: "services.tax.description",
    bulletKeys: [
      "services.tax.bullet_1",
      "services.tax.bullet_2",
      "services.tax.bullet_3",
      "services.tax.bullet_4",
    ],
  },
  {
    id: "financial",
    index: "[03]",
    titleKey: "services.financial.title",
    descKey: "services.financial.description",
    bulletKeys: [
      "services.financial.bullet_1",
      "services.financial.bullet_2",
    ],
  },
  {
    id: "training",
    index: "[04]",
    titleKey: "services.training.title",
    descKey: "services.training.description",
    bulletKeys: [
      "services.training.bullet_1",
      "services.training.bullet_2",
    ],
  },
  {
    id: "business",
    index: "[05]",
    titleKey: "services.business.title",
    descKey: "services.business.description",
    bulletKeys: [
      "services.business.bullet_1",
      "services.business.bullet_2",
      "services.business.bullet_3",
    ],
  },
  {
    id: "ma",
    index: "[06]",
    titleKey: "services.ma.title",
    descKey: "services.ma.description",
    bulletKeys: [
      "services.ma.bullet_1",
      "services.ma.bullet_2",
      "services.ma.bullet_3",
    ],
  },
  {
    id: "transfer",
    index: "[07]",
    titleKey: "services.transfer.title",
    descKey: "services.transfer.description",
    bulletKeys: [
      "services.transfer.bullet_1",
      "services.transfer.bullet_2",
      "services.transfer.bullet_3",
    ],
  },
];

export const defaultOpenServiceId = "accounting";
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/services/data/services.ts
git commit -m "feat(services): add typed services data with i18n keys"
```

---

## Task 5: Create `ServicesHeadline`

**Files:**
- Create: `components/services/ServicesHeadline.tsx`

- [ ] **Step 1: Write the file**

```tsx
// components/services/ServicesHeadline.tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";

export function ServicesHeadline() {
  const { t } = useLang();
  const heading = t("services.heading");
  const accent = t("services.heading_accent");
  const [before, after] = heading.split(accent);
  const hasSplit = after !== undefined;

  return (
    <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-4 h-px w-12 bg-secondary-400" aria-hidden="true" />
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
          {t("services.eyebrow")}
        </div>
        <h2
          id="services-heading"
          className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-primary-700 lg:text-5xl"
        >
          {hasSplit ? (
            <>
              {before}
              <span className="text-secondary-500">{accent}</span>
              {after}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      <button
        type="button"
        // TODO: link to /services when the page exists
        className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-primary-700 px-6 text-sm font-medium text-white transition hover:bg-primary-800 lg:self-end"
      >
        {t("services.cta_all")}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `components/services/ServicesHeadline.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/services/ServicesHeadline.tsx
git commit -m "feat(services): add ServicesHeadline with section CTA"
```

---

## Task 6: Create `ServiceAccordionItem`

**Files:**
- Create: `components/services/ServiceAccordionItem.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `components/services/ServiceAccordionItem.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/services/ServiceAccordionItem.tsx
git commit -m "feat(services): add presentational ServiceAccordionItem"
```

---

## Task 7: Create `ServiceAccordion` (state owner)

**Files:**
- Create: `components/services/ServiceAccordion.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `components/services/ServiceAccordion.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/services/ServiceAccordion.tsx
git commit -m "feat(services): add ServiceAccordion with single-open state"
```

---

## Task 8: Create `ServiceImage`

**Files:**
- Create: `components/services/ServiceImage.tsx`

- [ ] **Step 1: Write the file**

```tsx
// components/services/ServiceImage.tsx
import Image from "next/image";

// TODO: replace with self-hosted asset under public/images/sections/
const SRC =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

export function ServiceImage() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={SRC}
        alt="Accountant reviewing financial paperwork with a calculator on a wooden desk"
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `components/services/ServiceImage.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/services/ServiceImage.tsx
git commit -m "feat(services): add ServiceImage with Unsplash placeholder"
```

---

## Task 9: Create `CoreServicesSection` composer

**Files:**
- Create: `components/services/CoreServicesSection.tsx`

- [ ] **Step 1: Write the file**

```tsx
// components/services/CoreServicesSection.tsx
import { ServicesHeadline } from "./ServicesHeadline";
import { ServiceAccordion } from "./ServiceAccordion";
import { ServiceImage } from "./ServiceImage";

export function CoreServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <ServicesHeadline />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:items-start">
          <div className="order-2 lg:order-1">
            <ServiceAccordion />
          </div>
          <div className="order-1 lg:order-2">
            <ServiceImage />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `components/services/CoreServicesSection.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/services/CoreServicesSection.tsx
git commit -m "feat(services): add CoreServicesSection composer"
```

---

## Task 10: Mount the section on the landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read the current file**

Read `app/page.tsx` to confirm the current import/render shape.

- [ ] **Step 2: Add the import and render `<CoreServicesSection />` directly after `<AboutSection />`**

Add this import alongside the existing `AboutSection` import:

```tsx
import { CoreServicesSection } from "@/components/services/CoreServicesSection";
```

In the JSX, add `<CoreServicesSection />` as the next sibling after `<AboutSection />`:

```tsx
<AboutSection />
<CoreServicesSection />
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 4: Browser verification**

Run: `npm run dev` (in background or separate terminal), open http://localhost:3000.

Confirm:
- Section appears below About.
- Headline reads "Core Services To Simplify Your Finances" with "Simplify Your Finances" rendered in gold.
- "View All Services" button visible top-right on desktop; below the headline on mobile.
- Accordion shows all 7 rows: `[01] Accounting` through `[07] Transfer Pricing`.
- On load, `[01] Accounting` is expanded; other 6 collapsed (show `+`).
- Clicking a closed item opens it and collapses the previous open one (`+` ↔ `−` flips correctly).
- Clicking the currently open item collapses it (no item open).
- Height transitions smoothly (no abrupt snap).
- Right column shows the Unsplash photo at the proper aspect ratio.
- Resize to mobile width (<1024px): image stacks above accordion, both CTAs still visible.
- DevTools console: no warnings (key, hydration, missing alt, image domain).
- DevTools network: no 404 on the Unsplash URL.

If any check fails, fix before committing.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(landing): mount CoreServicesSection after About"
```

---

## Task 11: Build verification

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds with no errors or warnings related to the new components or images config.

- [ ] **Step 2: If the build fails, fix and re-commit**

Address any type, lint, or `next/image` config errors. Commit fixes separately:

```bash
git add <files>
git commit -m "fix(services): <one-line>"
```
