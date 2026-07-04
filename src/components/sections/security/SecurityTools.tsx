"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useAppData } from "@/context/AppDataContext";

const activity = [
  { icon: "LogIn", text: "Signed in from iPhone 15 · Orem, UT", time: "Just now", ok: true },
  { icon: "KeyRound", text: "Password changed successfully", time: "3 days ago", ok: true },
  { icon: "ShieldAlert", text: "Blocked sign-in attempt · unknown device", time: "6 days ago", ok: false },
  { icon: "Mail", text: "Recovery email confirmed", time: "2 weeks ago", ok: true },
];

const blocked = [
  { name: "Anonymous account", note: "Repeated unsolicited messages" },
  { name: "Spam listing", note: "Fraudulent B&B offer" },
];

export function SecurityTools() {
  const { pushToast } = useAppData();
  const [modal, setModal] = useState<"activity" | "blocked" | null>(null);
  const [blockedList, setBlockedList] = useState(blocked);

  const tools = [
    {
      key: "activity",
      icon: "ScrollText",
      title: "Activity Log",
      body: "Review every sign-in and security event on your account.",
      onClick: () => setModal("activity"),
    },
    {
      key: "blocked",
      icon: "ShieldAlert",
      title: "Blocked Users",
      body: "Manage members and listings you've chosen to block.",
      onClick: () => setModal("blocked"),
    },
    {
      key: "export",
      icon: "Download",
      title: "Data & Privacy Export",
      body: "Request a copy of everything the gathering holds about you.",
      onClick: () => pushToast("Your data export is being prepared — we'll email a secure link.", "accent"),
    },
    {
      key: "lock",
      icon: "Lock",
      title: "App Lock",
      body: "Require Face ID or a passcode each time you open the app.",
      onClick: () => pushToast("App Lock enabled — Face ID will be required on next launch.", "success"),
    },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t, i) => (
          <Reveal key={t.key} delay={i * 0.06}>
            <button
              type="button"
              onClick={t.onClick}
              className="group flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-5 text-left shadow-sm card-hover focus-visible:outline-2"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-surface-3 text-ink-soft transition-colors group-hover:bg-accent-soft group-hover:text-accent-strong dark:group-hover:text-accent">
                <Icon name={t.icon} size={20} />
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">{t.title}</p>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-muted">{t.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-strong dark:text-accent">
                Open
                <Icon name="ArrowRight" size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal
        open={modal === "activity"}
        onClose={() => setModal(null)}
        title="Activity Log"
        description="Recent security events on your account."
        size="md"
      >
        <ul className="space-y-2">
          {activity.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3"
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg",
                  a.ok ? "bg-sage-soft text-sage" : "bg-accent-soft text-accent-strong dark:text-accent",
                )}
              >
                <Icon name={a.icon} size={16} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{a.text}</p>
                <p className="text-xs text-muted">{a.time}</p>
              </div>
              {!a.ok && <Badge tone="needs">Blocked</Badge>}
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        open={modal === "blocked"}
        onClose={() => setModal(null)}
        title="Blocked Users"
        description="Accounts and listings you've blocked from reaching you."
        size="md"
      >
        {blockedList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center">
            <Icon name="ShieldCheck" size={24} className="mx-auto text-sage" />
            <p className="mt-2 text-sm font-medium text-ink">Nothing blocked</p>
            <p className="mt-1 text-xs text-muted">Your gathering is clear.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {blockedList.map((b, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{b.name}</p>
                  <p className="text-xs text-muted">{b.note}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBlockedList((prev) => prev.filter((x) => x.name !== b.name));
                    pushToast(`Unblocked ${b.name}.`, "default");
                  }}
                >
                  Unblock
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
}
