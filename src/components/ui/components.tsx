"use client";

import Header from "@/components/ui/header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadUserFromToken } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation"; // Import usePathname

const Container = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  // Check if the route is part of the dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen dark:bg-darkBackground dark:text-darkText">
        <header className="min-w-full">
          <Header />
        </header>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <main className="flex-grow container mx-auto px-4 text-textColor dark:bg-darkBackground dark:text-darkText">
          {children}
        </main>

        {/* Conditionally render the footer */}
        {!isDashboard && (
          <footer className="w-full">
            <Footer />
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Container;
