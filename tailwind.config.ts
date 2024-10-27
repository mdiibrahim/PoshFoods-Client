import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1ABC9C", // Teal
        secondary: "#2980B9", // Dark Blue
        backgroundColor: "#e2e8f0",
        textColor: "#333333", // Dark Gray
        success: "#27AE60", // Green
        warning: "#E67E22", // Orange
        error: "#E74C3C", // Red
        darkBackground: "#0D1B2A", // Dark mode background
        darkText: "#FFFFFF", // Dark mode text color
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [nextui(), require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
