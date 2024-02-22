import { useState } from "react";

import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { Listing } from "@/types";
import { Address, isAddressEqual } from "viem";

const Marketplace = ({
  aigcAddress,
  tokenIds,
  allValidListings,
}: {
  aigcAddress: Address;
  tokenIds: number[];
  allValidListings?: Listing[];
}) => {
  const [marketplaceTypeFilter, setMarketplaceTypeFilter] = useState([
    { id: "aigc", label: "AIGC", checked: false },
    { id: "model", label: "Model", checked: false },
  ]);
  const aigcListings = allValidListings?.filter((l) =>
    isAddressEqual(l.assetContract, aigcAddress)
  );
  const listedTokenIds = aigcListings?.map((l) => l.tokenId) || [];

  return (
    <>
      <div className="pb-8">
        Display {listedTokenIds.length} of {listedTokenIds.length} AIGC NFTs
      </div>
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-6 items-start">
            {listedTokenIds
              ?.filter((t) => listedTokenIds?.includes(BigInt(t)))
              .map((id) => (
                <NFTCard
                  key={id}
                  aigcAddress={aigcAddress}
                  tokenId={id.toString()}
                  listing={aigcListings?.find(
                    (l) =>
                      isAddressEqual(l.assetContract, aigcAddress) &&
                      l.tokenId === BigInt(id)
                  )}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col min-w-[288px] gap-y-8">
          <Filter
            title="Type"
            options={marketplaceTypeFilter}
            onChange={(id) => handleFilterChange(id, setMarketplaceTypeFilter)}
          />
        </div>
      </div>
    </>
  );
};

export default Marketplace;
