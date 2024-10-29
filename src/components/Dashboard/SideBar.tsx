"use client";
import React, { useState } from "react";
import { RiMenuSearchFill } from "react-icons/ri";
import { Tooltip, Button } from "@nextui-org/react";
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
      <Tooltip color="primary" content="Open DashBoard Menu" placement="bottom">
        <Button
          className="lg:hidden static inset-x-0 mx-auto p-6 top-20 z-50 flex justify-center items-center"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <RiMenuSearchFill className="text-primary text-4xl" />
        </Button>
      </Tooltip>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen
            ? "translate-x-0 dark:bg-darkBackground dark:text-darkText "
            : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative lg:w-64 bg-primary p-6 top-40 lg:top-0 z-40 dark:border border-gray-100 dark:bg-darkBackground lg:z-auto left-0 w-2/4 text-white min-h-screen shadow-lg transform transition-transform duration-300 ease-in-out `}
      >
        <h2 className="text-2xl md:text:3xl font-extrabold mb-8">Dashboard</h2>
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
