import Header from "@/components/ui/header";

import Footer from "./footer";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen container  mx-auto px-4 flex flex-col">
      <Header></Header>
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Container;
