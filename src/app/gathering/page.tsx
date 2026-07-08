import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Gathering Scattered Israel" };

const TEAL = "#1c4b45";
const BROWN = "#7a4d25";

const doctrine = [
  {
    icon: "BookOpen", color: TEAL,
    title: "Doctrine of Gathering – Who is Scattered Israel?",
    body: "The gathering begins with the restoration of covenant identity to the descendants of ancient Israel who have been scattered and lost to the world. It is a sacred work of identifying and inviting them back into the family of God.",
    bullets: ["Covenant lineage restored through Christ", "Nations gathered together as Zion’s people"],
  },
  {
    icon: "Church", color: BROWN,
    title: "What Builds the New Jerusalem?",
    body: "A New Jerusalem is built not with stone alone, but with the faith, works, and righteousness of the Saints as they gather.",
    bullets: ["Clean hearts, obedient covenants, loving unity", "The Lord directs and provides", "His hand is with the faithful"],
  },
  {
    icon: "Sparkles", color: TEAL,
    title: "Prophecy of Joseph Smith – “When Will It Happen?”",
    body: "Joseph Smith prophesied that the New Jerusalem will be built in our time by a people who are faithful to the Lord’s commandments. The timing is already underway, according to prophecy.",
    bullets: ["In the last days", "As the kingdoms of this world become the kingdoms of our Lord", "For the millennial reign of Jesus Christ"],
  },
];

const opportunities = [
  {
    icon: "FileText", color: TEAL, title: "Scattered Israel – Send a Resume", img: "/images/ga-resume.jpg",
    body: "Every skill, talent, and testimony matters. Join with us by sharing your resume so we can help identify potential jobs for you in the area.",
    bullets: [], cta: "Send Your Resume",
  },
  {
    icon: "Church", color: BROWN, title: "New Jerusalem", img: "/images/ga-city.jpg",
    body: "A holy city dedicated to the Lord where righteous people gather to worship, learn, serve, and prepare for the Millennial reign of Jesus Christ.",
    bullets: ["A place of peace, righteousness, and perfect order", "The center for teaching, serving, and gathering Israel"], cta: null,
  },
  {
    icon: "Briefcase", color: TEAL, title: "Training for Righteous Trades", img: "/images/ga-trades.jpg",
    body: "Prepare now to build Zion through skilled, Christ-centered service.",
    bullets: ["Learn and master a trade", "Develop integrity and diligence", "Practice honesty, respect, and joyful service", "Build with your hands and your heart"], cta: null,
  },
];

const refs = ["3 Nephi 20:22", "3 Nephi 21:23-24", "D&C 57", "D&C 59", "D&C 101", "D&C 124", "Mormon 5:6", "3 Nephi 20:21-22", "3 Nephi 20:25", "3 Nephi 20:26"];

function Diamonds({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 20" fill="#c9a13b" className={className} aria-hidden>
      <path d="M10 4 L16 10 L10 16 L4 10 Z" opacity="0.5" />
      <path d="M28 3 L35 10 L28 17 L21 10 Z" opacity="0.75" />
      <path d="M46 4 L52 10 L46 16 L40 10 Z" opacity="0.5" />
      <path d="M64 3 L71 10 L64 17 L57 10 Z" opacity="0.75" />
      <path d="M82 4 L88 10 L82 16 L76 10 Z" opacity="0.5" />
    </svg>
  );
}

export default function GatheringPage() {
  return (
    <>
      {/* Hero — the exact reference banner */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ga-hero.jpg" alt="Gathering Scattered Israel — restoring covenant identity and building Zion together" className="w-full select-none" width={1430} height={284} />
      </section>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          {/* Plat + Doctrine */}
          <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
            <div className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm dark:bg-surface">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-ink">1833 Plat of the City of Zion</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ga-plat.jpg" alt="1833 Plat of the City of Zion" className="mx-auto mt-3 w-full rounded-lg border border-border" width={240} height={234} />
              <p className="mt-2 text-[11px] leading-snug text-muted">Plat of Zion, Jackson County, Missouri as laid out by Joseph Smith and others, 1833.</p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
              <h2 className="text-center font-serif text-2xl font-bold text-ink">Doctrine &amp; Prophecy of the Gathering</h2>
              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {doctrine.map((d) => (
                  <div key={d.title}>
                    <div className="flex items-start gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: d.color }}>
                        <Icon name={d.icon} size={17} />
                      </span>
                      <h3 className="font-serif text-sm font-bold leading-snug" style={{ color: d.color === BROWN ? BROWN : TEAL }}>{d.title}</h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{d.body}</p>
                    <ul className="mt-2 space-y-1">
                      {d.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-1.5 text-[11px] text-ink-soft">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: d.color }} /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opportunities */}
          <h2 className="mt-8 text-center font-serif text-2xl font-bold text-ink">Opportunities in the Gathering</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {opportunities.map((o) => (
              <article key={o.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm dark:bg-surface">
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full text-white" style={{ background: o.color }}>
                      <Icon name={o.icon} size={17} />
                    </span>
                    <h3 className="font-serif text-base font-bold leading-snug" style={{ color: o.color === BROWN ? BROWN : TEAL }}>{o.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{o.body}</p>
                  {o.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {o.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-1.5 text-[11px] text-ink-soft">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: o.color }} /> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.img} alt="" className="h-32 w-full object-cover" width={262} height={165} />
                {o.cta && (
                  <div className="p-4">
                    <Link href="/faith" className="flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:brightness-110" style={{ background: TEAL }}>
                      {o.cta} <Icon name="ArrowRight" size={13} />
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Ensign ribbon */}
      <section className="relative overflow-hidden bg-[#1c4b45] text-white" aria-label="Scripture references">
        <Container className="py-7 text-center">
          <div className="flex items-center justify-center gap-4">
            <Diamonds className="hidden h-4 w-20 sm:block" />
            <p className="font-serif text-lg italic text-[#f3e9cf] sm:text-xl">
              &ldquo;He shall set up an ensign for the nations, and shall assemble the outcasts of Israel…&rdquo;
              <span className="mt-1 block text-sm not-italic font-semibold text-[#e6c164]">— Isaiah 11:12</span>
            </p>
            <Diamonds className="hidden h-4 w-20 sm:block" />
          </div>
          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
            {refs.map((r, i) => (
              <span key={r} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/30">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
