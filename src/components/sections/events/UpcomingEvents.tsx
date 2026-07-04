"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventType } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { RsvpButton } from "@/components/RsvpButton";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/Icon";
import { dateChip, formatDateLong, formatTime } from "@/lib/format";
import { cn } from "@/lib/cn";

type Filter = "all" | EventType;

const FILTERS: { id: Filter; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "Sparkles" },
  { id: "bb", label: "B&B", icon: "Flame" },
  { id: "worship", label: "Worship", icon: "Church" },
  { id: "fellowship", label: "Fellowship", icon: "Users" },
  { id: "livestream", label: "Livestream", icon: "Radio" },
];

export function UpcomingEvents() {
  const { events } = useAppData();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (filter !== "all" && e.type !== filter) return false;
      if (!q) return true;
      return e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
    });
  }, [events, filter, query]);

  // The featured "next" event: soonest upcoming, preferring a B&B night.
  const featured = useMemo(() => {
    const sorted = [...events].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    return sorted.find((e) => e.type === "bb") ?? sorted[0];
  }, [events]);

  const openEvent = events.find((e) => e.id === openId) ?? null;
  const rest = filtered.filter((e) => e.id !== featured?.id);

  return (
    <div className="space-y-10">
      {/* Featured next event hero */}
      {featured && (
        <Reveal>
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[240px]">
                <PhotoBlock
                  seed={featured.image ?? featured.id}
                  w={900}
                  h={640}
                  icon="Flame"
                  overlay="ink"
                  rounded="rounded-none"
                  className="h-full w-full"
                >
                  <div className="flex h-full flex-col justify-between p-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d6ab54]/40 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6c67d] backdrop-blur">
                      <Icon name="Flame" size={13} /> Next up in your neighborhood
                    </span>
                    <div className="flex items-center gap-3 text-white/85">
                      <span className="flex flex-col items-center rounded-xl bg-white/10 px-3 py-1.5 text-center backdrop-blur">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#e6c67d]">
                          {dateChip(featured.start).mon}
                        </span>
                        <span className="font-serif text-xl font-semibold leading-none text-white">
                          {dateChip(featured.start).day}
                        </span>
                      </span>
                      <span className="text-sm">
                        {dateChip(featured.start).weekday} · {formatTime(featured.start)}
                      </span>
                    </div>
                  </div>
                </PhotoBlock>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <Badge tone="accent" icon="Flame" className="w-fit">
                  Barbecue &amp; Book of Mormon
                </Badge>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink text-balance sm:text-3xl">
                  {featured.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="CalendarDays" size={14} /> {formatDateLong(featured.start)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="MapPin" size={14} /> {featured.location}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">{featured.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-faint">
                  <Icon name="UserCheck" size={13} /> Hosted by {featured.hostName}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <RsvpButton id={featured.id} size="md" />
                  <button
                    onClick={() => setOpenId(featured.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5 hover:text-accent-strong"
                  >
                    Quick details <Icon name="ArrowRight" size={15} />
                  </button>
                  <Link
                    href={`/events/${featured.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                  >
                    Full page <Icon name="ArrowUpRight" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      )}

      {/* Filter + search toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-accent bg-accent-soft text-accent-strong dark:text-accent"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-ink",
              )}
            >
              <Icon name={f.icon} size={14} /> {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Icon name="Search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or place…"
            aria-label="Search events"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
          />
        </div>
      </div>

      {/* Grid of events */}
      {rest.length === 0 ? (
        <EmptyState
          icon="Search"
          title="No gatherings match yet"
          body="Try a different filter or clear your search — new tables are being set every week."
          action={
            <Button
              variant="outline"
              icon="RefreshCw"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col">
                <EventCard event={e} onDetails={setOpenId} layout="vertical" />
                <Link
                  href={`/events/${e.id}`}
                  className="mt-2 inline-flex items-center gap-1 self-end text-xs font-medium text-muted transition-colors hover:text-accent"
                >
                  Full page <Icon name="ArrowUpRight" size={13} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <EventDetailModal event={openEvent} open={openId !== null} onClose={() => setOpenId(null)} />
    </div>
  );
}
