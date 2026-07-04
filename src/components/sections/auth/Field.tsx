"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

export interface FieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  icon?: string;
  error?: string | null;
  hint?: string;
  /** Optional trailing control (e.g. a show/hide password toggle). */
  trailing?: React.ReactNode;
}

/**
 * Labeled input with an icon slot, an inline error slot, and full a11y wiring
 * (htmlFor/id, aria-invalid, aria-describedby). Shared by both auth pages.
 */
export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, icon, error, hint, trailing, className, required, ...props },
  ref,
) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(error);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium text-ink-soft"
      >
        {label}
        {required && (
          <span className="text-accent-strong dark:text-accent" aria-hidden>
            *
          </span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-faint">
            <Icon name={icon} size={18} />
          </span>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={
            error ? errId : hint ? hintId : undefined
          }
          className={cn(
            "w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-all",
            "placeholder:text-faint",
            "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25",
            icon && "pl-11",
            trailing && "pr-11",
            invalid
              ? "border-danger focus-visible:border-danger focus-visible:ring-danger/25"
              : "border-border hover:border-border-strong",
            className,
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-0 grid w-11 place-items-center">
            {trailing}
          </span>
        )}
      </div>

      {error ? (
        <p
          id={errId}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-danger"
        >
          <Icon name="AlertTriangle" size={13} strokeWidth={2} />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
