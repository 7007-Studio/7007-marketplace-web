import { RefObject, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Address, useAccount, useWaitForTransaction } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { NFT_MARKETPLACE_ADDRESS } from "@/constants";
import { useAigcApprove, useNftMarketplaceList } from "@/generated";
import { Metadata } from "@/types";

import TextInput from "../textInput";

export interface ListingNFT {
  address: Address;
  tokenId: string | number;
  metadata: Metadata;
}

interface IFormListNFTInput {
  price: string;
  duration: number;
}

const ListingNFTModal = ({
  listingNFT,
  listingNFTModalRef,
  listingSuccess,
}: {
  listingNFT?: ListingNFT;
  listingNFTModalRef?: RefObject<HTMLDialogElement>;
  listingSuccess?: () => void;
}) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [approvedListing, setApprovedListing] = useState(false);
  const [listInitialized, setListInitialized] = useState(false);
  const [isListed, setIsListed] = useState(false);

  useEffect(() => {
    setApprovedListing(false);
    setListInitialized(false);
    setIsListed(false);
  }, [listingNFT]);

  const { register, handleSubmit } = useForm<IFormListNFTInput>();
  const onSubmit: SubmitHandler<IFormListNFTInput> = async (data) => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    setListInitialized(true);
    if (!approvedListing) {
      approveListing();
    } else {
      listNft({
        args: listingNFT
          ? [listingNFT.address, BigInt(listingNFT.tokenId)]
          : undefined,
      });
    }
  };

  // write contracts
  const { write: approveListing, data: approveTx } = useAigcApprove({
    address: listingNFT?.address,
    args: listingNFT
      ? [NFT_MARKETPLACE_ADDRESS, BigInt(listingNFT?.tokenId)]
      : undefined,
    onError(error) {
      setListInitialized(false);
    },
  });

  const { write: listNft, data: listNftTx } = useNftMarketplaceList({
    address: NFT_MARKETPLACE_ADDRESS,
    args: listingNFT
      ? [listingNFT?.address, BigInt(listingNFT?.tokenId)]
      : undefined,
    onError(error) {
      setListInitialized(false);
    },
  });

  // wait for transactions
  useWaitForTransaction({
    hash: approveTx?.hash,
    onSuccess(data) {
      setApprovedListing(true);
      listNft();
    },
  });

  useWaitForTransaction({
    hash: listNftTx?.hash,
    onSuccess(data) {
      setIsListed(true);
      setApprovedListing(false);
      setListInitialized(false);

      listingSuccess?.();
    },
  });
  return (
    <dialog ref={listingNFTModalRef} id="listingNFTModal" className="modal">
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
                required
                register={register}
              />
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <button
                    type="button"
                    className="btn btn-secondary w-full"
                    onClick={() => {
                      listingNFTModalRef?.current?.close();
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
            <Image src="/check.svg" alt="NFT listed" width={120} height={120} />
            <div className="px-4 text-center">
              <h2 className="heading-md">Your NFT was listed successfully!</h2>
            </div>
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => {
                listingNFTModalRef?.current?.close();
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default ListingNFTModal;
