"use client";

import { useState } from "react";
import { circles } from "@/data/groups";
import { useAppData } from "@/context/AppDataContext";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";

export function SistersInZion() {
  const { pushToast } = useAppData();
  const [mentorOpen, setMentorOpen] = useState(false);
  const [needOpen, setNeedOpen] = useState(false);
  const [need, setNeed] = useState("");

  function submitNeed() {
    if (need.trim().length < 4) return;
    pushToast("Your need was shared with the sisters 💐", "success");
    setNeed("");
    setNeedOpen(false);
  }

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sage-soft/70 via-surface to-accent-soft/40 p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              <Icon name="Sprout" size={14} /> Sisters in Zion
            </span>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl text-balance">
              Women lifting women, one covenant at a time
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted text-pretty sm:text-base">
              No sister walks alone here. Our circles gather around the newcomer, the weary, the
              grieving, and the rising daughter — bearing meals, mentorship, and honest friendship.
              Find your circle, mentor a sister, or let us carry something for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="sage" icon="Compass" onClick={() => pushToast("We'll match you to a circle near you ✨", "accent")}>
                Find a Circle
              </Button>
              <Button variant="outline" icon="HandHeart" onClick={() => setMentorOpen(true)}>
                Be a Mentor
              </Button>
              <Button variant="ghost" icon="MessageCircle" onClick={() => setNeedOpen(true)}>
                Share a Need
              </Button>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {circles.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm card-hover">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">{c.name}</h3>
                <Badge tone="sage" icon="Sprout">{c.cadence}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A circle for <span className="font-medium text-ink-soft">{c.focus.toLowerCase()}</span> — a
                soft place to belong, be known, and be lifted.
              </p>
              <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-4">
                <Avatar name={c.lead} seed={c.lead} size={34} ring />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">{c.lead}</p>
                  <p className="text-[11px] text-faint">Circle lead</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted">
                  <Icon name="Users" size={13} /> {c.members} sisters
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconRight="ArrowRight"
                className="mt-4 self-start"
                onClick={() => pushToast(`We let ${c.lead.split(" ")[0]} know you'd like to join ${c.name} 💌`, "success")}
              >
                Request to join
              </Button>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <figure className="rounded-3xl border border-border bg-ink-900 px-6 py-10 text-center text-white grain sm:px-12">
          <Icon name="Quote" size={26} className="mx-auto text-[#e6c67d]" />
          <blockquote className="mt-4 font-serif text-xl italic leading-snug text-white/90 sm:text-2xl">
            “Charity never faileth… wherefore, cleave unto charity, which is the greatest of all.”
          </blockquote>
          <figcaption className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#e6c67d]">
            Moroni 7:46
          </figcaption>
        </figure>
      </Reveal>

      {/* Be a Mentor */}
      <Modal
        open={mentorOpen}
        onClose={() => setMentorOpen(false)}
        title="Become a Mentor"
        description="Walk beside a sister who is finding her footing."
        footer={
          <>
            <Button variant="ghost" onClick={() => setMentorOpen(false)}>Not yet</Button>
            <Button
              variant="sage"
              icon="HandHeart"
              onClick={() => {
                pushToast("Thank you for saying yes — a Relief Society lead will reach out 🌿", "success");
                setMentorOpen(false);
              }}
            >
              Yes, I'll mentor
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Mentors give what can't be scheduled: presence. You'll be matched with one sister — a
            newcomer, a young mother, or a daughter finding her way — and simply show up for her.
          </p>
          <ul className="space-y-2">
            {[
              "A monthly check-in over coffee, a walk, or a phone call",
              "A friendly face at church and gatherings",
              "Someone in her corner when the week gets heavy",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Icon name="CheckCircle2" size={16} className="mt-0.5 shrink-0 text-sage" />
                <span className="text-ink-soft">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Share a Need */}
      <Modal
        open={needOpen}
        onClose={() => setNeedOpen(false)}
        title="Share a Need"
        description="Held in confidence by the sisters of your circle."
        footer={
          <>
            <Button variant="ghost" onClick={() => setNeedOpen(false)}>Cancel</Button>
            <Button variant="sage" icon="Send" disabled={need.trim().length < 4} onClick={submitNeed}>
              Share with the sisters
            </Button>
          </>
        }
      >
        <label htmlFor="sz-need" className="mb-1.5 block text-sm font-medium text-ink">
          What's weighing on you?
        </label>
        <textarea
          id="sz-need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          rows={4}
          maxLength={300}
          placeholder="A meal this week, help with the kids, or simply someone to talk to…"
          className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-sage"
        />
        <p className="mt-2 text-xs text-muted">
          Asking for help is a gift you give the sisters — it lets them love you the way Christ asked.
        </p>
      </Modal>
    </div>
  );
}
