"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Sacred visual signatures — ornamental gold divider, light rays,
 * temple-spire silhouette, and the arched-window brand mark.
 * Pure SVG/CSS so they render in any theme and never fail to load.
 */

/** Gold flourish divider — draws itself in like an illuminated page. */
export function Ornament({ className, tone = "accent" }: { className?: string; tone?: "accent" | "light" }) {
  const reduce = useReducedMotion();
  const color = tone === "light" ? "#e6c67d" : "var(--accent)";
  return (
    <motion.div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.span
        className="h-px w-16 origin-right sm:w-24"
        style={{ background: `linear-gradient(to left, ${color}, transparent)` }}
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 0.7, 0.2, 1] } } }}
      />
      <motion.svg
        width="46"
        height="14"
        viewBox="0 0 46 14"
        fill="none"
        variants={{
          hidden: { opacity: 0, rotate: 90, scale: 0.4 },
          show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 0.7, 0.2, 1] } },
        }}
      >
        <circle cx="4" cy="7" r="1.4" fill={color} />
        <path d="M23 1 L29 7 L23 13 L17 7 Z" stroke={color} strokeWidth="1.1" fill="none" />
        <path d="M23 4.2 L25.8 7 L23 9.8 L20.2 7 Z" fill={color} />
        <circle cx="42" cy="7" r="1.4" fill={color} />
      </motion.svg>
      <motion.span
        className="h-px w-16 origin-left sm:w-24"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 0.7, 0.2, 1] } } }}
      />
    </motion.div>
  );
}

/** Soft light rays fanning down from above — breathe slowly inside dark heroes. */
export function GodRays({ className }: { className?: string }) {
  return (
    <svg
      className={cn("rays-breathe pointer-events-none absolute inset-x-0 top-0 h-full w-full", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6c67d" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#e6c67d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g style={{ mixBlendMode: "screen" }} opacity="0.35">
        <polygon points="30,-5 38,-5 18,100 6,100" fill="url(#ray)" />
        <polygon points="48,-5 54,-5 46,100 36,100" fill="url(#ray)" />
        <polygon points="64,-5 72,-5 88,100 74,100" fill="url(#ray)" />
        <polygon points="82,-5 87,-5 108,80 98,86" fill="url(#ray)" />
      </g>
    </svg>
  );
}

/** Slow-drifting light orbs for hero atmospheres. */
export function LightOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="animate-float absolute -left-10 top-[12%] size-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(214,171,84,0.28), transparent 68%)", mixBlendMode: "screen" }}
      />
      <div
        className="animate-float-slow absolute right-[8%] top-[38%] size-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(107,161,147,0.24), transparent 68%)", mixBlendMode: "screen" }}
      />
    </div>
  );
}

/** Temple-spire skyline, filled with the page background so it "cuts" into dark bands. */
export function SpireSilhouette({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={cn("block w-full", flip && "rotate-180", className)}
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      aria-hidden
      fill="var(--bg)"
    >
      <path d="M0 0 L0 8 L60 8 L60 22 L90 22 L96 2 L102 22 L132 22 L132 8 L240 8 L240 18 L300 18 L300 30 L338 30 L344 6 L350 30 L390 30 L390 18 L520 18 L520 10 L560 10 L566 0 L572 10 L590 10 L596 -4 L602 10 L620 10 L626 0 L632 10 L672 10 L672 18 L790 18 L790 28 L830 28 L836 4 L842 28 L880 28 L880 16 L980 16 L980 24 L1040 24 L1046 6 L1052 24 L1090 24 L1090 12 L1200 12 L1200 0 Z" />
    </svg>
  );
}

/** Thin gold line-art of a temple city skyline — for the navy footer band. */
export function SkylineArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 70" fill="none" className={className} aria-hidden>
      <g stroke="#c9a13b" strokeWidth="1.2" strokeLinejoin="round" opacity="0.7">
        <path d="M4 66 V40 L14 40 L14 30 L22 30 L22 40 L34 40 L34 22 L38 16 L42 22 L42 40 L54 40 L54 34 L64 34 L64 66" />
        <path d="M64 66 V26 L76 26 L76 16 L82 10 L88 16 L88 26 L100 26 L100 66" />
        <path d="M100 66 V36 L112 36 L112 30 L120 30 L120 20 L126 14 L132 20 L132 30 L140 30 L140 36 L152 36 L152 66" />
        <path d="M152 66 V32 L164 32 L164 22 L172 22 L172 66" />
        <path d="M172 66 V28 L184 28 L184 18 L190 12 L196 18 L196 28 L208 28 L208 66" />
        <path d="M208 66 V38 L220 38 L220 28 L228 28 L228 66 L240 66 L240 34 L250 34 L250 66" />
        <line x1="38" y1="16" x2="38" y2="8" />
        <line x1="82" y1="10" x2="82" y2="3" />
        <line x1="126" y1="14" x2="126" y2="6" />
        <line x1="190" y1="12" x2="190" y2="5" />
      </g>
    </svg>
  );
}

/** Brand mark — dawn sun rising inside a chapel-arch window (currentColor). */
export function LogoMark({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4.5 21 V10.5 C4.5 5.5 8 3 12 3 C16 3 19.5 5.5 19.5 10.5 V21" />
      <path d="M2.5 21 H21.5" />
      <path d="M8.2 16.5 A3.8 3.8 0 0 1 15.8 16.5" />
      <path d="M12 9.2 V11" />
      <path d="M7.6 11.4 L8.8 12.6" />
      <path d="M16.4 11.4 L15.2 12.6" />
    </svg>
  );
}

/**
 * Circular gold temple seal — the primary brand emblem, matching the
 * reference screens: a gold ring with a radiant sun and a temple spire
 * skyline. Self-colored (does not use currentColor).
 */
export function LogoEmblem({ className, size = 46 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="nj-emblem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6c164" />
          <stop offset="55%" stopColor="#c99a34" />
          <stop offset="100%" stopColor="#a97e22" />
        </linearGradient>
        <radialGradient id="nj-emblem-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#fbf1d6" />
          <stop offset="100%" stopColor="#f6ead0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#nj-emblem-glow)" stroke="url(#nj-emblem)" strokeWidth="2" />
      {/* radiating sun rays */}
      <g stroke="url(#nj-emblem)" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r1 = 15.5, r2 = 18.5;
          const f = (n: number) => Number(n.toFixed(2));
          return (
            <line
              key={i}
              x1={f(24 + Math.cos(a) * r1)}
              y1={f(20 + Math.sin(a) * r1)}
              x2={f(24 + Math.cos(a) * r2)}
              y2={f(20 + Math.sin(a) * r2)}
            />
          );
        })}
      </g>
      {/* temple skyline */}
      <g fill="url(#nj-emblem)">
        <path d="M23 8 L25 8 L25 12 L27 14 L27 33 L21 33 L21 14 L23 12 Z" />
        <rect x="23.4" y="5" width="1.2" height="3.5" rx="0.4" />
        <path d="M15 20 L18.5 17 L18.5 33 L15 33 Z" />
        <path d="M33 20 L29.5 17 L29.5 33 L33 33 Z" />
        <rect x="13" y="24" width="4" height="9" />
        <rect x="31" y="24" width="4" height="9" />
      </g>
      <rect x="11" y="33" width="26" height="2.4" rx="1" fill="url(#nj-emblem)" />
    </svg>
  );
}
