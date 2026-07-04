"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { RsvpButton } from "@/components/RsvpButton";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { dateChip, formatTime } from "@/lib/format";
import { CreateEventModal } from "./CreateEventModal";

const YOU_PIN_ID = "you-are-here";

const typeMeta: Record<string, { label: string; icon: string }> = {
  bb: { label: "Barbecue & Book of Mormon", icon: "Flame" },
  worship: { label: "Worship", icon: "Church" },
  fellowship: { label: "Fellowship", icon: "Users" },
  livestream: { label: "Livestream", icon: "Radio" },
};

export function EventMap() {
  const { events, pushToast } = useAppData();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showYou, setShowYou] = useState(false);
  const [hostOpen, setHostOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const pins: MapPin[] = useMemo(() => {
    const evPins = events.map((e, i): MapPin => {
      const p = e.pin ?? { x: 15 + ((i * 13) % 70), y: 20 + ((i * 21) % 60) };
      return {
        id: e.id,
        x: p.x,
        y: p.y,
        label: e.title,
        tone: e.type === "fellowship" || e.type === "worship" ? "sage" : "accent",
        active: e.id === selectedId,
      };
    });
    if (showYou) {
      evPins.push({ id: YOU_PIN_ID, x: 30, y: 44, label: "You · Cedar Hills, UT", tone: "sage", active: true });
    }
    return evPins;
  }, [events, selectedId, showYou]);

  const selected = events.find((e) => e.id === selectedId) ?? null;

  function onPin(id: string) {
    if (id === YOU_PIN_ID) {
      pushToast("That's you — near Cedar Hills, UT 📍");
      return;
    }
    setSelectedId(id);
  }

  function useMyLocation() {
    setShowYou(true);
    pushToast("Located you near Cedar Hills, UT", "success");
  }

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">Gatherings Near You</h2>
            <p className="mt-1.5 max-w-xl text-sm text-muted">
              Every pin is an open table. Tap one to see the details and save your seat — or drop your own pin and
              invite the neighborhood.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" icon="Navigation" onClick={useMyLocation}>
              Use My Location
            </Button>
            <Button variant="accent" icon="Plus" onClick={() => setHostOpen(true)}>
              Sign Up to Host
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <MapPlaceholder pins={pins} onPinClick={onPin} variant="streets" height={420} />
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent" /> B&amp;B &amp; livestreams
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-sage" /> Worship &amp; fellowship
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="MapPin" size={13} className="text-sage" /> Your location
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {selected ? (
            <Card className="overflow-hidden">
              <div className="border-b border-border bg-surface-2/50 p-5">
                <Badge tone="accent" icon={typeMeta[selected.type].icon} className="mb-2">
                  {typeMeta[selected.type].label}
                </Badge>
                <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">
                  {selected.title}
                </h3>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="Clock" size={13} /> {dateChip(selected.start).weekday} · {formatTime(selected.start)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="MapPin" size={13} /> {selected.location}
                  </span>
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted">{selected.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-faint">
                  <Icon name="UserCheck" size={13} /> Hosted by {selected.hostName}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <RsvpButton id={selected.id} size="sm" />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon="Eye" onClick={() => setDetailOpen(true)}>
                      Details
                    </Button>
                    <Link href={`/events/${selected.id}`}>
                      <Button variant="outline" size="sm" iconRight="ArrowRight">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
              <span className="mb-4 grid size-14 place-items-center rounded-full bg-sage-soft text-sage">
                <Icon name="MapPinned" size={26} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-ink">Pick a pin to begin</h3>
              <p className="mt-1.5 max-w-xs text-sm text-muted">
                {events.length} gatherings are within reach this month. Tap any marker on the map to see who&apos;s
                hosting and RSVP.
              </p>
              <Button variant="ghost" size="sm" icon="Navigation" className="mt-4" onClick={useMyLocation}>
                Use my location
              </Button>
            </Card>
          )}
        </Reveal>
      </div>

      <EventDetailModal event={selected} open={detailOpen} onClose={() => setDetailOpen(false)} />
      <CreateEventModal open={hostOpen} onClose={() => setHostOpen(false)} />
    </div>
  );
}
