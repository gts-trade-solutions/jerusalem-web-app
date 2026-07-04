"use client";

import { useAppData } from "@/context/AppDataContext";
import { RsvpButton } from "@/components/RsvpButton";
import { Button } from "@/components/ui/Button";

/** Client-side action row for the standalone event detail page. */
export function EventDetailActions({ id, title }: { id: string; title: string }) {
  const { pushToast } = useAppData();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <RsvpButton id={id} size="md" />
      <Button
        variant="outline"
        size="md"
        icon="CalendarDays"
        onClick={() => pushToast("Added to your calendar 📆", "success")}
      >
        Add to calendar
      </Button>
      <Button
        variant="ghost"
        size="md"
        icon="Share2"
        onClick={() => {
          try {
            navigator.clipboard?.writeText(`You're invited: ${title} — RSVP in the New Jerusalem app.`);
          } catch {
            /* clipboard may be unavailable */
          }
          pushToast("Invite link copied to clipboard ✉️", "success");
        }}
      >
        Invite
      </Button>
    </div>
  );
}
