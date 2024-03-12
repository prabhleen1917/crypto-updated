import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div id="App" className="bg-black font-sans text-indigo-50 md:flex">
      <Navbar />
      <div className="flex-1 pt-28 md:pt-0 md:pl-52">
        <main className="min-h-[90vh]">{children}</main>
        <Footer />
      </div>
    </div>
    
  );
}
