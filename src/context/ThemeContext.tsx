"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Theme } from "@/types";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = "nj-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with what the pre-hydration script already applied to <html>.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
    const initial: Theme =
      stored ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setThemeState(initial);
  }, []);

  const apply = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    apply(document.documentElement.classList.contains("dark") ? "light" : "dark");
  }, [apply]);

  return (
    <Ctx.Provider value={{ theme, toggleTheme, setTheme: apply }}>{children}</Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Inlined in <head> to set the theme class before first paint (no flash). */
export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
