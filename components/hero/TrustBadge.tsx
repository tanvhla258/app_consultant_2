import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className?: string;
};

export function TrustBadge({ icon: Icon, label, sublabel, className = "" }: Props) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl border border-secondary-400/30 " +
        "bg-primary-800/70 px-4 py-2.5 shadow-lg backdrop-blur " +
        className
      }
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-secondary-400">
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{label}</span>
        {sublabel && <span className="text-xs text-white/50">{sublabel}</span>}
      </span>
    </div>
  );
}
