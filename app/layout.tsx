import { Metadata } from "next";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Syncopate } from "next/font/google";
import { Web3Provider } from "@/utils/web3Provider";
import { ModalProvider } from "@/utils/modalProvider";

import Navbar from "@/components/ui/navbar";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body data-theme="light-7007" className={`${syncopate.className}`}>
        <Web3Provider>
          <ModalProvider>
            <Navbar />
            <main className="max-lg:hidden flex min-h-screen bg-black text-white flex-col">
              {children}
            </main>
          </ModalProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
