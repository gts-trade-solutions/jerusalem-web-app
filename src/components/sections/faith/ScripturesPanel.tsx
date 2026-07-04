"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { readingPlans } from "@/data/homeThemes";
import { ribbons } from "@/data/scriptures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function ScripturesPanel() {
  const { pushToast } = useAppData();
  const verse = ribbons.faith.featured;
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const markComplete = (id: string, label: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    pushToast(`${label} — today's reading marked complete 📖`, "success");
  };

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Scriptures & Book of Mormon"
        title="Feast upon the words of Christ"
        intro="Daily immersion in the Old and New Testaments and the Book of Mormon anchors a Christ-centered life. Keep your covenant of study — one chapter, one verse, one day at a time."
      />

      {/* Highlighted verse hero */}
      <Reveal>
        <figure className="relative overflow-hidden rounded-3xl border border-border bg-ink-900 px-6 py-12 text-white grain sm:px-12">
          <div className="pointer-events-none absolute inset-0 dawn-wash opacity-50" />
          <div className="relative z-[1] mx-auto max-w-2xl text-center">
            <Icon name="BookOpen" size={30} className="mx-auto text-[#e6c67d]" />
            <blockquote className="mt-5 font-serif text-2xl italic leading-snug text-white sm:text-3xl text-balance">
              “{verse.text}”
            </blockquote>
            <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
              {verse.ref}
            </figcaption>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                variant="accent"
                icon="BookOpen"
                onClick={() => pushToast("Opening the Book of Mormon to Alma 32 📖", "accent")}
              >
                Read in Context
              </Button>
              <Button
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                icon="Bookmark"
                onClick={() => pushToast("Verse bookmarked to your study journal", "success")}
              >
                Save to Journal
              </Button>
            </div>
          </div>
        </figure>
      </Reveal>

      {/* Today's Reading Plan */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
            <Icon name="CalendarDays" size={20} />
          </span>
          <div>
            <h3 className="font-serif text-xl font-semibold text-ink">Today&apos;s Reading Plan</h3>
            <p className="text-sm text-muted">Three testaments, one covenant of daily study.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {readingPlans.map((rp, i) => {
            const done = completed.has(rp.id);
            return (
              <Reveal key={rp.id} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
                  <ProgressRing value={rp.read} total={rp.total} label={rp.label} sublabel={rp.reference} />
                  <p className="mt-3 text-xs text-faint">
                    {rp.read} of {rp.total} chapters
                  </p>
                  <Button
                    size="sm"
                    variant={done ? "sage" : "outline"}
                    icon={done ? "CheckCircle2" : "Circle"}
                    className="mt-4"
                    onClick={() => markComplete(rp.id, rp.label)}
                    disabled={done}
                  >
                    {done ? "Completed Today" : "Mark Today Complete"}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className={cn("mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-2/50 p-5")}>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-sage-soft text-sage">
              <Icon name="Flame" size={20} />
            </span>
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">{completed.size} of 3</span> readings finished today.
              Keep the flame of your study burning.
            </p>
          </div>
          <Button
            variant="accent"
            icon="BookOpen"
            iconRight="ArrowRight"
            onClick={() => pushToast("Continuing your Book of Mormon reading in Alma 32", "accent")}
          >
            Continue Reading
          </Button>
        </div>
      </div>
    </div>
  );
}
