"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

import useNftContract from "@/hooks/useNftContract";
import Hero from "./heroNoContract";
import Stats from "./statsNoContract";
import Collection from "@/components/collection";
import Progress from "./progressNoContract";

export default function CollectionPage() {
  // const { index } = useParams<{ index: string }>();
  // const { chain } = useAccount();
  // const { nftContract } = useNftContract({
  //   modelIndex: index ? BigInt(index) : 1n,
  //   chainId: chain?.id,
  // });

  return (
    <div className="w-[80%]">
      {/* <Hero nftContract={nftContract} />
      <Progress nftContract={nftContract}/>
      <Stats nftContract={nftContract} /> */}
      <Hero />
      <Progress />
      <Stats />
      <Collection />
    </div>
  );
}
