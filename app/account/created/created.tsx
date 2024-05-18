"use client";

import { useEffect, useState } from "react";
import { Abi, Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { getPublicClient } from "@/client";
import useNftContracts from "@/hooks/useNftContracts";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { Listing } from "@/types";
import { TokenIDs } from "@/hooks/useTotalTokenIDs";

const Created = () => {
  const { address, chain } = useAccount();
  const { nftContracts } = useNftContracts({
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });
  const [tokenIds, setTokenIds] = useState<TokenIDs[]>([]);

  useEffect(() => {
    if (!nftContracts || !address || !chain) return;

    const fetchMintEvents = async () => {
      const allLogs = await Promise.all(
        nftContracts.map((contract) =>
          getPublicClient(chain).getContractEvents({
            address: contract,
            abi: AIGC.abi as Abi,
            eventName: "Transfer",
            args: {
              from: zeroAddress,
              to: address,
            },
            fromBlock: 5079109n,
          })
        )
      );

      const combinedTokenIds = allLogs.flatMap((logs, index) =>
        logs
          .filter(
            (log: any) =>
              (log.args as { tokenId?: string }).tokenId !== undefined
          )
          .map((log: any) => {
            const args = log.args as { tokenId: string };
            return { id: BigInt(args.tokenId), contract: nftContracts[index] };
          })
      );

      setTokenIds(combinedTokenIds as TokenIDs[]);
    };

    fetchMintEvents();
  }, [nftContracts, address, chain]);
  return (
    <>
      {nftContracts && (
        <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
          {tokenIds.map(({ id, contract }: any) => (
            <NFTCard
              key={`${contract}-${id}`}
              nftContract={contract}
              tokenId={id}
              listing={listings?.find(
                (l: Listing) => l.tokenId === id && l.assetContract === contract
              )}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )}
      {!nftContracts && (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-14">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}
    </>
  );
};

export default Created;
