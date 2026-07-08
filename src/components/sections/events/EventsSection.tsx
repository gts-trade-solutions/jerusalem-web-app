"use client";

import { useState } from "react";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { UpcomingEvents } from "./UpcomingEvents";
import { EventMap } from "./EventMap";
import { HostTools } from "./HostTools";
import { DiscussionGuides } from "./DiscussionGuides";
import { MyActivity } from "./MyActivity";
import { CreateEventModal } from "./CreateEventModal";

const TABS: TabDef[] = [
  { id: "upcoming", label: "Upcoming Events", icon: "CalendarDays" },
  { id: "map", label: "Event Map", icon: "MapPinned" },
  { id: "host", label: "Host Tools", icon: "ChefHat" },
  { id: "guides", label: "Discussion Guides", icon: "BookOpen" },
  { id: "mine", label: "My B&B Activity", icon: "Flame" },
];

const REFS = [
  "D&C 6:32", "1 John 1:7", "2 Corinthians 8:4", "2 Nephi 25:8", "2 Nephi 3:12",
  "Title Page BOM 1:1", "Mormon 5:14", "Ezekiel 37:19", "John 10:16",
];

export function EventsSection() {
  const [active, setActive] = useState("upcoming");
  const [hostOpen, setHostOpen] = useState(false);

  return (
    <>
      {/* Hero — the exact reference banner (composed photo + titles) */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/bb-hero.jpg" alt="Neighborhood B&B — Barbecue & Book of Mormon" className="w-full select-none" width={1024} height={250} />
      </section>

      {/* Sub-tabs */}
      <div className="sticky top-[4.6rem] z-30 -mt-px">
        <SubTabs tabs={TABS} active={active} onChange={setActive} accent="gold" />
      </div>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          <div key={active} className="animate-concept-in">
            {active === "upcoming" && <UpcomingEvents onHost={() => setHostOpen(true)} />}
            {active === "map" && <EventMap />}
            {active === "host" && <HostTools />}
            {active === "guides" && <DiscussionGuides />}
            {active === "mine" && <MyActivity />}
          </div>
        </Container>
      </section>

      <CreateEventModal open={hostOpen} onClose={() => setHostOpen(false)} />

      {/* Scriptures That Unite Us ribbon */}
      <section className="bg-ink-900 text-white" aria-label="Scripture references">
        <Container className="flex flex-col items-center gap-x-6 gap-y-3 py-5 sm:flex-row sm:flex-wrap">
          <span className="flex shrink-0 items-center gap-2.5">
            <Icon name="BookOpen" size={22} className="text-[#e6c164]" />
            <span className="font-serif text-base font-bold">Scriptures That Unite Us</span>
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/85">
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
