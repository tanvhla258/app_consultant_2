// lib/site.ts — single source of truth for SEO / site-wide constants.
// Override the URL per-environment with NEXT_PUBLIC_SITE_URL (e.g. on Vercel).

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://appglobal.com.vn")
).replace(/\/$/, "");

export const SITE = {
  name: "APP Consultancy",
  legalName: "APP Consulting Company Limited",
  title: "APP Consultancy — Accounting, Tax & Advisory in Vietnam",
  description:
    "APP Consultancy delivers audit, tax, IFRS, and M&A advisory built on 20+ years of Big4 expertise — tailored for businesses operating in Vietnam.",
  locale: "en_US",
  altLocale: "vi_VN",
  keywords: [
    "APP Consultancy",
    "accounting firm Vietnam",
    "audit services Ho Chi Minh City",
    "tax advisory Vietnam",
    "IFRS conversion",
    "M&A advisory",
    "financial statements audit",
    "Big4 expertise",
    "kiểm toán",
    "tư vấn thuế",
    "dịch vụ kế toán",
  ],
  // NAP — keep in sync with docs/requirement.md and the Contact section.
  contact: {
    phone: "+84 909 121 045",
    email: "toandhnh@gmail.com",
    streetAddress:
      "14th Floor, HM Town Building, 412 Nguyen Thi Minh Khai, Ward 05, District 3",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
} as const;
