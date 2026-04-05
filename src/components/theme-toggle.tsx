"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
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
