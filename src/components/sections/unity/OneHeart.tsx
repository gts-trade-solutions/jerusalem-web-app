"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/Card";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";

const PILLARS = [
  {
    icon: "Users",
    title: "Fellowship",
    body: "No one walks the covenant path alone. Share a meal, a burden, a laugh — belong to a people who welcome you by name.",
    tone: "accent" as const,
  },
  {
    icon: "Church",
    title: "Worship Together",
    body: "Firesides, sacred music, and Sabbath devotionals where hearts are turned as one toward the Savior in reverence and joy.",
    tone: "ink" as const,
  },
  {
    icon: "PartyPopper",
    title: "Family Activities",
    body: "Cookouts, game nights, and service projects for every age — because Zion is built one shared afternoon at a time.",
    tone: "sage" as const,
  },
  {
    icon: "Sparkles",
    title: "Testimony Sharing",
    body: "Open-hearted evenings to witness of Christ, tell of answered prayers, and lift the faith of the friend beside you.",
    tone: "accent" as const,
  },
];

export function OneHeart({ onFindGroup }: { onFindGroup: () => void }) {
  const { pushToast } = useAppData();
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [bringing, setBringing] = useState("");

  function submitRsvp(e: React.FormEvent) {
    e.preventDefault();
    setRsvpOpen(false);
    pushToast(
      `A seat is saved${name ? `, ${name.split(" ")[0]}` : ""} — we can't wait to gather with you 🕯️`,
      "success",
    );
    setName("");
    setGuests("1");
    setBringing("");
  }

  return (
    <div className="space-y-16">
      {/* Four pillars */}
      <div>
        <SectionHeading
          eyebrow="Four Ways We Become One"
          title="The threads that weave a scattered people into Zion"
          intro="Unity is not sameness — it is a thousand small acts of belonging, repeated in love until strangers become family."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <FeatureCard icon={p.icon} title={p.title} body={p.body} tone={p.tone} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* You're Invited feature block */}
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
          <PhotoBlock
            seed="unity-gathering-table-candles"
            w={1100}
            h={520}
            overlay="ink"
            icon="Users"
            rounded="rounded-none"
            className="min-h-[22rem]"
          >
            <div className="flex h-full flex-col justify-end gap-5 p-7 sm:p-10">
              <Badge tone="accent" icon="Sparkles" className="w-fit bg-white/10 text-[#e6c67d] backdrop-blur">
                You&apos;re Invited
              </Badge>
              <div className="max-w-xl">
                <h3 className="font-serif text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl">
                  There is a place set for you at our table this week
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 text-pretty sm:text-base">
                  Whether you have gathered with us for years or are wondering if you belong at all — you do.
                  Reserve your seat, and let us welcome you home.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="accent" size="md" icon="HeartHandshake" onClick={() => setRsvpOpen(true)}>
                  RSVP to Gather
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                  icon="Share2"
                  onClick={() => pushToast("Invitation link copied — bring a friend along 🤝", "accent")}
                >
                  Invite a Friend
                </Button>
              </div>
            </div>
          </PhotoBlock>
        </div>
      </Reveal>

      {/* Verse block */}
      <Reveal>
        <figure className="relative overflow-hidden rounded-3xl border border-border bg-ink-900 px-6 py-12 text-center text-white grain sm:px-12">
          <div className="pointer-events-none absolute inset-0 dawn-wash opacity-45" />
          <div className="relative z-[1] mx-auto max-w-2xl">
            <span className="mx-auto mb-5 grid size-11 place-items-center rounded-full border border-[#d6ab54]/30 text-[#e6c67d]">
              <Icon name="Quote" size={20} />
            </span>
            <blockquote className="font-serif text-2xl italic leading-snug text-white/90 text-balance sm:text-3xl">
              &ldquo;And the Lord called his people Zion, because they were of one heart and one mind, and dwelt
              in righteousness; and there was no poor among them.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
              Moses 7:18
            </figcaption>
          </div>
        </figure>
      </Reveal>

      {/* Find a Group callout */}
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-accent/25 bg-accent-soft/50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
              <Icon name="Compass" size={24} />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink">Not sure where to begin?</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                Find a fellowship group that fits your season of life — from young adults to sisters&apos; circles
                to B&amp;B host networks. There is a circle waiting for you.
              </p>
            </div>
          </div>
          <Button variant="accent" size="md" iconRight="ArrowRight" onClick={onFindGroup} className="shrink-0">
            Find a Group
          </Button>
        </div>
      </Reveal>

      {/* RSVP modal */}
      <Modal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        title="Reserve Your Seat"
        description="Tell us you're coming — we'll save a place and welcome you by name."
        size="sm"
      >
        <form onSubmit={submitRsvp} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eliza Whitmer"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">How many are coming?</span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
            >
              <option value="1">Just me</option>
              <option value="2">2 of us</option>
              <option value="3">3 of us</option>
              <option value="4">4 or more</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Bringing anything to share? (optional)</span>
            <input
              value={bringing}
              onChange={(e) => setBringing(e.target.value)}
              placeholder="A dessert, a friend, a testimony…"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={() => setRsvpOpen(false)}>
              Not now
            </Button>
            <Button type="submit" variant="accent" icon="CheckCircle2">
              Save My Seat
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
