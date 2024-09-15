"use client";
import React, { useState } from "react";
import { RiMenuSearchFill } from "react-icons/ri";

interface SidebarProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  options: { label: string; section: string }[];
}

export default function Sidebar({ setActiveSection, options }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="lg:hidden p-6 static   top-20 left-2/4 z-50 "
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <RiMenuSearchFill className="text-primary ml-80 text-4xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative lg:w-64 bg-primary p-4 top-40 lg:top-0 z-40 lg:z-auto left-0 w-2/4 text-white min-h-screen shadow-lg transform transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-3xl font-extrabold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {options.map((option) => (
              <li key={option.section}>
                <button
                  onClick={() => {
                    setActiveSection(option.section);
                    setIsOpen(false); // Close sidebar when clicked
                  }}
                  className="hover:bg-primary-dark p-3 rounded-lg w-full text-left transition-colors duration-200"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        />
      )}
    </>
  );
}
