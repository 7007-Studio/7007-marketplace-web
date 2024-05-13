"use client";

import { useAccount, useReadContract } from "wagmi";

import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidOffers from "@/hooks/useValidOffers";
import { useEffect, useMemo, useState } from "react";
import { Offer } from "@/types";
import { Abi, PublicClient } from "viem";
import { getPublicClient } from "@/client";
import useNftContract from "@/hooks/useNftContract";
import AIGC from "@/abis/AIGC.json";

const Marketplace = () => {
  const [receivedTokenIds, setReceivedTokenIds] = useState<bigint[]>([]);
  const { address, chain } = useAccount();
  const { nftContract } = useNftContract({
    chainId: chain?.id,
  });
  const { offers } = useValidOffers({
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const { data: totalSupply } = useReadContract({
    address: nftContract,
    abi: AIGC.abi as Abi,
    functionName: "totalSupply",
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!totalSupply) return ids;

    for (let i = 0; i < Number(totalSupply); i++) {
      ids.push(i);
    }
    return ids;
  }, [totalSupply]);

  //TODO: mutliple contracts
  useEffect(() => {
    if (!nftContract || !address || !chain || !offers || !tokenIds) return;

    const fetchOwnerAndFilterOffers = async () => {
      const results = await getPublicClient(chain).multicall({
        contracts: tokenIds.map((id) => ({
          address: nftContract,
          abi: AIGC.abi as Abi,
          functionName: "ownerOf",
          args: [BigInt(id)],
        })),
      });

      const ownedTokenIds: any[] = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.result === address) {
          ownedTokenIds.push(BigInt(tokenIds[i]));
        }
      }

      const receivedTokenIds = offers.filter((offer: Offer) => {
        return ownedTokenIds.includes(offer.tokenId);
      });

      setReceivedTokenIds(receivedTokenIds);
    };

    fetchOwnerAndFilterOffers();
  }, [nftContract, address, chain, tokenIds, offers]);

  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {receivedTokenIds?.map((offer: any) => (
        <NFTCard
          key={offer.offerId}
          nftContract={offer.assetContract}
          tokenId={offer.tokenId}
          // offer={offer}
        />
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
    </div>
  );
};

export default Marketplace;
