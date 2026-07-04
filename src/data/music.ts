import type { MediaItem } from "@/types";

export const albums: MediaItem[] = [
  { id: "al-1", kind: "album", title: "Hymns of the Restoration", subtitle: "Cedar Valley Choir", songCount: 12, cover: "hymns-restoration", category: "sacred" },
  { id: "al-2", kind: "album", title: "Come, Come, Ye Saints", subtitle: "Pioneer Sacred Collection", songCount: 9, cover: "come-ye-saints", category: "sacred" },
  { id: "al-3", kind: "album", title: "Songs of Zion's Dawn", subtitle: "Tabernacle Sessions", songCount: 10, cover: "zions-dawn", category: "sacred" },
  { id: "al-4", kind: "album", title: "Children of the Covenant", subtitle: "Primary & Family Voices", songCount: 8, cover: "children-covenant", category: "sacred" },
  { id: "al-5", kind: "album", title: "Sacred Strings & Reverence", subtitle: "Instrumental Worship", songCount: 11, cover: "sacred-strings", category: "sacred" },
  { id: "al-6", kind: "album", title: "Testify of Christ", subtitle: "Original Worship Nights", songCount: 7, cover: "testify-christ", category: "sacred" },
];

export const songs: MediaItem[] = [
  { id: "sg-1", kind: "song", title: "Come, Come, Ye Saints", subtitle: "Cedar Valley Choir", durationSec: 258, albumId: "al-2", cover: "come-ye-saints", category: "sacred" },
  { id: "sg-2", kind: "song", title: "The Spirit of God", subtitle: "Tabernacle Sessions", durationSec: 221, albumId: "al-1", cover: "hymns-restoration", category: "sacred" },
  { id: "sg-3", kind: "song", title: "I Need Thee Every Hour", subtitle: "Sariah Benson", durationSec: 244, albumId: "al-3", cover: "zions-dawn", category: "sacred" },
  { id: "sg-4", kind: "song", title: "Praise to the Man", subtitle: "Cedar Valley Choir", durationSec: 197, albumId: "al-2", cover: "come-ye-saints", category: "sacred" },
  { id: "sg-5", kind: "song", title: "Nearer, My God, to Thee", subtitle: "Sacred Strings", durationSec: 273, albumId: "al-5", cover: "sacred-strings", category: "sacred" },
  { id: "sg-6", kind: "song", title: "If You Could Hie to Kolob", subtitle: "Zion's Dawn", durationSec: 312, albumId: "al-3", cover: "zions-dawn", category: "sacred" },
  { id: "sg-7", kind: "song", title: "How Firm a Foundation", subtitle: "Cedar Valley Choir", durationSec: 236, albumId: "al-1", cover: "hymns-restoration", category: "sacred" },
  { id: "sg-8", kind: "song", title: "Called to Serve (Youth Anthem)", subtitle: "Draper Youth Choir", durationSec: 189, albumId: "al-6", cover: "testify-christ", category: "youth" },
];

export const videos: MediaItem[] = [
  { id: "vd-1", kind: "video", title: "The Gathering — A Youth Restoration Film", subtitle: "Draper Youth Music · 6:12", cover: "youth-film", category: "youth" },
  { id: "vd-2", kind: "video", title: "Behold the Lamb of God — Choir Feature", subtitle: "Cedar Valley Choir · 4:48", cover: "choir-feature", category: "video" },
  { id: "vd-3", kind: "video", title: "Come Unto Christ — Original Song", subtitle: "Jonah Rees · 3:57", cover: "original-song", category: "youth" },
  { id: "vd-4", kind: "video", title: "Sabbath Reflections — Instrumental", subtitle: "Sacred Strings · 8:20", cover: "sabbath-reflections", category: "video" },
  { id: "vd-5", kind: "video", title: "Sisters' Worship Night — Live", subtitle: "Sisters in Zion · 5:33", cover: "sisters-worship", category: "video" },
  { id: "vd-6", kind: "video", title: "Hasten the Work — Missionary Anthem", subtitle: "Youth Choir Collective · 4:05", cover: "missionary-anthem", category: "youth" },
];

export const allMedia: MediaItem[] = [...albums, ...songs, ...videos];
export const mediaById = (id: string) => allMedia.find((m) => m.id === id);
