"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState, type ReactElement } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  sessionDate: string;
  location: string;
  budget: string;
  instagram: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  serviceType: "Portrait Session",
  sessionDate: "",
  location: "",
  budget: "€75 - €1,000",
  instagram: "",
  message: "",
};

const BUDGET_OPTIONS = [
  { label: "€75–1k", value: "€75 - €1,000" },
  { label: "€1k–2.5k", value: "€1,000 - €2,500" },
  { label: "€2.5k–5k", value: "€2,500 - €5,000" },
  { label: "€5k+", value: "€5,000+" },
] as const;

const SHOOT_OPTIONS: {
  value: FormState["serviceType"];
  label: string;
  Icon: () => ReactElement;
}[] = [
  {
    value: "Portrait Session",
    label: "Portrait Session",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "Wedding",
    label: "Wedding",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <path d="M12 5c1.2 0 2.2 1 2.2 2.2 0 1.2-1 2.2-2.2 2.2S9.8 8.4 9.8 7.2 10.8 5 12 5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 19c0-3 2.2-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "Editorial",
    label: "Editorial",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "Lifestyle Campaign",
    label: "Lifestyle Campaign",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    value: "Event Coverage",
    label: "Event Coverage",
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 3v4M16 3v4M4 11h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ESCAPE_POSITIONS = [
  { x: 120, y: 0 },
  { x: -120, y: 0 },
  { x: 90, y: -60 },
  { x: -90, y: -60 },
  { x: 90, y: 60 },
  { x: -90, y: 60 },
  { x: 0, y: -80 },
  { x: 0, y: 80 },
];

function RunAwayButton({
  isLocked,
  onClick,
}: {
  isLocked: boolean;
  onClick: () => void;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [lastIndex, setLastIndex] = useState(-1);
  const reduce = useReducedMotion();

  function escape() {
    if (!isLocked || reduce) return;
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * ESCAPE_POSITIONS.length);
    } while (nextIndex === lastIndex);
    setLastIndex(nextIndex);
    setPos(ESCAPE_POSITIONS[nextIndex]);
    setTimeout(() => setPos({ x: 0, y: 0 }), 700);
  }

  function handleClick() {
    if (isLocked) {
      escape();
      return;
    }
    onClick();
  }

  return (
    <motion.button
      type="button"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onMouseEnter={escape}
      onClick={handleClick}
      className={`rounded-full bg-[#c9a96e] px-5 py-2.5 text-sm font-medium text-zinc-950 select-none ${
        isLocked ? "cursor-not-allowed" : ""
      }`}
      aria-label="Next step"
    >
      Next
    </motion.button>
  );
}

type BookingFormProps = {
  initialServiceType?: string;
};

export function BookingForm({ initialServiceType }: BookingFormProps) {
  const [form, setForm] = useState<FormState>(() => ({
    ...initialState,
    serviceType: initialServiceType ?? initialState.serviceType,
  }));
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const reduce = useReducedMotion();

  const inputClassName =
    "w-full rounded-xl border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[#c9a96e]";

  const isStep2Locked =
    step === 2 && (!form.sessionDate.trim() || !form.location.trim());

  function goBack() {
    setFeedback("");
    setStatus("idle");
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.message ?? "Could not submit your booking request.");
        return;
      }

      setStatus("success");
      setFeedback("Booking request sent. Vector will contact you within 24 hours.");
      setForm(initialState);
      setStep(1);
    } catch {
      setStatus("error");
      setFeedback("Network issue. Please try again in a moment.");
    }
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 3) return;
    void submitBooking(event);
  }

  function handleNext() {
    setFeedback("");
    setStatus("idle");
    if (step === 2) {
      if (!form.sessionDate.trim() || !form.location.trim()) {
        setFeedback("Please pick a date and location before continuing.");
        setStatus("error");
        return;
      }
    }
    setDirection(1);
    setStep((s) => Math.min(3, s + 1));
  }

  const stepVariants = {
    enter: (dir: number) => ({
      x: reduce ? 0 : dir > 0 ? 48 : -48,
      opacity: reduce ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduce ? 0 : dir > 0 ? -48 : 48,
      opacity: reduce ? 1 : 0,
    }),
  };

  return (
    <form onSubmit={onFormSubmit} className="glass-panel grid gap-8 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2" role="status" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((s) => (
            <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--foreground)]/10">
              <div
                className={`h-full rounded-full bg-[#c9a96e] transition-all duration-500 ${
                  s <= step ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
        <span className="text-xs tracking-widest text-[var(--foreground)]/50 uppercase">
          {step}/3
        </span>
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[280px]"
        >
          {step === 1 ? (
            <div className="grid gap-4">
              <div>
                <h4 className="text-lg font-semibold text-[var(--foreground)]">
                  What are we shooting?
                </h4>
                <p className="mt-1 text-sm text-[var(--foreground)]/60">
                  Choose the session that best fits your project.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SHOOT_OPTIONS.map((opt) => {
                  const selected = form.serviceType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, serviceType: opt.value }))}
                      className={`flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition border ${
                        selected
                          ? "border-[#c9a96e] bg-[#c9a96e]/10 ring-2 ring-[#c9a96e]/50 shadow-[0_0_24px_rgba(201,169,110,0.25)]"
                          : "border-[var(--foreground)]/15 bg-[var(--foreground)]/5 hover:border-[var(--foreground)]/30"
                      }`}
                      aria-label={`Select ${opt.label}`}
                      aria-pressed={selected}
                    >
                      <span className="text-[#c9a96e]">
                        <opt.Icon />
                      </span>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5">
              <div>
                <h4 className="text-lg font-semibold text-[var(--foreground)]">
                  When and where?
                </h4>
                <p className="mt-1 text-sm text-[var(--foreground)]/60">
                  Date, location, budget, and your Instagram handle.
                </p>
              </div>
              <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                Preferred date
                <input
                  required
                  type="date"
                  className={inputClassName}
                  value={form.sessionDate}
                  onChange={(e) => setForm((p) => ({ ...p, sessionDate: e.target.value }))}
                  aria-label="Preferred session date"
                />
              </label>
              <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                Location
                <input
                  required
                  className={inputClassName}
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  placeholder="Berlin / destination"
                  aria-label="Shoot location"
                />
              </label>
              <div>
                <p className="mb-2 text-sm text-[var(--foreground)]/80">Budget</p>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((b) => {
                    const active = form.budget === b.value;
                    return (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, budget: b.value }))}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-[#c9a96e] text-zinc-950"
                            : "border border-[var(--foreground)]/20 bg-[var(--foreground)]/5 text-[var(--foreground)] hover:border-[var(--foreground)]/40"
                        }`}
                        aria-label={`Budget ${b.label}`}
                        aria-pressed={active}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                Instagram (optional)
                <input
                  className={inputClassName}
                  value={form.instagram}
                  onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
                  placeholder="@username"
                  aria-label="Instagram handle"
                />
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4">
              <div>
                <h4 className="text-lg font-semibold text-[var(--foreground)]">
                  Tell me about you
                </h4>
                <p className="mt-1 text-sm text-[var(--foreground)]/60">
                  Contact details and a short brief.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                  Full name
                  <input
                    required
                    className={inputClassName}
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    aria-label="Full name"
                  />
                </label>
                <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                  Email
                  <input
                    required
                    type="email"
                    className={inputClassName}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    aria-label="Email address"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                Phone
                <input
                  required
                  className={inputClassName}
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  aria-label="Phone number"
                />
              </label>
              <label className="grid gap-1 text-sm text-[var(--foreground)]/80">
                Tell me about your project
                <textarea
                  required
                  rows={4}
                  className={inputClassName}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Project style, timeline, mood, and goals..."
                  aria-label="Project message"
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-full bg-[#c9a96e] px-6 py-3 text-sm font-medium text-zinc-950 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                aria-label="Send booking request"
              >
                {status === "loading" ? "Sending..." : "Send Booking Request"}
              </button>

              {feedback ? (
                <p className={status === "success"
                  ? "text-sm text-emerald-600 dark:text-emerald-400"
                  : "text-sm text-rose-600 dark:text-rose-400"
                }>
                  {feedback}
                </p>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="rounded-full border border-[var(--foreground)]/30 px-5 py-2.5 text-sm text-[var(--foreground)] transition enabled:hover:bg-[var(--foreground)]/10 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous step"
        >
          Back
        </button>

        {step < 3 ? (
          <RunAwayButton isLocked={isStep2Locked} onClick={handleNext} />
        ) : null}
      </div>

      {step < 3 && feedback ? (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          {feedback}
        </p>
      ) : null}
    </form>
  );
}