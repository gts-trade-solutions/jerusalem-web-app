"use client";

import { useState } from "react";
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

/** Bottom row — "Additional Security Tools" strip + "Need Help?" support panel. */
export function SecurityTools() {
  const { pushToast } = useAppData();
  const [modal, setModal] = useState<"activity" | "support" | null>(null);
  const [topic, setTopic] = useState("A safety concern");
  const [message, setMessage] = useState("");

  const tools = [
    {
      icon: "Bell",
      title: "Login Alerts",
      body: "Get notified of new sign-ins.",
      onClick: () => setModal("activity"),
    },
    {
      icon: "MonitorSmartphone",
      title: "Session Management",
      body: "See and manage your active sessions.",
      onClick: () => pushToast("1 active session — iPhone 15 · Orem, UT. All healthy.", "success"),
    },
    {
      icon: "ShieldCheck",
      title: "Privacy Center",
      body: "Control your data and privacy preferences.",
      onClick: () => pushToast("Your data export is being prepared — we'll email a secure link.", "accent"),
    },
    {
      icon: "LifeBuoy",
      title: "Help & Support",
      body: "Get help from our support team.",
      onClick: () => setModal("support"),
    },
  ];

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.9fr_1fr]">
        {/* Additional Security Tools */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
          <h2 className="font-serif text-xl font-bold text-ink">Additional Security Tools</h2>
          <p className="mt-1 text-xs text-muted">More ways we help keep you and our community safe.</p>
          <div className="mt-5 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {tools.map((t, i) => (
              <button
                key={t.title}
                type="button"
                onClick={t.onClick}
                className={cn(
                  "group flex items-start gap-3 px-3 text-left transition-colors first:pl-0",
                  i > 0 && "sm:border-l sm:border-border",
                )}
              >
                <span className="mt-0.5 shrink-0 text-ink transition-colors group-hover:text-accent-strong dark:group-hover:text-accent">
                  <Icon name={t.icon} size={26} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[13px] font-bold leading-snug text-ink">{t.title}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{t.body}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Need Help? */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#fbf3e2] shadow-sm dark:bg-surface-2">
          {/* the exact support-agent photo from the reference */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/security-support.jpg"
            alt=""
            className="absolute inset-y-0 right-0 h-full w-[52%] object-cover"
            style={{ maskImage: "linear-gradient(90deg, transparent, black 32%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 32%)" }}
          />
          <div className="relative z-[1] max-w-[58%] p-5">
            <h3 className="font-serif text-lg font-bold text-ink">Need Help?</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Our support team is here to help you.
            </p>
            <button
              type="button"
              onClick={() => setModal("support")}
              className="mt-4 rounded-md bg-[#b8892b] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Login alerts / activity */}
      <Modal
        open={modal === "activity"}
        onClose={() => setModal(null)}
        title="Login Alerts"
        description="Recent sign-ins and security events on your account."
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

      {/* Contact support */}
      <Modal
        open={modal === "support"}
        onClose={() => setModal(null)}
        title="Contact Support"
        description="Tell us what's on your heart. We'll reply within a day."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(null)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              icon="Send"
              onClick={() => {
                setModal(null);
                setMessage("");
                pushToast("Support request sent — we'll reply within a day.", "success");
              }}
            >
              Send request
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="support-topic" className="text-sm font-semibold text-ink">
              Topic
            </label>
            <select
              id="support-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2"
            >
              <option>A safety concern</option>
              <option>Account & sign-in help</option>
              <option>Privacy & my data</option>
              <option>Report a member or listing</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="support-message" className="text-sm font-semibold text-ink">
              Your message
            </label>
            <textarea
              id="support-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Share as much or as little as you'd like…"
              className="mt-1.5 w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus-visible:outline-2"
            />
          </div>
          <p className="flex items-start gap-2 rounded-xl border border-border bg-surface-2/50 px-3 py-2.5 text-xs leading-relaxed text-muted">
            <Icon name="Lock" size={13} className="mt-0.5 shrink-0" />
            Your message is private and handled by a trusted member of our support team.
          </p>
        </div>
      </Modal>
    </>
  );
}
