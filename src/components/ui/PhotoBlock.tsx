import { cn } from "@/lib/cn";
import { sacredImage } from "@/lib/images";
import { Icon } from "@/components/Icon";

/**
 * Art-directed image slot. Every seed resolves through the curated sacred
 * manifest (src/lib/images.ts) so only faith-appropriate photography ever
 * appears — worship, scripture, chapels, fellowship, dawn light. A warm
 * duotone overlay sits on top, and a stained-glass gradient + glyph is baked
 * underneath so a failed network never shows a raw box.
 */
export function PhotoBlock({
  seed,
  w = 640,
  h = 400,
  className,
  overlay = "dawn",
  icon,
  rounded = "rounded-2xl",
  zoom = false,
  children,
}: {
  seed: string;
  w?: number;
  h?: number;
  className?: string;
  overlay?: "dawn" | "sage" | "ink" | "none";
  icon?: string;
  rounded?: string;
  /** slow ken-burns zoom when an ancestor `.group` is hovered */
  zoom?: boolean;
  children?: React.ReactNode;
}) {
  const overlays: Record<string, string> = {
    dawn: "bg-gradient-to-br from-[#17162b]/70 via-[#3a2a1a]/35 to-[#bd8b34]/30 mix-blend-multiply",
    sage: "bg-gradient-to-br from-[#17162b]/70 via-[#1e3a33]/40 to-[#3a6a5d]/35 mix-blend-multiply",
    ink: "bg-gradient-to-t from-[#0c0b18]/85 via-[#0c0b18]/25 to-transparent",
    none: "",
  };
  return (
    <div className={cn("relative overflow-hidden bg-ink-700", rounded, className)}>
      {/* stained-glass fallback (visible only if the photo fails) */}
      <div
        className="absolute inset-0 grid place-items-center text-white/25"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(214,171,84,0.45), transparent 60%), radial-gradient(70% 70% at 15% 100%, rgba(58,106,93,0.5), transparent 65%), radial-gradient(70% 70% at 90% 90%, rgba(107,90,160,0.45), transparent 65%), linear-gradient(160deg, #1b1930, #26243f)",
        }}
      >
        {icon && <Icon name={icon} size={48} />}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sacredImage(seed, w, h)}
        alt=""
        loading="lazy"
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          zoom && "transition-transform duration-700 ease-out group-hover:scale-[1.07]",
        )}
      />
      {overlay !== "none" && <div className={cn("absolute inset-0", overlays[overlay])} />}
      {children && <div className="relative z-[1] h-full w-full">{children}</div>}
    </div>
  );
}
