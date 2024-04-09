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
      <div className="h-[50vh] flex flex-col relative items-center justify-center gap-5">
        <Image
          src="/Mask group.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0"
        />

        <div className=" absolute top-[90px] bg-black z-10 w-full flex items-center justify-center">
          <div className="grid grid-cols-6 w-full py-2">
            <div></div>
            <div className="col-span-4">
              <div className="flex justify-around">
                <div>
                  <span className="text-[#1D9E4B]">24h volume :</span> $ 1.27b
                </div>
                <div>
                  <span className="text-[#1D9E4B]">24h txNS :</span> 1,935,667
                </div>
              </div>
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
                  color: pathname === "/modelTokens/dashboard" ? "#FFFFFF" : "grey",
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
                    pathname === "/modelTokens/tokenTrading" ? "#FFFFFF" : "grey",
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
