"use client";

import { cn } from "@/lib/cn";

/** Accessible switch with role="switch" + aria-checked. */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none",
        checked ? "border-transparent bg-accent" : "border-border-strong bg-surface-3",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}

/** A labeled row that pairs a title/description with a Toggle. */
export function ToggleRow({
  title,
  description,
  checked,
  onChange,
  icon,
  children,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-2/50 px-4 py-3">
      <div className="flex items-start gap-3">
        {icon && <span className="mt-0.5 text-accent-strong dark:text-accent">{icon}</span>}
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          {description && <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>}
          {children}
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
