import Tabs from "@/components/ui/tabs";
import { ModelIndex } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-[50vh] flex flex-col relative items-center justify-center gap-5">
        <Image
          src="/homeMask.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0"
        />
        <p className="text-[30px] font-bold z-10">Model STATS Banner example</p>
        <Link
          href={`/collection/${ModelIndex}/mint`}
          className="border bg-black/40 h-[50px] w-[248px] flex items-center justify-center rounded-3xl z-10 text-white/80 hover:text-white/60 cursor-pointer"
        >
          Mint Now
        </Link>
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center">
        {children}
      </div>
    </>
  );
}
