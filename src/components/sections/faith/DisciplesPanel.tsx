"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeedItemCard } from "@/components/FeedItemCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";

export function DisciplesPanel() {
  const { feed, addFeedItem } = useAppData();
  const testimonies = useMemo(() => feed.filter((f) => f.kind === "testimony"), [feed]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    addFeedItem({ kind: "testimony", title: title.trim(), body: body.trim() });
    setTitle("");
    setBody("");
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Messages from Disciples"
        title="Ordinary Saints, extraordinary witnesses"
        intro="These are the words of neighbors and friends who have felt the Savior's hand. Every testimony is a lamp lit on the covenant path — read them, and then add your own."
        action={
          <Button variant="accent" icon="Sparkles" onClick={() => setOpen(true)}>
            Share Your Testimony
          </Button>
        }
      />

      {testimonies.length === 0 ? (
        <EmptyState
          icon="Sparkles"
          title="No testimonies yet"
          body="Be the first to bear witness of Christ in this community."
          action={<Button variant="accent" onClick={() => setOpen(true)}>Share Yours</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonies.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.06}>
              <FeedItemCard item={t} className="h-full" />
            </Reveal>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share your testimony"
        description="Bear witness of what the Savior has done in your life. Your words may be the answer to someone's prayer."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" icon="Send" onClick={submit} disabled={!title.trim() || !body.trim()}>
              Share Testimony
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. He answered me when I finally listened"
              className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Your witness</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              placeholder="Share the moment, the scripture, or the impression that strengthened your faith in Jesus Christ…"
              className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <p className="text-xs text-faint">
            Testimonies are shared with your ward community in the spirit of reverence and love.
          </p>
        </div>
      </Modal>
    </div>
  );
}
