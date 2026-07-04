import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <Reveal className={cn(align === "center" ? "max-w-2xl" : "max-w-xl")}>
        {eyebrow && (
          <span className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent", align === "center" && "justify-center")}>
            <span className="h-px w-8 bg-gradient-to-l from-accent to-transparent" aria-hidden />
            {eyebrow}
            {align === "center" && <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" aria-hidden />}
          </span>
        )}
        <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl text-balance">
          {title}
        </h2>
        {intro && <p className="mt-3 text-base leading-relaxed text-muted text-pretty">{intro}</p>}
      </Reveal>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
