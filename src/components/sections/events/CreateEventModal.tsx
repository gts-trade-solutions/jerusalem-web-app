"use client";

import { useState } from "react";
import type { EventType } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { useAppData } from "@/context/AppDataContext";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/cn";

const TYPE_OPTIONS: { id: EventType; label: string; icon: string }[] = [
  { id: "bb", label: "Barbecue & Book of Mormon", icon: "Flame" },
  { id: "worship", label: "Worship", icon: "Church" },
  { id: "fellowship", label: "Fellowship", icon: "Users" },
  { id: "livestream", label: "Livestream", icon: "Radio" },
];

/** Shared create-event sheet used by both the Map tab and Host Tools. */
export function CreateEventModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addEvent } = useAppData();
  const { user, role } = useUser();
  const isHost = role === "Host" || role === "Leader";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EventType>("bb");
  const [date, setDate] = useState("2026-08-08");
  const [time, setTime] = useState("18:00");
  const [location, setLocation] = useState("");
  const [hostName, setHostName] = useState(user.name);

  function reset() {
    setTitle("");
    setDescription("");
    setType("bb");
    setDate("2026-08-08");
    setTime("18:00");
    setLocation("");
    setHostName(user.name);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Build an ISO start from the date + time (UTC to stay hydration-safe).
    const start = `${date}T${time}:00Z`;
    addEvent({
      type,
      title: title.trim() || "A Gathering at My Table",
      description:
        description.trim() ||
        "An open invitation to gather, break bread, and open the Book of Mormon together. All are welcome.",
      start,
      location: location.trim() || "Your Neighborhood",
      hostName: hostName.trim() || user.name,
      pin: { x: 30 + Math.round(Math.random() * 40), y: 30 + Math.round(Math.random() * 40) },
    });
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} size="lg" title="Sign Up to Host" description="Open your table and gather your neighbors. Your event goes live the moment you post it.">
      {!isHost && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent-soft/60 p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-strong dark:text-accent">
            <Icon name="Sparkles" size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Become a host in Zion</p>
            <p className="mt-0.5 text-sm text-muted">
              You don&apos;t need a title to open your door. Post your first gathering below — many faithful hosts
              began with a single backyard and a plate of ribs.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-title">
            Event title
          </label>
          <input
            id="ce-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Barbecue & Book of Mormon — Alma 32"
            className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-ink">Gathering type</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TYPE_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setType(o.id)}
                aria-pressed={type === o.id}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-xs font-medium transition-colors",
                  type === o.id
                    ? "border-accent bg-accent-soft text-accent-strong dark:text-accent"
                    : "border-border bg-surface-2/50 text-muted hover:border-border-strong hover:text-ink",
                )}
              >
                <Icon name={o.icon} size={18} />
                <span className="leading-tight">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-desc">
            Description
          </label>
          <textarea
            id="ce-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Tell your neighbors what to expect — the menu, the chapter you'll read, what to bring."
            className="w-full resize-none rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-date">
              Date
            </label>
            <input
              id="ce-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink focus-visible:border-accent focus-visible:outline-2"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-time">
              Time
            </label>
            <input
              id="ce-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink focus-visible:border-accent focus-visible:outline-2"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-loc">
              Location
            </label>
            <input
              id="ce-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your backyard · Orem, UT"
              className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="ce-host">
              Host name
            </label>
            <input
              id="ce-host"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" icon="Flame">
            Post my gathering
          </Button>
        </div>
      </form>
    </Modal>
  );
}
