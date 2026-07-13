import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { SkylineArt } from "@/components/Sacred";

export const metadata = { title: "Does Unity Require Baptism?" };

const paragraphs = [
  'Ephesians 4 speaks of unity where we are "forbearing one another in love," and of "one Lord, one faith, and one baptism."',
  'In John 3 the Savior taught Nicodemus the necessity of baptism, and in 2 Nephi 31 the Father said, "Repent ye, repent ye, and be baptized in the name of my Beloved Son."',
  'Even rebaptism was taught by Paul in Acts 19 when he met those of Ephesus who were baptized unto John the Baptist, but apparently not yet "baptized in the name of the Lord Jesus."',
  "Building Zion now without unity of baptism does not change any of the doctrine of baptism, or faith in Jesus Christ and repentance. Instead, it leaves the timing of priesthood baptism up to each individual in personal prayer with God.",
  "Loving God first, loving our neighbor second, and working towards an ultimate covenant unity in Jesus Christ - according to an individual's personal revelation - is the divine pathway to Zion.",
];

const journey = [
  "Unity is not diminished by different starting points",
  "Faith, repentance, and love remain central",
  "Each step is guided through personal communion with God",
];

const refs = ["John 3:3-5", "Ephesians 4:3-5", "2 Nephi 31:10-13", "Acts 19:3-5", "Moroni 10:3-5", "Ecclesiastes 3:1-7"];

export default function BaptismPage() {
  return (
    <>
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ba-hero.png"
          alt="Does Unity Require Baptism? Seeking unity in Christ through faith, love, and divine order."
          className="block w-full select-none"
          width={773}
          height={230}
        />
      </section>

      <section className="bg-bg-tint py-5 sm:py-6">
        <Container size="wide">
          <article className="rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
            <h2 className="font-serif text-2xl font-bold text-ink">Does Unity Require Baptism?</h2>
            <div className="mt-4 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-center">
              <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ba-article.jpg" alt="Four friends discussing the scriptures together" className="h-full max-h-72 w-full rounded-xl object-cover" width={340} height={242} />
            </div>
          </article>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
              <div className="p-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#c99a34]">
                    <Icon name="Users" size={24} />
                  </span>
                  <h3 className="font-serif text-base font-bold text-ink">A Shared Journey Toward Zion</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {journey.map((j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#c99a34] text-white">
                        <Icon name="Check" size={11} strokeWidth={3} />
                      </span>
                      <span className="text-xs leading-snug text-ink-soft">{j}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ba-journey.jpg" alt="" className="mt-auto h-24 w-full object-cover" width={229} height={56} />
            </section>

            <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
              <div className="p-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#1e3a8a] dark:text-[#7ea4f5]">
                    <Icon name="Heart" size={22} />
                  </span>
                  <h3 className="font-serif text-base font-bold text-ink">Grow in Faith and Understanding</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Study the scriptures, pray, and seek personal revelation. The Lord will guide each of us in His perfect time.
                </p>
              </div>
              <div className="relative mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ba-book.jpg" alt="" className="h-24 w-full object-cover" width={196} height={78} />
                <Link href="/faith" className="absolute inset-x-4 bottom-3 flex items-center justify-center gap-1.5 rounded-md bg-[#b8892b] py-2 text-xs font-semibold text-white shadow-md transition-all hover:brightness-110">
                  Explore Resources <Icon name="ArrowRight" size={13} />
                </Link>
              </div>
            </section>

            <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm dark:bg-surface">
              <div className="p-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#6d5bab]">
                    <Icon name="Users2" size={22} />
                  </span>
                  <h3 className="font-serif text-base font-bold text-ink">Connect in Fellowship</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  We are stronger together. Join others who are seeking to follow Christ and build Zion in love.
                </p>
              </div>
              <div className="relative mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ba-group.jpg" alt="" className="h-24 w-full object-cover" width={250} height={96} />
                <Link href="/unity" className="absolute inset-x-4 bottom-3 flex items-center justify-center gap-1.5 rounded-md bg-[#b8892b] py-2 text-xs font-semibold text-white shadow-md transition-all hover:brightness-110">
                  Find a Group <Icon name="ArrowRight" size={13} />
                </Link>
              </div>
            </section>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-7 text-center">
          <p className="font-serif text-xl italic text-[#f3e9cf] sm:text-2xl">
            &ldquo;Behold, how good and how pleasant it is for brethren to dwell together in unity!&rdquo;
            <span className="not-italic font-semibold text-white"> - Psalm 133:1</span>
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
