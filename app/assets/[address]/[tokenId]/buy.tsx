"use client";

import { getPublicClient } from "@/client";
import { formatDate, getContractAddress } from "@/helpers";
import { Listing, Metadata } from "@/types";
import { useEffect, useState } from "react";
import { formatUnits, formatEther, Address, erc20Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";
import BuyButton from "@/components/buy-button";
import { CiClock1 } from "react-icons/ci";
import OfferButton from "@/components/offer-button";

export default function Buy({
  nftContract,
  tokenId,
  metadata,
}: {
  nftContract: Address;
  tokenId: string;
  metadata: Metadata;
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
        console.log(results[0].args);
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
    return (
      <div className="flex w-full flex-col mt-20 py-7 px-6 gap-7 bg-grey rounded-xl">
        <OfferButton
          nftContract={nftContract}
          tokenId={tokenId}
          metadata={metadata}
          className="w-full h-[45px] rounded"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col mt-20 py-7 px-6 gap-7 bg-grey rounded-xl">
        <div className="flex items-center gap-2">
          <CiClock1 size={25} />
          <a>Sale ends {formatDate(Number(listing.endTimestamp) * 1000)}</a>
        </div>
        <div className="space-y-2">
          <a>current price</a>
          <div className="flex gap-2 items-end">
            <a className="text-[45px] leading-none">
              {decimals?.result
                ? formatUnits(listing.pricePerToken, decimals.result)
                : formatEther(listing.pricePerToken)}
              {symbol?.result ? symbol.result : "ETH"}
            </a>
            <a className="text-[12px] pb-1">$ 77,777</a>
          </div>
        </div>
        <div className="flex gap-5">
          <BuyButton listing={listing} className="w-[47%] h-[45px] rounded" />
          <OfferButton
            nftContract={nftContract}
            tokenId={tokenId}
            metadata={metadata}
            className="w-[47%] h-[45px] rounded"
          />
        </div>
      </div>
    </>
  );
}
