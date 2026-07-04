"use client";

import { AuthLayout } from "@/components/sections/auth/AuthLayout";
import { SignInForm } from "@/components/sections/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout
      eyebrow="Welcome Home"
      title="Rejoin the gathering, and take your seat at the table"
      intro="Sign in to reconnect with your ward, your circles, and the neighbors who have been keeping a light on for you."
    >
      <SignInForm />
    </AuthLayout>
  );
}
