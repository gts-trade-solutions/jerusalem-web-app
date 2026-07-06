/**
 * New Jerusalem — shared domain types.
 * Kept framework-agnostic (plain TS) so a future React Native app can reuse them.
 */

export type Role = "Member" | "Host" | "Youth" | "Leader" | "Guest";

export type Theme = "light" | "dark";

export interface Person {
  id: string;
  name: string;
  avatar?: string;
  role: Role;
  badges: string[];
  /** short place / calling line, e.g. "Provo 3rd Ward" */
  locale?: string;
}

export type EventType = "bb" | "worship" | "fellowship" | "livestream";

export interface EventItem {
  id: string;
  type: EventType;
  title: string;
  description: string;
  start: string; // ISO
  location: string;
  hostName: string;
  image?: string;
  going: number;
  rsvped: boolean;
  /** map pin coords in a 0..100 normalized playfield */
  pin?: { x: number; y: number };
}

export type FeedKind = "prayer" | "testimony" | "leaderMessage" | "story";

export interface FeedItem {
  id: string;
  kind: FeedKind;
  title: string;
  body: string;
  author: Person;
  createdAt: string; // ISO
  status?: "needs" | "answered";
  reactions: number;
}

export type GroupKind = "fellowship" | "sisterCircle" | "choir" | "selfReliance";

export interface Group {
  id: string;
  kind: GroupKind;
  name: string;
  description: string;
  schedule?: string;
  memberCount: number;
}

export type MediaKind = "album" | "song" | "video";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  title: string;
  subtitle?: string;
  songCount?: number;
  durationSec?: number;
  cover?: string;
  /** for songs: which album it belongs to */
  albumId?: string;
  category?: "sacred" | "choir" | "youth" | "video";
}

export interface Temple {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  /** normalized 0..100 position on the stylized world map */
  pin: { x: number; y: number };
  dedicated: string;
  status: "operating" | "construction" | "announced";
}

export interface ScriptureRef {
  book: string;
  ref: string;
}

export interface FeatureCard {
  id: string;
  icon: string; // lucide icon name
  title: string;
  body: string;
}

export interface HomeTheme {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  verse: { text: string; ref: string };
  gradient: string; // css gradient string (legacy dark wash; unused in light theme)
  image: string; // curated hero image key
  accent: "gold" | "green" | "teal";
  sectionTitle: string; // "How We Gather and Build Together"
  featureCards: FeatureCard[];
  scriptures: ScriptureRef[];
}

export interface ReadingPlan {
  id: string;
  label: string;
  reference: string;
  read: number;
  total: number;
}

export interface Circle {
  id: string;
  name: string;
  focus: string;
  cadence: string;
  members: number;
  lead: string;
}
