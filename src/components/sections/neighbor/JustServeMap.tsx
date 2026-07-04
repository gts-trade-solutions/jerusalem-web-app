"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

interface Opportunity {
  id: string;
  x: number;
  y: number;
  label: string;
  tone: "accent" | "sage";
  icon: string;
  title: string;
  org: string;
  when: string;
  distance: string;
  need: string;
  body: string;
}

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "op-food", x: 26, y: 34, label: "Food Bank Shift", tone: "accent", icon: "Utensils",
    title: "Community Food Bank — Morning Shift", org: "Timpanogos Storehouse", when: "Sat · 8:00 AM",
    distance: "1.2 mi", need: "6 of 10 filled",
    body: "Sort, box, and hand out groceries to neighbors facing a hard month. Bring gloves and a willing heart — training on-site.",
  },
  {
    id: "op-temple", x: 52, y: 22, label: "Temple Grounds Cleanup", tone: "sage", icon: "TreePine",
    title: "Temple Grounds Beautification", org: "Mount Timpanogos Temple", when: "Sat · 9:00 AM",
    distance: "3.4 mi", need: "12 of 20 filled",
    body: "Weed the flower beds, mulch the paths, and leave the Lord's house a little brighter for the Saints who visit this week.",
  },
  {
    id: "op-yard", x: 40, y: 52, label: "Widow's Yard", tone: "accent", icon: "Sprout",
    title: "Yard Care for Sister Eleanor", org: "Orem 12th Ward", when: "This Thursday · 5:30 PM",
    distance: "0.6 mi", need: "3 of 5 filled",
    body: "Eleanor is 84 and can no longer keep up her garden. An hour of mowing and trimming means the world to her. Youth welcome.",
  },
  {
    id: "op-refugee", x: 68, y: 44, label: "Refugee Tutoring", tone: "sage", icon: "GraduationCap",
    title: "Refugee Family English Tutoring", org: "JustServe · Welcome Network", when: "Tue & Thu · 6:30 PM",
    distance: "4.1 mi", need: "Ongoing — 4 tutors needed",
    body: "Help newly arrived families practice conversational English and navigate their new home. No teaching experience required.",
  },
  {
    id: "op-blood", x: 58, y: 64, label: "Blood Drive", tone: "accent", icon: "Heart",
    title: "Community Blood Drive", org: "Red Cross × Stake Center", when: "Fri · 10:00 AM – 4:00 PM",
    distance: "2.0 mi", need: "18 of 40 slots",
    body: "Give the gift only you can give. Walk-ins welcome, but reserving a slot keeps the line short and the cookies plentiful.",
  },
  {
    id: "op-storehouse", x: 78, y: 30, label: "Bishop's Storehouse", tone: "sage", icon: "Wheat",
    title: "Bishop's Storehouse Restock", org: "Provident Living", when: "Wed · 4:00 PM",
    distance: "5.3 mi", need: "5 of 8 filled",
    body: "Stock shelves and prepare food orders for families in need across three stakes. A quiet, steady way to answer 'no poor among us.'",
  },
];

export function JustServeMap() {
  const { pushToast } = useAppData();
  const [selectedId, setSelectedId] = useState<string>("op-yard");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");

  const selected = OPPORTUNITIES.find((o) => o.id === selectedId) ?? OPPORTUNITIES[0];
  const pins: MapPin[] = OPPORTUNITIES.map((o) => ({
    id: o.id, x: o.x, y: o.y, label: o.label, tone: o.tone, active: o.id === selectedId,
  }));

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Just Serve, Nearby</span>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl text-balance">
            Six ways to serve within a few miles of home
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            Tap a pin to see the need. Every project is real work for a real neighbor — pick one and
            log your hours when you're done.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Map + detail */}
        <div className="space-y-5">
          <Reveal>
            <MapPlaceholder variant="streets" pins={pins} height={380} onPinClick={setSelectedId} />
          </Reveal>

          <Reveal>
            <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-xl",
                    selected.tone === "sage" ? "bg-sage-soft text-sage" : "bg-accent-soft text-accent-strong dark:text-accent",
                  )}
                >
                  <Icon name={selected.icon} size={24} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl font-semibold text-ink text-balance">{selected.title}</h3>
                    <Badge tone={selected.tone}>{selected.distance}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">{selected.org}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{selected.body}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><Icon name="Clock" size={13} /> {selected.when}</span>
                <span className="inline-flex items-center gap-1.5"><Icon name="Users" size={13} /> {selected.need}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-5">
                <Button variant="accent" icon="HandHeart" onClick={() => pushToast(`You signed up to serve — ${selected.title} 🙌`, "success")}>
                  Sign Me Up
                </Button>
                <Button variant="outline" icon="Navigation" onClick={() => pushToast("Directions sent to your phone", "default")}>
                  Get Directions
                </Button>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Side column */}
        <div className="space-y-5">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-border bg-surface-2/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-faint">All Opportunities</p>
              <ul className="mt-3 space-y-1">
                {OPPORTUNITIES.map((o) => (
                  <li key={o.id}>
                    <button
                      onClick={() => setSelectedId(o.id)}
                      aria-pressed={o.id === selectedId}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                        o.id === selectedId
                          ? "border-accent/40 bg-accent-soft/60"
                          : "border-transparent hover:bg-surface-2",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg",
                          o.tone === "sage" ? "bg-sage-soft text-sage" : "bg-accent-soft text-accent-strong dark:text-accent",
                        )}
                      >
                        <Icon name={o.icon} size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">{o.label}</span>
                        <span className="block text-[11px] text-faint">{o.distance} · {o.when}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-faint">Quick Actions</p>
              <div className="mt-3 flex flex-col gap-2.5">
                <Button block variant="primary" icon="Clock" onClick={() => pushToast("4 service hours logged this month — thank you 🕯️", "success")}>
                  Log Service Hours
                </Button>
                <Button block variant="outline" icon="Search" onClick={() => pushToast("Showing 24 more projects across your stake", "default")}>
                  Find More Projects
                </Button>
                <Button block variant="ghost" icon="UserPlus" onClick={() => setInviteOpen(true)}>
                  Invite a Friend
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="rounded-2xl border border-sage/25 bg-sage-soft/50 p-5">
              <Icon name="Quote" size={20} className="text-sage" />
              <blockquote className="mt-2 font-serif text-base italic leading-snug text-ink">
                “Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.”
              </blockquote>
              <figcaption className="mt-2 text-xs font-semibold uppercase tracking-widest text-sage">
                Matthew 25:40 · Verse of Encouragement
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Invite modal */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a Friend to Serve"
        description="Serving together is how strangers become saints."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button
              variant="accent"
              icon="Send"
              disabled={!email.includes("@")}
              onClick={() => {
                pushToast(`Invitation sent to ${email} 💌`, "success");
                setEmail("");
                setInviteOpen(false);
              }}
            >
              Send Invite
            </Button>
          </>
        }
      >
        <label htmlFor="js-email" className="mb-1.5 block text-sm font-medium text-ink">
          Friend's email
        </label>
        <input
          id="js-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="friend@email.com"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
        />
        <p className="mt-2 text-xs text-muted">
          We'll send them “{selected.title}” with a warm note and a one-tap way to join you.
        </p>
      </Modal>
    </div>
  );
}
