# Testimonials Section — Design Spec

**Date:** 2026-06-22
**Section:** 06 — Testimonials
**Visual reference:** `public/images/sections/06-testimonials.webp`
**Content source:** `docs/requirement.md` (Our Client Area sectors). All testimonial bodies, names, and company names are fictional placeholders representative of APP's client industries — to be replaced with real client quotes when consent is obtained.

---

## 1. Goal

Replace the static reference image with a working "Testimonials" section: a centered headline followed by a row of four quote cards. Each card represents a different client industry from APP's actual Client Area list (Manufacturing, F&B, Real Estate, Tech/IT) — giving the section credibility breadth even with placeholder content.

Section ships with full EN and VI copy in the same PR.

## 2. Scope

In scope:
- New section component tree under `components/testimonials/`.
- Typed testimonials data file referencing i18n keys + avatar paths.
- Mount the section under `TrustSection` in `app/page.tsx`.
- EN + VI i18n keys added to `lib/i18n/en.json` and `lib/i18n/vi.json`.
- Section follows the layout container convention from `CLAUDE.md`.
- Placeholder avatars: static files under `public/images/testimonials/` (4 files), OR a documented fallback to a single generic silhouette if specific avatars are not yet available.

Out of scope:
- Carousel / slider — 4 static cards is enough for this iteration. The template arrows in `06-testimonials.webp` are NOT replicated.
- Card hover animations beyond a subtle shadow lift.
- Linking cards to case studies or detail pages.
- Star ratings.
- Real client-sourced quotes (will replace placeholders in a future PR once consent is obtained).

## 3. Content (final, EN)

### Headline (split-accent, mirrors `TrustHeadline`)
- Base: "Hear What Our Clients Say About Our"
- Accent (gold, new line): "Accounting Services"

### Four testimonial cards (in this order)

| # | id          | Industry         | Name              | Role               | Company                  | Quote                                                                                                                  |
|---|-------------|------------------|-------------------|--------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------|
| 1 | `mfg`       | Manufacturing    | Linh Nguyen       | CFO                | Saigon Industrial JSC    | "APP's team rebuilt our VAS → IFRS conversion process from scratch. Audit went from a six-week scramble to two weeks." |
| 2 | `fnb`       | F&B / Restaurant | Minh Tran         | Founder            | Phở Hanoi Group          | "Payroll and tax filing have been flawless through three rounds of expansion. We just don't think about it anymore."   |
| 3 | `realestate`| Real Estate      | Hoang Le          | Managing Director  | Mekong Property Partners | "Their financial due diligence caught two issues we'd have missed. Saved us a deal we'd have regretted."               |
| 4 | `tech`      | Tech / IT        | Anh Pham          | Head of Finance    | Vela Technologies        | "Transfer pricing documentation done right and on deadline — three years running. Worth every dong."                   |

### Provenance / disclaimer
- Industries map directly to "Our Client Area" sectors in `requirement.md` (Manufacturing, F&B, Real Estate, Information Technology).
- Names and companies are **fictional**. A code comment in `components/testimonials/data/testimonials.ts` will mark these as placeholders awaiting real client consent.
- Quote wording is generic and conservative — no specific numbers (revenue, savings) that could mislead.

## 4. Content (final, VI)

VI strings translated at implementation time; brand-style names left as-is (Vietnamese names render correctly in both). Industry framing preserved.

Draft VI strings:

- `testimonials.heading`: "Khách hàng nói gì về dịch vụ"
- `testimonials.heading_accent`: "Kế toán của chúng tôi"
- Card 1 — quote: "Đội APP đã xây lại quy trình chuyển VAS → IFRS cho chúng tôi từ đầu. Kiểm toán từ sáu tuần chạy nước rút giảm còn hai tuần."
- Card 2 — quote: "Tính lương và khai thuế trôi chảy suốt ba lần mở rộng. Chúng tôi không còn phải bận tâm nữa."
- Card 3 — quote: "Thẩm định tài chính của họ phát hiện hai vấn đề chúng tôi đã bỏ sót. Cứu được một thương vụ mà chúng tôi đã hối hận nếu chốt."
- Card 4 — quote: "Hồ sơ chuyển giá làm đúng và đúng hạn — ba năm liên tiếp. Đáng từng đồng."
- Roles/titles translated: CFO → "Giám đốc Tài chính"; Founder → "Người sáng lập"; Managing Director → "Tổng Giám đốc"; Head of Finance → "Trưởng phòng Tài chính".

## 5. Architecture

### Component tree

```
components/testimonials/
  TestimonialsSection.tsx     // section wrapper, headline + grid
  TestimonialsHeadline.tsx    // centered split-accent H2
  TestimonialCard.tsx         // presentational: quote icon, body, avatar row
  data/
    testimonials.ts           // typed array of 4 entries
```

### Data shape

```ts
export type Testimonial = {
  id: "mfg" | "fnb" | "realestate" | "tech";
  quoteKey: string;            // e.g. "testimonials.mfg.quote"
  name: string;                // literal — proper names not translated
  roleKey: string;             // e.g. "testimonials.role.cfo"
  company: string;             // literal
  avatar: string;              // e.g. "/images/testimonials/linh.webp"
  alt: string;                 // accessibility label, EN — VI version not needed (decorative)
};

export const TESTIMONIALS: readonly Testimonial[] = [ /* 4 entries */ ] as const;
```

### Why the data file
Matches `services/data/services.ts` and `trust/data/pillars.ts` patterns: ordering + ids + avatars + i18n keys in one place.

## 6. Layout & styling

### Section wrapper (TestimonialsSection.tsx)
- `<section id="testimonials" aria-labelledby="testimonials-heading" className="bg-white py-24 lg:py-32">`
- Inner container: `mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16` (CLAUDE.md rule).
- Inside: `<TestimonialsHeadline />`, then the grid.

### Grid
- `grid gap-6 lg:gap-8`
- Mobile: `grid-cols-1`
- Tablet (`md:`): `grid-cols-2` (2×2)
- Desktop (`lg:`): `grid-cols-4` (single row)
- `mt-14 lg:mt-16` below headline.

### Card (TestimonialCard.tsx)
- Outer: `flex h-full flex-col gap-5 rounded-3xl border border-primary-100 bg-surface p-6 lg:p-7 shadow-[0_8px_30px_rgba(11,37,69,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(11,37,69,0.10)]`
- Quote mark icon: `<Quote className="h-7 w-7 text-secondary-400" aria-hidden="true" />` from lucide-react.
- Body: `<p className="text-sm leading-relaxed text-primary-700/80">"{quote}"</p>`
- Footer row: `flex items-center gap-3 mt-auto`
  - Avatar: `<Image>` 40×40, `rounded-full object-cover`, `priority={false}`.
  - Name + role/company stack: `flex flex-col`; name `text-sm font-semibold text-primary-700`; role+company `text-xs text-primary-700/60`.

### Headline (TestimonialsHeadline.tsx)
- Centered: `text-center mx-auto max-w-3xl`.
- H2: `id="testimonials-heading"`, `text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary-700`. Accent span: `text-secondary-400`, forced to a new line via `<br />`.
- No eyebrow, no subhead (per template).

## 7. i18n

Keys added to both `lib/i18n/en.json` and `lib/i18n/vi.json` in the same PR:

```
testimonials.heading
testimonials.heading_accent

testimonials.role.cfo
testimonials.role.founder
testimonials.role.managing_director
testimonials.role.head_of_finance

testimonials.mfg.quote
testimonials.fnb.quote
testimonials.realestate.quote
testimonials.tech.quote
```

Names and company strings are NOT translated — they're proper nouns.

All consumers use `useLang().t(key)`.

## 8. Avatars

- 4 placeholder avatar files under `public/images/testimonials/` (e.g. `linh.webp`, `minh.webp`, `hoang.webp`, `anh.webp`).
- If real headshots not available at implementation time, use neutral generic illustrations (initials on colored circle, generated via simple inline SVG component) rather than fake stock photos — avoids the misleading "stock-photo testimonial" pattern.
- Decision deferred to implementer; document choice in commit message.

## 9. Accessibility

- Section labelled by `testimonials-heading`.
- Quote icons `aria-hidden="true"` — the visible quote marks in body text carry meaning.
- Avatar `alt` describes the person ("Linh Nguyen, CFO at Saigon Industrial JSC"); avoid empty alt since the avatar is paired with text.
- No interactive elements; no focus styles required.

## 10. Mounting

`app/page.tsx` after the trust section:

```tsx
<TrustSection />
<TestimonialsSection />
```

If `<TrustSection />` is not yet on `main` at integration time, mount directly after `<ServicesSection />` and leave a TODO referencing the trust PR.

## 11. Risks / notes

- **Placeholder content risk**: testimonials with fake names risk a credibility hit if shipped to production without a clear disclaimer. Mitigation: hold this section behind a feature flag OR replace placeholders with real client quotes before merge to `main`. Decision deferred to project owner.
- **Avatar realism**: do not use AI-generated faces or stock photos — feels deceptive. Use initials/illustrations until real headshots exist.
- **No carousel**: deliberate. If 4 cards becomes 8+ in future iterations, revisit and consider a horizontal scroll on mobile.
- Lucide `Quote` icon — already a dependency.
