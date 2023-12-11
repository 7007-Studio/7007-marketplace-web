import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className="navbar bg-[#272727] px-4 md:px-8 py-4">
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
        <div className="flex-none gap-4">
          <Link
            href="/marketPlace"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Marketplace
          </Link>
          <Link
            href="/governance"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Governance
          </Link>
          <ConnectButton chainStatus="none" showBalance={false} />
        </div>
      </div>

      <div className="flex flex-col md:hidden bg-[#272727]">
        <Link
          href="/marketPlace"
          className="pl-4 py-4 text-xl hover:text-primary cursor-pointer"
        >
          Marketplace
        </Link>
        <Link
          href="/governance"
          className="pl-4 py-4 text-xl hover:text-primary cursor-pointer"
        >
          Governance
        </Link>
      </div>
    </>
  );
}
