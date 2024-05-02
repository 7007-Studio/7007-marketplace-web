"use client";

import { useAccount } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidOffers from "@/hooks/useValidOffers";
import { useEffect } from "react";
import { Offer } from "@/types";
import { PublicClient } from "viem";
import { getPublicClient } from "@/client";

const Marketplace = () => {
  const { address, chain } = useAccount();
  const { offers } = useValidOffers({
    offeror: address,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  //TODO:
  useEffect(() => {
    if (!offers || !chain) return;
    const client: PublicClient = getPublicClient(chain);
    // const validListings = await client.readContract({
    //   address: marketplaceV3,
    //   abi: MarketplaceV3Abi,
    //   functionName: "getAllValidListings", //getAllListings
    //   args: [start, end],
    // });

    // 定義一個函式來判斷 tokenId 的 owner 是否是 user
    const isOfferOwner = async () => {
      offers.filter((offer: Offer) => {});
    };

    const userOffers = offers.filter(isOfferOwner);
  }, [offers]);

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {offers?.map((l: any) => (
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
