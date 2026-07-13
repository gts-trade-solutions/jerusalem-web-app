import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Loving Our Neighbor" };

const cards = [
  {
    href: "/neighbor/pray",
    icon: "/images/nb2-ic-pray.png",
    photo: "/images/nb2-pray.jpg",
    title: "Pray for Someone in Need",
    body: "Lift others in prayer and bring hope through faith.",
  },
  {
    href: "/neighbor/sisters",
    icon: "/images/nb2-ic-sisters.png",
    photo: "/images/nb2-sisters.jpg",
    title: "Sisters in Zion",
    body: "Encourage, uplift, and strengthen one another in Christ.",
  },
  {
    href: "/neighbor/justserve",
    icon: "/images/nb2-ic-serve.png",
    photo: "/images/nb2-serve.jpg",
    title: "Join a JustServe Activity",
    body: "Find opportunities to serve and make a difference.",
  },
  {
    href: "/neighbor/story",
    icon: "/images/nb2-ic-story.png",
    photo: "/images/nb2-story.jpg",
    title: "Share a Story of Love",
    body: "Inspire others by sharing how Christ has touched your life.",
  },
];

export default function NeighborPage() {
  return (
    <>
      {/* Hero banner — exact mockup band */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/nb2-hero.jpg"
          alt="Loving Our Neighbor — Serve, support, and care for one another as disciples of Christ."
          className="block w-full select-none"
          width={1536}
          height={384}
        />
      </section>

      {/* 2×2 sub-topic cards */}
      <section className="bg-[#faf7f1] py-8 dark:bg-bg sm:py-10">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group grid grid-cols-[1fr_auto] items-stretch overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-surface sm:grid-cols-[1fr_2rem_15rem]"
              >
                <div className="flex items-start gap-4 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.icon} alt="" className="size-14 shrink-0 select-none" width={56} height={56} />
                  <div className="min-w-0">
                    <h3 className="break-words font-serif text-xl font-bold leading-tight text-ink-900 dark:text-ink">{c.title}</h3>
                    <p className="mt-2 break-words text-[15px] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </div>
                <div className="hidden items-center justify-center text-border-strong transition-colors group-hover:text-accent-strong sm:flex">
                  <Icon name="ChevronRight" size={26} />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt="" className="hidden h-full w-full object-cover sm:block" width={258} height={220} />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
