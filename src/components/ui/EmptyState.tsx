import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon = "Sparkles",
  title,
  body,
  action,
  className,
}: {
  icon?: string;
  title: string;
  body?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
      {body && <p className="mt-1.5 max-w-sm text-sm text-muted">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
