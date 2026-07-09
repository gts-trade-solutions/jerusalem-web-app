import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const max = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[size];
  return <div className={cn("mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8", max, className)}>{children}</div>;
}

export function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {icon}
      {children}
    </span>
  );
}
