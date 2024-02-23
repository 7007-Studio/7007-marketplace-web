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
      <div className="flex lg:hidden absolute top-0 -z-10 w-full h-full bg-base-100 justify-center items-center">
        <div className="p-10 text-center">
          For now, 7007 studio is on desktop only. Mobile version will launch
          soon.
        </div>
      </div>
      <main className="max-lg:hidden flex min-h-screen flex-col lg:py-10 md:px-10 lg:px-24 mx-auto">
        {children}
      </main>
    </div>
  );
}
