import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Just Serve Projects" };

const tabs = [
  { label: "Pray for Others", icon: "HandHeart", href: "/neighbor/pray" },
  { label: "Sisters in Zion", icon: "Users", href: "/neighbor/sisters" },
  { label: "Just Serve Map", icon: "MapPin", href: "#" },
  { label: "Stories of Love", icon: "Heart", href: "/neighbor/story" },
  { label: "My Service", icon: "UserCheck", href: "#" },
];

const projects = [
  { l: "a", color: "#1e3a8a", title: "JustServe—\nBaking Bread for Others", body: "Bake bread and share it with neighbors, families, and those in need.", img: "/images/js-a.jpg", tag: "Serve with Love", tagIcon: "Heart" },
  { l: "b", color: "#3f7a48", title: "JustServe—\nHelping Others with a Garden", body: "Plant, grow, and share fresh produce with families and communities.", img: "/images/js-b.jpg", tag: "Grow Together", tagIcon: "Sprout" },
  { l: "c", color: "#d2691e", title: "JustServe—\nChicken Coops and Eggs", body: "Build coops, care for chickens, and share eggs to bless others.", img: "/images/js-c.jpg", tag: "Provide & Share", tagIcon: "Bird" },
  { l: "d", color: "#5b3ea6", title: "JustServe—\nJoin a Financial Self-Reliance Training Group", body: "Learn, support, and grow together in faith and financial strength.", img: "/images/js-d.jpg", tag: "Learn & Grow", tagIcon: "Users2" },
];

const refs = [
  "Galatians 6:10", "3 Nephi 12:44", "Ephesians 4:32", "D&C 59:6", "2 Nephi 31:20", "John 15:13",
  "1 John 4:21", "Matthew 25:34-40", "Matthew 22:39", "Moroni 7:45", "Alma 7:11-13", "Galatians 5:14",
  "Ephesians 2:8", "Ephesians 5:2", "Mosiah 2:17",
];
const ribbonIcons = [
  { icon: "HandHeart", label: "Pray" }, { icon: "Heart", label: "Serve" }, { icon: "BookOpen", label: "Learn" },
  { icon: "Users", label: "Unite" }, { icon: "Church", label: "Build Zion" },
];

export default function JustServePage() {
  return (
    <>
      <div className="border-b border-border bg-white dark:bg-bg">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/neighbor" className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-accent-strong">
            <Icon name="ChevronLeft" size={20} /> <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="font-serif text-lg font-bold text-ink-900 dark:text-ink sm:text-2xl">Just Serve Projects</h1>
        </div>
      </div>

      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/js-hero.jpg" alt="Just Serve Projects — Small acts of service. Eternal impact. Matthew 25:40" className="block w-full select-none" width={1536} height={200} />
      </section>

      {/* secondary pill nav */}
      <div className="border-b border-border bg-white dark:bg-bg">
        <Container size="wide" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3 text-sm font-semibold text-ink-soft">
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} className="flex items-center gap-2 transition-colors hover:text-accent-strong">
              <Icon name={t.icon} size={16} className="text-[#1d4ed8] dark:text-[#7ea4f5]" /> {t.label}
            </Link>
          ))}
        </Container>
      </div>

      <section className="bg-[#faf7f1] py-8 dark:bg-bg">
        <Container size="wide">
          {/* 4 project cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((p) => (
              <article key={p.l} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm dark:bg-surface">
                <div className="flex items-start gap-3 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full font-serif text-sm font-bold text-white" style={{ background: p.color }}>{p.l}</span>
                  <h3 className="min-w-0 flex-1 whitespace-pre-line font-serif text-base font-bold leading-tight" style={{ color: p.color }}>{p.title}</h3>
                </div>
                <p className="px-4 pb-3 text-[13px] leading-relaxed text-ink-soft">{p.body}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" className="w-full select-none object-cover" width={340} height={250} />
                <div className="mt-auto flex items-center justify-between px-4 py-3">
                  <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.color }}>
                    <Icon name={p.tagIcon} size={15} /> {p.tag}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">View Opportunities <Icon name="ChevronRight" size={14} /></span>
                </div>
              </article>
            ))}
          </div>

          {/* resource row */}
          <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface lg:grid-cols-4">
            <div>
              <p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="MapPin" size={18} className="text-[#1d4ed8] dark:text-[#7ea4f5]" /> Find Service Opportunities</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">Search nearby projects and events that match your gifts and passions.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-ink-900 px-3.5 py-2 text-xs font-semibold text-white">Explore JustServe Map <Icon name="ChevronRight" size={13} /></span>
            </div>
            <div>
              <p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="Star" size={18} className="text-accent-strong dark:text-accent" /> Record Your Service</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">Track your hours, celebrate your impact, and be inspired.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-xs font-semibold text-ink">Go to My Service</span>
            </div>
            <figure className="rounded-xl bg-accent-soft/40 p-4">
              <blockquote className="font-serif text-sm italic leading-relaxed text-ink">&ldquo;Let us not love in word, neither in tongue; but in deed and in truth.&rdquo;</blockquote>
              <figcaption className="mt-1 text-xs font-semibold text-muted">— 1 John 3:18</figcaption>
            </figure>
            <div>
              <p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="Users" size={18} className="text-[#1d4ed8] dark:text-[#7ea4f5]" /> Invite Others to Serve</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">Invite friends and family to join you in making a difference.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-ink-900 px-3.5 py-2 text-xs font-semibold text-white">Invite Someone</span>
            </div>
          </div>
        </Container>

        {/* navy ribbon */}
        <section className="mt-8 border-t-2 border-[#c9a13b] bg-ink-900 py-6 text-white">
          <Container>
            <p className="text-center font-serif text-lg italic text-[#f3e9cf]">Love thy neighbor as thyself.</p>
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
              {refs.map((r, i) => (
                <span key={r} className="inline-flex items-center gap-3">{i > 0 && <span className="text-white/30">|</span>}<span className="font-medium hover:text-[#e6c164]">{r}</span></span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {ribbonIcons.map((r) => (
                <span key={r.label} className="flex flex-col items-center gap-1 text-xs font-semibold text-[#e6c164]"><Icon name={r.icon} size={20} /> {r.label}</span>
              ))}
            </div>
          </Container>
        </section>
      </section>
    </>
  );
}
