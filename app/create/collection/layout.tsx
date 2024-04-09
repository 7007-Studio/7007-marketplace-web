"use client";
import Tabs from "@/components/ui/tabs";
import Image from "next/image";
import { useAccount } from "wagmi";
import { CiSettings } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CreateLayout({
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
      <div className="h-[35vh] relative">
        <Image
          src="/createCollMask.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0 shadow-inner"
        />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/5 from-70% to-black/90" />
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center">
        {children}
      </div>
    </>
  );
}
