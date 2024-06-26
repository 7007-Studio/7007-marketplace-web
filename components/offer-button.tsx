"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { Address, formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getContractAddress } from "@/helpers";
import {
  erc20Abi,
  useReadAigcName,
  useWriteMarketplaceV3MakeOffer,
} from "@/generated";
import { Listing, Metadata } from "@/types";
import Image from "next/image";
import OfferInput from "./input/offerInput";
import { mainnet } from "viem/chains";
import { toast } from "react-hot-toast";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDays, setErrorMessageDays] = useState("");
  const sepoliaWeth = "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92";
  const mainnetWeth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
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
  const [price, setPrice] = useState("");
  const [inputDays, setInputDays] = useState("7");
  const [args, setArgs] = useState<Args>({
    assetContract: nftContract,
    tokenId: BigInt(tokenId),
    quantity: 1n,
    currency: chainId === mainnet.id ? mainnetWeth : sepoliaWeth,
    totalPrice: 0n,
    expirationTimestamp: BigInt(
      Math.round(Date.now() / 1000) + 7 * 24 * 60 * 60
    ),
  });
  const handleOnChange = (valueName: string, value: any) => {
    if (valueName === "expirationTimestamp") {
      setInputDays(value);
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        setErrorMessageDays("Days must be a number");
        setArgs({
          ...args,
          expirationTimestamp: 0n,
        });
        return;
      }
      if (numberValue <= 0) {
        setErrorMessageDays("Days must be greater than 0");
        setArgs({
          ...args,
          expirationTimestamp: 0n,
        });
        return;
      }
      setErrorMessageDays("");
      setArgs({
        ...args,
        expirationTimestamp: BigInt(
          Math.round(Date.now() / 1000) + Number(value) * 24 * 60 * 60
        ),
      });
    } else if (valueName === "totalPrice") {
      setPrice(value);
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        setErrorMessage("Total price must be a number");
        setArgs({
          ...args,
          totalPrice: 0n,
        });
        return;
      }
      if (numberValue <= 0.0001) {
        setErrorMessage("Total price must be greater than 0.0001");
        setArgs({
          ...args,
          totalPrice: 0n,
        });
        return;
      }
      if (numberValue.toString().split(".")[1]?.length > 4) {
        setErrorMessage("Total price must have at most 4 decimals");
        const fixed = numberValue.toFixed(4);
        setArgs({
          ...args,
          totalPrice: parseEther(fixed),
        });
        return;
      }
      setErrorMessage("");
      setArgs({
        ...args,
        totalPrice: parseEther(value),
      });
    }
  };
  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
  const { data: allowance } = useReadContract({
    address: chainId === mainnet.id ? mainnetWeth : sepoliaWeth,
    abi: erc20Abi,
    functionName: "allowance",
    args: [connectedWallet!, marketplaceV3!],
  });
  useEffect(() => {
    if (allowance && Number(allowance) <= Number(args.totalPrice)) {
      setApproved(false);
    } else if (allowance && Number(allowance) > Number(args.totalPrice)) {
      setApproved(true);
    }
  }, [allowance, args.totalPrice]);
  const { data: balance } = useReadContract({
    address: chainId === mainnet.id ? mainnetWeth : sepoliaWeth,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [connectedWallet!],
  });

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
    if (!marketplaceV3) return;
    if (errorMessage) {
      toast.error(<span className="whitespace-pre-wrap">{errorMessage}</span>);
      return;
    }
    if (!args.totalPrice || !args.expirationTimestamp) {
      toast.error(
        <span className="whitespace-pre-wrap">{`Please fill all fields`}</span>
      );
      return;
    }
    if (Number(balance) < Number(args.totalPrice)) {
      toast.error(
        <span className="whitespace-pre-wrap">{`You don't have enough WETH`}</span>
      );
      return;
    }
    if (!approved) {
      setApproveLoading(true);
      setApproved(true);
      approve({
        address: chainId === mainnet.id ? mainnetWeth : sepoliaWeth,
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
    setPrice("");
    setInputDays("7");
    setErrorMessage("");
    setErrorMessageDays("");
    setArgs({
      assetContract: nftContract,
      tokenId: BigInt(tokenId),
      quantity: 1n,
      currency: chainId === mainnet.id ? mainnetWeth : sepoliaWeth,
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
  }, [approveResult.isError, approveResult.isSuccess]);

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
              setApproveLoading(false);
              setOfferInitialized(false);
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
                    {args.totalPrice === 0n
                      ? "--"
                      : formatEther(args.totalPrice)}{" "}
                    WETH
                  </div>
                </div>
              </div>
              <OfferInput
                label="Set a price"
                postfix="weth"
                placeholder="0.00"
                valueName="totalPrice"
                value={price}
                errorMessage={errorMessage}
                onChange={handleOnChange}
              />
              <OfferInput
                label="Duration"
                postfix="Days"
                valueName="expirationTimestamp"
                value={inputDays}
                errorMessage={errorMessageDays}
                onChange={handleOnChange}
                placeholder="0"
              />
              <div className="flex flex-row justify-between">
                <div>Model earning</div>
                <div>10 %</div>
              </div>
              <div className="flex flex-row justify-between font-bold">
                <div>Total cost</div>
                {formatEther(args.totalPrice)} ETH
              </div>
              <button
                disabled={
                  offerInitialized ||
                  approveLoading ||
                  errorMessage !== "" ||
                  errorMessageDays !== "" ||
                  !args.totalPrice ||
                  !args.expirationTimestamp
                }
                className={`btn btn-primary w-full ${
                  offerInitialized ||
                  approveLoading ||
                  errorMessage !== "" ||
                  errorMessageDays !== "" ||
                  !args.totalPrice ||
                  !args.expirationTimestamp
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
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
                <h2 className="heading-md">Your offer has been submitted!</h2>
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
