// components/about/ValueCallout.tsx
import { Compass } from "lucide-react";

export function ValueCallout() {
  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,37,69,0.06)] lg:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-secondary-400">
        <Compass size={22} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-tight tracking-tight text-primary-700 lg:text-2xl">
        Your Vision,
        <br />
        Our Mission
      </h3>
      <p className="text-sm leading-relaxed text-primary-700/70">
        We turn your business goals into a clear financial roadmap &mdash;
        audit, tax, IFRS, and advisory built on Big4 expertise.
      </p>
    </div>
  );
}
