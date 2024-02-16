import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { useRef, useState } from "react";
import ListingNFTModal, { ListingNFT } from "../modal/listingNFTModal";
import ConnectToSPModal from "../modal/connectToSPModal";

const Collected = ({
  modelIndex,
  tokenIds,
  listingNFTModalRef,
  setListingNFT,
  connectToSPModalRef,
}: {
  modelIndex: number;
  tokenIds: number[];
  listingNFTModalRef: React.RefObject<HTMLDialogElement>;
  setListingNFT: (nft: ListingNFT) => void;
  connectToSPModalRef: React.RefObject<HTMLDialogElement>;
}) => {
  const [aigcNftTypeFilter, setAigcNftTypeFilter] = useState([
    { id: "music", label: "Music", checked: false },
    { id: "image", label: "Image", checked: false },
    { id: "music-image", label: "Music and Image", checked: false },
    { id: "text", label: "Text", checked: false },
  ]);

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
                onConnectToSP={() => {
                  connectToSPModalRef.current?.showModal();
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
    </>
  );
};

export default Collected;
