import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { useEffect, useMemo, useState } from "react";
import { ListingNFT } from "../modal/listingNFTModal";
import { Abi, Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import AIGC from "@/abis/AIGC.json";
import { sepoliaClient } from "@/client";
import { useReadAigcTokenId } from "@/generated";

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

  const [filteredTokenIds, setFilteredTokenIds] = useState<string[]>([]);

  const { address } = useAccount();

  const { data: lastTokenId } = useReadAigcTokenId({
    address: aigcAddress,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!lastTokenId) return ids;

    for (let i = 0; i < Number(lastTokenId); i++) {
      // skipping for now b/c a screw up NFT
      // if (i === 1) continue;
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

  useEffect(() => {
    if (!aigcAddress || !address) return;

    const contract = {
      address: aigcAddress,
      abi: AIGC.abi as Abi,
      functionName: "ownerOf",
    };

    const fetchOwner = async () => {
      const results = await sepoliaClient.multicall({
        contracts: tokenIds.map((id) => ({
          ...contract,
          args: [BigInt(id)],
        })),
      });
      const ownedTokenIds = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.result === address) {
          ownedTokenIds.push(String(tokenIds[i]));
        }
      }
      setFilteredTokenIds(ownedTokenIds);
    };

    fetchOwner();
  }, [aigcAddress, address, tokenIds]);

  return (
    <>
      <div className="pb-8">
        Display {filteredTokenIds.length} of {filteredTokenIds.length} AIGC NFTs
      </div>
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-6 items-start">
            {filteredTokenIds.map((id) => (
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
