"use client";

import { Play, Pause } from "lucide-react";
import { usePlayer, Track } from "@/lib/player/PlayerContext";

export function PlayButton({ track, size = 56 }: { track: Track; size?: number }) {
  const { currentTrack, isPlaying, play } = usePlayer();
  const isThisPlaying = currentTrack?.id === track.id && isPlaying;

  return (
    <button
      onClick={() => play(track)}
      type="button"
      className="rounded-full bg-gold flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {isThisPlaying ? (
        <Pause size={size * 0.4} className="text-ink" fill="currentColor" />
      ) : (
        <Play size={size * 0.4} className="text-ink ml-0.5" fill="currentColor" />
      )}
    </button>
  );
}