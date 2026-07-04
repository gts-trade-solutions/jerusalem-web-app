"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROLES, useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";
import type { Role } from "@/types";

const roleIcon: Record<Role, string> = {
  Member: "UserCheck",
  Host: "ChefHat",
  Youth: "Sparkle",
  Leader: "BadgeCheck",
  Guest: "Users",
};

/** Tucked-away dev conveniences: role switcher + theme toggle. */
export function SettingsPopover() {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useUser();
  const { theme, setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Preview settings"
        aria-expanded={open}
        className={cn(
          "grid size-9 place-items-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:border-accent/40 hover:text-accent",
          open && "border-accent/50 text-accent",
        )}
      >
        <Icon name="Settings" size={17} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-float"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">Preview as role</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm font-medium transition-colors",
                    role === r
                      ? "border-accent/50 bg-accent-soft text-accent-strong dark:text-accent"
                      : "border-border text-ink-soft hover:bg-surface-2",
                  )}
                >
                  <Icon name={roleIcon[r]} size={15} />
                  {r}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-faint">Appearance</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg border px-2.5 py-2 text-sm font-medium capitalize transition-colors",
                    theme === t
                      ? "border-accent/50 bg-accent-soft text-accent-strong dark:text-accent"
                      : "border-border text-ink-soft hover:bg-surface-2",
                  )}
                >
                  <Icon name={t === "dark" ? "Moon" : "SunIcon"} size={15} />
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-faint">
              Reviewer tools — role changes update badges, Host tools, and Youth-safety UI across the app.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
