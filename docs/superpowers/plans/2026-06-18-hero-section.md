# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the create-next-app placeholder in `app/page.tsx` with the APP Consultancy marketing hero described in `docs/superpowers/specs/2026-06-18-hero-section-design.md`.

**Architecture:** Server-rendered `<Hero>` composed from four leaf components and two primitives. Only `HeroNav` is a client component (mobile drawer state). All colors come from existing brand tokens in `app/globals.css`. No new design tokens, no animation libs — just Tailwind v4 + CSS keyframes.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · `lucide-react` for icons.

**Testing note:** The project has no test runner configured (per `CLAUDE.md`). Adding Vitest/Playwright purely for TDD form is out of scope. Verification for each task uses `npm run lint` + `npm run build` (no errors) and, for the final assembly, a `npm run dev` visual check at 1440 / 1024 / 768 / 375 widths.

**Image asset note:** The spec assumes a background-removed `michael_2.png` exists. Since only `michael_2.jpg` (grey studio backdrop) is available right now, this plan uses the `.jpg` with a CSS `mask-image: radial-gradient(...)` vignette that fades the grey studio backdrop into the navy hero. Swap to a transparent PNG later by replacing the asset path and removing the mask — no code restructure needed.

---

## File Structure

**New files:**

- `components/ui/PillButton.tsx` — Pill-shaped CTA button. Variants `white` and `dark`. Used by `HeroNav` ("Book Consultation") and `HeroCopy` ("Get a Free Consultation").
- `components/hero/TrustBadge.tsx` — Floating badge (icon + label + sublabel). Used 3× by `HeroPortrait`.
- `components/hero/SparkleField.tsx` — Decorative gold sparkle SVGs scattered in the hero background. `aria-hidden`.
- `components/hero/GlobeBackdrop.tsx` — Inline wireframe-globe SVG (concentric circles + meridian/parallel lines) behind the portrait. `aria-hidden`.
- `components/hero/HeroNav.tsx` — Top pill nav. Client component (mobile drawer state).
- `components/hero/HeroCopy.tsx` — Left column: H1, subhead, CTA, divider, partner intro.
- `components/hero/HeroPortrait.tsx` — Right column: portrait + globe backdrop + 3 trust badges.
- `components/hero/Hero.tsx` — Top-level `<section>`, composes everything.

**Modified files:**

- `app/page.tsx` — Replace create-next-app placeholder with `<Hero />`.
- `app/layout.tsx` — Update `metadata` title/description for APP Consultancy.
- `package.json` — Add `lucide-react` dependency.

---

## Task 1: Install `lucide-react`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependency**

Run: `npm install lucide-react`
Expected: adds `lucide-react` to `dependencies`, no version conflicts.

- [ ] **Step 2: Verify install**

Run: `npm ls lucide-react`
Expected: prints a single resolved version, no UNMET PEER warnings.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lucide-react for hero icons"
```

---

## Task 2: Create `PillButton` primitive

**Files:**
- Create: `components/ui/PillButton.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/PillButton.tsx
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "white" | "dark";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  children: ReactNode;
  withArrow?: boolean;
};

const variants: Record<Variant, string> = {
  white: "bg-white text-primary-700 hover:bg-white/90",
  dark: "bg-primary-900 text-white hover:bg-primary-800",
};

export function PillButton({
  variant = "white",
  children,
  withArrow = true,
  className = "",
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      className={
        "group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-medium transition-colors " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 " +
        variants[variant] +
        " " +
        className
      }
    >
      <span>{children}</span>
      {withArrow && (
        <span
          className={
            "flex h-7 w-7 items-center justify-center rounded-full " +
            (variant === "white" ? "bg-primary-900 text-white" : "bg-white text-primary-900") +
            " transition-transform group-hover:translate-x-0.5"
          }
        >
          <ArrowRight size={14} strokeWidth={2.25} />
        </span>
      )}
    </a>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/ui/PillButton.tsx
git commit -m "feat(ui): add PillButton primitive"
```

---

## Task 3: Create `TrustBadge` primitive

**Files:**
- Create: `components/hero/TrustBadge.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/TrustBadge.tsx
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className?: string;
};

export function TrustBadge({ icon: Icon, label, sublabel, className = "" }: Props) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl border border-secondary-400/30 " +
        "bg-primary-800/70 px-4 py-2.5 shadow-lg backdrop-blur " +
        className
      }
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-secondary-400">
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{label}</span>
        {sublabel && <span className="text-xs text-white/50">{sublabel}</span>}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/TrustBadge.tsx
git commit -m "feat(hero): add TrustBadge primitive"
```

---

## Task 4: Create `SparkleField` decoration

**Files:**
- Create: `components/hero/SparkleField.tsx`
- Modify: `app/globals.css` (add `@keyframes twinkle`)

- [ ] **Step 1: Add the twinkle keyframe to `globals.css`**

Open `app/globals.css` and append at the end of the file (after the `body` rule):

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.85); }
  50%      { opacity: 0.7; transform: scale(1.1); }
}
```

- [ ] **Step 2: Create the component**

```tsx
// components/hero/SparkleField.tsx
const sparkles = [
  { top: "12%", left: "8%",  size: 14, delay: "0s"   },
  { top: "22%", left: "46%", size: 10, delay: "0.6s" },
  { top: "38%", left: "30%", size: 8,  delay: "1.2s" },
  { top: "55%", left: "5%",  size: 12, delay: "0.3s" },
  { top: "68%", left: "52%", size: 10, delay: "1.5s" },
  { top: "80%", left: "20%", size: 8,  delay: "0.9s" },
] as const;

export function SparkleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s, i) => (
        <svg
          key={i}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="absolute text-secondary-400"
          style={{
            top: s.top,
            left: s.left,
            animation: `twinkle 3.5s ease-in-out ${s.delay} infinite`,
          }}
        >
          <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 4: Commit**

```bash
git add components/hero/SparkleField.tsx app/globals.css
git commit -m "feat(hero): add SparkleField decoration"
```

---

## Task 5: Create `GlobeBackdrop` decoration

**Files:**
- Create: `components/hero/GlobeBackdrop.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/GlobeBackdrop.tsx
export function GlobeBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={"text-primary-300 opacity-20 " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="180" />
      <ellipse cx="200" cy="200" rx="180" ry="60" />
      <ellipse cx="200" cy="200" rx="180" ry="120" />
      <ellipse cx="200" cy="200" rx="60"  ry="180" />
      <ellipse cx="200" cy="200" rx="120" ry="180" />
      <line x1="20"  y1="200" x2="380" y2="200" />
      <line x1="200" y1="20"  x2="200" y2="380" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/GlobeBackdrop.tsx
git commit -m "feat(hero): add GlobeBackdrop wireframe SVG"
```

---

## Task 6: Create `HeroNav` (client component)

**Files:**
- Create: `components/hero/HeroNav.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/HeroNav.tsx
"use client";

import { useEffect, useState } from "react";
import { BarChart3, Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

const links = [
  { href: "#home",     label: "Home",     active: true  },
  { href: "#about",    label: "About",    active: false },
  { href: "#services", label: "Services", active: false },
  { href: "#partners", label: "Partners", active: false },
  { href: "#contact",  label: "Contact",  active: false },
];

export function HeroNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 top-6 z-20 mx-auto flex max-w-[1100px] items-center justify-between gap-8 rounded-full border border-primary-400/20 bg-primary-700/60 px-6 py-3 backdrop-blur-md"
    >
      <a href="#home" className="flex items-center gap-2 text-white">
        <BarChart3 size={20} className="text-secondary-400" />
        <span className="text-sm font-semibold tracking-wide">APP CONSULTANCY</span>
      </a>

      <ul className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              {l.active && <span className="text-secondary-400">•</span>}
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <PillButton href="#contact" variant="white">
          Book Consultation
        </PillButton>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-900 md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-x-0 top-full mt-3 rounded-2xl border border-primary-400/20 bg-primary-700/95 p-5 backdrop-blur md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-white/90 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <PillButton href="#contact" variant="white" className="w-full justify-center">
              Book Consultation
            </PillButton>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/HeroNav.tsx
git commit -m "feat(hero): add HeroNav with mobile drawer"
```

---

## Task 7: Create `HeroCopy`

**Files:**
- Create: `components/hero/HeroCopy.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/HeroCopy.tsx
import { PillButton } from "@/components/ui/PillButton";

export function HeroCopy() {
  return (
    <div className="max-w-xl">
      <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white lg:text-6xl">
        Your Vision, Our Mission —<br />
        Accounting &amp; Advisory You Can Trust
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-white/70">
        APP Consultancy delivers audit, tax, IFRS, and M&amp;A advisory built on
        20+ years of Big4 expertise — tailored for businesses operating in Vietnam.
      </p>

      <div className="mt-8">
        <PillButton href="#contact" variant="white">
          Get a Free Consultation
        </PillButton>
      </div>

      <div className="mt-16 h-px w-24 bg-secondary-400/30" />

      <p className="mt-6 font-medium text-white">
        Michael Pham — Partner (ACCA, VACPA)
      </p>
      <p className="mt-2 max-w-md text-sm italic text-white/60">
        “We help businesses navigate VAS, IFRS, tax compliance, and growth —
        all in one trusted partner.”
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/HeroCopy.tsx
git commit -m "feat(hero): add HeroCopy left column"
```

---

## Task 8: Create `HeroPortrait`

**Files:**
- Create: `components/hero/HeroPortrait.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/HeroPortrait.tsx
import Image from "next/image";
import { GraduationCap, BarChart2, Building2 } from "lucide-react";
import { GlobeBackdrop } from "./GlobeBackdrop";
import { TrustBadge } from "./TrustBadge";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[520px] items-end justify-center">
      <GlobeBackdrop className="absolute inset-0 m-auto h-[120%] w-[120%]" />

      <div
        className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-primary-400/30 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="relative z-10 aspect-[4/5] w-full overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 55%, black 55%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 50% 55%, black 55%, transparent 95%)",
        }}
      >
        <Image
          src="/images/partners/michael_2.jpg"
          alt="Michael Pham, Partner at APP Consultancy"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover object-top"
        />
      </div>

      <TrustBadge
        icon={GraduationCap}
        label="Ex-Big4 Partners"
        sublabel="KPMG · BDO · Mazars"
        className="absolute top-10 -right-2 z-20 hidden md:flex"
      />
      <TrustBadge
        icon={BarChart2}
        label="VAS & IFRS"
        sublabel="Expertise"
        className="absolute top-1/2 -left-6 z-20 hidden md:flex"
      />
      <TrustBadge
        icon={Building2}
        label="15+ Industries Served"
        sublabel="Manufacturing · F&B · Real Estate"
        className="absolute bottom-12 -right-10 z-20 hidden lg:flex"
      />

      <div className="mt-6 flex w-full flex-wrap justify-center gap-3 md:hidden">
        <TrustBadge icon={GraduationCap} label="Ex-Big4 Partners" />
        <TrustBadge icon={BarChart2} label="VAS & IFRS" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/HeroPortrait.tsx
git commit -m "feat(hero): add HeroPortrait with badges and globe"
```

---

## Task 9: Create `Hero` composer

**Files:**
- Create: `components/hero/Hero.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/hero/Hero.tsx
import { HeroNav } from "./HeroNav";
import { HeroCopy } from "./HeroCopy";
import { HeroPortrait } from "./HeroPortrait";
import { SparkleField } from "./SparkleField";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-primary-500"
    >
      <SparkleField />
      <HeroNav />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-32 pb-20 md:px-10 lg:flex-row lg:items-center lg:gap-12 lg:px-16 lg:pt-36">
        <div className="lg:w-3/5">
          <HeroCopy />
        </div>
        <div className="mt-12 lg:mt-0 lg:w-2/5">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/hero/Hero.tsx
git commit -m "feat(hero): add Hero composer"
```

---

## Task 10: Wire `Hero` into the page + update metadata

**Files:**
- Modify: `app/page.tsx` (full rewrite)
- Modify: `app/layout.tsx` (metadata only)

- [ ] **Step 1: Rewrite `app/page.tsx`**

Replace the entire contents of `app/page.tsx` with:

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

- [ ] **Step 2: Update `app/layout.tsx` metadata**

Find the `metadata` export in `app/layout.tsx` and replace it with:

```tsx
export const metadata: Metadata = {
  title: "APP Consultancy — Accounting, Tax & Advisory in Vietnam",
  description:
    "APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on 20+ years of Big4 expertise — tailored for businesses operating in Vietnam.",
};
```

(Leave the rest of `layout.tsx` — fonts, html/body structure — unchanged.)

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build completes successfully with no errors. Warnings about image optimization for a local `.jpg` are acceptable.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat(home): replace placeholder with Hero section"
```

---

## Task 11: Visual verification in dev server

**Files:** (no code changes)

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: server boots on http://localhost:3000 with no compile errors.

- [ ] **Step 2: Verify at 1440×900 (desktop)**

Open http://localhost:3000 in a browser, set viewport to 1440×900. Confirm:
- Pill nav is centered at top, logo on left, 5 links + "Book Consultation" button on right.
- "Home" link has a gold dot prefix.
- H1 reads "Your Vision, Our Mission — Accounting & Advisory You Can Trust" on the left.
- Subhead and "Get a Free Consultation →" pill button appear below.
- Divider + "Michael Pham — Partner (ACCA, VACPA)" + italic quote appear lower-left.
- Michael's portrait is on the right, fading at the edges into the navy background.
- Three floating badges visible around the portrait.
- Gold sparkles twinkling subtly in the background.

- [ ] **Step 3: Verify at 1024×768 (tablet)**

Resize to 1024×768. Confirm:
- 2-column layout still holds, padding tighter.
- All 3 badges still visible.

- [ ] **Step 4: Verify at 768×1024 (small tablet)**

Resize to 768×1024. Confirm:
- Layout stacks vertically (copy above, portrait below).
- Mobile inline badges (2 of them) appear under the portrait.
- Floating badges hidden.

- [ ] **Step 5: Verify at 375×812 (mobile)**

Resize to 375×812. Confirm:
- Stacked layout.
- Hamburger menu replaces nav links. Tap opens a drawer with all 5 links + "Book Consultation" button. Tap a link or press Escape closes the drawer.
- 2 inline badges under the portrait.

- [ ] **Step 6: If anything is visually broken**

Do NOT commit. Report the specific viewport + issue back to the human reviewer. Common adjustment points are paddings in `Hero.tsx` and badge positions in `HeroPortrait.tsx`.

- [ ] **Step 7: If everything verifies**

No commit needed for this task (verification only). Report success.

---

## Self-Review Notes (already applied)

- Spec §1 goals → Tasks 7 (copy), 8 (portrait), 9 (composition), 10 (wiring).
- Spec §3 layout → Task 9 (grid), Task 4 (sparkles), Task 5 (globe).
- Spec §4 nav → Task 6.
- Spec §5 copy block → Task 7.
- Spec §6 portrait + badges → Tasks 3, 8.
- Spec §7 component file plan → Tasks 2–9 produce exactly those files (no `globe.svg` asset because `GlobeBackdrop` is inline SVG; no `michael_2.png` because the portrait uses `.jpg` + radial mask, as noted upfront).
- Spec §8 tokens → all uses (`primary-500`, `primary-700`, `primary-800`, `primary-400`, `secondary-400`, `white/*`) come from existing `globals.css` and `@theme inline` block.
- Spec §9 accessibility → `aria-label="Hero"` (Task 9), `aria-hidden` decoratives (Tasks 4, 5), portrait alt (Task 8), nav semantics + Escape handler + focus rings (Tasks 6, 2).
- Spec §10 follow-ups → portrait fallback documented in plan preamble; logo placeholder is `BarChart3` (Task 6); link destinations are `#anchor` placeholders (Task 6).
- Spec §11 done criteria → Tasks 10 (lint, build) and 11 (visual at 4 widths).
