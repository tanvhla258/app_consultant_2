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
