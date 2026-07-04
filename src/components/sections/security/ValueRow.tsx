import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const values = [
  {
    icon: "ShieldCheck",
    title: "Faith-Aligned Security",
    body: "Protection rooted in covenant values — safeguarding the sacred trust of a gathered people.",
    tone: "accent",
  },
  {
    icon: "Users",
    title: "Community Protection",
    body: "Verified members and watchful care so every soul can gather without fear.",
    tone: "sage",
  },
  {
    icon: "Lock",
    title: "Privacy by Design",
    body: "Your story is yours. We collect little, guard it closely, and never sell it.",
    tone: "accent",
  },
  {
    icon: "Eye",
    title: "Transparency First",
    body: "Plain answers, clear controls, and an honest account of how your data is used.",
    tone: "sage",
  },
] as const;

export function ValueRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 0.06}>
          <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm card-hover">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl",
                v.tone === "sage"
                  ? "bg-sage-soft text-sage"
                  : "bg-accent-soft text-accent-strong dark:text-accent",
              )}
            >
              <Icon name={v.icon} size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{v.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{v.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
