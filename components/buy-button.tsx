"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { Address, erc20Abi, formatEther } from "viem";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NATIVE_TOKEN_ADDRESS } from "@/constants/constants";
import { getContractAddress } from "@/helpers";
import {
  useReadAigcName,
  useWriteMarketplaceV3BuyFromListing,
} from "@/generated";
import { Listing, Metadata } from "@/types";
import { format } from "path";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OfferInput from "./input/offerInput";

export default function BuyButton({
  listing,
  hover,
  className,
  metadata,
  handleReFetch,
}: {
  listing: Listing;
  hover?: boolean;
  metadata: Metadata;
  className?: string;
  handleReFetch?: () => void;
}) {
  const router = useRouter();
  const [buyInitialized, setBuyInitialized] = useState(false);
  const modelRef = useRef<HTMLDialogElement>(null);
  const [isBuyed, setIsBuyed] = useState(false);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract: buyNft, data: buyNftTx } =
    useWriteMarketplaceV3BuyFromListing();
  const { data: balance } = useBalance({
    address: connectedWallet,
  });
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
    if (
      balance &&
      Number(formatEther(balance.value)) <
        Number(formatEther(listing.pricePerToken))
    ) {
      toast.error(
        <span className="whitespace-pre-wrap">Insufficient balance</span>
      );
      return;
    }

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
    console.log("buyResult.isSuccess", buyResult.isSuccess);
    if (buyResult.isSuccess) {
      setBuyInitialized(false);
      handleReFetch ? handleReFetch() : null;
    }
  }, [buyResult.isSuccess]);
  console.log("buyInitialized", buyInitialized);

  return (
    <>
      <button
        // onClick={(e) => buy(e)}
        onClick={() => modelRef.current?.showModal()}
        disabled={buyInitialized}
        className={`z-20 bg-white text-black font-bold transition-all flex justify-center items-center gap-2 p-1 rounded ${className}`}
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
      <dialog id="my_modal_1" className="modal" ref={modelRef}>
        <div className="modal-box max-w-[424px] bg-white text-black">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={() => {
              // resetData();
              modelRef.current?.close();
              setIsBuyLoading(false);
            }}
          >
            ✕
          </button>
          {!isBuyed ? (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div>
                  {metadata?.image && (
                    <Image
                      src={metadata.image}
                      alt={metadata.name || ""}
                      width={72}
                      height={72}
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <div className="text-lg">{metadata?.name}</div>
                </div>
                <div>
                  <div className="text-sm pt-2">Listing price</div>
                  <div className="text-lg">
                    {/* {args.totalPrice === 0n
                      ? "--"
                      : formatEther(args.totalPrice)}{" "} */}
                    {listing.pricePerToken} WETH
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[18px] pl-3">price</span>
                <div className="relative w-full text-white">
                  <input
                    value={formatEther(listing.pricePerToken)}
                    type="text"
                    className="bg-grey py-5 px-9 text-white placeholder-white/40 outline-none w-full h-full flex"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">weth</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between font-bold">
                <div>Total cost</div>
                {formatEther(listing.pricePerToken)} ETH
              </div>
              <button
                disabled={isBuyLoading}
                // className={`btn btn-primary w-full ${
                //   offerInitialized ||
                //   approveLoading ||
                //   errorMessage !== "" ||
                //   errorMessageDays !== "" ||
                //   !args.totalPrice ||
                //   !args.expirationTimestamp
                //     ? "opacity-40 cursor-not-allowed"
                //     : ""
                // }`}
                onClick={(e) => buy(e)}
              >
                {isBuyLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    loading
                  </>
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-10">
              <Image
                src="/check.svg"
                alt="NFT listed"
                width={120}
                height={120}
              />
              <div className="px-4 text-center">
                <h2 className="heading-md">{`You have successfully purchased this NFT`}</h2>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    (
                      modelRef as RefObject<HTMLDialogElement>
                    )?.current?.close();
                  }}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    router.push(
                      `/assets/${listing.assetContract}/${listing.listingId}`
                    );
                  }}
                >
                  Go to see your NFT
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
