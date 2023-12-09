import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();

  return (
    <div className="navbar bg-[#272727] px-8 py-4">
      <div className="flex-1">
        <Image
          src="/7007-marketplace.svg"
          alt="7007 Marketplace"
          width={106}
          height={36}
        />
      </div>
      <div className="flex-none gap-2">
        <button className="btn" onClick={() => router.push("/generate")}>
          Generate
        </button>
        <ConnectButton />
      </div>
    </div>
  );
}
