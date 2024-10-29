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
    <div className="min-h-screen flex flex-col lg:flex-row dark:bg-darkBackground dark:text-darkText">
      <Sidebar setActiveSection={setActiveSection} options={makeSections} />
      <main className="flex-1 dark:border border-gray-100 w-full">
        <div className=" p-10 dark:bg-darkBackground dark:text-darkText">
          {sections[activeSection]}
        </div>
      </main>
    </div>
  );
}
