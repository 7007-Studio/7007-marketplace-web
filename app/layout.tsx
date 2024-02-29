import { Metadata } from "next";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Barlow } from "next/font/google";
import { Web3Provider } from "@/utils/web3Provider";

import Navbar from "@/components/navbar";
import { Suspense } from "react";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "7007 Studio",
  description: "Welcome to 7007 Studio",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        data-theme="light-7007"
        className={`${barlow.className} bg-base-100`}
      >
        <Web3Provider>
          <Navbar />
          <Suspense>
            <main className="max-lg:hidden flex min-h-screen flex-col lg:py-10 md:px-20 2xl:px-24 mx-auto">
              {children}
            </main>
          </Suspense>
        </Web3Provider>
      </body>
    </html>
  );
}
