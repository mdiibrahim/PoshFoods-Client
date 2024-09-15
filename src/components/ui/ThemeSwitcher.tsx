"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative flex items-center justify-between w-16 h-8 p-1 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-all duration-300 ease-in-out"
      >
        {/* Circle Toggle */}
        <div
          className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-8" : ""
          }`}
        />

        {/* Sun Icon */}
        <FaSun
          className={`text-yellow-500 transition-opacity duration-300 ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Moon Icon */}
        <FaMoon
          className={`text-gray-700 dark:text-yellow-300 transition-opacity duration-300 ${
            theme === "light" ? "opacity-0" : "opacity-100"
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
