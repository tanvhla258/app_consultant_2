# Availability Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement section 08 "Availability / Consultation Support" — a left-aligned headline + subhead, then a 2-column row (hero photo + blue "Consultation Hours" card with mailto CTA to Christ Vo).

**Architecture:** Three presentational components (`AvailabilitySection`, `AvailabilityHeadline`, `HoursCard`) backed by `data/hours.ts` holding the 3-row schedule and the mailto URL constant. Pattern mirrors existing sections. Hero image reuses `public/images/sections/08-availability.webp`.

**Tech Stack:** Next.js 16, React 19, TailwindCSS v4, TypeScript, `next/image`, `lucide-react` (`Pin`, `ArrowRight`), existing `useLang()` hook.

**Note on verification:** No test runner. "Verify" steps use `npm run lint`, `npx tsc --noEmit`, and manual visual check via `npm run dev` at `http://localhost:3000`.

---

## File Structure

**Create:**
- `components/availability/data/hours.ts` — typed 3-row schedule + `APPOINTMENT_MAILTO` constant
- `components/availability/HoursCard.tsx` — blue card with schedule + CTA
- `components/availability/AvailabilityHeadline.tsx` — left-aligned headline + right-side subhead
- `components/availability/AvailabilitySection.tsx` — section wrapper + 2-col row

**Modify:**
- `lib/i18n/en.json` — add `availability.*` keys
- `lib/i18n/vi.json` — add `availability.*` keys
- `app/page.tsx` — mount `<AvailabilitySection />`
- (Possibly) `app/globals.css` and `lib/theme.ts` — add `--color-cta-blue` token if not present

---

## Task 1: Add i18n keys (EN + VI)

**Files:**
- Modify: `lib/i18n/en.json`
- Modify: `lib/i18n/vi.json`

- [ ] **Step 1: Add EN keys**

Open `lib/i18n/en.json`. Insert before the closing `}`:

```json
,

  "availability.heading": "We're Available All Week for",
  "availability.heading_accent": "Flexible Consultation Support",
  "availability.subheading": "Get expert financial guidance at the time that works best for you.",

  "availability.card.title": "Consultation Hours",
  "availability.card.subtitle": "We're available throughout the week and ready to assist with flexible consultation times.",

  "availability.row.mon_fri.day": "Monday – Friday",
  "availability.row.mon_fri.hours": "08:30 – 17:30",
  "availability.row.sat.day": "Saturday",
  "availability.row.sat.hours": "08:30 – 12:00",
  "availability.row.sun.day": "Sunday",
  "availability.row.sun.hours": "Closed",

  "availability.cta": "Get Appointment"
```

- [ ] **Step 2: Add VI keys**

Open `lib/i18n/vi.json`. Insert at the same position:

```json
,

  "availability.heading": "Chúng tôi luôn sẵn sàng tư vấn",
  "availability.heading_accent": "Linh hoạt theo lịch của bạn",
  "availability.subheading": "Nhận tư vấn tài chính chuyên môn vào thời điểm phù hợp nhất với bạn.",

  "availability.card.title": "Giờ Tư Vấn",
  "availability.card.subtitle": "Chúng tôi sẵn sàng phục vụ suốt tuần với lịch tư vấn linh hoạt.",

  "availability.row.mon_fri.day": "Thứ Hai – Thứ Sáu",
  "availability.row.mon_fri.hours": "08:30 – 17:30",
  "availability.row.sat.day": "Thứ Bảy",
  "availability.row.sat.hours": "08:30 – 12:00",
  "availability.row.sun.day": "Chủ Nhật",
  "availability.row.sun.hours": "Nghỉ",

  "availability.cta": "Đặt Lịch Hẹn"
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); JSON.parse(require('fs').readFileSync('lib/i18n/vi.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/en.json lib/i18n/vi.json
git commit -m "feat(i18n): add EN + VI keys for Availability section"
```

---

## Task 2: Verify or add CTA blue token

**Files (potentially):**
- Modify: `app/globals.css`
- Modify: `lib/theme.ts`

- [ ] **Step 1: Check whether a CTA blue token already exists**

Run: `grep -E 'cta|blue|2A4BFF|2a4bff|2845|2A40' app/globals.css lib/theme.ts`
Look for any custom blue token. If a token like `--color-cta-blue`, `--color-blue`, `colors.cta`, or `colors.blue` already exists, **use it as-is** and skip to Task 3.

- [ ] **Step 2: If absent — add the token to globals.css**

Open `app/globals.css`. Inside the existing `:root` block (where other brand tokens like `--color-primary-700` live), add:

```css
  --color-cta-blue: #2A4BFF;
  --color-cta-blue-700: #1F38C6;
```

Also re-export it via `@theme inline`:

```css
@theme inline {
  /* …existing tokens… */
  --color-cta-blue: var(--color-cta-blue);
  --color-cta-blue-700: var(--color-cta-blue-700);
}
```

- [ ] **Step 3: If absent — mirror to lib/theme.ts**

Open `lib/theme.ts`. In the `colors` object, add (matching the existing palette structure):

```ts
ctaBlue: {
  500: "#2A4BFF",
  700: "#1F38C6",
},
```

This keeps `globals.css` and `lib/theme.ts` in sync per `CLAUDE.md`.

- [ ] **Step 4: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 5: Commit (only if token was added)**

```bash
git add app/globals.css lib/theme.ts
git commit -m "feat(theme): add CTA blue token for Availability section"
```

If no changes were made because the token already existed, skip this commit.

---

## Task 3: Create typed hours data

**Files:**
- Create: `components/availability/data/hours.ts`

- [ ] **Step 1: Write the data file**

```ts
export type ScheduleRow = {
  id: "mon_fri" | "sat" | "sun";
  dayKey: string;
  hoursKey: string;
};

export const HOURS: readonly ScheduleRow[] = [
  { id: "mon_fri", dayKey: "availability.row.mon_fri.day", hoursKey: "availability.row.mon_fri.hours" },
  { id: "sat",     dayKey: "availability.row.sat.day",     hoursKey: "availability.row.sat.hours"     },
  { id: "sun",     dayKey: "availability.row.sun.day",     hoursKey: "availability.row.sun.hours"     },
] as const;

export const APPOINTMENT_MAILTO =
  "mailto:cvo@app.com?subject=Appointment%20Request%20%E2%80%94%20APP%20Consultancy";
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/availability/data/hours.ts
git commit -m "feat(availability): add typed hours data and appointment mailto constant"
```

---

## Task 4: Create HoursCard component

**Files:**
- Create: `components/availability/HoursCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/availability/HoursCard.tsx
git commit -m "feat(availability): add HoursCard with schedule and mailto CTA"
```

---

## Task 5: Create AvailabilityHeadline component

**Files:**
- Create: `components/availability/AvailabilityHeadline.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";

export function AvailabilityHeadline() {
  const { t } = useLang();

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
      <h2
        id="availability-heading"
        className="text-3xl font-semibold leading-tight text-primary-700 md:text-4xl lg:text-5xl"
      >
        {t("availability.heading")}
        <br />
        <span className="text-secondary-400">
          {t("availability.heading_accent")}
        </span>
      </h2>
      <p className="text-base text-primary-700/70 lg:text-lg">
        {t("availability.subheading")}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/availability/AvailabilityHeadline.tsx
git commit -m "feat(availability): add AvailabilityHeadline with split-accent heading"
```

---

## Task 6: Create AvailabilitySection wrapper

**Files:**
- Create: `components/availability/AvailabilitySection.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import { AvailabilityHeadline } from "./AvailabilityHeadline";
import { HoursCard } from "./HoursCard";

export function AvailabilitySection() {
  return (
    <section
      id="availability"
      aria-labelledby="availability-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <AvailabilityHeadline />

        <div className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-full">
            <Image
              src="/images/sections/08-availability.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <HoursCard />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/availability/AvailabilitySection.tsx
git commit -m "feat(availability): add AvailabilitySection with hero image and HoursCard"
```

---

## Task 7: Mount in app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read current page**

Run: `cat app/page.tsx`
`<AvailabilitySection />` mounts as the LAST section, after `<TeamSection />` if present, otherwise after the last existing section.

- [ ] **Step 2: Add the import and mount**

Add to imports:

```tsx
import { AvailabilitySection } from "@/components/availability/AvailabilitySection";
```

Add inside `<main>` at the bottom of the section stack:

```tsx
<TeamSection />            {/* if present */}
<AvailabilitySection />
```

If `<TeamSection />` is not yet on `main` at integration time, mount directly after the last existing section and add `// TODO: position after Team section once it lands`.

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(availability): mount AvailabilitySection on home page"
```

---

## Task 8: Visual verification

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Verify EN render**

Scroll to the availability section. Confirm:
- Headline "We're Available All Week for" with "Flexible Consultation Support" on a new line in gold, left-aligned.
- Subhead in the right column at desktop, stacked below on mobile.
- Below: 2 columns — hero image on left (`08-availability.webp`), blue card on right.
- Blue card: pin icon in a translucent white chip, "Consultation Hours" title, subtitle, 3 schedule rows separated by faint dividers, "Get Appointment" white pill button with arrow at the bottom.
- Hours read: Mon–Fri 08:30–17:30, Sat 08:30–12:00, Sun Closed.

- [ ] **Step 3: Verify CTA click**

Click "Get Appointment". Expected: the browser prompts to open the default mail client with `cvo@app.com` pre-filled and the subject "Appointment Request — APP Consultancy". On machines without a mail client this opens nothing — that's acceptable per spec §10.

- [ ] **Step 4: Verify VI render**

Toggle to VI. Confirm:
- Headline, subhead, card title/subtitle, day labels, "Nghỉ", and CTA "Đặt Lịch Hẹn" all translate.
- Hours strings stay numeric (no translation needed).

- [ ] **Step 5: Verify responsive behavior**

Resize the browser:
- Below 1024px: hero image and blue card stack vertically. Image keeps 4:3 aspect.
- At/above 1024px: side-by-side, blue card height matches image height (no big whitespace gap).

- [ ] **Step 6: Accessibility check**

In devtools, run Lighthouse / Axe. Confirm:
- Hero image has empty alt (decorative) and is not flagged as missing alt — Next.js Image with `alt=""` is correct.
- Pin icon is hidden from AT.
- White-on-blue text contrast passes WCAG AA. If `text-white/80` for the subtitle fails, bump to `text-white/90`.
- Pill CTA has visible focus ring (Tailwind default + browser default should suffice; if not, add `focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cta-blue)]`).

- [ ] **Step 7: Build check**

Run: `npm run build`
Expected: Build completes with no errors related to availability files.

- [ ] **Step 8: Commit any fixups**

```bash
git add -p
git commit -m "fix(availability): <describe fix>"
```

Skip if no fixes needed.

---

## Task 9: Push branch

- [ ] **Step 1: Push**

```bash
git push -u origin worktree-feat+availability-section
```

- [ ] **Step 2: Report PR-ready status**

End by telling the user the branch is pushed and PR-ready. Do not open a PR automatically per the project's git safety rules — wait for explicit ask.
