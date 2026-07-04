"use client";

import { useState } from "react";
import { groups } from "@/data/groups";
import type { Group } from "@/types";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

/** Real choir groups from fixtures + a few invented ensembles for a fuller board. */
const invented: Group[] = [
  {
    id: "ch-temple",
    kind: "choir",
    name: "Temple Choir",
    description:
      "The dedicated ensemble for temple broadcasts and dedication services — hymns rehearsed in reverence for the House of the Lord.",
    schedule: "Saturdays · 9:00 AM",
    memberCount: 68,
  },
  {
    id: "ch-youth",
    kind: "choir",
    name: "Youth Choir",
    description:
      "Teens and young single adults singing modern worship and Restoration anthems for firesides and youth conferences.",
    schedule: "Wednesdays · 7:30 PM",
    memberCount: 44,
  },
  {
    id: "ch-sisters",
    kind: "choir",
    name: "Sisters' Choir",
    description:
      "'As Sisters in Zion' — a women's ensemble lifting one another through sacred song at Relief Society and worship nights.",
    schedule: "1st & 3rd Thursdays · 7:00 PM",
    memberCount: 39,
  },
];

const seedForChoir = (g: Group) => `choir-${g.id}`;

function ChoirCard({ group, index }: { group: Group; index: number }) {
  const { pushToast } = useAppData();
  const [joined, setJoined] = useState(false);

  function toggleJoin() {
    setJoined((v) => {
      const next = !v;
      pushToast(
        next
          ? `You joined ${group.name} 🎶`
          : `You left ${group.name}`,
        next ? "success" : "default",
      );
      return next;
    });
  }

  const members = group.memberCount + (joined ? 1 : 0);

  return (
    <Reveal delay={index * 0.06}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm card-hover">
        <PhotoBlock
          seed={seedForChoir(group)}
          w={640}
          h={360}
          icon="Users2"
          overlay="dawn"
          rounded="rounded-none"
          className="h-40 w-full"
        >
          <div className="flex h-full flex-col justify-between p-4">
            <Badge tone="accent" icon="Mic2" className="w-fit bg-surface/90 backdrop-blur">
              Choir
            </Badge>
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((n) => (
                <Avatar
                  key={n}
                  name={`${group.name} ${n}`}
                  seed={`${group.id}-m${n}`}
                  size={30}
                  ring
                />
              ))}
              <span className="grid size-[30px] place-items-center rounded-full border border-white/40 bg-black/40 text-[10px] font-semibold text-white backdrop-blur">
                +{Math.max(0, members - 4)}
              </span>
            </div>
          </div>
        </PhotoBlock>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">
            {group.name}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
            {group.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Clock" size={13} /> {group.schedule}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="Users" size={13} /> {members} members
            </span>
          </div>
          <Button
            variant={joined ? "sage" : "accent"}
            size="sm"
            block
            icon={joined ? "CheckCircle2" : "UserPlus"}
            onClick={toggleJoin}
            className={cn("mt-5")}
            aria-pressed={joined}
          >
            {joined ? "Joined — See rehearsal" : "Join this choir"}
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export function ChoirsAndEnsembles() {
  const realChoirs = groups.filter((g) => g.kind === "choir");
  // De-dupe by id in case a real choir overlaps an invented one.
  const all = [...invented, ...realChoirs].filter(
    (g, i, arr) => arr.findIndex((x) => x.id === g.id) === i,
  );

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Choir Gatherings"
        title="Lift your voice with the choirs of Zion"
        intro="Every voice matters — no audition required. Choose an ensemble, come to a rehearsal, and add your part to a sound made whole only when we sing together."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((g, i) => (
          <ChoirCard key={g.id} group={g} index={i} />
        ))}
      </div>

      <Reveal>
        <div className="rounded-2xl border border-border bg-surface-2/50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
              <Icon name="Music2" size={22} />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                Want to start a choir?
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Ward choirs, family ensembles, and virtual choirs all begin with one willing
                conductor. We&apos;ll help you gather singers and sheet music.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
