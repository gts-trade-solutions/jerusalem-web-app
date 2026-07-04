"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useAppData } from "@/context/AppDataContext";

const faqs = [
  {
    q: "How do I know a B&B host is trustworthy?",
    a: "Every host earns a Verified Host badge only after confirming their identity and phone number. Look for the sage badge on their profile, and read reviews from members who have gathered with them before.",
  },
  {
    q: "Is my personal information ever sold?",
    a: "Never. We collect the minimum needed to gather safely, encrypt it, and never sell or rent your data. You can export or delete it any time from Data & Privacy Export.",
  },
  {
    q: "What extra protections do youth accounts have?",
    a: "Youth accounts default to parental oversight, verified-only messaging, filtered content, and one-tap access to trusted leaders. Parents and leaders can review and adjust these in Youth Safety & Privacy.",
  },
  {
    q: "What should I do if I see something concerning?",
    a: "Use Report & Support inside any profile or post, or contact our support team below. A real person reviews every report, usually within a day.",
  },
];

export function ContactSupport() {
  const { pushToast } = useAppData();
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [topic, setTopic] = useState("A safety concern");
  const [message, setMessage] = useState("");

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-ink-900 px-6 py-12 text-white grain sm:px-10">
        <div className="pointer-events-none absolute inset-0 dawn-wash opacity-40" />
        <div className="relative z-[1] grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ab54]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
              <Icon name="LifeBuoy" size={13} /> Here for You
            </span>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
              A real person, ready to help
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 text-pretty">
              Whether it&apos;s a safety worry, a question about your account, or something that just
              doesn&apos;t feel right — reach out. We watch over this gathering with care and reply,
              usually within a day.
            </p>
            <div className="mt-7">
              <Button
                variant="accent"
                size="lg"
                icon="MessageCircle"
                onClick={() => setOpen(true)}
              >
                Contact Support
              </Button>
            </div>
          </div>

          {/* FAQ mini-accordion */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c67d]">
              Common Questions
            </p>
            <div className="mt-4 space-y-2">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="text-sm font-medium text-white">{f.q}</span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className={cn(
                          "shrink-0 text-[#e6c67d] transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-3 text-sm leading-relaxed text-white/70">{f.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Contact Support"
        description="Tell us what's on your heart. We'll reply within a day."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              icon="Send"
              onClick={() => {
                setOpen(false);
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
    </Reveal>
  );
}
