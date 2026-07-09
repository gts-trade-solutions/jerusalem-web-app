"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const explore = [
  { icon: "UserCheck", label: "Messages from Church Leaders" },
  { icon: "Users", label: "Messages from Disciples" },
  { icon: "BookOpen", label: "Scriptures & Book of Mormon" },
  { icon: "Church", label: "Temple Heritage" },
  { icon: "Sun", label: "Daily Worship & Inspiration" },
  { icon: "FileText", label: "Share Your Testimony" },
];

const quick = [
  { icon: "UserPlus", label: "Invite a Friend" },
  { icon: "Mail", label: "Create Invitation" },
  { icon: "CalendarDays", label: "Upcoming Events" },
  { icon: "Bookmark", label: "My Bookmarks" },
];

export function FaithSidebar() {
  const { pushToast } = useAppData();
  const [active, setActive] = useState(0);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <nav className="rounded-xl border border-border bg-white p-3 shadow-sm dark:bg-surface" aria-label="Explore & Share">
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wide text-faint">Explore &amp; Share</p>
        <ul className="space-y-0.5">
          {explore.map((e, i) => (
            <li key={e.label}>
              <button
                onClick={() => { setActive(i); pushToast(`${e.label}`, "accent"); }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md border-l-2 px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                  i === active
                    ? "border-accent bg-accent-soft text-accent-strong dark:text-accent"
                    : "border-transparent text-ink-soft hover:bg-surface-2",
                )}
              >
                <Icon name={e.icon} size={16} className="shrink-0" /> {e.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="px-2 pb-2 pt-4 text-[10px] font-bold uppercase tracking-wide text-faint">Quick Actions</p>
        <ul className="space-y-0.5">
          {quick.map((q) => (
            <li key={q.label}>
              <button
                onClick={() => pushToast(`${q.label}…`, "accent")}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-xs font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-accent-strong dark:hover:text-accent"
              >
                <Icon name={q.icon} size={16} className="shrink-0 text-[#1d4ed8] dark:text-[#7ea4f5]" /> {q.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative overflow-hidden rounded-xl border border-border bg-bg-tint p-3.5">
        <blockquote className="font-serif text-xs italic leading-relaxed text-ink-soft">
          &ldquo;Be ready always to give an answer to every man that asketh you a reason of the hope that is in you.&rdquo;
        </blockquote>
        <p className="mt-1.5 font-serif text-[11px] font-semibold text-muted">— 1 Peter 3:15</p>
      </div>
    </aside>
  );
}
