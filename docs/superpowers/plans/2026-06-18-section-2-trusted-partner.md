# Section 2 — Trusted Partner / About — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the APP Consultancy "About" section described in `docs/superpowers/specs/2026-06-18-section-2-trusted-partner-design.md` directly under the hero on the landing page.

**Architecture:** Fully server-rendered `<AboutSection>` composed from five leaf components and one typed data file. No client components, no new design tokens. All colors come from existing brand tokens in `app/globals.css`. Real partner portraits (Christ, Dennis, Michael) replace the template's stock photo; a verifiable "20+ Big4-Trained Partners" stat replaces the fabricated "1,250+ Successful Cases".

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · `lucide-react` for icons (already a dependency from the hero work).

**Testing note:** Per `CLAUDE.md`, the project has no test runner configured. Adding Vitest/Playwright purely for TDD form is out of scope. Verification uses `npm run lint` + `npm run build` (no errors) and, for the final assembly, a `npm run dev` visual check at 1440 / 1024 / 768 / 375 widths against `public/images/sections/02-trusted-partner.webp`.

**Image asset note:** All three partner JPGs already exist in `public/images/partners/`:
- `chris_vo_1.jpg`
- `dennis.jpg`
- `michael.jpg`

No background removal is required — a subtle `from-primary-900/30` bottom gradient overlay on each portrait unifies tonality across the three different source photos.

---

## File Structure

**New files:**

- `components/about/data/partners.ts` — Typed array of `{name, title, credentials, image, alt}` for the three APP partners. Exported so future sections (e.g., a dedicated Partners section) can reuse it.
- `components/about/StatBlock.tsx` — Stat card with a large gold number, divider, label, and sublabel. Pure props-driven primitive.
- `components/about/PartnerCard.tsx` — Single portrait cell: image with tonality overlay + name/title/credentials caption. Props-driven.
- `components/about/PartnerTriptych.tsx` — Card wrapper that renders three `<PartnerCard>` in a 3-column grid, with the decorative gold sparkle dots.
- `components/about/AboutHeadline.tsx` — Gold divider + uppercase eyebrow + H2 with an emphasized word.
- `components/about/AboutCopy.tsx` — Body paragraph + `<StatBlock>`.
- `components/about/ValueCallout.tsx` — Icon chip + slogan title + supporting copy. Right-column card.
- `components/about/AboutSection.tsx` — Top-level `<section id="about">`, composes everything.

**Modified files:**

- `app/page.tsx` — Mount `<AboutSection />` directly after `<Hero />`.

---

## Task 1: Partner data file

**Files:**
- Create: `components/about/data/partners.ts`

- [ ] **Step 1: Create the data file**

```ts
// components/about/data/partners.ts
export type Partner = {
  name: string;
  title: string;
  credentials: string;
  image: string;
  alt: string;
};

export const PARTNERS: readonly Partner[] = [
  {
    name: "Christ Vo",
    title: "Partner",
    credentials: "ACCA · VACPA",
    image: "/images/partners/chris_vo_1.jpg",
    alt: "Christ Vo, Partner at APP Consultancy",
  },
  {
    name: "Dennis Nguyen",
    title: "Partner",
    credentials: "MBA · ACCA · VACPA",
    image: "/images/partners/dennis.jpg",
    alt: "Dennis Nguyen, Partner at APP Consultancy",
  },
  {
    name: "Michael Pham",
    title: "Partner",
    credentials: "ACCA · VACPA",
    image: "/images/partners/michael.jpg",
    alt: "Michael Pham, Partner at APP Consultancy",
  },
] as const;
```

- [ ] **Step 2: Verify the partner image files exist**

Run: `ls public/images/partners/chris_vo_1.jpg public/images/partners/dennis.jpg public/images/partners/michael.jpg`

Expected: all three paths listed, no "No such file" errors.

- [ ] **Step 3: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/data/partners.ts
git commit -m "feat(about): add typed partner data file"
```

---

## Task 2: `StatBlock` primitive

**Files:**
- Create: `components/about/StatBlock.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/StatBlock.tsx
type Props = {
  value: string;
  label: string;
  sublabel: string;
};

export function StatBlock({ value, label, sublabel }: Props) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-[0_1px_2px_rgba(11,37,69,0.04)]">
      <div className="text-5xl font-semibold leading-none tracking-tight text-secondary-500">
        {value}
      </div>
      <div className="mt-3 h-px w-10 bg-secondary-400/40" />
      <div className="mt-3 text-sm font-semibold text-primary-700">{label}</div>
      <div className="mt-1 text-xs text-primary-700/60">{sublabel}</div>
    </div>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/StatBlock.tsx
git commit -m "feat(about): add StatBlock primitive"
```

---

## Task 3: `PartnerCard` primitive

**Files:**
- Create: `components/about/PartnerCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/PartnerCard.tsx
import Image from "next/image";
import type { Partner } from "./data/partners";

export function PartnerCard({ name, title, credentials, image, alt }: Partner) {
  return (
    <figure className="flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-primary-50">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 140px, (min-width: 768px) 25vw, 30vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent"
        />
      </div>
      <figcaption className="mt-3">
        <div className="text-sm font-semibold text-primary-700">{name}</div>
        <div className="text-xs text-primary-700/60">{title}</div>
        <div className="text-xs font-medium tracking-wide text-secondary-600">
          {credentials}
        </div>
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/PartnerCard.tsx
git commit -m "feat(about): add PartnerCard primitive"
```

---

## Task 4: `PartnerTriptych`

**Files:**
- Create: `components/about/PartnerTriptych.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/PartnerTriptych.tsx
import { PartnerCard } from "./PartnerCard";
import { PARTNERS } from "./data/partners";

export function PartnerTriptych() {
  return (
    <figure className="relative rounded-3xl border border-primary-100 bg-white p-5 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-6">
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -left-2 h-1.5 w-1.5 rounded-full bg-secondary-400"
      />
      <figcaption className="sr-only">APP Consultancy partners</figcaption>
      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.name} {...p} />
        ))}
      </div>
    </figure>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/PartnerTriptych.tsx
git commit -m "feat(about): add PartnerTriptych composing PartnerCards"
```

---

## Task 5: `AboutHeadline`

**Files:**
- Create: `components/about/AboutHeadline.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/AboutHeadline.tsx
export function AboutHeadline() {
  return (
    <div className="mb-14 lg:mb-20">
      <div className="mb-4 h-px w-12 bg-secondary-400" aria-hidden="true" />
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-500">
        About Us
      </div>
      <h2
        id="about-heading"
        className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-primary-700 lg:text-5xl"
      >
        A <span className="text-secondary-500">Trusted</span> Accounting Partner
        for Businesses in Vietnam
      </h2>
    </div>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/AboutHeadline.tsx
git commit -m "feat(about): add AboutHeadline with eyebrow and emphasized H2"
```

---

## Task 6: `AboutCopy`

**Files:**
- Create: `components/about/AboutCopy.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/AboutCopy.tsx
import { StatBlock } from "./StatBlock";

export function AboutCopy() {
  return (
    <div>
      <p className="max-w-sm text-base leading-relaxed text-primary-700/80">
        We&rsquo;re a dedicated accounting and advisory firm built by leaders
        from international audit and Big4 backgrounds. We help businesses in
        Vietnam stay compliant, reduce risk, and manage their finances with
        clarity &mdash; from multinationals to growing SMEs.
      </p>
      <div className="mt-8">
        <StatBlock
          value="20+"
          label="Big4-Trained Partners"
          sublabel="KPMG · BDO · Mazars · PKF"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/AboutCopy.tsx
git commit -m "feat(about): add AboutCopy with body paragraph and StatBlock"
```

---

## Task 7: `ValueCallout`

**Files:**
- Create: `components/about/ValueCallout.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/ValueCallout.tsx
import { Compass } from "lucide-react";

export function ValueCallout() {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-secondary-400">
        <Compass size={22} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-tight tracking-tight text-primary-700 lg:text-2xl">
        Your Vision,
        <br />
        Our Mission
      </h3>
      <p className="text-sm leading-relaxed text-primary-700/70">
        We turn your business goals into a clear financial roadmap &mdash;
        audit, tax, IFRS, and advisory built on Big4 expertise.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/ValueCallout.tsx
git commit -m "feat(about): add ValueCallout with slogan and Compass icon"
```

---

## Task 8: `AboutSection` (top-level composition)

**Files:**
- Create: `components/about/AboutSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
// components/about/AboutSection.tsx
import { AboutHeadline } from "./AboutHeadline";
import { AboutCopy } from "./AboutCopy";
import { PartnerTriptych } from "./PartnerTriptych";
import { ValueCallout } from "./ValueCallout";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <AboutHeadline />

        {/* Desktop: 3-column. Tablet: triptych on top, copy + callout below. Mobile: single stack. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Triptych — first on tablet/mobile, center on desktop */}
          <div className="order-1 md:order-1 md:col-span-2 lg:order-2 lg:col-span-6">
            <PartnerTriptych />
          </div>

          {/* AboutCopy — left on desktop, bottom-left on tablet, second on mobile */}
          <div className="order-2 md:order-2 md:col-span-1 lg:order-1 lg:col-span-3">
            <AboutCopy />
          </div>

          {/* ValueCallout — right on desktop, bottom-right on tablet, third on mobile */}
          <div className="order-3 md:order-3 md:col-span-1 lg:order-3 lg:col-span-3">
            <ValueCallout />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint and commit**

Run: `npm run lint`
Expected: no errors.

```bash
git add components/about/AboutSection.tsx
git commit -m "feat(about): add AboutSection composing the full about block"
```

---

## Task 9: Mount on the landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read the current `app/page.tsx`**

Run: `cat app/page.tsx`

Expected current content:
```tsx
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 2: Add the AboutSection import and mount it after `<Hero />`**

Replace the file contents with:
```tsx
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AboutSection />
    </main>
  );
}
```

- [ ] **Step 3: Lint, build, and commit**

Run: `npm run lint && npm run build`
Expected: lint clean, build succeeds.

```bash
git add app/page.tsx
git commit -m "feat(landing): mount AboutSection under Hero"
```

---

## Task 10: Visual verification

**Files:** none modified (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts at http://localhost:3000 with no compile errors.

- [ ] **Step 2: Verify at 1440px width**

Open http://localhost:3000 in a 1440-wide viewport.

Checklist:
- Section background is light surface (#F5F7FA), clearly distinct from the navy hero above.
- Headline strip shows gold horizontal divider, "ABOUT US" eyebrow in gold, and the H2 with "Trusted" rendered in gold.
- Three columns visible: AboutCopy on the left, PartnerTriptych in the center (3 portraits side-by-side), ValueCallout on the right.
- StatBlock shows "20+" in large gold, "Big4-Trained Partners", and "KPMG · BDO · Mazars · PKF".
- Each partner portrait shows a face cropped from the top with a subtle dark gradient at the bottom; names, "Partner" title, and credentials appear beneath.
- ValueCallout shows a gold compass icon on a navy chip, the slogan title, and supporting copy.
- No "Learn More About Us" CTA in the section (intentionally removed per spec §1).

- [ ] **Step 3: Verify at 1024px width**

Resize to 1024px. Confirm the 3-column layout is preserved with tighter gaps, H2 drops to `text-4xl`.

- [ ] **Step 4: Verify at 768px width**

Resize to 768px. Confirm the PartnerTriptych spans the full width on top; AboutCopy and ValueCallout sit side-by-side below.

- [ ] **Step 5: Verify at 375px width**

Resize to 375px. Confirm single-column stack: H2 → triptych (still 3 portraits internally) → AboutCopy with StatBlock → ValueCallout. Caption text reads but is compact.

- [ ] **Step 6: Verify no console errors**

Open DevTools console at each width. Expected: no errors or warnings related to AboutSection components or Next Image.

- [ ] **Step 7: Verify the hero nav anchor resolves**

If the hero nav has an "About" link with `href="#about"`, click it and confirm the page smooth-scrolls to the AboutSection. (If the hero's About link points elsewhere, log this as a follow-up to align in the hero work — do not modify the hero in this section's PR.)

- [ ] **Step 8: Final build check and commit any tweaks**

Run: `npm run build`
Expected: build succeeds with no errors.

If any visual tweaks were needed during verification, commit them now:
```bash
git add -A
git commit -m "fix(about): visual polish from verification pass"
```

(If no tweaks needed, skip the commit.)

---

## Self-review notes

Spec coverage check against `docs/superpowers/specs/2026-06-18-section-2-trusted-partner-design.md`:

- §3 layout/container — Task 8 (`bg-surface py-24 lg:py-32`, `max-w-7xl px-6 lg:px-16`).
- §3.3 responsive — Task 8 grid uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-12` with explicit `order-*` classes for the tablet/mobile reflow described in the spec. Verified at all four widths in Task 10.
- §4 headline strip — Task 5 (`AboutHeadline`).
- §5.1 body paragraph — Task 6 (`AboutCopy`).
- §5.2 StatBlock — Task 2 + Task 6 (data wired in).
- §6 PartnerTriptych — Tasks 3 + 4, with sparkle dots and tonality overlay.
- §6.3 caption strip — Task 3 inside `PartnerCard`.
- §7 ValueCallout — Task 7.
- §8 component file plan — every file from the spec exists as a task.
- §9 tokens — all class names use existing `globals.css` tokens. No new tokens introduced (verified by Task 9 lint/build pass).
- §10 accessibility — `id="about"` and `aria-labelledby="about-heading"` on the section (Task 8), H2 carries `id="about-heading"` (Task 5), `figcaption` sr-only label (Task 4), per-image alt text (Task 1 data + Task 3 wiring), `aria-hidden` on decorative gradient and sparkle dots (Tasks 3, 4).
- §12 done criteria — Task 9 mounts the section under Hero, Task 10 covers visual match and responsive widths, lint + build run in Tasks 9 and 10.
