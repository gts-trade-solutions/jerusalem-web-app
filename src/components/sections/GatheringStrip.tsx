"use client";

import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { EventCard } from "@/components/EventCard";
import { EventDetailModal } from "@/components/EventDetailModal";

export function GatheringStrip({ limit = 4 }: { limit?: number }) {
  const { events } = useAppData();
  const [openId, setOpenId] = useState<string | null>(null);
  const list = events.slice(0, limit);
  const active = events.find((e) => e.id === openId) ?? null;

  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {list.map((e) => (
          <div key={e.id} className="w-[280px] shrink-0 sm:w-auto">
            <EventCard event={e} onDetails={setOpenId} />
          </div>
        ))}
      </div>
      <EventDetailModal event={active} open={!!active} onClose={() => setOpenId(null)} />
    </>
  );
}
