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

/** Brand mark — dawn sun rising inside a chapel-arch window. */
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
      {/* arch window */}
      <path d="M4.5 21 V10.5 C4.5 5.5 8 3 12 3 C16 3 19.5 5.5 19.5 10.5 V21" />
      <path d="M2.5 21 H21.5" />
      {/* rising sun */}
      <path d="M8.2 16.5 A3.8 3.8 0 0 1 15.8 16.5" />
      <path d="M12 9.2 V11" />
      <path d="M7.6 11.4 L8.8 12.6" />
      <path d="M16.4 11.4 L15.2 12.6" />
    </svg>
  );
}
