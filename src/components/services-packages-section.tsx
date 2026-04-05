"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/components/motion-config";
import { getFadeVariants } from "@/components/motion-variants";

const packages = [
  {
    name: "Essential",
    blurb: "Portrait · 2hr · 30 edited photos",
    price: "€600",
    highlight: false,
    defaultShoot: "Portrait Session",
  },
  {
    name: "Signature",
    blurb: "Half-day · 80 edited photos · digital delivery",
    price: "€1,500",
    highlight: true,
    defaultShoot: "Editorial",
  },
  {
    name: "Premium",
    blurb: "Full-day · 200+ photos · print license · priority delivery",
    price: "€3,500",
    highlight: false,
    defaultShoot: "Lifestyle Campaign",
  },
] as const;

type ServicesPackagesSectionProps = {
  onBookPackage: (defaultShoot: string) => void;
};

export function ServicesPackagesSection({ onBookPackage }: ServicesPackagesSectionProps) {
  const reduce = useReducedMotion();
  const fadeVariants = getFadeVariants(reduce);

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6"
    >
      <motion.div
        className="mb-14 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeVariants}
      >
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a96e] uppercase">
          Services
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Packages
        </h2>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduce ? 0 : 0.1 },
          },
        }}
      >
        {packages.map((pkg) => (
          <motion.article
            key={pkg.name}
            variants={fadeUp}
            whileHover={
              reduce
                ? undefined
                : { scale: 1.02, y: -4, transition: { duration: 0.2 } }
            }
            className={`glass-panel relative flex flex-col rounded-3xl p-8 ${
              pkg.highlight
                ? "border-[#c9a96e] ring-2 ring-[#c9a96e]/40"
                : ""
            }`}
          >
            {pkg.highlight ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c9a96e] px-3 py-1 text-xs font-medium text-zinc-950">
                Most Popular
              </span>
            ) : null}
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              {pkg.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--foreground)]/70">
              {pkg.blurb}
            </p>
            <p className="mt-6 text-2xl font-semibold text-[#c9a96e]">{pkg.price}</p>
            <button
              type="button"
              className="mt-6 rounded-full border border-[#c9a96e]/50 bg-transparent px-5 py-2.5 text-sm font-medium text-[#c9a96e] transition hover:bg-[#c9a96e]/10"
              onClick={() => onBookPackage(pkg.defaultShoot)}
              aria-label={`Book ${pkg.name} package`}
            >
              Book this package
            </button>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
