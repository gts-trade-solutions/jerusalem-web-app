"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { useUser } from "@/context/UserContext";
import { Reveal } from "@/components/ui/Reveal";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const BADGES = [
  { id: "b1", icon: "HandHeart", label: "First Service", desc: "Logged your first hour", earned: true, tone: "accent" as const },
  { id: "b2", icon: "Utensils", label: "Storehouse Saint", desc: "5 storehouse shifts", earned: true, tone: "sage" as const },
  { id: "b3", icon: "Sprout", label: "Widow's Friend", desc: "Yard care for the aged", earned: true, tone: "accent" as const },
  { id: "b4", icon: "Users", label: "Circle Builder", desc: "Invited 3 friends to serve", earned: false, tone: "sage" as const },
  { id: "b5", icon: "Trophy", label: "40-Hour Heart", desc: "Serve 40 hours this year", earned: false, tone: "accent" as const },
];

export function MyService() {
  const { events, pushToast } = useAppData();
  const { role } = useUser();
  const [detailId, setDetailId] = useState<string | null>(null);

  const commitments = useMemo(
    () => events.filter((e) => e.type === "fellowship").slice(0, 3),
    [events],
  );
  const detailEvent = commitments.find((e) => e.id === detailId) ?? null;

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">My Service</span>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl text-balance">
            Your season of serving, at a glance
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            Small, faithful acts add up. Here's your goal, your upcoming commitments, and the badges
            you've earned along the covenant path.
          </p>
        </div>
      </Reveal>

      {role === "Guest" && (
        <Reveal>
          <EmptyState
            icon="LogIn"
            title="Sign in to track your service"
            body="You're browsing as a guest. Create a free account to log hours, earn badges, and keep your commitments in one place."
            action={
              <Button variant="accent" icon="UserCheck" onClick={() => pushToast("Let's get you set up — welcome to the gathering 🌅", "accent")}>
                Create My Account
              </Button>
            }
          />
        </Reveal>
      )}

      {/* Goal rings */}
      <Reveal>
        <div className="grid gap-5 rounded-3xl border border-border bg-surface-2/40 p-6 sm:grid-cols-3 sm:p-8">
          <div className="flex flex-col items-center justify-center gap-1 sm:col-span-1">
            <ProgressRing value={28} total={40} label="Annual Service Goal" sublabel="28 / 40 hrs" size={140} stroke={11} />
            <p className="mt-1 text-xs text-muted">12 hours to go — you're nearly there.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:col-span-2">
            {[
              { icon: "Clock", value: "28", label: "Hours This Year" },
              { icon: "HandHeart", value: "9", label: "Projects Served" },
              { icon: "Users", value: "3", label: "Friends Invited" },
              { icon: "Flame", value: "6", label: "Week Streak" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-4 py-5 text-center shadow-sm">
                <span className="text-accent"><Icon name={s.icon} size={22} /></span>
                <span className="mt-2 font-serif text-2xl font-semibold text-ink tabular-nums">{s.value}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Commitments */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-ink">Upcoming Commitments</h3>
          <Button variant="ghost" size="sm" icon="Clock" onClick={() => pushToast("2 more service hours logged — bless you 🕯️", "success")}>
            Log Hours
          </Button>
        </div>
        {commitments.length === 0 ? (
          <EmptyState icon="CalendarDays" title="No commitments yet" body="Head to the Just Serve map to sign up for a project near you." />
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {commitments.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06}>
                <EventCard event={e} onDetails={setDetailId} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="space-y-5">
        <h3 className="font-serif text-xl font-semibold text-ink">Badges Earned</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BADGES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.05}>
              <button
                onClick={() =>
                  pushToast(
                    b.earned ? `${b.label} — earned. Well done, good and faithful servant.` : `Keep going: ${b.desc} to earn “${b.label}.”`,
                    b.earned ? "success" : "default",
                  )
                }
                className={cn(
                  "flex h-full w-full flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all card-hover",
                  b.earned ? "border-border bg-surface shadow-sm" : "border-dashed border-border-strong bg-surface/40 opacity-70",
                )}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-full",
                    !b.earned
                      ? "bg-surface-2 text-faint"
                      : b.tone === "sage"
                        ? "bg-sage-soft text-sage"
                        : "bg-accent-soft text-accent-strong dark:text-accent",
                  )}
                >
                  <Icon name={b.earned ? b.icon : "Lock"} size={22} />
                </span>
                <span className="text-sm font-semibold text-ink">{b.label}</span>
                <span className="text-[11px] leading-tight text-faint">{b.desc}</span>
                {b.earned ? (
                  <Badge tone="sage" icon="CheckCircle2" className="mt-0.5">Earned</Badge>
                ) : (
                  <Badge tone="outline" className="mt-0.5">Locked</Badge>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <EventDetailModal event={detailEvent} open={detailId !== null} onClose={() => setDetailId(null)} />
    </div>
  );
}
