import { Award, Clock, Lightbulb, ShieldCheck, type LucideIcon } from "lucide-react";

export type TrustPillarId = "success" | "expertise" | "timely" | "transparent";

export type TrustPillar = {
  id: TrustPillarId;
  icon: LucideIcon;
  titleKey: `trust.${TrustPillarId}.title`;
  bulletKeys: ReadonlyArray<`trust.${TrustPillarId}.bullet_${1 | 2}`>;
};

export const trustPillars: ReadonlyArray<TrustPillar> = [
  {
    id: "success",
    icon: Award,
    titleKey: "trust.success.title",
    bulletKeys: ["trust.success.bullet_1", "trust.success.bullet_2"],
  },
  {
    id: "expertise",
    icon: Lightbulb,
    titleKey: "trust.expertise.title",
    bulletKeys: ["trust.expertise.bullet_1", "trust.expertise.bullet_2"],
  },
  {
    id: "timely",
    icon: Clock,
    titleKey: "trust.timely.title",
    bulletKeys: ["trust.timely.bullet_1", "trust.timely.bullet_2"],
  },
  {
    id: "transparent",
    icon: ShieldCheck,
    titleKey: "trust.transparent.title",
    bulletKeys: ["trust.transparent.bullet_1", "trust.transparent.bullet_2"],
  },
];
