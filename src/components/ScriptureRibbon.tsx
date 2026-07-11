import { Container } from "./ui/Container";
import { SkylineArt } from "./Sacred";
import { ribbons } from "@/data/scriptures";
import { cn } from "@/lib/cn";

/** Small gold laurel sprig for the minimal ribbon variant. */
function LeafFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 24" fill="none" className={className} aria-hidden>
      <g stroke="#c9a13b" strokeWidth="1.3" fill="#c9a13b" fillOpacity="0.85">
        <path d="M2 12 H94" fill="none" strokeWidth="0.8" opacity="0.55" />
        <path d="M48 12 c-4-7 -12-8 -18-6 c3 6 11 8 18 6 Z" />
        <path d="M48 12 c4-7 12-8 18-6 c-3 6 -11 8 -18 6 Z" />
        <path d="M30 12 c-3-5 -9-6 -13-4 c2 4 8 6 13 4 Z" opacity="0.8" />
        <path d="M66 12 c3-5 9-6 13-4 c-2 4 -8 6 -13 4 Z" opacity="0.8" />
        <circle cx="48" cy="12" r="1.6" />
      </g>
    </svg>
  );
}

/**
 * Signature scripture band at the foot of every page.
 * tone="navy" (default) — deep navy with skyline art and reference rows.
 * tone="green" + minimal — the single-verse forest-green band with laurels.
 */
export function ScriptureRibbon({
  page = "home",
  tone = "navy",
  minimal = false,
}: {
  page?: keyof typeof ribbons;
  tone?: "navy" | "green";
  minimal?: boolean;
}) {
  const set = ribbons[page] ?? ribbons.home;

  if (minimal) {
    return (
      <section
        className={cn(
          "relative overflow-hidden text-white",
          tone === "green" ? "bg-[#2c4a33]" : "bg-ink-900",
        )}
        aria-label="Scripture references"
      >
        <Container className="flex items-center justify-center gap-5 py-5 sm:gap-8">
          <LeafFlourish className="hidden h-6 w-24 shrink-0 sm:block" />
          <p className="text-center font-serif text-base italic leading-snug text-[#f3e9cf] sm:text-lg text-balance">
            “{set.featured.text}”
            <span className="not-italic font-semibold text-white/95"> — {set.featured.ref}</span>
          </p>
          <LeafFlourish className="hidden h-6 w-24 shrink-0 -scale-x-100 sm:block" />
        </Container>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white"
      aria-label="Scripture references"
    >
      {/* gold temple-skyline line art, lower left */}
      <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-80 sm:h-16 sm:w-64" />

      <Container className="relative z-[1] py-7 text-center">
        <p className="mx-auto max-w-3xl font-serif text-lg italic leading-snug text-[#f3e9cf] sm:text-xl text-balance">
          “{set.featured.text}”
          <span className="not-italic font-semibold text-white"> — {set.featured.ref}</span>
        </p>

        {set.secondary && (
          <>
            <p className="mx-auto mt-1.5 max-w-3xl font-serif text-sm italic leading-snug text-white/90 sm:text-base">
              {set.secondary.text}
            </p>
            <p className="mt-0.5 font-serif text-sm font-semibold text-white/90">— {set.secondary.ref}</p>
          </>
        )}

        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
          {set.refs.map((r, i) => (
            <span key={r.ref} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-white/30">|</span>}
              <span className="font-medium transition-colors hover:text-[#e6c164]">{r.ref}</span>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
