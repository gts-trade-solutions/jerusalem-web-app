import Link from "next/link";
import { HomeConcept } from "@/components/sections/home/HomeConcept";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { homeConcepts } from "@/data/homeConcepts";

export const metadata = { title: "Come, Come, Ye Saints" };

const TEAL = "#1c4b45";

const economy = [
  { icon: "Plus", label: "Healthcare" },
  { icon: "Settings", label: "Manufacturing" },
  { icon: "Navigation", label: "Logistics & Transportation" },
  { icon: "GraduationCap", label: "Education" },
  { icon: "MonitorSmartphone", label: "Technology" },
  { icon: "Gift", label: "Retail & Services" },
  { icon: "Briefcase", label: "Construction" },
  { icon: "Sparkles", label: "and much more" },
];

const findingWork = (
  <section className="bg-bg-tint pb-8">
    <Container size="wide">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-surface">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full text-white" style={{ background: TEAL }}>
                <Icon name="Briefcase" size={20} />
              </span>
              <h2 className="font-serif text-xl font-bold" style={{ color: TEAL }}>
                Finding work in Independence / Liberty / Kansas City
              </h2>
            </div>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
              Independence is surrounded by a great economic base with opportunities across Independence, Liberty, and the Kansas City metro area.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cc-kc.jpg" alt="Independence, Liberty, and Kansas City metro area" className="mt-4 h-44 w-full rounded-xl object-cover" width={332} height={312} />
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: TEAL }}>
                <Icon name="FileText" size={16} />
              </span>
              <p className="text-xs leading-relaxed text-ink-soft">
                Send your resume along with your employment interests and we&apos;ll look for jobs in the area.
              </p>
            </div>
            <Link href="/faith" className="mt-3 inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:brightness-110" style={{ background: TEAL }}>
              Send Your Resume <Icon name="ArrowRight" size={13} />
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-surface-2/40 p-5">
            <h3 className="font-serif text-base font-bold" style={{ color: TEAL }}>A Strong Economic Base</h3>
            <ul className="mt-3 space-y-2.5">
              {economy.map((e) => (
                <li key={e.label} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-white" style={{ background: TEAL }}>
                    <Icon name={e.icon} size={14} />
                  </span>
                  {e.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default function ComeComePage() {
  return <HomeConcept c={homeConcepts.find((c) => c.id === "pioneer")!} infoBar={findingWork} />;
}
