"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ribbons } from "@/data/scriptures";
import { SectionHero } from "@/components/ui/SectionHero";
import { SubTabs, type TabDef } from "@/components/ui/SubTabs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { MusicAndWorship } from "./MusicAndWorship";
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

export function MusicSection() {
  const [active, setActive] = useState("worship");
  const reduce = useReducedMotion();

  return (
    <>
      <SectionHero
        eyebrow="Worshipping Christ Through Music"
        image="orchestra-strings"
        title="The song of the righteous is a prayer unto Him"
        subtitle="Sacred hymns, gathered choirs, and the young voices of Zion — lift your heart in worship and let the music of the Restoration draw you nearer to Christ. Press play, join a choir, and sing along with Saints across the world."
        verse={ribbons.music.featured}
        icon="Music"
      >
        <a href="#music-tabs">
          <Button size="lg" variant="accent" icon="Play">
            Listen &amp; Worship
          </Button>
        </a>
        <Link href="/events">
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
            iconRight="ArrowRight"
          >
            Worship Nights Near You
          </Button>
        </Link>
      </SectionHero>

      <section id="music-tabs" className="scroll-mt-24 py-14 pb-28 sm:py-20 sm:pb-32">
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
                {active === "worship" && <MusicAndWorship />}
                {active === "choirs" && <ChoirsAndEnsembles />}
                {active === "youth" && <YouthMusic />}
                {active === "events" && <WorshipEvents />}
                {active === "mine" && <MyMusic />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="music" />
    </>
  );
}
