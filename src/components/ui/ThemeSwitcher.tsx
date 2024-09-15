"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log(theme);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background text-primary-green">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2 bg-transparent border-none text-black dark:text-white"
      >
        {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
