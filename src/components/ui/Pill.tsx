import { HTMLAttributes } from "react";

type PillProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
};

export function Pill({ active = false, className = "", ...props }: PillProps) {
  const base = "text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors";
  const styles = active
    ? "bg-gold text-ink"
    : "bg-transparent text-dim border border-line";

  return <div className={`${base} ${styles} ${className}`} {...props} />;
}