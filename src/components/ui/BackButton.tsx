"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-dim hover:text-text text-sm"
      type="button"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}