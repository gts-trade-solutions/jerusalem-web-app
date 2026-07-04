"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Reveal } from "@/components/ui/Reveal";
import { StatPill } from "@/components/ui/StatPill";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { PrayerCard } from "@/components/PrayerCard";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

type FilterKey = "all" | "needs" | "answered";
type SortKey = "recent" | "prayed";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All" },
  { id: "needs", label: "Needs Prayer" },
  { id: "answered", label: "Answered" },
];

export function PrayForOthers() {
  const { feed, addFeedItem, prayingIds } = useAppData();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const prayers = useMemo(() => feed.filter((f) => f.kind === "prayer"), [feed]);

  const shown = useMemo(() => {
    let list = prayers;
    if (filter !== "all") list = list.filter((p) => p.status === filter);
    list = [...list].sort((a, b) => {
      if (sort === "prayed") return b.reactions - a.reactions;
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });
    return list;
  }, [prayers, filter, sort]);

  const answeredCount = prayers.filter((p) => p.status === "answered").length;
  const saintsPraying = prayingIds.size;
  const canSubmit = title.trim().length > 2 && body.trim().length > 4;

  function submit() {
    if (!canSubmit) return;
    addFeedItem({ kind: "prayer", title: title.trim(), body: body.trim(), status: "needs" });
    setTitle("");
    setBody("");
    setOpen(false);
  }

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-surface-2/40 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Prayer Feed</span>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl text-balance">
                Carry each other to the Lord
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                Every burden shared here is met by a community that kneels together. Tap “Praying” to
                stand with a neighbor, and add your own request — you never have to carry it alone.
              </p>
            </div>
            <Button variant="accent" icon="Plus" onClick={() => setOpen(true)} className="shrink-0">
              Add Prayer Request
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatPill value={prayers.length} label="Prayers This Week" icon="Hand" />
            <StatPill value={answeredCount} label="Answered" icon="CheckCircle2" />
            <StatPill value={218 + saintsPraying} label="Saints Praying" icon="Users" />
          </div>
        </div>
      </Reveal>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Filter prayers">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-accent/40 bg-accent-soft text-accent-strong dark:text-accent"
                  : "border-border text-muted hover:border-accent/40 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
          <Icon name="Filter" size={15} className="text-faint" />
          <span className="text-muted">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort prayers"
            className="bg-transparent font-medium text-ink outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="prayed">Most Prayed</option>
          </select>
        </label>
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <EmptyState
          icon="Hand"
          title="No prayers here yet"
          body="Be the first to share a request, or switch filters to see how the Lord has answered."
          action={<Button variant="accent" icon="Plus" onClick={() => setOpen(true)}>Add Prayer Request</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 5) * 0.05}>
              <PrayerCard item={p} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Add modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share a Prayer Request"
        description="Your request goes out to a community that prays with real faith."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="accent" icon="Send" disabled={!canSubmit} onClick={submit}>
              Share Request
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="pr-title" className="mb-1.5 block text-sm font-medium text-ink">
              What can we pray for?
            </label>
            <input
              id="pr-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="e.g. Comfort for the Reyes family"
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="pr-body" className="mb-1.5 block text-sm font-medium text-ink">
              Tell us a little more
            </label>
            <textarea
              id="pr-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="Share as much or as little as feels right. This community holds it gently."
              className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
            <p className="mt-1 text-right text-[11px] text-faint">{body.length}/400</p>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-border bg-surface-2/60 p-3 text-xs text-muted">
            <Icon name="Info" size={15} className="mt-0.5 shrink-0 text-accent" />
            Your request will be posted as “Needs Prayer.” When the Lord answers, come back and mark it answered so we can rejoice with you.
          </div>
        </div>
      </Modal>
    </div>
  );
}
