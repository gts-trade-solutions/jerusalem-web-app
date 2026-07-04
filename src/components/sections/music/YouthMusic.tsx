"use client";

import { useState } from "react";
import { videos } from "@/data/music";
import type { MediaItem } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { VideoModal } from "./VideoModal";

export function YouthMusic() {
  const [active, setActive] = useState<MediaItem | null>(null);
  const [open, setOpen] = useState(false);

  // Youth & original restoration videos.
  const youthVideos = videos.filter(
    (v) => v.category === "youth" || v.category === "video",
  );

  function openVideo(v: MediaItem) {
    setActive(v);
    setOpen(true);
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Youth & Original Restoration Music"
        title="The rising generation is singing"
        intro="Original songs, worship films, and youth-choir anthems created by the young Saints of Zion. Press play and let their witness of Christ lift you."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {youthVideos.map((video, i) => (
          <Reveal key={video.id} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => openVideo(video)}
              aria-label={`Play ${video.title}`}
              className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm card-hover"
            >
              <PhotoBlock
                seed={video.cover ?? video.id}
                w={640}
                h={400}
                icon="Video"
                overlay="ink"
                rounded="rounded-none"
                className="aspect-video w-full"
              >
                <div className="grid h-full w-full place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white/15 text-white ring-2 ring-white/40 backdrop-blur transition-transform group-hover:scale-110">
                    <Icon name="Play" size={24} strokeWidth={2.4} />
                  </span>
                </div>
                <div className="absolute left-3 top-3">
                  {video.category === "youth" ? (
                    <Badge tone="accent" icon="Sparkles" className="bg-surface/90 backdrop-blur">
                      Original
                    </Badge>
                  ) : (
                    <Badge tone="sage" icon="Video" className="bg-surface/90 backdrop-blur">
                      Feature
                    </Badge>
                  )}
                </div>
              </PhotoBlock>
              <div className="p-5">
                <h3 className="font-serif text-base font-semibold leading-snug text-ink text-balance">
                  {video.title}
                </h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted">
                  <Icon name="MonitorPlay" size={13} /> {video.subtitle}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <VideoModal video={active} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
