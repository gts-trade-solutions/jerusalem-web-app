import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Strengthening Your Child" };

const requirements = [
  "Mother is a participating Sister in Zion",
  "Mother participates in Emma's Relief Society.",
  "Child is tobacco, alcohol, and drug free for at least six months.",
  "Mother and Child commit to read in the Book of Mormon together",
];

export default function ChildPage() {
  return (
    <>
      {/* Banner — the exact reference graphic */}
      <section className="border-b border-border bg-white dark:bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/child-banner.jpg"
          alt="Strengthening Teenage Youth in Christ — strengthen your teenage child (for children 11–18). Join your child with other youth, focused on Christ, with monthly service projects and weekly activities focused on intellect, social, physical, and spiritual growth."
          className="w-full select-none"
          width={1430}
          height={953}
        />
      </section>

      <section className="bg-bg-tint py-8">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* What youth do */}
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
              <h2 className="font-serif text-2xl font-bold text-ink">Join your child with other youth, focused on Christ.</h2>
              <ul className="mt-4 space-y-3">
                {[
                  { t: "Monthly Service Projects", d: "Lift the community and serve together." },
                  { t: "Weekly Activities", d: "Focused on Intellect, Social, Physical, and Spiritual growth." },
                ].map((b) => (
                  <li key={b.t} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong dark:text-accent">
                      <Icon name="Sparkles" size={16} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink">{b.t}</span>
                      <span className="block text-xs text-muted">{b.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-xs leading-relaxed text-muted">
                For children ages 11–18. This program grows alongside{" "}
                <Link href="/relief" className="font-semibold text-[#1d4ed8] underline dark:text-[#7ea4f5]">Emma&apos;s Relief Society</Link>{" "}
                — mothers and children walking the covenant path together.
              </p>
            </section>

            {/* Admission Requirements */}
            <section className="rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
              <h2 className="font-serif text-2xl font-bold text-ink">Admission Requirements</h2>
              <ol className="mt-4 space-y-3">
                {requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink-900 font-serif text-sm font-bold text-white">{i + 1}</span>
                    <span className="pt-0.5 text-sm leading-snug text-ink-soft">{r}</span>
                  </li>
                ))}
              </ol>
              <Link href="/relief" className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-[#b8892b] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
                Request to Join <Icon name="ArrowRight" size={14} />
              </Link>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
