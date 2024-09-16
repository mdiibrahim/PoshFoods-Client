import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import UIProvider from "@/lib/Provider";

export const metadata: Metadata = {
  title: "PoshFoods-Bangladesh",
  description: "Fresh groceries and delicious meals delivered fast and fresh.",
  icons: {
    shortcut: "/icons/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`bg-light text-black dark:bg-dark dark:text-white`}>
        <UIProvider>
          <div className="">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
