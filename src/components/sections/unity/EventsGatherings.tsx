"use client";

import { useMemo, useState } from "react";
import type { EventType } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatPill } from "@/components/ui/StatPill";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

type Filter = "all" | EventType;

const FILTERS: { id: Filter; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "Sparkles" },
  { id: "worship", label: "Worship", icon: "Church" },
  { id: "fellowship", label: "Fellowship", icon: "Users" },
  { id: "bb", label: "B&B", icon: "Flame" },
];

export function EventsGatherings() {
  const { events } = useAppData();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // Unity events: worship + fellowship + B&B (exclude livestream — its own tab)
  const pool = useMemo(() => events.filter((e) => e.type !== "livestream"), [events]);
  const list = useMemo(
    () => (filter === "all" ? pool : pool.filter((e) => e.type === filter)),
    [pool, filter],
  );
  const active = events.find((e) => e.id === openId) ?? null;

  const counts = useMemo(
    () => ({
      worship: pool.filter((e) => e.type === "worship").length,
      fellowship: pool.filter((e) => e.type === "fellowship").length,
      going: pool.reduce((n, e) => n + (e.rsvped ? 1 : 0), 0),
    }),
    [pool],
  );

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Events & Gatherings"
        title="This season's tables are being set"
        intro="Real gatherings, real neighbors, all across the covenant path. RSVP and we'll save you a seat — every one is open, and every one is better with you there."
      />

      <div className="grid grid-cols-3 gap-4">
        <StatPill value={pool.length} label="Upcoming Gatherings" icon="CalendarDays" />
        <StatPill value={counts.worship} label="Worship Nights" icon="Church" />
        <StatPill value={counts.going} label="You're Attending" icon="CheckCircle2" />
      </div>

      {/* Filter chips */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter events by type">
        {FILTERS.map((f) => {
          const selected = filter === f.id;
          const n = f.id === "all" ? pool.length : pool.filter((e) => e.type === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={selected}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-transparent bg-ink text-bg dark:bg-accent dark:text-accent-fg"
                  : "border-border-strong bg-surface text-muted hover:border-accent hover:text-ink",
              )}
            >
              <Icon name={f.icon} size={15} />
              {f.label}
              <span className={cn("text-xs", selected ? "opacity-80" : "text-faint")}>{n}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon="CalendarDays"
          title="No gatherings of this kind yet"
          body="Try another filter, or check back soon — new tables are set every week."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 0.06}>
              <EventCard event={e} onDetails={setOpenId} />
            </Reveal>
          ))}
        </div>
      )}

      <EventDetailModal event={active} open={!!active} onClose={() => setOpenId(null)} />
    </div>
  );
}
