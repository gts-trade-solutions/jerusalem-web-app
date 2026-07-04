import type { ScriptureRef } from "@/types";

/** Scripture-ribbon sets keyed per page + a featured verse for each. */
export interface RibbonSet {
  featured: { text: string; ref: string };
  refs: ScriptureRef[];
}

export const ribbons: Record<string, RibbonSet> = {
  home: {
    featured: {
      text: "For behold, this is my work and my glory — to bring to pass the immortality and eternal life of man.",
      ref: "Moses 1:39",
    },
    refs: [
      { book: "Moses", ref: "Moses 1:39" },
      { book: "3 Nephi", ref: "3 Nephi 16:15" },
      { book: "D&C", ref: "D&C 29:7" },
      { book: "Isaiah", ref: "Isaiah 2:2" },
      { book: "Moses", ref: "Moses 7:18" },
    ],
  },
  neighbor: {
    featured: {
      text: "When ye are in the service of your fellow beings ye are only in the service of your God.",
      ref: "Mosiah 2:17",
    },
    refs: [
      { book: "Mosiah", ref: "Mosiah 2:17" },
      { book: "Matthew", ref: "Matthew 25:40" },
      { book: "Galatians", ref: "Galatians 6:2" },
      { book: "James", ref: "James 1:27" },
      { book: "Moroni", ref: "Moroni 7:47" },
    ],
  },
  faith: {
    featured: {
      text: "And we talk of Christ, we rejoice in Christ, we preach of Christ… that our children may know to what source they may look for a remission of their sins.",
      ref: "2 Nephi 25:26",
    },
    refs: [
      { book: "2 Nephi", ref: "2 Nephi 25:26" },
      { book: "John", ref: "John 3:16" },
      { book: "Moroni", ref: "Moroni 10:4" },
      { book: "Ether", ref: "Ether 12:27" },
      { book: "D&C", ref: "D&C 19:23" },
    ],
  },
  unity: {
    featured: {
      text: "Be one; and if ye are not one ye are not mine.",
      ref: "Doctrine & Covenants 38:27",
    },
    refs: [
      { book: "D&C", ref: "D&C 38:27" },
      { book: "Moses", ref: "Moses 7:18" },
      { book: "John", ref: "John 17:21" },
      { book: "Ephesians", ref: "Ephesians 4:13" },
      { book: "4 Nephi", ref: "4 Nephi 1:15" },
    ],
  },
  music: {
    featured: {
      text: "For my soul delighteth in the song of the heart; yea, the song of the righteous is a prayer unto me.",
      ref: "Doctrine & Covenants 25:12",
    },
    refs: [
      { book: "D&C", ref: "D&C 25:12" },
      { book: "Psalms", ref: "Psalm 95:1" },
      { book: "Alma", ref: "Alma 5:26" },
      { book: "Colossians", ref: "Colossians 3:16" },
      { book: "Mosiah", ref: "Mosiah 18:30" },
    ],
  },
  events: {
    featured: {
      text: "And they did break bread from house to house… with gladness and singleness of heart.",
      ref: "Acts 2:46",
    },
    refs: [
      { book: "Acts", ref: "Acts 2:46" },
      { book: "Mosiah", ref: "Mosiah 18:21" },
      { book: "3 Nephi", ref: "3 Nephi 18:22" },
      { book: "Hebrews", ref: "Hebrews 13:2" },
      { book: "Moroni", ref: "Moroni 6:5" },
    ],
  },
  security: {
    featured: {
      text: "Be still, and know that I am God.",
      ref: "Psalm 46:10",
    },
    refs: [
      { book: "Psalms", ref: "Psalm 46:10" },
      { book: "D&C", ref: "D&C 6:36" },
      { book: "Isaiah", ref: "Isaiah 32:18" },
      { book: "Proverbs", ref: "Proverbs 3:5" },
      { book: "Helaman", ref: "Helaman 5:12" },
    ],
  },
};
