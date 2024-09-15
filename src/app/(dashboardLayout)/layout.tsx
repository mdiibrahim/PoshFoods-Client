import { ReactNode } from "react";

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
