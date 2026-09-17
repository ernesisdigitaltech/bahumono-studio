"use client";

import { usePlayer } from "@/lib/player/PlayerContext";
import { formatTime } from "@/lib/formatTime";

export function ProgressBar() {
  const { progress, duration, seek } = usePlayer();

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    seek(Number(e.target.value));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        className="w-full h-1.5 accent-gold cursor-pointer"
      />
      <div className="flex justify-between text-xs text-dim">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}