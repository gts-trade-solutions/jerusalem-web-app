"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV } from "@/lib/nav";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

/** Bottom tab bar for quick thumb access on mobile; full nav lives in the drawer. */
const BAR = ["/", "/neighbor", "/faith", "/music", "/events"];

export function MobileNav() {
  const pathname = usePathname();
  const items = BAR.map((h) => NAV.find((n) => n.href === h)!).filter(Boolean);

  return (
    <nav
      aria-label="Mobile quick nav"
      className="fixed inset-x-0 bottom-0 z-[85] border-t border-border bg-bg/95 backdrop-blur-sm xl:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="mobilenav-dot"
                    className="absolute top-1 size-1 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon name={item.icon} size={20} strokeWidth={active ? 2.2 : 1.75} />
                {item.short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
