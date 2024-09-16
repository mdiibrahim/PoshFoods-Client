import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import UIProvider from "@/lib/Provider";
import { Merriweather } from "next/font/google";

// Load Merriweather font with Light 300 weight
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: "300", // Light 300 weight
  style: "normal", // Set style to normal
});
export const metadata: Metadata = {
  title: "PoshFoods-Bangladesh",
  description: "Fresh groceries and delicious meals delivered fast and fresh.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`bg-light text-black dark:bg-dark ${merriweather.className} dark:text-white`}
      >
        <UIProvider>
          <div className="">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
