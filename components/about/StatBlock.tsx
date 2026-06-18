// components/about/StatBlock.tsx
type Props = {
  value: string;
  label: string;
  sublabel: string;
};

export function StatBlock({ value, label, sublabel }: Props) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-[0_1px_2px_rgba(11,37,69,0.04)]">
      <div className="text-5xl font-semibold leading-none tracking-tight text-secondary-500">
        {value}
      </div>
      <div className="mt-3 h-px w-10 bg-secondary-400/40" />
      <div className="mt-3 text-sm font-semibold text-primary-700">{label}</div>
      <div className="mt-1 text-xs text-primary-700/60">{sublabel}</div>
    </div>
  );
}
