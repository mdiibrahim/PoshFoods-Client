import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";
import UIProvider from "@/lib/Provider";

export const metadata: Metadata = {
  title: "PoshFoods-Bangladesh",
  description: "Fresh groceries and delicious meals delivered fast and fresh.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <div className="dark text-foreground bg-background">{children}</div>
        </UIProvider>
      </body>
    </html>
  );
}
