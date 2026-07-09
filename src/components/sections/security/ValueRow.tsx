import { Icon } from "@/components/Icon";

const values = [
  {
    icon: "ShieldCheck",
    title: "Faith-Aligned Security",
    body: "Built on values of trust, respect, and Christlike love.",
  },
  {
    icon: "Users",
    title: "Community Protection",
    body: "Tools that help keep our community safe and welcoming.",
  },
  {
    icon: "Lock",
    title: "Privacy by Design",
    body: "Your data is protected and never shared without consent.",
  },
  {
    icon: "CheckCircle2",
    title: "Transparency First",
    body: "Clear policies, honest practices, and open communication.",
  },
] as const;

export function ValueRow() {
  return (
    <div className="grid overflow-hidden rounded-xl border border-border bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4 dark:bg-surface">
      {values.map((v, i) => (
        <div
          key={v.title}
          className={`flex items-start gap-3 p-4 ${i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""}`}
        >
          <span className="mt-0.5 shrink-0 text-ink">
            <Icon name={v.icon} size={26} strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-[15px] font-bold text-ink">{v.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{v.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
