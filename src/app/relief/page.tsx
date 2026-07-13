import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Join Emma's Relief Society" };

const PURPLE = "#5b3ea6";
const GOLD = "#c9a13b";

const benefits = [
  { icon: "Globe2", grad: "from-[#e2e9fb] to-[#eef2fd]", title: "A Worldwide Sisterhood", body: "The largest women's organization on earth. Active in nearly every country across the globe." },
  { icon: "HandHeart", grad: "from-[#f8dde6] to-[#fceef2]", title: "Emotional & Spiritual Support", body: "Providing emotional support for each other in an arena of Godly values and faith in Jesus Christ." },
  { icon: "Users2", grad: "from-[#fce7cf] to-[#fdf3e3]", title: "Support for Wives & Mothers", body: "Encouragement, resources and mentoring for women at every stage of life. We strengthen families together." },
  { icon: "Users", grad: "from-[#e4e0f4] to-[#f0eefa]", title: "Emotional Support System", body: "A sisterhood of love and understanding. We listen, we care, we lift, we pray." },
  { icon: "Church", grad: "from-[#fbedc9] to-[#fdf6e2]", title: "Oldest Women's Organization", body: "The oldest women's organization on earth, organized in 1842 under the direction of the Lord." },
  { icon: "Globe2", grad: "from-[#fbe9c6] to-[#fdf4de]", title: "Active Worldwide", body: "Active locations world-wide in almost every country. Sisters in Zion across continents and cultures." },
  { icon: "ShieldCheck", grad: "from-[#e6e0f2] to-[#f1eef9]", title: "Meetings at Secure Locations", body: "Relief Society meetings are held in secure, confidential locations." },
  { icon: "Church", grad: "from-[#f8dde3] to-[#fceef1]", title: "Centered on Christ", body: "We grow in discipleship, serve others, and invite God's Spirit into our homes and hearts." },
];

const priorities = [
  { n: 1, medal: "#d4af37", title: "Priority 1\nIndependence, Missouri Addresses", body: "Requests from Independence, Missouri are processed first to help coordinate local fellowship opportunities." },
  { n: 2, medal: "#b8bcc4", title: "Priority 2\nPhone Numbers with an 816 Area Code", body: "Requests originating from the Kansas City metropolitan area are processed next." },
  { n: 3, medal: "#c17a3f", title: "Priority 3\nAll Other Locations Worldwide", body: "Requests from every nation and region of the world are welcomed and receive a response." },
];

export default function ReliefPage() {
  return (
    <>
      <div className="border-b border-border bg-white dark:bg-bg">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/neighbor/sisters" className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-accent-strong">
            <Icon name="ChevronLeft" size={20} /> <span className="hidden sm:inline">Sisters in Zion</span>
          </Link>
        </div>
      </div>

      {/* hero */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/relief-hero.png" alt="Join Emma's Relief Society — Strengthening women. Building families. Serving God. Blessing the world." className="block w-full select-none" width={1024} height={244} />
      </section>

      <section className="bg-[#f7f3fb] py-8 dark:bg-bg">
        <Container size="wide">
          {/* welcome */}
          <div className="grid gap-5 rounded-2xl border border-[#e4d6f5] bg-white p-6 shadow-sm dark:bg-surface sm:grid-cols-2 sm:items-center">
            <div className="text-center sm:text-left">
              <h2 className="font-serif text-2xl font-bold" style={{ color: PURPLE }}>Welcome to Emma&apos;s Relief Society</h2>
              <p className="mt-3 font-serif text-xl font-semibold italic" style={{ color: PURPLE }}>&ldquo;Charity Never Faileth&rdquo;</p>
              <p className="mt-1 text-sm font-semibold text-ink-soft">Relief Society Motto — 1 Corinthians 13:8</p>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
              <p>The Relief Society is a worldwide sisterhood of faith, service, encouragement, and Christ-centered friendship.</p>
              <p>Founded under the direction of the Lord, Relief Society has blessed generations of women through mutual support, spiritual growth, and charitable service.</p>
            </div>
          </div>

          {/* why women join */}
          <div className="mt-8 text-center">
            <h2 className="font-serif text-3xl font-bold" style={{ color: PURPLE }}>Why Women Join Relief Society</h2>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 text-lg font-semibold text-ink-soft">
              {["Faith", "Friendship", "Charity", "Service"].map((w, i) => (
                <span key={w} className="inline-flex items-center gap-3">{i > 0 && <span style={{ color: GOLD }}>✦</span>}{w}</span>
              ))}
            </p>
            <p className="mx-auto mt-4 w-fit rounded-full px-6 py-2 font-serif text-sm font-semibold italic text-white" style={{ background: PURPLE }}>
              &ldquo;Charity Never Faileth&rdquo; — 1 Corinthians 13:8
            </p>
          </div>

          {/* 8 benefit cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((c) => (
              <article key={c.title} className={`flex flex-col items-center rounded-2xl border border-white/60 bg-gradient-to-b ${c.grad} p-5 text-center shadow-sm`}>
                <span className="grid size-16 place-items-center rounded-full border-2 bg-white" style={{ borderColor: GOLD }}>
                  <Icon name={c.icon} size={30} strokeWidth={1.8} style={{ color: PURPLE }} />
                </span>
                <h3 className="mt-3 font-serif text-base font-bold leading-tight" style={{ color: PURPLE }}>{c.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{c.body}</p>
              </article>
            ))}
          </div>

          {/* find + text */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e4d6f5] bg-white p-6 shadow-sm dark:bg-surface">
              <h3 className="font-serif text-xl font-bold" style={{ color: PURPLE }}>Find a Relief Society Near You</h3>
              <p className="text-sm font-semibold text-ink-soft">Confidential Meeting Locations</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">Relief Society meetings are held in secure meeting locations throughout the world. To find the nearest location and learn meeting times, simply send a text message containing:</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {["Your Name", "Phone Number", "Address or City"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} style={{ color: PURPLE }} /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e4d6f5] bg-gradient-to-b from-[#efe6fb] to-[#f6effc] p-6 shadow-sm">
              <p className="flex items-center gap-2 font-serif text-xl font-bold" style={{ color: PURPLE }}><Icon name="Smartphone" size={20} /> Text Your Request</p>
              <p className="text-sm font-semibold text-ink-soft">Relief Society Request</p>
              <p className="mt-1 font-serif text-3xl font-bold tracking-tight" style={{ color: PURPLE }}>(+01) 248-445-2179</p>
              <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md" style={{ background: PURPLE }}>
                <Icon name="MessageCircle" size={16} /> Text My Request to Meet or Join
              </span>
              <p className="mt-3 text-sm font-semibold text-ink-soft">Please include:</p>
              <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
                {["Name", "Phone Number", "Address or City"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><Icon name="CheckCircle2" size={15} style={{ color: PURPLE }} /> {t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* priorities */}
          <div className="mt-6 rounded-2xl border border-[#e4d6f5] bg-white p-6 shadow-sm dark:bg-surface">
            <h3 className="text-center font-serif text-xl font-bold" style={{ color: PURPLE }}>Request Processing Priorities</h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              {priorities.map((p) => (
                <div key={p.n} className="flex gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full font-serif text-lg font-bold text-white shadow" style={{ background: p.medal }}>{p.n}</span>
                  <div>
                    <p className="whitespace-pre-line font-serif text-sm font-bold leading-tight" style={{ color: PURPLE }}>{p.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm italic text-muted">Every request is important and will receive a response. Responses are provided worldwide.</p>
          </div>

          {/* invite band */}
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#e4d6f5] bg-[#efe6fb] px-6 py-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full text-white" style={{ background: PURPLE }}><Icon name="HandHeart" size={24} /></span>
            <p className="font-serif text-base italic leading-snug sm:text-lg" style={{ color: PURPLE }}>
              We invite all women to come unto Christ and experience the blessings of faith, friendship, charity, service, and sisterhood.
            </p>
          </div>

          {/* choose next step */}
          <h3 className="mt-8 text-center font-serif text-xl font-bold" style={{ color: PURPLE }}>Choose Your Next Step</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link href="/relief" className="flex items-center gap-4 rounded-2xl p-5 text-white shadow-md transition-all hover:brightness-110" style={{ background: PURPLE }}>
              <Icon name="Users" size={28} className="shrink-0" />
              <span>
                <span className="block font-serif text-base font-bold uppercase">I Want to Join Emma&apos;s Relief Society</span>
                <span className="mt-0.5 block text-sm text-white/80">Connect with local sisters and learn about upcoming meetings.</span>
              </span>
              <Icon name="ChevronRight" size={22} className="ml-auto shrink-0" />
            </Link>
            <Link href="/faith" className="flex items-center gap-4 rounded-2xl border-2 p-5 shadow-sm transition-all hover:bg-[#f7f3fb]" style={{ borderColor: PURPLE, color: PURPLE }}>
              <Icon name="BookOpen" size={28} className="shrink-0" />
              <span>
                <span className="block font-serif text-base font-bold uppercase">I Want to Read Joseph&apos;s Book of Mormon</span>
                <span className="mt-0.5 block text-sm text-ink-soft">Learn more about the teachings of Jesus Christ contained in the Book of Mormon.</span>
              </span>
              <Icon name="ChevronRight" size={22} className="ml-auto shrink-0" />
            </Link>
          </div>

          {/* closing scripture */}
          <p className="mt-8 text-center font-serif text-base italic leading-relaxed" style={{ color: PURPLE }}>
            &ldquo;And charity suffereth long, and is kind... and charity never faileth.&rdquo;
            <span className="mt-0.5 block text-sm not-italic font-semibold text-ink-soft">1 Corinthians 13:4,8</span>
          </p>
        </Container>
      </section>
    </>
  );
}
