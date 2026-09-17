"use client";

import { usePlayer } from "@/lib/player/PlayerContext";
import { Volume2, VolumeX } from "lucide-react";

export function VolumeControl() {
  const { volume, setVolume } = usePlayer();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setVolume(volume > 0 ? 0 : 1)}
      >
        {volume > 0 ? (
          <Volume2 size={18} className="text-dim" />
        ) : (
          <VolumeX size={18} className="text-dim" />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-20 h-1.5 accent-gold cursor-pointer"
      />
    </div>
  );
}