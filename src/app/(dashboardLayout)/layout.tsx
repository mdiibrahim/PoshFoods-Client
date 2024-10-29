import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - PoshFoods",
  description:
    "Manage products, orders, users, and more in the Admin Dashboard of PoshFoods.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row dark:bg-darkBackground dark:text-darkText">
      <main className="flex-1 m-6 lg:m-8 w-full lg:w-3/4">
        <div className="shadow-md rounded-lg p-6 dark:bg-darkBackground dark:text-darkText">
          {children}
        </div>
      </main>
    </div>
  );
}
