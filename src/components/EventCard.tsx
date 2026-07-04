"use client";

import type { EventItem } from "@/types";
import { PhotoBlock } from "./ui/PhotoBlock";
import { Badge } from "./ui/Badge";
import { RsvpButton } from "./RsvpButton";
import { Icon } from "./Icon";
import { dateChip, formatTime } from "@/lib/format";
import { cn } from "@/lib/cn";

const typeMeta: Record<EventItem["type"], { label: string; icon: string; overlay: "dawn" | "sage" | "ink" }> = {
  bb: { label: "Barbecue & Book of Mormon", icon: "Flame", overlay: "dawn" },
  worship: { label: "Worship", icon: "Church", overlay: "ink" },
  fellowship: { label: "Fellowship", icon: "Users", overlay: "sage" },
  livestream: { label: "Livestream", icon: "Radio", overlay: "ink" },
};

export function EventCard({
  event,
  onDetails,
  layout = "vertical",
}: {
  event: EventItem;
  onDetails?: (id: string) => void;
  layout?: "vertical" | "horizontal";
}) {
  const meta = typeMeta[event.type];
  const chip = dateChip(event.start);

  return (
    <article
      className={cn(
        "group flex overflow-hidden rounded-2xl border border-border bg-surface shadow-sm card-hover",
        layout === "vertical" ? "flex-col" : "flex-col sm:flex-row",
      )}
    >
      <div className={cn("relative shrink-0 overflow-hidden", layout === "vertical" ? "h-44" : "h-44 sm:h-auto sm:w-56")}>
        <PhotoBlock seed={event.image ?? event.id} icon={meta.icon} overlay={meta.overlay} rounded="rounded-none" zoom className="h-full w-full" />
        <div className="absolute left-3 top-3 flex flex-col items-center overflow-hidden rounded-xl border-t-2 border-accent bg-surface/95 px-2.5 py-1.5 text-center shadow-md backdrop-blur">
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent">{chip.mon}</span>
          <span className="font-serif text-lg font-semibold leading-none text-ink">{chip.day}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge tone="accent" icon={meta.icon} className="bg-surface/90 backdrop-blur">
            {meta.label}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">
          {event.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Clock" size={13} /> {chip.weekday} · {formatTime(event.start)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="MapPin" size={13} /> {event.location}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            <Icon name="UserCheck" size={13} /> Hosted by {event.hostName}
          </span>
          <RsvpButton id={event.id} showCount={false} />
        </div>
        {onDetails && (
          <button
            onClick={() => onDetails(event.id)}
            className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-accent transition-colors hover:gap-2 hover:text-accent-strong"
          >
            View details <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
