import Link from "next/link";
import { NAV, brand } from "@/lib/nav";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";
import { LogoEmblem, Ornament } from "./Sacred";

export function Footer() {
  return (
    <footer className="lattice relative border-t border-border bg-surface-2/60 pb-20 xl:pb-0">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoEmblem size={38} />
              <span className="font-serif text-lg font-bold text-ink">{brand.name} App</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted text-pretty">
              {brand.tagline}. A private, faith-centered community for Latter-day Saints and searching friends.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">Explore</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent">
                    <Icon name={item.icon} size={14} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">Gather with us</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li className="inline-flex items-center gap-2"><Icon name="Mail" size={14} /> gather@newjerusalem.faith</li>
              <li className="inline-flex items-center gap-2"><Icon name="MapPin" size={14} /> Wards & branches worldwide</li>
              <li className="inline-flex items-center gap-2"><Icon name="Heart" size={14} /> All are welcome here</li>
            </ul>
          </div>
        </div>

        <Ornament className="mt-10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-faint">
            © 2026 {brand.name}. A community demo — no real accounts or data.
          </p>
          <p className="font-serif text-sm italic text-muted">“That they may be one, even as we are one.”</p>
        </div>
      </Container>
    </footer>
  );
}
