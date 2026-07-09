"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const PURPLE = "#6d5bab";

const seedPrayers = [
  { id: "p1", name: "Mary J.", time: "2 min ago", title: "Pray for my father's health", body: "He has been diagnosed with a serious illness. Please pray for healing, strength, and peace for our family.", status: "needs", count: 32 },
  { id: "p2", name: "David R.", time: "15 min ago", title: "Wisdom for a decision", body: "I'm seeking wisdom and direction in making an important decision about my future. I am unsure.", status: "needs", count: 18 },
  { id: "p3", name: "Sarah K.", time: "1 hr ago", title: "Thankful for answered prayer", body: "Thank you all for your prayers! My surgery went well and I'm on the road to recovery.", status: "answered", count: 45 },
];

const sisterRows = [
  { icon: "UserPlus", title: "Find a Sister Circle", body: "Join a local or interest-based circle" },
  { icon: "Heart", title: "Be a Mentor", body: "Encourage and uplift other women" },
  { icon: "HandHeart", title: "Share a Need", body: "Ask for help or offer support" },
];

const quickActions = [
  { icon: "Hand", label: "Pray for Someone" },
  { icon: "MessageCircle", label: "Encourage a Friend" },
  { icon: "HandHeart", label: "Volunteer Locally" },
  { icon: "Bell", label: "Report a Need" },
];

const stories = [
  { img: "/images/nb-story1.jpg", title: "A Meal and a Miracle", body: "How a simple act of kindness brought hope to a struggling family." },
  { img: "/images/nb-story2.jpg", title: "Helping Hands", body: "Volunteers came together to rebuild after the storm." },
  { img: "/images/nb-story3.jpg", title: "A Sister's Support", body: "How a sister circle lifted me through a difficult season." },
];

const servePins: MapPin[] = [
  { id: "s1", x: 40, y: 34, tone: "accent", label: "Food bank shift" },
  { id: "s2", x: 58, y: 40, tone: "accent", label: "Temple grounds" },
  { id: "s3", x: 48, y: 62, tone: "accent", label: "Widow's yard" },
];

export function NeighborDashboard() {
  const { pushToast } = useAppData();
  const [filter, setFilter] = useState<"all" | "needs" | "answered">("all");
  const [praying, setPraying] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);

  const list = seedPrayers.filter((p) => filter === "all" || p.status === filter);

  const togglePray = (id: string) => {
    setPraying((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <div className="space-y-4">
      {/* ── Prayer Feed + Sisters in Zion ─────────────── */}
      <div className="grid items-start gap-4 lg:grid-cols-[1.75fr_1fr]">
        {/* Prayer Feed */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-accent-strong dark:text-accent">
                <Icon name="Hand" size={30} strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="font-serif text-xl font-bold text-ink">Prayer Feed</h2>
                <p className="mt-0.5 max-w-md text-xs text-muted">
                  Lift and receive prayers in faith. The effectual fervent prayer of a righteous man availeth much.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAddOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-ink-900 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:brightness-125"
            >
              <Icon name="Plus" size={14} /> Add Prayer Request
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {([["all", "All Prayers"], ["needs", "Needs Prayer"], ["answered", "Answered"]] as const).map(([id, lbl]) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    filter === id ? "border-accent bg-accent-soft text-accent-strong dark:text-accent" : "border-border text-muted hover:text-ink",
                  )}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted">
              Sort: Recent <Icon name="ChevronDown" size={13} />
            </span>
          </div>

          <ul className="mt-3 divide-y divide-border">
            {list.map((p) => {
              const on = praying.has(p.id);
              const total = p.count + (on ? 1 : 0);
              const answered = p.status === "answered";
              return (
                <li key={p.id} className="flex flex-wrap items-start gap-3 py-3 sm:flex-nowrap">
                  <Avatar name={p.name} seed={p.id} size={36} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[15px] font-bold text-ink">{p.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.body}</p>
                    <p className="mt-1 text-[11px] text-faint">{p.name} · {p.time}</p>
                  </div>
                  <div className="ml-12 flex w-full shrink-0 items-center justify-between gap-2 sm:ml-0 sm:w-auto sm:flex-col sm:items-end">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      answered ? "bg-sage-soft text-sage" : "bg-[#f7e0e0] text-[#a23b3b]",
                    )}>
                      {answered ? "Answered" : "Needs Prayer"}
                    </span>
                    <button
                      onClick={() => togglePray(p.id)}
                      className={cn("inline-flex items-center gap-1 text-xs font-medium transition-colors", on ? "text-[#c0392b]" : "text-muted hover:text-[#c0392b]")}
                    >
                      <Icon name="Heart" size={14} strokeWidth={on ? 2.4 : 1.8} /> {total} {answered ? "Prayed" : "Praying"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-1 flex justify-center border-t border-border pt-3">
            <button
              onClick={() => pushToast("Showing all prayer requests in your community.", "accent")}
              className="rounded-md border border-border px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              View All Prayer Requests
            </button>
          </div>
        </section>

        {/* Sisters in Zion */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: PURPLE }}>
              <Icon name="Users2" size={18} />
            </span>
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">Sisters in Zion</h2>
              <p className="mt-0.5 text-xs text-muted">Connect with faithful sisters, join circles of upliftment, and grow together.</p>
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-3">
            {["/images/nb-sis1.jpg", "/images/nb-sis2.jpg"].map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="size-20 rounded-full object-cover ring-2 ring-white shadow-sm" width={96} height={96} />
            ))}
          </div>

          <ul className="mt-4 space-y-2.5">
            {sisterRows.map((r) => (
              <li key={r.title}>
                <button
                  onClick={() => pushToast(`${r.title} — opening…`, "accent")}
                  className="group flex w-full items-center gap-3 text-left"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: PURPLE }}>
                    <Icon name={r.icon} size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">{r.title}</span>
                    <span className="block text-xs text-muted">{r.body}</span>
                  </span>
                  <Icon name="ChevronRight" size={16} className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => pushToast("Welcome to Sisters in Zion.", "accent")}
            className="mt-4 w-full rounded-md py-2.5 text-sm font-semibold transition-colors"
            style={{ background: "#ece8f6", color: PURPLE }}
          >
            Go to Sisters in Zion
          </button>
        </section>
      </div>

      {/* ── Just Serve Map · Quick Actions · Verse ────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="flex items-start gap-3">
            <span className="text-[#1d4ed8]"><Icon name="MapPin" size={28} strokeWidth={1.8} /></span>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink">Just Serve Map</h3>
              <p className="mt-0.5 text-xs text-muted">Find local service opportunities and meet real needs in your community.</p>
            </div>
          </div>
          <div className="mt-4">
            <MapPlaceholder pins={servePins} height={120} variant="streets" onPinClick={(id) => pushToast(`${servePins.find((p) => p.id === id)?.label} — view details.`, "accent")} />
          </div>
          <button
            onClick={() => pushToast("Opening the full JustServe map…", "accent")}
            className="mt-4 rounded-md bg-ink-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-125"
          >
            Explore Map
          </button>
        </section>

        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="flex items-center gap-2.5">
            <span className="text-accent-strong dark:text-accent"><Icon name="HandHeart" size={24} /></span>
            <h3 className="font-serif text-lg font-bold text-ink">Quick Actions</h3>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {quickActions.map((a) => (
              <li key={a.label}>
                <button
                  onClick={() => pushToast(`${a.label} — done.`, "success")}
                  className="flex w-full items-center gap-3 py-2.5 text-left text-sm text-ink transition-colors hover:text-accent-strong dark:hover:text-accent"
                >
                  <Icon name={a.icon} size={16} className="text-accent-strong dark:text-accent" /> {a.label}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="flex items-center gap-2.5">
            <span className="text-ink"><Icon name="BookOpen" size={22} /></span>
            <h3 className="font-serif text-lg font-bold text-ink">Verse of Encouragement</h3>
          </div>
          <blockquote className="mt-3 font-serif text-base italic leading-snug text-ink">
            &ldquo;Bear ye one another&apos;s burdens, and so fulfill the law of Christ.&rdquo;
          </blockquote>
          <p className="mt-1 font-serif text-sm text-muted">Galatians 6:2</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nb-book.jpg" alt="" className="mt-4 h-11 w-full rounded-md object-cover opacity-90" width={120} height={44} />
        </section>
      </div>

      {/* ── Stories of Love ──────────────────────────── */}
      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-ink">Stories of Love in Action</h2>
            <p className="mt-0.5 text-xs text-muted">Real stories of compassion and service from our community.</p>
            <button onClick={() => pushToast("Loading all stories of love…", "accent")} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
              View All Stories <Icon name="ArrowRight" size={13} />
            </button>
          </div>
          <div className="flex gap-2">
            <span className="grid size-8 place-items-center rounded-full border border-border text-muted"><Icon name="ChevronLeft" size={16} /></span>
            <span className="grid size-8 place-items-center rounded-full border border-border text-muted"><Icon name="ChevronRight" size={16} /></span>
          </div>
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {stories.map((s) => (
            <article key={s.title} className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-sm dark:bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt="" className="size-16 shrink-0 rounded-lg object-cover" width={64} height={64} />
              <div className="min-w-0">
                <h3 className="font-serif text-sm font-bold leading-snug text-ink">{s.title}</h3>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">{s.body}</p>
                <button onClick={() => pushToast(`Reading "${s.title}"…`, "accent")} className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2f5d3a]">
                  Read Story <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Add Prayer modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Prayer Request"
        description="Share a need and let the community lift you in prayer."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="accent" icon="Send" onClick={() => { setAddOpen(false); pushToast("Prayer request shared 🙏", "success"); }}>
              Share Request
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <input placeholder="Title (e.g. Pray for my family)" aria-label="Prayer title" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
          <textarea rows={4} placeholder="Share what's on your heart…" aria-label="Prayer details" className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
        </div>
      </Modal>
    </div>
  );
}
