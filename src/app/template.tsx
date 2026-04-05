"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { fadeUp, fadeUpReduced } from "@/components/motion-config";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const variants = reduce ? fadeUpReduced : fadeUp;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        className="min-h-0 flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
