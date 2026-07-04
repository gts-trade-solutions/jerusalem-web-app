"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { useUser } from "@/context/UserContext";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Card } from "@/components/ui/Card";
import { StatPill } from "@/components/ui/StatPill";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/Icon";
import { CreateEventModal } from "./CreateEventModal";

const BADGES = [
  { icon: "Flame", label: "First B&B", tone: "accent" as const, earned: true, note: "Attended your first Barbecue & Book of Mormon" },
  { icon: "Handshake", label: "Neighbor", tone: "sage" as const, earned: true, note: "Met 10 neighbors at gatherings" },
  { icon: "Send", label: "Inviter", tone: "accent" as const, earned: true, note: "Sent your first invitation" },
  { icon: "DoorOpen", label: "Open Table", tone: "sage" as const, earned: false, note: "Host your first gathering" },
  { icon: "Trophy", label: "Faithful Five", tone: "accent" as const, earned: false, note: "Attend five nights in a season" },
];

export function MyActivity() {
  const { events } = useAppData();
  const { user } = useUser();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hostOpen, setHostOpen] = useState(false);

  const rsvped = events.filter((e) => e.rsvped);
  const hosting = events.filter((e) => e.hostName === user.name);
  const openEvent = events.find((e) => e.id === openId) ?? null;

  return (
    <div className="space-y-10">
      {/* Header + stats */}
      <Reveal>
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Your gathering life</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">Welcome back, {user.name.split(" ")[0]}</h2>
              <p className="mt-1.5 text-sm text-muted">
                Small, faithful acts add up. Here&apos;s the fellowship you&apos;ve built this season.
              </p>
            </div>
            <Button variant="accent" icon="Plus" onClick={() => setHostOpen(true)}>
              Host a night
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatPill value={7} label="Nights Attended" icon="Flame" />
            <StatPill value={23} label="Neighbors Met" icon="Users" />
            <StatPill value={12} label="Invites Sent" icon="Send" />
            <StatPill value={rsvped.length} label="Upcoming RSVPs" icon="CalendarDays" />
          </div>
        </div>
      </Reveal>

      {/* Badges */}
      <Reveal>
        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-ink">Badges earned</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {BADGES.map((b) => (
              <Card
                key={b.label}
                className={b.earned ? "p-4 text-center" : "p-4 text-center opacity-55"}
              >
                <span
                  className={
                    b.earned
                      ? b.tone === "sage"
                        ? "mx-auto mb-2 grid size-11 place-items-center rounded-full bg-sage-soft text-sage"
                        : "mx-auto mb-2 grid size-11 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent"
                      : "mx-auto mb-2 grid size-11 place-items-center rounded-full bg-surface-3 text-faint"
                  }
                >
                  <Icon name={b.earned ? b.icon : "Lock"} size={20} />
                </span>
                <p className="text-sm font-semibold text-ink">{b.label}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">{b.note}</p>
              </Card>
            ))}
          </div>
        </div>
      </Reveal>

      {/* RSVP'd events */}
      <Reveal>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink">Events you&apos;re going to</h3>
            {rsvped.length > 0 && <Badge tone="sage" icon="CheckCircle2">{rsvped.length} saved</Badge>}
          </div>
          {rsvped.length === 0 ? (
            <EmptyState
              icon="CalendarDays"
              title="No RSVPs yet"
              body="Head to Upcoming Events and save your seat at a table. We'll keep them here for you."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rsvped.map((e) => (
                <EventCard key={e.id} event={e} onDetails={setOpenId} layout="vertical" />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Hosting */}
      <Reveal>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-ink">Gatherings you host</h3>
            {hosting.length > 0 && <Badge tone="accent" icon="BadgeCheck">{hosting.length} hosting</Badge>}
          </div>
          {hosting.length === 0 ? (
            <EmptyState
              icon="DoorOpen"
              title="You haven't hosted yet"
              body="Open your table for the first time — post a gathering and it will show up right here and on the map."
              action={
                <Button variant="accent" icon="Flame" onClick={() => setHostOpen(true)}>
                  Host your first night
                </Button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hosting.map((e) => (
                <EventCard key={e.id} event={e} onDetails={setOpenId} layout="vertical" />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <EventDetailModal event={openEvent} open={openId !== null} onClose={() => setOpenId(null)} />
      <CreateEventModal open={hostOpen} onClose={() => setHostOpen(false)} />
    </div>
  );
}
