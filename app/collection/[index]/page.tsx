"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import Hero from "@/components/model/hero";
import useNftContract from "@/hooks/useNftContract";
import useReadAigcContracts from "@/hooks/useReadAigcContracts";

export default function CollectionPage() {
  const { index } = useParams<{ index: string }>() || {};

  const { chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: index ? BigInt(index) : 1n,
    chainId: chain?.id,
  });

  const { name, tokenId: minted } = useReadAigcContracts({ nftContract });

  return (
    <div>
      <Hero modelName={name} aigtAddress={nftContract} />
    </div>
  );
}
