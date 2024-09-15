import Header from "@/components/ui/header";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loadUserFromToken } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ThemeProvider } from "next-themes";

const Container = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        {/* Ensure the header stretches across the entire width */}
        <header className="w-full">
          <Header />
        </header>

        {/* ToastContainer at the top of the page */}
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

        {/* Main content, flex-grow makes sure it takes available space */}
        <main className="flex-grow container mx-auto px-4  text-textColor dark:bg-darkBackground dark:text-darkText">
          {children}
        </main>

        {/* Footer sticks to the bottom */}
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Container;
