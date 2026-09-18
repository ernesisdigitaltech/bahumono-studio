"use client";

import { usePlayer } from "@/lib/player/PlayerContext";
import { Cover } from "@/components/ui/Cover";
import { Play, Pause } from "lucide-react";
import Link from "next/link";

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, progress, duration } = usePlayer();

  if (!currentTrack) return null;

  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 px-3">
      <Link
        href={`/media/${currentTrack.id}`}
        className="block bg-card border border-line rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-3 py-2">
          <Cover title={currentTrack.title} src={currentTrack.coverUrl} className="w-9 h-9 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">{currentTrack.title}</div>
            <div className="text-[11px] text-dim truncate">{currentTrack.artistName}</div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              togglePlayPause();
            }}
            className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0"
          >
            {isPlaying ? (
              <Pause size={14} className="text-ink" fill="currentColor" />
            ) : (
              <Play size={14} className="text-ink ml-0.5" fill="currentColor" />
            )}
          </button>
        </div>
        <div className="h-0.5 bg-card2">
          <div className="h-full bg-gold" style={{ width: `${percent}%` }} />
        </div>
      </Link>
    </div>
  );
}