"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";

const Marketplace = () => {
  //TODO: mutliple contracts
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {listings?.map((l: any) => (
        <NFTCard
          key={l.listingId}
          nftContract={l.assetContract}
          tokenId={l.tokenId}
          listing={l}
        />
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
    </div>
  );
};

export default Marketplace;
