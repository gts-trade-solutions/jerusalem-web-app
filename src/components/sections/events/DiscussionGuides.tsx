"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";

const STARTERS = [
  "When did the Book of Mormon first feel true to you — not just factual, but personal?",
  "Alma asks if we have \"felt to sing the song of redeeming love.\" When have you felt that?",
  "What does it mean to you that Christ visited people in the Americas?",
  "If a friend had never heard of the Book of Mormon, how would you describe it in one sentence?",
  "King Benjamin says serving others is serving God. Where have you seen that this week?",
  "Moroni promises we can know truth by asking God. Have you tried that promise?",
  "What's one verse you'd want read aloud at a gathering like this — and why?",
];

export function DiscussionGuides() {
  const { pushToast } = useAppData();
  const [whatOpen, setWhatOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [story, setStory] = useState("");

  function submitStory(e: React.FormEvent) {
    e.preventDefault();
    setStory("");
    setStoryOpen(false);
    pushToast("Thank you — your story has been shared 🕯️", "success");
  }

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Discussion Guides</h2>
            <p className="mt-1.5 max-w-xl text-sm text-muted">
              Simple, unpressured ways to open the Book of Mormon together. No degrees required — just curiosity and
              an open heart.
            </p>
          </div>
          <Button
            variant="accent"
            icon="Download"
            onClick={() => pushToast("Starter kit downloading… 📥", "accent")}
          >
            B&amp;B Starter Kit
          </Button>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* What is B&B */}
        <Reveal>
          <Card className="flex h-full flex-col p-6">
            <span className="mb-4 grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
              <Icon name="Flame" size={24} />
            </span>
            <h3 className="font-serif text-lg font-semibold text-ink">What is B&amp;B?</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              Barbecue &amp; Book of Mormon is exactly what it sounds like: good food, good neighbors, and an open,
              friendly study of scripture. It&apos;s low-pressure fellowship where believers and the curious sit at
              the same table.
            </p>
            <Button variant="outline" size="sm" iconRight="ArrowRight" className="mt-4 self-start" onClick={() => setWhatOpen(true)}>
              How it works
            </Button>
          </Card>
        </Reveal>

        {/* Conversation Starters */}
        <Reveal delay={0.06}>
          <Card className="flex h-full flex-col p-6">
            <span className="mb-4 grid size-12 place-items-center rounded-xl bg-sage-soft text-sage">
              <Icon name="MessageCircle" size={24} />
            </span>
            <h3 className="font-serif text-lg font-semibold text-ink">Conversation Starters</h3>
            <ul className="mt-3 flex-1 space-y-2.5">
              {STARTERS.slice(0, 4).map((q) => (
                <li key={q} className="flex gap-2 text-sm leading-snug text-muted">
                  <Icon name="Quote" size={14} className="mt-0.5 shrink-0 text-accent" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              size="sm"
              icon="Sparkles"
              className="mt-4 self-start"
              onClick={() => pushToast("More starters copied to your guide ✨", "success")}
            >
              {STARTERS.length - 4}+ more questions
            </Button>
          </Card>
        </Reveal>

        {/* Share Your Story */}
        <Reveal delay={0.12}>
          <Card className="flex h-full flex-col p-6">
            <span className="mb-4 grid size-12 place-items-center rounded-xl bg-ink text-bg dark:bg-surface-3 dark:text-ink">
              <Icon name="HandHeart" size={24} />
            </span>
            <h3 className="font-serif text-lg font-semibold text-ink">Share Your Story</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              A neighbor&apos;s testimony often opens more hearts than a sermon. Share how a B&amp;B night or the Book
              of Mormon has changed you — and encourage someone to come to their first gathering.
            </p>
            <Button variant="outline" size="sm" iconRight="ArrowRight" className="mt-4 self-start" onClick={() => setStoryOpen(true)}>
              Share your story
            </Button>
          </Card>
        </Reveal>
      </div>

      {/* Full starter list */}
      <Reveal>
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={18} className="text-accent" />
            <h3 className="font-serif text-lg font-semibold text-ink">The full starter question set</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {STARTERS.map((q, i) => (
              <div key={q} className="flex gap-3 rounded-xl border border-border bg-surface-2/50 p-3.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-strong dark:text-accent">
                  {i + 1}
                </span>
                <p className="text-sm leading-snug text-ink">{q}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* What is B&B modal */}
      <Modal open={whatOpen} onClose={() => setWhatOpen(false)} title="How a B&B night works" size="md">
        <ol className="space-y-4">
          {[
            { t: "Fire up the grill", b: "Food breaks the ice. Ribs, burgers, tacos — whatever gathers people. Eat first, no agenda." },
            { t: "Read a short passage", b: "Pick one chapter or a handful of verses. Read it aloud together — take turns if folks are willing." },
            { t: "Ask, don't preach", b: "Use a conversation starter. Let everyone share, including friends of other faiths. Curiosity over conclusions." },
            { t: "Close with a hymn or prayer", b: "As the fire dies down, sing one hymn or share a brief testimony. Invite them back next time." },
          ].map((s, i) => (
            <li key={s.t} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{s.t}</p>
                <p className="mt-0.5 text-sm text-muted">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-center gap-2">
          <Badge tone="sage" icon="Heart">All are welcome</Badge>
          <Badge tone="accent" icon="Flame">No experience needed</Badge>
        </div>
      </Modal>

      {/* Share your story modal */}
      <Modal
        open={storyOpen}
        onClose={() => setStoryOpen(false)}
        title="Share Your Story"
        description="Your witness may be exactly what a neighbor needs to hear."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setStoryOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="story-form" variant="accent" icon="Send">
              Share story
            </Button>
          </>
        }
      >
        <form id="story-form" onSubmit={submitStory}>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="story-body">
            Your story
          </label>
          <textarea
            id="story-body"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={5}
            placeholder="I came to my first B&B night just for the ribs, but I stayed for the way people cared…"
            className="w-full resize-none rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus-visible:border-accent focus-visible:outline-2"
          />
        </form>
      </Modal>
    </div>
  );
}
