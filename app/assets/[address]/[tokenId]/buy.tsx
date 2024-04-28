"use client";

import { getPublicClient } from "@/client";
import { formatDate, getContractAddress } from "@/helpers";
import { Listing, Metadata, Offer } from "@/types";
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
  handleReFetch,
}: {
  nftContract: Address;
  tokenId: string;
  metadata: Metadata;
  handleReFetch: () => void;
}) {
  const [listing, setListing] = useState<Listing>();
  const [offers, setOffers] = useState<Offer>();
  const { chain } = useAccount();

  useEffect(() => {
    const fetchCreateListing = async () => {
      if (!nftContract || !tokenId || !chain) return;
      const marketplaceV3 = getContractAddress("MarketplaceV3", chain.id);
      const client = getPublicClient(chain);
      if (!marketplaceV3) return;
      const logs = (await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewListing",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      })) as any;
      if (logs.length > 0) {
        const totalLength = logs.length - 1;
        const start = logs[0].args.listing.listingId;
        const end = logs[totalLength].args.listing.listingId;
        const validListings = await client.readContract({
          address: marketplaceV3,
          abi: MarketplaceV3Abi,
          functionName: "getAllValidListings", //getAllListings
          args: [start, end],
        });

        const results = (validListings as unknown as Listing[]).filter(
          (listing) => {
            const currentTimestamp = new Date().getTime();
            return (
              Number(listing.tokenId) === Number(tokenId) &&
              Number(listing.endTimestamp) * 1000 > currentTimestamp
            );
          }
        );
        if (results.length > 0) {
          setListing(results[0]);
        }
      } else {
        setListing(undefined);
      }
    };
    const fetchOffers = async () => {
      if (!nftContract || !tokenId || !chain) return;
      const client = getPublicClient(chain);
      const marketplaceV3 = getContractAddress("MarketplaceV3", chain.id);
      if (!marketplaceV3) return;
      const logs = (await client.getContractEvents({
        address: marketplaceV3,
        abi: MarketplaceV3Abi,
        eventName: "NewOffer",
        args: {
          assetContract: nftContract,
        },
        fromBlock: BigInt(5079109),
      })) as any;

      if (logs.length > 0) {
        const totalLength = logs.length;
        const start = logs[0].args.offer.offerId;
        const end = logs[totalLength - 1].args.offer.offerId;
        const offerData = await client.readContract({
          address: marketplaceV3,
          abi: MarketplaceV3Abi,
          functionName: "getAllValidOffers", //getAllOffers
          args: [start, end],
        });
        console.log("offerData", offerData);

        const results = (offerData as unknown as Offer[]).filter((offer) => {
          return Number(offer.tokenId) === Number(tokenId);
        });
        if (results.length > 0) {
          setOffers(results[0]);
        }
      } else {
        setOffers(undefined);
      }
    };
    fetchCreateListing();
    fetchOffers();
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
          handleReFetch={handleReFetch}
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
            <a className="text-[12px] pb-1">
              ${" "}
              {decimals?.result
                ? (
                    Number(
                      formatUnits(listing.pricePerToken, decimals.result)
                    ) * 3000
                  ).toFixed(2)
                : (Number(formatEther(listing.pricePerToken)) * 3000).toFixed(
                    2
                  )}
            </a>
          </div>
        </div>
        <div className="flex gap-5">
          <BuyButton listing={listing} className="w-[47%] h-[45px] rounded" />
          <OfferButton
            nftContract={nftContract}
            tokenId={tokenId}
            metadata={metadata}
            className="w-[47%] h-[45px] rounded"
            handleReFetch={handleReFetch}
          />
        </div>
      </div>
    </>
  );
}
