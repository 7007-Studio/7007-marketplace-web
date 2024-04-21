"use client";

import { useParams } from "next/navigation";
// import { useAccount } from "wagmi";
import FormAIGC from "@/components/formAIGC";
// import useNftContract from "@/hooks/useNftContract";

export default function MintPage() {
  const { index } = useParams<{ index: string }>() || {};
  // console.log('index', index)

  // const { chain } = useAccount();
  // const { nftContract } = useNftContract({
  //   modelIndex: BigInt(index),
  //   chainId: chain?.id,
  // });

  return (
    <div className="h-full w-[80%]">
      {/* {nftContract && <FormAIGC nftContract={nftContract} />} */}
      <FormAIGC modelIndex={index} />
    </div>
  );
}
