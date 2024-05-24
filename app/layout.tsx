import { Metadata } from "next";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { IBM_Plex_Mono } from "next/font/google";
import { Web3Provider } from "@/utils/web3Provider";
import { ModalProvider } from "@/utils/modalProvider";

import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "react-hot-toast";

const IBMPlexMono = IBM_Plex_Mono({
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
      <body data-theme="light-7007" className={`${IBMPlexMono.className}`}>
        <Web3Provider>
          <ModalProvider>
            <Toaster
              toastOptions={{
                style: {
                  background: "#0F0F0F",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  border: "1px solid #B4FF78",
                  color: "#B4FF78",
                  fontSize: "14px",
                  fontFamily: "Digital Numbers",
                },
              }}
            />
            <Navbar />
            <main className="max-lg:hidden flex min-h-screen bg-black text-white flex-col pb-[400px] relative">
              {children}
            </main>
            <main
              className="hidden max-lg:flex bg-black text-white flex-col items-center justify-center relative"
              style={{ height: "calc(100vh - 200px)" }}
            >
              The app is only available on PC screen
            </main>
            <Footer />
          </ModalProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
