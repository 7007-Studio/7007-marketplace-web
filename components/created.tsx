"use client";

import { useEffect, useState } from "react";
import { Abi, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { getPublicClient } from "@/client";
import { ModelIndex } from "@/constants";
import useNftContract from "@/hooks/useNftContract";
import NFTCard from "@/components/nftCard";

const Collected = () => {
  const { address, chain } = useAccount();
  const { nftContract } = useNftContract({
    modelIndex: ModelIndex,
    chainId: chain?.id,
  });

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
            (log) => (log.args as { tokenId?: string }).tokenId !== undefined
          )
          .map((log) => {
            const args = log.args as { tokenId: string };
            return BigInt(args.tokenId);
          })
      );
    };
    fetchMintEvents();
  }, [nftContract, address, chain]);

  return (
    <>
      <div className="flex flex-row gap-x-11 justify-between">
        {nftContract && (
          <div className="flex flex-row flex-wrap gap-6 items-start">
            {tokenIds.map((id) => (
              <NFTCard
                key={`${nftContract}-${id}`}
                nftContract={nftContract}
                tokenId={id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Collected;
