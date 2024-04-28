"use client";

import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getContractAddress } from "@/helpers";
import { useWriteMarketplaceV3CancelListing } from "@/generated";

export interface Args {
  assetContract: Address;
  tokenId: bigint;
  quantity: bigint;
  currency: Address;
  totalPrice: bigint;
  expirationTimestamp: bigint;
}

export default function CancelListingButton({
  listingId,
  className,
  handleReFetch,
}: {
  listingId: string;
  handleReFetch: () => void;
  className?: string;
}) {
  const [offerInitialized, setOfferInitialized] = useState(false);
  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract: cancelListing, data: cancelListingTx } =
    useWriteMarketplaceV3CancelListing();
  const listingResult = useWaitForTransactionReceipt({
    hash: cancelListingTx,
  });

  const handelCancelListing = () => {
    console.debug("cancelListing button clicked");
    if (!connectedWallet) {
      openConnectModal?.();
      return;
    }

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    if (!marketplaceV3) return;

    setOfferInitialized(true);

    console.debug(listingId);
    cancelListing(
      {
        address: marketplaceV3,
        args: [BigInt(listingId)],
      },
      {
        onError(error: any) {
          console.error("cancelListing Nft error", error);
          setOfferInitialized(false);
        },
      }
    );
  };
  useEffect(() => {
    console.debug("listingResult changed");
    if (listingResult.isSuccess) {
      setOfferInitialized(false);
      handleReFetch();
    }
  }, [listingResult.isSuccess]);

  return (
    <button
      onClick={() => handelCancelListing()}
      disabled={offerInitialized}
      className={`bg-transparent text-white flex justify-center gap-2 items-center hover:text-blue ${className}`}
    >
      {offerInitialized ? (
        <>
          <span className="loading loading-spinner"></span>
          loading
        </>
      ) : (
        "Cancel"
      )}
    </button>
  );
}
