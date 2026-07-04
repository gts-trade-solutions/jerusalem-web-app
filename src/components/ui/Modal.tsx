"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  side = false,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** render as a right-side sheet instead of a centered dialog */
  side?: boolean;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-stretch" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0 bg-ink-900/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "relative z-10 m-auto flex max-h-[90vh] w-full flex-col overflow-hidden border border-border bg-surface shadow-float grain",
              side
                ? "ml-auto mr-0 h-full max-h-full w-full max-w-md rounded-l-3xl"
                : cn("rounded-3xl", widths[size]),
            )}
            initial={
              reduce
                ? { opacity: 0 }
                : side
                  ? { x: "100%" }
                  : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={reduce ? { opacity: 1 } : side ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : side ? { x: "100%" } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-[1] flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                {title && <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>}
                {description && <p className="mt-1 text-sm text-muted">{description}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="relative z-[1] flex-1 overflow-y-auto px-6 py-5">{children}</div>
            {footer && (
              <div className="relative z-[1] flex items-center justify-end gap-3 border-t border-border bg-surface-2/60 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
