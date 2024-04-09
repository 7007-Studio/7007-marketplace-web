"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import useNftContract from "@/hooks/useNftContract";

import Hero from "./hero";
import Stats from "./stats";
import Collection from "@/app/stats/erc-7007/collection";
import Progress from "./progress";

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>();

  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: index ? BigInt(index) : 1n,
    chainId: chain?.id,
  });

  return (
    <div className="w-[80%]">
      <Hero nftContract={nftContract} />
      <Progress />
      <Stats nftContract={nftContract} />
      <Collection />
    </div>
  );
}
