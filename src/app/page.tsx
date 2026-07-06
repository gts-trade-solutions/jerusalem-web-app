import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { GatheringStrip } from "@/components/sections/GatheringStrip";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StatPill } from "@/components/ui/StatPill";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/cn";

export default function HomePage() {
  const pillars = NAV.filter((n) => n.href !== "/");

  return (
    <>
      <HomeHero />

      {/* Stats band */}
      <section className="border-b border-border bg-bg-tint py-14">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatPill value={1240} label="Saints Gathered" icon="Users" />
            <StatPill value={318} label="Prayers Answered" icon="Hand" />
            <StatPill value={96} label="B&B Nights Hosted" icon="Flame" />
            <StatPill value={54} label="Wards & Branches" icon="Church" />
          </div>
        </Container>
      </section>

      {/* Quick entry grid — six ways in */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Six Ways In"
            title="Find your place in the gathering"
            intro="Every pillar of the community is one tap away. Start wherever the Spirit leads you."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.href} delay={i * 0.06} className="h-full">
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid size-14 place-items-center rounded-full transition-transform group-hover:scale-105",
                        i % 3 === 1 ? "bg-teal-soft text-teal" : "bg-accent-soft text-accent-strong dark:text-accent",
                      )}
                    >
                      <Icon name={p.icon} size={26} strokeWidth={1.9} />
                    </span>
                    <Icon name="ArrowUpRight" size={20} className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-ink">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gathering near you */}
      <section className="border-t border-border bg-bg-tint py-16 sm:py-20">
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
          <div className="mt-10">
            <GatheringStrip limit={4} />
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/events">
              <Button block variant="outline" iconRight="ArrowRight">See all events</Button>
            </Link>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="home" />
    </>
  );
}
