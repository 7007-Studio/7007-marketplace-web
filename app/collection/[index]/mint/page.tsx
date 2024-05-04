"use client";

import { useParams } from "next/navigation";
// import { useAccount } from "wagmi";
import FormAIGC from "@/components/formAIGC";
import useNftContract from "@/hooks/useNftContract";
import { useAccount } from "wagmi";
// import useNftContract from "@/hooks/useNftContract";

export default function MintPage() {
  const { index } = useParams<{ index: string }>() || {};
  // console.log('index', index)

  const { chain } = useAccount();
  //TODO: hardcode modelIndex
  const { nftContract } = useNftContract({
    modelIndex: 1n,
    chainId: chain?.id,
  });

  return (
    <div className="h-full w-[80%]">
      {nftContract && <FormAIGC modelIndex={index} nftContract={nftContract} />}
    </div>
  );
}
