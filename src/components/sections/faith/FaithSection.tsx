"use client";

import { Container } from "@/components/ui/Container";
import { SkylineArt } from "@/components/Sacred";
import { FaithSidebar } from "./FaithSidebar";
import { FaithDashboard } from "./FaithDashboard";

const ROW1 = [
  "1 Peter 3:15", "Acts 16:33", "Acts 18:9", "1 Peter 1:15", "Psalm 40:10",
  "Mosiah 18:9", "Jeremiah 9:3", "Philippians 1:14",
];
const ROW2 = ["D&C 100:5", "D&C 33:8", "D&C 84:85", "D&C 100:6", "D&C 60:2"];

export function FaithSection() {
  return (
    <>
      <section className="bg-bg-tint py-5 sm:py-6">
        <Container size="wide">
          <div className="grid gap-4 lg:grid-cols-[15.5rem_1fr]">
            <FaithSidebar />
            <FaithDashboard />
          </div>
        </Container>
      </section>

      {/* Scripture References ribbon */}
      <section className="relative overflow-hidden border-t-2 border-[#c9a13b] bg-ink-900 text-white" aria-label="Scripture references">
        <SkylineArt className="pointer-events-none absolute bottom-1 left-[max(1rem,calc(50%_-_32rem))] h-14 w-56 opacity-70 sm:h-16 sm:w-64" />
        <Container className="relative z-[1] py-7 text-center">
          <p className="font-serif text-lg font-bold text-white">Scripture References</p>
          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
            {ROW1.map((r, i) => (
              <span key={`a-${r}-${i}`} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/30">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r}</span>
              </span>
            ))}
          </div>
          <div className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/85">
            {ROW2.map((r, i) => (
              <span key={`b-${r}-${i}`} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-white/30">|</span>}
                <span className="font-medium transition-colors hover:text-[#e6c164]">{r}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
