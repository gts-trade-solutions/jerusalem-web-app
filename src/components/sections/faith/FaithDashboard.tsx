"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/Icon";

const disciples = [
  { name: "Emily R.", title: "Finding Peace Through Faith", body: "How the gospel brought peace during life's hardest season.", time: "2h ago" },
  { name: "Michael T.", title: "A Changed Heart", body: "The power of forgiveness and the Atonement in my life.", time: "1d ago" },
  { name: "Sofia L.", title: "Hope in Christ", body: "Testimony of His love, grace, and constant guidance.", time: "2d ago" },
];

const readingPlan = [
  { icon: "BookOpen", label: "Old Testament", ref: "Psalm 23-25", pct: 60 },
  { icon: "BookOpen", label: "New Testament", ref: "John 13-15", pct: 40 },
  { icon: "BookOpen", label: "Book of Mormon", ref: "Mosiah 2-4", pct: 20 },
];

const strongerActions = [
  { icon: "UserPlus", label: "Invite Someone to Learn" },
  { icon: "BookOpen", label: "Share a Scripture" },
  { icon: "Mail", label: "Send an Invitation" },
  { icon: "Users2", label: "Join a Study Group" },
];

const templePins: MapPin[] = [
  { id: "t1", x: 22, y: 40, tone: "accent", label: "Salt Lake Temple" },
  { id: "t2", x: 48, y: 34, tone: "accent", label: "London Temple" },
  { id: "t3", x: 70, y: 46, tone: "accent", label: "Manila Temple" },
  { id: "t4", x: 40, y: 60, tone: "accent", label: "Accra Temple" },
];

function Heading({ letter, title, action }: { letter: string; title: string; action: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 font-serif text-base font-bold text-ink">
        <span className="grid size-6 place-items-center rounded-full border border-accent/50 text-[11px] font-bold text-accent-strong dark:text-accent">{letter}</span>
        {title}
      </h3>
      <button onClick={action} className="text-[11px] font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">View All</button>
    </div>
  );
}

export function FaithDashboard() {
  const { pushToast } = useAppData();
  const [player, setPlayer] = useState<{ title: string; seed: string } | null>(null);
  const [testimonyOpen, setTestimonyOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Hero band */}
      <div className="overflow-hidden rounded-xl border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/fa-hero.jpg" alt="Sharing Our Faith in Christ" className="w-full select-none" width={828} height={172} />
      </div>

      {/* A + B */}
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <Heading letter="A" title="Messages from Church Leaders" action={() => pushToast("All leader messages…", "accent")} />
          <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr]">
            <button onClick={() => setPlayer({ title: "The Joy of Sharing the Gospel", seed: "ward-meeting" })} className="group relative block overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/fa-leader.jpg" alt="" className="h-28 w-full object-cover sm:w-44" width={206} height={150} />
              <span className="absolute inset-0 grid place-items-center bg-black/15"><span className="grid size-9 place-items-center rounded-full bg-white/90 text-ink"><Icon name="Play" size={16} strokeWidth={2.4} /></span></span>
            </button>
            <div>
              <h4 className="font-serif text-base font-bold leading-snug text-ink">The Joy of Sharing the Gospel</h4>
              <p className="mt-0.5 text-xs font-semibold text-muted">Elder Robert Whitmer</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">A message of hope and encouragement to share the light of Christ with gentleness and love.</p>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={i === 0 ? "size-1.5 rounded-full bg-accent" : "size-1.5 rounded-full bg-border-strong"} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <Heading letter="B" title="Messages from Disciples" action={() => pushToast("All testimonies…", "accent")} />
          <ul className="mt-3 divide-y divide-border">
            {disciples.map((d) => (
              <li key={d.name} className="flex items-start gap-3 py-2.5">
                <Avatar name={d.name} seed={d.name} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{d.title}</p>
                  <p className="text-[11px] font-semibold text-muted">{d.name}</p>
                  <p className="text-[11px] leading-snug text-muted">{d.body}</p>
                </div>
                <span className="shrink-0 text-[10px] text-faint">{d.time}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setTestimonyOpen(true)} className="mt-2 w-full rounded-md bg-ink-900 py-2 text-xs font-semibold text-white transition-all hover:brightness-125">
            <Icon name="FileText" size={13} className="mr-1 inline" /> Share Your Testimony
          </button>
        </section>
      </div>

      {/* C + D + E */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* C */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <h3 className="flex items-center gap-2 font-serif text-base font-bold text-ink">
            <Icon name="BookOpen" size={18} className="text-accent-strong dark:text-accent" /> C. Scriptures &amp; Book of Mormon
          </h3>
          <blockquote className="mt-3 rounded-lg bg-ink-900 p-2.5 text-xs italic leading-relaxed text-white/90">
            &ldquo;Behold, I say unto you, that ye must study it out in your mind; then ye must ask me if it be right, and if it be right I will cause that your bosom shall burn within you; therefore, ye shall feel that it is right.&rdquo;
            <span className="mt-1 block not-italic font-semibold text-[#e6c164]">— D&amp;C 9:8</span>
          </blockquote>
          <p className="mt-3 text-xs font-bold text-ink">Today&apos;s Reading Plan</p>
          <ul className="mt-2 space-y-2">
            {readingPlan.map((r) => (
              <li key={r.label} className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
                <Icon name={r.icon} size={14} className="shrink-0 text-accent-strong dark:text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold text-ink">{r.label}</span>
                  <span className="block text-[10px] text-muted">{r.ref}</span>
                </span>
                <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent-strong dark:text-accent">{r.pct}%</span>
              </li>
            ))}
          </ul>
          <button onClick={() => pushToast("Opening Scripture Library…", "accent")} className="mt-3 w-full rounded-md bg-ink-900 py-2 text-xs font-semibold text-white transition-all hover:brightness-125">Open Scripture Library</button>
        </section>

        {/* D */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <h3 className="flex items-center gap-2 font-serif text-base font-bold text-ink">
            <Icon name="Church" size={18} className="text-accent-strong dark:text-accent" /> D. Temple Heritage
          </h3>
          <div className="mt-3">
            <MapPlaceholder pins={templePins} variant="world" height={120} onPinClick={(id) => pushToast(`${templePins.find((p) => p.id === id)?.label}`, "accent")} />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">Explore the blessings of temple covenants and our shared heritage.</p>
          <ul className="mt-2 divide-y divide-border">
            {[["Find Temples Near You", "MapPin"], ["Temple History Timeline", "ScrollText"]].map(([l, ic]) => (
              <li key={l}>
                <button onClick={() => pushToast(`${l}…`, "accent")} className="flex w-full items-center gap-2 py-2 text-left text-xs font-medium text-ink">
                  <Icon name={ic} size={14} className="text-muted" /> <span className="flex-1">{l}</span> <Icon name="ChevronRight" size={14} className="text-faint" />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => pushToast("Exploring temple history…", "accent")} className="mt-2 w-full rounded-md bg-[#b8892b] py-2 text-xs font-semibold text-white transition-all hover:brightness-110">Explore Temple History</button>
        </section>

        {/* E */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <h3 className="flex items-center gap-2 font-serif text-base font-bold text-ink">
            <Icon name="Sun" size={18} className="text-accent-strong dark:text-accent" /> E. Daily Worship &amp; Inspiration
          </h3>
          <button onClick={() => setPlayer({ title: "Daily Worship & Inspiration", seed: "golden-dawn" })} className="group relative mt-3 block w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/fa-worship.jpg" alt="" className="h-24 w-full object-cover" width={252} height={120} />
            <span className="absolute inset-0 grid place-items-center bg-black/15"><span className="grid size-9 place-items-center rounded-full bg-white/90 text-ink"><Icon name="Play" size={16} strokeWidth={2.4} /></span></span>
          </button>
          <blockquote className="mt-3 text-center font-serif text-sm italic leading-snug text-ink">
            &ldquo;Come unto me, all ye that labor and are heavy laden, and I will give you rest.&rdquo;
            <span className="mt-1 block text-xs not-italic text-muted">— Matthew 11:28</span>
          </blockquote>
          <button onClick={() => pushToast("Starting your day in Christ 🌅", "success")} className="mt-3 w-full rounded-md bg-ink-900 py-2 text-xs font-semibold text-white transition-all hover:brightness-125">Start Your Day in Christ</button>
        </section>
      </div>

      {/* Stronger together */}
      <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h3 className="font-serif text-lg font-bold text-ink">We are stronger together.</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">Invite others to come unto Christ and be built upon the foundation of apostles and prophets.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {strongerActions.map((a) => (
              <button key={a.label} onClick={() => pushToast(`${a.label}…`, "accent")} className="flex flex-col items-center gap-1.5 text-center">
                <Icon name={a.icon} size={22} className="text-accent-strong dark:text-accent" />
                <span className="text-[11px] font-medium leading-tight text-ink-soft">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      <Modal open={player !== null} onClose={() => setPlayer(null)} title={player?.title ?? ""} description="Watch & be uplifted" size="lg">
        <div className="-mx-6 -mt-5">
          <PhotoBlock seed={player?.seed ?? "ward-meeting"} w={900} h={420} icon="MonitorPlay" overlay="ink" rounded="rounded-none" className="h-56">
            <div className="grid h-full place-items-center">
              <button onClick={() => { setPlayer(null); pushToast("Now playing 🎬", "success"); }} className="grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition-transform hover:scale-105">
                <Icon name="Play" size={26} strokeWidth={2.4} />
              </button>
            </div>
          </PhotoBlock>
        </div>
      </Modal>

      {/* Share testimony modal */}
      <Modal
        open={testimonyOpen}
        onClose={() => setTestimonyOpen(false)}
        title="Share Your Testimony"
        description="Bear witness of Christ and strengthen a fellow disciple."
        size="md"
        footer={
          <>
            <button onClick={() => setTestimonyOpen(false)} className="rounded-md px-4 py-2 text-sm font-medium text-muted hover:text-ink">Cancel</button>
            <button onClick={() => { setTestimonyOpen(false); pushToast("Testimony shared 🕯️", "success"); }} className="rounded-md bg-[#b8892b] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Share Testimony</button>
          </>
        }
      >
        <div className="space-y-3">
          <input placeholder="Title (e.g. He Is My Rock)" aria-label="Testimony title" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
          <textarea rows={5} placeholder="Share what the Savior has done for you…" aria-label="Testimony" className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
        </div>
      </Modal>
    </div>
  );
}
