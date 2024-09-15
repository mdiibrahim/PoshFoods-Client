"use client";
import React, { useState } from "react";
import Sidebar from "./SideBar";

interface LayoutProps {
  sections: { [key: string]: React.ReactNode };
}

export default function SharedDashboard({ sections }: LayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("welcome");

  const makeSections = Object.keys(sections).map((section) => ({
    label: section.charAt(0).toUpperCase() + section.slice(1),
    section,
  }));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar setActiveSection={setActiveSection} options={makeSections} />
      <main className="flex-1 p-6 lg:p-8 bg-gradient-to-r from-green-50 to-blue-100 w-full">
        <div className="bg-white dark:bg-darkBackground shadow-md rounded-lg p-6">
          {sections[activeSection]}
        </div>
      </main>
    </div>
  );
}
