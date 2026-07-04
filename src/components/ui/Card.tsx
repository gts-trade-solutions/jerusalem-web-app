import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";
import { TiltCard } from "./TiltCard";

export function Card({
  children,
  className,
  hover = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-2/50 shadow-sm",
        hover && "card-hover",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Icon + title + body feature card with a glyph puck. */
export function FeatureCard({
  icon,
  title,
  body,
  tone = "accent",
  className,
}: {
  icon: string;
  title: string;
  body: string;
  tone?: "accent" | "sage" | "ink";
  className?: string;
}) {
  const puck = {
    accent: "bg-accent-soft text-accent-strong dark:text-accent",
    sage: "bg-sage-soft text-sage",
    ink: "bg-ink text-bg dark:bg-surface-3 dark:text-ink",
  }[tone];
  return (
    <TiltCard className={cn("h-full", className)}>
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-2/70 p-6 shadow-sm card-hover",
        )}
      >
      {/* gold hairline reveal */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* glyph watermark */}
      <span className="pointer-events-none absolute -bottom-7 -right-6 text-ink opacity-[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.08]">
        <Icon name={icon} size={124} strokeWidth={1.1} />
      </span>
      <span className={cn("mb-4 grid size-12 place-items-center rounded-t-full rounded-b-lg pb-1 pt-1.5 shadow-sm transition-transform group-hover:scale-105", puck)}>
        <Icon name={icon} size={22} />
      </span>
        <h3 className="relative font-serif text-lg font-semibold text-ink">{title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </TiltCard>
  );
}
