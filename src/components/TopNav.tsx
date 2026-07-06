"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { NAV, brand } from "@/lib/nav";
import { useUser } from "@/context/UserContext";
import { Icon } from "./Icon";
import { LogoEmblem } from "./Sacred";
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
        <div className="mx-auto flex h-[4.6rem] max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* brand */}
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${brand.name} home`}>
            <LogoEmblem size={46} className="transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-bold tracking-tight text-ink">{brand.name} App</span>
              <span className="hidden text-[11px] font-medium text-muted sm:block">{brand.tagline}</span>
            </span>
          </Link>

          {/* desktop nav — icon over label with gold underline */}
          <nav className="ml-auto hidden items-stretch gap-1 xl:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex w-[6.2rem] flex-col items-center justify-start gap-1 px-1.5 pb-3 pt-2 text-center transition-colors",
                    active ? "text-accent-strong dark:text-accent" : "text-ink-soft hover:text-accent-strong dark:hover:text-accent",
                  )}
                >
                  <Icon name={item.icon} size={20} strokeWidth={active ? 2.1 : 1.8} />
                  <span className={cn("text-[11px] leading-tight", active ? "font-semibold" : "font-medium")}>
                    {item.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="topnav-underline"
                      className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* right cluster */}
          <div className="ml-auto flex items-center gap-2 xl:ml-4">
            <ThemeToggle className="hidden sm:grid" />
            <SettingsPopover />
            {isAuthenticated ? (
              <button
                onClick={signOut}
                className="hidden items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 transition-colors hover:border-accent/40 sm:flex"
                aria-label="Sign out"
              >
                <Avatar name={user.name} seed={user.id} size={30} />
                <span className="text-sm font-medium text-ink">{user.name.split(" ")[0]}</span>
                <Icon name="LogOut" size={14} />
              </button>
            ) : (
              <Link href="/auth/sign-in" className="hidden sm:block">
                <Button size="sm" variant="primary" icon="LogIn">Sign In</Button>
              </Link>
            )}

            {/* mobile menu button */}
            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-full border border-border bg-surface text-ink xl:hidden"
            >
              <Icon name="Menu" size={18} />
            </button>
          </div>
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
                  <LogoEmblem size={34} />
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
              <div className="relative z-[1] mt-auto border-t border-border p-4">
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
