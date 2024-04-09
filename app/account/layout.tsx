"use client";
import Tabs from "@/components/ui/tabs";
import Image from "next/image";
import { useAccount } from "wagmi";
import { CiSettings } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  const pathName = usePathname();
  // const tabs = [
  //   { label: "Collected", pathnames: ["/account/collected", "/account"] },
  //   { label: "Created", pathnames: ["/account/created"] },
  //   { label: "Listed", pathnames: ["/account/listed"] },
  // ];
  const tabs = [
    { pathnames: ["/account/collected", "/account"], label: "collected" },
    { pathnames: ["/account/created"], label: "created" },
    { pathnames: ["/account/listed"], label: "listed" },
    { pathnames: ["/account/models"], label: "models" },
    { pathnames: ["/account/offers"], label: "offers" },
  ];

  return (
    <>
      <div className="h-[35vh] relative border-b border-grey">
        <Image
          src="/Mask group.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0 shadow-inner"
        />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/5 from-55% to-black" />
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center pt-12 gap-[100px]">
        <div className="max-w-[85%] flex w-full">
          <div className="size-[200px] rounded-full border"></div>
          <div className="flex gap-12 w-4/5 pl-12 justify-between">
            <div className="flex flex-col max-w-[532px] flex-wrap gap-6">
              <a className="font-bold text-[30px]">User name</a>
              <div className="flex gap-4">
                <Image src="/avatar.svg" alt="avatar" width={22} height={22} />
                <a className="font-bold">
                  {address && address.slice(0, 6) + "..." + address.slice(-5)}
                </a>
                <a>Joined March 2077</a>
              </div>
              <a className="">
                Pilot of on-chain AI, fine tuned with Stable diffusion model by
                7007.Studio.First, you’ll need to deploy a contract.
              </a>
            </div>
            <div className="flex flex-col justify-end items-end gap-10">
              <div className="flex gap-6">
                <CiSettings size={40} />
                <LuMenu size={40} />
              </div>
              <button className="border px-10 py-4 rounded text-center">
                Claim revenue from IP licensing
              </button>
            </div>
          </div>
        </div>
        <div className="w-[80%] flex items-center gap-5">
          {tabs.map((item, index) => (
            <Link
              href={item.pathnames[0]}
              key={index}
              className={`cursor-pointer flex items-center font-bold text-base gap-5 ${
                item.pathnames.includes(pathName)
                  ? "text-white"
                  : "text-white/60"
              }`}
            >
              {item.label}
              {index !== tabs.length - 1 && (
                <div className="h-[30px] w-[1.5px] bg-grey" />
              )}
            </Link>
          ))}
          <div className="flex-1 h-[1.5px] bg-grey" />
        </div>
        {children}
      </div>
    </>
  );
}
