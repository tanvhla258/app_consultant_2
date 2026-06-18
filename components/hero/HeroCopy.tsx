import { PillButton } from "@/components/ui/PillButton";

export function HeroCopy() {
  return (
    <div className="max-w-xl">
      <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white lg:text-6xl">
        Your Vision, Our Mission —<br />
        Accounting &amp; Advisory You Can Trust
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-white/70">
        APP Consultancy delivers audit, tax, IFRS, and M&amp;A advisory built on
        20+ years of Big4 expertise — tailored for businesses operating in Vietnam.
      </p>

      <div className="mt-8">
        <PillButton href="#contact" variant="white">
          Get a Free Consultation
        </PillButton>
      </div>

      <div className="mt-16 h-px w-24 bg-secondary-400/30" />

      <p className="mt-6 font-medium text-white">
        Michael Pham — Partner (ACCA, VACPA)
      </p>
      <p className="mt-2 max-w-md text-sm italic text-white/60">
        &ldquo;We help businesses navigate VAS, IFRS, tax compliance, and growth —
        all in one trusted partner.&rdquo;
      </p>
    </div>
  );
}
