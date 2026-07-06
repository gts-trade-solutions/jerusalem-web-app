"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { homeThemes } from "@/data/homeThemes";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { sacredImage } from "@/lib/images";
import { cn } from "@/lib/cn";

const accentText: Record<string, string> = {
  gold: "text-accent-strong dark:text-accent",
  teal: "text-teal",
  green: "text-sage",
};
const accentDot: Record<string, string> = { gold: "bg-accent", teal: "bg-teal", green: "bg-sage" };

export function HomeHero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const theme = homeThemes[idx];
  const at = accentText[theme.accent];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % homeThemes.length), 8000);
    return () => clearInterval(t);
  }, [paused, idx]);

  const iconCircle =
    theme.accent === "teal"
      ? "bg-teal-soft text-teal"
      : theme.accent === "green"
        ? "bg-sage-soft text-sage"
        : "bg-accent-soft text-accent-strong dark:text-accent";

  return (
    <>
    <section
      className="relative overflow-hidden border-b border-border bg-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured themes"
    >
      <Container className="relative z-[1] grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-16">
        {/* text */}
        <div className="order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <span className={cn("inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]", at)}>
                <Icon name="Sunrise" size={15} /> {theme.eyebrow}
              </span>
              <AnimatedTitle
                text={theme.title}
                delay={0.1}
                className="mt-4 max-w-xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] text-balance"
              />
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted text-pretty">{theme.subtitle}</p>
              <figure className={cn("mt-5 border-l-2 pl-4", theme.accent === "teal" ? "border-teal/50" : theme.accent === "green" ? "border-sage/50" : "border-accent/50")}>
                <blockquote className="font-serif text-base italic leading-snug text-ink-soft">“{theme.verse.text}”</blockquote>
                <figcaption className={cn("mt-1 text-sm font-semibold", at)}>{theme.verse.ref}</figcaption>
              </figure>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/events">
              <Button size="lg" variant="accent" icon="Flame">Find a Gathering</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="primary" iconRight="ArrowRight">Join the Community</Button>
            </Link>
          </div>

          {/* dots */}
          <div className="mt-8 flex items-center gap-3" role="tablist" aria-label="Choose theme">
            {homeThemes.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={t.eyebrow}
                onClick={() => setIdx(i)}
                className="group flex items-center"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === idx ? cn("w-8", accentDot[theme.accent]) : "w-1.5 bg-border-strong group-hover:bg-muted",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* photo */}
        <div className="relative order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1] }}
              className="relative overflow-hidden rounded-3xl border border-border shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sacredImage(theme.image, 900, 720)}
                alt=""
                className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
              <div className={cn("absolute bottom-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white shadow-md backdrop-blur", theme.accent === "gold" ? "bg-ink-900/80" : "bg-teal/85")}>
                <Icon name="Church" size={16} />
                <span className="font-medium">Zion&apos;s covenant center</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>

    {/* How We Gather / Care — per theme */}
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-px flex-1 bg-gradient-to-l from-accent/60 to-transparent sm:block" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.h2
              key={theme.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center font-serif text-3xl font-bold text-ink sm:text-4xl"
            >
              {theme.sectionTitle}
            </motion.h2>
          </AnimatePresence>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent sm:block" aria-hidden />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={theme.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {theme.featureCards.map((f) => (
              <article key={f.id} className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className={cn("grid size-14 place-items-center rounded-full", iconCircle)}>
                  <Icon name={f.icon} size={26} strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                <Link href="/neighbor" className={cn("mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2", at)}>
                  Learn More <Icon name="ArrowRight" size={14} />
                </Link>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Our Promise band */}
        <div className={cn("mt-10 flex flex-col items-start gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8", theme.accent === "gold" ? "border-accent/30 bg-accent-soft/50" : "border-teal/30 bg-teal-soft/50")}>
          <span className={cn("grid size-14 shrink-0 place-items-center rounded-full", iconCircle)}>
            <Icon name="HandHeart" size={28} strokeWidth={1.9} />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold text-ink">Our Promise</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              No one in our community walks alone. Together we serve, uplift, and rejoice in the blessings of Zion, where all things are shared in love.
            </p>
          </div>
          <figure className="shrink-0 border-l-2 border-border pl-5 sm:max-w-xs">
            <blockquote className="font-serif text-base italic leading-snug text-ink-soft">“{theme.verse.text}”</blockquote>
            <figcaption className={cn("mt-1 text-sm font-semibold", at)}>{theme.verse.ref}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
    </>
  );
}
