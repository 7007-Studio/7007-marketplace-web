import Tabs from "@/components/ui/tabs";
import { ModelIndex } from "@/constants";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: "Models", pathnames: ["/model", "/"] },
    { label: "ERC-7007", pathnames: ["/erc-7007"] },
  ];

  return (
    <>
      <div className="h-[50vh] flex flex-col bg-white/20 items-center justify-center gap-5">
        <p className="text-[30px] font-bold">Model STATS Banner example</p>
        <Link
          href={`/collection/${ModelIndex}/mint`}
          className="border bg-black/40 h-[50px] w-[248px] flex items-center justify-center rounded-3xl text-white/80 hover:text-white/60 cursor-pointer"
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
