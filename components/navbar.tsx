import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="navbar bg-[#272727] px-8 py-4">
      <div className="flex-1">
        <Link href="/">
          <Image
            src="/7007-marketplace.svg"
            alt="7007 Marketplace"
            width={106}
            height={36}
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link href="/marketPlace" className="btn">
          Marketplace
        </Link>
        <Link href="/governance" className="btn">
          Governance
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
}
