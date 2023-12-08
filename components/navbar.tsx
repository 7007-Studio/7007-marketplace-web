import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 p">
      <div className="flex-1">
        <Image
          src="/7007-marketplace.svg"
          alt="7007 Marketplace"
          width={106}
          height={36}
        />
      </div>
      <div className="flex-none gap-2">
        <ConnectButton />
      </div>
    </div>
  );
}
