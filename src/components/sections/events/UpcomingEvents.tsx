"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

/* ── exact reference data ─────────────────────────────── */
const bbEvents = [
  { id: "bb1", img: "/images/bb-ev1.jpg", title: "Backyard Barbecue & Book of Mormon Night", date: "May 24 at 6:00 PM", loc: "Johnson Home · Riverview" },
  { id: "bb2", img: "/images/bb-ev2.jpg", title: "Potluck & Purpose", date: "May 31 at 5:30 PM", loc: "Garcia Home · Maple Ridge" },
  { id: "bb3", img: "/images/bb-ev3.jpg", title: "Sunday Scripture & Smoke", date: "June 7 at 4:00 PM", loc: "Anderson Home · Pine Hill" },
  { id: "bb4", img: "/images/bb-ev4.jpg", title: "Youth B&B Hangout", date: "June 14 at 6:30 PM", loc: "Stake Center Pavilion" },
];

const mapPins: MapPin[] = [
  { id: "p1", x: 30, y: 34, tone: "sage", label: "Johnson Home" },
  { id: "p2", x: 52, y: 22, tone: "sage", label: "Garcia Home" },
  { id: "star", x: 49, y: 52, tone: "accent", active: true, label: "You are here" },
  { id: "p3", x: 72, y: 34, tone: "sage", label: "Anderson Home" },
  { id: "p4", x: 66, y: 66, tone: "sage", label: "Stake Center" },
  { id: "p5", x: 30, y: 68, tone: "sage", label: "Pine Hill" },
];

const starters = [
  "What brought you peace this week?",
  "What do you love about Jesus Christ?",
  "What is one scripture that strengthens you?",
];

const kit = [
  { icon: "Hand", title: "Pray Together", body: "Begin and end with a spirit of unity." },
  { icon: "Utensils", title: "Eat Together", body: "Food brings hearts closer." },
  { icon: "BookOpen", title: "Read Together", body: "The Book of Mormon brings light." },
  { icon: "Heart", title: "Share Testimonies", body: "Lift and strengthen each other." },
  { icon: "Users", title: "Invite Others", body: "Love grows when we include others." },
];

export function UpcomingEvents({ onHost }: { onHost: () => void }) {
  const { pushToast } = useAppData();
  const [going, setGoing] = useState<Set<string>>(new Set());
  const [storyOpen, setStoryOpen] = useState(false);
  const [promptsOpen, setPromptsOpen] = useState(false);

  const toggleRsvp = (id: string, title: string) => {
    setGoing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    pushToast(going.has(id) ? "RSVP removed" : `You're going to ${title.split(" ").slice(0, 2).join(" ")}… 🎉`, going.has(id) ? "default" : "success");
  };

  const hostRows = [
    { icon: "UserPlus", title: "Sign Up to Host", body: "Create a gathering and invite your neighbors.", onClick: onHost },
    { icon: "Utensils", title: "Meal Coordination", body: "Share dishes, plan menus, and serve together.", onClick: () => pushToast("Meal sign-up sheet opened — add what you'll bring.", "accent") },
    { icon: "Music2", title: "Music & Worship Ideas", body: "Uplift your gathering with songs of Zion.", onClick: () => pushToast("Added a hymn set to your gathering plan.", "accent") },
    { icon: "Share2", title: "Invite & Share", body: "Easy tools to invite friends and neighbors.", onClick: () => pushToast("Invite link copied to your clipboard.", "success") },
  ];

  return (
    <div className="space-y-6">
      {/* ── 3-column band ─────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Column 1 — Upcoming B&B Events */}
        <section>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">Upcoming B&amp;B Events</h2>
              <p className="mt-0.5 text-xs text-muted">Join a local gathering near you.</p>
            </div>
            <button
              onClick={() => pushToast("Showing all B&B events near you.", "accent")}
              className="shrink-0 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-[#1d4ed8] transition-colors hover:bg-surface-2 dark:text-[#7ea4f5]"
            >
              View All Events
            </button>
          </div>

          <ul className="mt-4 space-y-4">
            {bbEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.img} alt="" className="size-14 shrink-0 rounded-lg object-cover" width={56} height={56} />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-sm font-bold leading-snug text-ink">{e.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{e.date}</p>
                  <p className="text-xs text-muted">{e.loc}</p>
                </div>
                <button
                  onClick={() => toggleRsvp(e.id, e.title)}
                  className={cn(
                    "shrink-0 rounded-md px-3.5 py-1.5 text-xs font-semibold text-white transition-all active:scale-95",
                    going.has(e.id) ? "bg-[#1c4b45]" : "bg-[#2f5d3a] hover:brightness-110",
                  )}
                >
                  {going.has(e.id) ? "Going" : "RSVP"}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Column 2 — Gatherings Near You */}
        <section>
          <h2 className="font-serif text-xl font-bold text-ink">B&amp;B Gatherings Near You</h2>
          <p className="mt-0.5 text-xs text-muted">Find, join, and build friendships in your area.</p>

          <div className="relative mt-4">
            <MapPlaceholder pins={mapPins} height={190} variant="streets" onPinClick={(id) => pushToast(`${mapPins.find((p) => p.id === id)?.label ?? "Gathering"} selected on the map.`, "accent")} />
            <button
              onClick={() => pushToast("Located you near Cedar Hills, UT.", "success")}
              className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-ink shadow-md dark:bg-surface"
            >
              <Icon name="Navigation" size={13} /> Use My Location
            </button>
          </div>

          {/* Can't find one near you */}
          <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-white dark:bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bb-spark.jpg"
              alt=""
              className="absolute inset-y-0 right-0 h-full w-[45%] object-cover"
              style={{ maskImage: "linear-gradient(90deg, transparent, black 38%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 38%)" }}
            />
            <div className="relative z-[1] max-w-[62%] p-3.5">
              <p className="font-serif text-sm font-bold text-ink">Can&apos;t find one near you?</p>
              <p className="mt-0.5 text-xs text-muted">Be the spark in your neighborhood.</p>
              <button
                onClick={onHost}
                className="mt-2.5 rounded-md bg-[#b8892b] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
              >
                Sign Up to Host
              </button>
            </div>
          </div>
        </section>

        {/* Column 3 — Host Tools & Resources */}
        <section>
          <h2 className="font-serif text-xl font-bold text-ink">Host Tools &amp; Resources</h2>
          <p className="mt-0.5 text-xs text-muted">Everything you need for a meaningful gathering.</p>

          <ul className="mt-4 space-y-3">
            {hostRows.map((r) => (
              <li key={r.title}>
                <button
                  onClick={r.onClick}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3.5 text-left transition-shadow hover:shadow-md dark:bg-surface"
                >
                  <span className="shrink-0 text-accent-strong dark:text-accent">
                    <Icon name={r.icon} size={26} strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">{r.title}</span>
                    <span className="block text-xs leading-snug text-muted">{r.body}</span>
                  </span>
                  <Icon name="ChevronRight" size={18} className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── Bottom row of 3 cards ─────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card3 photo="/images/bb-what.jpg" title="What is B&B?">
          <p className="text-xs leading-relaxed text-ink-soft">
            Neighborhood B&amp;B stands for Barbecue &amp; Book of Mormon. It&apos;s about coming together
            as neighbors and friends to enjoy good food, meaningful conversation, and the witness of
            Jesus Christ through His Word.
          </p>
          <button
            onClick={() => pushToast("Learn more about hosting a Barbecue & Book of Mormon night.", "accent")}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f5d3a]"
          >
            Learn More About B&amp;B <Icon name="ArrowRight" size={13} />
          </button>
        </Card3>

        <div className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <h3 className="font-serif text-base font-bold text-ink">Conversation Starters</h3>
          <p className="mt-1 text-xs text-muted">Simple prompts to inspire Christ-centered discussions.</p>
          <ul className="mt-3 space-y-2">
            {starters.map((s) => (
              <li key={s} className="flex items-start gap-2 text-xs text-ink-soft">
                <Icon name="CheckCircle2" size={14} className="mt-0.5 shrink-0 text-[#2f5d3a]" />
                {s}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setPromptsOpen(true)}
            className="mt-3 rounded-md bg-[#2f5d3a] px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
          >
            View All Prompts
          </button>
        </div>

        <Card3 photo="/images/bb-story.jpg" title="Share Your Story">
          <p className="text-xs leading-relaxed text-ink-soft">
            How has a B&amp;B gathering blessed you? Share your experience to inspire others.
          </p>
          <button
            onClick={() => setStoryOpen(true)}
            className="mt-3 rounded-md bg-[#b8892b] px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
          >
            Share Your Story
          </button>
        </Card3>
      </div>

      {/* ── B&B Starter Kit strip ─────────────────────── */}
      <div className="grid items-center gap-4 rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface lg:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-5">
          {kit.map((k, i) => (
            <div key={k.title} className={cn("flex items-start gap-2.5 px-3", i > 0 && "sm:border-l sm:border-border")}>
              <span className="mt-0.5 shrink-0 text-accent-strong dark:text-accent">
                <Icon name={k.icon} size={22} strokeWidth={1.6} />
              </span>
              <span>
                <span className="block text-[13px] font-bold leading-snug text-ink">{k.title}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted">{k.body}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-accent-soft/60 p-3.5 text-center">
          <p className="font-serif text-sm font-bold text-ink">B&amp;B Starter Kit</p>
          <p className="mx-auto mt-0.5 max-w-[15rem] text-[11px] leading-snug text-muted">
            Download checklists, invites, meal ideas, and discussion guides.
          </p>
          <button
            onClick={() => pushToast("Starter kit downloading… 📥", "accent")}
            className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#b8892b] px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
          >
            <Icon name="Download" size={13} /> Download Kit
          </button>
        </div>
      </div>

      {/* Share Your Story modal */}
      <Modal
        open={storyOpen}
        onClose={() => setStoryOpen(false)}
        title="Share Your Story"
        description="How has a Barbecue & Book of Mormon gathering blessed you?"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setStoryOpen(false)}>Cancel</Button>
            <Button variant="sage" icon="Send" onClick={() => { setStoryOpen(false); pushToast("Thank you — your story has been shared 🕯️", "success"); }}>
              Share Story
            </Button>
          </>
        }
      >
        <textarea
          rows={5}
          placeholder="Tell us about the neighbors you met, the Spirit you felt, the friendships that grew…"
          aria-label="Your B&B story"
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2"
        />
      </Modal>

      {/* Conversation starters modal */}
      <Modal
        open={promptsOpen}
        onClose={() => setPromptsOpen(false)}
        title="Conversation Starters"
        description="Christ-centered prompts to warm up any table."
        size="md"
      >
        <ul className="space-y-2.5">
          {[
            ...starters,
            "What has the Savior taught you through trials?",
            "How has the Book of Mormon changed your week?",
            "Who is someone you'd love to invite next time?",
            "What blessing are you most grateful for today?",
          ].map((s) => (
            <li key={s} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-sm text-ink">
              <Icon name="MessageCircle" size={16} className="mt-0.5 shrink-0 text-[#2f5d3a]" />
              {s}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

function Card3({ photo, title, children }: { photo: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-[38%] object-cover"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 42%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 42%)" }}
      />
      <div className="relative z-[1] max-w-[66%] p-4">
        <h3 className="font-serif text-base font-bold text-ink">{title}</h3>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}
