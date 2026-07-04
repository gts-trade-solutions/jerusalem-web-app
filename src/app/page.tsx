import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { GatheringStrip } from "@/components/sections/GatheringStrip";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { StatPill } from "@/components/ui/StatPill";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { Ornament } from "@/components/Sacred";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { TiltCard } from "@/components/ui/TiltCard";
import { sacredImage } from "@/lib/images";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

/** Curated arch-window vignette for each pillar. */
const PILLAR_IMAGES: Record<string, string> = {
  "/neighbor": "hands-heart",
  "/faith": "scripture-sunlight",
  "/unity": "sunset-gathering",
  "/music": "orchestra-strings",
  "/events": "barbecue-feast",
  "/security": "peaks-clouds",
};

const gatherWays = [
  { icon: "DoorOpen", title: "Open Your Table", body: "Host a Barbecue & Book of Mormon night — turn your backyard into a gathering place where neighbors become family." },
  { icon: "HeartHandshake", title: "Carry Each Other", body: "Pray for real needs and answer them. Serve through JustServe, sister circles, and self-reliance groups." },
  { icon: "Sparkles", title: "Testify of Christ", body: "Share your witness, study the Book of Mormon together, and invite a friend onto the covenant path." },
];

export default function HomePage() {
  const pillars = NAV.filter((n) => n.href !== "/");

  return (
    <>
      <HomeHero />

      {/* How we gather */}
      <section className="py-16 sm:py-20">
        <Container>
          <Ornament className="mb-14" />
          <SectionHeading
            eyebrow="How We Gather and Build Together"
            title="Zion is not a place we wait for — it is a people we become"
            intro="Three simple invitations shape everything we do here. Small, faithful acts, repeated in love, gather a whole community home."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {gatherWays.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <FeatureCard icon={w.icon} title={w.title} body={w.body} tone={i === 1 ? "sage" : "accent"} />
              </Reveal>
            ))}
          </div>

          <div className="lattice mt-14 rounded-3xl border border-border bg-gradient-to-b from-accent-soft/50 via-transparent to-transparent p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatPill value={1240} label="Saints Gathered" icon="Users" />
              <StatPill value={318} label="Prayers Answered" icon="Hand" />
              <StatPill value={96} label="B&B Nights Hosted" icon="Flame" />
              <StatPill value={54} label="Wards & Branches" icon="Church" />
            </div>
          </div>
        </Container>
      </section>

      {/* Quick entry grid */}
      <section className="lattice border-y border-border bg-surface-2/50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Six Ways In"
            title="Find your place in the gathering"
            intro="Every pillar of the community is one tap away. Start wherever the Spirit leads you."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.href} delay={i * 0.06} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={p.href}
                    className="group relative flex h-full items-stretch gap-4 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-surface-2/60 p-5 shadow-sm card-hover"
                  >
                  <div className="flex flex-1 flex-col">
                    <span className={cn(
                      "grid size-11 place-items-center rounded-t-full rounded-b-lg pb-0.5 pt-1 shadow-sm transition-transform group-hover:scale-105",
                      i % 3 === 1 ? "bg-sage-soft text-sage" : "bg-accent-soft text-accent-strong dark:text-accent",
                    )}>
                      <Icon name={p.icon} size={21} />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-ink">{p.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent transition-all group-hover:gap-2">
                      Enter <Icon name="ArrowRight" size={14} />
                    </span>
                  </div>
                  <div className="relative self-center">
                    <div className="pointer-events-none absolute -inset-1.5 rounded-t-full rounded-b-2xl border border-accent/25" />
                    <PhotoBlock
                      seed={PILLAR_IMAGES[p.href] ?? "golden-dawn"}
                      w={220}
                      h={300}
                      icon={p.icon}
                      overlay="dawn"
                      zoom
                      rounded="rounded-t-full rounded-b-xl"
                      className="h-32 w-[5.25rem] shadow-md ring-1 ring-accent/40 sm:h-36 sm:w-24"
                    />
                  </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gathering near you */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Gathering Near You"
            title="This week's tables are being set"
            intro="Real gatherings, real neighbors. RSVP and we'll save you a seat."
            action={
              <Link href="/events" className="hidden sm:block">
                <Button variant="outline" iconRight="ArrowRight">All events</Button>
              </Link>
            }
          />
          <div className="mt-12">
            <GatheringStrip limit={4} />
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/events">
              <Button block variant="outline" iconRight="ArrowRight">See all events</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Our Promise */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <Ornament className="mb-14" />
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-ink-900 px-6 py-14 text-center text-white grain sm:px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sacredImage("sunset-gathering", 1400, 600)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,22,43,0.82),rgba(23,22,43,0.94))]" />
              <div className="pointer-events-none absolute inset-0 dawn-wash opacity-40" />
              <div className="relative z-[1] mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ab54]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
                  <Icon name="Heart" size={13} /> Our Promise
                </span>
                <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl text-balance">
                  Here, no one gathers alone
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/75 text-pretty">
                  We promise a community of one heart and one mind — where the newcomer is welcomed by name,
                  the burdened are carried, and every soul finds a place at the table of the Lord.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href="/auth/sign-up">
                    <Button size="lg" variant="accent" icon="Sunrise">Begin Your Gathering</Button>
                  </Link>
                  <Link href="/faith">
                    <Button size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10" iconRight="ArrowRight">
                      Explore Our Faith
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ScriptureRibbon page="home" />
    </>
  );
}
