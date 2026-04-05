"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const taglineWords = "Editorial and lifestyle photography for those who live boldly.".split(" ");

function BlurWord({
  word,
  index,
  reduce,
}: {
  word: string;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.span
      className="inline-block pr-[0.25em] text-zinc-400"
      initial={reduce ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {word}
    </motion.span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "30%"]
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Background image — moves slower than scroll (parallax) */}
      <motion.div
        className="absolute inset-0 -z-10 bg-fixed"
        style={{ y: bgY }}
        aria-hidden
      >
        <Image
          src="
          https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Editorial style woman dramatic pose"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Blue accent overlay */}
        <div className="absolute inset-0 bg-blue-950/30" />
      </motion.div>

      {/* Grain texture */}
      <div className="hero-grain absolute inset-0 -z-[5]" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          className="mb-6 text-xs tracking-[0.35em] text-[#c9a96e] uppercase"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
        >
          Berlin · Photography Studio
        </motion.p>

        <motion.h1
            className="font-semibold tracking-tight text-white flex justify-center"
            style={{
              fontSize: "clamp(80px, 14vw, 160px)",
              lineHeight: 0.95,
            }}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: reduce
                  ? {}
                  : {
                      staggerChildren: 0.06,
                    },
              },
            }}
          >
          {"VECTOR".split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: reduce
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 80, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: reduce
                    ? { duration: 0 }
                    : {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <p className="mt-8 max-w-2xl text-balance text-lg sm:text-xl">
          {taglineWords.map((w, i) => (
            <BlurWord key={`${w}-${i}`} word={w} index={i} reduce={reduce} />
          ))}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo("work")}
            className="glass-panel rounded-full px-8 py-3 text-sm font-medium text-zinc-100"
            aria-label="View portfolio work"
          >
            View Work
          </button>
          <button
            type="button"
            onClick={() => scrollTo("booking")}
            className="rounded-full bg-[#c9a96e] px-8 py-3 text-sm font-medium text-zinc-950 shadow-lg shadow-black/20"
            aria-label="Book a session"
          >
            Book a Session
          </button>
        </div>
      </div>
    </section>
  );
}