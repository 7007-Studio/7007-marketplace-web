"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";

const Marketplace = () => {
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  return (
    <>
      <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-14">
        {listings?.map((l: any) => (
          <NFTCard
            key={l.listingId}
            nftContract={l.assetContract}
            tokenId={l.tokenId}
            listing={l}
          />
        )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
      </div>
    </>
  );
};

export default Marketplace;
