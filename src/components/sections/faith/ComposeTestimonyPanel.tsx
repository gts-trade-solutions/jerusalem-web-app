"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const prompts = [
  "A time the Savior answered a prayer",
  "How the Book of Mormon changed me",
  "A moment I felt the Spirit clearly",
  "Why I follow Jesus Christ",
];

const guidance = [
  { icon: "Heart", title: "Speak from the heart", body: "Plain, honest words carry the Spirit further than polished ones ever could." },
  { icon: "BookOpen", title: "Anchor it in scripture", body: "A verse that touched you gives others a place to begin their own study." },
  { icon: "Sparkles", title: "Point to Christ", body: "Let your witness lead every reader back to the Savior and His atoning love." },
];

export function ComposeTestimonyPanel() {
  const { addFeedItem, pushToast } = useAppData();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    addFeedItem({ kind: "testimony", title: title.trim(), body: body.trim() });
    setTitle("");
    setBody("");
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Share Your Testimony"
        title="Your witness matters — write it down"
        intro="A testimony grows stronger the moment it is shared. Take your time. Somewhere, a soul is waiting for exactly the light you have found."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTitle(p)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    title === p
                      ? "border-accent bg-accent-soft text-accent-strong dark:text-accent"
                      : "border-border-strong text-muted hover:border-accent hover:text-accent",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Give your testimony a title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is the heart of what you want to say?"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Your testimony of Jesus Christ</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                placeholder="Write freely. Describe the experience, the feeling, the scripture, or the change of heart that taught you the reality of the Savior…"
                className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
              />
            </label>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-faint tabular-nums">{body.length} characters</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTitle("");
                    setBody("");
                    pushToast("Draft cleared", "default");
                  }}
                >
                  Clear
                </Button>
                <Button variant="accent" icon="Send" onClick={submit} disabled={!title.trim() || !body.trim()}>
                  Share Testimony
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-4">
            <div className="rounded-2xl border border-border bg-surface-2/50 p-6">
              <h4 className="font-serif text-lg font-semibold text-ink">A few gentle guides</h4>
              <ul className="mt-4 space-y-4">
                {guidance.map((g) => (
                  <li key={g.title} className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-strong dark:text-accent">
                      <Icon name={g.icon} size={17} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{g.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{g.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <Icon name="Quote" size={22} className="text-accent" />
              <blockquote className="mt-2 font-serif text-base italic leading-snug text-ink">
                “By small and simple things are great things brought to pass.”
              </blockquote>
              <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">
                Alma 37:6
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
