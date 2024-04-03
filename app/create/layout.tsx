"use client" 

import Tabs from "@/components/ui/tabs";
import React from 'react'
import Image from "next/image";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const tabs = [ 
    { label: "DASHBOARD", pathnames: ["/create/dashboard"] },
    { label: "TOKEN TRADING", pathnames: ["/create/tokenTrading"] },
  ];

  return (
    <div>
        <div className="grid grid-cols-6">
          <div></div>
          <div className="col-span-4">
            <div className="flex justify-around">
              <div className="text-green-200">24h volume : $ 1.27b</div>
              <div>24h txNS : 1,935,667</div>
            </div>
        
          </div>
          
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-8xl font-bold text-white">TOKEN TRADING</h1>
          </div>
          <Image
            src="/Mask group.png"
            alt="7007 studio"
            width={1920}
            height={300}
            className="w-full"
          />
        </div>

        <div className="flex pb-5">
          <Tabs tabs={tabs} />
        </div>
      {children}
    </div>
  );
}
