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
import { PrayForOthers } from "./PrayForOthers";
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

export function NeighborSection() {
  const [active, setActive] = useState("pray");
  const reduce = useReducedMotion();

  return (
    <>
      <SectionHero
        eyebrow="Loving Our Neighbor"
        image="hero-neighbor"
        title="Bear one another's burdens, that they may be light"
        subtitle="This is the heart of Zion — a people who pray for one another, lift the fallen, feed the hungry, and answer real needs with real hands. Find a place to serve, and let someone serve you."
        verse={ribbons.neighbor.featured}
        icon="HeartHandshake"
      >
        <a href="#neighbor-tabs">
          <Button size="lg" variant="accent" icon="HandHeart">
            Find a Way to Serve
          </Button>
        </a>
        <Link href="/events">
          <Button
            size="lg"
            variant="outline"

            iconRight="ArrowRight"
          >
            See Gatherings Near You
          </Button>
        </Link>
      </SectionHero>

      <section id="neighbor-tabs" className="scroll-mt-24 py-14 sm:py-20">
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
                {active === "pray" && <PrayForOthers />}
                {active === "sisters" && <SistersInZion />}
                {active === "serve" && <JustServeMap />}
                {active === "stories" && <StoriesOfLove />}
                {active === "mine" && <MyService />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="neighbor" />
    </>
  );
}
