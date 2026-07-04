"use client";

import { albums, songs } from "@/data/music";
import type { MediaItem } from "@/types";
import { usePlayer } from "@/context/PlayerContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Resolve a playable track for an album: first song of that album, else the album itself. */
function albumTrack(album: MediaItem): MediaItem {
  return (
    songs.find((s) => s.albumId === album.id) ?? {
      ...album,
      kind: "song",
      durationSec: album.durationSec ?? 240,
    }
  );
}

/** Three animated bars — a "now playing" equalizer affordance. */
function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-accent"
          style={{
            animation: `nj-eq 0.9s ${i * 0.18}s ease-in-out infinite`,
            height: "40%",
          }}
        />
      ))}
      <style>{`@keyframes nj-eq{0%,100%{height:30%}50%{height:100%}}`}</style>
    </span>
  );
}

export function MusicAndWorship() {
  const { current, isPlaying, play, toggle } = usePlayer();

  return (
    <div className="space-y-14">
      {/* Album grid */}
      <div>
        <SectionHeading
          eyebrow="Sacred Worship Music"
          title="Albums to gather your heart in reverence"
          intro="Choir recordings, pioneer collections, and instrumental worship — each one a doorway into the songs of the Restoration. Tap an album to begin listening."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, i) => {
            const track = albumTrack(album);
            const isThisPlaying = current?.id === track.id && isPlaying;
            return (
              <Reveal key={album.id} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm card-hover">
                  <button
                    type="button"
                    onClick={() => play(track)}
                    aria-label={`Play ${album.title}`}
                    className="relative block w-full text-left"
                  >
                    <PhotoBlock
                      seed={album.cover ?? album.id}
                      w={640}
                      h={480}
                      icon="Music"
                      overlay="ink"
                      rounded="rounded-none"
                      className="aspect-[4/3] w-full"
                    >
                      <div className="flex h-full items-end justify-end p-3">
                        <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-fg shadow-lg transition-transform group-hover:scale-105">
                          <Icon
                            name={isThisPlaying ? "Pause" : "Play"}
                            size={20}
                            strokeWidth={2.4}
                          />
                        </span>
                      </div>
                    </PhotoBlock>
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-ink text-balance">
                        {album.title}
                      </h3>
                      <Badge tone="accent" icon="ListMusic">
                        {album.songCount} songs
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{album.subtitle}</p>
                    <button
                      type="button"
                      onClick={() => play(track)}
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent transition-all hover:gap-2.5 hover:text-accent-strong"
                    >
                      {isThisPlaying ? "Now playing" : "Play album"}
                      <Icon name={isThisPlaying ? "Volume2" : "Play"} size={14} />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Track list */}
      <div>
        <SectionHeading
          eyebrow="Featured Hymns"
          title="The worship playlist"
          intro="Hand-picked hymns and sacred songs. Tap any track and it will begin in the player below."
        />
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <ul className="divide-y divide-border">
              {songs.map((song, i) => {
                const isCurrent = current?.id === song.id;
                const isThisPlaying = isCurrent && isPlaying;
                return (
                  <li key={song.id}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 transition-colors sm:gap-4 sm:px-4",
                        isCurrent ? "bg-accent-soft/60" : "hover:bg-surface-2/70",
                      )}
                    >
                      <div className="grid w-6 shrink-0 place-items-center">
                        {isThisPlaying ? (
                          <Equalizer />
                        ) : (
                          <span
                            className={cn(
                              "text-sm tabular-nums",
                              isCurrent ? "text-accent" : "text-faint",
                            )}
                          >
                            {i + 1}
                          </span>
                        )}
                      </div>
                      <PhotoBlock
                        seed={song.cover ?? song.id}
                        w={80}
                        h={80}
                        icon="Music"
                        overlay="sage"
                        rounded="rounded-lg"
                        className="size-11 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate text-sm font-semibold",
                            isCurrent ? "text-accent-strong dark:text-accent" : "text-ink",
                          )}
                        >
                          {song.title}
                        </p>
                        <p className="truncate text-xs text-muted">{song.subtitle}</p>
                      </div>
                      <span className="hidden text-xs tabular-nums text-faint sm:block">
                        {formatDuration(song.durationSec ?? 0)}
                      </span>
                      <button
                        type="button"
                        onClick={() => (isCurrent ? toggle() : play(song))}
                        aria-label={
                          isThisPlaying ? `Pause ${song.title}` : `Play ${song.title}`
                        }
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-105 active:scale-95",
                          isCurrent
                            ? "bg-accent text-accent-fg"
                            : "bg-surface-2 text-ink hover:bg-ink hover:text-bg dark:hover:bg-accent dark:hover:text-accent-fg",
                        )}
                      >
                        <Icon
                          name={isThisPlaying ? "Pause" : "Play"}
                          size={16}
                          strokeWidth={2.4}
                        />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
