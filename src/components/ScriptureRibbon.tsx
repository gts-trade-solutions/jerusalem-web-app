import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { CopyVerse } from "./CopyVerse";
import { Ornament, SpireSilhouette } from "./Sacred";
import { sacredImage } from "@/lib/images";
import { ribbons } from "@/data/scriptures";

/** Signature dark scripture band shown near the foot of most pages. */
export function ScriptureRibbon({ page = "home" }: { page?: keyof typeof ribbons }) {
  const set = ribbons[page] ?? ribbons.home;
  return (
    <section className="relative overflow-hidden bg-ink-900 text-bone grain" aria-label="Scripture references">
      {/* faint open-scripture texture */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sacredImage("scripture-dark", 1600, 700)}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,24,0.65),rgba(23,22,43,0.9))]" />
      <div className="pointer-events-none absolute inset-0 dawn-wash opacity-30" />

      {/* temple-spire skyline cutting in from the page above */}
      <SpireSilhouette className="relative z-[1] h-8 sm:h-10" />

      <Container className="relative z-[1] pb-14 pt-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Ornament tone="light" className="mb-7" />
            <blockquote className="max-w-2xl font-serif text-2xl italic leading-snug text-white/90 sm:text-3xl text-balance">
              <span className="shimmer-gold float-left mr-2 mt-1 font-serif text-6xl font-semibold not-italic leading-[0.8] sm:text-7xl" aria-hidden>
                {set.featured.text.charAt(0)}
              </span>
              {set.featured.text.slice(1)}”
            </blockquote>
            <cite className="mt-4 text-sm font-semibold not-italic uppercase tracking-[0.2em] text-[#e6c67d]">
              {set.featured.ref}
            </cite>
            <CopyVerse text={set.featured.text} refLabel={set.featured.ref} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8">
            {set.refs.map((r) => (
              <span key={r.ref} className="group inline-flex items-center gap-2 text-sm text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#e6c67d]">
                <span className="size-1 rounded-full bg-[#d6ab54]/70" />
                <span className="font-medium">{r.ref}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
