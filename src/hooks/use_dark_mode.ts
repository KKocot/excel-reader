import { useEffect, useState } from "react";

/**
 * Custom hook for managing dark mode state
 * Persists preference in localStorage and applies 'dark' class to html element
 */
export const use_dark_mode = () => {
  const [is_dark, set_is_dark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      return stored === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (is_dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [is_dark]);

  const toggle = () => set_is_dark((prev) => !prev);

  return { is_dark, toggle };
};
