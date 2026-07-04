"use client";

import { useState } from "react";
import { temples } from "@/data/temples";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPlaceholder, type MapPin } from "@/components/MapPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Temple } from "@/types";

const statusMeta: Record<Temple["status"], { label: string; tone: "sage" | "accent" | "neutral" }> = {
  operating: { label: "Operating", tone: "sage" },
  construction: { label: "Under Construction", tone: "accent" },
  announced: { label: "Announced", tone: "neutral" },
};

export function TempleHeritagePanel() {
  const { pushToast } = useAppData();
  const [selectedId, setSelectedId] = useState<string>(temples[0].id);
  const selected = temples.find((t) => t.id === selectedId) ?? temples[0];

  const pins: MapPin[] = temples.map((t) => ({
    id: t.id,
    x: t.pin.x,
    y: t.pin.y,
    label: t.name,
    tone: t.status === "construction" ? "accent" : "sage",
    active: t.id === selectedId,
  }));

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Temple Heritage"
        title="A covenant house in every land"
        intro="From Salt Lake to Accra to Manila, the House of the Lord rises across the earth as the gathering hastens. Tap a temple to learn its story."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <MapPlaceholder
            variant="world"
            height={380}
            pins={pins}
            onPinClick={(id) => {
              setSelectedId(id);
              const t = temples.find((x) => x.id === id);
              if (t) pushToast(`Selected ${t.name}`, "default");
            }}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
                <Icon name="Church" size={26} />
              </span>
              <Badge tone={statusMeta[selected.status].tone}>{statusMeta[selected.status].label}</Badge>
            </div>
            <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-ink text-balance">
              {selected.name}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <Icon name="MapPin" size={15} className="text-accent" />
              {selected.city}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-faint">Dedicated</p>
                <p className="mt-0.5 font-serif text-lg font-semibold text-ink">{selected.dedicated}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-faint">Coordinates</p>
                <p className="mt-0.5 text-sm text-ink-soft tabular-nums">
                  {selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
              The temple is the house of the Lord — a place of covenant, ordinance, and eternal
              family. Every spire points souls toward Jesus Christ and the promise of forever.
            </p>
            <Button
              variant="accent"
              icon="Navigation"
              className="mt-5"
              onClick={() => pushToast(`Plan a visit to the ${selected.name}`, "accent")}
            >
              Plan a Visit
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Full list */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="border-b border-border px-5 py-3.5">
          <h4 className="font-serif text-base font-semibold text-ink">All temples ({temples.length})</h4>
        </div>
        <ul>
          {temples.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={cn(
                  "flex w-full items-center gap-4 border-b border-border px-5 py-4 text-left transition-colors last:border-0 hover:bg-surface-2/60",
                  t.id === selectedId && "bg-accent-soft/40",
                )}
                aria-current={t.id === selectedId}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg",
                    t.status === "construction"
                      ? "bg-accent-soft text-accent-strong dark:text-accent"
                      : "bg-sage-soft text-sage",
                  )}
                >
                  <Icon name="Church" size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                  <p className="truncate text-xs text-faint">{t.city} · Dedicated {t.dedicated}</p>
                </div>
                <Badge tone={statusMeta[t.status].tone}>{statusMeta[t.status].label}</Badge>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
