"use client";

import { useEffect, useState } from "react";
import { homeConcepts } from "@/data/homeConcepts";
import { HomeConcept } from "./HomeConcept";

/** Rotates the three Home concepts — auto-advance + manual dots. */
export function HomeCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const c = homeConcepts[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % homeConcepts.length), 9000);
    return () => clearInterval(t);
  }, [paused, idx]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* keyed CSS fade-in on switch — no exit animation to block on */}
      <div key={c.id} className="animate-concept-in">
        <HomeConcept c={c} nav={{ index: idx, count: homeConcepts.length, go: setIdx }} />
      </div>
    </div>
  );
}
