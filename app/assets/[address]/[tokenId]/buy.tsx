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
import useValidListings from "@/hooks/useValidListings";
import useValidOffers from "@/hooks/useValidOffers";
import axios from "axios";

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
  const [offer, setOffer] = useState<Offer>();
  const { chain } = useAccount();
  const { listings } = useValidListings({
    chainId: chain?.id,
  });
  const { offers } = useValidOffers({
    chainId: chain?.id,
  });
  const [ETHPrice, setETHPrice] = useState<string>("");
  const getUSDprice = async () => {
    const url = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
    try {
      const res = await axios.get(url);
      if (res.status !== 200) {
        throw new Error("Failed to fetch price");
      }
      const ethPrice = Number(res.data.price).toFixed(2);
      setETHPrice(ethPrice);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUSDprice();
  }, []);
  useEffect(() => {
    const fetchCreateListing = async () => {
      if (!nftContract || !tokenId || !chain || !listings) return;

      if (listings.length > 0) {
        const results = (listings as unknown as Listing[]).filter((listing) => {
          return Number(listing.tokenId) === Number(tokenId);
        });
        if (results.length > 0) {
          setListing(results[0]);
        }
      } else {
        setListing(undefined);
      }
    };
    const fetchOffers = async () => {
      if (!nftContract || !tokenId || !chain || !offers) return;

      if (offers.length > 0) {
        const results = (offers as unknown as Offer[]).filter((offer) => {
          return Number(offer.tokenId) === Number(tokenId);
        });
        if (results.length > 0) {
          setOffer(results[0]);
        }
      } else {
        setOffer(undefined);
      }
    };
    fetchCreateListing();
    fetchOffers();
  }, [nftContract, tokenId, chain, listings]);

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
                    ) * Number(ETHPrice)
                  ).toFixed(2)
                : (
                    Number(formatEther(listing.pricePerToken)) *
                    Number(ETHPrice)
                  ).toFixed(2)}
            </a>
          </div>
        </div>
        <div className="flex gap-5">
          <BuyButton
            listing={listing}
            className="w-[47%] h-[45px] rounded"
            handleReFetch={handleReFetch}
          />
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
