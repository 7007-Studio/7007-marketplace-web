import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { useEffect, useState } from "react";
import { ListingNFT } from "../modal/listingNFTModal";
import { Abi, Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { getPublicClient } from "@/client";

const Collected = ({
  aigcAddress,
  setListingNFT,
  connectToSPModalRef,
}: {
  aigcAddress: Address;
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

  const { address, chain } = useAccount();
  useEffect(() => {
    if (!aigcAddress || !address || !chain) return;

    const fetchMintEvents = async () => {
      const logs = await getPublicClient(chain).getContractEvents({
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
  }, [aigcAddress, address, chain]);

  return (
    <>
      <div className="pb-8">
        Display {tokenIds.length} of {tokenIds.length} AIGC NFTs
      </div>
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-6 items-start">
            {tokenIds.map((id) => (
              <NFTCard
                key={id}
                nftContract={aigcAddress}
                tokenId={BigInt(id)}
                onListingNFT={setListingNFT}
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
