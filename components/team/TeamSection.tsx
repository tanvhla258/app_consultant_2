import { TeamHeadline } from "./TeamHeadline";
import { TeamMemberCard } from "./TeamMemberCard";
import { TEAM } from "./data/team";

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <TeamHeadline />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {TEAM.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
