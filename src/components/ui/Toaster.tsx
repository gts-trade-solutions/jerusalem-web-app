"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const toneStyles: Record<string, { cls: string; icon: string }> = {
  default: { cls: "border-border", icon: "Bell" },
  success: { cls: "border-sage/40", icon: "CheckCircle2" },
  accent: { cls: "border-accent/40", icon: "Flame" },
};

export function Toaster() {
  const { toasts, dismissToast } = useAppData();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[120] flex flex-col items-center gap-2 px-4 sm:bottom-28">
      <AnimatePresence>
        {toasts.map((t) => {
          const s = toneStyles[t.tone ?? "default"] ?? toneStyles.default;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 0.7, 0.2, 1] }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 rounded-full border bg-surface/95 px-4 py-2.5 text-sm font-medium text-ink shadow-float backdrop-blur",
                s.cls,
              )}
            >
              <span className={cn(t.tone === "success" ? "text-sage" : "text-accent")}>
                <Icon name={s.icon} size={17} />
              </span>
              {t.message}
              <button
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss"
                className="ml-1 text-faint transition-colors hover:text-ink"
              >
                <Icon name="X" size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
