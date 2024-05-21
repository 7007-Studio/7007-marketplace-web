"use client";

import { useAccount, useReadContracts } from "wagmi";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import useValidOffers from "@/hooks/useValidOffers";
import { useEffect, useMemo, useState } from "react";
import { Offer } from "@/types";
import { Abi, Address, PublicClient } from "viem";
import { getPublicClient } from "@/client";
import useNftContracts from "@/hooks/useNftContracts";
import AIGC from "@/abis/AIGC.json";
import useTotalTokenIDs, { TokenIDs } from "@/hooks/useTotalTokenIDs";

const Marketplace = () => {
  const [receivedTokenIds, setReceivedTokenIds] = useState<bigint[]>([]);
  const { address, chain } = useAccount();
  const { nftContracts } = useNftContracts({
    chainId: chain?.id,
  });
  const { offers } = useValidOffers({
    chainId: chain?.id,
  });
  const emptyCardList = [...Array(1).keys()];

  const { tokenIds } = useTotalTokenIDs({ nftContracts });

  useEffect(() => {
    if (!nftContracts || !address || !chain || !offers || !tokenIds.length)
      return;

    const fetchOwnerAndFilterOffers = async () => {
      const results = await getPublicClient(chain).multicall({
        contracts: tokenIds.map(({ id, contract }: TokenIDs) => ({
          address: contract,
          abi: AIGC.abi as Abi,
          functionName: "ownerOf",
          args: [id],
        })),
      });

      const ownedTokenIds: any[] = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.result === address) {
          ownedTokenIds.push({
            tokenId: tokenIds[i].id,
            contract: tokenIds[i].contract,
          });
        }
      }

      const receivedTokenIds = offers.filter((offer: Offer) => {
        return ownedTokenIds.some(
          (ownedToken) =>
            ownedToken.tokenId === offer.tokenId &&
            ownedToken.contract === offer.assetContract
        );
      });

      setReceivedTokenIds(receivedTokenIds);
    };

    fetchOwnerAndFilterOffers();
  }, [nftContracts, address, chain, tokenIds, offers]);
  return (
    <div className="flex flex-wrap max-w-[85%] gap-14 justify-center">
      {receivedTokenIds.map((offer: any) => (
        <NFTCard
          key={offer.offerId}
          nftContract={offer.assetContract}
          tokenId={offer.tokenId}
          offer={offer}
        />
      )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
    </div>
  );
};

export default Marketplace;
