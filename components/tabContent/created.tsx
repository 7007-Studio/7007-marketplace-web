import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { useEffect, useState } from "react";
import { ListingNFT } from "../modal/listingNFTModal";
import { Abi, Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { sepoliaClient } from "@/client";

const Collected = ({
  aigcAddress,
  listingNFTModalRef,
  setListingNFT,
  connectToSPModalRef,
}: {
  aigcAddress: Address;
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

  const [tokenIds, setTokenIds] = useState<string[]>([]);

  const { address } = useAccount();
  useEffect(() => {
    if (!aigcAddress || !address) return;

    const fetchMintEvents = async () => {
      const logs = await sepoliaClient.getContractEvents({
        address: aigcAddress,
        abi: AIGC.abi as Abi,
        eventName: "Transfer",
        args: {
          from: zeroAddress,
          to: address,
        },
        fromBlock: BigInt(5079109),
      });
      setTokenIds(
        logs
          .filter(
            (log) => (log.args as { tokenId?: string }).tokenId !== undefined
          )
          .map((log) => {
            const args = log.args as { tokenId: string };
            return args.tokenId;
          })
      );
    };
    fetchMintEvents();
  }, [aigcAddress, address]);

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
                aigcAddress={aigcAddress}
                tokenId={id.toString()}
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