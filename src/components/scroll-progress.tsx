"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) {
    return null;
  }

  // Wrap in a relative container to ensure non-static parent if needed
  return (
    <div style={{ position: "relative", width: "100%", height: 0 }}>
      <motion.div
        className="fixed top-0 left-0 z-[60] h-0.5 w-full origin-left bg-[#c9a96e]"
        style={{ scaleX }}
        aria-hidden
      />
    </div>
  );
}
