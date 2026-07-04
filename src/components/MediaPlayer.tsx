"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "@/context/PlayerContext";
import { Icon } from "./Icon";
import { PhotoBlock } from "./ui/PhotoBlock";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Persistent, visual-only playback bar. Sits above the mobile nav. */
export function MediaPlayer() {
  const { current, isPlaying, progress, toggle, stop, seek } = usePlayer();

  const dur = current?.durationSec ?? 210;
  const elapsed = Math.round(progress * dur);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-16 z-[90] px-2 sm:bottom-3 sm:px-4"
          role="region"
          aria-label="Media player"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border bg-surface/95 p-2.5 shadow-float backdrop-blur-sm sm:gap-4 sm:p-3">
            <PhotoBlock
              seed={current.cover ?? current.id}
              w={80}
              h={80}
              icon="Music"
              overlay="sage"
              rounded="rounded-xl"
              className="size-12 shrink-0 sm:size-14"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  {isPlaying && (
                    <span className="flex h-3.5 shrink-0 items-end gap-[3px]" aria-hidden>
                      <span className="eq-bar h-full w-[3px] rounded-full bg-accent" />
                      <span className="eq-bar h-full w-[3px] rounded-full bg-accent" style={{ animationDelay: "-0.35s" }} />
                      <span className="eq-bar h-full w-[3px] rounded-full bg-accent" style={{ animationDelay: "-0.7s" }} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{current.title}</p>
                    <p className="truncate text-xs text-faint">{current.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button aria-label="Previous" className="hidden size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:grid">
                    <Icon name="SkipBack" size={17} />
                  </button>
                  <button
                    onClick={toggle}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="relative grid size-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:scale-105 active:scale-95 dark:bg-accent dark:text-accent-fg"
                  >
                    {isPlaying && (
                      <span className="animate-pulse-ring absolute inset-0 rounded-full ring-2 ring-accent/60" aria-hidden />
                    )}
                    <Icon name={isPlaying ? "Pause" : "Play"} size={18} strokeWidth={2.4} />
                  </button>
                  <button aria-label="Next" className="hidden size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:grid">
                    <Icon name="SkipForward" size={17} />
                  </button>
                  <button
                    onClick={stop}
                    aria-label="Close player"
                    className="grid size-8 place-items-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="w-8 text-right text-[10px] tabular-nums text-faint">{formatDuration(elapsed)}</span>
                <button
                  className="group relative h-3 flex-1"
                  aria-label="Seek"
                  onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    seek((e.clientX - r.left) / r.width);
                  }}
                >
                  <span className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border" />
                  <span
                    className={cn("absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent")}
                    style={{ width: `${progress * 100}%` }}
                  />
                  <span
                    className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 shadow transition-opacity group-hover:opacity-100"
                    style={{ left: `${progress * 100}%` }}
                  />
                </button>
                <span className="w-8 text-[10px] tabular-nums text-faint">{formatDuration(dur)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
