"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ribbons } from "@/data/scriptures";
import { SectionHero } from "@/components/ui/SectionHero";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
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

export function EventsSection() {
  const [active, setActive] = useState("upcoming");
  const [hostOpen, setHostOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <SectionHero
        eyebrow="Neighborhood B&B Events"
        image="hero-events"
        title="Barbecue, the Book of Mormon, and a place at the table for everyone"
        subtitle="Zion is built one backyard at a time. Gather your neighbors for a Barbecue & Book of Mormon night — good food, open scripture, and the kind of fellowship that turns strangers into family."
        verse={ribbons.events.featured}
        icon="Flame"
      >
        <a href="#events-tabs">
          <Button size="lg" variant="accent" icon="CalendarDays">
            Find a Gathering
          </Button>
        </a>
        <Button
          size="lg"
          variant="outline"

          iconRight="ArrowRight"
          onClick={() => setHostOpen(true)}
        >
          Sign Up to Host
        </Button>
      </SectionHero>

      <section id="events-tabs" className="scroll-mt-24 py-14 sm:py-20">
        <Container>
          <div className="sticky top-2 z-20 mx-auto max-w-3xl">
            <SubTabs tabs={TABS} active={active} onChange={setActive} />
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                role="tabpanel"
                id={`panel-${active}`}
                aria-label={TABS.find((t) => t.id === active)?.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
              >
                {active === "upcoming" && <UpcomingEvents />}
                {active === "map" && <EventMap />}
                {active === "host" && <HostTools />}
                {active === "guides" && <DiscussionGuides />}
                {active === "mine" && <MyActivity />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <CreateEventModal open={hostOpen} onClose={() => setHostOpen(false)} />

      <ScriptureRibbon page="events" />
    </>
  );
}
