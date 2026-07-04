"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const bookmarks = [
  { ref: "2 Nephi 25:26", note: "We talk of Christ, we rejoice in Christ" },
  { ref: "Ether 12:27", note: "My grace is sufficient" },
  { ref: "Alma 32:21", note: "Faith is to hope for things not seen" },
  { ref: "Moroni 10:4", note: "Ask with a sincere heart" },
];

export function QuickActions() {
  const { pushToast } = useAppData();
  const [invite, setInvite] = useState(false);
  const [create, setCreate] = useState(false);
  const [marks, setMarks] = useState(false);
  const [friend, setFriend] = useState("");
  const [occasion, setOccasion] = useState("Barbecue & Book of Mormon night");

  const actions = [
    { icon: "UserPlus", label: "Invite a Friend", onClick: () => setInvite(true) },
    { icon: "Mail", label: "Create Invitation", onClick: () => setCreate(true) },
    { icon: "CalendarDays", label: "Upcoming Events", href: "/events" },
    { icon: "Bookmark", label: "My Bookmarks", onClick: () => setMarks(true) },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((a) =>
          a.href ? (
            <Link
              key={a.label}
              href={a.href}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-sm card-hover"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-strong transition-transform group-hover:scale-105 dark:text-accent">
                <Icon name={a.icon} size={19} />
              </span>
              <span className="text-sm font-semibold text-ink">{a.label}</span>
            </Link>
          ) : (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 text-left shadow-sm card-hover"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-strong transition-transform group-hover:scale-105 dark:text-accent">
                <Icon name={a.icon} size={19} />
              </span>
              <span className="text-sm font-semibold text-ink">{a.label}</span>
            </button>
          ),
        )}
      </div>

      {/* Invite a Friend */}
      <Modal
        open={invite}
        onClose={() => setInvite(false)}
        title="Invite a friend to Christ"
        description="Share the light you've found. A simple invitation can open an eternal door."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInvite(false)}>
              Close
            </Button>
            <Button
              variant="accent"
              icon="Send"
              onClick={() => {
                pushToast(friend.trim() ? `Invitation sent to ${friend.trim()} 💌` : "Invitation link copied", "success");
                setFriend("");
                setInvite(false);
              }}
            >
              Send Invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Friend&apos;s name or email</span>
            <input
              value={friend}
              onChange={(e) => setFriend(e.target.value)}
              placeholder="Someone the Spirit brought to mind…"
              className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <div className="rounded-xl border border-border bg-surface-2/50 p-4">
            <p className="text-sm italic leading-relaxed text-muted">
              &ldquo;Come and see. There&apos;s a place at our table, and I&apos;d love for you to
              feel what I&apos;ve felt.&rdquo;
            </p>
          </div>
        </div>
      </Modal>

      {/* Create Invitation */}
      <Modal
        open={create}
        onClose={() => setCreate(false)}
        title="Create an invitation"
        description="Design a warm invitation to a gathering, devotional, or B&B night."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              icon="Sparkles"
              onClick={() => {
                pushToast(`Invitation for “${occasion}” created 🎉`, "accent");
                setCreate(false);
              }}
            >
              Create Invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Occasion</span>
            <input
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["This Saturday", "Sunday Devotional", "Next Fast Sunday", "Choose a date"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => pushToast(`When set: ${d}`, "default")}
                className={cn(
                  "rounded-xl border border-border-strong px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* My Bookmarks */}
      <Modal open={marks} onClose={() => setMarks(false)} title="My bookmarks" description="Verses you've saved to return to.">
        <ul className="space-y-2.5">
          {bookmarks.map((b) => (
            <li
              key={b.ref}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-4 py-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-strong dark:text-accent">
                <Icon name="Bookmark" size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{b.ref}</p>
                <p className="truncate text-xs text-muted">{b.note}</p>
              </div>
              <button
                type="button"
                onClick={() => pushToast(`Opening ${b.ref} 📖`, "accent")}
                aria-label={`Open ${b.ref}`}
                className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon name="ArrowUpRight" size={16} />
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
