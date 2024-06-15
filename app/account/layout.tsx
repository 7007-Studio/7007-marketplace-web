"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { CiSettings } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RandomPixelAvatar from "@/components/RandomAvatar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address, isConnected } = useAccount();
  const pathName = usePathname();
  const tabs = [
    { pathnames: ["/account/collected", "/account"], label: "Collected" },
    { pathnames: ["/account/created"], label: "Created" },
    { pathnames: ["/account/listed"], label: "Listed" },
    { pathnames: ["/account/models"], label: "Models" },
    { pathnames: ["/account/offers"], label: "Offers received" },
    { pathnames: ["/account/offeror"], label: "Offers made" },
    { pathnames: ["/account/inferencing"], label: "inferencing" },
  ];

  return (
    <>
      <div className="h-[90px] relative" />
      <div className="h-full w-full flex justify-center flex-col items-center pt-12 gap-[100px]">
        <div className="max-w-[85%] flex w-full">
          <div className="size-[200px] rounded-full overflow-hidden border">
            <RandomPixelAvatar width={200} height={200} />
          </div>
          <div className="flex gap-12 w-4/5 pl-12 justify-between">
            <div className="flex flex-col max-w-[532px] flex-wrap gap-6">
              <div className="flex gap-4 font-bold text-[30px]">
                <Image src="/avatar.svg" alt="avatar" width={40} height={40} />
                {address && address.slice(0, 6) + "..." + address.slice(-4)}
              </div>
              {/* <a>Joined March 2077</a> */}
              <a className="">
                {/* {`Pilot of on-chain AI, fine tuned with Stable diffusion model by 7007.Studio.First, you'll need to deploy a contract.`} */}
              </a>
            </div>
            <div className="flex flex-col justify-start items-end gap-10">
              {/* <div className="flex gap-6">
                <CiSettings size={40} />
                <LuMenu size={40} />
              </div> */}
              {/* <button className="border px-10 py-4 rounded text-center">
                Claim revenue from IP licensing
              </button> */}
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
        {isConnected ? (
          children
        ) : (
          <div className="text-center text-white">
            Please connect your wallet to view your account
          </div>
        )}
      </div>
    </>
  );
}
