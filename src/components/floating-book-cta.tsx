"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 6l1.2-2h5.6L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function FloatingBookCta() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const opacity = useTransform(scrollY, (y) => {
    if (reduce) return y > 300 ? 1 : 0;
    return Math.min(1, Math.max(0, y / 300));
  });

  const y = useTransform(scrollY, [0, 300], reduce ? [0, 0] : [64, 0]);

  function scrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.div
      className="fixed right-4 bottom-6 z-40 md:right-8"
      style={{ opacity, y }}
    >
      {!reduce ? (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-[#c9a96e]/50"
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      ) : null}
      <button
        type="button"
        onClick={scrollToBooking}
        className="glass-panel relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[#c9a96e] shadow-lg"
        aria-label="Book a session — scroll to booking form"
      >
        <CameraIcon />
        Book a Session
      </button>
    </motion.div>
  );
}
