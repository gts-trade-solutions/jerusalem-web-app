"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/Icon";
import { RsvpButton } from "@/components/RsvpButton";
import { dateChip, formatDateLong, formatTime } from "@/lib/format";
import { cn } from "@/lib/cn";

// Fixed demo "now" — matches lib/format so live/upcoming never drifts.
const NOW = Date.parse("2026-07-04T12:00:00Z");
const LIVE_WINDOW_MS = 90 * 60 * 1000; // treat a stream as "live" within 90 min of its start

function statusOf(iso: string): "live" | "upcoming" {
  const start = Date.parse(iso);
  return Math.abs(start - NOW) <= LIVE_WINDOW_MS ? "live" : "upcoming";
}

export function LivestreamWatch() {
  const { events, pushToast } = useAppData();
  const [watching, setWatching] = useState<EventItem | null>(null);

  const streams = useMemo(
    () =>
      events
        .filter((e) => e.type === "livestream")
        .slice()
        .sort((a, b) => Date.parse(a.start) - Date.parse(b.start)),
    [events],
  );

  // Featured: the one currently live, else the soonest upcoming.
  const featured = useMemo(
    () => streams.find((s) => statusOf(s.start) === "live") ?? streams[0] ?? null,
    [streams],
  );
  const rest = streams.filter((s) => s.id !== featured?.id);

  function openWatch(ev: EventItem) {
    setWatching(ev);
    pushToast("Joining livestream…", "accent");
  }

  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="Livestream & Watch"
        title="Gather from anywhere — the broadcast is always open"
        intro="Can't be there in person? Pull up a chair at home, project it on the wall for your fellowship group, and worship together across every distance."
      />

      {!featured ? (
        <EmptyState icon="MonitorPlay" title="No broadcasts scheduled" body="Check back soon — the next stream is being prepared." />
      ) : (
        <>
          {/* On Air / Next Up hero card */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <PhotoBlock
                seed={featured.image ?? featured.id}
                w={1200}
                h={560}
                overlay="ink"
                icon="MonitorPlay"
                rounded="rounded-none"
                className="min-h-[24rem]"
              >
                <div className="flex h-full flex-col justify-between p-7 sm:p-10">
                  <div className="flex items-center gap-2">
                    {statusOf(featured.start) === "live" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-danger px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                        <span className="size-2 animate-pulse rounded-full bg-white" /> On Air
                      </span>
                    ) : (
                      <Badge tone="accent" icon="Clock" className="bg-white/10 text-[#e6c67d] backdrop-blur">
                        Next Up
                      </Badge>
                    )}
                    <Badge tone="neutral" className="bg-white/10 text-white/80 backdrop-blur">
                      {featured.going.toLocaleString()} watching
                    </Badge>
                  </div>

                  <div>
                    <h3 className="max-w-2xl font-serif text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 text-pretty">
                      {featured.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="CalendarDays" size={14} /> {formatDateLong(featured.start)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="Clock" size={14} /> {formatTime(featured.start)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="Radio" size={14} /> {featured.hostName}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button variant="accent" size="md" icon="Play" onClick={() => openWatch(featured)}>
                        Watch Now
                      </Button>
                      <div className="[&_button]:border-white/25 [&_button]:bg-white/5 [&_button]:text-white">
                        <RsvpButton id={featured.id} showCount={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </PhotoBlock>
            </div>
          </Reveal>

          {/* Schedule list */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-ink">
              <Icon name="ListMusic" size={20} className="text-accent" /> Livestream Schedule
            </h3>
            {rest.length === 0 ? (
              <p className="text-sm text-muted">This is the only broadcast on the calendar right now.</p>
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                {rest.map((s, i) => {
                  const chip = dateChip(s.start);
                  const live = statusOf(s.start) === "live";
                  return (
                    <Reveal key={s.id} delay={i * 0.05}>
                      <li className="flex flex-col gap-4 p-4 transition-colors hover:bg-surface-2/50 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                        <div className="flex shrink-0 flex-col items-center rounded-xl bg-surface-2 px-3 py-2 text-center">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-accent">{chip.mon}</span>
                          <span className="font-serif text-xl font-semibold leading-none text-ink">{chip.day}</span>
                          <span className="mt-0.5 text-[10px] font-medium uppercase text-faint">{chip.weekday}</span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-serif text-base font-semibold leading-snug text-ink text-balance">
                              {s.title}
                            </h4>
                            <Badge
                              tone={live ? "answered" : "outline"}
                              icon={live ? "Radio" : "Clock"}
                              className={cn(live && "bg-danger/10 text-danger border-danger/30")}
                            >
                              {live ? "Live" : "Upcoming"}
                            </Badge>
                          </div>
                          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                            <span className="inline-flex items-center gap-1.5">
                              <Icon name="Clock" size={13} /> {formatTime(s.start)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Icon name="Radio" size={13} /> {s.hostName}
                            </span>
                          </p>
                        </div>

                        <Button
                          variant={live ? "accent" : "outline"}
                          size="sm"
                          icon="MonitorPlay"
                          onClick={() => openWatch(s)}
                          className="shrink-0 self-start sm:self-center"
                        >
                          Watch
                        </Button>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}

      {/* Watch player placeholder modal */}
      <Modal open={!!watching} onClose={() => setWatching(null)} size="lg" title={undefined}>
        {watching && (
          <div className="-mx-6 -mt-5">
            <PhotoBlock
              seed={watching.image ?? watching.id}
              w={960}
              h={540}
              overlay="ink"
              icon="MonitorPlay"
              rounded="rounded-none"
              className="aspect-video"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-danger px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  <span className="size-2 animate-pulse rounded-full bg-white" /> Live
                </span>
                <button
                  type="button"
                  aria-label="Play livestream"
                  onClick={() => pushToast("Streaming in full quality — welcome in 🎬", "accent")}
                  className="grid size-20 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-transform hover:scale-105 active:scale-95"
                >
                  <Icon name="Play" size={34} />
                </button>
                <h3 className="max-w-md font-serif text-xl font-semibold leading-tight text-white text-balance">
                  {watching.title}
                </h3>
                <p className="text-xs text-white/70">
                  {formatDateLong(watching.start)} · {formatTime(watching.start)} · {watching.hostName}
                </p>
              </div>
            </PhotoBlock>
          </div>
        )}
        {watching && (
          <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted">{watching.description}</p>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                icon="Share2"
                onClick={() => pushToast("Watch link copied — invite your group 🤝", "accent")}
              >
                Share
              </Button>
              <Button variant="ghost" size="sm" icon="X" onClick={() => setWatching(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
