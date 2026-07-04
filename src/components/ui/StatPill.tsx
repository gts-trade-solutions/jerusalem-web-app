"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

/** Animated counting stat, e.g. "1,204 gathered". */
export function StatPill({
  value,
  label,
  icon,
  suffix = "",
  className,
}: {
  value: number;
  label: string;
  icon?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/80 to-surface-2/60 px-5 py-4 text-center backdrop-blur transition-colors hover:border-accent/40",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      {icon && (
        <span className="mb-1.5 grid size-9 place-items-center rounded-t-full rounded-b-md bg-accent-soft pb-0.5 pt-1 text-accent-strong dark:text-accent">
          <Icon name={icon} size={18} />
        </span>
      )}
      <span className="font-serif text-3xl font-semibold tabular-nums text-gradient-gold">
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
    </motion.div>
  );
}
