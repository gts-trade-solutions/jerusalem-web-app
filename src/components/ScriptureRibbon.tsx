import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { CopyVerse } from "./CopyVerse";
import { SkylineArt } from "./Sacred";
import { ribbons } from "@/data/scriptures";

/** Signature deep-navy scripture band at the foot of every page. */
export function ScriptureRibbon({ page = "home" }: { page?: keyof typeof ribbons }) {
  const set = ribbons[page] ?? ribbons.home;
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white" aria-label="Scripture references">
      {/* skyline line-art, both lower corners */}
      <SkylineArt className="pointer-events-none absolute bottom-0 left-0 h-16 w-64 opacity-60" />
      <SkylineArt className="pointer-events-none absolute bottom-0 right-0 h-16 w-64 -scale-x-100 opacity-60" />

      <Container className="relative z-[1] py-12">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 h-px w-16 bg-gradient-to-r from-transparent via-[#e6c164] to-transparent" aria-hidden />
            <blockquote className="mx-auto max-w-2xl font-serif text-xl italic leading-snug text-white/95 sm:text-2xl text-balance">
              “{set.featured.text}”
            </blockquote>
            <cite className="mt-3 text-sm font-semibold not-italic tracking-wide text-[#e6c164]">
              — {set.featured.ref}
            </cite>
            <CopyVerse text={set.featured.text} refLabel={set.featured.ref} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-white/12 pt-7 text-sm text-white/65">
            {set.refs.map((r, i) => (
              <span key={r.ref} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/25">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r.ref}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
