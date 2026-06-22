import { PARTNERS, type Partner } from "@/components/about/data/partners";

export type TeamMember = Partner & {
  id: "christ" | "dennis" | "michael";
  experienceKey: string;
  firmsKey: string;
  industriesKey: string;
};

export const TEAM: readonly TeamMember[] = [
  {
    ...PARTNERS[0],
    id: "christ",
    experienceKey: "team.christ.experience",
    firmsKey: "team.christ.firms",
    industriesKey: "team.christ.industries",
  },
  {
    ...PARTNERS[1],
    id: "dennis",
    experienceKey: "team.dennis.experience",
    firmsKey: "team.dennis.firms",
    industriesKey: "team.dennis.industries",
  },
  {
    ...PARTNERS[2],
    id: "michael",
    experienceKey: "team.michael.experience",
    firmsKey: "team.michael.firms",
    industriesKey: "team.michael.industries",
  },
] as const;
