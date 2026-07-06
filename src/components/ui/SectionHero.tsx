import { Container } from "./Container";
import { Icon } from "@/components/Icon";
import { Reveal } from "./Reveal";
import { AnimatedTitle } from "./AnimatedTitle";
import { sacredImage } from "@/lib/images";
import { cn } from "@/lib/cn";

/**
 * Light, editorial section banner — a golden-hour photographic backdrop
 * behind a cream veil, with a gold section glyph, deep-navy serif title,
 * subtitle, and an italic scripture verse. Matches the reference screens.
 */
export function SectionHero({
  eyebrow,
  title,
  subtitle,
  verse,
  icon,
  image = "temple-golden",
  children,
  align = "center",
  accent = "gold",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  verse?: { text: string; ref: string };
  icon?: string;
  image?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  accent?: "gold" | "green" | "teal";
}) {
  const accentText =
    accent === "green" ? "text-sage" : accent === "teal" ? "text-teal" : "text-accent";
  // image-forward scrim: lighten only the zone behind the text so navy stays
  // readable, while the rest of the golden-hour photo shows through vividly.
  const scrim =
    align === "center"
      ? "radial-gradient(78% 82% at 50% 50%, rgba(255,255,255,0.9), rgba(255,255,255,0.55) 52%, rgba(255,255,255,0.12) 78%, rgba(255,255,255,0) 100%)"
      : "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.7) 34%, rgba(255,255,255,0.28) 58%, rgba(255,255,255,0.04) 78%, rgba(255,255,255,0) 100%)";

  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* golden-hour photographic backdrop — fills the whole banner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sacredImage(image, 1920, 900)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: scrim }} />
      {/* gentle blend into the nav above and the content below */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/50 to-transparent dark:from-ink-900/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />

      <Container
        className={cn(
          "relative z-[1] flex min-h-[19rem] flex-col justify-center py-12 sm:min-h-[22rem] sm:py-14 lg:min-h-[25rem]",
          align === "center" && "items-center text-center",
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <Reveal>
            <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
              {icon && (
                <span className={cn("grid size-12 place-items-center rounded-full bg-white/70 shadow-sm ring-1 ring-accent/20", accentText)}>
                  <Icon name={icon} size={26} strokeWidth={1.9} />
                </span>
              )}
              {eyebrow && (
                <span className={cn("text-xs font-semibold uppercase tracking-[0.22em]", accentText)}>
                  {eyebrow}
                </span>
              )}
            </div>
          </Reveal>

          <AnimatedTitle
            text={title}
            delay={0.08}
            className="font-serif text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.3rem] text-balance"
          />

          {subtitle && (
            <Reveal delay={0.12}>
              <p className={cn("mt-5 text-lg font-medium leading-relaxed text-ink-soft text-pretty", align === "center" ? "mx-auto max-w-xl" : "max-w-xl")}>
                {subtitle}
              </p>
            </Reveal>
          )}

          {verse && (
            <Reveal delay={0.18}>
              <figure className={cn("mt-5", align === "center" ? "mx-auto max-w-lg" : "max-w-lg border-l-2 border-accent/50 pl-4")}>
                <blockquote className="font-serif text-base italic leading-snug text-ink-soft sm:text-lg">
                  “{verse.text}”
                </blockquote>
                <figcaption className={cn("mt-1.5 text-sm font-semibold", accentText)}>
                  {verse.ref}
                </figcaption>
              </figure>
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.24}>
              <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </header>
  );
}
