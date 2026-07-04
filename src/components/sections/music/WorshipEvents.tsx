"use client";

import { useState } from "react";
import type { EventItem } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";

const RESOURCES = [
  {
    icon: "BookOpen",
    title: "Hymnbook",
    body: "The full hymnbook with lyrics, keys, and scripture footnotes.",
    toast: "Opening the hymnbook 📖",
  },
  {
    icon: "FileText",
    title: "Sheet Music",
    body: "Printable SATB arrangements for choirs and organists.",
    toast: "Sheet music ready to download 🎼",
  },
  {
    icon: "Headphones",
    title: "Practice Tracks",
    body: "Part-by-part rehearsal tracks — soprano, alto, tenor, bass.",
    toast: "Practice tracks queued 🎧",
  },
  {
    icon: "Compass",
    title: "Conducting Guide",
    body: "Beat patterns, tempos, and tips for leading congregational song.",
    toast: "Conducting guide opened 🧭",
  },
] as const;

export function WorshipEvents() {
  const { events, pushToast } = useAppData();
  const [detail, setDetail] = useState<EventItem | null>(null);
  const [open, setOpen] = useState(false);

  const worshipEvents = events.filter(
    (e) => e.type === "worship" || e.type === "livestream",
  );

  function showDetails(id: string) {
    const ev = events.find((e) => e.id === id) ?? null;
    setDetail(ev);
    setOpen(true);
  }

  return (
    <div className="space-y-14">
      <div>
        <SectionHeading
          eyebrow="Virtual Choirs & Worship Nights"
          title="Gather to worship in song"
          intro="Firesides, sacred music evenings, and global virtual-choir premieres. RSVP and we'll save you a seat — or a spot in the livestream."
        />
        {worshipEvents.length === 0 ? (
          <EmptyState
            icon="CalendarDays"
            title="No worship nights scheduled"
            body="Check back soon — new gatherings are added every week."
          />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {worshipEvents.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.06}>
                <EventCard event={ev} onDetails={showDetails} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionHeading
          eyebrow="Worship Resources"
          title="Everything your choir needs"
          intro="Free tools to help you prepare, practice, and lead sacred music with confidence."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => pushToast(r.toast, "accent")}
                className="flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-5 text-left shadow-sm card-hover"
              >
                <span className="mb-4 grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
                  <Icon name={r.icon} size={22} />
                </span>
                <h3 className="font-serif text-base font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Open <Icon name="ArrowUpRight" size={14} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <EventDetailModal event={detail} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
