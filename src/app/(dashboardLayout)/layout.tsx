import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - PoshFoods",
  description:
    "Manage products, orders, users, and more in the Admin Dashboard of PoshFoods.",
};
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <main className="flex-1 dark:bg-darkBackground p-6 lg:p-8 bg-gradient-to-r from-green-50 to-blue-100 w-full lg:w-3/4">
        <div className="bg-white dark:bg-darkBackground shadow-lg rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
