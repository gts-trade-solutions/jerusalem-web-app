"use client";

import { useState } from "react";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { SkylineArt } from "@/components/Sacred";
import { NeighborDashboard } from "./NeighborDashboard";
import { SistersInZion } from "./SistersInZion";
import { JustServeMap } from "./JustServeMap";
import { StoriesOfLove } from "./StoriesOfLove";
import { MyService } from "./MyService";

const TABS: TabDef[] = [
  { id: "pray", label: "Pray for Others", icon: "Hand" },
  { id: "sisters", label: "Sisters in Zion", icon: "Users2" },
  { id: "serve", label: "Just Serve Map", icon: "MapPinned" },
  { id: "stories", label: "Stories of Love", icon: "Heart" },
  { id: "mine", label: "My Service", icon: "HandHeart" },
];

const REFS = [
  "Galatians 6:10", "2 Nephi 31:20", "Matthew 22:39", "1 John 2:9", "Matthew 5:44",
  "3 Nephi 12:44", "John 15:13", "Matthew 7:12", "Ephesians 5:2", "Romans 12:10",
  "Ephesians 4:32", "1 John 4:21", "John 13:35", "Mark 12:31", "D&C 59:6",
  "Matthew 25:34", "Galatians 5:14",
];

export function NeighborSection() {
  const [active, setActive] = useState("pray");

  return (
    <>
      {/* Hero — the exact reference banner */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/nb-hero.jpg" alt="Loving Our Neighbor — serve, support, and care for one another as disciples of Christ" className="w-full select-none" width={1024} height={240} />
      </section>

      {/* Sub-tabs */}
      <div className="sticky top-[4.9rem] z-30 -mt-px">
        <SubTabs tabs={TABS} active={active} onChange={setActive} accent="gold" />
      </div>

      <section className="bg-bg-tint py-5 sm:py-6">
        <Container size="wide">
          <div key={active} className="animate-concept-in">
            {active === "pray" && <NeighborDashboard />}
            {active === "sisters" && <SistersInZion />}
            {active === "serve" && <JustServeMap />}
            {active === "stories" && <StoriesOfLove />}
            {active === "mine" && <MyService />}
          </div>
        </Container>
      </section>

      {/* Love thy neighbor ribbon */}
      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-4 h-14 w-56 opacity-80 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-7 text-center">
          <p className="font-serif text-xl italic text-[#f3e9cf] sm:text-2xl">
            &ldquo;Love thy neighbor as thyself.&rdquo;
          </p>
          <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
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
