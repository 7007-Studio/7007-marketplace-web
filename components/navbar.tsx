import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { STAKE7007_CONTRACT_ADDRESS } from "@/constants";
import {
  useStake7007GetInferencePoint,
  useStake7007ConsumedInferencePoint,
} from "@/generated";
import { Address, formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Navbar() {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const { address } = useAccount();
  const { data: inferencePoint, refetch: refetchInferencePoint } =
    useStake7007GetInferencePoint({
      address: STAKE7007_CONTRACT_ADDRESS as Address,
      args: address ? [address] : undefined,
    });
  const {
    data: consumedInferencePoint,
    refetch: refetchConsumedInferencePoint,
  } = useStake7007ConsumedInferencePoint({
    address: STAKE7007_CONTRACT_ADDRESS as Address,
    args: address ? [address] : undefined,
  });

  const isMounted = useIsMounted();

  useEffect(() => {
    const timer = setInterval(() => {
      refetchInferencePoint();
      refetchConsumedInferencePoint();
    }, 10000);
    // clearing interval
    return () => clearInterval(timer);
  });

  return (
    <>
      <div className="navbar px-4 md:px-12 py-6 border-b border-b-neutral-100">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/7007-logo-black.svg"
              alt="7007 Studio"
              width={106}
              height={36}
            />
          </Link>
        </div>
        <div className="flex-none gap-10">
          <Link
            href="/"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Model Launchpad
          </Link>
          <Link
            href="#"
            className="hidden md:block hover:text-primary cursor-pointer"
          >
            Staking
          </Link>
          <button className="hidden md:block btn btn-primary px-6">
            Publish Model
          </button>
          {/* {isMounted &&
            inferencePoint !== undefined &&
            consumedInferencePoint !== undefined && (
              <div className="hidden md:flex badge badge-primary text-lg font-bold p-4 mx-4">
                {formatUnits(inferencePoint - consumedInferencePoint, 0)} IP
              </div>
            )} */}
          <div className="max-md:hidden">
            <ConnectButton chainStatus="none" showBalance={false} />
            <button
              className="md:hidden btn btn-square btn-ghost hover:text-black"
              onClick={() => setIsShowingMenu(!isShowingMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex-col md:hidden ${isShowingMenu ? "flex" : "hidden"}`}
      >
        {/* {isMounted &&
          inferencePoint !== undefined &&
          consumedInferencePoint !== undefined && (
            <div className="badge badge-primary self-end text-lg font-bold p-4 mx-4">
              {formatUnits(inferencePoint - consumedInferencePoint, 0)} IP
            </div>
          )} */}

        <Link href="/" className="pl-4 py-4 text-xl hover:text-primary">
          Model Launchpad
        </Link>
        <Link href="#" className="pl-4 py-4 text-xl hover:text-primary">
          Staking
        </Link>
        <div className="w-full px-4">
          <button className="btn btn-primary w-full">Publish Model</button>
        </div>
      </div>
    </>
  );
}
