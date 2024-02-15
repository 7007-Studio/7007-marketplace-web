import { RefObject, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Address, useAccount, useWaitForTransaction } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { DIRECT_LISTINGS_ADDRESS, WRAPPED_ETH_ADDRESS } from "@/constants";
import { useAigcApprove, useDirectListingsCreateListing } from "@/generated";
import { Metadata } from "@/types";

import TextInput from "../textInput";
import React from "react";
import { parseEther, zeroAddress } from "viem";

export interface ListingNFT {
  address: Address;
  tokenId: string | number;
  metadata: Metadata;
}

interface IFormListNFTInput {
  price: string;
  duration: number;
}

interface ListingNFTModalProps {
  listingNFT?: ListingNFT;
  listingSuccess?: () => void;
}

const ListingNFTModal = React.forwardRef(
  ({ listingNFT, listingSuccess }: ListingNFTModalProps, ref) => {
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    const [approvedListing, setApprovedListing] = useState(false);
    const [listInitialized, setListInitialized] = useState(false);
    const [isListed, setIsListed] = useState(false);

    useEffect(() => {
      reset();
      setApprovedListing(false);
      setListInitialized(false);
      setIsListed(false);
    }, [listingNFT]);

    const { register, handleSubmit, getValues, reset } =
      useForm<IFormListNFTInput>();
    const onSubmit: SubmitHandler<IFormListNFTInput> = async (data) => {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }

      setListInitialized(true);
      if (!approvedListing) {
        approveListing();
      } else {
        createListing({
          args: [
            {
              assetContract: listingNFT ? listingNFT?.address : zeroAddress,
              tokenId: listingNFT ? BigInt(listingNFT?.tokenId) : BigInt(0),
              quantity: BigInt(1),
              currency: WRAPPED_ETH_ADDRESS,
              pricePerToken: parseEther(data.price),
              startTimestamp: BigInt(Math.round(Date.now() / 1000)),
              endTimestamp: BigInt(
                Math.round(Date.now() / 1000) + 7 * 24 * 60 * 60 * 1000
              ),
              reserved: false,
            },
          ],
        });
      }
    };

    // write contracts
    const { write: approveListing, data: approveTx } = useAigcApprove({
      address: listingNFT?.address,
      args: listingNFT
        ? [DIRECT_LISTINGS_ADDRESS, BigInt(listingNFT?.tokenId)]
        : undefined,
      onError(error) {
        setListInitialized(false);
      },
    });

    const { write: createListing, data: createListingTx } =
      useDirectListingsCreateListing({
        address: DIRECT_LISTINGS_ADDRESS,
        onError(error) {
          console.error(error);
          setListInitialized(false);
        },
      });

    // wait for transactions
    useWaitForTransaction({
      hash: approveTx?.hash,
      onSuccess(data) {
        setApprovedListing(true);
        createListing({
          args: [
            {
              assetContract: listingNFT ? listingNFT?.address : zeroAddress,
              tokenId: listingNFT ? BigInt(listingNFT?.tokenId) : BigInt(0),
              quantity: BigInt(1),
              currency: WRAPPED_ETH_ADDRESS,
              pricePerToken: parseEther(getValues("price")),
              startTimestamp: BigInt(Math.round(Date.now() / 1000)),
              endTimestamp: BigInt(
                Math.round(Date.now() / 1000) +
                  getValues("duration") * 24 * 60 * 60 * 1000
              ),
              reserved: false,
            },
          ],
        });
      },
    });

    useWaitForTransaction({
      hash: createListingTx?.hash,
      onSuccess(data) {
        setIsListed(true);
        setApprovedListing(false);
        setListInitialized(false);

        listingSuccess?.();
      },
    });
    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        id="listingNFTModal"
        className="modal"
      >
        <div className="modal-box max-w-[424px]">
          {!isListed ? (
            <>
              <h3 className="heading-md">Listing NFT</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div>
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <div className="text-lg">{listingNFT?.metadata.name}</div>
                </div>
                <TextInput
                  label="Price"
                  postfix="eth"
                  name="price"
                  placeholder="0.00"
                  required
                  register={register}
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
                />
                <span className="text-sm">
                  You can set a maximum of 7 days.
                </span>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <button
                      type="button"
                      className="btn btn-secondary w-full"
                      onClick={() => {
                        (ref as RefObject<HTMLDialogElement>)?.current?.close();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex-1">
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
