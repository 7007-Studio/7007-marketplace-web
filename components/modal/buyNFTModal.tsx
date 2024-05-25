import React, { RefObject, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import {
  Address,
  formatEther,
  isAddressEqual,
  parseEther,
  zeroAddress,
} from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { NATIVE_TOKEN_ADDRESS } from "@/constants/constants";
import { getContractAddress } from "@/helpers";
import {
  useReadAigcGetApproved,
  useReadAigcIsApprovedForAll,
  useWriteAigcSetApprovalForAll,
  useWriteMarketplaceV3BuyFromListing,
  useWriteMarketplaceV3CreateListing,
} from "@/generated";
import { Listing, Metadata } from "@/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface BuyNFT {
  listing: Listing;
  metadata?: Metadata;
  className?: string;
  handleReFetch?: () => void;
}

interface BuyNFTModalProps {
  buyNFT?: BuyNFT;
}

const BuyNFTModal = React.forwardRef(({ buyNFT }: BuyNFTModalProps, ref) => {
  const router = useRouter();
  const [buyInitialized, setBuyInitialized] = useState(false);
  const [isBuyed, setIsBuyed] = useState(false);
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
    if (!buyNFT) return;

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    if (!marketplaceV3) return;
    if (
      balance &&
      Number(formatEther(balance.value)) <
        Number(formatEther(buyNFT.listing.pricePerToken))
    ) {
      toast.error(
        <span className="whitespace-pre-wrap">Insufficient balance</span>
      );
      return;
    }

    setBuyInitialized(true);
    const args: [bigint, Address, bigint, Address, bigint] = [
      buyNFT?.listing.listingId,
      connectedWallet,
      buyNFT?.listing.quantity,
      buyNFT?.listing.currency,
      buyNFT?.listing.pricePerToken,
    ];
    console.debug(args);
    buyNft(
      {
        address: marketplaceV3,
        value:
          buyNFT.listing.currency === NATIVE_TOKEN_ADDRESS
            ? buyNFT.listing.pricePerToken
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
    setBuyInitialized(false);
    setIsBuyed(false);
  }, [buyNFT]);

  useEffect(() => {
    console.debug("buyResult changed");
    if (buyResult.isSuccess) {
      setBuyInitialized(false);
      setIsBuyed(true);
      buyNFT && buyNFT.handleReFetch ? buyNFT.handleReFetch() : null;
    }
  }, [buyResult.isSuccess]);

  return (
    <dialog
      id="my_modal_1"
      className="modal"
      ref={ref as RefObject<HTMLDialogElement> | null}
    >
      <div className="modal-box max-w-[424px] bg-white text-black">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          onClick={() => {
            (ref as React.RefObject<HTMLDialogElement>).current?.close();
            setBuyInitialized(false);
          }}
        >
          ✕
        </button>
        {!isBuyed ? (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div>
                {buyNFT && buyNFT.metadata?.image && (
                  <Image
                    src={buyNFT.metadata.image}
                    alt={buyNFT.metadata.name || ""}
                    width={72}
                    height={72}
                  />
                )}
              </div>
              <div className="col-span-2">
                <div className="text-lg">{buyNFT?.metadata?.name}</div>
                <div className="text-base">
                  tokenID: {Number(buyNFT?.listing.tokenId)}
                </div>
              </div>
              <div>
                <div className="text-sm pt-2">Listing price</div>
                <div className="text-lg">
                  {/* {args.totalPrice === 0n
                      ? "--"
                      : formatEther(args.totalPrice)}{" "} */}
                  {buyNFT && formatEther(buyNFT.listing.pricePerToken)} WETH
                </div>
              </div>
            </div>
            {/* <div className="w-full flex flex-col gap-2">
              <span className="text-[18px] pl-3">price</span>
              <div className="relative w-full text-white">
                <input
                  value={buyNFT && formatEther(buyNFT.listing.pricePerToken)}
                  type="text"
                  disabled
                  className="bg-grey py-5 px-9 text-white placeholder-white/40 outline-none w-full h-full flex"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">weth</span>
                </div>
              </div>
            </div> */}
            <div className="flex flex-row justify-between font-bold">
              <div>Total cost</div>
              {buyNFT && formatEther(buyNFT.listing.pricePerToken)} ETH
            </div>
            <button
              disabled={buyInitialized}
              className={`btn btn-primary w-full gap-2`}
              onClick={(e) => buy(e)}
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
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-10">
            <Image src="/check.svg" alt="NFT listed" width={120} height={120} />
            <div className="px-4 text-center">
              <h2 className="heading-md">{`You have successfully purchased this NFT`}</h2>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  (ref as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Done
              </button>
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  router.push(
                    `/assets/${buyNFT?.listing.assetContract}/${buyNFT?.listing.tokenId}`
                  );
                  (ref as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Go to see your NFT
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
});
BuyNFTModal.displayName = "BuyNFTModal";

export default BuyNFTModal;
