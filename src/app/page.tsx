import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";

const cards = [
  { n: 1, href: "/neighbor", icon: "HandHeart", color: "#8b3a4a", title: "Loving Our Neighbor", body: "Serve, support, and care for one another as disciples of Christ.", img: "/images/h2-c1.jpg" },
  { n: 2, href: "/faith", icon: "BookOpen", color: "#1f5f5a", title: "Sharing Our Faith in Christ", body: "Strengthen disciples through testimony, scripture, and sacred learning.", img: "/images/h2-c2.jpg" },
  { n: 3, href: "/unity", icon: "Users", color: "#1e3a8a", title: "Invitation to Unity", body: "Gather hearts together in Christ through fellowship, worship, and unity.", img: "/images/h2-c3.jpg" },
  { n: 4, href: "/baptism", icon: "Droplet", color: "#1e3a8a", title: "Does Unity Require Baptism?", body: "Explore what scripture teaches about unity and baptism, and how personal revelation helps each of us walk the divine pathway to Zion in our own timing.", img: "/images/h2-c4.jpg" },
  { n: 5, href: "/music", icon: "Music", color: "#c99a34", title: "Worshipping Christ through Music", body: "Lift our voices and hearts in sacred music that honors Jesus Christ.", img: "/images/h2-c5.jpg" },
  { n: 6, href: "/events", icon: "Flame", color: "#d2691e", title: "Neighborhood B&B Events", body: "Barbecue, Book of Mormon, fellowship, food, and faith in our neighborhoods.", img: "/images/h2-c6.jpg" },
  { n: 7, href: "/no-poor", icon: "HandHeart", color: "#3a6a3f", title: "No Poor Among Us", body: "Live the law of consecration through compassion, service, and caring for those in need.", img: "/images/h2-c7.jpg" },
  { n: 8, href: "/gathering", icon: "Globe2", color: "#1e3a8a", title: "Gathering Scattered Israel", body: "Support the Lord's work of gathering Israel through prayer, service, and temple covenants.", img: "/images/h2-c8.jpg" },
  { n: 9, href: "/come-come", icon: "Church", color: "#c99a34", title: "Come, Come, Ye Saints", body: "Prepare our hearts, strengthen our faith, and hasten the coming of the Lord.", img: "/images/h2-c9.jpg" },
];

const refs = ["1 Timothy 6:15", "Revelation 17:14", "Revelation 19:16", "Revelation 22:20", "Isaiah 64:1", "D&C 133:40", "Matthew 6:10"];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/h2-hero.jpg"
          alt="Come, O Thou King of Kings - United in Christ, strengthened by Scripture, gathered in love"
          className="block w-full select-none"
          width={1024}
          height={288}
        />
      </section>

      <section className="bg-white pb-10 pt-4 dark:bg-bg">
        <Container size="wide">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.n}
                href={c.href}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-surface"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full text-white" style={{ background: c.color }}>
                    <Icon name={c.icon} size={24} strokeWidth={1.9} />
                  </span>
                  <h3 className="min-w-0 flex-1 break-words font-serif text-lg font-bold leading-tight" style={{ color: c.color }}>
                    <span className="text-ink">{c.n}.</span> {c.title}
                  </h3>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" className="mt-4 h-32 w-full rounded-lg object-cover" width={292} height={108} />
                <p className="mt-3 min-w-0 flex-1 break-words text-sm leading-relaxed text-muted">{c.body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1d4ed8] transition-all group-hover:gap-2.5 dark:text-[#7ea4f5]">
                  Learn More <Icon name="ArrowRight" size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <section className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-ink">Daily Scripture</h3>
                <blockquote className="mt-3 text-sm italic leading-relaxed text-muted">
                  &ldquo;That they all may be one: as thou, Father, art in me, and I in thee, that they also may be one in us.&rdquo;
                </blockquote>
                <p className="mt-2 text-xs font-semibold text-ink-soft">John 17:21</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/h2-book.jpg" alt="" className="size-20 self-center rounded-lg object-cover" width={94} height={96} />
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
              <h3 className="font-serif text-lg font-bold text-ink">Message of the Day</h3>
              <div className="mt-3 flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/h2-christ.jpg" alt="" className="size-16 shrink-0 rounded-full object-cover" width={78} height={78} />
                <div>
                  <blockquote className="text-xs italic leading-relaxed text-muted">
                    &ldquo;My Peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.&rdquo;
                  </blockquote>
                  <p className="mt-1 text-xs font-semibold text-ink-soft">John 14:27</p>
                </div>
              </div>
              <Link href="/faith" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
                Watch Message <Icon name="ArrowRight" size={14} />
              </Link>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-ink">Upcoming Events</h3>
                <Link href="/events" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">
                  View Calendar <Icon name="ArrowRight" size={12} />
                </Link>
              </div>
              <ul className="mt-3 space-y-3">
                {[
                  { mon: "MAY", day: "24", icon: "Music", title: "Worship Night", when: "Saturday, May 24 - 7:00 PM", loc: "Community Worship Center" },
                  { mon: "MAY", day: "31", icon: "Flame", title: "Neighborhood B&B", when: "Saturday, May 31 - 5:00 PM", loc: "Smith Family Backyard" },
                ].map((e) => (
                  <li key={e.day} className="flex items-center gap-3">
                    <span className="w-9 shrink-0 text-center">
                      <span className="block text-[10px] font-bold uppercase text-accent-strong dark:text-accent">{e.mon}</span>
                      <span className="block font-serif text-lg font-bold leading-none text-ink">{e.day}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-ink">{e.title}</span>
                      <span className="block text-[11px] text-muted">{e.when}</span>
                      <span className="block text-[11px] text-faint">{e.loc}</span>
                    </span>
                    <Icon name={e.icon} size={18} className="shrink-0 text-accent-strong dark:text-accent" />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-4 h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-6 text-center">
          <p className="mx-auto max-w-3xl font-serif text-lg italic text-[#f3e9cf] sm:text-xl">
            &ldquo;We believe in being honest, true, chaste, benevolent, virtuous, and in doing good to all men.&rdquo;
          </p>
          <p className="mt-1 font-serif text-sm font-semibold text-white">Articles of Faith 1:13</p>
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
