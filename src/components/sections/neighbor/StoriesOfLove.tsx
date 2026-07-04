"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { timeAgo } from "@/lib/format";
import type { FeedItem } from "@/types";

function StoryCard({ item }: { item: FeedItem }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm card-hover sm:w-[360px]">
      <PhotoBlock seed={`story-${item.id}`} icon="Heart" overlay="dawn" rounded="rounded-none" className="h-40">
        <div className="flex h-full items-end p-4">
          <Badge tone="accent" className="bg-surface/90 backdrop-blur" icon="Heart">Story of Love</Badge>
        </div>
      </PhotoBlock>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={item.author.name} seed={item.author.id} size={30} />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-ink">{item.author.name}</p>
              <p className="text-[11px] text-faint">{item.author.locale} · {timeAgo(item.createdAt)}</p>
            </div>
          </div>
          <button
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label="Love this story"
            className={liked ? "inline-flex items-center gap-1.5 text-sm font-medium text-accent" : "inline-flex items-center gap-1.5 text-sm font-medium text-faint transition-colors hover:text-ink"}
          >
            <Icon name="Heart" size={15} strokeWidth={liked ? 2.4 : 1.75} />
            <span className="tabular-nums">{item.reactions + (liked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function StoriesOfLove() {
  const { feed, pushToast } = useAppData();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const stories = useMemo(() => feed.filter((f) => f.kind === "story"), [feed]);
  const canSubmit = title.trim().length > 2 && body.trim().length > 4;

  function submit() {
    if (!canSubmit) return;
    pushToast("Thank you for sharing — your story will inspire someone today 💛", "success");
    setTitle("");
    setBody("");
    setOpen(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Stories of Love</span>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl text-balance">
            The small kindnesses that gather a people
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            A casserole at the right moment. A circle that wouldn't let her fall. These are the quiet
            miracles of a community that loves the way Christ asked. Add yours.
          </p>
        </Reveal>
        <Button variant="accent" icon="Plus" onClick={() => setOpen(true)} className="shrink-0">
          Share Your Story
        </Button>
      </div>

      <Reveal>
        <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {stories.map((s) => (
            <StoryCard key={s.id} item={s} />
          ))}
          <button
            onClick={() => setOpen(true)}
            className="flex w-[300px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border-strong bg-surface/40 p-6 text-center transition-colors hover:border-accent hover:bg-accent-soft/40 sm:w-[360px]"
          >
            <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
              <Icon name="Plus" size={24} />
            </span>
            <span className="font-serif text-lg font-semibold text-ink">Add your story of love</span>
            <span className="text-sm text-muted">Every witness of kindness lifts the whole gathering.</span>
          </button>
        </div>
      </Reveal>

      <p className="text-center text-xs text-faint">
        <Icon name="ChevronLeft" size={12} className="inline" /> Scroll to read more <Icon name="ChevronRight" size={12} className="inline" />
      </p>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share Your Story of Love"
        description="Tell us about a moment when love showed up."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="accent" icon="Send" disabled={!canSubmit} onClick={submit}>Share Story</Button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="overflow-hidden rounded-xl">
            <PhotoBlock seed="story-share-hero" icon="Heart" overlay="dawn" rounded="rounded-none" className="h-28">
              <div className="flex h-full items-center justify-center">
                <p className="font-serif text-lg italic text-white/90">“By this shall all men know…”</p>
              </div>
            </PhotoBlock>
          </div>
          <div>
            <label htmlFor="st-title" className="mb-1.5 block text-sm font-medium text-ink">Give your story a title</label>
            <input
              id="st-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="e.g. The neighbors who became family"
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="st-body" className="mb-1.5 block text-sm font-medium text-ink">What happened?</label>
            <textarea
              id="st-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="Describe the kindness, who it touched, and how it changed things…"
              className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
            <p className="mt-1 text-right text-[11px] text-faint">{body.length}/400</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
