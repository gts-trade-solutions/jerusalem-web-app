import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";

const believers = ["The Stone Church", "The Church of Jesus Christ of Latter-day Saints", "Remnant Church", "Church of Christ (Temple Lot)", "Restoration Branches throughout the world"];

const commonVision = [
  "All have sought Christ as His disciples",
  "To establish the Center Stake of Zion",
  "A shared vision of Jesus Christ coming in His glory",
  "Loving our neighbors",
  "Serving all Restoration branches",
  "Welcoming all believers into covenant unity in Independence, Missouri",
  "Becoming one in Christ",
];

const workBefore = [
  { t: "Prepare for the Center Stake of Zion", d: "" },
  { t: "Love and serve all Restoration disciples", d: "" },
  { t: "Gather scattered Israel", d: "Training • Housing • Employment" },
  { t: "Share the Restoration message", d: "Many in Independence are ready to hear" },
  { t: "Prepare Independence as a place of refuge", d: "Economic refuge • Spiritual refuge" },
  { t: "You have fulfilled your mission", d: "We have fulfilled our mission." },
];

const prophetic = [
  "“Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.”",
  "He will suddenly come to His temple",
  "Two witnesses will testify in Jerusalem",
  "The gospel will be preached to every nation, kindred, tongue, and people.",
];

const refs = ["2 Corinthians 13:11", "1 Peter 3:8", "2 Nephi 1:21", "Philippians 1:27", "D&C 4:5-6", "Mosiah 18:21", "Acts 4:32", "Moses 7:18", "3 Nephi 18:10", "John 17:20-23", "D&C 100:16"];

function Card({ title, icon, children, className = "" }: { title: string; icon?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface ${className}`}>
      <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-ink">
        {icon && <Icon name={icon} size={20} className="text-accent-strong dark:text-accent" />}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const CheckLi = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-xs leading-snug text-ink-soft">
    <Icon name="CheckCircle2" size={14} className="mt-0.5 shrink-0 text-sage" /> {children}
  </li>
);

export function UnitySection() {
  return (
    <>
      {/* Hero — exact reference banner */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/un2-hero.jpg" alt="Invitation to Unity — gathering hearts together in Christ. One Body. One Spirit. One Zion." className="w-full select-none" width={1430} height={152} />
      </section>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          {/* Row 1 — Believers / Mosiah / Fulfillment / Common Vision */}
          <div className="grid gap-5 lg:grid-cols-4">
            <Card title="Book of Mormon Believers" icon="BookOpen">
              <p className="text-xs leading-relaxed text-muted">We lovingly identify and invite all who believe in the Book of Mormon—including members of:</p>
              <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                {believers.map((b) => <li key={b} className="flex gap-1.5"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />{b}</li>)}
              </ul>
              <p className="mt-2 text-xs font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">To come together as one people in a shared priesthood covenant.</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/un2-bom.jpg" alt="" className="mt-3 h-24 w-full rounded-lg object-cover" width={246} height={96} />
            </Card>

            <Card title="Two Peoples, One Covenant — The Pattern in Mosiah" icon="BookOpen">
              <div className="grid grid-cols-2 gap-2">
                {["King Limhi and his people in the Land of Nephi", "Mosiah and Alma in the land of Zarahemla"].map((t) => (
                  <div key={t} className="rounded-lg bg-surface-2/60 p-2 text-center text-[11px] font-semibold text-ink">{t}</div>
                ))}
              </div>
              <ul className="mt-2 space-y-1">
                <CheckLi>Both groups had entered into covenant with God</CheckLi>
                <CheckLi>Both were seeking to follow Him faithfully</CheckLi>
                <CheckLi>One group waited upon the Lord for the opportunity to be baptized</CheckLi>
              </ul>
              <p className="mt-2 text-[11px] font-semibold text-ink">In time, God brought them together:</p>
              <ul className="mt-1 space-y-1">
                <CheckLi>The people were united in Zarahemla</CheckLi>
                <CheckLi>King Limhi&apos;s people entered into a new covenant through baptism</CheckLi>
                <CheckLi>They became one people before the Lord</CheckLi>
              </ul>
              <p className="mt-2 text-[11px] font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">Mosiah 21:31-35; 22:13-14; 25:14-18</p>
            </Card>

            <Card title="A Fulfillment in Our Day" icon="Church">
              <p className="text-xs font-semibold text-ink">That same pattern exists today:</p>
              <div className="mt-2 rounded-lg bg-[#eef3ff] p-2.5 text-[11px] dark:bg-surface-2">
                <p className="font-semibold text-ink">On one hand:</p>
                <p className="text-muted">Stone Church, Community of Christ, Temple Lot traditions, and Restoration Branches</p>
              </div>
              <div className="mt-2 rounded-lg bg-[#eefaf0] p-2.5 text-[11px] dark:bg-surface-2">
                <p className="font-semibold text-ink">On the other hand:</p>
                <p className="text-muted">The Church of Jesus Christ of Latter-day Saints</p>
              </div>
              <ul className="mt-2 space-y-1">
                <CheckLi>Both are walking a path toward Christ.</CheckLi>
                <CheckLi>Both have sought to serve Him faithfully.</CheckLi>
              </ul>
              <div className="mt-2 rounded-lg bg-accent-soft/60 p-2.5 text-[11px] text-ink-soft">
                <span className="font-semibold text-ink">We testify:</span> The Church of Jesus Christ of Latter-day Saints holds the authority to invite all into the baptismal covenant. The Lord is preparing His people to become one.
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/un2-baptism.jpg" alt="" className="mt-3 h-20 w-full rounded-lg object-cover" width={258} height={76} />
            </Card>

            <Card title="We Have a Common Vision" icon="Star">
              <ol className="space-y-1.5">
                {commonVision.map((v, i) => (
                  <li key={v} className="flex items-start gap-2 text-[11px] leading-snug text-ink-soft">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-ink-900 text-[8px] font-bold text-white">{i + 1}</span>{v}
                  </li>
                ))}
              </ol>
              <p className="mt-3 rounded-lg bg-[#eef3ff] p-2.5 text-center font-serif text-xs italic text-ink dark:bg-surface-2">“Be one; and if ye are not one, ye are not mine.”</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/un2-vision.jpg" alt="" className="mt-3 h-28 w-full rounded-lg object-cover" width={200} height={262} />
            </Card>
          </div>

          {/* Row 2 — Two Churches / Call / Prophetic / Present Fellowship */}
          <div className="mt-5 grid gap-5 lg:grid-cols-4">
            <Card title="Two Churches — Both on the Path" icon="Compass">
              <p className="text-[11px] font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">Mosiah 21:31-35; 22:13-14; 25:14-18</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">Both groups in Mosiah were accepted of God. Both were preparing for something greater. So it is today.</p>
              <p className="mt-2 rounded-lg bg-[#eef3ff] p-2.5 text-[11px] italic text-ink dark:bg-surface-2">Unity is not the end—It is a historic beginning.</p>
            </Card>
            <Card title="A Call to Covenant Unity" icon="Handshake">
              <p className="text-xs font-semibold text-ink">Let us come together:</p>
              <ul className="mt-2 space-y-1.5">
                <CheckLi>United in priesthood covenant</CheckLi>
                <CheckLi>United in purpose</CheckLi>
                <CheckLi>United in Christ</CheckLi>
              </ul>
            </Card>
            <Card title="Prophetic Promises" icon="Sparkles">
              <ul className="space-y-1.5">
                {prophetic.map((p) => <li key={p} className="flex gap-1.5 text-[11px] leading-snug text-ink-soft"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />{p}</li>)}
              </ul>
            </Card>
            <Card title="Our Present Fellowship" icon="Users2">
              <p className="text-xs leading-relaxed text-muted">President Bryan McKee is my priesthood leader, called of God. Together, we worship and love Jesus Christ.</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Temples and Tabernacles", "Dedications and Sacred Gatherings", "The Work Already Accomplished", "We are one in His covenant"].map((t) => (
                  <div key={t} className="rounded-lg bg-surface-2/60 p-2 text-center text-[10px] font-medium text-ink-soft">{t}</div>
                ))}
              </div>
            </Card>
          </div>

          {/* Row 3 — The Work Before Us */}
          <div className="mt-5">
            <Card title="The Work Before Us" icon="ScrollText">
              <p className="text-xs font-semibold text-ink">Together, we are called to:</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {workBefore.map((w, i) => (
                  <div key={w.t} className="flex items-start gap-2.5">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink-900 text-[10px] font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="block text-xs font-bold text-ink">{w.t}</span>
                      {w.d && <span className="block text-[11px] text-muted">{w.d}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Row 4 — New Mission + Closing */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <section className="relative overflow-hidden rounded-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/un2-mission.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="relative z-[1] bg-ink-900/70 p-6 text-white">
                <h2 className="flex items-center gap-2 font-serif text-lg font-bold"><Icon name="Users" size={20} className="text-[#e6c164]" /> A New Mission Together</h2>
                <p className="mt-2 text-sm text-white/85">Now—together—we begin a new mission.</p>
              </div>
            </section>
            <section className="flex flex-col items-center justify-center rounded-2xl border border-accent/40 bg-accent-soft/40 p-6 text-center">
              <Icon name="Sparkles" size={24} className="text-accent-strong dark:text-accent" />
              <h2 className="mt-2 font-serif text-xl font-bold text-ink">Closing Declaration</h2>
              <p className="mt-1 font-serif text-2xl font-bold text-accent-strong dark:text-accent">Glory, glory, Hallelujah.</p>
              <p className="mt-3 font-serif text-sm italic text-ink-soft">“God shall hasten His work in its time.”</p>
              <p className="text-xs font-semibold text-muted">— D&amp;C 88:73</p>
            </section>
          </div>
        </Container>
      </section>

      {/* Ribbon */}
      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-4 h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-7 text-center">
          <p className="font-serif text-xl italic text-[#f3e9cf] sm:text-2xl">
            &ldquo;Behold, how good and how pleasant it is for brethren to dwell together in unity!&rdquo;
            <span className="not-italic font-semibold text-white"> — Psalm 133:1</span>
          </p>
          <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
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
