"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CiSearch } from "react-icons/ci";
import { MdOutlineWbSunny } from "react-icons/md";

import { ModelIndex } from "@/constants";

export default function Navbar() {
  // hard coded
  const modelIndex = ModelIndex;

  const [isShowingMenu, setIsShowingMenu] = useState(false);

  return (
    <>
      <div className="navbar fixed px-4 md:px-10 h-[90px] backdrop-blur-[5px] border-b-2 z-50 border-b-grey">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/7007-logo-black.svg"
              alt="7007 Studio"
              width={44}
              height={44}
              className="w-10 h-10"
            />
          </Link>
        </div>
        <div className="flex-none gap-[35px] hidden md:inline-flex">
          <CiSearch
            size="20"
            color="white"
            className="mr-[15px] opacity-60 cursor-pointer"
          />
          <Link
            href="/stats"
            className="cursor-pointer font-bold text-base text-white/60 hover:text-white/30"
          >
            STATS
          </Link>
          <div className="h-[30px] w-[1.5px] bg-grey" />
          <Link
            href="/create/dashboard"
            className="cursor-pointer font-bold text-base text-white/60 hover:text-white/30"
          >
            Create
          </Link>
          <div className="h-[30px] w-[1.5px] bg-grey" />
          <Link
            href="/account"
            className="hover:text-primary cursor-pointer font-bold text-base text-white/60 hover:text-white/30"
          >
            My Collection
          </Link>
          {/* <Link
            className="btn btn-primary px-6"
            href={`/collection/${modelIndex}/mint`}
          >
            Generate
          </Link> */}
          <MdOutlineWbSunny
            size={20}
            color="white"
            className="opacity-60 cursor-pointer"
          />
          <ConnectButton showBalance={false} />
        </div>

        <div className="">
          <button
            className="md:hidden btn btn-square btn-ghost hover:text-black"
            onClick={() => setIsShowingMenu(!isShowingMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
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

      {/* <div
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
      </div> */}
    </>
  );
}
