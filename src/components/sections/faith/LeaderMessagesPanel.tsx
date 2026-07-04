"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PlayerModal } from "./PlayerModal";
import { cn } from "@/lib/cn";

export function LeaderMessagesPanel() {
  const { feed } = useAppData();
  const messages = useMemo(() => feed.filter((f) => f.kind === "leaderMessage"), [feed]);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const featured = messages[featuredIdx];
  const go = (dir: 1 | -1) =>
    setFeaturedIdx((i) => (i + dir + messages.length) % messages.length);

  if (!featured) return null;

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Messages from Church Leaders"
        title="Counsel from those who watch over us"
        intro="Prophets, apostles, and local shepherds testify of Jesus Christ and invite us onto the covenant path. Sit a while, and let their witness strengthen yours."
      />

      {/* Featured video-style card */}
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${featured.title}`}
            className="group block w-full text-left"
          >
            <PhotoBlock
              seed={`leader-${featured.id}`}
              h={420}
              overlay="ink"
              icon="MonitorPlay"
              className="w-full"
            >
              <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Badge tone="accent" icon="Radio" className="bg-white/10 text-white border-white/20">
                    Featured Message
                  </Badge>
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    12:48
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur transition-transform group-hover:scale-105">
                    <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-fg shadow-lg">
                      <Icon name="Play" size={22} strokeWidth={2.4} />
                    </span>
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {featured.author.name} · {featured.author.locale}
                    </p>
                  </div>
                </div>
              </div>
            </PhotoBlock>
          </button>

          <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <Icon name="Quote" size={26} className="text-accent" />
            <blockquote className="mt-3 font-serif text-lg italic leading-snug text-ink text-pretty">
              “{featured.body}”
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
              <Avatar name={featured.author.name} seed={featured.author.id} size={40} ring />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">{featured.author.name}</p>
                <p className="text-xs text-faint">{featured.author.locale}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <Button variant="accent" icon="Play" onClick={() => setPlaying(true)}>
                Watch Message
              </Button>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous message"
                  className="grid size-9 place-items-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <span className="text-xs tabular-nums text-faint">
                  {featuredIdx + 1} / {messages.length}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next message"
                  className="grid size-9 place-items-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Rail of other messages */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-serif text-lg font-semibold text-ink">More from our leaders</h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid size-8 place-items-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="grid size-8 place-items-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
        <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
          {messages.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setFeaturedIdx(i)}
              className={cn(
                "group w-64 shrink-0 text-left",
                i === featuredIdx && "ring-2 ring-accent rounded-2xl",
              )}
              aria-current={i === featuredIdx}
            >
              <PhotoBlock seed={`leader-thumb-${m.id}`} h={140} overlay="ink" icon="MonitorPlay">
                <div className="flex h-full w-full items-end p-3">
                  <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-transform group-hover:scale-110">
                    <Icon name="Play" size={15} strokeWidth={2.4} />
                  </span>
                </div>
              </PhotoBlock>
              <p className="mt-2.5 line-clamp-2 font-serif text-sm font-semibold leading-snug text-ink">
                {m.title}
              </p>
              <p className="mt-1 text-xs text-faint">{m.author.name}</p>
            </button>
          ))}
        </div>
      </div>

      <PlayerModal
        open={playing}
        onClose={() => setPlaying(false)}
        seed={`leader-${featured.id}`}
        title={featured.title}
        presenter={`${featured.author.name} · ${featured.author.locale}`}
      />
    </div>
  );
}
