"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookingForm } from "@/components/booking-form";
import { fadeUp } from "@/components/motion-config";
import { getFadeVariants } from "@/components/motion-variants";

type BookingSectionProps = {
  prefillServiceType?: string;
};

export function BookingSection({ prefillServiceType }: BookingSectionProps) {
  const reduce = useReducedMotion();
  const fadeVariants = getFadeVariants(reduce);

  return (
    <section
      id="booking"
      className="mx-auto max-w-7xl scroll-mt-28 px-4 py-24 sm:px-6"
    >
      <motion.div
        className="mb-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeVariants}
      >
        <p className="mb-3 text-xs tracking-[0.35em] text-[#c9a96e] uppercase">
          Booking
        </p>
        
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Let&apos;s Create Something
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-[var(--foreground)]/60">
          Tell me about your vision and I&apos;ll be in touch within 24 hours.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-2xl"
      >
        <BookingForm
          key={prefillServiceType ?? "default"}
          initialServiceType={prefillServiceType}
        />
      </motion.div>
    </section>
  );
}
