"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";
import { Container } from "@/components/ui/Container";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";

const about = [
  { icon: "Users2", title: "The Largest Women's Organization on Earth", body: "A worldwide sisterhood of faith, service, and covenant." },
  { icon: "Heart", title: "“Charity Never Faileth”", body: "Our motto and our way — the pure love of Christ toward all." },
  { icon: "HandHeart", title: "Support in Godly Values", body: "Emotional support for each other in an arena of Godly values." },
  { icon: "Sparkles", title: "Encouragement for Wives & Mothers", body: "Strength, counsel, and friendship for women in every season." },
  { icon: "LifeBuoy", title: "An Emotional Support System", body: "No sister walks alone — we bear one another's burdens." },
  { icon: "ScrollText", title: "The Oldest Women's Organization on Earth", body: "Founded in 1842 and still gathering the daughters of God." },
  { icon: "Globe2", title: "Active Worldwide", body: "Locations in almost every country across the earth." },
  { icon: "Lock", title: "Meetings at Secure Locations", body: "Confidential, safe places to gather, learn, and belong." },
];

export function ReliefSection() {
  const { pushToast } = useAppData();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border text-white">
        <div className="absolute inset-0 dawn-wash" />
        <Container className="relative z-[1] py-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ab54]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
            <Icon name="Heart" size={13} /> Charity Never Faileth
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Join Emma&apos;s Relief Society</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            A worldwide sisterhood of faith and charity — providing encouragement, emotional support, and belonging for women in an arena of Godly values.
          </p>
        </Container>
      </section>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          {/* Emma & Joseph + intro */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <figure className="relative overflow-hidden rounded-2xl border border-border shadow-sm">
              <PhotoBlock seed="heritage-letters" w={640} h={520} overlay="dawn" icon="Users2" rounded="rounded-none" className="h-72">
                <div className="flex h-full items-end p-5">
                  <figcaption className="text-white">
                    <p className="font-serif text-lg font-bold">Emma &amp; Joseph Smith</p>
                    <p className="text-xs text-white/80">Founders of the Relief Society, Nauvoo, 1842</p>
                  </figcaption>
                </div>
              </PhotoBlock>
            </figure>
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">What is the Relief Society?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The Relief Society is the oldest and largest women&apos;s organization on the earth — a covenant sisterhood
                organized under the direction of the Prophet Joseph Smith and led by Emma Smith. Wherever the Saints gather,
                sisters lift one another with charity, counsel, and quiet strength.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {about.map((a) => (
                  <div key={a.title} className="flex items-start gap-3 rounded-xl border border-border bg-white p-3 dark:bg-surface">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                      <Icon name={a.icon} size={16} />
                    </span>
                    <span>
                      <span className="block text-xs font-bold leading-snug text-ink">{a.title}</span>
                      <span className="block text-[11px] leading-snug text-muted">{a.body}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Find a location / request form */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
              <h2 className="font-serif text-xl font-bold text-ink">Find a Confidential Location Near You</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                To find the nearest confidential location, text your request to meet or join with your name, phone number, and address.
                Responses are given worldwide.
              </p>
              <div className="mt-4 space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" aria-label="Phone number" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" aria-label="Address" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2" />
              </div>
              <button
                onClick={() => pushToast("Request sent to Relief Society Request — a sister will reply soon 💜", "success")}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#b8892b] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                <Icon name="Send" size={14} /> Text My Request to Meet or Join
              </button>
              <p className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-surface-2/50 px-3 py-2.5 text-xs text-muted">
                <Icon name="Smartphone" size={13} /> Relief Society Request · <span className="font-semibold text-ink">(+01) 248-445-2179</span>
              </p>
            </section>

            {/* Two options */}
            <section className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
              <button
                onClick={() => pushToast("Welcome, sister — we'll help you join Emma's Relief Society 💜", "success")}
                className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent-soft/50 p-4 text-left transition-all hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-[#b8892b] text-white"><Icon name="Heart" size={20} /></span>
                  <span className="font-serif text-base font-bold text-ink">I want to join Emma&apos;s Relief Society</span>
                </span>
                <Icon name="ArrowRight" size={18} className="text-accent-strong dark:text-accent" />
              </button>
              <Link
                href="/faith"
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/40 p-4 transition-all hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-ink-900 text-white"><Icon name="BookOpen" size={20} /></span>
                  <span className="font-serif text-base font-bold text-ink">I want to read Joseph&apos;s Book of Mormon</span>
                </span>
                <Icon name="ArrowRight" size={18} className="text-ink-soft" />
              </Link>
            </section>
          </div>
        </Container>
      </section>

      {/* Ribbon */}
      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-7 text-center">
          <p className="font-serif text-xl italic text-[#f3e9cf] sm:text-2xl">
            &ldquo;Charity never faileth.&rdquo;
            <span className="not-italic font-semibold text-white"> — 1 Corinthians 13:8</span>
          </p>
        </Container>
      </section>
    </>
  );
}
