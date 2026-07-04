"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";

/** Simple, permissive email check for client-side UX validation. */
export const isValidEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const MIN_PASSWORD = 8;

/** Derive a friendly display name from an email local-part. */
export function nameFromEmail(email: string): string {
  const local = email.trim().split("@")[0] || "Friend";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Password strength 0..3 with a label. */
export function passwordStrength(pw: string): {
  score: 0 | 1 | 2 | 3;
  label: string;
} {
  let n = 0;
  if (pw.length >= MIN_PASSWORD) n++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) n++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) n++;
  const score = Math.min(n, 3) as 0 | 1 | 2 | 3;
  const label = ["Too short", "Getting there", "Good", "Strong"][score];
  return { score, label };
}

/** "or" rule used between social auth and the email form. */
export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3" role="separator">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium uppercase tracking-widest text-faint">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/** Fake "social" auth buttons that just toast — every button does something. */
export function SocialButtons({ onClick }: { onClick: (provider: string) => void }) {
  return (
    <div className="grid gap-2.5">
      <Button
        type="button"
        variant="outline"
        block
        icon="Church"
        onClick={() => onClick("Church Account")}
      >
        Continue with Church Account
      </Button>
      <Button
        type="button"
        variant="outline"
        block
        icon="Mail"
        onClick={() => onClick("Ward Directory")}
      >
        Continue with Ward Directory
      </Button>
    </div>
  );
}

/** Password show/hide toggle for the Field `trailing` slot. */
export function PasswordToggle({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      aria-pressed={shown}
      className="grid size-9 place-items-center rounded-lg text-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Icon name={shown ? "EyeOff" : "Eye"} size={18} />
    </button>
  );
}
