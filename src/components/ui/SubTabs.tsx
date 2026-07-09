"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

export interface TabDef {
  id: string;
  label: string;
  icon?: string;
}

export function SubTabs({
  tabs,
  active,
  onChange,
  className,
  accent = "gold",
}: {
  tabs: TabDef[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  accent?: "gold" | "green" | "teal";
}) {
  const group = useId();
  const activeText =
    accent === "green" ? "text-sage" : accent === "teal" ? "text-teal" : "text-accent-strong dark:text-accent";
  const bar = accent === "green" ? "bg-sage" : accent === "teal" ? "bg-teal" : "bg-accent";

  function onKey(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + tabs.length) % tabs.length;
      onChange(tabs[next].id);
      document.getElementById(`${group}-tab-${tabs[next].id}`)?.focus();
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Section tabs"
      className={cn(
        "no-scrollbar flex justify-start gap-1 overflow-x-auto border-b border-border bg-surface/95 px-2 backdrop-blur-sm sm:justify-center sm:gap-1.5",
        className,
      )}
    >
      {tabs.map((t, i) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            id={`${group}-tab-${t.id}`}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onKeyDown={(e) => onKey(e, i)}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-3 text-[13px] font-medium transition-colors sm:px-3.5",
              selected ? activeText : "text-muted hover:text-ink",
            )}
          >
            {t.icon && <Icon name={t.icon} size={17} strokeWidth={selected ? 2.1 : 1.8} />}
            {t.label}
            {selected && (
              <motion.span
                layoutId={`subtab-underline-${group}`}
                className={cn("absolute inset-x-2 bottom-0 h-[3px] rounded-full", bar)}
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
