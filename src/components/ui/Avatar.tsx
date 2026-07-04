import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

const GRADIENTS = [
  "from-[#b58a3c] to-[#7a5320]",
  "from-[#3a6a5d] to-[#22423a]",
  "from-[#6b5aa0] to-[#3c3168]",
  "from-[#a8563f] to-[#6e3324]",
  "from-[#4a7a8c] to-[#2b4a56]",
  "from-[#9a6a8c] to-[#5f3d54]",
];

function hueFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export function Avatar({
  name,
  seed,
  size = 40,
  className,
  ring,
}: {
  name: string;
  seed?: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white/95 select-none",
        hueFor(seed ?? name),
        ring && "ring-2 ring-accent/60 ring-offset-2 ring-offset-surface",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
