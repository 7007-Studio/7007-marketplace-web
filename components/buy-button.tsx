"use client";

import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { getContractAddress } from "@/helpers";
import { useWriteMarketplaceV3BuyFromListing } from "@/generated";
import { Listing } from "@/types";

export default function BuyButton({
  listing,
  hover,
  className,
}: {
  listing: Listing;
  hover?: boolean;
  className?: string;
}) {
  const [buyInitialized, setBuyInitialized] = useState(false);

  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();

  const buyResult = useWaitForTransactionReceipt({
    hash: buyNftTx,
  });
  const buy = (e: any) => {
    console.debug("buy button clicked");
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
        onError(error: any) {
          console.error("buyNft error", error);
          setBuyInitialized(false);
        },
      }
    );
  };

  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      setBuyInitialized(false);
    }
  }, [buyResult.isSuccess]);

  return (
    <button
      onClick={(e) => buy(e)}
      disabled={buyInitialized}
      className={`z-20 bg-white text-black font-bold transition-all flex justify-center items-center ${className}`}
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
  );
}
