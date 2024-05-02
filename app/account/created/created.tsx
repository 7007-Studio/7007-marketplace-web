"use client";

import { useEffect, useState } from "react";
import { Abi, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
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

  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  useEffect(() => {
    if (!nftContract || !address || !chain) return;

    const fetchMintEvents = async () => {
      const logs = await getPublicClient(chain).getContractEvents({
        address: nftContract,
        abi: AIGC.abi as Abi,
        eventName: "Transfer",
        args: {
          from: zeroAddress,
          to: address,
        },
        fromBlock: 5079109n,
      });
      setTokenIds(
        logs
          .filter(
            (log: any) =>
              (log.args as { tokenId?: string }).tokenId !== undefined
          )
          .map((log: any) => {
            const args = log.args as { tokenId: string };
            return BigInt(args.tokenId);
          })
      );
    };
    fetchMintEvents();
  }, [nftContract, address, chain]);

  return (
    <>
      {(nftContract && (
        <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
          {tokenIds.map((id) => (
            <NFTCard
              key={`${nftContract}-${id}`}
              nftContract={nftContract}
              tokenId={id}
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
