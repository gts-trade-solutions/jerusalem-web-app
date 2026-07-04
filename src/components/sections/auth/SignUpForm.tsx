"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Role } from "@/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useUser, ROLES } from "@/context/UserContext";
import { useAppData } from "@/context/AppDataContext";
import { Field } from "./Field";
import {
  AuthDivider,
  SocialButtons,
  PasswordToggle,
  isValidEmail,
  MIN_PASSWORD,
  passwordStrength,
} from "./shared";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  covenant?: string;
};

const ROLE_HELP: Record<Role, string> = {
  Member: "A baptized Saint gathering with your ward and neighbors.",
  Host: "You'll open your table — hosting B&B nights and gatherings.",
  Youth: "Under-18 experience with added safety and mentor circles.",
  Leader: "Ward or branch leadership tools and stewardship views.",
  Guest: "A searching friend, welcome to explore before you commit.",
};

const STRENGTH_COLORS = ["bg-danger", "bg-accent", "bg-accent-strong", "bg-sage"];

export function SignUpForm() {
  const router = useRouter();
  const { signIn } = useUser();
  const { pushToast } = useAppData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("Member");
  const [covenant, setCovenant] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const strength = passwordStrength(password);

  function validate(
    v = { name, email, password, confirm, covenant },
  ): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Please tell us your name.";
    else if (v.name.trim().length < 2) e.name = "That name looks a little short.";
    if (!v.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(v.email)) e.email = "Enter a valid email address.";
    if (!v.password) e.password = "Password is required.";
    else if (v.password.length < MIN_PASSWORD)
      e.password = `Password must be at least ${MIN_PASSWORD} characters.`;
    if (!v.confirm) e.confirm = "Please confirm your password.";
    else if (v.confirm !== v.password) e.confirm = "Passwords don't match.";
    if (!v.covenant) e.covenant = "Please accept the community covenant to continue.";
    return e;
  }

  const liveErrors = validate();
  const canSubmit = Object.keys(liveErrors).length === 0 && !submitting;

  function mark(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setTouched({ name: true, email: true, password: true, confirm: true, covenant: true });
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    signIn(name.trim(), role);
    pushToast(`Welcome to the gathering, ${name.trim().split(" ")[0]}.`, "success");
    router.push("/");
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Begin your gathering
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Create an account and find your place at the table. No one gathers
          alone — a whole community is waiting to welcome you by name.
        </p>
      </div>

      <SocialButtons
        onClick={(p) => pushToast(`Redirecting to ${p}…`, "accent")}
      />

      <AuthDivider label="or sign up with email" />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field
          label="Full name"
          icon="UserCheck"
          autoComplete="name"
          placeholder="Sarah Whitmer"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (touched.name) setErrors(validate({ name: e.target.value, email, password, confirm, covenant }));
          }}
          onBlur={() => mark("name")}
          error={touched.name ? errors.name : undefined}
        />

        <Field
          label="Email"
          type="email"
          icon="Mail"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) setErrors(validate({ name, email: e.target.value, password, confirm, covenant }));
          }}
          onBlur={() => mark("email")}
          error={touched.email ? errors.email : undefined}
        />

        <div>
          <Field
            label="Password"
            type={showPw ? "text" : "password"}
            icon="Lock"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password || touched.confirm)
                setErrors(validate({ name, email, password: e.target.value, confirm, covenant }));
            }}
            onBlur={() => mark("password")}
            error={touched.password ? errors.password : undefined}
          />
          {/* live strength hint */}
          {password && !errors.password && (
            <div className="mt-2 flex items-center gap-2" aria-live="polite">
              <div className="flex flex-1 gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i < strength.score ? STRENGTH_COLORS[strength.score] : "bg-surface-3",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted">{strength.label}</span>
            </div>
          )}
        </div>

        <Field
          label="Confirm password"
          type={showPw ? "text" : "password"}
          icon="KeyRound"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          required
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            if (touched.confirm) setErrors(validate({ name, email, password, confirm: e.target.value, covenant }));
          }}
          onBlur={() => mark("confirm")}
          error={touched.confirm ? errors.confirm : undefined}
          trailing={
            <PasswordToggle shown={showPw} onToggle={() => setShowPw((s) => !s)} />
          }
        />

        {/* role select */}
        <RoleSelect value={role} onChange={setRole} />

        {/* covenant checkbox */}
        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft select-none">
            <input
              type="checkbox"
              checked={covenant}
              onChange={(e) => {
                setCovenant(e.target.checked);
                if (touched.covenant) setErrors(validate({ name, email, password, confirm, covenant: e.target.checked }));
              }}
              onBlur={() => mark("covenant")}
              aria-invalid={(touched.covenant && Boolean(errors.covenant)) || undefined}
              className="mt-0.5 size-4 shrink-0 rounded border-border-strong accent-[color:var(--color-accent,#bd8b34)] focus-visible:outline-2 focus-visible:outline-accent"
            />
            <span className="leading-relaxed">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => pushToast("The community covenant — coming to your inbox.", "accent")}
                className="font-medium text-accent-strong underline-offset-2 hover:underline dark:text-accent"
              >
                community covenant
              </button>{" "}
              — to gather in charity, keep this circle sacred, and welcome all.
            </span>
          </label>
          {touched.covenant && errors.covenant && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
              <Icon name="AlertTriangle" size={13} strokeWidth={2} />
              {errors.covenant}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          block
          icon="Sunrise"
          disabled={!canSubmit}
          className={cn(!canSubmit && "cursor-not-allowed")}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already gathering?{" "}
        <Link
          href="/auth/sign-in"
          className="inline-flex items-center gap-1 font-medium text-accent-strong transition-colors hover:text-accent dark:text-accent"
        >
          Sign in
          <Icon name="ArrowRight" size={14} />
        </Link>
      </p>
    </div>
  );
}

const ROLE_ICON: Record<Role, string> = {
  Member: "Users",
  Host: "DoorOpen",
  Youth: "Baby",
  Leader: "ShieldCheck",
  Guest: "Sunrise",
};

function RoleSelect({
  value,
  onChange,
}: {
  value: Role;
  onChange: (r: Role) => void;
}) {
  return (
    <fieldset className="space-y-1.5">
      <legend className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink-soft">
        How will you gather?
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ROLES.map((r) => {
          const active = r === value;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent",
                active
                  ? "border-accent bg-accent-soft text-accent-strong shadow-sm dark:text-accent"
                  : "border-border bg-surface text-ink-soft hover:border-border-strong hover:bg-surface-2",
              )}
            >
              <Icon name={ROLE_ICON[r]} size={16} />
              {r}
            </button>
          );
        })}
      </div>
      <p className="pt-0.5 text-xs leading-relaxed text-muted">{ROLE_HELP[value]}</p>
    </fieldset>
  );
}
