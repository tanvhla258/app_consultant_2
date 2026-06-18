// components/about/AboutCopy.tsx
import { StatBlock } from "./StatBlock";

export function AboutCopy() {
  return (
    <div className="flex w-full flex-col">
      <p className="max-w-sm text-base leading-relaxed text-primary-700/80">
        We&rsquo;re a dedicated accounting and advisory firm built by leaders
        from international audit and Big4 backgrounds. We help businesses in
        Vietnam stay compliant, reduce risk, and manage their finances with
        clarity &mdash; from multinationals to growing SMEs.
      </p>
      <div className="mt-8">
        <StatBlock
          value="20+"
          label="Big4-Trained Partners"
          sublabel="KPMG · BDO · Mazars · PKF"
        />
      </div>
    </div>
  );
}
