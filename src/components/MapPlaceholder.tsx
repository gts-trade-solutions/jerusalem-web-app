"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface MapPin {
  id: string;
  x: number; // 0..100
  y: number; // 0..100
  label: string;
  tone?: "accent" | "sage";
  active?: boolean;
}

/** Styled, non-interactive map with decorative streets + pins. */
export function MapPlaceholder({
  pins,
  onPinClick,
  className,
  height = 340,
  variant = "streets",
}: {
  pins: MapPin[];
  onPinClick?: (id: string) => void;
  className?: string;
  height?: number;
  variant?: "streets" | "world";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface-2",
        className,
      )}
      style={{ height }}
      role="img"
      aria-label={`Map showing ${pins.length} locations`}
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,var(--sage-soft),transparent_60%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_100%,var(--accent-soft),transparent_55%)] opacity-60" />

      {variant === "streets" ? (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* a few "roads" */}
          <path d="M0 40 Q 30 30 55 55 T 100 60" fill="none" stroke="var(--border-strong)" strokeWidth="1.4" opacity="0.7" />
          <path d="M20 0 L 35 100" fill="none" stroke="var(--border-strong)" strokeWidth="1.2" opacity="0.6" />
          <path d="M75 0 Q 60 50 80 100" fill="none" stroke="var(--border-strong)" strokeWidth="1.2" opacity="0.6" />
          <circle cx="0" cy="0" r="0" />
        </svg>
      ) : (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {/* stylized continents as soft blobs */}
          {[
            "M8 20 Q 14 12 22 16 T 30 28 Q 24 34 16 32 T 8 20",
            "M40 14 Q 50 10 56 18 T 52 34 Q 46 40 42 32 T 40 14",
            "M60 40 Q 66 34 70 42 T 66 52 Q 60 54 60 40",
            "M74 22 Q 84 16 88 26 T 82 40 Q 74 42 74 22",
          ].map((d, i) => (
            <path key={i} d={d} fill="var(--sage)" opacity="0.16" stroke="var(--sage)" strokeOpacity="0.25" strokeWidth="0.3" />
          ))}
        </svg>
      )}

      {/* pins */}
      {pins.map((p, i) => (
        <motion.button
          key={p.id}
          initial={{ scale: 0, y: -6 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.05 * i, type: "spring", stiffness: 500, damping: 22 }}
          onClick={() => onPinClick?.(p.id)}
          className={cn(
            "group absolute -translate-x-1/2 -translate-y-full focus-visible:outline-2",
            onPinClick ? "cursor-pointer" : "cursor-default",
          )}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-label={p.label}
          tabIndex={onPinClick ? 0 : -1}
        >
          {p.active && (
            <span
              className={cn(
                "absolute left-1/2 top-1 -z-[1] size-8 -translate-x-1/2 animate-ping rounded-full",
                p.tone === "sage" ? "bg-sage/40" : "bg-accent/40",
              )}
            />
          )}
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full text-white shadow-md ring-2 ring-surface transition-transform group-hover:scale-115",
              p.tone === "sage" ? "bg-sage" : "bg-accent",
            )}
          >
            <Icon name="MapPin" size={15} strokeWidth={2.2} />
          </span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-medium text-bg shadow-md group-hover:block group-focus-visible:block">
            {p.label}
          </span>
        </motion.button>
      ))}

      <span className="absolute bottom-2 right-3 rounded-full bg-surface/80 px-2 py-0.5 text-[10px] font-medium text-faint backdrop-blur">
        Illustrative map
      </span>
    </div>
  );
}
