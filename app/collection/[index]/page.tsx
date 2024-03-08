"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import useNftContract from "@/hooks/useNftContract";

import Hero from "./hero";
import Stats from "./stats";
import Collection from "@/app/(home)/erc-7007/collection";

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>();

  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: index ? BigInt(index) : 1n,
    chainId: chain?.id,
  });

  return (
    <div>
      <Hero nftContract={nftContract} />
      <Stats nftContract={nftContract} />
      <Collection />
    </div>
  );
}
