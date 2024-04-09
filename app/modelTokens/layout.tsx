"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="h-[35vh] flex flex-col relative items-center justify-center gap-5">
        <Image
          src="/Mask group.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0"
        />

        <div className="absolute top-[90px] bg-black z-10 w-full flex items-center justify-center">
          <div className="flex w-full h-[87px] py-6 items-center justify-center font-bold text-[18px]">
            <div className="flex gap-5">
              <a className="text-upGreen">24h volume :</a>
              <a className="">$ 1.27b</a>
            </div>
            <div className="w-[1px] h-full bg-grey mx-[188px]" />
            <div className="flex gap-5">
              <a className="text-upGreen">24h txNS :</a>
              <a className="">1,935,667</a>
            </div>
          </div>
        </div>

        <p className="text-[30px] font-bold z-10 mt-16">TOKEN TRADING</p>
      </div>

      <div>
        <div className="grid grid-cols-12 -mt-7 mb-5 border-b-2 opacity-50 border-white">
          <div></div>
          <ul className="flex gap-8 col-span-4 font-bold">
            <li className="border-b-4 border-transparent hover:border-b-4 hover:border-[#2B8BFC]">
              <a
                href="/modelTokens/dashboard"
                style={{
                  color:
                    pathname === "/modelTokens/dashboard" ? "#FFFFFF" : "grey",
                }}
                aria-current="page"
                onClick={handleClick}
              >
                DASHBOARD
              </a>
            </li>
            <li className="border-b-4 border-transparent hover:border-b-4 hover:border-[#2B8BFC]">
              <a
                href="/modelTokens/tokenTrading"
                style={{
                  color:
                    pathname === "/modelTokens/tokenTrading"
                      ? "#FFFFFF"
                      : "grey",
                }}
              >
                TOKEN TRADING
              </a>
            </li>
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}
