"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n/useLang";
import type { TeamMember } from "./data/team";

type Props = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: Props) {
  const { t } = useLang();

  return (
    <article className="flex h-full flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(11,37,69,0.10)] lg:p-7">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
        <Image
          src={member.image}
          alt={member.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-lg font-semibold text-primary-700">{member.name}</h3>
        <p className="text-sm text-primary-700/60">
          {member.title} · {member.credentials}
        </p>
      </div>

      <dl className="flex flex-col gap-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-primary-700/50">
            {t("team.label.experience")}
          </dt>
          <dd className="mt-0.5 text-sm text-primary-700/80">{t(member.experienceKey)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-primary-700/50">
            {t("team.label.firms")}
          </dt>
          <dd className="mt-0.5 text-sm text-primary-700/80">{t(member.firmsKey)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-primary-700/50">
            {t("team.label.industries")}
          </dt>
          <dd className="mt-0.5 text-sm text-primary-700/80">{t(member.industriesKey)}</dd>
        </div>
      </dl>
    </article>
  );
}
