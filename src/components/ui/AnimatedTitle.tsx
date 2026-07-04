"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Word-by-word title reveal — rises out of a soft blur like morning light. */
export function AnimatedTitle({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");
  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.5em" },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.22, 0.7, 0.2, 1] },
                },
              }}
            >
              {w}
            </motion.span>{" "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
