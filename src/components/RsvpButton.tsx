"use client";

import { useAppData } from "@/context/AppDataContext";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function RsvpButton({
  id,
  size = "sm",
  showCount = true,
  className,
}: {
  id: string;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}) {
  const { events, toggleRsvp } = useAppData();
  const ev = events.find((e) => e.id === id);
  if (!ev) return null;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Button
        variant={ev.rsvped ? "sage" : "accent"}
        size={size}
        onClick={() => toggleRsvp(id)}
        icon={ev.rsvped ? "CheckCircle2" : "Plus"}
        aria-pressed={ev.rsvped}
      >
        {ev.rsvped ? "Going" : "RSVP"}
      </Button>
      {showCount && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
          <Icon name="Users" size={13} />
          {ev.going.toLocaleString()} going
        </span>
      )}
    </div>
  );
}
