"use client";

import { useEffect, useMemo, useState } from "react";
import { Abi, Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import AIGC from "@/abis/AIGC.json";
import { getPublicClient } from "@/client";
import useNftContracts from "@/hooks/useNftContracts";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidListings from "@/hooks/useValidListings";
import { Listing } from "@/types";
import useTotalTokenIDs, { TokenIDs } from "@/hooks/useTotalTokenIDs";

const Collected = () => {
  const { address, chain } = useAccount();
  const { nftContracts } = useNftContracts({
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(4).keys()];
  const [filteredTokenIds, setFilteredTokenIds] = useState<
    { id: bigint; contract: string }[]
  >([]);
  const { listings } = useValidListings({
    listingCreator: address,
    chainId: chain?.id,
  });

  const { tokenIds } = useTotalTokenIDs({ nftContracts });
  useEffect(() => {
    if (
      !nftContracts ||
      !address ||
      !chain ||
      !tokenIds ||
      tokenIds.length === 0
    )
      return;
    const fetchOwner = async () => {
      const results = await getPublicClient(chain).multicall({
        contracts: tokenIds.map(({ id, contract }: TokenIDs) => ({
          address: contract,
          abi: AIGC.abi as Abi,
          functionName: "ownerOf",
          args: [id],
        })),
      });
      const ownedTokenIds = results
        .map((result: any, index: number) => ({
          id: tokenIds[index].id,
          contract: tokenIds[index].contract,
          owner: result.result,
        }))
        .filter((token: any) => token.owner === address)
        .map((token: any) => ({ id: token.id, contract: token.contract }));

      setFilteredTokenIds(ownedTokenIds);
    };

    fetchOwner();
  }, [nftContracts, address, chain, tokenIds]);

  return (
    <>
      {nftContracts.length > 0 ? (
        <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
          {filteredTokenIds.map(({ id, contract }: any) => (
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
      ) : (
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
