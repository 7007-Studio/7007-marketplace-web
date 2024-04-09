"use client";

import { useEffect, useState } from "react";
import { Abi, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import Menu, { MenuList } from "@/components/ui/menu";
import { CiSearch } from "react-icons/ci";
import CreateInput from "@/components/input/creareInput";
import Image from "next/image";

const CreateCollection = () => {
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
    <div className="flex flex-col pt-[100px] w-full items-center">
      <div className="flex w-[85%] items-start flex-col gap-5">
        <a className="text-[30px] font-bold">create an aigc collection</a>
        <a className="max-w-[718px]">
          First, you’ll need to deploy a contract You’ll need to deploy an
          ERC-721 contract onto the blockchain before you can create a
          drop. What is a contract?
        </a>
      </div>
      <div className="flex gap-[50px] pt-[45px] w-[85%]">
        <div className="flex flex-col w-[48%] gap-[45px]">
          <div className="space-y-2">
            <a>data upload</a>
            <div className="w-full h-20 bg-grey p-10"></div>
          </div>
          <div className="flex flex-col gap-2">
            <a>select a model</a>
            <div className="px-9 border border-white rounded-md pt-5">
              <div className="flex gap-2 w-full border-b border-grey pb-5">
                <div className="w-1/2">name</div>
                <div className="w-[16%] flex justify-center">type</div>
                <div className="w-[16%] flex justify-center">created</div>
                <div className="w-[17%] flex justify-center">inferences</div>
              </div>
              <div className="flex gap-2 w-full py-5 font-bold">
                <div className="w-1/2 flex gap-4">
                  <a className="">model name</a>
                </div>
                <div className="w-[16%] flex justify-center">77</div>
                <div className="w-[16%] flex justify-center">77</div>
                <div className="w-[17%] flex justify-center">10,000</div>
              </div>
            </div>
            <div className="w-full flex flex-col h-full border border-white rounded-lg mt-4">
              <div className="py-4 w-full flex items-center justify-between border-b border-white pr-6">
                <div className="flex items-center pl-9">
                  <a>Trending</a>
                  <div className="h-[30px] w-[1.5px] bg-grey mx-5" />
                  <a>Top</a>
                  <div className="h-[30px] w-[1.5px] bg-grey mx-5" />
                  <CiSearch
                    size={30}
                    color="white"
                    className="opacity-60 cursor-pointer"
                  />
                </div>
                <Menu
                  options={menuOption}
                  selected={select}
                  onSelect={handleSelect}
                />
              </div>
              <div className="px-9 flex flex-col py-6">
                <div className="flex gap-2 w-full border-b border-grey pb-5 ">
                  <div className="w-[32%] flex gap-4">
                    <a className="">name</a>
                  </div>
                  <div className="w-[17%] flex justify-center">type</div>
                  <div className="w-[17%] flex justify-center">created</div>
                  <div className="w-[17%] flex justify-center">inferences</div>
                  <div className="w-[17%] flex justify-center">earing %</div>
                </div>
                <div className="flex gap-2 w-full py-5 font-bold">
                  <div className="w-[32%] flex gap-4">
                    <a className="">model name</a>
                  </div>
                  <div className="w-[17%] flex justify-center">77</div>
                  <div className="w-[17%] flex justify-center">77</div>
                  <div className="w-[17%] flex justify-center">1,000</div>
                  <div className="w-[17%] flex justify-center">1,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[48%] gap-[30px]">
          <div className="gap-2 flex flex-col">
            <a>collection name</a>
            <CreateInput placeholder="name .." />
          </div>
          <div className="gap-2 flex flex-col">
            <a>collection description</a>
            <CreateInput placeholder="description .." className="h-96" />
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col">
              <a className="pl-2">Total supply</a>
              <CreateInput placeholder="10 - 1,000" />
            </div>
            <div className="gap-2 flex flex-col">
              <a className="pl-2">Creator earnings %</a>
              <CreateInput placeholder="10-100%" />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col">
              <a className="pl-2">Mint price</a>
              <CreateInput placeholder="0.0777" type="token" />
            </div>
            <div className="gap-2 flex flex-col">
              <a className="pl-2">Token symbol</a>
              <CreateInput placeholder="1,000-10,000" />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="gap-2 flex flex-col">
              <a className="pl-2">Launch date</a>
              <CreateInput placeholder="date picker" />
            </div>
            <div className="gap-2 flex flex-col">
              <a className="pl-2">End date</a>
              <CreateInput placeholder="date picker" />
            </div>
          </div>
          <div className="gap-2 flex flex-col">
            <a>Positive</a>
            <CreateInput placeholder="sample .." />
          </div>
          <div className="gap-2 flex flex-col">
            <a>Negative</a>
            <CreateInput placeholder="Negative .." />
          </div>
          <div className="gap-2 flex flex-col">
            <a>Banner image</a>
            <div className="w-full h-20 bg-grey p-10"></div>
          </div>
        </div>
      </div>
      <div className="flex w-[85%] items-start pt-[75px] flex-col gap-5">
        <div className="flex justify-between w-full">
          <Image
            src="/7007-logo-black.svg"
            alt="7007 Studio"
            width={44}
            height={44}
            className="w-10 h-10 opacity-30"
          />
          <div className="flex justify-end text-end flex-col">
            <div>estimate mint cost</div>
            <div>~ 0.05 eth</div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <a className="max-w-[502px]">
            this is a function description a description this is function
            function description function
          </a>
          <button className="w-[260px] h-[58px] bg-white/40 border border-white rounded">
            Prompt and Mint
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
