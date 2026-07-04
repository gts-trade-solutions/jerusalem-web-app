"use client";

import { useEffect } from "react";
import type { MediaItem } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { useAppData } from "@/context/AppDataContext";

/** Placeholder video player modal for the youth music films. */
export function VideoModal({
  video,
  open,
  onClose,
}: {
  video: MediaItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const { pushToast } = useAppData();

  useEffect(() => {
    if (open && video) pushToast(`Now playing — ${video.title}`, "accent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, video?.id]);

  if (!video) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg" title={video.title} description={video.subtitle}>
      <div className="space-y-4">
        <PhotoBlock
          seed={video.cover ?? video.id}
          w={960}
          h={540}
          overlay="ink"
          icon="Video"
          className="aspect-video w-full"
        >
          <div className="grid h-full w-full place-items-center">
            <button
              type="button"
              onClick={() => pushToast("Playback paused", "default")}
              aria-label={`Play ${video.title}`}
              className="group grid size-20 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur transition-transform hover:scale-105"
            >
              <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-fg shadow-lg transition-colors group-hover:bg-accent-strong">
                <Icon name="Play" size={30} strokeWidth={2.2} />
              </span>
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              0:00
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-1/4 rounded-full bg-accent" />
            </div>
          </div>
        </PhotoBlock>
        <div className="flex items-center gap-2">
          <Badge tone="accent" icon="Sparkles">Youth Restoration Music</Badge>
          <Badge tone="sage" icon="Video">Video</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          This is a preview player. In the full experience, original films and worship videos from
          the youth of Zion stream here in high definition — with lyric captions, the story behind
          each song, and a place to share what you felt while you watched.
        </p>
      </div>
    </Modal>
  );
}
