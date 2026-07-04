import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eventById } from "@/data/events";
import { Container } from "@/components/ui/Container";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/Icon";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { EventDetailActions } from "@/components/sections/events/EventDetailActions";
import { formatDateLong, formatTime, dateChip } from "@/lib/format";

const typeLabel: Record<string, { label: string; icon: string }> = {
  bb: { label: "Barbecue & Book of Mormon", icon: "Flame" },
  worship: { label: "Worship Gathering", icon: "Church" },
  fellowship: { label: "Fellowship", icon: "Users" },
  livestream: { label: "Livestream", icon: "Radio" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = eventById(id);
  return { title: event ? event.title : "Event · Neighborhood B&B Events" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = eventById(id);
  if (!event) notFound();

  const meta = typeLabel[event.type];
  const chip = dateChip(event.start);
  const pin = event.pin ?? { x: 50, y: 50 };

  return (
    <>
      {/* Hero */}
      <header className="relative">
        <PhotoBlock
          seed={event.image ?? event.id}
          w={1400}
          h={720}
          icon={meta.icon}
          overlay="ink"
          rounded="rounded-none"
          className="h-[46vh] min-h-[340px] w-full"
        >
          <Container className="flex h-full flex-col justify-end pb-10">
            <Link
              href="/events"
              className="mb-auto mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-black/40"
            >
              <Icon name="ChevronLeft" size={15} /> Back to all events
            </Link>
            <Badge tone="accent" icon={meta.icon} className="mb-3 w-fit bg-white/10 text-[#e6c67d]">
              {meta.label}
            </Badge>
            <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="CalendarDays" size={15} /> {formatDateLong(event.start)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Clock" size={15} /> {formatTime(event.start)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="MapPin" size={15} /> {event.location}
              </span>
            </div>
          </Container>
        </PhotoBlock>
      </header>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Main column */}
            <div>
              <EventDetailActions id={event.id} title={event.title} />

              <div className="mt-8">
                <h2 className="font-serif text-xl font-semibold text-ink">About this gathering</h2>
                <p className="mt-3 text-base leading-relaxed text-muted text-pretty">{event.description}</p>
                <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
                  Come as you are. Whether you&apos;ve read the Book of Mormon a hundred times or have never opened it,
                  there&apos;s a seat and a plate waiting for you. Bring a friend, bring a lawn chair, and bring an
                  open heart — that&apos;s all a gathering in Zion ever asks.
                </p>
              </div>

              {/* Detail chips */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "CalendarDays", label: "Date", value: `${chip.weekday}, ${chip.mon} ${chip.day}` },
                  { icon: "Clock", label: "Time", value: formatTime(event.start) },
                  { icon: "Users", label: "Going", value: `${event.going.toLocaleString()} neighbors` },
                ].map((r) => (
                  <div key={r.label} className="rounded-2xl border border-border bg-surface-2/60 p-4">
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                      <Icon name={r.icon} size={13} /> {r.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">{r.value}</p>
                  </div>
                ))}
              </div>

              {/* What to expect */}
              <div className="mt-8">
                <h2 className="font-serif text-xl font-semibold text-ink">What to expect</h2>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "Good food first — no agenda, just neighbors sharing a meal.",
                    "A short, friendly reading from the Book of Mormon, read aloud together.",
                    "Open conversation with real questions — curiosity over conclusions.",
                    "A closing hymn or brief testimony as the evening settles.",
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm text-muted">
                      <Icon name="CheckCircle2" size={17} className="mt-0.5 shrink-0 text-sage" />
                      <span className="leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Host card */}
              <Card className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-faint">Your host</p>
                <div className="mt-3 flex items-center gap-3">
                  <Avatar name={event.hostName} seed={event.hostName} size={52} ring />
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-ink">{event.hostName}</p>
                    <p className="text-xs text-muted">Gathering host</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge tone="sage" icon="BadgeCheck">Verified Host</Badge>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {event.hostName} opens their table so the neighborhood has a place to belong. Reach out with
                  questions when you RSVP — you&apos;ll be greeted by name.
                </p>
              </Card>

              {/* Mini map */}
              <Card className="overflow-hidden p-0">
                <div className="p-5 pb-3">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-faint">
                    <Icon name="MapPinned" size={13} /> Where to find it
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{event.location}</p>
                </div>
                <div className="px-5 pb-5">
                  <MapPlaceholder
                    pins={[{ id: event.id, x: pin.x, y: pin.y, label: event.location, tone: "accent", active: true }]}
                    variant="streets"
                    height={220}
                  />
                </div>
              </Card>

              <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5 hover:text-accent-strong">
                <Icon name="ChevronLeft" size={15} /> Back to all events
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ScriptureRibbon page="events" />
    </>
  );
}
