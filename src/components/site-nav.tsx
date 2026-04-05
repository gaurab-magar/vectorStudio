"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#booking", label: "Contact" },
];

function scrollToHash(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

const navGlass = scrolled
  ? "border-transparent bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-none"
  : "border-transparent bg-transparent shadow-none";
  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-zinc-200/60 dark:border-white/10" : ""
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${navGlass}`}
        >
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.25em] text-[#c9a96e]"
            aria-label="Vector Studio home"
          >
            VECTOR
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(l.href);
                }}
                className="relative pb-0.5 text-sm tracking-wide text-zinc-700 dark:text-zinc-200"
                aria-label={`Navigate to ${l.label}`}
                variants={{ rest: {}, hover: {} }}
                initial="rest"
                whileHover={reduce ? undefined : "hover"}
              >
                <span className="relative z-10">{l.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#c9a96e]"
                  variants={{
                    rest: { scaleX: reduce ? 1 : 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                scrollToHash("#booking");
              }}
              className="hidden rounded-full bg-[#c9a96e] px-4 py-2 text-sm font-medium text-zinc-950 md:inline-flex"
              aria-label="Book now — scroll to booking form"
            >
              Book Now
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 md:hidden dark:border-zinc-600"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[70] bg-black/50 md:hidden"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
className="fixed top-0 right-0 z-[80] flex h-full w-[min(100%,320px)] flex-col border-l border-zinc-200/60 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md p-6 dark:border-white/10 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              aria-label="Mobile navigation"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-[0.25em] text-[#c9a96e]">
                  MENU
                </span>
                <button
                  type="button"
                  className="rounded-full border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-600"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-lg text-zinc-800 dark:text-zinc-100"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(l.href);
                      setMenuOpen(false);
                    }}
                    aria-label={`Navigate to ${l.label}`}
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="mt-4 rounded-full bg-[#c9a96e] px-4 py-3 text-center text-sm font-medium text-zinc-950"
                  onClick={() => {
                    scrollToHash("#booking");
                    setMenuOpen(false);
                  }}
                  aria-label="Book now — scroll to booking form"
                >
                  Book Now
                </button>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
