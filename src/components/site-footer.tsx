"use client";

function scrollToBooking() {
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-12 max-w-7xl px-4 pb-12 sm:px-6">
      <div className="h-px w-full bg-[#c9a96e]/60" aria-hidden />
      <div className="glass-panel mt-8 rounded-3xl px-6 py-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-[#c9a96e] uppercase">
              VECTOR
            </p>
            <p className="mt-2 text-sm text-[var(--foreground)]/60">
              Berlin · Editorial photography
            </p>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-6 text-sm text-[var(--foreground)]/80"
            aria-label="Footer"
          >
            <a href="#work" className="hover:text-[#c9a96e]" aria-label="Work section">
              Work
            </a>
            <a href="#services" className="hover:text-[#c9a96e]" aria-label="Services section">
              Services
            </a>
            <a href="#about" className="hover:text-[#c9a96e]" aria-label="About section">
              About
            </a>
            <button
              type="button"
              onClick={scrollToBooking}
              className="hover:text-[#c9a96e]"
              aria-label="Contact booking section"
            >
              Contact
            </button>
          </nav>

          <div className="flex justify-center gap-4 lg:justify-end">
  <a
    href="https://www.instagram.com/mister_vick01/?hl=en"
    target="_blank"
    rel="noreferrer"
    className="text-[var(--foreground)]/60 hover:text-[#c9a96e] transition"
    aria-label="Instagram"
  >
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  </a>

  <a
    href="https://www.tiktok.com/@mister_vick1"
    target="_blank"
    rel="noreferrer"
    className="text-[var(--foreground)]/60 hover:text-[#c9a96e] transition"
    aria-label="TikTok"
  >
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z"/>
    </svg>
  </a>

  <a
    href="mailto:gdikshan10@gmail.com"
    className="text-[var(--foreground)]/60 hover:text-[#c9a96e] transition"
    aria-label="Email"
  >
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  </a>
</div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Vector Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
