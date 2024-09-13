// src/app/dashboard/layout.tsx

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 bg-gradient-to-r from-green-50 to-blue-100">
        <div className="bg-white shadow-md rounded-lg p-6">{children}</div>
      </main>
    </div>
  );
}
