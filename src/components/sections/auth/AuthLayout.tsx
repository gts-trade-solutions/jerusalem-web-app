"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { PhotoBlock } from "@/components/ui/PhotoBlock";

const VERSES = [
  {
    text: "And it shall come to pass that I will gather my people together as a man gathereth his sheep.",
    ref: "3 Nephi 16:15",
  },
  {
    text: "I will take you one of a city, and two of a family, and I will bring you to Zion.",
    ref: "Jeremiah 3:14",
  },
  {
    text: "And they had all things common among them; therefore there were not rich and poor.",
    ref: "4 Nephi 1:3",
  },
  {
    text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    ref: "Matthew 11:28",
  },
];

const HERO_GRADIENT =
  "radial-gradient(120% 90% at 12% -10%, rgba(214,171,84,0.45), transparent 55%), radial-gradient(130% 120% at 100% 0%, rgba(58,106,93,0.35), transparent 55%), linear-gradient(160deg, #17162b, #241f3f 60%, #2c2547)";

const TRUST = [
  { icon: "Lock", label: "Private community", body: "Your circle, kept sacred." },
  { icon: "BadgeCheck", label: "Verified members", body: "Real neighbors, real names." },
  { icon: "DoorOpen", label: "All are welcome", body: "Come as you are — every soul has a seat." },
];

/**
 * Beautiful split-screen shell shared by sign-in and sign-up.
 * Left: dawn-lit reverent art panel with a rotating verse + trust bullets.
 * Right: the form panel. On mobile the art collapses to a compact top banner.
 */
export function AuthLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % VERSES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const verse = VERSES[idx];

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-bg lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* ART PANEL — full height on desktop, compact banner on mobile */}
      <aside
        className="relative overflow-hidden text-white grain"
        style={{ background: HERO_GRADIENT }}
        aria-hidden={false}
      >
        <div className="pointer-events-none absolute -top-1/3 left-1/3 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(214,171,84,0.16),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6ab54]/40 to-transparent" />

        <div className="relative z-[1] flex h-full flex-col px-6 py-8 sm:px-10 lg:min-h-[calc(100dvh-4rem)] lg:px-14 lg:py-14">
          {/* brand */}
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2.5 text-white transition-opacity hover:opacity-80"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-[#d6ab54]/30 bg-white/5 text-[#e6c67d] backdrop-blur">
              <Icon name="Sunrise" size={18} />
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight">
              New Jerusalem
            </span>
          </Link>

          {/* headline + verse — hidden on smallest screens to keep banner compact */}
          <div className="mt-8 flex-1 lg:mt-auto lg:flex lg:flex-col lg:justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d6ab54]/30 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d] backdrop-blur">
              <Icon name="Church" size={13} /> {eyebrow}
            </span>
            <h1 className="mt-5 max-w-md font-serif text-3xl font-semibold leading-[1.06] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 hidden max-w-md text-base leading-relaxed text-white/70 text-pretty sm:block">
              {intro}
            </p>

            {/* rotating verse */}
            <div className="mt-8 hidden max-w-md sm:block">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={verse.ref}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                >
                  <Icon name="Quote" size={20} className="text-[#e6c67d]" />
                  <blockquote className="mt-2 font-serif text-base italic leading-snug text-white/90">
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#e6c67d]">
                    {verse.ref}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* trust bullets */}
          <ul className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3 lg:mt-10">
            {TRUST.map((t) => (
              <li
                key={t.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-[#d6ab54]/15 text-[#e6c67d]">
                  <Icon name={t.icon} size={16} />
                </span>
                <p className="mt-2.5 text-sm font-semibold text-white">
                  {t.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/55">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>

          {/* decorative photo strip — desktop only, adds depth */}
          <div className="pointer-events-none mt-10 hidden lg:block">
            <PhotoBlock
              seed="sunrise-chapel-window-warm"
              w={640}
              h={150}
              overlay="ink"
              icon="Sunrise"
              rounded="rounded-2xl"
              className="h-[110px] w-full opacity-90"
            />
          </div>
        </div>
      </aside>

      {/* FORM PANEL */}
      <main className="flex items-center justify-center bg-bg px-5 py-10 sm:px-8 sm:py-14">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
