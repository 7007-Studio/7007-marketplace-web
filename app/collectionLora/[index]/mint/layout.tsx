import Tabs from "@/components/ui/tabs";
import Image from "next/image";
import { useAccount } from "wagmi";
import { CiSettings } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-[35vh] absolute w-full top-0">
        <Image
          src="/createMask.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0 shadow-inner"
        />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/20 from-20% to-black" />
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center z-20">
        {children}
      </div>
    </>
  );
}
