"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Person, Role } from "@/types";
import { demoUser } from "@/data/people";

interface UserCtx {
  user: Person;
  role: Role;
  isAuthenticated: boolean;
  setRole: (r: Role) => void;
  signIn: (name?: string, role?: Role) => void;
  signOut: () => void;
  continueAsGuest: () => void;
}

const Ctx = createContext<UserCtx | null>(null);
const ROLE_KEY = "nj-role";
const AUTH_KEY = "nj-auth";

export const ROLES: Role[] = ["Member", "Host", "Youth", "Leader", "Guest"];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("Member");
  const [isAuthenticated, setAuth] = useState(false);
  const [name, setName] = useState(demoUser.name);

  useEffect(() => {
    try {
      const r = localStorage.getItem(ROLE_KEY) as Role | null;
      if (r) setRoleState(r);
      if (localStorage.getItem(AUTH_KEY) === "1") setAuth(true);
    } catch {
      /* ignore */
    }
  }, []);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    try {
      localStorage.setItem(ROLE_KEY, r);
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback(
    (n?: string, r?: Role) => {
      if (n) setName(n);
      if (r) setRole(r);
      setAuth(true);
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* ignore */
      }
    },
    [setRole],
  );

  const signOut = useCallback(() => {
    setAuth(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const continueAsGuest = useCallback(() => {
    setRole("Guest");
    setAuth(true);
    try {
      localStorage.setItem(AUTH_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [setRole]);

  const user: Person = { ...demoUser, name, role, badges: role === "Guest" ? ["Guest"] : demoUser.badges };

  return (
    <Ctx.Provider
      value={{ user, role, isAuthenticated, setRole, signIn, signOut, continueAsGuest }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useUser() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
