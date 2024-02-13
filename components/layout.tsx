import { ReactNode } from "react";
import { Barlow } from "next/font/google";
import Navbar from "./navbar";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="light-7007" className={`${barlow.className} bg-base-100`}>
      <Navbar />
      <main className="flex min-h-screen flex-col lg:py-10 md:px-10 lg:px-24 mx-auto">
        {children}
      </main>
    </div>
  );
}
