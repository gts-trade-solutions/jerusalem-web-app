"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Pointer-tracked 3D tilt + gold spotlight that follows the cursor.
 * Mouse-only (ignores touch), fully disabled under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 24 });

  if (reduce) {
    return <div className={cn("group relative", className)}>{children}</div>;
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    ref.current.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 950 }}
      className={cn("group relative will-change-transform", className)}
    >
      {children}
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 16%, transparent), transparent 65%)",
        }}
      />
    </motion.div>
  );
}
