"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { Address, formatEther, parseEther, erc20Abi } from "viem";
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NATIVE_TOKEN_ADDRESS } from "@/constants/constants";
import { getContractAddress } from "@/helpers";
import { useReadAigcName, useWriteMarketplaceV3MakeOffer } from "@/generated";
import { Listing, Metadata } from "@/types";
import Image from "next/image";
import { useForm } from "react-hook-form";
import TextInput from "./form/textInput";
import OfferInput from "./input/offerInput";

export interface Args {
  assetContract: Address;
  tokenId: bigint;
  quantity: bigint;
  currency: Address;
  totalPrice: bigint;
  expirationTimestamp: bigint;
}

export default function OfferButton({
  nftContract,
  tokenId,
  className,
  metadata,
  handleReFetch,
}: {
  nftContract: Address;
  tokenId: string;
  className?: string;
  metadata: Metadata;
  handleReFetch: () => void;
}) {
  const modelRef = useRef<HTMLDialogElement>(null);
  const [offerInitialized, setOfferInitialized] = useState(false);
  const [isOffered, setIsOffered] = useState(false);
  const { address: connectedWallet, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { writeContract: offerNft, data: offerNftTx } =
    useWriteMarketplaceV3MakeOffer();
  const [approved, setApproved] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const offerResult = useWaitForTransactionReceipt({
    hash: offerNftTx,
  });
  const { data: name } = useReadAigcName({
    address: nftContract,
  });
  const [args, setArgs] = useState<Args>({
    assetContract: nftContract,
    tokenId: BigInt(tokenId),
    quantity: 1n,
    currency: "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92", // sepolia WETH
    totalPrice: 0n,
    expirationTimestamp: 0n,
  });
  const handleOnChange = (valueName: string, value: any) => {
    if (valueName === "expirationTimestamp") {
      setArgs({
        ...args,
        expirationTimestamp: BigInt(
          Math.round(Date.now() / 1000) + Number(value) * 24 * 60 * 60
        ),
      });
    } else if (valueName === "totalPrice") {
      const numberValue = Number(value);
      if (isNaN(numberValue)) return;
      setArgs({
        ...args,
        totalPrice: parseEther(value),
      });
    }
  };
  const { writeContract } = useWriteContract();

  const { writeContract: approve, data: approveData } = useWriteContract();
  const approveResult = useWaitForTransactionReceipt({
    hash: approveData,
  });

  const makeOffer = async () => {
    console.debug("makeOffer button clicked");
    if (!connectedWallet) {
      openConnectModal?.();
      return;
    }

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    if (!marketplaceV3) return;
    if (!approved) {
      setApproveLoading(true);
      setApproved(true);
      approve({
        address: "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92",
        abi: erc20Abi,
        functionName: "approve",
        args: [marketplaceV3, args.totalPrice],
      });
    } else {
      setOfferInitialized(true);
      console.debug(args);
      offerNft(
        {
          address: marketplaceV3,
          args: [args],
        },
        {
          onError(error: any) {
            console.error("offer Nft error", error);
            setOfferInitialized(false);
          },
        }
      );
    }
  };
  const resetData = () => {
    setArgs({
      assetContract: nftContract,
      tokenId: BigInt(tokenId),
      quantity: 1n,
      currency: "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92", // sepolia WETH
      totalPrice: 0n,
      expirationTimestamp: 0n,
    });
  };
  useEffect(() => {
    console.debug("approveResult changed");
    if (approveResult.isSuccess) {
      setApproveLoading(false);
    } else if (approveResult.isError) {
      setApproveLoading(false);
      setApproved(false);
    }
  }, [approveResult.isSuccess]);

  useEffect(() => {
    console.debug("offerResult changed");
    if (offerResult.isSuccess) {
      setIsOffered(true);
      setOfferInitialized(false);
      resetData();
      handleReFetch();
    }
  }, [offerResult.isSuccess]);

  return (
    <>
      <button
        onClick={() => modelRef.current?.showModal()}
        disabled={offerInitialized}
        className={`bg-transparent text-white flex justify-center items-center border border-white ${className}`}
      >
        {offerInitialized ? (
          <>
            <span className="loading loading-spinner"></span>
            loading
          </>
        ) : (
          "Make Offer"
        )}
      </button>
      <dialog id="my_modal_1" className="modal" ref={modelRef}>
        <div className="modal-box max-w-[424px] bg-white text-black">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={() => {
              resetData();
              modelRef.current?.close();
            }}
          >
            ✕
          </button>
          {!isOffered ? (
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
                  <div className="text-sm">{name}</div>
                </div>
                <div>
                  <div className="text-sm pt-2">Listing price</div>
                  <div className="text-lg">
                    {formatEther(args.totalPrice)} WETH
                  </div>
                </div>
              </div>
              <OfferInput
                label="Set a price"
                postfix="weth"
                placeholder="0.00"
                valueName="totalPrice"
                onChange={handleOnChange}
              />
              <OfferInput
                label="Duration"
                postfix="Days"
                valueName="expirationTimestamp"
                onChange={handleOnChange}
                placeholder="0"
              />
              <div className="flex flex-row justify-between">
                <div>7007 fee</div>
                <div>0 %</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>OAO fee</div>
                <div>0 %</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Model earning</div>
                <div>0 %</div>
              </div>
              <div className="flex flex-row justify-between font-bold">
                <div>Total potential earnings</div>
                {formatEther(args.totalPrice)} ETH
              </div>
              <button
                disabled={offerInitialized || approveLoading}
                className="btn btn-primary w-full"
                onClick={() => {
                  makeOffer();
                }}
              >
                {!approved ? (
                  "Approve"
                ) : approveLoading || offerInitialized ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    loading
                  </>
                ) : (
                  "Offer"
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
                <h2 className="heading-md">Your Offer was successfully!</h2>
              </div>
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  (modelRef as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
