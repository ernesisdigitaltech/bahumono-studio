"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Download, Library, Play } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/library", label: "Library", icon: Library },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="relative flex items-center justify-around px-2 pt-2 pb-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-1 flex-1"
            >
              <Icon size={20} strokeWidth={2} className={active ? "text-gold" : "text-dim"} />
              <span className={`text-[10px] font-semibold ${active ? "text-gold" : "text-dim"}`}>
                {label}
              </span>
            </Link>
          );
        })}

        {/* Raised center button — quick access to the player */}
        <Link
          href="/player"
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/30 border-4 border-surface"
        >
          <Play size={22} className="text-ink" fill="currentColor" />
        </Link>
      </div>
    </nav>
  );
}