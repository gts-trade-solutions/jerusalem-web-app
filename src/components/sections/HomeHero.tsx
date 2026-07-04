"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { homeThemes } from "@/data/homeThemes";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { GodRays, LightOrbs } from "@/components/Sacred";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { sacredImage } from "@/lib/images";
import { cn } from "@/lib/cn";

/** Curated sacred backdrop per rotating theme. */
const THEME_IMAGES: Record<string, string> = {
  gathering: "golden-dawn",
  heritage: "cathedral-arches",
  welfare: "bread-wheat",
};

export function HomeHero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const theme = homeThemes[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % homeThemes.length), 7000);
    return () => clearInterval(t);
  }, [paused, idx]);

  return (
    <section
      className="relative overflow-hidden text-white grain"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured themes"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={theme.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sacredImage(THEME_IMAGES[theme.id] ?? "golden-dawn", 1600, 900)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 opacity-[0.86]" style={{ background: theme.gradient }} />
        </motion.div>
      </AnimatePresence>
      <GodRays />
      <LightOrbs />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[130%] w-[130%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(214,171,84,0.18),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6ab54]/40 to-transparent" />

      <Container className="relative z-[1] grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={theme.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ab54]/30 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d] backdrop-blur">
                <Icon name="Sunrise" size={14} /> {theme.eyebrow}
              </span>
              <AnimatedTitle
                text={theme.title}
                delay={0.15}
                className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance"
              />
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75 text-pretty">
                {theme.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events">
              <Button size="lg" variant="accent" icon="Flame">Find a Gathering</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40" iconRight="ArrowRight">
                Join the Community
              </Button>
            </Link>
          </div>

          {/* dots */}
          <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Choose theme">
            {homeThemes.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={t.eyebrow}
                onClick={() => setIdx(i)}
                className="group flex items-center gap-2"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === idx ? "w-8 bg-[#e6c67d]" : "w-1.5 bg-white/30 group-hover:bg-white/60",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* verse + feature trio */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.55 }}
              className="space-y-3"
            >
              <figure className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <Icon name="Quote" size={22} className="text-[#e6c67d]" />
                <blockquote className="mt-2 font-serif text-lg italic leading-snug text-white/90">
                  “{theme.verse.text}”
                </blockquote>
                <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#e6c67d]">
                  {theme.verse.ref}
                </figcaption>
              </figure>
              {theme.featureCards.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={reduce ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-colors hover:bg-white/[0.07]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#d6ab54]/15 text-[#e6c67d]">
                    <Icon name={f.icon} size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
