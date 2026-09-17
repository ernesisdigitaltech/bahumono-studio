"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";

export type Track = {
  id: string;
  title: string;
  artistName: string;
  fileUrl: string;
  coverUrl?: string;
  type: "audio" | "video";
};

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // seconds
  duration: number; // seconds
  volume: number; // 0 to 1
  play: (track: Track) => void;
  togglePlayPause: () => void;
  seek: (seconds: number) => void;
  setVolume: (level: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play(track: Track) {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    // The actual <audio> element only exists once currentTrack is set,
    // so we wait one tick before telling it to play.
    setTimeout(() => audioRef.current?.play(), 0);
  }

  function togglePlayPause() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function seek(seconds: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  }

  function setVolume(level: number) {
    setVolumeState(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        play,
        togglePlayPause,
        seek,
        setVolume,
        audioRef,
      }}
    >
      {children}

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.fileUrl}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setIsPlaying(false)}
          autoPlay
        />
      )}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside a PlayerProvider");
  }
  return context;
}