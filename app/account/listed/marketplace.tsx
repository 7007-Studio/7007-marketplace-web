"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import useNftContracts from "@/hooks/useNftContracts";

const Marketplace = () => {
  const { address, chain } = useAccount();
  const { nftContracts } = useNftContracts({
    chainId: chain?.id,
  });
  const { listings: listingOne } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
    assetContract: nftContracts?.[0],
  });
  const { listings: listingTwo } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
    assetContract: nftContracts?.[1],
  });
  const emptyCardList = [...Array(1).keys()];

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {listingOne?.map((l: any) => (
        <NFTCard
          key={l.listingId}
          nftContract={l.assetContract}
          tokenId={l.tokenId}
          listing={l}
        />
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
      {listingTwo?.map((l: any) => (
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
