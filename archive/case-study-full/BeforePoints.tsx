"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect } from "react";

type Problem = { label: string; text: string };

// How far (px) each point drifts up while the next section slides over it.
// Steps of 24px keep neighbouring points from touching (list gap is 32px).
const DRIFT = [16, 40, 64];

function Point({
  problem,
  progress,
  drift,
}: {
  problem: Problem;
  progress: MotionValue<number>;
  drift: number;
}) {
  const y = useTransform(progress, [0, 1], [0, -drift]);
  return (
    <motion.li
      style={{ y }}
      className="text-[14px] leading-[1.5] tracking-[-0.28px]"
    >
      <span className="font-semibold text-[#ffc7bd]">{problem.label}</span>{" "}
      <span className="font-medium text-[#8d98a5]">{problem.text}</span>
    </motion.li>
  );
}

/* Scroll-linked parallax: progress runs 0 → 1 as the element with `coverId`
   travels from the bottom of the viewport to the top, i.e. while it slides
   over the pinned "Before" section. Smoothed with a spring. */
export function BeforePoints({
  problems,
  coverId,
}: {
  problems: Problem[];
  coverId: string;
}) {
  const reduce = useReducedMotion();
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const cover = document.getElementById(coverId);
    if (!cover) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = cover.getBoundingClientRect().top;
      const h = window.innerHeight;
      raw.set(Math.min(1, Math.max(0, (h - top) / h)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [coverId, raw, reduce]);

  return (
    <ul className="flex flex-col gap-8 lg:pl-[152px] lg:pr-6">
      {problems.map((p, i) => (
        <Point
          key={p.label}
          problem={p}
          progress={progress}
          drift={reduce ? 0 : (DRIFT[i] ?? DRIFT[DRIFT.length - 1])}
        />
      ))}
    </ul>
  );
}
