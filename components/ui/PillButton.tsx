import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "white" | "dark";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  children: ReactNode;
  withArrow?: boolean;
};

const variants: Record<Variant, string> = {
  white: "bg-white text-primary-700 hover:bg-white/90",
  dark: "bg-primary-900 text-white hover:bg-primary-800",
};

export function PillButton({
  variant = "white",
  children,
  withArrow = true,
  className = "",
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      className={
        "group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-medium transition-colors " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 " +
        variants[variant] +
        " " +
        className
      }
    >
      <span>{children}</span>
      {withArrow && (
        <span
          className={
            "flex h-7 w-7 items-center justify-center rounded-full " +
            (variant === "white" ? "bg-primary-900 text-white" : "bg-white text-primary-900") +
            " transition-transform group-hover:translate-x-0.5"
          }
        >
          <ArrowRight size={14} strokeWidth={2.25} />
        </span>
      )}
    </a>
  );
}
