"use client";

import type { FeedItem } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Icon } from "./Icon";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PrayerCard({ item }: { item: FeedItem }) {
  const { prayingIds, togglePraying } = useAppData();
  const praying = prayingIds.has(item.id);
  const answered = item.status === "answered";

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-2/50 p-5 shadow-sm card-hover">
      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-0.5",
          answered
            ? "bg-gradient-to-r from-transparent via-sage to-transparent"
            : "bg-gradient-to-r from-transparent via-accent to-transparent",
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={item.author.name} seed={item.author.id} size={40} />
          <div>
            <p className="text-sm font-semibold text-ink">{item.author.name}</p>
            <p className="text-xs text-faint">
              {item.author.locale} · {timeAgo(item.createdAt)}
            </p>
          </div>
        </div>
        <Badge tone={answered ? "answered" : "needs"} icon={answered ? "CheckCircle2" : "Hand"}>
          {answered ? "Answered" : "Needs Prayer"}
        </Badge>
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-ink">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <button
          onClick={() => togglePraying(item.id)}
          aria-pressed={praying}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
            praying
              ? "border-accent/40 bg-accent-soft text-accent-strong dark:text-accent"
              : "border-border text-ink-soft hover:border-accent/40 hover:bg-accent-soft/50",
          )}
        >
          <span className={cn("transition-transform", praying && "scale-110")}>🙏</span>
          Praying
          <span className="tabular-nums">{item.reactions.toLocaleString()}</span>
        </button>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-faint transition-colors hover:text-ink" aria-label="Send encouragement">
          <Icon name="MessageCircle" size={14} /> Encourage
        </button>
      </div>
    </article>
  );
}
