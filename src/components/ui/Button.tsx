"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "ghost";
};

export function Button({ variant = "gold", className = "", ...props }: ButtonProps) {
  const base = "font-sans font-semibold text-sm rounded-xl px-5 py-3 transition-colors";
  const styles =
    variant === "gold"
      ? "bg-gold text-ink hover:bg-goldsoft"
      : "bg-transparent text-text border border-line hover:border-gold";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}