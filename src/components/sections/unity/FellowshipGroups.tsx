"use client";

import { useMemo, useState } from "react";
import type { Group, GroupKind } from "@/types";
import { groups } from "@/data/groups";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const KIND_META: Record<GroupKind, { label: string; icon: string; tone: "accent" | "sage" | "neutral" }> = {
  fellowship: { label: "Fellowship", icon: "Users", tone: "accent" },
  sisterCircle: { label: "Sisters' Circle", icon: "Users2", tone: "sage" },
  choir: { label: "Choir", icon: "Music", tone: "accent" },
  selfReliance: { label: "Self-Reliance", icon: "Sprout", tone: "sage" },
};

// Seed names for the avatar cluster per group — warm, realistic.
const CLUSTER = ["Eliza Whitmer", "Samuel Okafor", "Ruth Nakamura", "Caleb Anderson", "Mireya Cordova", "Abigail Stott"];

type Filter = "all" | GroupKind;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Groups" },
  { id: "fellowship", label: "Fellowship" },
  { id: "sisterCircle", label: "Sisters' Circles" },
  { id: "choir", label: "Choir" },
  { id: "selfReliance", label: "Self-Reliance" },
];

export function FellowshipGroups() {
  const { pushToast } = useAppData();
  const [filter, setFilter] = useState<Filter>("all");
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [startOpen, setStartOpen] = useState(false);
  const [inviteGroup, setInviteGroup] = useState<Group | null>(null);

  // Start-a-group form
  const [gName, setGName] = useState("");
  const [gKind, setGKind] = useState<GroupKind>("fellowship");
  const [gSchedule, setGSchedule] = useState("");
  const [gDesc, setGDesc] = useState("");

  // Invite form
  const [inviteName, setInviteName] = useState("");

  const list = useMemo(
    () => (filter === "all" ? groups : groups.filter((g) => g.kind === filter)),
    [filter],
  );

  function toggleJoin(g: Group) {
    setJoined((prev) => {
      const next = new Set(prev);
      const has = next.has(g.id);
      if (has) next.delete(g.id);
      else next.add(g.id);
      pushToast(
        has ? `You've left ${g.name}` : `Welcome to ${g.name} — you belong here 🤝`,
        has ? "default" : "success",
      );
      return next;
    });
  }

  function submitStart(e: React.FormEvent) {
    e.preventDefault();
    setStartOpen(false);
    pushToast(
      `${gName || "Your fellowship group"} is being gathered — invitations are on their way 🔥`,
      "accent",
    );
    setGName("");
    setGKind("fellowship");
    setGSchedule("");
    setGDesc("");
  }

  function submitInvite(e: React.FormEvent) {
    e.preventDefault();
    const who = inviteName.trim();
    setInviteGroup(null);
    pushToast(
      who
        ? `Invitation sent to ${who} to join ${inviteGroup?.name ?? "the group"} 💌`
        : "Invitation link copied — share it with a friend 💌",
      "success",
    );
    setInviteName("");
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Fellowship Groups"
        title="Find your circle — or gather one of your own"
        intro="Small groups are where Zion actually happens: week after week, name by name. Join one that fits your season, or start a new one and open a chair."
        action={
          <Button variant="accent" size="md" icon="UserPlus" onClick={() => setStartOpen(true)}>
            Start a Fellowship Group
          </Button>
        }
      />

      {/* Kind filter */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter groups by kind">
        {FILTERS.map((f) => {
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={selected}
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-transparent bg-ink text-bg dark:bg-accent dark:text-accent-fg"
                  : "border-border-strong bg-surface text-muted hover:border-accent hover:text-ink",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((g, i) => {
          const meta = KIND_META[g.kind];
          const isJoined = joined.has(g.id);
          const cluster = CLUSTER.slice(0, Math.min(4, Math.max(3, g.memberCount % 4 || 4)));
          const extra = Math.max(0, g.memberCount - cluster.length);
          return (
            <Reveal key={g.id} delay={(i % 2) * 0.06}>
              <Card hover className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-strong dark:text-accent">
                    <Icon name={meta.icon} size={24} />
                  </span>
                  <Badge tone={meta.tone} icon={meta.icon}>
                    {meta.label}
                  </Badge>
                </div>

                <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-ink text-balance">
                  {g.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{g.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-faint">
                  {g.schedule && (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="Clock" size={13} /> {g.schedule}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="Users" size={13} /> {g.memberCount} members
                  </span>
                </div>

                {/* Avatar cluster */}
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex -space-x-2.5">
                    {cluster.map((name) => (
                      <Avatar key={name} name={name} seed={`${g.id}-${name}`} size={30} ring />
                    ))}
                    {extra > 0 && (
                      <span className="grid size-[30px] place-items-center rounded-full bg-surface-3 text-[10px] font-semibold text-ink-soft ring-2 ring-surface">
                        +{extra}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted">
                    {isJoined ? "You + " : ""}
                    {g.memberCount} gathering
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant={isJoined ? "sage" : "accent"}
                    size="sm"
                    icon={isJoined ? "CheckCircle2" : "Plus"}
                    aria-pressed={isJoined}
                    onClick={() => toggleJoin(g)}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button>
                  <Button variant="outline" size="sm" icon="Send" onClick={() => setInviteGroup(g)}>
                    Invite a Friend
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="HandHeart"
                    onClick={() =>
                      pushToast(`Thank you for offering to serve with ${g.name} — a leader will reach out 🙏`, "success")
                    }
                  >
                    Serve Together
                  </Button>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Start a group modal */}
      <Modal
        open={startOpen}
        onClose={() => setStartOpen(false)}
        title="Start a Fellowship Group"
        description="Open a chair for others. Tell us a little, and we'll help you gather."
        size="sm"
      >
        <form onSubmit={submitStart} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Group name</span>
            <input
              value={gName}
              onChange={(e) => setGName(e.target.value)}
              required
              placeholder="e.g. Cedar Hills Come Unto Christ"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Kind of group</span>
            <select
              value={gKind}
              onChange={(e) => setGKind(e.target.value as GroupKind)}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
            >
              <option value="fellowship">Fellowship</option>
              <option value="sisterCircle">Sisters&apos; Circle</option>
              <option value="choir">Choir</option>
              <option value="selfReliance">Self-Reliance</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">When do you meet?</span>
            <input
              value={gSchedule}
              onChange={(e) => setGSchedule(e.target.value)}
              placeholder="e.g. Wednesdays · 7:00 PM"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">A line of welcome (optional)</span>
            <textarea
              value={gDesc}
              onChange={(e) => setGDesc(e.target.value)}
              rows={3}
              placeholder="Who is this circle for, and what makes it home?"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={() => setStartOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" icon="Sunrise">
              Gather My Group
            </Button>
          </div>
        </form>
      </Modal>

      {/* Invite a friend modal */}
      <Modal
        open={!!inviteGroup}
        onClose={() => setInviteGroup(null)}
        title="Invite a Friend"
        description={inviteGroup ? `Bring someone into ${inviteGroup.name}.` : undefined}
        size="sm"
      >
        <form onSubmit={submitInvite} className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/50 p-3">
            <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-strong dark:text-accent">
              <Icon name="Gift" size={20} />
            </span>
            <p className="text-sm leading-relaxed text-muted">
              An invitation opens a door. Send one to a friend, a neighbor, or someone who&apos;s been away too long.
            </p>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-ink">Friend&apos;s name or email</span>
            <input
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="e.g. Hannah, or hannah@email.com"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="ghost" onClick={() => setInviteGroup(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" icon="Send">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
