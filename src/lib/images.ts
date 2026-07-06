/**
 * Curated sacred imagery — every photo below was visually verified as
 * faith-appropriate (worship, scripture, chapels, fellowship, dawn light).
 * All slots resolve through this manifest so no random/unrelated photo can
 * ever appear in the app.
 */

const UNSPLASH = "https://images.unsplash.com";

/** Verified photo library, keyed by a semantic name. */
export const LIBRARY: Record<string, string> = {
  // golden-hour section hero banners (light, warm, sacred)
  "temple-golden": "photo-1470252649378-9c29740c9fa8", // golden sunrise field
  "stained-glass": "photo-1519681393784-d120267933ba", // sunlit stained-glass chapel
  "misty-lake": "photo-1477322524744-0eece9e79640", // still misty forest lake
  "lavender-dawn": "photo-1499002238440-d264edd596ec", // lavender field at first light

  // worship & church spaces
  "worship-night-warm": "photo-1438232992991-995b7058bbb3", // congregation, warm light, raised hand
  "cathedral-arches": "photo-1473177104440-ffee2f376098", // white chapel arches, morning light
  "jesus-worship": "photo-1507692049790-de58290a4334", // "JESUS" lifted at a worship night
  "church-cross": "photo-1477672680933-0287a151330e", // chapel exterior against blue sky
  "ward-meeting": "photo-1523580494863-6f3031224c94", // congregation gathered for a broadcast

  // scripture & study
  "scripture-pages": "photo-1504052434569-70ad5836ab65", // hand turning Bible pages
  "scripture-dark": "photo-1533000971552-6a962ff0b9f9", // open Bible in candle-dark
  "scripture-sunlight": "photo-1506880018603-83d5b814b5a6", // scriptures held in golden light
  "scripture-grass": "photo-1476275466078-4007374efbbe", // open book resting outdoors
  "glowing-book": "photo-1519791883288-dc8bd696e667", // book aglow with soft lights
  "study-flatlay": "photo-1544716278-ca5e3f4abd8c", // quiet morning study
  "study-notes": "photo-1529070538774-1843cb3265df", // note-taking in a class
  "children-reading": "photo-1476234251651-f353703a034d", // two children sharing scriptures
  "heritage-letters": "photo-1447069387593-a5de0862481e", // bundled letters of the Restoration era

  // prayer & devotion
  "praise-dusk": "photo-1508558936510-0af1e3cccbab", // arms raised at dusk
  "arms-sunburst": "photo-1499209974431-9dddcece7f88", // arms open to the rising sun

  // dawn light & creation
  "golden-dawn": "photo-1470252649378-9c29740c9fa8", // sunrise over a golden field
  "light-rays-peak": "photo-1548588681-adf41d474533", // rays breaking over a mountain
  "peaks-clouds": "photo-1506905925346-21bda4d32df4", // peaks above the clouds
  "forest-light": "photo-1441974231531-c6227db76b6e", // light through the pines
  "tree-light": "photo-1518495973542-4542c06a5843", // sun through a great tree
  "ridge-dusk": "photo-1500534314209-a25ddb2bd429", // still ridgelines at dusk
  "mountain-sunset": "photo-1548407260-da850faa41e3", // alpine sunset

  // sacred music
  "guitar-warm": "photo-1510915361894-db8b60106cb1",
  "piano-keys": "photo-1520523839897-bd0b52f945a0",
  "orchestra-strings": "photo-1465847899084-d164df4dedc6",
  "worship-crowd-gold": "photo-1459749411175-04bf5292ceea",
  "worship-crowd-amber": "photo-1470229722913-7c0e2dbbafd3",
  "youth-guitarist": "photo-1471478331149-c72f17e33c73",
  "sheet-music": "photo-1507838153414-b4b713384a76",
  "studio-mic": "photo-1514320291840-2e0a9bf2a9ae",

  // breaking bread together
  "fellowship-table": "photo-1414235077428-338989a2e8c0",
  "barbecue-feast": "photo-1555939594-58d7cb561ad1",
  "barbecue-ribs": "photo-1544025162-d76694265947",
  "bread-wheat": "photo-1509440159596-0249088772ff",
  "bakery-loaves": "photo-1517433670267-08bbd4be890f",
  "gathered-feast": "photo-1478145046317-39f10e56b5e9",

  // community, family & service
  "friends-together": "photo-1529156069898-49953e39b3ac",
  "sunset-gathering": "photo-1511632765486-a01980e01a18",
  "shoreline-gathering": "photo-1511895426328-dc8714191300",
  "mother-child": "photo-1445633629932-0029acc44e88",
  "children-joy": "photo-1488521787991-ed7bbaae773c",
  "children-gathered": "photo-1542810634-71277d95dcbb",
  "volunteer-service": "photo-1559027615-cd4628902d4a",
  "giving-hands": "photo-1532629345422-7515f3d16bb6",
  "hands-heart": "photo-1469571486292-0ba58a3f068b",
};

/** Exact app-seed → library-key aliases (event images, album covers, panels). */
const ALIASES: Record<string, string> = {
  // section hero banners
  "hero-home": "temple-golden",
  "hero-neighbor": "golden-dawn",
  "hero-faith": "cathedral-arches",
  "hero-unity": "lavender-dawn",
  "hero-music": "cathedral-arches",
  "hero-events": "golden-dawn",
  "hero-security": "mountain-sunset",
  "hero-welfare": "lavender-dawn",
  "hero-heritage": "misty-lake",
  "hero-pioneer": "mountain-sunset",

  // events
  "bbq-backyard": "barbecue-feast",
  "porch-evening": "sunset-gathering",
  "park-cookout": "shoreline-gathering",
  "taco-night": "gathered-feast",
  "fireside-candles": "worship-night-warm",
  "choir-loft": "orchestra-strings",
  "study-table": "study-notes",
  "bread-hands": "bread-wheat",
  "moving-boxes": "volunteer-service",
  "broadcast-hall": "ward-meeting",
  "temple-dawn": "cathedral-arches",
  "virtual-choir": "worship-crowd-gold",
  "new-gathering": "friends-together",

  // album / video covers
  "hymns-restoration": "sheet-music",
  "come-ye-saints": "golden-dawn",
  "zions-dawn": "peaks-clouds",
  "children-covenant": "children-reading",
  "sacred-strings": "orchestra-strings",
  "testify-christ": "jesus-worship",
  "youth-film": "youth-guitarist",
  "choir-feature": "worship-night-warm",
  "original-song": "guitar-warm",
  "sabbath-reflections": "piano-keys",
  "sisters-worship": "worship-crowd-amber",
  "missionary-anthem": "arms-sunburst",

  // named panel slots
  "sunrise-chapel-window-warm": "light-rays-peak",
  "daily-devotional-sunrise": "golden-dawn",
  "unity-gathering-table-candles": "fellowship-table",
  "story-share-hero": "sunset-gathering",
};

/** Keyword pools for dynamic seeds (story-*, leader-*, choir names, groups…). */
const KEYWORD_POOLS: [RegExp, string[]][] = [
  [/leader/i, ["ward-meeting", "scripture-dark", "cathedral-arches", "jesus-worship"]],
  [/story/i, ["sunset-gathering", "children-joy", "mother-child", "giving-hands", "friends-together"]],
  [/choir|ensemble|sing/i, ["orchestra-strings", "worship-night-warm", "sheet-music", "worship-crowd-gold"]],
  [/sister/i, ["mother-child", "bread-wheat", "friends-together"]],
  [/youth/i, ["youth-guitarist", "children-joy", "worship-crowd-amber"]],
  [/temple|chapel|church/i, ["cathedral-arches", "church-cross", "light-rays-peak"]],
  [/scripture|bible|book|study|read/i, ["scripture-sunlight", "scripture-dark", "glowing-book", "study-flatlay"]],
  [/pray|devot|worship/i, ["praise-dusk", "arms-sunburst", "worship-night-warm"]],
  [/serve|service|volunteer/i, ["volunteer-service", "giving-hands", "hands-heart"]],
  [/meal|bread|feast|dinner|food|bbq|barbecue/i, ["barbecue-feast", "bread-wheat", "gathered-feast", "bakery-loaves"]],
  [/group|fellowship|friend/i, ["friends-together", "sunset-gathering", "study-notes", "ward-meeting"]],
  [/music|song|hymn|play/i, ["guitar-warm", "piano-keys", "sheet-music", "studio-mic"]],
];

/** Reverent generic pool for anything unmatched. */
const GENERAL_POOL = [
  "golden-dawn",
  "light-rays-peak",
  "forest-light",
  "cathedral-arches",
  "scripture-dark",
  "ridge-dusk",
  "tree-light",
  "arms-sunburst",
  "mountain-sunset",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function resolveKey(seed: string): string {
  if (LIBRARY[seed]) return seed;
  if (ALIASES[seed]) return ALIASES[seed];
  for (const [re, pool] of KEYWORD_POOLS) {
    if (re.test(seed)) return pool[hash(seed) % pool.length];
  }
  return GENERAL_POOL[hash(seed) % GENERAL_POOL.length];
}

/** Resolve any seed to a curated, faith-appropriate image URL. */
export function sacredImage(seed: string, w: number, h: number): string {
  const id = LIBRARY[resolveKey(seed)];
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}
