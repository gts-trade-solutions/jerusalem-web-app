import { Container } from "@/components/ui/Container";
import { ScriptureRibbon } from "@/components/ScriptureRibbon";
import { SecurityHero } from "@/components/sections/security/SecurityHero";
import { ValueRow } from "@/components/sections/security/ValueRow";
import { SecurityPillars } from "@/components/sections/security/SecurityPillars";
import { SecurityTools } from "@/components/sections/security/SecurityTools";

export const metadata = { title: "Security & More" };

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />

      {/* Value row */}
      <section className="pt-4 sm:pt-5">
        <Container size="wide">
          <ValueRow />
        </Container>
      </section>

      {/* Four pillars */}
      <section className="pt-4 sm:pt-5">
        <Container size="wide">
          <SecurityPillars />
        </Container>
      </section>

      {/* Additional tools + Need Help */}
      <section className="py-4 sm:py-5">
        <Container size="wide">
          <SecurityTools />
        </Container>
      </section>

      <ScriptureRibbon page="security" tone="green" minimal />
    </>
  );
}
