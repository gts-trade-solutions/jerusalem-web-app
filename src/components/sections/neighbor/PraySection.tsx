"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

const TONE: Record<string, { bg: string; fg: string }> = {
  blue: { bg: "#dbe8fb", fg: "#2f5aa8" },
  purple: { bg: "#e7ddf5", fg: "#6d4fa8" },
  green: { bg: "#dbecdc", fg: "#3f7a48" },
  orange: { bg: "#fbe4d3", fg: "#c26a34" },
};

const requests = [
  { id: "jm", initials: "JM", tone: "blue", title: "Healing and strength", body: "Please pray for my mother, Joan, who is recovering from surgery.", by: "Jane M.", kind: "Self", date: "Apr 30, 2025", offered: 12, expires: "May 14" },
  { id: "br", initials: "BR", tone: "purple", title: "Wisdom in a decision", body: "Please pray for guidance as I consider a job change.", by: "Brian R.", kind: "Self", date: "Apr 29, 2025", offered: 8, expires: "May 13" },
  { id: "ak", initials: "AK", tone: "green", title: "Peace and comfort", body: "Please pray for our family as we grieve the loss of our father.", by: "Anna K.", kind: "Family", date: "Apr 28, 2025", offered: 24, expires: "May 12" },
  { id: "tl", initials: "TL", tone: "orange", title: "Help with anxiety", body: "Please pray that I can feel God's peace and overcome my anxiety.", by: "Thomas L.", kind: "Self", date: "Apr 27, 2025", offered: 6, expires: "May 11" },
];

export function PraySection() {
  const [tab, setTab] = useState<"requests" | "offered">("requests");
  const [prayed, setPrayed] = useState<Record<string, boolean>>({});
  const totalOffered = 1246 + Object.values(prayed).filter(Boolean).length;

  return (
    <>
      {/* page toolbar */}
      <div className="border-b border-border bg-white dark:bg-bg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/neighbor" className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-accent-strong">
            <Icon name="ChevronLeft" size={20} /> <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="font-serif text-lg font-bold text-ink-900 dark:text-ink sm:text-2xl">Pray for Someone in Need</h1>
          <button onClick={() => alert("Add a prayer request")} className="flex items-center gap-1.5 text-sm font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
            <Icon name="Plus" size={18} className="rounded-full border border-current p-0.5" /> <span className="hidden sm:inline">Add Prayer Request</span>
          </button>
        </div>
      </div>

      {/* hero band */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/pray-hero.png" alt="Lift and receive prayers in faith. — James 5:16" className="block w-full select-none" width={1548} height={262} />
      </section>

      <section className="bg-[#faf7f1] py-8 dark:bg-bg">
        <Container size="wide">
          {/* Request Prayers button */}
          <button onClick={() => alert("Request Prayers")} className="mx-auto flex w-full max-w-2xl items-center justify-center gap-4 rounded-xl bg-ink-900 px-6 py-4 text-white shadow-md transition-all hover:brightness-125">
            <Icon name="HandHeart" size={30} strokeWidth={1.8} />
            <span className="text-left">
              <span className="block font-serif text-xl font-bold">Request Prayers</span>
              <span className="block text-sm text-white/80">For yourself, your family, or a loved one</span>
            </span>
          </button>

          <p className="mx-auto mt-4 flex max-w-2xl items-center gap-2.5 rounded-lg bg-surface-2/60 px-4 py-2.5 text-center text-sm text-ink-soft">
            <Icon name="Info" size={16} className="shrink-0 text-ink-900 dark:text-accent" />
            You may have a maximum of three (3) prayer requests outstanding at any point in time.
          </p>

          {/* tabs */}
          <div className="mt-7 flex items-center justify-between border-b border-border">
            <div className="flex gap-6">
              {([["requests", "Prayer Requests"], ["offered", "My Prayers Offered"]] as const).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition-colors ${tab === id ? "border-[#1d4ed8] text-[#1d4ed8] dark:text-[#7ea4f5]" : "border-transparent text-muted hover:text-ink"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="hidden items-center gap-1.5 text-sm text-muted sm:flex">
              <Icon name="Heart" size={15} className="text-[#1d4ed8] dark:text-[#7ea4f5]" /> Total Prayers Offered <span className="font-bold text-ink-900 dark:text-ink">{totalOffered.toLocaleString()}</span>
            </p>
          </div>

          {/* list */}
          <ul className="mt-4 space-y-3">
            {requests.map((r) => {
              const done = !!prayed[r.id];
              return (
                <li key={r.id} className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface sm:grid-cols-[auto_1fr_auto_auto]">
                  <span className="grid size-12 place-items-center rounded-full font-serif text-sm font-bold" style={{ background: TONE[r.tone].bg, color: TONE[r.tone].fg }}>{r.initials}</span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold text-ink-900 dark:text-ink">{r.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                    <p className="mt-1 text-xs text-faint">Requested by {r.by} &nbsp;•&nbsp; {r.kind} &nbsp;•&nbsp; {r.date}</p>
                  </div>
                  <div className="col-start-2 text-left sm:col-start-3 sm:pr-2 sm:text-right">
                    <p className="text-sm font-bold text-[#1d4ed8] dark:text-[#7ea4f5]">{r.offered + (done ? 1 : 0)} Prayers</p>
                    <p className="text-xs text-muted">offered</p>
                    <p className="mt-1 text-xs text-faint">Expires {r.expires}</p>
                  </div>
                  <button
                    onClick={() => setPrayed((p) => ({ ...p, [r.id]: !p[r.id] }))}
                    className={`col-start-2 mt-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all sm:col-start-4 sm:mt-0 ${done ? "bg-[#2f7d52] text-white" : "bg-ink-900 text-white hover:brightness-125"}`}
                  >
                    <Icon name={done ? "Check" : "Heart"} size={15} /> {done ? "Prayed" : "I've Prayed"}
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
