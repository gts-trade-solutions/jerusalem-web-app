import type { Circle, Group } from "@/types";

export const groups: Group[] = [
  {
    id: "g-1",
    kind: "fellowship",
    name: "Come Unto Christ Fellowship",
    description: "A weeknight gathering for new members and returning friends to study, question, and belong without pressure.",
    schedule: "Wednesdays · 7:00 PM",
    memberCount: 28,
  },
  {
    id: "g-2",
    kind: "fellowship",
    name: "Young Adult Gathering — Zion Rising",
    description: "Institute-aged Saints building real friendships around service, scripture, and the occasional midnight taco run.",
    schedule: "Thursdays · 8:00 PM",
    memberCount: 41,
  },
  {
    id: "g-3",
    kind: "sisterCircle",
    name: "Sisters in Zion Circle",
    description: "Mentorship, meals, and honest conversation among women covenant-bound to lift one another.",
    schedule: "1st & 3rd Tuesdays",
    memberCount: 34,
  },
  {
    id: "g-4",
    kind: "choir",
    name: "Cedar Valley Community Choir",
    description: "An all-are-welcome choir preparing sacred music for worship nights and temple broadcasts.",
    schedule: "Sundays · 5:00 PM",
    memberCount: 52,
  },
  {
    id: "g-5",
    kind: "selfReliance",
    name: "Provident Living Self-Reliance Group",
    description: "Twelve-week course cohorts for employment, education, and personal finances — that there be no poor among us.",
    schedule: "Mondays · 6:30 PM",
    memberCount: 16,
  },
  {
    id: "g-6",
    kind: "fellowship",
    name: "Neighborhood B&B Hosts Network",
    description: "The hosts behind Barbecue & Book of Mormon nights — sharing recipes, discussion guides, and encouragement.",
    schedule: "Monthly · 1st Saturday",
    memberCount: 23,
  },
];

export const circles: Circle[] = [
  { id: "c-1", name: "Provo Valley Sisters", focus: "Newcomers & young mothers", cadence: "Weekly", members: 19, lead: "Eliza Whitmer" },
  { id: "c-2", name: "Grief & Grace Circle", focus: "Widows and those who mourn", cadence: "Bi-weekly", members: 12, lead: "Ruth Nakamura" },
  { id: "c-3", name: "Rising Daughters Mentorship", focus: "Youth & young single adults", cadence: "Monthly", members: 26, lead: "Abigail Stott" },
];
