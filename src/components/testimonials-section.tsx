"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp } from "@/components/motion-config";
import { getFadeVariants } from "@/components/motion-variants";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mira Köhler",
    shoot: "Editorial portrait",
    quote:
      "Vector brought a calm presence and an eye for light that made the whole campaign feel effortless.",
  },
  {
    id: "t2",
    name: "Jonas & Felix",
    shoot: "Wedding",
    quote:
      "Our gallery felt cinematic yet honest — every frame looked considered without feeling staged.",
  },
  {
    id: "t3",
    name: "Studio Lumen",
    shoot: "Lifestyle campaign",
    quote:
      "Clear communication, fast turnaround, and edits that matched our brand mood perfectly.",
  },
  {
    id: "t4",
    name: "Elena Rossi",
    shoot: "Event coverage",
    quote:
      "He disappeared into the crowd and still delivered hero shots we used across every channel.",
  },
] as const;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const fadeVariants = getFadeVariants(reduce);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  const active = TESTIMONIALS[index];

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <motion.div
        className="mb-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeVariants}
      >
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a96e] uppercase">
          Testimonials
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Words from clients
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-10"
      >
       <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg leading-relaxed text-[var(--foreground)] md:text-xl">
              "{active.quote}"
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-2 text-sm text-[var(--foreground)]/60">
              <span className="font-medium text-[var(--foreground)]">
                {active.name}
              </span>
              <span aria-hidden>·</span>
              <span className="tracking-wide uppercase">{active.shoot}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-[#c9a96e]" : "bg-zinc-400/50 dark:bg-zinc-600"
              }`}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
