"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/Icon";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/cn";
import { useAppData } from "@/context/AppDataContext";
import { useUser } from "@/context/UserContext";
import { ToggleRow } from "./Toggle";

type PillarKey = "verify" | "youth" | "trust" | "signin";

const pillars: {
  key: PillarKey;
  icon: string;
  tone: "accent" | "sage";
  title: string;
  body: string;
  cta: string;
}[] = [
  {
    key: "verify",
    icon: "BadgeCheck",
    tone: "accent",
    title: "Account Verification",
    body: "Confirm who you are so neighbors can gather in confidence. Verify your email, phone, and identity to earn the Trusted Member badge.",
    cta: "Manage verification",
  },
  {
    key: "youth",
    icon: "Baby",
    tone: "sage",
    title: "Youth Safety & Privacy",
    body: "Extra shelter for our young saints — parental controls, safe interaction limits, and gentle content guidelines built in from the start.",
    cta: "Open youth controls",
  },
  {
    key: "trust",
    icon: "Users",
    tone: "accent",
    title: "Community Trust Indicators",
    body: "See the strength of the gathering at a glance — verified members, trusted B&B hosts, and honest reputations you can rely on.",
    cta: "View trust indicators",
  },
  {
    key: "signin",
    icon: "KeyRound",
    tone: "sage",
    title: "Secure Sign-In & Recovery",
    body: "Guard the door to your account with two-factor sign-in, a strong password, recovery options, and full control over your devices.",
    cta: "Secure my account",
  },
];

export function SecurityPillars() {
  const [open, setOpen] = useState<PillarKey | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.07}>
            <Card hover className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl",
                    p.tone === "sage"
                      ? "bg-sage-soft text-sage"
                      : "bg-accent-soft text-accent-strong dark:text-accent",
                  )}
                >
                  <Icon name={p.icon} size={24} />
                </span>
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
              <div className="mt-5">
                <Button
                  variant={p.tone === "sage" ? "sage" : "accent"}
                  iconRight="ArrowRight"
                  onClick={() => setOpen(p.key)}
                >
                  {p.cta}
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <VerificationModal open={open === "verify"} onClose={() => setOpen(null)} />
      <YouthModal open={open === "youth"} onClose={() => setOpen(null)} />
      <TrustModal open={open === "trust"} onClose={() => setOpen(null)} />
      <SignInModal open={open === "signin"} onClose={() => setOpen(null)} />
    </>
  );
}

/* ---------------- Account Verification ---------------- */

function VerificationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pushToast } = useAppData();
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [identityVerified, setIdentityVerified] = useState(false);

  const items = [
    { key: "email", icon: "Mail", label: "Email address", value: "sister.reed@example.com", verified: true },
    { key: "phone", icon: "Phone", label: "Phone number", value: "(801) 555-0147", verified: phoneVerified },
    { key: "badge", icon: "BadgeCheck", label: "Trusted Member badge", value: "Awarded after verification", verified: phoneVerified && identityVerified },
    { key: "identity", icon: "Fingerprint", label: "Identity", value: "Government ID on file", verified: identityVerified },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Account Verification"
      description="Confirm your details to build trust across the gathering."
      size="md"
    >
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.key}
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-2/50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-3 text-ink-soft">
                <Icon name={it.icon} size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{it.label}</p>
                <p className="truncate text-xs text-muted">{it.value}</p>
              </div>
            </div>
            <div className="shrink-0">
              {it.verified ? (
                <Badge tone="sage" icon="CheckCircle2">Verified</Badge>
              ) : it.key === "phone" ? (
                <Button
                  size="sm"
                  variant="accent"
                  icon="ShieldCheck"
                  onClick={() => {
                    setPhoneVerified(true);
                    pushToast("Phone number verified — thank you!", "success");
                  }}
                >
                  Verify
                </Button>
              ) : it.key === "identity" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIdentityVerified(true);
                    pushToast("Identity confirmed. Your Trusted Member badge is being reviewed.", "success");
                  }}
                >
                  Verify
                </Button>
              ) : (
                <Badge tone="outline">Pending</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-border bg-surface-2/40 px-4 py-3 text-xs leading-relaxed text-muted">
        <Icon name="Info" size={13} className="mr-1 inline" />
        We use verification only to keep the community safe. Your documents are encrypted and never shared.
      </p>
    </Modal>
  );
}

/* ---------------- Youth Safety & Privacy ---------------- */

function YouthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role } = useUser();
  const youthContext = role === "Youth" || role === "Leader" || role === "Host";

  const [parental, setParental] = useState(youthContext);
  const [safeInteraction, setSafeInteraction] = useState(youthContext);
  const [contentGuidelines, setContentGuidelines] = useState(youthContext);
  const [reportSupport, setReportSupport] = useState(true);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Youth Safety & Privacy"
      description="Extra care for our youngest saints and the leaders who watch over them."
      size="md"
    >
      {youthContext ? (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-sage/30 bg-sage-soft px-4 py-3">
          <Icon name="ShieldCheck" size={18} className="mt-0.5 shrink-0 text-sage" />
          <div>
            <p className="text-sm font-semibold text-sage">Youth account protections are ON</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
              Because you are signed in as <strong>{role}</strong>, these safeguards are enabled by default.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3">
          <Icon name="Info" size={18} className="mt-0.5 shrink-0 text-accent-strong dark:text-accent" />
          <p className="text-xs leading-relaxed text-muted">
            You are signed in as <strong>{role}</strong>. These protections apply to youth accounts —
            switch your role to <strong>Youth</strong> in the header to see them enabled by default.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <ToggleRow
          title="Parental Controls"
          description="Let a parent or guardian oversee connections, messages, and event RSVPs."
          checked={parental}
          onChange={setParental}
          icon={<Icon name="UserCheck" size={16} />}
        />
        <ToggleRow
          title="Safe Interaction"
          description="Only verified members and approved leaders may message youth accounts."
          checked={safeInteraction}
          onChange={setSafeInteraction}
          icon={<Icon name="Users" size={16} />}
        />
        <ToggleRow
          title="Content Guidelines"
          description="Filter shared media and feed posts to age-appropriate, uplifting content."
          checked={contentGuidelines}
          onChange={setContentGuidelines}
          icon={<Icon name="FileText" size={16} />}
        />
        <ToggleRow
          title="Report & Support"
          description="One-tap access to trusted leaders and a private way to ask for help."
          checked={reportSupport}
          onChange={setReportSupport}
          icon={<Icon name="LifeBuoy" size={16} />}
        />
      </div>
    </Modal>
  );
}

/* ---------------- Community Trust Indicators ---------------- */

function TrustModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showBadge, setShowBadge] = useState(true);

  const indicators = [
    { label: "Verified Members", value: 1188, total: 1240, sub: "of the gathering", icon: "UserCheck" },
    { label: "Verified B&B Hosts", value: 84, total: 96, sub: "welcoming tables", icon: "DoorOpen" },
    { label: "Group Integrity", value: 51, total: 54, sub: "wards & branches", icon: "Church" },
    { label: "Reputation", value: 97, total: 100, sub: "trust score", icon: "Star" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Community Trust Indicators"
      description="An honest picture of how safe and vouched-for this gathering is."
      size="lg"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {indicators.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface-2/50 p-4"
          >
            <ProgressRing value={it.value} total={it.total} size={84} stroke={8} />
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Icon name={it.icon} size={15} className="text-accent-strong dark:text-accent" />
                {it.label}
              </p>
              <p className="mt-0.5 font-serif text-lg font-semibold tabular-nums text-ink">
                {it.value.toLocaleString()}
                <span className="text-sm font-normal text-muted"> / {it.total.toLocaleString()}</span>
              </p>
              <p className="text-xs text-muted">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ToggleRow
          title="Show my trust badge"
          description="Display your Verified Member badge on your profile and posts across the community."
          checked={showBadge}
          onChange={setShowBadge}
          icon={<Icon name="BadgeCheck" size={16} />}
        >
          <div className="mt-2">
            {showBadge ? (
              <Badge tone="sage" icon="BadgeCheck">Trusted Member · visible</Badge>
            ) : (
              <Badge tone="outline" icon="EyeOff">Badge hidden</Badge>
            )}
          </div>
        </ToggleRow>
      </div>
    </Modal>
  );
}

/* ---------------- Secure Sign-In & Recovery ---------------- */

interface Device {
  id: string;
  name: string;
  meta: string;
  current?: boolean;
}

const seedDevices: Device[] = [
  { id: "d1", name: "iPhone 15", meta: "Orem, UT · current session", current: true },
  { id: "d2", name: "MacBook Air", meta: "Provo, UT · 2 days ago" },
  { id: "d3", name: "iPad", meta: "Salt Lake City, UT · last week" },
];

function passwordStrength(pw: string): { score: number; label: string; tone: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const clamped = Math.min(4, score);
  const labels = ["Too weak", "Weak", "Fair", "Strong", "Excellent"];
  const tones = ["bg-danger", "bg-danger", "bg-accent", "bg-sage", "bg-sage"];
  return { score: clamped, label: pw ? labels[clamped] : "Enter a password", tone: tones[clamped] };
}

function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pushToast } = useAppData();
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [devices, setDevices] = useState<Device[]>(seedDevices);

  const strength = useMemo(() => passwordStrength(pw), [pw]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Secure Sign-In & Recovery"
      description="Lock the door to your account and keep your devices in view."
      size="md"
    >
      <div className="space-y-4">
        <ToggleRow
          title="Two-Factor Authentication (2FA)"
          description="Require a one-time code when signing in from a new device."
          checked={twoFactor}
          onChange={(next) => {
            setTwoFactor(next);
            pushToast(
              next ? "Two-factor authentication enabled." : "Two-factor authentication turned off.",
              next ? "success" : "default",
            );
          }}
          icon={<Icon name="Smartphone" size={16} />}
        />

        {/* Password strength meter */}
        <div className="rounded-xl border border-border bg-surface-2/50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Strong Password</p>
            <span className="text-xs font-medium text-muted">{strength.label}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Try a new password"
                aria-label="Demo password"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 pr-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2"
              />
              <button
                type="button"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((s) => !s)}
                className="absolute inset-y-0 right-2 grid place-items-center text-muted hover:text-ink"
              >
                <Icon name={showPw ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-200",
                  i < strength.score ? strength.tone : "bg-surface-3",
                )}
              />
            ))}
          </div>
        </div>

        {/* Recovery */}
        <div className="rounded-xl border border-border bg-surface-2/50 px-4 py-3">
          <p className="text-sm font-semibold text-ink">Account Recovery</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            Set a recovery email and phone so you never lose access to the gathering.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              icon="Mail"
              onClick={() => pushToast("Recovery email set to sister.reed@example.com", "success")}
            >
              Set recovery email
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon="Phone"
              onClick={() => pushToast("Recovery phone set to (801) 555-0147", "success")}
            >
              Set recovery phone
            </Button>
          </div>
        </div>

        {/* Device management */}
        <div className="rounded-xl border border-border bg-surface-2/50 px-4 py-3">
          <p className="text-sm font-semibold text-ink">Device Management</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            Sign out any device you don&apos;t recognize.
          </p>
          <ul className="mt-3 space-y-2">
            {devices.length === 0 && (
              <li className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-xs text-muted">
                No other devices are signed in.
              </li>
            )}
            {devices.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-surface-3 text-ink-soft">
                    <Icon name="MonitorSmartphone" size={16} />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                      {d.name}
                      {d.current && <Badge tone="sage">This device</Badge>}
                    </p>
                    <p className="text-xs text-muted">{d.meta}</p>
                  </div>
                </div>
                {!d.current && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setDevices((prev) => prev.filter((x) => x.id !== d.id));
                      pushToast(`Signed out of ${d.name}.`, "default");
                    }}
                  >
                    Sign out
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
