"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ribbons } from "@/data/scriptures";
import { SectionHero } from "@/components/ui/SectionHero";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { OneHeart } from "./OneHeart";
import { EventsGatherings } from "./EventsGatherings";
import { LivestreamWatch } from "./LivestreamWatch";
import { FellowshipGroups } from "./FellowshipGroups";

const TABS: TabDef[] = [
  { id: "heart", label: "Of One Mind and One Heart", icon: "Users" },
  { id: "events", label: "Events & Gatherings", icon: "CalendarDays" },
  { id: "watch", label: "Livestream & Watch", icon: "MonitorPlay" },
  { id: "groups", label: "Fellowship Groups", icon: "Users2" },
];

export function UnitySection() {
  const [active, setActive] = useState("heart");
  const reduce = useReducedMotion();

  return (
    <>
      <SectionHero
        eyebrow="Invitation to Unity"
        image="hero-unity"
        align="left"
        title="Come, let us gather as one — of one heart and one mind"
        subtitle="Zion is a people knit together in love, worshiping shoulder to shoulder, rejoicing at one another's tables, and bearing one another up. There is a seat here with your name on it. Come and belong."
        verse={ribbons.unity.featured}
        icon="Users"
      >
        <a href="#unity-tabs">
          <Button size="lg" variant="accent" icon="HeartHandshake">
            You&apos;re Invited
          </Button>
        </a>
        <Button
          size="lg"
          variant="outline"

          iconRight="ArrowRight"
          onClick={() => {
            setActive("groups");
            document.getElementById("unity-tabs")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Find a Group
        </Button>
      </SectionHero>

      <section id="unity-tabs" className="scroll-mt-24 py-14 sm:py-20">
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
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
              >
                {active === "heart" && <OneHeart onFindGroup={() => setActive("groups")} />}
                {active === "events" && <EventsGatherings />}
                {active === "watch" && <LivestreamWatch />}
                {active === "groups" && <FellowshipGroups />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="unity" />
    </>
  );
}
