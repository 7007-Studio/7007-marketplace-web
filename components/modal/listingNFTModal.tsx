import React, { RefObject, useEffect, useState } from "react";
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
  useWriteAigcSetApprovalForAll,
  useWriteMarketplaceV3CreateListing,
} from "@/generated";
import { Metadata } from "@/types";

import TextInput from "@/components/form/textInput";
import { toast } from "react-hot-toast";

export interface ListingNFT {
  nftContract: Address;
  name: string;
  tokenId: bigint;
  maxQuantity?: number;
  metadata?: Partial<Metadata>;
  refetch?: () => void;
}

interface IFormListNFTInput {
  price: string;
  duration: number;
}

interface ListingNFTModalProps {
  listingNFT?: ListingNFT;
}
interface Args {
  assetContract: Address;
  tokenId: bigint;
  quantity: bigint;
  currency: Address;
  pricePerToken: bigint;
  startTimestamp: bigint;
  endTimestamp: bigint;
  reserved: boolean;
}

const ListingNFTModal = React.forwardRef(
  ({ listingNFT }: ListingNFTModalProps, ref) => {
    const { isConnected, chainId, address } = useAccount();
    const { openConnectModal } = useConnectModal();
    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);
    const [approvedListing, setApprovedListing] = useState(false);
    const [listInitialized, setListInitialized] = useState(false);
    const [isListed, setIsListed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDays, setErrorMessageDays] = useState("");
    const [price, setPrice] = useState<string>("");
    const [duration, setDuration] = useState<string>("7");
    const [args, setArgs] = useState<Args>({
      assetContract: listingNFT ? listingNFT.nftContract : zeroAddress,
      tokenId: listingNFT ? BigInt(listingNFT.tokenId) : 0n,
      // quantity: BigInt(data.quantity) || 1n,
      quantity: 1n,
      currency: NATIVE_TOKEN_ADDRESS,
      pricePerToken: 0n,
      startTimestamp: BigInt(Math.round(Date.now() / 1000)),
      endTimestamp: BigInt(Math.round(Date.now() / 1000) + 7 * 24 * 60 * 60),
      reserved: false,
    });
    const { data: balance } = useBalance({
      address: address,
    });
    useEffect(() => {
      reset();
      setPrice("");
      setDuration("7");
      setErrorMessage("");
      setErrorMessageDays("");
      setArgs({
        assetContract: listingNFT ? listingNFT.nftContract : zeroAddress,
        tokenId: listingNFT ? BigInt(listingNFT.tokenId) : 0n,
        quantity: 1n,
        currency: NATIVE_TOKEN_ADDRESS,
        pricePerToken: 0n,
        startTimestamp: BigInt(Math.round(Date.now() / 1000)),
        endTimestamp: BigInt(Math.round(Date.now() / 1000) + 7 * 24 * 60 * 60),
        reserved: false,
      });
      setApprovedListing(false);
      setListInitialized(false);
      setIsListed(false);
    }, [listingNFT]);

    const { register, handleSubmit, watch, reset } =
      useForm<IFormListNFTInput>();

    const onSubmit: SubmitHandler<IFormListNFTInput> = async (data) => {
      console.debug("submit data", data);

      if (!isConnected || !chainId) {
        openConnectModal?.();
        return;
      }

      if (!marketplaceV3) {
        console.error("MarketplaceV3 not found");
        return;
      }

      if (!listingNFT) {
        return;
      }

      if (!approvedListing) {
        console.debug("submit data", data);

        setListInitialized(true);
        approveListing(
          {
            address: listingNFT.nftContract,
            args: [marketplaceV3, true],
          },
          {
            onError(error: any) {
              console.debug("approveListing onError", error);
              setListInitialized(false);
            },
          }
        );
      } else {
        handleCreateListing(data);
      }
    };

    // read contracts
    const { data: approved } = useReadAigcGetApproved({
      address: listingNFT?.nftContract,
      args: listingNFT ? [BigInt(listingNFT?.tokenId)] : undefined,
    });
    useEffect(() => {
      if (approved && !isAddressEqual(approved, zeroAddress)) {
        setApprovedListing(true);
      }
    }, [approved]);

    // write contracts
    const { writeContract: approveListing, data: approveTx } =
      useWriteAigcSetApprovalForAll();

    const { writeContract: createListing, data: createListingTx } =
      useWriteMarketplaceV3CreateListing();

    // wait for transactions
    const approveResult = useWaitForTransactionReceipt({
      hash: approveTx,
    });
    useEffect(() => {
      if (!approveResult.isSuccess) return;

      setApprovedListing(true);
      setListInitialized(false);
    }, [approveResult.isSuccess]);

    const listingResult = useWaitForTransactionReceipt({
      hash: createListingTx,
    });
    useEffect(() => {
      if (!listingResult.isSuccess) return;

      setIsListed(true);
      setApprovedListing(false);
      setListInitialized(false);
      listingNFT && listingNFT.refetch && listingNFT?.refetch?.();
    }, [listingResult.isSuccess]);

    function handleCreateListing(data: IFormListNFTInput) {
      if (!listingNFT) return;

      if (!marketplaceV3) {
        console.error("MarketplaceV3 not found");
        return;
      }

      setListInitialized(true);

      createListing(
        {
          address: marketplaceV3,
          args: [args],
        },
        {
          onError(error: any) {
            console.error(error);
            setListInitialized(false);
          },
        }
      );
    }
    const handleOnChange = (valueName: string, value: any) => {
      if (valueName === "duration") {
        setDuration(value);
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          setErrorMessageDays("Days must be a number");
          setArgs({
            ...args,
            endTimestamp: 0n,
          });
          return;
        }
        if (numberValue <= 0) {
          setErrorMessageDays("Days must be greater than 0");
          setArgs({
            ...args,
            endTimestamp: 0n,
          });
          return;
        }
        setErrorMessageDays("");
        setArgs({
          ...args,
          endTimestamp: BigInt(
            Math.round(Date.now() / 1000) + Number(value) * 24 * 60 * 60
          ),
        });
      } else if (valueName === "price") {
        setPrice(value);
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          setErrorMessage("Total price must be a number");
          setArgs({
            ...args,
            pricePerToken: 0n,
          });
          return;
        }
        if (numberValue <= 0.0001) {
          setErrorMessage("Total price must be greater than 0.0001");
          setArgs({
            ...args,
            pricePerToken: 0n,
          });
          return;
        }
        if (numberValue.toString().split(".")[1]?.length > 4) {
          setErrorMessage("Total price must have at most 4 decimals");
          const fixed = numberValue.toFixed(4);
          setArgs({
            ...args,
            pricePerToken: parseEther(fixed),
          });
          return;
        }
        setErrorMessage("");
        setArgs({
          ...args,
          pricePerToken: parseEther(value),
        });
      }
    };

    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        id="listingNFTModal"
        className="modal"
      >
        <div className="modal-box max-w-[424px] bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
              ✕
            </button>
          </form>
          {!isListed ? (
            <>
              <h3 className="heading-md pb-4">Quick list</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div>
                    {listingNFT?.metadata?.image && (
                      <Image
                        src={listingNFT.metadata.image}
                        alt={listingNFT.metadata.name || ""}
                        width={72}
                        height={72}
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="text-lg">{listingNFT?.metadata?.name}</div>
                    <div className="text-sm">{listingNFT?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm pt-2">Listing price</div>
                    <div className="text-lg">
                      {args.pricePerToken === 0n
                        ? "--"
                        : formatEther(args.pricePerToken)}{" "}
                      ETH
                    </div>
                  </div>
                </div>
                <TextInput
                  label="Set a price"
                  postfix="eth"
                  name="price"
                  placeholder="0.00"
                  required
                  register={register}
                  value={price}
                  errorMessage={errorMessage}
                  onChange={handleOnChange}
                />
                <TextInput
                  label="Duration"
                  postfix="Days"
                  name="duration"
                  placeholder="0"
                  min={1}
                  max={7}
                  required
                  register={register}
                  value={duration}
                  errorMessage={errorMessageDays}
                  onChange={handleOnChange}
                />
                <div>
                  <div className="flex flex-row justify-between">
                    <div>Listing price</div>
                    <div>
                      {args.pricePerToken === 0n
                        ? "--"
                        : formatEther(args.pricePerToken)}{" "}
                      ETH
                    </div>
                  </div>
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
                    <div>10 %</div>
                  </div>
                  <div className="flex flex-row justify-between font-bold">
                    <div>Total potential earnings</div>
                    <div>
                      {args.pricePerToken === 0n
                        ? "--"
                        : formatEther(args.pricePerToken)}{" "}
                      ETH
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    disabled={
                      listInitialized ||
                      !price ||
                      !duration ||
                      errorMessage !== "" ||
                      errorMessageDays !== ""
                    }
                    className={`btn btn-primary w-full ${
                      !price ||
                      !duration ||
                      errorMessage !== "" ||
                      errorMessageDays !== ""
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {listInitialized ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        loading
                      </>
                    ) : approvedListing ? (
                      "List"
                    ) : (
                      "Approve Listing"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-10">
              <Image
                src="/check.svg"
                alt="NFT listed"
                width={120}
                height={120}
              />
              <div className="px-4 text-center">
                <h2 className="heading-md">
                  Your NFT was listed successfully!
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  (ref as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </dialog>
    );
  }
);
ListingNFTModal.displayName = "ListingNFTModal";

export default ListingNFTModal;
