"use client";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  // hard coded
  const modelIndex = 1;

  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="navbar px-4 md:px-12 py-6 border-b border-b-neutral-100">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/7007-logo-black.svg"
              alt="7007 Studio"
              width={106}
              height={36}
            />
          </Link>
        </div>
        <div className="flex-none gap-10">
          {/* <Link
            href="/model/1"
            className={clsx(
              "hidden md:block hover:text-primary cursor-pointer",
              {
                underline: pathname === "/model/1",
              }
            )}
          >
            Model Launchpad
          </Link> */}
          {/* <Link
            href="#"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Staking
          </Link> */}
          <button
            className="hidden md:block btn btn-primary px-6"
            onClick={() => {
              router.push(`/model/${modelIndex}/aigc/generate`);
            }}
          >
            Generate
          </button>
          <div className="max-md:hidden">
            <ConnectButton chainStatus="none" showBalance={false} />
            <button
              className="md:hidden btn btn-square btn-ghost hover:text-black"
              onClick={() => setIsShowingMenu(!isShowingMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex-col md:hidden ${isShowingMenu ? "flex" : "hidden"}`}
      >
        {/* <Link href="/model/1" className="pl-4 py-4 text-xl hover:text-primary">
          Model Launchpad
        </Link> */}
        {/* <Link href="#" className="pl-4 py-4 text-xl hover:text-primary">
          Staking
        </Link> */}
        <div className="w-full px-4">
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              router.push(`/model/${modelIndex}/aigc/generate`);
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
