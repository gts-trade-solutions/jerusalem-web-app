"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const pillars = [
  { icon: "Users", title: "Fellowship Gatherings", body: "Share meals, stories, and testimonies" },
  { icon: "Music2", title: "Worship Together", body: "Lift hearts in song, prayer, and praise" },
  { icon: "Users2", title: "Family Activities", body: "Build faith and memories together" },
  { icon: "MessageCircle", title: "Testimony Sharing", body: "Encourage one another with what He has done" },
];

const events = [
  { img: "/images/un-ev1.jpg", mon: "MAY", day: "18", title: "Worship Night", sub: "Community Worship & Testimony", when: "Sun, May 18 · 6:30 PM", loc: "Zion Center Chapel" },
  { img: "/images/un-ev2.jpg", mon: "MAY", day: "24", title: "Temple Day Trip", sub: "Strengthen in the House of the Lord", when: "Sat, May 24 · 9:00 AM", loc: "Zion Temple" },
  { img: "/images/un-ev3.jpg", mon: "JUN", day: "1", title: "Family Fellowship Day", sub: "Food, Fun & Faith for All Ages", when: "Sun, Jun 1 · 1:00 PM", loc: "Riverside Park" },
  { img: "/images/un-ev4.jpg", mon: "JUN", day: "7", title: "Youth Unity Night", sub: "Faith. Friends. Purpose.", when: "Sat, Jun 7 · 7:00 PM", loc: "Zion Youth Center" },
];

const streams = [
  { icon: "Radio", title: "Sunday Worship Service", when: "10:00 AM · Every Sunday" },
  { icon: "BookOpen", title: "Midweek Devotional", when: "Wed, 7:00 PM" },
  { icon: "Users", title: "Youth & Young Adult", when: "Fri, 7:30 PM" },
  { icon: "Users2", title: "Testimony & Teaching", when: "Sat, 5:00 PM" },
];

const bottomCards = [
  { icon: "Users", tint: "text-accent-strong dark:text-accent", img: "/images/un-start.jpg", title: "Start or Join a Fellowship Group", body: "Small groups make a big impact. Find your people and grow together in faith and service.", cta: "Find a Group" },
  { icon: "Heart", tint: "text-ink", img: "/images/un-invite.jpg", title: "Invite a Friend", body: "A simple invitation can change a life. Share the light of Christ and invite others to belong.", cta: "Invite a Friend" },
  { icon: "Sprout", tint: "text-[#6d5bab]", img: "/images/un-serve.jpg", title: "Serve Together", body: "Unity is built through action. Find service opportunities and bless others together.", cta: "Find Opportunities" },
];

export function UnityDashboard() {
  const { pushToast } = useAppData();
  const [going, setGoing] = useState<Set<string>>(new Set());
  const [watch, setWatch] = useState<string | null>(null);

  const rsvp = (id: string) => {
    setGoing((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else { n.add(id); }
      return n;
    });
    pushToast(going.has(id) ? "RSVP removed" : "You're going! 🎉", going.has(id) ? "default" : "success");
  };

  return (
    <div className="space-y-6">
      {/* Of One Mind + You're Invited */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
          <h2 className="font-serif text-xl font-bold text-ink">Of One Mind and One Heart</h2>
          <p className="mt-1 max-w-md text-xs text-muted">We are stronger together. Join in fellowship, worship, service, and unity across the Restoration.</p>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3 className="mt-3 font-serif text-sm font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1 text-[11px] leading-snug text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-serif text-sm italic leading-snug text-muted">
            &ldquo;And they continued steadfastly in the apostles&apos; doctrine and fellowship, and in breaking of bread, and in prayers.&rdquo; Acts 2:42
          </p>
        </section>

        <section className="overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/un-invited.jpg" alt="" className="h-40 w-full object-cover" width={430} height={114} />
          <div className="p-5 text-center">
            <h3 className="font-serif text-lg font-bold text-ink">You&apos;re Invited!</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">Everyone is welcome to come, connect, and belong. There&apos;s a place for you here.</p>
            <button onClick={() => pushToast("Let's find your group.", "accent")} className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#b8892b] px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110">
              Find a Group <Icon name="ArrowRight" size={13} />
            </button>
          </div>
        </section>
      </div>

      {/* Upcoming Events + Livestream */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-ink">Upcoming Events &amp; Gatherings</h2>
            <button onClick={() => pushToast("Loading all events…", "accent")} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
              View All Events <Icon name="ArrowRight" size={12} />
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {events.map((e) => (
              <article key={e.title} className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.img} alt="" className="h-24 w-full object-cover" width={122} height={66} />
                  <span className="absolute left-2 top-2 flex flex-col items-center rounded-md bg-white px-2 py-0.5 text-center shadow dark:bg-surface">
                    <span className="text-[9px] font-bold uppercase text-accent-strong dark:text-accent">{e.mon}</span>
                    <span className="font-serif text-sm font-bold leading-none text-ink">{e.day}</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="font-serif text-sm font-bold leading-snug text-ink">{e.title}</h3>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted">{e.sub}</p>
                  <p className="mt-1.5 text-[10px] text-faint">{e.when}</p>
                  <p className="text-[10px] text-faint">{e.loc}</p>
                  <button
                    onClick={() => rsvp(e.title)}
                    className={cn("mt-2.5 rounded-md border px-3 py-1.5 text-[11px] font-semibold transition-colors", going.has(e.title) ? "border-sage bg-sage text-white" : "border-border text-ink hover:bg-surface-2")}
                  >
                    {going.has(e.title) ? "Going ✓" : "RSVP"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-ink">Livestream Schedule</h2>
            <button onClick={() => pushToast("Full broadcast schedule opened.", "accent")} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
              View Full Schedule <Icon name="ArrowRight" size={12} />
            </button>
          </div>
          <ul className="mt-4 space-y-2.5">
            {streams.map((s) => (
              <li key={s.title} className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-sm dark:bg-surface">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                  <Icon name={s.icon} size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{s.title}</p>
                  <p className="text-xs text-muted">{s.when}</p>
                </div>
                <button onClick={() => setWatch(s.title)} className="shrink-0 rounded-md bg-ink-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-125">
                  Watch
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Bottom 3 cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {bottomCards.map((c) => (
          <article key={c.title} className="relative overflow-hidden rounded-xl border border-border bg-bg-tint shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt="" className="absolute inset-y-0 right-0 h-full w-[36%] object-cover" style={{ maskImage: "linear-gradient(90deg, transparent, black 40%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 40%)" }} />
            <div className="relative z-[1] max-w-[66%] p-4">
              <div className="flex items-center gap-2">
                <span className={c.tint}><Icon name={c.icon} size={22} /></span>
                <h3 className="font-serif text-sm font-bold leading-snug text-ink">{c.title}</h3>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">{c.body}</p>
              <button onClick={() => pushToast(`${c.cta} — opening…`, "accent")} className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#b8892b] px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:brightness-110">
                {c.cta} <Icon name="ArrowRight" size={12} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Watch modal */}
      <Modal open={watch !== null} onClose={() => setWatch(null)} title={watch ?? ""} description="Live broadcast" size="lg">
        <div className="-mx-6 -mt-5">
          <PhotoBlock seed="worship-night-warm" w={900} h={400} icon="MonitorPlay" overlay="ink" rounded="rounded-none" className="h-56">
            <div className="grid h-full place-items-center">
              <button onClick={() => { setWatch(null); pushToast("Joining livestream…", "success"); }} className="grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition-transform hover:scale-105">
                <Icon name="Play" size={26} strokeWidth={2.4} />
              </button>
            </div>
          </PhotoBlock>
        </div>
        <p className="pt-4 text-center text-sm text-muted">Gather your fellowship group and worship together — press play to join the broadcast.</p>
      </Modal>
    </div>
  );
}
