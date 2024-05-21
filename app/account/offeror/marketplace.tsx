"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidOffers from "@/hooks/useValidOffers";

const Marketplace = () => {
  const { address, chain } = useAccount();
  const { offers } = useValidOffers({
    offeror: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {offers?.map((l: any) => (
        <NFTCard
          key={l.listingId}
          nftContract={l.assetContract}
          tokenId={l.tokenId}
          offer={l}
        />
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
    </div>
  );
};

export default Marketplace;
