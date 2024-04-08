"use client" 

import Tabs from "@/components/ui/tabs";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import path from "path";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname()
  const tabs = [ 
    { label: "DASHBOARD", pathnames: ["/create/dashboard"] },
    { label: "TOKEN TRADING", pathnames: ["/create/tokenTrading"] },
  ];

  console.log('pathname', pathname)
  console.log('pathname', pathname === '/create/dashboard')
  // const router = useRouter();
  // const { pathname } = router;

  // console.log('Current route:', pathname);

  console.log('tabs', tabs)
  
  const handleClick = () => {
    console.log('isClicked', isClicked)
    setIsClicked(!isClicked);
  };

  return (

    <>

    <div className="h-[58vh] flex flex-col relative items-center justify-center gap-5">

        <Image
          src="/Mask group.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0"
        />

        <div className=" absolute top-[90px] bg-black z-10 w-full flex items-center justify-center">
          <div className="grid grid-cols-6 w-full py-4">
            <div></div>
            <div className="col-span-4">
            <div className="flex justify-around">
              <div className="text-green-200">24h volume : $ 1.27b</div>
              <div>24h txNS : 1,935,667</div>
            </div>
          </div>
        </div>

        </div>

        <p className="text-[30px] font-bold z-10">TOKEN TRADING</p>
    </div>

    <div>
      <div className="grid grid-cols-6 -mt-7 mb-5 border-b-2 opacity-50 border-white">
        <div></div>
        <ul className="flex gap-8 col-span-2">
            <li className="border-b-4 border-transparent hover:border-b-4 hover:border-[#2B8BFC]">
                <a 
                  href="/create/dashboard" 
                  style={{ color: pathname === '/create/dashboard' ? '#FFFFFF' : 'grey' }}
                  aria-current="page"
                  onClick={handleClick}
                >DASHBOARD</a>
            </li>
            <li className="border-b-4 border-transparent hover:border-b-4 hover:border-[#2B8BFC]">
                <a 
                  href="/create/tokenTrading" 
                  style={{ color: pathname === '/create/tokenTrading' ? '#FFFFFF' : 'grey' }}
                >TOKEN TRADING</a>
            </li>
        </ul>
      </div>
      {children}
    </div>
  </>

  );
}
