import type { ScriptureRef } from "@/types";

/** Scripture-ribbon sets keyed per page + a featured verse for each. */
export interface RibbonSet {
  featured: { text: string; ref: string };
  /** optional second line, e.g. an Articles of Faith statement */
  secondary?: { text: string; ref: string };
  refs: ScriptureRef[];
}

export const ribbons: Record<string, RibbonSet> = {
  home: {
    featured: {
      text: "That there should be no poor among you.",
      ref: "Deuteronomy 15:4",
    },
    secondary: {
      text: "We believe in being honest, true, chaste, benevolent, virtuous, and in doing good to all men.",
      ref: "Articles of Faith 1:13",
    },
    refs: [
      { book: "Moses", ref: "Moses 7:18" },
      { book: "Mosiah", ref: "Mosiah 4:26" },
      { book: "Mosiah", ref: "Mosiah 18:27" },
      { book: "Mosiah", ref: "Mosiah 27:4" },
      { book: "Alma", ref: "Alma 1:26" },
      { book: "Romans", ref: "Romans 15:26" },
      { book: "D&C", ref: "D&C 136:28" },
      { book: "D&C", ref: "D&C 25:12" },
      { book: "2 Chronicles", ref: "2 Chronicles 29:30" },
      { book: "2 Samuel", ref: "2 Samuel 6:5" },
      { book: "1 Chronicles", ref: "1 Chronicles 25:3" },
      { book: "Mormon", ref: "Mormon 7:7" },
      { book: "1 Samuel", ref: "1 Samuel 16:23" },
      { book: "1 Chronicles", ref: "1 Chronicles 25:6" },
      { book: "Ezekiel", ref: "Ezekiel 40:44" },
      { book: "Psalms", ref: "Psalm 96:1" },
      { book: "Isaiah", ref: "Isaiah 42:10" },
      { book: "Psalms", ref: "Psalm 147:7" },
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
      text: "The Lord is my light and my salvation; whom shall I fear?",
      ref: "Psalm 27:1",
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
