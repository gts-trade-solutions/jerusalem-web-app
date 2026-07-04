import type { HomeTheme, ReadingPlan } from "@/types";

export const homeThemes: HomeTheme[] = [
  {
    id: "gathering",
    eyebrow: "Come, Come, Ye Saints",
    title: "Hasten the Gathering, Together",
    subtitle:
      "A covenant community for Latter-day Saints and searching friends — gathering scattered Israel one open door, one shared meal, one testimony at a time.",
    verse: {
      text: "And it shall come to pass that I will gather my people together as a man gathereth his sheep.",
      ref: "3 Nephi 16:15",
    },
    gradient:
      "radial-gradient(120% 90% at 12% -10%, rgba(214,171,84,0.45), transparent 55%), radial-gradient(130% 120% at 100% 0%, rgba(58,106,93,0.35), transparent 55%), linear-gradient(160deg, #17162b, #241f3f 60%, #2c2547)",
    featureCards: [
      { id: "fc-g1", icon: "DoorOpen", title: "Open Every Door", body: "Turn ordinary front porches into gathering places. Host a table, welcome a neighbor, watch Zion grow." },
      { id: "fc-g2", icon: "HeartHandshake", title: "Lift One Another", body: "Pray for real needs, answer real needs. A community that carries each other's burdens as Christ carried ours." },
      { id: "fc-g3", icon: "Sparkles", title: "Testify of Christ", body: "Share the light you've found. Every testimony shared is another lamp lit on the covenant path." },
    ],
    scriptures: [
      { book: "Doctrine & Covenants", ref: "D&C 29:7" },
      { book: "3 Nephi", ref: "3 Nephi 16:15" },
      { book: "Isaiah", ref: "Isaiah 54:2" },
      { book: "Moses", ref: "Moses 7:18" },
    ],
  },
  {
    id: "heritage",
    eyebrow: "Gathering Scattered Israel",
    title: "A Covenant People, Across Every Sea",
    subtitle:
      "From every nation, kindred, and tongue — the Lord is gathering His covenant family home. Discover your place in a heritage that spans the whole earth.",
    verse: {
      text: "I will take you one of a city, and two of a family, and I will bring you to Zion.",
      ref: "Jeremiah 3:14",
    },
    gradient:
      "radial-gradient(120% 100% at 85% -10%, rgba(214,171,84,0.4), transparent 55%), radial-gradient(120% 120% at 0% 10%, rgba(43,90,79,0.4), transparent 55%), linear-gradient(200deg, #141327, #201b39 55%, #322a4d)",
    featureCards: [
      { id: "fc-h1", icon: "Globe2", title: "One Family, Many Lands", body: "Temples from Laie to Accra to Rome — a gathering that knows no border and forgets no soul." },
      { id: "fc-h2", icon: "ScrollText", title: "Roots of the Restoration", body: "Walk the covenant story from Joseph's grove to your own kitchen table. The Restoration is still unfolding." },
      { id: "fc-h3", icon: "Users", title: "Belonging for the Newcomer", body: "No one gathers alone. Find a fellowship group, a mentor, and a people who will call you by name." },
    ],
    scriptures: [
      { book: "Jeremiah", ref: "Jeremiah 3:14" },
      { book: "1 Nephi", ref: "1 Nephi 22:25" },
      { book: "Doctrine & Covenants", ref: "D&C 110:11" },
      { book: "Articles of Faith", ref: "A of F 1:10" },
    ],
  },
  {
    id: "welfare",
    eyebrow: "No Poor Among Us",
    title: "That There Be No Poor Among You",
    subtitle:
      "Zion is a people of one heart who leave no one behind. Practical service, provident living, and self-reliance — faith made visible in the hands that serve.",
    verse: {
      text: "And they had all things common among them; therefore there were not rich and poor.",
      ref: "4 Nephi 1:3",
    },
    gradient:
      "radial-gradient(110% 90% at 20% 110%, rgba(58,106,93,0.5), transparent 55%), radial-gradient(120% 120% at 100% 0%, rgba(214,171,84,0.35), transparent 55%), linear-gradient(150deg, #16182c, #1f2439 55%, #2a3348)",
    featureCards: [
      { id: "fc-w1", icon: "HandHeart", title: "Serve With Your Hands", body: "Find a JustServe project near you today. Faith without works is quiet; Zion is loud with love." },
      { id: "fc-w2", icon: "Sprout", title: "Build Self-Reliance", body: "Employment, education, and finances — courses and circles that help every family stand on its own feet." },
      { id: "fc-w3", icon: "Wheat", title: "Share the Harvest", body: "Meal coordination, storehouse drives, and neighborly generosity that make sure every table is full." },
    ],
    scriptures: [
      { book: "4 Nephi", ref: "4 Nephi 1:3" },
      { book: "Moses", ref: "Moses 7:18" },
      { book: "Mosiah", ref: "Mosiah 4:26" },
      { book: "Doctrine & Covenants", ref: "D&C 104:18" },
    ],
  },
];

export const readingPlans: ReadingPlan[] = [
  { id: "rp-ot", label: "Old Testament", reference: "Isaiah 40–43", read: 28, total: 39 },
  { id: "rp-nt", label: "New Testament", reference: "John 14–17", read: 21, total: 27 },
  { id: "rp-bom", label: "Book of Mormon", reference: "Alma 32", read: 47, total: 65 },
];
