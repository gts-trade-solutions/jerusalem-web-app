import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";
import type { HomeConceptData, IconBg } from "@/data/homeConcepts";

const CIRCLE: Record<IconBg, string> = { teal: "#215f58", brown: "#7a4d25" };
const RIBBON_BG = { navy: "bg-ink-900", green: "bg-[#294634]", teal: "bg-[#1c4b45]" } as const;

/** Gold Native-American-style motif for the heritage / pioneer ribbons. */
function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 20" fill="none" className={className} aria-hidden>
      <g stroke="#c9a13b" strokeWidth="1.2">
        <path d="M2 10 H40" opacity="0.6" />
        <path d="M90 10 H128" opacity="0.6" />
        <path d="M52 4 L58 10 L52 16 L46 10 Z" fill="#c9a13b" fillOpacity="0.25" />
        <path d="M65 3 L72 10 L65 17 L58 10 Z" fill="#c9a13b" fillOpacity="0.4" />
        <path d="M78 4 L84 10 L78 16 L72 10 Z" fill="#c9a13b" fillOpacity="0.25" />
        <path d="M44 10 L40 6 M44 10 L40 14" />
        <path d="M86 10 L90 6 M86 10 L90 14" />
      </g>
    </svg>
  );
}

/** Simple teal feather for the heritage / pioneer "Our Promise" band. */
function Feather({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 44" fill="none" className={className} aria-hidden>
      <g stroke="#2f7d72" strokeWidth="1.4" strokeLinecap="round">
        <path d="M112 6 C80 8 40 18 10 40" fill="#2f7d72" fillOpacity="0.08" />
        <path d="M112 6 C92 20 60 34 12 40" />
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 9;
          const x = 112 - t * 100;
          const y = 6 + t * 34;
          return <path key={i} d={`M${x} ${y} q -8 -6 -16 -2`} opacity={0.7} />;
        })}
      </g>
    </svg>
  );
}

export interface ConceptNav {
  index: number;
  count: number;
  go: (i: number) => void;
}

export function HomeConcept({
  c,
  nav,
  infoBar,
  hideRibbon,
  heroOnly,
  cardsOnly,
  noHero,
}: {
  c: HomeConceptData;
  nav?: ConceptNav;
  infoBar?: React.ReactNode;
  hideRibbon?: boolean;
  heroOnly?: boolean;
  /** Render only the "How We…" cards + Our Promise (no hero, ribbon, or infoBar). */
  cardsOnly?: boolean;
  /** Render everything except the hero (cards + Our Promise + ribbon + infoBar). */
  noHero?: boolean;
}) {
  const titleColor = c.accent === "gold" ? "text-ink" : "text-[#241d12] dark:text-ink";
  const rule = c.accent === "gold" ? "bg-[#c9a13b]/80" : "bg-[#c9a13b]/70";
  const dotOn = c.accent === "gold" ? "bg-accent" : "bg-teal";
  const welfare = c.layout === "welfare6";

  return (
    <div className="bg-white dark:bg-bg">
      {/* ── Hero ─────────────────────────────────────────── */}
      {!cardsOnly && !noHero && (
      <section>
        <div className={`mx-auto grid max-w-[1400px] min-w-0 gap-6 pl-4 sm:pl-6 lg:grid-cols-[1fr_1.35fr] lg:gap-6 lg:pl-10 ${welfare ? "items-start" : "items-center"}`}>
          <div className={`min-w-0 pr-4 sm:pr-6 lg:pr-0 ${welfare ? "pt-5 lg:pt-5" : "pt-8 lg:py-8"}`}>
            <h1 className={`whitespace-pre-line break-words font-serif text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.5rem] ${titleColor}`}>
              {c.title}
            </h1>
            {c.accentLine && (
              <p className="mt-3 font-serif text-2xl font-medium italic leading-snug text-teal lg:text-[1.7rem]">
                {c.accentLine}
              </p>
            )}
            <p className="mt-5 max-w-md break-words text-[15px] leading-relaxed text-ink">{c.paragraph}</p>

            {nav && (
              <div className="mt-7 flex items-center gap-2.5" role="tablist" aria-label="Home themes">
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
            )}
          </div>

          <div className="relative min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.heroImage}
              alt=""
              className={`w-full select-none rounded-l-xl object-cover lg:rounded-xl ${welfare ? "h-[15.5rem] sm:h-[17.25rem] lg:h-[17.5rem]" : ""}`}
              width={640}
              height={390}
            />
            {c.heroChip && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2.5 rounded-lg bg-[#1c4b45]/92 px-3 py-2 text-white shadow-lg backdrop-blur">
                <Icon name="Church" size={26} strokeWidth={1.7} className="text-white/90" />
                <span className="leading-tight">
                  <span className="block font-serif text-sm font-bold">{c.heroChip.title}</span>
                  <span className="block text-[11px] text-white/80">{c.heroChip.sub}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ── Cards ────────────────────────────────────────── */}
      {!heroOnly && (
      <section className="pb-8 pt-6">
        <div className="flex min-w-0 items-center gap-3 px-4 sm:gap-5 sm:px-10">
          <span className={`h-px flex-1 ${rule}`} aria-hidden />
          <h2 className="min-w-0 max-w-[82vw] text-center font-serif text-2xl font-bold text-ink text-balance sm:text-3xl">{c.sectionTitle}</h2>
          <span className={`h-px flex-1 ${rule}`} aria-hidden />
        </div>

        <Container size="wide" className="mt-7">
          {c.layout === "welfare6" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.cards.map((card) => (
                <article key={card.title} className="flex min-w-0 items-start gap-4 rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md dark:bg-surface">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                    <Icon name={card.icon} size={30} strokeWidth={1.9} />
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
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {c.cards.map((card) => (
                <article key={card.title} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-surface">
                  <div className="flex items-start gap-3.5 p-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full text-white" style={{ background: CIRCLE[card.iconBg] }}>
                      <Icon name={card.icon} size={26} strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words font-serif text-lg font-bold leading-snug text-ink">{card.title}</h3>
                      <p className="mt-1.5 break-words text-[13px] leading-relaxed text-ink-soft">{card.body}</p>
                      <span className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                        Learn More <Icon name="ArrowRight" size={14} />
                      </span>
                    </div>
                  </div>
                  {card.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.image} alt="" className="mt-auto h-40 w-full object-cover" width={300} height={160} />
                  )}
                </article>
              ))}
            </div>
          )}

          {/* ── Our Promise ─────────────────────────────────── */}
          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-accent/40 bg-accent-soft/50 p-5 sm:flex-row sm:items-center sm:gap-6">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-full"
              style={c.accent === "teal" ? { background: CIRCLE.teal, color: "#fff" } : undefined}
            >
              {c.accent === "teal" ? (
                <Icon name="Users" size={28} strokeWidth={1.8} />
              ) : (
                <span className="text-accent-strong dark:text-accent">
                  <Icon name="HandHeart" size={44} strokeWidth={1.8} />
                </span>
              )}
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-ink">Our Promise</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{c.promise.text}</p>
            </div>
            {c.promise.verse ? (
              <figure className="shrink-0 sm:text-right">
                <blockquote className="font-serif text-base italic leading-snug text-ink">
                  &ldquo;{c.promise.verse}&rdquo;
                </blockquote>
                <figcaption className="mt-0.5 font-serif text-sm text-ink-soft">— {c.promise.ref}</figcaption>
              </figure>
            ) : (
              c.promise.feather && <Feather className="hidden h-11 w-28 shrink-0 sm:block" />
            )}
          </div>
        </Container>
      </section>
      )}

      {/* ── Scripture ribbon ────────────────────────────── */}
      {!heroOnly && !cardsOnly && !hideRibbon && (
      <section
        className={`relative overflow-hidden text-white ${RIBBON_BG[c.ribbon.bg]} ${c.ribbon.deco === "skyline" ? "border-t-2 border-[#c9a13b]" : ""}`}
        aria-label="Scripture references"
      >
        {c.ribbon.deco === "skyline" && (
          <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-80 sm:h-16 sm:w-64" />
        )}
        <Container className="relative z-[1] py-7 text-center">
          <div className="flex items-center justify-center gap-4">
            {c.ribbon.deco === "flourish" && <Flourish className="hidden h-5 w-24 shrink-0 sm:block" />}
            <p className="mx-auto max-w-3xl font-serif text-lg italic leading-snug text-[#f3e9cf] sm:text-xl text-balance">
              “{c.ribbon.verse}”
              {c.ribbon.ref && <span className="not-italic font-semibold text-white"> — {c.ribbon.ref}</span>}
            </p>
            {c.ribbon.deco === "flourish" && <Flourish className="hidden h-5 w-24 shrink-0 -scale-x-100 sm:block" />}
          </div>

          {c.ribbon.secondary && (
            <>
              <p className="mx-auto mt-1.5 max-w-3xl font-serif text-sm italic leading-snug text-white/90 sm:text-base">
                {c.ribbon.secondary.text}
              </p>
              <p className="mt-0.5 font-serif text-sm font-semibold text-white/90">— {c.ribbon.secondary.ref}</p>
            </>
          )}

          <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
            {c.ribbon.refs.map((r, i) => (
              <span key={`${r}-${i}`} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/30">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>
      )}

      {!heroOnly && !cardsOnly && infoBar}
    </div>
  );
}
