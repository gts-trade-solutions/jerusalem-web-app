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
}: {
  tabs: TabDef[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const group = useId();

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
        "no-scrollbar flex gap-1.5 overflow-x-auto rounded-2xl border border-border bg-surface/95 p-1.5 backdrop-blur-sm",
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
              "relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              selected ? "text-accent-fg" : "text-muted hover:text-ink",
            )}
          >
            {selected && (
              <motion.span
                layoutId="subtab-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-b from-ink to-ink-soft shadow-[0_6px_18px_-6px_color-mix(in_oklab,var(--ink)_55%,transparent)] dark:from-accent dark:to-accent-strong dark:shadow-[0_6px_18px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className={cn("relative z-[1] flex items-center gap-2", selected && "dark:text-accent-fg")}>
              {t.icon && <Icon name={t.icon} size={15} />}
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
