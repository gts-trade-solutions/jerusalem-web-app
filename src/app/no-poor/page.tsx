import { HomeConcept } from "@/components/sections/home/HomeConcept";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/Icon";
import { homeConcepts } from "@/data/homeConcepts";

export const metadata = { title: "No Poor Among Us" };

const infoBar = (
  <section className="bg-white py-5 dark:bg-bg">
    <Container size="wide">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3.5">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ink-900 text-white">
          <Icon name="Info" size={16} />
        </span>
        <p className="text-sm leading-relaxed text-ink-soft">
          Many of these links herein are maintained by NJ (New Jerusalem) Community Development, which also has a
          separate website,{" "}
          <a href="https://www.nopooramongthem.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1d4ed8] underline dark:text-[#7ea4f5]">
            https://www.nopooramongthem.com/
          </a>
          , and posts many projects on{" "}
          <a href="https://www.justserve.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1d4ed8] underline dark:text-[#7ea4f5]">
            https://www.justserve.org/
          </a>
          .
        </p>
      </div>
    </Container>
  </section>
);

export default function NoPoorPage() {
  return <HomeConcept c={homeConcepts.find((c) => c.id === "welfare")!} infoBar={infoBar} />;
}
