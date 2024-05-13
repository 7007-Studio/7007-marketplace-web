"use client";

import { useEffect, useMemo, useState } from "react";
import { Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import AIGC from "@/abis/AIGC.json";
import { getPublicClient } from "@/client";
import { ModelIndex } from "@/constants/constants";
import useNftContract from "@/hooks/useNftContract";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import { getContractAddress } from "@/helpers";
import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import { Listing, Offer } from "@/types";
import useValidListings from "@/hooks/useValidListings";

const Collected = () => {
  //TODO: mutliple contracts
  const { address, chain } = useAccount();
  const { nftContract } = useNftContract({
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(4).keys()];
  const [filteredTokenIds, setFilteredTokenIds] = useState<bigint[]>([]);
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
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

  useEffect(() => {
    if (!nftContract || !address || !chain) return;
    const fetchOwner = async () => {
      const results = await getPublicClient(chain).multicall({
        contracts: tokenIds.map((id) => ({
          address: nftContract,
          abi: AIGC.abi as Abi,
          functionName: "ownerOf",
          args: [BigInt(id)],
        })),
      });
      const ownedTokenIds = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.result === address) {
          ownedTokenIds.push(BigInt(tokenIds[i]));
        }
      }
      setFilteredTokenIds(ownedTokenIds);
    };
    fetchOwner();
  }, [nftContract, address, chain, tokenIds]);
  return (
    <>
      {(nftContract && (
        <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
          {filteredTokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={id}
              listing={listings?.find((l: Listing) => l.tokenId === id)}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )) || (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-14">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}
    </>
  );
};

export default Collected;
