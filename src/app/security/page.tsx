import Link from "next/link";
import { SectionHero } from "@/components/ui/SectionHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { ribbons } from "@/data/scriptures";
import { ValueRow } from "@/components/sections/security/ValueRow";
import { SecurityPillars } from "@/components/sections/security/SecurityPillars";
import { SecurityTools } from "@/components/sections/security/SecurityTools";
import { ContactSupport } from "@/components/sections/security/ContactSupport";

export const metadata = { title: "Security & More" };

export default function SecurityPage() {
  return (
    <>
      <SectionHero
        eyebrow="Authentication & Security"
        image="hero-security"
        align="left"
        title="Your Safety. Our Priority."
        subtitle="A gathered people can only flourish where every soul feels safe. These tools guard your account, shelter our youth, and keep trust at the heart of the community."
        verse={ribbons.security.featured}
        icon="ShieldCheck"
      >
        <Link href="#pillars">
          <Button size="lg" variant="accent" icon="ShieldCheck">
            Review my protections
          </Button>
        </Link>
        <Link href="#support">
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10"
            iconRight="ArrowRight"
          >
            Contact support
          </Button>
        </Link>
      </SectionHero>

      {/* Value row */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Why It Matters"
            title="Security built on covenant trust"
            intro="Four commitments shape how we protect this gathering and everyone in it."
          />
          <div className="mt-10">
            <ValueRow />
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section id="pillars" className="scroll-mt-20 border-y border-border bg-surface-2/50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Your Security Controls"
            title="Four pillars, fully in your hands"
            intro="Open any pillar to manage the real settings that keep your account and our community safe."
          />
          <div className="mt-10">
            <SecurityPillars />
          </div>
        </Container>
      </section>

      {/* Additional tools */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="More Tools"
            title="Additional security & privacy tools"
            intro="Everything else you need to stay informed and in control."
          />
          <div className="mt-10">
            <SecurityTools />
          </div>
        </Container>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-20 pb-16 sm:pb-24">
        <Container>
          <ContactSupport />
        </Container>
      </section>

      <ScriptureRibbon page="security" />
    </>
  );
}
