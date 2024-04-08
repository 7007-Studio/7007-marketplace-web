"use client";

import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="px-4 md:px-10 h-[400px] z-50 bg-grey/60 text-white flex flex-col items-center gap-20 justify-center w-full">
      <div className="flex w-4/5 justify-between">
        <a className="text-[30px] leading-[150%]">
          welcome to 7007 NFT Marketplace
        </a>
        <div className="flex gap-5">
          <div
            className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-white`}
            //   onClick={() => openLink(socialLink[1].link)}
          >
            <FaXTwitter size={25} color="black" />
          </div>
          <div
            className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full pt-[2px] bg-white`}
            // onClick={() => openLink(socialLink[0].link)}
          >
            <FaTelegramPlane size={23} color="black" />
          </div>
        </div>
      </div>
      <div className="flex w-4/5 justify-between items-end">
        <a className="text-[15px] leading-[150%]">
          welcome to 7007 NFT Marketplace
        </a>
        <a className="text-[15px] leading-[150%]">
          7007.Studio © All rights reserved.
        </a>
      </div>
    </div>
  );
}
