"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { EventItem, FeedItem } from "@/types";
import { events as seedEvents } from "@/data/events";
import { feed as seedFeed } from "@/data/feed";
import { demoUser } from "@/data/people";

export interface Toast {
  id: number;
  message: string;
  tone?: "default" | "success" | "accent";
}

interface AppDataCtx {
  events: EventItem[];
  toggleRsvp: (id: string) => void;
  addEvent: (data: Partial<EventItem>) => void;

  feed: FeedItem[];
  prayingIds: Set<string>;
  togglePraying: (id: string) => void;
  addFeedItem: (data: Partial<FeedItem> & { kind: FeedItem["kind"] }) => void;

  toasts: Toast[];
  pushToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
}

const Ctx = createContext<AppDataCtx | null>(null);

let idSeq = 1000;
const nextId = (prefix: string) => `${prefix}-${++idSeq}`;

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventItem[]>(seedEvents);
  const [feed, setFeed] = useState<FeedItem[]>(seedFeed);
  const [prayingIds, setPrayingIds] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((message: string, tone: Toast["tone"] = "default") => {
    const id = ++idSeq;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toggleRsvp = useCallback(
    (id: string) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, rsvped: !e.rsvped, going: e.going + (e.rsvped ? -1 : 1) }
            : e,
        ),
      );
      const ev = events.find((e) => e.id === id);
      pushToast(
        ev?.rsvped ? "RSVP removed" : "You're going! See you there 🎉",
        ev?.rsvped ? "default" : "success",
      );
    },
    [events, pushToast],
  );

  const addEvent = useCallback(
    (data: Partial<EventItem>) => {
      const ev: EventItem = {
        id: nextId("e"),
        type: data.type ?? "bb",
        title: data.title ?? "Untitled Gathering",
        description: data.description ?? "",
        start: data.start ?? "2026-08-01T23:00:00Z",
        location: data.location ?? "Your Neighborhood",
        hostName: data.hostName ?? demoUser.name,
        image: data.image ?? "new-gathering",
        going: 1,
        rsvped: true,
        pin: data.pin ?? { x: 50, y: 50 },
      };
      setEvents((prev) => [ev, ...prev]);
      pushToast("Your gathering is live 🔥", "accent");
    },
    [pushToast],
  );

  const togglePraying = useCallback((id: string) => {
    setPrayingIds((prev) => {
      const next = new Set(prev);
      const has = next.has(id);
      if (has) next.delete(id);
      else next.add(id);
      setFeed((f) =>
        f.map((item) =>
          item.id === id
            ? { ...item, reactions: item.reactions + (has ? -1 : 1) }
            : item,
        ),
      );
      return next;
    });
  }, []);

  const addFeedItem = useCallback(
    (data: Partial<FeedItem> & { kind: FeedItem["kind"] }) => {
      const item: FeedItem = {
        id: nextId("f"),
        kind: data.kind,
        title: data.title ?? "Untitled",
        body: data.body ?? "",
        author: data.author ?? demoUser,
        createdAt: "2026-07-04T12:00:00Z",
        status: data.status,
        reactions: 0,
      };
      setFeed((prev) => [item, ...prev]);
      pushToast(
        data.kind === "prayer" ? "Prayer request shared 🙏" : "Testimony shared 🕯️",
        "success",
      );
    },
    [pushToast],
  );

  const value = useMemo(
    () => ({
      events,
      toggleRsvp,
      addEvent,
      feed,
      prayingIds,
      togglePraying,
      addFeedItem,
      toasts,
      pushToast,
      dismissToast,
    }),
    [events, toggleRsvp, addEvent, feed, prayingIds, togglePraying, addFeedItem, toasts, pushToast, dismissToast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppData() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
