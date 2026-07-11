"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";
import { homeConcepts, type HomeConceptData } from "@/data/homeConcepts";
import { HomeConcept } from "./HomeConcept";

const byId = (id: string) => homeConcepts.find((c) => c.id === id)!;

/** Carousel order matches the client's reference sheet: Come Come → Gathering → No Poor. */
const SLIDES = [byId("pioneer"), byId("heritage"), byId("welfare")];
const welfare = byId("welfare");

export interface GatheringConceptsProps {
  /** Which slide the carousel opens on (0 = Come Come, 1 = Gathering, 2 = No Poor). */
  start?: number;
}

/**
 * The three gathering "concept" pages unified into one page:
 *   1. a hero carousel that rotates the three banners (Come Come, Gathering, No Poor),
 *      with the matching "How We Gather and Build Together" cards for the first two;
 *   2. the "How We Care for One Another" grid pulled out as a fixed bottom section;
 *   3. one closing scripture ribbon.
 */
export function GatheringConcepts({ start = 0 }: GatheringConceptsProps) {
  const [idx, setIdx] = useState(() => ((start % SLIDES.length) + SLIDES.length) % SLIDES.length);

  const go = (i: number) => setIdx(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  const active = SLIDES[idx];

  return (
    <>
      {/* ── Hero + cards carousel ─────────────────────────────── */}
      <div className="border-b border-border" aria-roledescription="carousel" aria-label="Gathering themes">
        {/* full-bleed banner — one cohesive image with the copy overlaid on a cream fade */}
        <div className="relative">
          {/* prev / next controls, centred on the banner */}
          <button
            type="button"
            onClick={() => go(idx - 1)}
            aria-label="Previous theme"
            className="absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/85 text-ink shadow-md backdrop-blur transition hover:bg-white hover:text-accent-strong sm:left-4"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            aria-label="Next theme"
            className="absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/85 text-ink shadow-md backdrop-blur transition hover:bg-white hover:text-accent-strong sm:right-4"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          <div key={active.id} className="animate-concept-in">
            <SlideBanner c={active} nav={{ index: idx, count: SLIDES.length, go }} />
          </div>
        </div>

        {/* matching "How We Gather and Build Together" cards for the first two themes */}
        {active.id !== "welfare" && (
          <div key={`cards-${active.id}`} className="animate-concept-in">
            <HomeConcept c={active} cardsOnly />
          </div>
        )}
      </div>

      {/* ── How We Care for One Another (revamped, always at the bottom) ── */}
      <WelfareCare />

      {/* ── Closing scripture ribbon ──────────────────────────── */}
      <WelfareRibbon />
    </>
  );
}

/* ------------------------------------------------------------------ */

/** Where to anchor each photo inside the wide banner so faces / the temple stay in frame
 *  (top-biased for the pioneer photo so its baked-in chip stays cropped — we draw a crisp one). */
const BANNER_POS: Record<string, string> = {
  pioneer: "center 20%",
  heritage: "center 28%",
  welfare: "center 32%",
};

function SlideBanner({ c, nav }: { c: HomeConceptData; nav: { index: number; count: number; go: (i: number) => void } }) {
  const dotOn = c.accent === "gold" ? "bg-accent" : "bg-teal";
  return (
    <section className="relative h-[20rem] w-full overflow-hidden bg-[#f9f1df] sm:h-[23rem] lg:h-[26rem]">
      {/* the banner photo — anchored right (~64% width) so it isn't over-stretched/cropped,
          with its left edge dissolving into the cream so the copy reads over it */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.heroImage}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-[86%] select-none object-cover sm:w-[72%] lg:w-[64%]"
        style={{
          objectPosition: BANNER_POS[c.id] ?? "center",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 26%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 26%)",
        }}
      />
      {/* soft cream wash over the fade zone to guarantee legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#f9f1df_0%,#f9f1df_30%,rgba(249,241,223,0.55)_45%,transparent_60%)]" />

      {/* overlaid copy */}
      <div className="relative z-[1] mx-auto flex h-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-[31rem]">
          <h1 className="whitespace-pre-line break-words font-serif text-[2.15rem] font-bold leading-[1.02] tracking-tight text-[#28200f] sm:text-5xl lg:text-[3.4rem]">
            {c.title}
          </h1>
          {c.accentLine && (
            <p className="mt-2.5 font-serif text-xl font-medium italic leading-snug text-teal sm:text-2xl">
              {c.accentLine}
            </p>
          )}
          <p className="mt-3.5 max-w-md break-words text-sm leading-relaxed text-ink sm:text-[15px]">{c.paragraph}</p>

          <div className="mt-5 flex items-center gap-2.5" role="tablist" aria-label="Gathering themes">
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

      {/* covenant-center chip (bottom-right), matching the reference banner */}
      {c.heroChip && (
        <div className="absolute bottom-3 right-3 z-[1] flex items-center gap-2.5 rounded-lg bg-[#1c4b45]/92 px-3 py-2 text-white shadow-lg backdrop-blur sm:bottom-4 sm:right-4">
          <Icon name="Church" size={26} strokeWidth={1.7} className="text-white/90" />
          <span className="leading-tight">
            <span className="block font-serif text-sm font-bold">{c.heroChip.title}</span>
            <span className="block text-[11px] text-white/80">{c.heroChip.sub}</span>
          </span>
        </div>
      )}
    </section>
  );
}

function WelfareCare() {
  return (
    <section className="bg-white py-10 dark:bg-bg sm:py-12">
      <Container size="wide">
        {/* gold-ruled section heading */}
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="h-px flex-1 bg-[#c9a13b]/70" aria-hidden />
          <h2 className="text-center font-serif text-2xl font-bold text-ink text-balance sm:text-3xl">
            {welfare.sectionTitle}
          </h2>
          <span className="h-px flex-1 bg-[#c9a13b]/70" aria-hidden />
        </div>

        {/* 6-card grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {welfare.cards.map((card) => (
            <article
              key={card.title}
              className="group flex min-w-0 items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md dark:bg-surface"
            >
              <span
                className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong transition-transform group-hover:scale-105 dark:text-accent"
              >
                <Icon name={card.icon} size={28} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <h3 className="break-words font-serif text-lg font-bold leading-snug text-ink">{card.title}</h3>
                <p className="mt-1 break-words text-[13px] leading-relaxed text-ink-soft">{card.body}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
                  Learn More <Icon name="ArrowRight" size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Our Promise band */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-accent/40 bg-accent-soft/50 p-5 sm:flex-row sm:items-center sm:gap-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-full text-accent-strong dark:text-accent">
            <Icon name="HandHeart" size={44} strokeWidth={1.8} />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold text-ink">Our Promise</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{welfare.promise.text}</p>
          </div>
          {welfare.promise.verse && (
            <figure className="shrink-0 sm:text-right">
              <blockquote className="font-serif text-base italic leading-snug text-ink">
                &ldquo;{welfare.promise.verse}&rdquo;
              </blockquote>
              <figcaption className="mt-0.5 font-serif text-sm text-ink-soft">— {welfare.promise.ref}</figcaption>
            </figure>
          )}
        </div>

        {/* community links */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3.5">
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ink-900 text-white">
            <Icon name="Info" size={16} />
          </span>
          <p className="text-sm leading-relaxed text-ink-soft">
            Many of these links herein are maintained by NJ (New Jerusalem) Community Development, which also has a
            separate website,{" "}
            <a href="https://www.nopooramongthem.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1d4ed8] underline dark:text-[#7ea4f5]">
              https://www.nopooramongthem.com/
            </a>
            , and posts many projects on{" "}
            <a href="https://www.justserve.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1d4ed8] underline dark:text-[#7ea4f5]">
              https://www.justserve.org/
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

function WelfareRibbon() {
  const r = welfare.ribbon;
  return (
    <section
      className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white"
      aria-label="Scripture references"
    >
      <SkylineArt className="pointer-events-none absolute bottom-1 left-4 h-14 w-56 opacity-80 sm:h-16 sm:w-64" />
      <Container className="relative z-[1] py-7 text-center">
        <p className="mx-auto max-w-3xl font-serif text-lg italic leading-snug text-[#f3e9cf] sm:text-xl text-balance">
          “{r.verse}”
          {r.ref && <span className="not-italic font-semibold text-white"> — {r.ref}</span>}
        </p>
        {r.secondary && (
          <>
            <p className="mx-auto mt-1.5 max-w-3xl font-serif text-sm italic leading-snug text-white/90 sm:text-base">
              {r.secondary.text}
            </p>
            <p className="mt-0.5 font-serif text-sm font-semibold text-white/90">— {r.secondary.ref}</p>
          </>
        )}
        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
          {r.refs.map((ref, i) => (
            <span key={`${ref}-${i}`} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-white/30">|</span>}
              <span className="font-medium transition-colors hover:text-[#e6c164]">{ref}</span>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
