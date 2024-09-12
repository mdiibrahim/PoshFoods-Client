import Header from "@/components/ui/header";

import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = ({ children }: { children: React.ReactNode }) => {
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
