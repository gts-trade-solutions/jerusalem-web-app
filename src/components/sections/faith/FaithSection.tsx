"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ribbons } from "@/data/scriptures";
import { SectionHero } from "@/components/ui/SectionHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { cn } from "@/lib/cn";

import { LeaderMessagesPanel } from "./LeaderMessagesPanel";
import { DisciplesPanel } from "./DisciplesPanel";
import { ScripturesPanel } from "./ScripturesPanel";
import { TempleHeritagePanel } from "./TempleHeritagePanel";
import { DailyWorshipPanel } from "./DailyWorshipPanel";
import { ComposeTestimonyPanel } from "./ComposeTestimonyPanel";
import { QuickActions } from "./QuickActions";

const NAV = [
  { id: "leaders", label: "Messages from Church Leaders", icon: "MonitorPlay", desc: "Prophetic counsel" },
  { id: "disciples", label: "Messages from Disciples", icon: "Sparkles", desc: "Testimonies of Saints" },
  { id: "scriptures", label: "Scriptures & Book of Mormon", icon: "BookOpen", desc: "Daily reading plan" },
  { id: "temples", label: "Temple Heritage", icon: "Church", desc: "Houses of the Lord" },
  { id: "worship", label: "Daily Worship & Inspiration", icon: "Sunrise", desc: "Begin in Christ" },
  { id: "testimony", label: "Share Your Testimony", icon: "Send", desc: "Add your witness" },
] as const;

type TabId = (typeof NAV)[number]["id"];

const PANELS: Record<TabId, React.ReactNode> = {
  leaders: <LeaderMessagesPanel />,
  disciples: <DisciplesPanel />,
  scriptures: <ScripturesPanel />,
  temples: <TempleHeritagePanel />,
  worship: <DailyWorshipPanel />,
  testimony: <ComposeTestimonyPanel />,
};

export function FaithSection() {
  const [active, setActive] = useState<TabId>("leaders");
  const reduce = useReducedMotion();

  return (
    <>
      <SectionHero
        eyebrow="Sharing Our Faith in Christ"
        image="scripture-dark"
        title="We talk of Christ, we rejoice in Christ"
        subtitle="A gathering place for the witnesses of Jesus Christ — where prophetic counsel, the testimonies of ordinary Saints, the scriptures, and the temples all point to one source of light."
        verse={ribbons.faith.featured}
        icon="Sparkles"
      >
        <Button
          size="lg"
          variant="accent"
          icon="BookOpen"
          onClick={() => setActive("scriptures")}
        >
          Feast on the Word
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white/25 bg-white/5 text-white hover:bg-white/10"
          icon="Send"
          onClick={() => setActive("testimony")}
        >
          Share Your Testimony
        </Button>
      </SectionHero>

      <section className="py-14 sm:py-20">
        <Container>
          {/* Quick Actions strip */}
          <div className="mb-10">
            <QuickActions />
          </div>

          {/* Mobile nav rail */}
          <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 lg:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setActive(n.id)}
                aria-current={active === n.id}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === n.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border-strong bg-surface text-ink-soft hover:border-accent",
                )}
              >
                <Icon name={n.icon} size={16} />
                {n.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 space-y-1.5" aria-label="Faith sections">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActive(n.id)}
                    aria-current={active === n.id}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
                      active === n.id
                        ? "border-accent/40 bg-accent-soft/60 shadow-sm"
                        : "border-transparent hover:border-border hover:bg-surface-2/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                        active === n.id
                          ? "bg-accent text-accent-fg"
                          : "bg-surface-3 text-ink-soft group-hover:text-accent",
                      )}
                    >
                      <Icon name={n.icon} size={19} />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-semibold leading-tight",
                          active === n.id ? "text-accent-strong dark:text-accent" : "text-ink",
                        )}
                      >
                        {n.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-faint">{n.desc}</span>
                    </span>
                  </button>
                ))}

                <Link
                  href="/events"
                  className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-ink-900 px-4 py-3 text-sm font-medium text-white grain"
                >
                  <Icon name="CalendarDays" size={17} className="text-[#e6c67d]" />
                  Find a gathering near you
                  <Icon name="ArrowRight" size={15} className="ml-auto text-white/60" />
                </Link>
              </nav>
            </aside>

            {/* Content pane */}
            <div role="region" aria-live="polite" className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
                >
                  {PANELS[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="faith" />
    </>
  );
}
