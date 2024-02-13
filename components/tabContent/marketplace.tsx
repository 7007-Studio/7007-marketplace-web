import { useState } from "react";

import handleFilterChange from "@/helpers/handleFilterChange";
import Filter from "@/components/filter";
import NFTCard from "@/components/nftCard";

const Marketplace = ({
  modelIndex,
  tokenIds,
}: {
  modelIndex: number;
  tokenIds: number[];
}) => {
  const [marketplaceTypeFilter, setMarketplaceTypeFilter] = useState([
    { id: "aigc", label: "AIGC", checked: false },
    { id: "model", label: "Model", checked: false },
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
