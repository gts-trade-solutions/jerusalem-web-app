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
    gradient: "",
    image: "hero-pioneer",
    accent: "teal",
    sectionTitle: "How We Gather and Build Together",
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
    gradient: "",
    image: "hero-heritage",
    accent: "teal",
    sectionTitle: "How We Gather and Build Together",
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
    gradient: "",
    image: "hero-welfare",
    accent: "gold",
    sectionTitle: "How We Care for One Another",
    featureCards: [
      { id: "fc-w1", icon: "Wheat", title: "Bread", body: "Ensure access to nutritious food for all through pantries, meals, and community support." },
      { id: "fc-w2", icon: "Sprout", title: "Gardens", body: "Grow together and share produce. Strengthen families and neighborhoods with the harvest." },
      { id: "fc-w3", icon: "Sun", title: "Chickens", body: "Provide resources and training for raising poultry and building sustainable food at home." },
      { id: "fc-w4", icon: "Users", title: "Self-Reliance Groups", body: "Join with others to learn, create, and achieve economic and spiritual independence." },
      { id: "fc-w5", icon: "Briefcase", title: "Employment Leads", body: "Find job opportunities, training, and support for meaningful, dignified work." },
      { id: "fc-w6", icon: "Handshake", title: "Community Resources", body: "Connect to local aid, services, and tools that build stronger lives together." },
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
