"use client";

import { useState } from "react";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { MusicDashboard } from "./MusicDashboard";
import { ChoirsAndEnsembles } from "./ChoirsAndEnsembles";
import { YouthMusic } from "./YouthMusic";
import { WorshipEvents } from "./WorshipEvents";
import { MyMusic } from "./MyMusic";

const TABS: TabDef[] = [
  { id: "worship", label: "Music & Worship", icon: "Music" },
  { id: "choirs", label: "Choirs & Ensembles", icon: "Users2" },
  { id: "youth", label: "Youth Music", icon: "Mic2" },
  { id: "events", label: "Worship Events", icon: "CalendarDays" },
  { id: "mine", label: "My Music", icon: "ListMusic" },
];

const REFS = [
  "D&C 136:28", "D&C 25:12", "2 Chronicles 29:30", "2 Samuel 6:5", "1 Chronicles 25:3",
  "Mormon 7:7", "1 Samuel 16:23", "1 Chronicles 25:6", "Ezekiel 40:44", "Psalm 96:1",
  "Isaiah 42:10", "Psalm 147:7",
];

function NoteFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" fill="#c9a13b" className={className} aria-hidden>
      <path d="M8 6 H72 V8 H8 Z" opacity="0.5" />
      <circle cx="20" cy="16" r="3.2" /><rect x="22.4" y="5" width="1.4" height="11" />
      <circle cx="40" cy="18" r="3.2" /><rect x="42.4" y="6" width="1.4" height="12" />
      <circle cx="60" cy="15" r="3.2" /><rect x="62.4" y="4" width="1.4" height="11" />
      <path d="M23 5 Q 33 2 43 6 L43 8 Q 33 4 23 7 Z" />
    </svg>
  );
}

export function MusicSection() {
  const [active, setActive] = useState("worship");

  return (
    <>
      {/* Hero — the exact reference banner */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mu-hero.jpg" alt="Worshipping Christ Through Music — unite hearts, lift voices, glorify the Lord" className="w-full select-none" width={1280} height={188} />
      </section>

      {/* Sub-tabs */}
      <div className="sticky top-[4.6rem] z-30 -mt-px">
        <SubTabs tabs={TABS} active={active} onChange={setActive} accent="gold" />
      </div>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          <div key={active} className="animate-concept-in">
            {active === "worship" && <MusicDashboard />}
            {active === "choirs" && <ChoirsAndEnsembles />}
            {active === "youth" && <YouthMusic />}
            {active === "events" && <WorshipEvents />}
            {active === "mine" && <MyMusic />}
          </div>
        </Container>
      </section>

      {/* Song of the righteous ribbon */}
      <section className="bg-ink-900 text-white" aria-label="Scripture references">
        <Container className="py-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <NoteFlourish className="hidden h-5 w-24 sm:block" />
            <p className="font-serif text-lg italic text-[#f3e9cf] sm:text-xl">
              &ldquo;Sing unto the Lord; bless his name; shew forth his salvation from day to day.&rdquo;
              <span className="not-italic font-semibold text-white"> — Psalm 96:2</span>
            </p>
            <NoteFlourish className="hidden h-5 w-24 -scale-x-100 sm:block" />
          </div>
          <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
            {REFS.map((r, i) => (
              <span key={r} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/30">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
