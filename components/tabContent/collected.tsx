import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { useRef, useState } from "react";
import { Metadata } from "@/types";
import TextInput from "../textInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Address, useAccount, useWaitForTransaction } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { NFT_MARKETPLACE_ADDRESS } from "@/constants";
import { useAigcApprove, useNftMarketplaceList } from "@/generated";

export interface ListingNFT {
  address: Address;
  tokenId: string | number;
  metadata: Metadata;
}

interface IFormListNFTInput {
  price: string;
  duration: number;
}

const Collected = ({
  modelIndex,
  tokenIds,
}: {
  modelIndex: number;
  tokenIds: number[];
}) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [aigcNftTypeFilter, setAigcNftTypeFilter] = useState([
    { id: "music", label: "Music", checked: false },
    { id: "image", label: "Image", checked: false },
    { id: "music-image", label: "Music and Image", checked: false },
    { id: "text", label: "Text", checked: false },
  ]);

  const [approvedListing, setApprovedListing] = useState(false);
  const [listInitialized, setListInitialized] = useState(false);

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();
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
      // refetchOwner();
      // refetchIsListed();

      setApprovedListing(false);
      setListInitialized(false);
    },
  });

  return (
    <>
      <div className="pb-8">
        Display {tokenIds.length} of {tokenIds.length} AIGC NFTs
      </div>
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-6">
            {tokenIds.map((id) => (
              <NFTCard
                key={id}
                modelIndex={modelIndex}
                tokenId={id.toString()}
                ownedOnly
                onListingNFT={(nft) => {
                  setListingNFT(nft);
                  listingNFTModalRef.current?.showModal();
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col min-w-[288px] gap-y-8">
          <Filter
            title="Type"
            options={aigcNftTypeFilter}
            onChange={(id) => handleFilterChange(id, setAigcNftTypeFilter)}
          />
        </div>
      </div>
      <dialog ref={listingNFTModalRef} id="listingNFTModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
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
                    listingNFTModalRef.current?.close();
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
        </div>
      </dialog>
    </>
  );
};

export default Collected;
