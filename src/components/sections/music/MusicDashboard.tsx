"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { usePlayer } from "@/context/PlayerContext";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

const albums = [
  { id: "al1", img: "/images/mu-al1.jpg", title: "Sing Praises", songs: 26 },
  { id: "al2", img: "/images/mu-al2.jpg", title: "Come Unto Christ", songs: 18 },
  { id: "al3", img: "/images/mu-al3.jpg", title: "Hope of Zion", songs: 20 },
  { id: "al4", img: "/images/mu-al4.jpg", title: "Restoration Hymns", songs: 22 },
];

const resources = [
  { icon: "FileText", label: "Sheet Music Library" },
  { icon: "Music2", label: "Instrumental Tracks" },
  { icon: "Mic2", label: "Singing Lessons" },
  { icon: "Baby", label: "Music for Children" },
  { icon: "BookOpen", label: "Hymns & History" },
  { icon: "CalendarDays", label: "Monthly Music" },
];

const invites = [
  { icon: "Music2", title: "Sing with Joy", body: "Make a joyful noise unto the Lord." },
  { icon: "Mic2", title: "Lift Others Through Song", body: "Encourage and edify one another." },
  { icon: "HandHeart", title: "Serve in Harmony", body: "Use your talents to bless the Church." },
  { icon: "Sun", title: "Invite Others to Worship", body: "Share music that invites the Spirit." },
];

const choirs = [
  { img: "/images/mu-ch1.jpg", title: "Temple Choir", body: "Prepare music for temple worship and special services.", when: "Tuesdays at 7:00 PM", loc: "Stake Center Chapel" },
  { img: "/images/mu-ch2.jpg", title: "Youth Choir", body: "Inspiring youth to sing praises unto the Lord.", when: "Wednesdays at 6:30 PM", loc: "Cultural Hall" },
  { img: "/images/mu-ch3.jpg", title: "Sisters Choir", body: "Because of His love we can sing with joy and gratitude.", when: "Thursdays at 7:00 PM", loc: "Relief Society Room" },
];

const videos = [
  { img: "/images/mu-yt1.jpg", title: "Build Up Zion", sub: "Youth Music Video" },
  { img: "/images/mu-yt2.jpg", title: "Light the World", sub: "Original Restoration Song" },
  { img: "/images/mu-yt3.jpg", title: "I Will Follow Thee", sub: "Acoustic Performance" },
];

const worshipNights = [
  { img: "/images/mu-vc1.jpg", mon: "MAY", day: "24", title: "Worship Night", sub: "An evening of praise, scripture, and unity in Christ.", when: "7:00 PM · Stake Center Chapel" },
  { img: "/images/mu-vc2.jpg", mon: "MAY", day: "31", title: "Temple Music Night", sub: "Music that invites the Spirit.", when: "6:00 PM · Jordan River Temple" },
  { img: "/images/mu-vc3.jpg", mon: "JUN", day: "07", title: "Virtual Choir Night", sub: "One voice. One heart. One Zion.", when: "7:30 PM · Online Event" },
];

export function MusicDashboard() {
  const { pushToast } = useAppData();
  const { current, isPlaying, progress, play, toggle } = usePlayer();
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [going, setGoing] = useState<Set<string>>(new Set());
  const [video, setVideo] = useState<(typeof videos)[number] | null>(null);

  const nowTitle = current?.title ?? "How Great Thou Art";
  const nowSub = current?.subtitle ?? "New Jerusalem Choir";
  const dur = current?.durationSec ?? 272;
  const elapsed = current ? Math.round(progress * dur) : 105;
  const pct = current ? progress * 100 : 38;

  const playAlbum = (a: (typeof albums)[number]) =>
    play({ id: a.id, kind: "album", title: a.title, subtitle: "New Jerusalem Choir", cover: a.img.replace("/images/", "").replace(".jpg", ""), durationSec: 272 });

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* ── Column 1 — Sacred Worship Music ─────────────── */}
      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Sacred Worship Music</h2>
              <p className="mt-0.5 text-xs text-muted">Uplifting songs and devotionals to draw closer to Christ.</p>
            </div>
            <button onClick={() => pushToast("Browsing all sacred music…", "accent")} className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-surface-2">View All Music</button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {albums.map((a) => (
              <button key={a.id} onClick={() => playAlbum(a)} className="group text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt="" className="aspect-square w-full rounded-md object-cover transition-transform group-hover:scale-[1.03]" width={108} height={70} />
                <p className="mt-1.5 text-[11px] font-bold leading-tight text-ink">{a.title}</p>
                <p className="text-[10px] text-muted">{a.songs} Songs</p>
              </button>
            ))}
          </div>

          {/* now playing */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface-2/50 p-2.5">
            <PhotoBlock seed="cathedral-arches" w={80} h={80} icon="Music" overlay="sage" rounded="rounded-md" className="size-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink">{nowTitle}</p>
              <p className="truncate text-[11px] text-muted">{nowSub}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9px] tabular-nums text-faint">{formatDuration(elapsed)}</span>
                <span className="relative h-1 flex-1 rounded-full bg-border"><span className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${pct}%` }} /></span>
                <span className="text-[9px] tabular-nums text-faint">{formatDuration(dur)}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button aria-label="Previous" className="grid size-7 place-items-center text-muted hover:text-ink"><Icon name="SkipBack" size={15} /></button>
              <button onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"} className="grid size-8 place-items-center rounded-full bg-ink-900 text-white"><Icon name={isPlaying ? "Pause" : "Play"} size={15} strokeWidth={2.4} /></button>
              <button aria-label="Next" className="grid size-7 place-items-center text-muted hover:text-ink"><Icon name="SkipForward" size={15} /></button>
              <button aria-label="Volume" className="grid size-7 place-items-center text-muted hover:text-ink"><Icon name="Volume2" size={15} /></button>
            </div>
          </div>
        </section>

        {/* Worship Resources */}
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <div className="flex items-center gap-2.5">
            <span className="text-accent-strong dark:text-accent"><Icon name="Music" size={22} /></span>
            <div>
              <h3 className="font-serif text-base font-bold text-ink">Worship Resources</h3>
              <p className="text-[11px] text-muted">Tools to help you worship and serve.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-y-4 sm:grid-cols-6">
            {resources.map((r) => (
              <button key={r.label} onClick={() => pushToast(`${r.label} opened.`, "accent")} className="flex flex-col items-center gap-1.5 text-center">
                <Icon name={r.icon} size={22} className="text-ink" />
                <span className="text-[10px] font-medium leading-tight text-ink-soft">{r.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* invite row */}
        <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-surface">
          <div className="grid gap-4 sm:grid-cols-2">
            {invites.map((iv) => (
              <div key={iv.title} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent-strong dark:text-accent"><Icon name={iv.icon} size={20} /></span>
                <div>
                  <p className="text-xs font-bold text-ink">{iv.title}</p>
                  <p className="text-[11px] leading-snug text-muted">{iv.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
            <div className="flex items-center gap-2.5">
              <Icon name="Mail" size={20} className="text-accent-strong dark:text-accent" />
              <div>
                <p className="text-xs font-bold text-ink">Invite Others</p>
                <p className="text-[11px] text-muted">Share this music with friends and family.</p>
              </div>
            </div>
            <button onClick={() => pushToast("Invitation sent 💌", "success")} className="shrink-0 rounded-md bg-ink-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:brightness-125">Send an Invitation</button>
          </div>
        </section>
      </div>

      {/* ── Column 2 — Choir Gatherings ─────────────────── */}
      <div>
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Choir Gatherings</h2>
              <p className="mt-0.5 text-xs text-muted">Lift your voice together in harmony.</p>
            </div>
            <button onClick={() => pushToast("Browsing all choirs…", "accent")} className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-surface-2">View All Choirs</button>
          </div>
          <ul className="mt-4 space-y-4">
            {choirs.map((c) => {
              const on = joined.has(c.title);
              return (
                <li key={c.title} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" width={60} height={52} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-sm font-bold text-ink">{c.title}</h3>
                    <p className="text-[11px] leading-snug text-muted">{c.body}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-faint"><Icon name="Clock" size={11} /> {c.when}</p>
                    <p className="flex items-center gap-1 text-[10px] text-faint"><Icon name="MapPin" size={11} /> {c.loc}</p>
                  </div>
                  <button
                    onClick={() => { setJoined((p) => { const n = new Set(p); if (n.has(c.title)) n.delete(c.title); else n.add(c.title); return n; }); pushToast(on ? "Left the choir" : `Joined the ${c.title}! 🎵`, on ? "default" : "success"); }}
                    className={cn("h-fit shrink-0 self-center rounded-md px-3.5 py-1.5 text-[11px] font-semibold text-white transition-all", on ? "bg-sage" : "bg-ink-900 hover:brightness-125")}
                  >
                    {on ? "Joined" : "Join"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* ── Column 3 — Youth Music + Worship Nights + Share ── */}
      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink">Youth Music &amp; Original Restoration Music</h2>
              <p className="mt-0.5 text-xs text-muted">Discover original songs and performances that testify of Christ and His restored Church.</p>
            </div>
            <button onClick={() => pushToast("Browsing all youth music…", "accent")} className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-surface-2">View All</button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {videos.map((v) => (
              <button key={v.title} onClick={() => setVideo(v)} className="group text-left">
                <span className="relative block overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.img} alt="" className="aspect-video w-full object-cover" width={88} height={58} />
                  <span className="absolute inset-0 grid place-items-center bg-black/20"><span className="grid size-7 place-items-center rounded-full bg-white/90 text-ink"><Icon name="Play" size={13} strokeWidth={2.4} /></span></span>
                </span>
                <p className="mt-1.5 text-[11px] font-bold leading-tight text-ink">{v.title}</p>
                <p className="text-[10px] text-muted">{v.sub}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-base font-bold text-ink">Virtual Choirs &amp; Worship Nights</h3>
              <p className="text-[11px] text-muted">Join live or online worship experiences.</p>
            </div>
            <button onClick={() => pushToast("All worship events…", "accent")} className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-surface-2">View All Events</button>
          </div>
          <ul className="mt-4 space-y-3">
            {worshipNights.map((w) => {
              const on = going.has(w.title);
              return (
                <li key={w.title} className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" width={78} height={48} />
                  <div className="w-9 shrink-0 text-center">
                    <p className="text-[9px] font-bold uppercase text-accent-strong dark:text-accent">{w.mon}</p>
                    <p className="font-serif text-base font-bold leading-none text-ink">{w.day}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-ink">{w.title}</p>
                    <p className="text-[10px] leading-snug text-muted">{w.sub}</p>
                    <p className="text-[10px] text-faint">{w.when}</p>
                  </div>
                  <button
                    onClick={() => { setGoing((p) => { const n = new Set(p); if (n.has(w.title)) n.delete(w.title); else n.add(w.title); return n; }); pushToast(on ? "RSVP removed" : "You're going! 🎉", on ? "default" : "success"); }}
                    className={cn("shrink-0 rounded-md px-3 py-1.5 text-[11px] font-semibold text-white", on ? "bg-sage" : "bg-ink-900 hover:brightness-125")}
                  >
                    {on ? "Going" : "RSVP"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mu-piano.jpg" alt="" className="absolute inset-y-0 right-0 h-full w-[34%] object-cover" style={{ maskImage: "linear-gradient(90deg, transparent, black 40%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 40%)" }} />
          <div className="relative z-[1] max-w-[68%] p-4">
            <div className="flex items-center gap-2">
              <span className="text-accent-strong dark:text-accent"><Icon name="Music2" size={20} /></span>
              <h3 className="font-serif text-sm font-bold text-ink">Share Your Music</h3>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">Share original music that lifts and builds the body of Christ.</p>
            <button onClick={() => pushToast("Upload submitted for review 🎵", "success")} className="mt-3 rounded-md bg-ink-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:brightness-125">Upload Your Music</button>
          </div>
        </section>
      </div>

      {/* video modal */}
      <Modal open={video !== null} onClose={() => setVideo(null)} title={video?.title ?? ""} description={video?.sub} size="lg">
        <div className="-mx-6 -mt-5">
          <PhotoBlock seed="youth-guitarist" w={900} h={420} icon="MonitorPlay" overlay="ink" rounded="rounded-none" className="h-56">
            <div className="grid h-full place-items-center">
              <button onClick={() => { setVideo(null); pushToast("Now playing 🎬", "success"); }} className="grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition-transform hover:scale-105">
                <Icon name="Play" size={26} strokeWidth={2.4} />
              </button>
            </div>
          </PhotoBlock>
        </div>
      </Modal>
    </div>
  );
}
