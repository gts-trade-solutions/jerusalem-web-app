"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { SkylineArt } from "@/components/Sacred";
import { UnityDashboard } from "./UnityDashboard";
import { EventsGatherings } from "./EventsGatherings";
import { LivestreamWatch } from "./LivestreamWatch";
import { FellowshipGroups } from "./FellowshipGroups";

const TABS: TabDef[] = [
  { id: "heart", label: "Of One Mind and One Heart", icon: "Users" },
  { id: "events", label: "Events & Gatherings", icon: "CalendarDays" },
  { id: "watch", label: "Livestream & Watch", icon: "Radio" },
  { id: "groups", label: "Fellowship Groups", icon: "Users2" },
];

const REFS = [
  "2 Corinthians 13:11",
  "1 Peter 3:8",
  "2 Nephi 1:21",
  "Philippians 1:27",
  "D&C 45:65",
  "Mosiah 18:21",
  "Acts 4:32",
  "Moses 7:18",
  "3 Nephi 18:30",
  "John 17:20-23",
  "D&C 100:16",
];

export function UnitySection() {
  const [active, setActive] = useState("heart");

  return (
    <>
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/un-hero.jpg"
          alt="Invitation to Unity - gathering hearts together in Christ. One body. One Spirit. One Zion."
          className="w-full select-none"
          width={1024}
          height={274}
        />
      </section>

      <div className="sticky top-[4.9rem] z-30 -mt-px">
        <SubTabs tabs={TABS} active={active} onChange={setActive} accent="gold" />
      </div>

      <section className="bg-bg-tint py-5 sm:py-6">
        <Container size="wide">
          <div key={active} className="animate-concept-in">
            {active === "heart" && <UnityDashboard />}
            {active === "events" && <EventsGatherings />}
            {active === "watch" && <LivestreamWatch />}
            {active === "groups" && <FellowshipGroups />}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-6 text-center">
          <p className="font-serif text-lg italic text-[#f3e9cf] sm:text-xl">
            &ldquo;Behold, how good and how pleasant it is for brethren to dwell together in unity!&rdquo;
          </p>
          <p className="mt-1 font-serif text-sm font-semibold text-white">Psalm 133:1</p>
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
