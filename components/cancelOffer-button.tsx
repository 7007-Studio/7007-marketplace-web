"use client";

import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getContractAddress } from "@/helpers";
import { useWriteMarketplaceV3CancelOffer } from "@/generated";

export interface Args {
  assetContract: Address;
  tokenId: bigint;
  quantity: bigint;
  currency: Address;
  totalPrice: bigint;
  expirationTimestamp: bigint;
}

export default function CancelOfferButton({
  offerId,
  className,
  handleReFetch,
}: {
  offerId: string;
  handleReFetch: () => void;
  className?: string;
}) {
  const [offerInitialized, setOfferInitialized] = useState(false);
  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract: cancelOffer, data: cancelOfferTx } =
    useWriteMarketplaceV3CancelOffer();
  const offerResult = useWaitForTransactionReceipt({
    hash: cancelOfferTx,
  });

  const handelCancelOffer = () => {
    console.debug("cancelOffer button clicked");
    if (!connectedWallet) {
      openConnectModal?.();
      return;
    }

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    if (!marketplaceV3) return;

    setOfferInitialized(true);

    console.debug(offerId);
    cancelOffer(
      {
        address: marketplaceV3,
        args: [BigInt(offerId)],
      },
      {
        onError(error: any) {
          console.error("offer Nft error", error);
          setOfferInitialized(false);
        },
      }
    );
  };
  useEffect(() => {
    console.debug("offerResult changed");
    if (offerResult.isSuccess) {
      setOfferInitialized(false);
      handleReFetch();
    }
  }, [offerResult.isSuccess]);

  return (
    <button
      onClick={() => handelCancelOffer()}
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
