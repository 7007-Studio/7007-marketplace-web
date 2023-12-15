import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

export default function Navbar() {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  return (
    <>
      <div className="navbar bg-[#272727] px-4 md:px-8 py-4">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/7007-marketplace.svg"
              alt="7007 Marketplace"
              width={106}
              height={36}
            />
          </Link>
        </div>
        <div className="flex-none gap-4">
          <Link
            href="/marketPlace"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Marketplace
          </Link>
          <Link
            href="/governance"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Governance
          </Link>
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

      <div
        className={`flex-col md:hidden bg-[#272727] ${
          isShowingMenu ? "flex" : "hidden"
        }`}
      >
        <Link
          href="/marketPlace"
          className="pl-4 py-4 text-xl hover:text-primary cursor-pointer"
        >
          Marketplace
        </Link>
        <Link
          href="/governance"
          className="pl-4 py-4 text-xl hover:text-primary cursor-pointer"
        >
          Governance
        </Link>
      </div>
    </>
  );
}
