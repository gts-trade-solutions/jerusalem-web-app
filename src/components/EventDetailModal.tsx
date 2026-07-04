"use client";

import type { EventItem } from "@/types";
import { Modal } from "./ui/Modal";
import { PhotoBlock } from "./ui/PhotoBlock";
import { RsvpButton } from "./RsvpButton";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Icon } from "./Icon";
import { Avatar } from "./ui/Avatar";
import { formatDateLong, formatTime } from "@/lib/format";
import { useAppData } from "@/context/AppDataContext";

const typeLabel: Record<EventItem["type"], string> = {
  bb: "Barbecue & Book of Mormon",
  worship: "Worship Gathering",
  fellowship: "Fellowship",
  livestream: "Livestream",
};

export function EventDetailModal({
  event,
  open,
  onClose,
}: {
  event: EventItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const { pushToast } = useAppData();
  if (!event) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg" title={undefined}>
      <div className="-mx-6 -mt-5">
        <PhotoBlock seed={event.image ?? event.id} w={900} h={420} icon="Flame" overlay="ink" rounded="rounded-none" className="h-52 sm:h-64">
          <div className="flex h-full flex-col justify-end p-6">
            <Badge tone="accent" className="mb-2 w-fit bg-surface/90 backdrop-blur">{typeLabel[event.type]}</Badge>
            <h2 className="max-w-lg font-serif text-2xl font-semibold leading-tight text-white text-balance">{event.title}</h2>
          </div>
        </PhotoBlock>
      </div>

      <div className="pt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: "CalendarDays", label: "When", value: `${formatDateLong(event.start)}` },
            { icon: "Clock", label: "Time", value: formatTime(event.start) },
            { icon: "MapPin", label: "Where", value: event.location },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-border bg-surface-2/60 p-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                <Icon name={r.icon} size={13} /> {r.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{r.value}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">{event.description}</p>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-2/50 p-3">
          <Avatar name={event.hostName} seed={event.hostName} size={40} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink">{event.hostName}</p>
            <p className="text-xs text-faint">Host · {event.going.toLocaleString()} going</p>
          </div>
          <Badge tone="sage" icon="BadgeCheck">Verified Host</Badge>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <RsvpButton id={event.id} size="md" />
          <div className="flex gap-2">
            <Button variant="outline" size="md" icon="Share2" onClick={() => pushToast("Invite link copied to clipboard")}>
              Invite
            </Button>
            <Button variant="ghost" size="md" icon="CalendarDays" onClick={() => pushToast("Added to your calendar")}>
              Add to calendar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
