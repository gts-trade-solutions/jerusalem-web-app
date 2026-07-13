"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { NAV, brand } from "@/lib/nav";
import { useUser } from "@/context/UserContext";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { SettingsPopover } from "./SettingsPopover";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function TopNav() {
  const pathname = usePathname();
  const { isAuthenticated, user, signOut } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setDrawer(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[80] border-b border-border bg-bg/95 backdrop-blur-sm transition-shadow duration-300",
          scrolled && "shadow-sm",
        )}
      >
        {/* reading progress hairline */}
        <motion.span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent-strong via-accent to-[#e6c164]"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
        <div className="mx-auto flex h-[4.9rem] max-w-[1440px] items-stretch gap-4 px-4 sm:px-6 lg:px-8">
          {/* brand */}
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${brand.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-seal.png" alt="" width={48} height={48} className="size-12 shrink-0 select-none rounded-full transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold tracking-tight text-ink lg:text-xl">{brand.name} App</span>
              <span className="hidden text-[11px] font-medium text-muted sm:block">{brand.tagline}</span>
            </span>
          </Link>

          {/* desktop nav — icon over 2-line label with aligned gold underline */}
          <nav className="ml-auto hidden items-stretch xl:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex w-[6.15rem] flex-col items-center gap-1.5 px-0.5 pt-3 text-center transition-colors",
                    active ? "text-accent-strong dark:text-accent" : "text-ink-soft hover:text-accent-strong dark:hover:text-accent",
                  )}
                >
                  <Icon name={item.icon} size={21} strokeWidth={active ? 2.1 : 1.8} />
                  <span className={cn("flex h-[2.3rem] items-start justify-center text-[10px] leading-[1.15] line-clamp-2", active ? "font-semibold" : "font-medium")}>
                    {item.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="topnav-underline"
                      className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* mobile / tablet menu button */}
          <button
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            className="my-auto ml-auto grid size-10 place-items-center rounded-full border border-border bg-surface text-ink xl:hidden"
          >
            <Icon name="Menu" size={18} />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[95] xl:hidden">
            <motion.div
              className="absolute inset-0 bg-ink-900/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-border bg-surface shadow-float grain"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className="relative z-[1] flex items-center justify-between border-b border-border px-5 py-4">
                <span className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-seal.png" alt="" width={34} height={34} className="size-9 rounded-full" />
                  <span className="font-serif text-lg font-bold text-ink">{brand.name} App</span>
                </span>
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="Close menu"
                  className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              <nav className="relative z-[1] flex flex-col gap-1 p-4" aria-label="Mobile">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                        active ? "bg-accent-soft text-accent-strong dark:text-accent" : "text-ink-soft hover:bg-surface-2",
                      )}
                    >
                      <span className={cn("grid size-9 place-items-center rounded-lg", active ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted")}>
                        <Icon name={item.icon} size={17} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="text-[11px] text-faint">{item.blurb}</span>
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <div className="relative z-[1] mt-auto space-y-3 border-t border-border p-4">
                <div className="flex items-center justify-between rounded-xl border border-border p-2.5">
                  <span className="pl-1 text-xs font-semibold uppercase tracking-wide text-faint">Preview tools</span>
                  <span className="flex items-center gap-2">
                    <ThemeToggle />
                    <SettingsPopover />
                  </span>
                </div>
                {isAuthenticated ? (
                  <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl border border-border p-3">
                    <Avatar name={user.name} seed={user.id} size={38} />
                    <span className="flex-1 text-left">
                      <span className="block text-sm font-semibold text-ink">{user.name}</span>
                      <span className="block text-xs text-faint">Signed in · {user.role}</span>
                    </span>
                    <Icon name="LogOut" size={16} />
                  </button>
                ) : (
                  <Link href="/auth/sign-in">
                    <Button block variant="accent" icon="LogIn">Sign in to gather</Button>
                  </Link>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
