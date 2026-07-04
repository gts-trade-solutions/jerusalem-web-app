"use client";

import { AuthLayout } from "@/components/sections/auth/AuthLayout";
import { SignUpForm } from "@/components/sections/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      eyebrow="Come and Gather"
      title="Begin your gathering — no one is a stranger here for long"
      intro="Create your place in a covenant community that spans every sea. Open your door, carry a burden, share your witness, and find that you were never meant to walk it alone."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
