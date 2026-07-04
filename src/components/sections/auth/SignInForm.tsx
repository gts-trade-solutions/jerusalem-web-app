"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { useUser } from "@/context/UserContext";
import { useAppData } from "@/context/AppDataContext";
import { Field } from "./Field";
import {
  AuthDivider,
  SocialButtons,
  PasswordToggle,
  isValidEmail,
  MIN_PASSWORD,
  nameFromEmail,
} from "./shared";

type Errors = { email?: string; password?: string };

export function SignInForm() {
  const router = useRouter();
  const { signIn, continueAsGuest } = useUser();
  const { pushToast } = useAppData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(fields = { email, password }): Errors {
    const e: Errors = {};
    if (!fields.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(fields.email)) e.email = "Enter a valid email address.";
    if (!fields.password) e.password = "Password is required.";
    else if (fields.password.length < MIN_PASSWORD)
      e.password = `Password must be at least ${MIN_PASSWORD} characters.`;
    return e;
  }

  const liveErrors = validate();
  const canSubmit = Object.keys(liveErrors).length === 0 && !submitting;

  function handleBlur(field: "email" | "password") {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setTouched({ email: true, password: true });
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    signIn(nameFromEmail(email));
    pushToast(`Welcome home, ${nameFromEmail(email)}.`, "success");
    router.push("/");
  }

  function handleGuest() {
    continueAsGuest();
    pushToast("Welcome in — you're browsing as a guest.", "accent");
    router.push("/");
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to rejoin the gathering — your table, your circles, and the
          saints who are praying for you.
        </p>
      </div>

      <SocialButtons
        onClick={(p) => pushToast(`Redirecting to ${p}…`, "accent")}
      />

      <AuthDivider label="or sign in with email" />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            if (touched.email) setErrors(validate({ email: e.target.value, password }));
          }}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
        />

        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          icon="Lock"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) setErrors(validate({ email, password: e.target.value }));
          }}
          onBlur={() => handleBlur("password")}
          error={touched.password ? errors.password : undefined}
          trailing={
            <PasswordToggle shown={showPw} onToggle={() => setShowPw((s) => !s)} />
          }
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded border-border-strong text-accent accent-[color:var(--color-accent,#bd8b34)] focus-visible:outline-2 focus-visible:outline-accent"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => pushToast("Recovery link sent — check your email.", "success")}
            className="text-sm font-medium text-accent-strong transition-colors hover:text-accent dark:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          block
          icon="DoorOpen"
          disabled={!canSubmit}
          className={cn(!canSubmit && "cursor-not-allowed")}
        >
          Sign In
        </Button>
      </form>

      <Button
        type="button"
        variant="outline"
        size="lg"
        block
        icon="Sunrise"
        onClick={handleGuest}
        className="mt-3"
      >
        Continue as guest
      </Button>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link
          href="/auth/sign-up"
          className="inline-flex items-center gap-1 font-medium text-accent-strong transition-colors hover:text-accent dark:text-accent"
        >
          Create an account
          <Icon name="ArrowRight" size={14} />
        </Link>
      </p>
    </div>
  );
}
