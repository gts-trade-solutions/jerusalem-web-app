import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

type Variant = "primary" | "accent" | "ghost" | "outline" | "sage" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  block?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:bg-ink-soft shadow-sm dark:bg-surface-3 dark:text-ink dark:hover:bg-surface-2 border border-transparent",
  accent:
    "btn-rich text-accent-fg border border-transparent",
  sage:
    "bg-sage text-white hover:opacity-90 shadow-sm border border-transparent",
  outline:
    "bg-transparent text-ink border border-border-strong hover:bg-surface-2 hover:border-accent",
  ghost:
    "bg-transparent text-ink-soft hover:bg-surface-2 hover:text-ink border border-transparent",
  danger:
    "bg-danger text-white hover:opacity-90 shadow-sm border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3.5 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-6 py-3 gap-2 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, iconRight, block, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={size === "lg" ? 19 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 19 : 16} />}
    </button>
  );
});
