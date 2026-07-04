"use client";

import { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { useAppData } from "@/context/AppDataContext";

/**
 * Reusable "player placeholder" modal — a PhotoBlock with a big play button,
 * title + presenter line, and a "Now playing" toast when it opens.
 */
export function PlayerModal({
  open,
  onClose,
  seed,
  title,
  presenter,
  icon = "MonitorPlay",
}: {
  open: boolean;
  onClose: () => void;
  seed: string;
  title: string;
  presenter?: string;
  icon?: string;
}) {
  const { pushToast } = useAppData();

  useEffect(() => {
    if (open) pushToast(`Now playing — ${title}`, "accent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} size="lg" title={title} description={presenter}>
      <div className="space-y-4">
        <PhotoBlock seed={seed} h={360} overlay="ink" icon={icon} className="w-full">
          <div className="grid h-full w-full place-items-center">
            <button
              type="button"
              onClick={() => pushToast("Playback paused", "default")}
              aria-label="Play message"
              className="group grid size-20 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur transition-transform hover:scale-105"
            >
              <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-fg shadow-lg transition-colors group-hover:bg-accent-strong">
                <Icon name="Play" size={30} strokeWidth={2.2} />
              </span>
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              12:48
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-1/3 rounded-full bg-accent" />
            </div>
          </div>
        </PhotoBlock>
        <p className="text-sm leading-relaxed text-muted">
          This is a preview player. In the full experience, messages from Church leaders stream
          here in high definition, with talk transcripts, cited scriptures, and a place to record
          the impressions you feel as you watch.
        </p>
      </div>
    </Modal>
  );
}
