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
