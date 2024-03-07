"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import useValidListings from "@/hooks/useValidListings";

const Marketplace = () => {
  const { address, chain } = useAccount();
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });

  return (
    <>
      <div className="flex flex-row gap-x-11 justify-between">
        <div className="flex flex-row flex-wrap gap-6 items-start">
          {listings?.map((l) => (
            <NFTCard
              key={l.listingId}
              nftContract={l.assetContract}
              tokenId={l.tokenId}
              listing={l}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
