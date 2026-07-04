import { Container } from "./Container";
import { Icon } from "@/components/Icon";
import { Reveal } from "./Reveal";
import { AnimatedTitle } from "./AnimatedTitle";
import { GodRays, LightOrbs } from "@/components/Sacred";
import { sacredImage } from "@/lib/images";
import { PhotoBlock } from "./PhotoBlock";
import { cn } from "@/lib/cn";

export function SectionHero({
  eyebrow,
  title,
  subtitle,
  verse,
  icon,
  gradient,
  image,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  verse?: { text: string; ref: string };
  icon?: string;
  gradient?: string;
  /** curated image key rendered behind the gradient + as the arch window */
  image?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header className="relative overflow-hidden text-bone grain">
      {/* sacred photography backdrop */}
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sacredImage(image, 1600, 900)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: image
            ? "radial-gradient(120% 90% at 15% -10%, rgba(23,22,43,0.55), rgba(20,19,39,0.93) 55%), linear-gradient(160deg, rgba(23,22,43,0.92), rgba(36,31,63,0.88))"
            : gradient ??
              "radial-gradient(120% 90% at 15% -10%, rgba(214,171,84,0.42), transparent 55%), radial-gradient(120% 120% at 100% 0%, rgba(58,106,93,0.32), transparent 52%), linear-gradient(160deg, #17162b, #241f3f)",
        }}
      />
      <GodRays />
      <LightOrbs />
      {/* dawn arc */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(214,171,84,0.25),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6ab54]/40 to-transparent" />

      <Container
        className={cn(
          "relative z-[1] py-16 sm:py-20 lg:py-24",
          align === "center" && "text-center",
          image && "lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14",
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <Reveal>
            <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
              {icon && (
                <span className="grid size-11 place-items-center rounded-t-full rounded-b-lg border border-[#d6ab54]/40 bg-white/5 pb-0.5 pt-1 text-[#e6c67d] backdrop-blur">
                  <Icon name={icon} size={20} />
                </span>
              )}
              {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e6c67d]">
                  {eyebrow}
                </span>
              )}
            </div>
          </Reveal>
          <AnimatedTitle
            text={title}
            delay={0.1}
            className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem] text-balance"
          />
          {subtitle && (
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 text-pretty">
                {subtitle}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.18}>
              <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>
                {children}
              </div>
            </Reveal>
          )}
          {verse && (
            <Reveal delay={0.24}>
              <figure className={cn("mt-10 max-w-lg border-l-2 border-[#d6ab54]/50 pl-4", align === "center" && "mx-auto")}>
                <blockquote className="font-serif text-lg italic leading-snug text-white/85">
                  “{verse.text}”
                </blockquote>
                <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#e6c67d]">
                  {verse.ref}
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>

        {/* chapel-window portrait of the section's imagery */}
        {image && (
          <Reveal delay={0.2} className="hidden lg:block">
            <div className="animate-float relative">
              <div className="animate-pulse-soft absolute -inset-8 rounded-t-full rounded-b-3xl bg-[radial-gradient(closest-side,rgba(214,171,84,0.35),transparent_75%)]" />
              <div className="absolute -inset-3 rounded-t-full rounded-b-3xl border border-[#d6ab54]/25" />
              <PhotoBlock
                seed={image}
                w={520}
                h={680}
                overlay="dawn"
                rounded="rounded-t-full rounded-b-3xl"
                className="h-[22rem] w-64 shadow-float ring-1 ring-[#d6ab54]/50 xl:h-[24rem] xl:w-72"
              />
              <span className="absolute -bottom-3 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d6ab54]/60 to-transparent" />
            </div>
          </Reveal>
        )}
      </Container>
    </header>
  );
}
