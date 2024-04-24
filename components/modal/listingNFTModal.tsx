import React, { RefObject, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { Address, isAddressEqual, parseEther, zeroAddress } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import { getContractAddress } from "@/helpers";
import {
  useReadAigcGetApproved,
  useWriteAigcSetApprovalForAll,
  useWriteMarketplaceV3CreateListing,
} from "@/generated";
import { Metadata } from "@/types";

import TextInput from "@/components/form/textInput";

export interface ListingNFT {
  nftContract: Address;
  name: string;
  tokenId: bigint;
  maxQuantity?: number;
  metadata?: Partial<Metadata>;
}

interface IFormListNFTInput {
  price: string;
  duration: number;
  quantity: number;
}

interface ListingNFTModalProps {
  listingNFT?: ListingNFT;
}

const ListingNFTModal = React.forwardRef(
  ({ listingNFT }: ListingNFTModalProps, ref) => {
    const { isConnected, chainId } = useAccount();
    const { openConnectModal } = useConnectModal();

    const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);

    const [approvedListing, setApprovedListing] = useState(false);
    const [listInitialized, setListInitialized] = useState(false);
    const [isListed, setIsListed] = useState(false);

    useEffect(() => {
      reset();
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
    }, [listingResult.isSuccess]);

    function handleCreateListing(data: IFormListNFTInput) {
      if (!listingNFT) return;

      if (!marketplaceV3) {
        console.error("MarketplaceV3 not found");
        return;
      }

      setListInitialized(true);

      const createListingArgsTuple: {
        assetContract: Address;
        tokenId: bigint;
        quantity: bigint;
        currency: Address;
        pricePerToken: bigint;
        startTimestamp: bigint;
        endTimestamp: bigint;
        reserved: boolean;
      } = {
        assetContract: listingNFT.nftContract,
        tokenId: BigInt(listingNFT.tokenId),
        // quantity: BigInt(data.quantity) || 1n,
        quantity: 1n,
        currency: NATIVE_TOKEN_ADDRESS,
        pricePerToken: parseEther(data.price),
        startTimestamp: BigInt(Math.round(Date.now() / 1000)),
        endTimestamp: BigInt(
          Math.round(Date.now() / 1000) + data.duration * 24 * 60 * 60
        ),
        reserved: false,
      };

      createListing(
        {
          address: marketplaceV3,
          args: [createListingArgsTuple],
        },
        {
          onError(error: any) {
            console.error(error);
            setListInitialized(false);
          },
        }
      );
    }

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
                      {watch("price")?.length ? watch("price") : "--"} ETH
                    </div>
                  </div>
                </div>
                <div>
                  <TextInput
                    label="Set a price"
                    postfix="eth"
                    name="price"
                    placeholder="0.00"
                    required
                    register={register}
                  />
                </div>
                <div>
                  <TextInput
                    label="Duration"
                    postfix="Days"
                    name="duration"
                    placeholder="0"
                    min={1}
                    max={7}
                    required
                    register={register}
                  />
                </div>
                <div>
                  <div className="flex flex-row justify-between">
                    <div>Listing price</div>
                    <div>
                      {watch("price")?.length ? watch("price") : "--"} ETH
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
                    <div>0 %</div>
                  </div>
                  <div className="flex flex-row justify-between font-bold">
                    <div>Total potential earnings</div>
                    <div>
                      {watch("price")?.length ? watch("price") : "--"} ETH
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    disabled={listInitialized}
                    className="btn btn-primary w-full"
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
