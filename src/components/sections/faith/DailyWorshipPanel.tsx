"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { ribbons } from "@/data/scriptures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PlayerModal } from "./PlayerModal";

const verseOfDay = ribbons.faith.refs[3]; // Ether 12:27

export function DailyWorshipPanel() {
  const { pushToast } = useAppData();
  const [playing, setPlaying] = useState(false);
  const [streak, setStreak] = useState(11);
  const [startedToday, setStartedToday] = useState(false);

  const startDay = () => {
    if (!startedToday) {
      setStreak((s) => s + 1);
      setStartedToday(true);
    }
    pushToast("Your day begins in Christ ☀️ — devotional started", "accent");
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Daily Worship & Inspiration"
        title="Begin each day at the Savior's feet"
        intro="A short devotional, a verse to carry, and a moment of stillness. Small, daily acts of worship shape a soul turned toward Christ."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Daily video card */}
        <Reveal>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play today's devotional"
            className="group block w-full text-left"
          >
            <PhotoBlock seed="daily-devotional-sunrise" h={360} overlay="ink" icon="Sunrise" className="w-full">
              <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
                <Badge tone="accent" icon="Sunrise" className="w-fit bg-white/10 text-white border-white/20">
                  Today&apos;s Devotional
                </Badge>
                <div className="flex items-center gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur transition-transform group-hover:scale-105">
                    <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-fg shadow-lg">
                      <Icon name="Play" size={22} strokeWidth={2.4} />
                    </span>
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-white text-balance">
                      Come Unto Christ, and Be Perfected in Him
                    </h3>
                    <p className="mt-1 text-sm text-white/70">Morning devotional · 6:20</p>
                  </div>
                </div>
              </div>
            </PhotoBlock>
          </button>
        </Reveal>

        {/* Streak + start */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
            <ProgressRing value={streak} total={14} label="Worship streak" sublabel={`${streak} days`} />
            <p className="mt-3 text-sm text-muted">
              You&apos;ve turned to the Lord {streak} mornings in a row. Two weeks builds a holy habit.
            </p>
            <Button variant="accent" icon="Sunrise" block className="mt-5" onClick={startDay} disabled={startedToday}>
              {startedToday ? "Day Begun in Christ" : "Start Your Day in Christ"}
            </Button>
            <button
              type="button"
              onClick={() => pushToast("A moment of stillness. Be still, and know that I am God.", "default")}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Icon name="Wind" size={15} /> Pause for a moment of stillness
            </button>
          </div>
        </Reveal>
      </div>

      {/* Verse of the day */}
      <Reveal>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface-2/50 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-strong dark:text-accent">
            <Icon name="Sparkles" size={26} />
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Verse of the Day</p>
            <blockquote className="mt-2 font-serif text-lg italic leading-snug text-ink text-pretty">
              “And if men come unto me I will show unto them their weakness… for if they humble
              themselves before me, and have faith in me, then will I make weak things become strong
              unto them.”
            </blockquote>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">{verseOfDay.ref}</p>
          </div>
          <Button
            variant="outline"
            icon="Share2"
            className="shrink-0"
            onClick={() => pushToast("Verse of the day shared with your circle", "success")}
          >
            Share
          </Button>
        </div>
      </Reveal>

      <PlayerModal
        open={playing}
        onClose={() => setPlaying(false)}
        seed="daily-devotional-sunrise"
        title="Come Unto Christ, and Be Perfected in Him"
        presenter="Morning Devotional Series"
        icon="Sunrise"
      />
    </div>
  );
}
