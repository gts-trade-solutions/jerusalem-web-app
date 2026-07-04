"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { AppDataProvider } from "@/context/AppDataContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <PlayerProvider>
          <AppDataProvider>{children}</AppDataProvider>
        </PlayerProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
