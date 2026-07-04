"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { useUser } from "@/context/UserContext";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { CreateEventModal } from "./CreateEventModal";

interface MealItem {
  id: string;
  slot: string;
  who: string | null;
}

const INITIAL_MEAL: MealItem[] = [
  { id: "m-ribs", slot: "Main — smoked ribs & burgers", who: "David Kimball" },
  { id: "m-corn", slot: "Grilled sweet corn", who: "Ruth Nakamura" },
  { id: "m-salad", slot: "Garden salad", who: null },
  { id: "m-lemonade", slot: "Lemonade & root beer", who: null },
  { id: "m-dessert", slot: "Dutch-oven cobbler", who: null },
  { id: "m-chairs", slot: "Extra chairs & shade", who: null },
];

const HYMNS = [
  { title: "Come, Come, Ye Saints", ref: "Hymns · 30", note: "A pioneer anthem of endurance — perfect for a fireside close." },
  { title: "I Need Thee Every Hour", ref: "Hymns · 98", note: "Tender and simple; easy for newcomers to join." },
  { title: "Called to Serve", ref: "Hymns · 249", note: "Bright and rousing — great for a park cookout with youth." },
  { title: "Nearer, My God, to Thee", ref: "Hymns · 100", note: "Reverent gathering hymn as the fire dies down." },
  { title: "Because I Have Been Given Much", ref: "Hymns · 219", note: "A grateful heart for the blessing of the table." },
];

export function HostTools() {
  const { pushToast } = useAppData();
  const { user, role } = useUser();
  const isHost = role === "Host" || role === "Leader";

  const [hostOpen, setHostOpen] = useState(false);
  const [mealOpen, setMealOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [meal, setMeal] = useState<MealItem[]>(INITIAL_MEAL);

  const inviteText =
    "You're invited to our Barbecue & Book of Mormon night! 🔥 Ribs on the smoker, lemonade in the shade, " +
    "and an open study of the Book of Mormon. Bring a lawn chair and a friend — all are welcome. RSVP in the New Jerusalem app.";

  function toggleMeal(id: string) {
    setMeal((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const claimed = m.who === user.name;
        return { ...m, who: claimed ? null : m.who ?? user.name };
      }),
    );
    const item = meal.find((m) => m.id === id);
    if (item) {
      pushToast(item.who === user.name ? "Removed from your list" : `You're bringing: ${item.slot}`, "success");
    }
  }

  function copyInvite() {
    try {
      navigator.clipboard?.writeText(inviteText);
    } catch {
      /* clipboard may be unavailable; toast still confirms intent */
    }
    pushToast("Invitation copied — go gather your neighbors ✉️", "success");
  }

  const claimed = meal.filter((m) => m.who).length;

  return (
    <div className="space-y-8">
      {/* Host status banner */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-ink-900 p-6 text-white grain sm:p-8">
          <div className="pointer-events-none absolute inset-0 dawn-wash opacity-40" />
          <div className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <Badge tone="accent" icon={isHost ? "BadgeCheck" : "Sparkles"} className="mb-3 bg-white/10 text-[#e6c67d]">
                {isHost ? "Verified Host" : "Become a Host"}
              </Badge>
              <h2 className="font-serif text-2xl font-semibold leading-tight text-white text-balance">
                {isHost
                  ? "Your table is set. Let's fill it."
                  : "You don't need a calling to open your door"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {isHost
                  ? "Everything you need to plan, coordinate, and invite — all in one place. Post a gathering and the neighborhood will find you."
                  : "Every B&B night began with someone deciding to host. Post your first gathering today — we'll walk you through the rest."}
              </p>
            </div>
            <Button variant="accent" size="lg" icon="Flame" onClick={() => setHostOpen(true)}>
              Sign Up to Host
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Tool cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <Reveal>
          <button onClick={() => setMealOpen(true)} className="block h-full w-full text-left">
            <FeatureCard
              icon="Utensils"
              title="Meal Coordination"
              body={`Sign-up sheet so no one brings three salads. ${claimed} of ${meal.length} dishes claimed so far.`}
              tone="accent"
            />
          </button>
        </Reveal>
        <Reveal delay={0.06}>
          <button onClick={() => setInviteOpen(true)} className="block h-full w-full text-left">
            <FeatureCard
              icon="Share2"
              title="Invite & Share"
              body="Copy a warm, ready-to-send invitation and share it with neighbors, texts, or your ward group."
              tone="sage"
            />
          </button>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="h-full">
            <FeatureCard
              icon="ListMusic"
              title="Music Ideas"
              body="Hymn suggestions to gather hearts as the evening settles. Tap a hymn below to save it to your plan."
              tone="ink"
            />
          </div>
        </Reveal>
      </div>

      {/* Music ideas list */}
      <Reveal>
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="Music2" size={18} className="text-accent" />
            <h3 className="font-serif text-lg font-semibold text-ink">Hymns for the Fire</h3>
          </div>
          <ul className="divide-y divide-border">
            {HYMNS.map((h) => (
              <li key={h.title} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{h.title}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    <span className="text-faint">{h.ref}</span> · {h.note}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Plus"
                  onClick={() => pushToast(`“${h.title}” added to your gathering plan 🎵`, "success")}
                >
                  Add
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>

      {/* Meal coordination modal */}
      <Modal
        open={mealOpen}
        onClose={() => setMealOpen(false)}
        title="Meal Coordination"
        description="Claim a slot so the table comes together. Tap to add or remove yourself."
        size="md"
      >
        <ul className="space-y-2.5">
          {meal.map((m) => {
            const mine = m.who === user.name;
            return (
              <li
                key={m.id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors",
                  m.who ? "border-sage/30 bg-sage-soft/40" : "border-border bg-surface-2/50",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      m.who ? "bg-sage-soft text-sage" : "bg-surface-3 text-faint",
                    )}
                  >
                    <Icon name={m.who ? "CheckCircle2" : "Circle"} size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{m.slot}</p>
                    <p className="text-xs text-muted">{m.who ? `Bringing: ${m.who}` : "Up for grabs"}</p>
                  </div>
                </div>
                <Button
                  variant={mine ? "sage" : m.who ? "ghost" : "outline"}
                  size="sm"
                  onClick={() => toggleMeal(m.id)}
                  disabled={Boolean(m.who) && !mine}
                >
                  {mine ? "You've got it" : m.who ? "Claimed" : "I'll bring this"}
                </Button>
              </li>
            );
          })}
        </ul>
      </Modal>

      {/* Invite & share modal */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite & Share"
        description="A warm invitation, ready to send."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Close
            </Button>
            <Button variant="accent" icon="Send" onClick={copyInvite}>
              Copy invitation
            </Button>
          </>
        }
      >
        <div className="rounded-xl border border-border bg-surface-2/60 p-4">
          <p className="text-sm leading-relaxed text-ink">{inviteText}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Text a neighbor", icon: "MessageCircle" },
            { label: "Share to ward group", icon: "Users" },
            { label: "Email invite", icon: "Mail" },
          ].map((s) => (
            <Button
              key={s.label}
              variant="outline"
              size="sm"
              icon={s.icon}
              onClick={() => pushToast(`${s.label} — invitation ready to share ✉️`)}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </Modal>

      <CreateEventModal open={hostOpen} onClose={() => setHostOpen(false)} />
    </div>
  );
}
