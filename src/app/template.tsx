"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Gentle fade-and-rise transition on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
