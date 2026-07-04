"use client";

import { useTheme } from "@/context/ThemeContext";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "grid size-9 place-items-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:border-accent/40 hover:text-accent",
        className,
      )}
    >
      <Icon name={theme === "dark" ? "SunIcon" : "Moon"} size={17} />
    </button>
  );
}
