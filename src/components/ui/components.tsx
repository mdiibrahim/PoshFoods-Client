import Header from "@/components/ui/header";

import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { loadUserFromToken } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
const Container = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);
  return (
    <div className="min-h-screen container  mx-auto px-4 flex flex-col">
      <Header></Header>
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
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Container;
