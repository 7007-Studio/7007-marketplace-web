"use client";

import { getPublicClient } from "@/client";
import { formatDate, getContractAddress } from "@/helpers";
import { Listing } from "@/types";
import { useEffect, useState } from "react";
import { formatUnits, formatEther, Address, erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import BuyButton from "@/components/buy-button";

export default function Buy({
  nftContract,
  tokenId,
}: {
  nftContract: Address;
  tokenId: string;
}) {
  const [listing, setListing] = useState<Listing>();
  const { chain } = useAccount();

  useEffect(() => {
    const fetchCreateListingEvents = async () => {
      if (!nftContract || !tokenId || !chain) return;
      const client = getPublicClient(chain);

      const marketplaceV3 = getContractAddress("MarketplaceV3", chain.id);
      const logs = await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewListing",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      });
      const results = (
        logs as unknown as { args: { listing: Listing } }[]
      ).filter((log) => {
        const {
          args: { listing },
        } = log;

        const currentTimestamp = new Date().getTime();
        return (
          Number(listing.tokenId) === Number(tokenId) &&
          Number(listing.endTimestamp) * 1000 > currentTimestamp
        );
      });

      if (results.length > 0) {
        setListing(results[0].args.listing);
      }
    };
    fetchCreateListingEvents();
  }, [nftContract, tokenId, chain]);

  const { data: listingData } = useReadContracts({
    contracts: [
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: listing?.currency,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });
  const [decimals, symbol] = listingData || [];

  if (!listing) {
    return null;
  }

  return (
    <>
      <div className="pb-2 flex flex-col">
        <span>Sale ends {formatDate(Number(listing.endTimestamp) * 1000)}</span>
        <span className="heading-md">
          {decimals?.result
            ? formatUnits(listing.pricePerToken, decimals.result)
            : formatEther(listing.pricePerToken)}{" "}
          {symbol?.result ? symbol.result : "ETH"}
        </span>
      </div>
      <BuyButton listing={listing} />
    </>
  );
}
