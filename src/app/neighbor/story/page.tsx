import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Sharing a Story of Love" };

const features = [
  { icon: "Users", title: "Share up to five stories", body: "You may have up to five stories at any point in time." },
  { icon: "FileText", title: "Update your stories", body: "Delete one story and add another to keep your stories current." },
  { icon: "Eye", title: "Reviewed for kindness", body: "Stories will be reviewed for appropriate content." },
  { icon: "BadgeCheck", title: "Share what's true", body: "Mark your story as True (real experience) or Story Only." },
  { icon: "FileText", title: "Share and inspire", body: "Copy your story and paste it elsewhere." },
];

const stories = [
  { img: "/images/st-1.jpg", title: "A Simple Meal, A Grateful Heart", body: "We delivered meals to a family in need. Their gratitude touched our hearts and brought us closer together.", badge: "True", date: "May 12, 2024" },
  { img: "/images/st-2.jpg", title: "Planting Hope in the Community", body: "Our neighborhood garden project brought people together and helped many families.", badge: "True", date: "May 5, 2024" },
  { img: "/images/st-3.jpg", title: "Blessings from Our Chicken Coop", body: "Chickens and eggs have blessed our family and neighbors in wonderful ways.", badge: "Story Only", date: "Apr 28, 2024" },
  { img: "/images/st-4.jpg", title: "Learning Together in a Self-Reliance Group", body: "Our group is growing in knowledge and confidence as we learn and support one another.", badge: "True", date: "Apr 15, 2024" },
  { img: "/images/st-5.jpg", title: "Small Acts, Big Impact", body: "Holding the door, offering a smile, and kind words can brighten someone's day.", badge: "Story Only", date: "Apr 2, 2024" },
];

const refs = ["Galatians 6:10", "3 Nephi 12:44", "Ephesians 4:32", "D&C 59:6", "2 Nephi 31:20", "John 15:13", "1 John 4:21", "Matthew 25:34-40", "Matthew 22:39", "Moroni 7:45", "Alma 7:11-13", "Galatians 5:14", "Ephesians 2:8", "Ephesians 5:2", "Mosiah 2:17"];

function Badge({ b }: { b: string }) {
  const on = b === "True";
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${on ? "bg-[#dbecdc] text-[#3f7a48]" : "bg-surface-2 text-muted"}`}>{b}</span>;
}

export default function StoryPage() {
  return (
    <>
      <div className="border-b border-border bg-white dark:bg-bg">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/neighbor" className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-accent-strong">
            <Icon name="ChevronLeft" size={20} /> <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="font-serif text-lg font-bold text-ink-900 dark:text-ink sm:text-2xl">Sharing a Story of Love</h1>
        </div>
      </div>

      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/story-hero.png" alt="Sharing a Story of Love — Inspiring others with acts of faith, kindness, and service. 3 Nephi 18:24" className="block w-full select-none" width={1536} height={178} />
      </section>

      {/* feature strip */}
      <div className="border-b border-border bg-white dark:bg-bg">
        <Container size="wide" className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-2.5">
              <Icon name={f.icon} size={18} className="mt-0.5 shrink-0 text-[#1d4ed8] dark:text-[#7ea4f5]" />
              <div>
                <p className="text-[13px] font-bold text-ink-900 dark:text-ink">{f.title}</p>
                <p className="text-[11px] leading-snug text-muted">{f.body}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      <section className="bg-[#faf7f1] py-8 dark:bg-bg">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* My Stories */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink">My Stories <span className="text-sm font-normal text-muted">(5 of 5)</span></h2>
                  <p className="text-xs text-muted">You can have up to five stories at any point in time.</p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white"><Icon name="Plus" size={13} /> Add a New Story</span>
                  <span className="inline-flex items-center rounded-md border border-border px-3 py-2 text-xs font-semibold text-ink">Manage Stories</span>
                </div>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {stories.map((s) => (
                  <li key={s.title} className="flex items-start gap-3 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt="" className="size-14 shrink-0 rounded-lg object-cover" width={56} height={56} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-ink-900 dark:text-ink">{s.title}</h3>
                      <p className="text-xs leading-snug text-muted">{s.body}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <Badge b={s.badge} />
                      <p className="mt-1 text-[11px] text-faint">{s.date}</p>
                      <div className="mt-1 flex justify-end gap-2 text-faint">
                        <Icon name="Share2" size={13} /> <Icon name="FileText" size={13} /> <Icon name="X" size={13} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-sm font-semibold text-[#1d4ed8] dark:text-[#7ea4f5]">View All My Stories →</p>
            </div>

            {/* Search Stories */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink">Search Stories</h2>
                <span className="text-xs text-muted">Results: 154 stories</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs text-ink"><Icon name="UserCheck" size={13} /> Search by Username <Icon name="ChevronDown" size={13} /></span>
                <span className="flex-1 rounded-md border border-border px-3 py-2 text-xs text-faint">Enter username…</span>
                <span className="inline-flex items-center rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white">Search</span>
              </div>

              <article className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/story-meal.jpg" alt="A family receiving a box of groceries" className="h-32 w-full rounded-lg object-cover sm:w-44" width={296} height={196} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink">A Simple Meal, A Grateful Heart</h3>
                    <Badge b="True" />
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted"><Icon name="UserCheck" size={12} /> SarahLovesToServe &nbsp;•&nbsp; May 12, 2024 · 3:24 PM</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">We prepared and delivered meals to a family who had just moved and had little food. The mother&apos;s eyes filled with tears as she thanked us. This small act of love reminded us that we are all children of God.</p>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-semibold text-ink"><Icon name="Share2" size={12} /> Copy Story</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-semibold text-ink"><Icon name="FileText" size={12} /> Edit</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-[#c98] px-2.5 py-1.5 text-[11px] font-semibold text-[#b4531f]"><Icon name="X" size={12} /> Delete</span>
                  </div>
                </div>
              </article>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#eef3fb] p-3">
                <Icon name="BadgeCheck" size={18} className="mt-0.5 shrink-0 text-[#1d4ed8]" />
                <p className="text-xs leading-relaxed text-ink-soft"><span className="font-bold text-ink-900 dark:text-ink">Stories are reviewed for appropriate content.</span> Please share with kindness, respect, and love. Stories that uplift and inspire are approved to be shared with the community.</p>
              </div>
            </div>
          </div>

          {/* action row */}
          <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-surface lg:grid-cols-4">
            <div><p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="FileText" size={17} className="text-[#1d4ed8] dark:text-[#7ea4f5]" /> Add a New Story</p><p className="mt-1 text-[13px] text-muted">Share your experience of service, faith, and love.</p><span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white"><Icon name="Plus" size={13} /> Add New Story</span></div>
            <div><p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="RefreshCw" size={17} className="text-[#3f7a48]" /> Update Your Stories</p><p className="mt-1 text-[13px] text-muted">Delete a story to make room for a new one.</p><span className="mt-2 inline-flex items-center rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white">Manage Stories</span></div>
            <div><p className="flex items-center gap-2 font-serif text-base font-bold text-ink-900 dark:text-ink"><Icon name="Share2" size={17} className="text-[#5b3ea6]" /> Copy and Share</p><p className="mt-1 text-[13px] text-muted">Copy your story and paste it to share in other places.</p><span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white"><Icon name="Share2" size={13} /> Copy a Story</span></div>
            <figure className="rounded-xl bg-accent-soft/40 p-4"><blockquote className="font-serif text-sm italic leading-relaxed text-ink">&ldquo;Wherefore, by their fruits ye shall know them. For behold, the tree is known by its fruit.&rdquo;</blockquote><figcaption className="mt-1 text-xs font-semibold text-muted">— Matthew 7:20</figcaption></figure>
          </div>
        </Container>

        <section className="mt-8 border-t-2 border-[#c9a13b] bg-ink-900 py-6 text-white">
          <Container>
            <p className="text-center font-serif text-lg italic text-[#f3e9cf]">Love thy neighbor as thyself.</p>
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
              {refs.map((r, i) => (<span key={r} className="inline-flex items-center gap-3">{i > 0 && <span className="text-white/30">|</span>}<span className="font-medium hover:text-[#e6c164]">{r}</span></span>))}
            </div>
          </Container>
        </section>
      </section>
    </>
  );
}
