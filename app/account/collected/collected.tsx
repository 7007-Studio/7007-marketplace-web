"use client";

import { useEffect, useMemo, useState } from "react";
import { Abi } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { useReadAigcTokenId } from "@/generated";
import { getPublicClient } from "@/client";
import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";

const Collected = () => {
  const { address, chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const { data: lastTokenId } = useReadAigcTokenId({
    address: nftContract,
  });

  const [filteredTokenIds, setFilteredTokenIds] = useState<bigint[]>([]);

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!lastTokenId) return ids;

    for (let i = 0; i < Number(lastTokenId); i++) {
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

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
        <div className="flex flex-row flex-wrap gap-6 items-start">
          {filteredTokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={id}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )) || (
        <div className="flex flex-row flex-wrap gap-6 items-start">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}
    </>
  );
};

export default Collected;
