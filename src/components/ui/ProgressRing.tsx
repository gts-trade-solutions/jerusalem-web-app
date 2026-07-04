"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import { cn } from "@/lib/cn";

export function ProgressRing({
  value,
  total,
  label,
  sublabel,
  size = 108,
  stroke = 9,
  className,
}: {
  value: number;
  total: number;
  label?: string;
  sublabel?: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gradId = useId();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const pct = total > 0 ? Math.min(1, value / total) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c * (1 - pct);

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-strong)" />
              <stop offset="55%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="#e6c67d" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: reduce ? target : c }}
            animate={{ strokeDashoffset: inView ? target : c }}
            transition={{ duration: 1.1, ease: [0.22, 0.7, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-xl font-semibold text-ink tabular-nums">
            {Math.round(pct * 100)}%
          </span>
          {sublabel && <span className="text-[10px] text-muted">{sublabel}</span>}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
    </div>
  );
}
