"use client";

import { useEffect, useState } from "react";
import { Abi, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import Menu, { MenuList } from "@/components/ui/menu";
import { BsArrowUp } from "react-icons/bs";
import Image from "next/image";

const CreateAigc = () => {
  const menuOption = [
    { id: "1", label: "Your model", value: "All" },
    { id: "2", label: "text-to-text", value: "text-to-text" },
    { id: "3", label: "text-to-music", value: "text-to-music" },
    { id: "4", label: "Model 3", value: "Model 3" },
  ];
  const [select, setSelect] = useState<MenuList>(menuOption[0]);
  const handleSelect = (option: MenuList) => {
    setSelect(option);
  };
  return (
    <div className="flex absolute top-[240px] flex-col w-full items-center text-center">
      <a className="font-bold text-[30px] text-center">
        start your aigc journey
      </a>
      <div className="pt-[50px] flex flex-col gap-[45px]">
        <div className="size-[350px] border rounded-md relative bg-black">
          <a className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            Train sub model +
          </a>
          <Image
            alt="arrowThin"
            src="/arrowThin.svg"
            width={36}
            height={36}
            className="absolute top-4 right-4"
          />
          <Image
            alt="arrowThin"
            src="/arrowThin.svg"
            width={36}
            height={36}
            className="absolute top-4 left-4 -rotate-90"
          />
          <Image
            alt="arrowThin"
            src="/arrowThin.svg"
            width={36}
            height={36}
            className="absolute bottom-4 left-4 rotate-180"
          />
          <Image
            alt="arrowThin"
            src="/arrowThin.svg"
            width={36}
            height={36}
            className="absolute bottom-4 right-4 rotate-90"
          />
        </div>
        <a>・this is a function description</a>
      </div>
    </div>
  );
};

export default CreateAigc;
