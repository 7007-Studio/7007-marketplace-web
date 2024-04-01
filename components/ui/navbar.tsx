"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ModelIndex } from "@/constants";

export default function Navbar() {
  // hard coded
  const modelIndex = ModelIndex;

  const [isShowingMenu, setIsShowingMenu] = useState(false);

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
          <Link
            href="/account"
            className="hidden md:inline-flex  hover:text-primary cursor-pointer"
          >
            My Collection
          </Link>
          <Link
            href="/create"
            className="hidden md:inline-flex  hover:text-primary cursor-pointer"
          >
            Create
          </Link>
          <Link
            className="hidden md:inline-flex btn btn-primary px-6"
            href={`/collection/${modelIndex}/mint`}
          >
            Generate
          </Link>
          <div className="max-md:hidden">
            <ConnectButton showBalance={false} />
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
        <Link href="/account" className="pl-4 py-4 text-xl hover:text-primary">
          My Collection
        </Link>
        <div className="w-full px-4">
          <Link
            className="btn btn-primary w-full"
            href={`/collection/${modelIndex}/mint`}
          >
            Generate
          </Link>
        </div>
      </div>
    </>
  );
}
