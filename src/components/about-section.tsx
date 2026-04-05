"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/components/motion-config";
import { getFadeVariants } from "@/components/motion-variants";

export function AboutSection() {
  const reduce = useReducedMotion();
  const fadeVariants = getFadeVariants(reduce);

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.div
        className="mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeVariants}
      >
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a96e] uppercase">
          About
        </p>
        
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Vector Studio
        </h2>
      </motion.div>

      <motion.div
        className="grid gap-12 md:grid-cols-2 md:items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="relative mx-auto w-full max-w-md">
        <div className="relative aspect-square overflow-hidden rounded-full border-2 border-[#c9a96e]/80 shadow-2xl shadow-black/25">
          <Image
            src="https://scontent-fra5-1.cdninstagram.com/v/t51.82787-19/619778097_18550316887021262_3854526690594275171_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-fra5-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2gG7gsyOe3EYF7TKvkjvnx-Fjw3rFsMzHnOBvPUcgnEi9Conkz1gbgvXaV8e08J41iw6xoojyXssdz1qtzdY5i6S&_nc_ohc=1vkRwRiq3XEQ7kNvwG3sxUN&_nc_gid=NE0Axedb2AnJNXEn4eL0RA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af1WmSItToQiie_GBIRgLqXBZzjop2PjjE64fnunuApSJQ&oe=69D560F2&_nc_sid=7a9f4b"
            alt="Vector portrait"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[var(--foreground)]/80">
            Kenya-born and Berlin-based, Vector specializes in editorial and lifestyle
            photography — crafting images that feel cinematic, intimate, and true to the
            moment. From portraits to campaigns, every frame is built with intention.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "150+ shoots",
              "8 years experience",
              "12 countries",
            ].map((label) => (
              <span
                key={label}
                className="glass-panel rounded-full px-4 py-2 text-sm text-[var(--foreground)]"
              >
                {label}
              </span>
            ))}
          </div>
          <div>
            <a
              href="/press-kit.pdf"
              className="inline-flex rounded-full border border-[#c9a96e] px-5 py-2.5 text-sm font-medium text-[#c9a96e] transition hover:bg-[#c9a96e]/10"
              aria-label="Download press kit PDF"
            >
              Download Press Kit
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
