import { cn } from "@/lib/cn";
import { Icon } from "@/components/Icon";

type Tone = "neutral" | "accent" | "sage" | "needs" | "answered" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-3 text-ink-soft border-border",
  accent: "bg-accent-soft text-accent-strong border-accent/30 dark:text-accent",
  sage: "bg-sage-soft text-sage border-sage/25",
  needs: "bg-accent-soft text-accent-strong border-accent/30 dark:text-accent",
  answered: "bg-sage-soft text-sage border-sage/30",
  outline: "bg-transparent text-muted border-border-strong",
};

export function Badge({
  children,
  tone = "neutral",
  icon,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  icon?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}
