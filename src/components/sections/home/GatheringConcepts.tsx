"use client";

import { useState } from "react";
import { homeConcepts, type HomeConceptData } from "@/data/homeConcepts";
import { HomeConcept } from "./HomeConcept";

const byId = (id: string) => homeConcepts.find((c) => c.id === id)!;

/** Carousel order matches the client's reference sheet: Come Come → Gathering → No Poor. */
const SLIDES = [byId("pioneer"), byId("heritage"), byId("welfare")];

const norm = (i: number) => ((i % SLIDES.length) + SLIDES.length) % SLIDES.length;

export interface GatheringConceptsProps {
  /** Which slide the carousel opens on (0 = Come Come, 1 = Gathering, 2 = No Poor). */
  start?: number;
}

/**
 * The three gathering "concept" pages unified into one dot-controlled carousel.
 * Each slide is a self-contained concept — its own banner, its own
 * "How We Gather / How We Care" cards, Our Promise, and scripture ribbon —
 * so the "How We Care for One Another" grid appears only on the No Poor slide.
 */
export function GatheringConcepts({ start = 0 }: GatheringConceptsProps) {
  const [idx, setIdx] = useState(() => norm(start));

  const go = (i: number) => setIdx(norm(i));
  const active = SLIDES[idx];

  return (
    <div className="overflow-x-clip">
      <div key={active.id} className="animate-slide-fade">
        <SlideBanner c={active} nav={{ index: idx, count: SLIDES.length, go }} />
        <HomeConcept c={active} noHero />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SlideBanner({
  c,
  nav,
}: {
  c: HomeConceptData;
  nav: { index: number; count: number; go: (i: number) => void };
}) {
  const dotOn = c.accent === "gold" ? "bg-accent" : "bg-teal";
  return (
    <section className="relative w-full border-b border-border bg-[#f7efda] lg:overflow-hidden">
      {/* the banner photo at its natural height (no cropping): stacked on top on mobile,
          anchored right (~66%) on desktop with its left edge dissolving into the cream */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.heroImage}
        alt=""
        className="block h-auto w-full select-none lg:ml-auto lg:w-[66%]"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%)",
        }}
      />
      {/* light cream wash behind the desktop overlay copy (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#f7efda_0%,rgba(247,239,218,0.4)_26%,transparent_44%)] lg:block" />

      {/* copy — below the image on mobile, overlaid on the left on desktop */}
      <div className="px-4 pb-7 pt-5 sm:px-6 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:items-center lg:px-0 lg:py-0">
        <div className="mx-auto max-w-[26rem] lg:max-w-[24rem] lg:pl-10 lg:pr-0">
          <h1 className="whitespace-pre-line break-words font-serif text-[2rem] font-bold leading-[1.03] tracking-tight text-[#28200f] sm:text-[2.6rem] lg:text-[3.1rem]">
            {c.title}
          </h1>
          {c.accentLine && (
            <p className="mt-2 font-serif text-lg font-medium italic leading-snug text-teal sm:text-xl lg:text-2xl">
              {c.accentLine}
            </p>
          )}
          <p className="mt-3 max-w-[20rem] break-words text-[13px] leading-relaxed text-ink sm:text-sm">
            {c.paragraph}
          </p>

          <div className="mt-4 flex items-center gap-2.5" role="tablist" aria-label="Gathering themes">
            {Array.from({ length: nav.count }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === nav.index}
                aria-label={`Theme ${i + 1}`}
                onClick={() => nav.go(i)}
                className="group flex items-center py-1"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === nav.index ? `w-8 ${dotOn}` : "w-1.5 bg-border-strong group-hover:bg-muted"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
