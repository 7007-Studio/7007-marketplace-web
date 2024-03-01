import { useState } from "react";

import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";
import { Listing } from "@/types";

const Marketplace = ({
  allValidListings,
}: {
  allValidListings?: Listing[];
}) => {
  const [marketplaceTypeFilter, setMarketplaceTypeFilter] = useState([
    { id: "aigc", label: "AIGC", checked: false },
    { id: "model", label: "Model", checked: false },
  ]);

  return (
    <>
      {allValidListings && allValidListings.length > 0 && (
        <div className="pb-8">
          Display {allValidListings.length} of {allValidListings.length} AIGC
          NFTs
        </div>
      )}
      <div className="flex flex-row gap-x-11 justify-between">
        <div>
          <div className="flex flex-row flex-wrap gap-6 items-start">
            {allValidListings?.map((l) => (
              <NFTCard
                key={l.listingId}
                nftContract={l.assetContract}
                tokenId={l.tokenId}
                listing={l}
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
