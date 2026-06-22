# Testimonials Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement section 06 "Testimonials" — a centered headline + 4-card industry-spanning testimonial grid — wired into the home page with EN + VI i18n.

**Architecture:** Three small presentational components (`TestimonialsSection`, `TestimonialsHeadline`, `TestimonialCard`) backed by a typed `data/testimonials.ts`. Pattern mirrors existing `components/trust/`. No carousel, no JS — all server-rendered. Avatars rendered as inline initials-on-color SVG (no fake stock photos, no AI faces).

**Tech Stack:** Next.js 16, React 19, TailwindCSS v4, TypeScript, `lucide-react` (already a dependency), existing `useLang()` hook from `lib/i18n/`.

**Note on verification:** This project has no test runner (per `CLAUDE.md`). "Verify" steps below use `npm run lint`, `npx tsc --noEmit`, and manual visual check via `npm run dev` at `http://localhost:3000`.

---

## File Structure

**Create:**
- `components/testimonials/data/testimonials.ts` — typed `TESTIMONIALS` array (4 entries)
- `components/testimonials/TestimonialCard.tsx` — presentational card
- `components/testimonials/TestimonialsHeadline.tsx` — centered split-accent H2
- `components/testimonials/TestimonialsSection.tsx` — section wrapper + grid

**Modify:**
- `lib/i18n/en.json` — add `testimonials.*` keys
- `lib/i18n/vi.json` — add `testimonials.*` keys
- `app/page.tsx` — mount `<TestimonialsSection />`

No public/image files are added in this PR — avatars are inline SVG initials components (deferred-photo strategy per spec §8).

---

## Task 1: Add i18n keys (EN + VI)

**Files:**
- Modify: `lib/i18n/en.json`
- Modify: `lib/i18n/vi.json`

- [ ] **Step 1: Add EN keys**

Open `lib/i18n/en.json`. After the last existing block (likely `trust.*` group), insert before the closing `}`:

```json
,

  "testimonials.heading": "Hear What Our Clients Say About Our",
  "testimonials.heading_accent": "Accounting Services",

  "testimonials.role.cfo": "CFO",
  "testimonials.role.founder": "Founder",
  "testimonials.role.managing_director": "Managing Director",
  "testimonials.role.head_of_finance": "Head of Finance",

  "testimonials.mfg.quote": "APP's team rebuilt our VAS → IFRS conversion process from scratch. Audit went from a six-week scramble to two weeks.",
  "testimonials.fnb.quote": "Payroll and tax filing have been flawless through three rounds of expansion. We just don't think about it anymore.",
  "testimonials.realestate.quote": "Their financial due diligence caught two issues we'd have missed. Saved us a deal we'd have regretted.",
  "testimonials.tech.quote": "Transfer pricing documentation done right and on deadline — three years running. Worth every dong."
```

- [ ] **Step 2: Add VI keys**

Open `lib/i18n/vi.json`. Insert at the same position with VI translations:

```json
,

  "testimonials.heading": "Khách hàng nói gì về dịch vụ",
  "testimonials.heading_accent": "Kế toán của chúng tôi",

  "testimonials.role.cfo": "Giám đốc Tài chính",
  "testimonials.role.founder": "Người sáng lập",
  "testimonials.role.managing_director": "Tổng Giám đốc",
  "testimonials.role.head_of_finance": "Trưởng phòng Tài chính",

  "testimonials.mfg.quote": "Đội APP đã xây lại quy trình chuyển VAS → IFRS cho chúng tôi từ đầu. Kiểm toán từ sáu tuần chạy nước rút giảm còn hai tuần.",
  "testimonials.fnb.quote": "Tính lương và khai thuế trôi chảy suốt ba lần mở rộng. Chúng tôi không còn phải bận tâm nữa.",
  "testimonials.realestate.quote": "Thẩm định tài chính của họ phát hiện hai vấn đề chúng tôi đã bỏ sót. Cứu được một thương vụ mà chúng tôi đã hối hận nếu chốt.",
  "testimonials.tech.quote": "Hồ sơ chuyển giá làm đúng và đúng hạn — ba năm liên tiếp. Đáng từng đồng."
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('lib/i18n/en.json','utf8')); JSON.parse(require('fs').readFileSync('lib/i18n/vi.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/en.json lib/i18n/vi.json
git commit -m "feat(i18n): add EN + VI keys for Testimonials section"
```

---

## Task 2: Create typed testimonials data

**Files:**
- Create: `components/testimonials/data/testimonials.ts`

- [ ] **Step 1: Write the data file**

Create `components/testimonials/data/testimonials.ts`:

```ts
// PLACEHOLDER CONTENT — names, companies and quotes are fictional, mapped to APP's
// actual Client Area industries (Manufacturing, F&B, Real Estate, IT). Replace with
// real client testimonials (with consent) before any production launch.

export type Testimonial = {
  id: "mfg" | "fnb" | "realestate" | "tech";
  quoteKey: string;
  name: string;
  roleKey: string;
  company: string;
  initials: string; // 2-letter avatar fallback (uppercase)
  accent: string;   // tailwind bg utility for avatar background
  alt: string;      // EN alt text — proper noun, not translated
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "mfg",
    quoteKey: "testimonials.mfg.quote",
    name: "Linh Nguyen",
    roleKey: "testimonials.role.cfo",
    company: "Saigon Industrial JSC",
    initials: "LN",
    accent: "bg-primary-500",
    alt: "Linh Nguyen, CFO at Saigon Industrial JSC",
  },
  {
    id: "fnb",
    quoteKey: "testimonials.fnb.quote",
    name: "Minh Tran",
    roleKey: "testimonials.role.founder",
    company: "Phở Hanoi Group",
    initials: "MT",
    accent: "bg-secondary-400",
    alt: "Minh Tran, Founder at Phở Hanoi Group",
  },
  {
    id: "realestate",
    quoteKey: "testimonials.realestate.quote",
    name: "Hoang Le",
    roleKey: "testimonials.role.managing_director",
    company: "Mekong Property Partners",
    initials: "HL",
    accent: "bg-primary-700",
    alt: "Hoang Le, Managing Director at Mekong Property Partners",
  },
  {
    id: "tech",
    quoteKey: "testimonials.tech.quote",
    name: "Anh Pham",
    roleKey: "testimonials.role.head_of_finance",
    company: "Vela Technologies",
    initials: "AP",
    accent: "bg-secondary-700",
    alt: "Anh Pham, Head of Finance at Vela Technologies",
  },
] as const;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors related to this file. (Pre-existing errors in unrelated files are acceptable but note them.)

- [ ] **Step 3: Commit**

```bash
git add components/testimonials/data/testimonials.ts
git commit -m "feat(testimonials): add typed testimonials data with placeholder content"
```

---

## Task 3: Create TestimonialCard presentational component

**Files:**
- Create: `components/testimonials/TestimonialCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { Quote } from "lucide-react";
import { useLang } from "@/lib/i18n/useLang";
import type { Testimonial } from "./data/testimonials";

type Props = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: Props) {
  const { t } = useLang();

  return (
    <article
      className="flex h-full flex-col gap-5 rounded-3xl border border-primary-100 bg-surface p-6 lg:p-7 shadow-[0_8px_30px_rgba(11,37,69,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(11,37,69,0.10)]"
      aria-label={testimonial.alt}
    >
      <Quote className="h-7 w-7 text-secondary-400" aria-hidden="true" />

      <p className="text-sm leading-relaxed text-primary-700/80">
        &ldquo;{t(testimonial.quoteKey)}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${testimonial.accent}`}
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary-700">
            {testimonial.name}
          </span>
          <span className="text-xs text-primary-700/60">
            {t(testimonial.roleKey)} · {testimonial.company}
          </span>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors related to this file.

- [ ] **Step 3: Commit**

```bash
git add components/testimonials/TestimonialCard.tsx
git commit -m "feat(testimonials): add TestimonialCard presentational component"
```

---

## Task 4: Create TestimonialsHeadline component

**Files:**
- Create: `components/testimonials/TestimonialsHeadline.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useLang } from "@/lib/i18n/useLang";

export function TestimonialsHeadline() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2
        id="testimonials-heading"
        className="text-3xl font-semibold leading-tight text-primary-700 md:text-4xl lg:text-5xl"
      >
        {t("testimonials.heading")}
        <br />
        <span className="text-secondary-400">
          {t("testimonials.heading_accent")}
        </span>
      </h2>
    </div>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/testimonials/TestimonialsHeadline.tsx
git commit -m "feat(testimonials): add TestimonialsHeadline with split-accent heading"
```

---

## Task 5: Create TestimonialsSection wrapper

**Files:**
- Create: `components/testimonials/TestimonialsSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialsHeadline } from "./TestimonialsHeadline";
import { TESTIMONIALS } from "./data/testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <TestimonialsHeadline />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
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
git add components/testimonials/TestimonialsSection.tsx
git commit -m "feat(testimonials): add TestimonialsSection wrapper with responsive grid"
```

---

## Task 6: Mount in app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read current page**

Run: `cat app/page.tsx`
Note where existing sections are mounted (Hero, About, Services, Trust). The new section mounts after `<TrustSection />` if present, otherwise after `<ServicesSection />`.

- [ ] **Step 2: Add the import and mount**

Add to the imports block:

```tsx
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
```

Inside `<main>`, place `<TestimonialsSection />` after the last existing section. Example final structure:

```tsx
<main className="flex-1">
  <Hero />
  <AboutSection />
  <ServicesSection />
  <TrustSection />              {/* if present */}
  <TestimonialsSection />
</main>
```

If `<TrustSection />` is NOT yet on `main` at integration time, place `<TestimonialsSection />` directly after `<ServicesSection />` and add a one-line `// TODO: reorder after TrustSection lands` comment.

- [ ] **Step 3: Type-check + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(testimonials): mount TestimonialsSection on home page"
```

---

## Task 7: Visual verification + final polish

**Files:** none modified unless issues found.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Verify EN render**

Scroll to the testimonials section. Confirm:
- Headline reads "Hear What Our Clients Say About Our" with "Accounting Services" on a new line in gold.
- 4 cards visible at desktop width (≥1024px): single row.
- 2×2 grid at tablet width (640–1023px).
- 1 col stacked at mobile width (<640px).
- Each card shows: gold quote icon, italic-style body (rendered straight, with smart quotes), initials avatar in a colored circle, name + role + company.

- [ ] **Step 3: Verify VI render**

Toggle language to VI via the existing en/vi switcher. Confirm:
- Headline + 4 quote bodies switch to VI.
- Names + companies remain unchanged (proper nouns).
- Roles translate ("CFO" → "Giám đốc Tài chính", etc.).

- [ ] **Step 4: Verify accessibility**

In browser devtools, run a quick a11y audit (Lighthouse or Axe). Confirm:
- No "missing aria-label" violation on cards.
- Section landmark is reachable via heading navigation (`testimonials-heading`).
- Color contrast on body text passes WCAG AA.

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: Build completes with no errors. Warnings about pre-existing code are acceptable; warnings about new testimonials files are not.

- [ ] **Step 6: Final commit if any fixups needed**

If any fixes were made during verification:

```bash
git add -p
git commit -m "fix(testimonials): <describe fix>"
```

If no fixes needed, skip this step.

---

## Task 8: Push branch

- [ ] **Step 1: Push to remote**

```bash
git push -u origin worktree-feat+testimonials-section
```

- [ ] **Step 2: Report PR-ready status to the user**

End with a message stating that the branch is pushed and ready for the user to open a PR (or that the user can request the agent to open the PR explicitly — do not open one automatically per the project's git safety rules).
