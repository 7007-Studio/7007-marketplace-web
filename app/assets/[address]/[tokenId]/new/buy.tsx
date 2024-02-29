"use client";

import { getPublicClient } from "@/client";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { useWriteMarketplaceV3BuyFromListing } from "@/generated";
import { formatDate, getContractAddress } from "@/helpers";
import { Listing } from "@/types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { formatUnits, formatEther, Address, erc20Abi } from "viem";
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
} from "wagmi";

import MarketplaceV3Abi from "@/abis/MarketplaceV3.json";

export default function Buy({
  nftContract,
  tokenId,
}: {
  nftContract: Address;
  tokenId: string;
}) {
  const [listing, setListing] = useState<Listing>();
  const [buyInitialized, setBuyInitialized] = useState(false);

  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    const fetchCreateListingEvents = async () => {
      if (!nftContract || !tokenId || !chainId) return;
      const client = getPublicClient(chainId);

      const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
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
  }, [nftContract, tokenId, chainId]);

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

  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();

  const buyResult = useWaitForTransactionReceipt({
    hash: buyNftTx,
  });

  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      setBuyInitialized(false);
    }
  }, [buyResult.isSuccess]);

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
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!connectedWallet) {
            openConnectModal?.();
            return;
          }

          const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
          if (!marketplaceV3) return;

          setBuyInitialized(true);
          const args: [bigint, Address, bigint, Address, bigint] = [
            listing.listingId,
            connectedWallet,
            listing.quantity,
            listing.currency,
            listing.pricePerToken,
          ];
          console.debug(args);
          buyNft(
            {
              address: marketplaceV3,
              value:
                listing.currency === NATIVE_TOKEN_ADDRESS
                  ? listing.pricePerToken
                  : undefined,
              args,
            },
            {
              onError(error) {
                console.debug("buyNft error", error);
                setBuyInitialized(false);
              },
            }
          );
        }}
        disabled={buyInitialized}
        className="btn btn-primary max-w-sm"
      >
        {buyInitialized ? (
          <>
            <span className="loading loading-spinner"></span>
            loading
          </>
        ) : (
          "Buy Now"
        )}
      </button>
    </>
  );
}
