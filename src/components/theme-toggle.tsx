"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <button
        type="button"
        className="glass-panel rounded-full px-4 py-2 text-sm text-zinc-800 transition hover:border-[#c9a96e]/40 dark:text-zinc-200 opacity-50 cursor-not-allowed"
        aria-label="Toggle theme"
        disabled
      >
        ...
      </button>
    );
  }
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass-panel rounded-full px-4 py-2 text-sm text-zinc-800 transition hover:border-[#c9a96e]/40 dark:text-zinc-200"
      aria-label="Toggle theme"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
