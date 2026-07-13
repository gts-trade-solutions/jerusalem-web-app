import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Sisters in Zion" };

const PURPLE = "#5b3ea6";

const cards = [
  { icon: "/images/sis-ic-need.png", title: "Indicate a\nNeed Request", body: "Let the sisters know how they can support and uplift you right now." },
  { icon: "/images/sis-ic-offer.png", title: "Offer Help for a\nNeed Request", body: "Find needs that match your heart and offer help to bless a sister." },
  { icon: "/images/sis-ic-post.png", title: "Post a Service\nOpportunity", body: "Invite a service opportunity and request RSVPs.", chip: "Minimum RSVPs required" },
  { icon: "/images/sis-ic-book.png", title: "Join a Book of\nMormon Study Group", body: "Grow together in faith and understanding.", chip: "Maximum 20 sisters per group" },
];

export default function SistersPage() {
  return (
    <>
      {/* page toolbar */}
      <div className="border-b border-border bg-white dark:bg-bg">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/neighbor" className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-accent-strong">
            <Icon name="ChevronLeft" size={20} /> <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="font-serif text-lg font-bold sm:text-2xl" style={{ color: PURPLE }}>Sisters in Zion</h1>
        </div>
      </div>

      {/* hero band */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/sis-hero.png" alt="Sisters in Zion — Lift and support each other as we serve the Lord together. Mosiah 18:9" className="block w-full select-none" width={1536} height={322} />
      </section>

      <section className="bg-[#f7f3fb] py-8 dark:bg-bg">
        <Container size="wide">
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Join Emma's Relief Society — big left card, links to Relief page */}
            <Link
              href="/relief"
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e4d6f5] bg-gradient-to-b from-[#efe6fb] to-[#f6effc] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md lg:row-span-2"
            >
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/sis-ic-join.png" alt="" className="size-14 shrink-0" width={56} height={56} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl font-bold leading-tight" style={{ color: PURPLE }}>Join Emma&apos;s Relief Society</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">Connect with sisters and build faith, friendship, and support.</p>
                </div>
                <Icon name="ChevronRight" size={22} className="mt-1 shrink-0 text-[#a98fd0]" />
              </div>

              <hr className="my-4 border-[#e4d6f5]" />

              <h4 className="font-serif text-lg font-bold" style={{ color: PURPLE }}>Joining Emma&apos;s Relief Society</h4>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold" style={{ color: PURPLE }}>
                <Icon name="MessageCircle" size={16} /> Text Requests Only
              </p>
              <p className="mt-1 font-serif text-3xl font-bold tracking-tight" style={{ color: PURPLE }}>(+01) 248-445-2179</p>
              <p className="mt-3 text-sm font-semibold text-ink-soft">Simply text:</p>
              <ul className="mt-1.5 space-y-1.5 text-sm text-ink-soft">
                {["Your Name", "Phone Number", "Address or City"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Icon name="CheckCircle2" size={16} style={{ color: PURPLE }} /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">to receive information about the nearest Relief Society meeting location. Responses provided worldwide.</p>
              <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all group-hover:brightness-110" style={{ background: PURPLE }}>
                <Icon name="MessageCircle" size={16} /> Text My Request to Join
              </span>
            </Link>

            {/* four action cards */}
            {cards.map((c) => (
              <article key={c.title} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.icon} alt="" className="size-14 shrink-0" width={56} height={56} />
                  <h3 className="min-w-0 flex-1 whitespace-pre-line font-serif text-xl font-bold leading-tight" style={{ color: PURPLE }}>{c.title}</h3>
                  <Icon name="ChevronRight" size={22} className="mt-1 shrink-0 text-[#c9b6e4]" />
                </div>
                <p className="mt-3 pl-[4.5rem] text-sm leading-relaxed text-ink-soft">{c.body}</p>
                {c.chip && (
                  <span className="ml-[4.5rem] mt-3 inline-block w-fit rounded-full bg-[#efe6fb] px-3 py-1 text-xs font-semibold" style={{ color: PURPLE }}>{c.chip}</span>
                )}
              </article>
            ))}
          </div>

          {/* closing ribbon */}
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#e4d6f5] bg-[#efe6fb] px-6 py-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border-2" style={{ borderColor: PURPLE, color: PURPLE }}>
              <Icon name="Heart" size={20} />
            </span>
            <p className="font-serif text-base italic leading-snug sm:text-lg" style={{ color: PURPLE }}>
              We are stronger together. As we lift, love, and serve one another, we become more like our Savior.
              <span className="mt-0.5 block text-sm not-italic">Mosiah 18:21</span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
