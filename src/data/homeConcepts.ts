/** The three rotating Home concepts — each an exact ditto of its reference. */

export type Accent = "gold" | "teal";
export type IconBg = "teal" | "brown";
export type RibbonDeco = "skyline" | "flourish";

export interface ConceptCard {
  icon: string;
  iconBg: IconBg;
  title: string;
  body: string;
  image?: string; // card thumbnail (heritage / pioneer layouts)
}

export interface HomeConceptData {
  id: string;
  accent: Accent;
  layout: "welfare6" | "image3";
  title: string;
  /** teal serif accent line under the title (heritage / pioneer) */
  accentLine?: string;
  paragraph: string;
  heroImage: string;
  heroChip?: { title: string; sub: string };
  sectionTitle: string;
  cards: ConceptCard[];
  promise: {
    text: string;
    verse?: string;
    ref?: string;
    feather?: boolean;
  };
  ribbon: {
    bg: "navy" | "green" | "teal";
    deco: RibbonDeco;
    verse: string;
    ref?: string;
    secondary?: { text: string; ref: string };
    refs: string[];
  };
}

export const homeConcepts: HomeConceptData[] = [
  {
    id: "welfare",
    accent: "gold",
    layout: "welfare6",
    title: "No Poor\nAmong Us",
    paragraph:
      "As disciples of Christ, we care for one another and lift those in need. Together, we build self-reliant communities where no one lacks the necessities of life. Inspired by the commandment to “remember the poor,” we ensure that everyone has access to food, skills, opportunities, and support.",
    heroImage: "/images/hero-no-poor.jpg",
    sectionTitle: "How We Care for One Another",
    cards: [
      { icon: "Wheat", iconBg: "brown", title: "Bread", body: "Ensure access to nutritious food for all through pantries, meals, and community support." },
      { icon: "Sprout", iconBg: "brown", title: "Gardens", body: "Grow together. Share produce. Strengthen families and neighborhoods." },
      { icon: "Bird", iconBg: "brown", title: "Chickens", body: "Provide resources and training for raising poultry and sustainable food." },
      { icon: "Users", iconBg: "brown", title: "Self-Reliance Groups", body: "Join with others to learn, create, and achieve economic and spiritual independence." },
      { icon: "Briefcase", iconBg: "brown", title: "Employment Leads", body: "Find job opportunities, training, and support for meaningful work." },
      { icon: "Handshake", iconBg: "brown", title: "Community Resources", body: "Connect to local aid, services, and tools that build stronger lives." },
    ],
    promise: {
      text: "No one in our community will walk alone. Together, we serve, uplift, and rejoice in the blessings of Zion, where all things are shared in love.",
      verse: "And there were no poor among them.",
      ref: "Moses 7:18",
    },
    ribbon: {
      bg: "navy",
      deco: "skyline",
      verse: "That there should be no poor among you.",
      ref: "Deuteronomy 15:4",
      secondary: {
        text: "We believe in being honest, true, chaste, benevolent, virtuous, and in doing good to all men.",
        ref: "Articles of Faith 1:13",
      },
      refs: [
        "Moses 7:18", "Mosiah 4:26", "Mosiah 18:27", "Mosiah 29:4", "Alma 1:26", "Romans 12:13",
        "D&C 38:25-26", "D&C 51:12", "2 Chronicles 29:30", "2 Samuel 6:5", "1 Chronicles 25:3",
        "Mormon 7:7", "1 Samuel 16:23", "1 Chronicles 25:6", "Ezekiel 40:44", "Psalm 96:1",
        "Isaiah 42:10", "Psalm 14:7",
      ],
    },
  },
  {
    id: "heritage",
    accent: "teal",
    layout: "image3",
    title: "Gathering Scattered Israel",
    accentLine: "Honoring heritage, building Zion together.",
    paragraph:
      "We are one people—rooted in covenant, called to return, and united in Christ. Together, we reclaim our strength, preserve our heritage, and build a future of faith, family, and freedom in Zion.",
    heroImage: "/images/hero-heritage.jpg",
    sectionTitle: "How We Gather and Build Together",
    cards: [
      { icon: "Briefcase", iconBg: "teal", title: "Employment Leads", body: "Find meaningful job opportunities through tribal, community, and faith-based networks.", image: "/images/her-card1.jpg" },
      { icon: "ScrollText", iconBg: "brown", title: "Preserving Your Culture", body: "Access language resources, art, stories, and tradition archives to preserve and pass down our heritage.", image: "/images/her-card2.jpg" },
      { icon: "GraduationCap", iconBg: "teal", title: "Education Options", body: "Explore scholarships, training, and mentorship programs for all ages and callings.", image: "/images/her-card3.jpg" },
    ],
    promise: {
      text: "We walk together in truth, honor our ancestors, and build Zion for future generations, through Christ, our cornerstone.",
      feather: true,
    },
    ribbon: {
      bg: "teal",
      deco: "flourish",
      verse: "He shall set up an ensign for the nations, and shall assemble the outcasts of Israel.",
      refs: [
        "3 Nephi 20:22", "3 Nephi 21:23", "Ether 13:8", "Ether 13:6", "3 Nephi 21:24",
        "3 Nephi 21:26", "Mormon 5:20", "3 Nephi 21:2", "3 Nephi 20:28", "3 Nephi 20:15", "3 Nephi 20:16",
      ],
    },
  },
  {
    id: "pioneer",
    accent: "teal",
    layout: "image3",
    title: "Come, Come,\nYe Saints—",
    accentLine: "relocated by the Spirit to Independence.",
    paragraph:
      "We are one people—rooted in covenant, relocated by the Spirit, and united in Christ. Together, we develop our strength, preserve our heritage, and build a future of faith, family, and freedom in Zion.",
    heroImage: "/images/hero-pioneer.jpg",
    heroChip: { title: "Kansas City Temple", sub: "Our beacon and covenant center" },
    sectionTitle: "How We Gather and Build Together",
    cards: [
      { icon: "House", iconBg: "teal", title: "Pioneer Crossing Development", body: "A faith-filled community planned near the Kansas City Temple—built for families, rooted in Zion.", image: "/images/pio-card1.jpg" },
      { icon: "Users", iconBg: "brown", title: "Modern Pioneers", body: "Stories of families answering the call to gather, relocate, and build Zion communities today.", image: "/images/pio-card2.jpg" },
      { icon: "Leaf", iconBg: "teal", title: "Faith Journeys", body: "Testimonies of sacrifice, hope, and miracles as Saints build Zion across generations.", image: "/images/pio-card3.jpg" },
    ],
    promise: {
      text: "We walk together in truth, honor our ancestors, and build Zion for future generations, through Christ, our cornerstone.",
      feather: true,
    },
    ribbon: {
      bg: "green",
      deco: "flourish",
      verse: "Come, come, ye Saints, no toil nor labor fear.",
      refs: [
        "3 Nephi 21:14", "Mosiah 5:10", "Zechariah 9:10", "Moses 7:66", "3 Nephi 20:24",
        "3 Nephi 21:27", "3 Nephi 21:28",
      ],
    },
  },
];
