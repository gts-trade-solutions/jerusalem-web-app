export interface NavItem {
  href: string;
  label: string;
  short: string;
  icon: string;
  blurb: string;
}

/** Canonical top navigation — names must match the brief exactly. */
export const NAV: NavItem[] = [
  { href: "/", label: "Home", short: "Home", icon: "Home", blurb: "The gathering starts here" },
  { href: "/neighbor", label: "Loving Our Neighbor", short: "Neighbor", icon: "Heart", blurb: "Pray, serve, and lift one another" },
  { href: "/faith", label: "Sharing Our Faith in Christ", short: "Faith", icon: "BookOpen", blurb: "Testify, study, and invite" },
  { href: "/unity", label: "Open Invitations to Unity", short: "Unity", icon: "Users", blurb: "Of one heart and one mind" },
  { href: "/music", label: "Worshipping Christ through Music", short: "Music", icon: "Music", blurb: "The song of the righteous" },
  { href: "/events", label: "Neighborhood B&B Events", short: "Events", icon: "CalendarDays", blurb: "Barbecue & Book of Mormon" },
  { href: "/security", label: "Security & More", short: "Security", icon: "ShieldCheck", blurb: "Your safety, our priority" },
];

export const brand = {
  name: "New Jerusalem",
  tagline: "Hasten the Gathering and Unity in Zion",
};
