"use client";

import { useState } from "react";
import type { FeedItem } from "@/types";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Icon } from "./Icon";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/cn";

const kindMeta: Record<FeedItem["kind"], { label: string; icon: string; tone: "accent" | "sage" | "neutral" }> = {
  testimony: { label: "Testimony", icon: "Sparkles", tone: "accent" },
  leaderMessage: { label: "Leader Message", icon: "Quote", tone: "sage" },
  story: { label: "Story of Love", icon: "Heart", tone: "neutral" },
  prayer: { label: "Prayer", icon: "Hand", tone: "accent" },
};

export function FeedItemCard({ item, className }: { item: FeedItem; className?: string }) {
  const meta = kindMeta[item.kind];
  const [liked, setLiked] = useState(false);
  const count = item.reactions + (liked ? 1 : 0);

  return (
    <article className={cn("relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-2/50 p-5 shadow-sm card-hover", className)}>
      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-0.5",
          meta.tone === "sage"
            ? "bg-gradient-to-r from-transparent via-sage to-transparent"
            : "bg-gradient-to-r from-transparent via-accent to-transparent",
        )}
      />
      <div className="flex items-center justify-between">
        <Badge tone={meta.tone} icon={meta.icon}>{meta.label}</Badge>
        <span className="text-xs text-faint">{timeAgo(item.createdAt)}</span>
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-ink text-balance">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2.5">
          <Avatar name={item.author.name} seed={item.author.id} size={30} />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-ink">{item.author.name}</p>
            <p className="text-[11px] text-faint">{item.author.locale}</p>
          </div>
        </div>
        <button
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            liked ? "text-accent" : "text-faint hover:text-ink",
          )}
        >
          <Icon name="Heart" size={15} strokeWidth={liked ? 2.4 : 1.75} />
          <span className="tabular-nums">{count}</span>
        </button>
      </div>
    </article>
  );
}
