import type { Person } from "@/types";

export const people: Person[] = [
  { id: "p-eliza", name: "Eliza Whitmer", role: "Leader", locale: "Provo 3rd Ward", badges: ["Verified", "Relief Society"], avatar: "eliza" },
  { id: "p-david", name: "David Kimball", role: "Host", locale: "Cedar Hills", badges: ["Verified Host", "B&B Founder"], avatar: "david" },
  { id: "p-sariah", name: "Sariah Benson", role: "Member", locale: "American Fork", badges: ["Verified"], avatar: "sariah" },
  { id: "p-moroni", name: "Moroni Tuiasosopo", role: "Member", locale: "Laie 2nd Ward", badges: ["Verified", "Choir"], avatar: "moroni" },
  { id: "p-hannah", name: "Hannah Pratt", role: "Youth", locale: "Lehi Youth", badges: ["Youth"], avatar: "hannah" },
  { id: "p-samuel", name: "Samuel Okafor", role: "Leader", locale: "Accra Ghana Stake", badges: ["Verified", "Elders Quorum"], avatar: "samuel" },
  { id: "p-ruth", name: "Ruth Nakamura", role: "Host", locale: "Sandy Heights", badges: ["Verified Host"], avatar: "ruth" },
  { id: "p-caleb", name: "Caleb Anderson", role: "Member", locale: "Spanish Fork", badges: ["Verified"], avatar: "caleb" },
  { id: "p-mireya", name: "Mireya Cordova", role: "Member", locale: "Mesa 9th Ward", badges: ["Verified", "Self-Reliance"], avatar: "mireya" },
  { id: "p-jonah", name: "Jonah Rees", role: "Youth", locale: "Draper Youth", badges: ["Youth", "Choir"], avatar: "jonah" },
  { id: "p-abigail", name: "Abigail Stott", role: "Member", locale: "Highland 5th Ward", badges: ["Verified"], avatar: "abigail" },
  { id: "p-thomas", name: "Thomas Brubaker", role: "Leader", locale: "Bishopric", badges: ["Verified", "Bishopric"], avatar: "thomas" },
];

export const byId = (id: string): Person =>
  people.find((p) => p.id === id) ?? people[0];

/** The signed-in demo persona (mutable role handled by UserContext). */
export const demoUser: Person = {
  id: "p-you",
  name: "Emma Larsen",
  role: "Member",
  locale: "Orem 12th Ward",
  badges: ["Verified"],
  avatar: "emma",
};
