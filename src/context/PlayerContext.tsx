"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/types";

interface PlayerCtx {
  current: MediaItem | null;
  isPlaying: boolean;
  progress: number; // 0..1
  play: (track: MediaItem) => void;
  toggle: () => void;
  stop: () => void;
  seek: (p: number) => void;
}

const Ctx = createContext<PlayerCtx | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<MediaItem | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  const duration = current?.durationSec ?? 210;

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick(ts: number) {
      if (last.current == null) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      setProgress((p) => {
        const next = p + dt / duration;
        return next >= 1 ? 1 : next;
      });
      raf.current = requestAnimationFrame(tick);
    }

    if (isPlaying && !reduce) {
      last.current = null;
      raf.current = requestAnimationFrame(tick);
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = null;
    };
  }, [isPlaying, duration]);

  // Auto-stop advancing at the end.
  useEffect(() => {
    if (progress >= 1) setPlaying(false);
  }, [progress]);

  const play = useCallback((track: MediaItem) => {
    setCurrent(track);
    setProgress(0);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((p) => {
      // restart if finished
      if (!p) setProgress((cur) => (cur >= 1 ? 0 : cur));
      return !p;
    });
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    setCurrent(null);
    setProgress(0);
  }, []);

  const seek = useCallback((p: number) => setProgress(Math.min(1, Math.max(0, p))), []);

  return (
    <Ctx.Provider value={{ current, isPlaying, progress, play, toggle, stop, seek }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
