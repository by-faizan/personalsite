"use client";

import { motion, useReducedMotion } from "motion/react";

/* Rises a little from below as it scrolls into view (one-shot). */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
