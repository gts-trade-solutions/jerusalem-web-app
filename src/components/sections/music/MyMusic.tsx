"use client";

import { useState } from "react";
import { albums, songs } from "@/data/music";
import { usePlayer } from "@/context/PlayerContext";
import { useAppData } from "@/context/AppDataContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PhotoBlock } from "@/components/ui/PhotoBlock";
import { Icon } from "@/components/Icon";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

const recentlyPlayed = songs.slice(0, 4);
const likedSeed = ["al-1", "al-3", "al-6"];

export function MyMusic() {
  const { current, isPlaying, play, toggle } = usePlayer();
  const { pushToast } = useAppData();

  const [liked, setLiked] = useState<Set<string>>(new Set(likedSeed));
  const [form, setForm] = useState({ title: "", description: "" });

  function toggleLike(id: string, title: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      const has = next.has(id);
      if (has) next.delete(id);
      else next.add(id);
      pushToast(
        has ? `Removed ${title} from your library` : `Saved ${title} to your library 💛`,
        has ? "default" : "success",
      );
      return next;
    });
  }

  const likedAlbums = albums.filter((a) => liked.has(a.id));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    pushToast("Submitted for review 🎵", "success");
    setForm({ title: "", description: "" });
  }

  return (
    <div className="space-y-14">
      {/* Recently played */}
      <div>
        <SectionHeading
          eyebrow="Recently Played"
          title="Pick up where you left off"
          intro="The hymns and songs you've been worshipping to lately."
        />
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <ul className="divide-y divide-border">
              {recentlyPlayed.map((song) => {
                const isCurrent = current?.id === song.id;
                const isThisPlaying = isCurrent && isPlaying;
                return (
                  <li
                    key={song.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 transition-colors sm:gap-4 sm:px-4",
                      isCurrent ? "bg-accent-soft/60" : "hover:bg-surface-2/70",
                    )}
                  >
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
                      aria-label={isThisPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-105 active:scale-95",
                        isCurrent
                          ? "bg-accent text-accent-fg"
                          : "bg-surface-2 text-ink hover:bg-ink hover:text-bg dark:hover:bg-accent dark:hover:text-accent-fg",
                      )}
                    >
                      <Icon name={isThisPlaying ? "Pause" : "Play"} size={16} strokeWidth={2.4} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Liked albums */}
      <div>
        <SectionHeading
          eyebrow="Your Library"
          title="Liked albums"
          intro="Tap the heart on any album to add or remove it from your library."
        />
        {likedAlbums.length === 0 ? (
          <Reveal className="mt-8">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-14 text-center">
              <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                <Icon name="Heart" size={26} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-ink">No liked albums yet</h3>
              <p className="mt-1.5 max-w-sm text-sm text-muted">
                Browse Sacred Worship Music and tap the heart to build your library.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {likedAlbums.map((album, i) => {
              const track = songs.find((s) => s.albumId === album.id) ?? {
                ...album,
                kind: "song" as const,
              };
              return (
                <Reveal key={album.id} delay={i * 0.06}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm card-hover">
                    <PhotoBlock
                      seed={album.cover ?? album.id}
                      w={120}
                      h={120}
                      icon="Music"
                      overlay="ink"
                      rounded="rounded-xl"
                      className="size-16 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-base font-semibold text-ink">
                        {album.title}
                      </p>
                      <p className="truncate text-xs text-muted">{album.subtitle}</p>
                      <div className="mt-1.5">
                        <Badge tone="neutral" icon="ListMusic">
                          {album.songCount} songs
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => play(track)}
                        aria-label={`Play ${album.title}`}
                        className="grid size-9 place-items-center rounded-full bg-accent text-accent-fg transition-transform hover:scale-105 active:scale-95"
                      >
                        <Icon name="Play" size={16} strokeWidth={2.4} />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLike(album.id, album.title)}
                        aria-label={`Remove ${album.title} from library`}
                        aria-pressed
                        className="grid size-9 place-items-center rounded-full bg-surface-2 text-accent transition-colors hover:bg-surface-3"
                      >
                        <Icon name="Heart" size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Share your music */}
      <div>
        <SectionHeading
          eyebrow="Share Your Music"
          title="Add your voice to Zion's song"
          intro="Recorded a hymn, an original worship song, or a choir arrangement? Share it with the community — every submission is reviewed with care before it's published."
        />
        <Reveal className="mt-8">
          <form
            onSubmit={submit}
            className="grid gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-[1fr_1.2fr] sm:p-8"
          >
            {/* Drop zone (visual only) */}
            <button
              type="button"
              onClick={() => pushToast("Choose an audio file to upload 🎙️", "default")}
              className="group flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border-strong bg-surface-2/40 p-6 text-center transition-colors hover:border-accent hover:bg-accent-soft/40"
            >
              <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent-strong transition-transform group-hover:scale-105 dark:text-accent">
                <Icon name="Upload" size={26} />
              </span>
              <span className="text-sm font-semibold text-ink">
                Drop your recording here
              </span>
              <span className="text-xs text-muted">MP3, WAV or M4A · up to 50 MB</span>
            </button>

            {/* Details */}
            <div className="flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Title</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Come, Come, Ye Saints — Family Arrangement"
                  className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Tell us about your song — who's singing, the occasion, and what it means to you."
                  className="w-full resize-none rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 text-xs text-faint">
                  <Icon name="ShieldCheck" size={13} /> Reviewed for reverence before publishing
                </p>
                <Button type="submit" variant="accent" icon="Send">
                  Submit for review
                </Button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
