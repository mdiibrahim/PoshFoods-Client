"use client";

import Header from "@/components/ui/header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { loadUserFromToken } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

const Container = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen dark:bg-darkBackground dark:text-darkText">
        <header>
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
