# New Jerusalem

> *"Hasten the Gathering and Unity in Zion."*

A **frontend-only MVP** for a private, faith-centered community platform for a Latter-day Saint / Restoration audience. It is fully navigable with realistic dummy data — **no backend, no database, no real auth**. Everything is mocked in-memory via React Context and typed fixture files.

---

## Run it

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (clean, no type errors)
```

Node 20+ recommended (built and tested on Node 21).

---

## Design language — "Sanctuary"

The look is reverent, warm, and editorial — sacred without being stuffy, clean without being cold. The mood is **dawn light, gathering, covenant, belonging**.

- **Palette:** a deep midnight-indigo ink anchor, an antique-**brass** accent used sparingly for emphasis and active states, soft **parchment / bone** neutrals for surfaces, and a calm **sage** secondary. Both a **light** and a **dark** theme are first-class, toggled at runtime (persisted to `localStorage`, applied before first paint to avoid flash).
- **Typography:** an expressive display serif (**Fraunces**) paired with a clean sans (**Inter**), loaded via `next/font`. Real typographic hierarchy, generous line-height.
- **Texture & depth:** a subtle SVG paper-grain overlay, layered soft shadows, gentle dawn/gold gradient washes, rounded-but-not-bubbly corners.
- **Motion:** restrained framer-motion — scroll reveals, hover elevation, animated tab pills, counting stats, a progress-ring draw-in. Everything degrades gracefully under `prefers-reduced-motion`.
- **Signature recurring elements:** a dark **Scripture Ribbon** band near the foot of every page (illuminated drop-cap verse, temple-spire skyline transition, gold ornament), **chapel-arch window frames** on every section hero, **god-ray light shafts** in dark bands, a custom **arched-window + rising-sun logo mark**, and gold **ornamental dividers**.
- **Imagery:** every photographic slot resolves through a **curated sacred-image manifest** (`src/lib/images.ts`) of ~45 visually verified faith photographs — worship nights, open scriptures, chapel arches, shared meals, dawn light — so no random or off-theme photo can ever appear. A stained-glass gradient fallback sits under every image slot.

All of it is codified as **design tokens** — CSS variables in `src/app/globals.css` mapped into the Tailwind v4 theme via `@theme inline`, so components only ever reference semantic tokens (`bg`, `surface`, `ink`, `muted`, `accent`, `sage`, …). This keeps the tokens and TypeScript types framework-agnostic for a future React Native app.

---

## What's built

**Seven sections + simulated auth, all fully interactive:**

| Route | Section | Highlights |
|---|---|---|
| `/` | **Home** | Auto-rotating 3-theme dawn hero (Gathering / Heritage / Welfare) with manual dots, feature trio per theme, animated stats, quick-entry pillar grid, live "Gathering near you" strip, Our Promise band |
| `/neighbor` | **Loving Our Neighbor** | Prayer feed with working "Praying 🙏" counts, filters/sort, Add-Prayer modal; Sisters in Zion circles; JustServe map with pins; Stories of Love rail; My Service dashboard |
| `/faith` | **Sharing Our Faith in Christ** | Sidebar-driven: leader messages carousel + player modal, disciple testimony feed + share modal, reading-plan progress rings, temple-heritage world map, daily worship |
| `/unity` | **Invitation to Unity** | One-heart pillars, You're Invited feature, events grid with RSVP, livestream schedule with Watch modals, fellowship groups with Join |
| `/music` | **Worshipping Christ Through Music** | Album/track lists that load into the **persistent MediaPlayer** bar, choirs with Join, youth video modals, worship events, Share Your Music upload UI |
| `/events` | **Neighborhood B&B Events** | The signature loop — upcoming list + detail modal **and** detail route, event map with "Use My Location", Host Tools with a create-event form that injects live events, discussion guides, My B&B Activity |
| `/security` | **Security & More** | Four pillar modals with real toggles: account verification, youth safety (role-aware), community trust, secure sign-in with device management |
| `/auth/sign-in`, `/auth/sign-up` | **Auth (simulated)** | Split-screen dawn form, client-side validation, role select, "continue as guest" — sets a demo user in context and routes home |

**Every** nav link, sub-tab, button, filter, toggle, and modal does something visible — RSVP toggles update counts, prayer/testimony/event modals inject items into session state, tracks play into the persistent bar, and actions raise toasts.

### Reviewer conveniences
A tucked-away **settings popover** in the top bar holds a **Role switcher** (Member / Host / Youth / Leader / Guest) and a **theme toggle**. Changing role visibly affects badges, Host-tool prompts, and the Youth-safety UI. Theme persists across navigation.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (token-driven theme)
- **framer-motion** for motion · **lucide-react** for icons
- **clsx** + **tailwind-merge** (`cn()` helper)
- State: React `useState`/`useReducer` + Contexts (theme, user/role, media player, app data). `localStorage` only for theme + demo role, read inside `useEffect`.

No data-fetching, auth, or state libraries beyond React Context.

---

## Where the dummy data lives

All typed fixtures are in **`src/data/`**, with shared types in **`src/types.ts`**:

- `events.ts` — 12 events across `bb` / `worship` / `fellowship` / `livestream` (one array powers every events surface via `type`)
- `feed.ts` — prayers, testimonies, leader messages, and stories (one `FeedItem` shape)
- `groups.ts` — fellowship / sister-circle / choir / self-reliance groups + circles
- `music.ts` — albums, songs, videos
- `temples.ts` — temples with map coordinates
- `homeThemes.ts` — the three rotating home themes + reading plans
- `scriptures.ts` — per-page scripture-ribbon sets
- `people.ts` — community members + the demo user

## Project structure

```
src/
  app/                 layout (fonts, providers, nav, player, footer) + all routes
  components/
    ui/                design-system primitives (Button, Card, Modal, SubTabs, …)
    sections/          per-section building blocks (home/, neighbor/, faith/, …)
    *.tsx              shared feature components (EventCard, PrayerCard, MediaPlayer, …)
  context/             ThemeContext, UserContext, PlayerContext, AppDataContext
  data/                typed fixtures
  lib/                 cn(), format helpers, nav config
  types.ts             shared domain types
  app/globals.css      design tokens + Tailwind theme + utilities
```

---

*This is a design/UX demo. No real accounts, data, or API calls exist. Photographic slots use curated, faith-appropriate Unsplash CDN images behind warm duotone overlays (see `src/lib/images.ts`); everything else is CSS gradients, custom sacred SVG ornament, and iconography.*
