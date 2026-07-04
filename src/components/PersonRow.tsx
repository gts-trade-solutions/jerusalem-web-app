import type { Person } from "@/types";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { cn } from "@/lib/cn";

export function PersonRow({
  person,
  action,
  className,
}: {
  person: Person;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border border-border bg-surface p-3", className)}>
      <Avatar name={person.name} seed={person.id} size={44} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{person.name}</p>
        <p className="truncate text-xs text-faint">{person.locale}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {person.badges.slice(0, 2).map((b) => (
            <Badge key={b} tone={b.includes("Host") ? "sage" : "accent"} className="text-[10px]">
              {b}
            </Badge>
          ))}
        </div>
      </div>
      {action}
    </div>
  );
}
