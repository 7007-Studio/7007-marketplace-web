import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import Tabs, { TabState } from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import {
  useAigcFactoryDeployedAigCs,
  useAigcTokenId,
  useNftMarketplaceIsListed,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import Filter, { FilterEntry, FilterProps } from "@/components/filter";

export default function Main() {
  // hard coded
  const modelIndex = 1;

  const [currentTab, setCurrentTab] = useState(TabState.ModelLaunchpad);
  const [statusFilter, setStatusFilter] = useState([
    { id: "launched", label: "Launched", checked: false },
    { id: "pre-launched", label: "Pre-launched", checked: false },
    { id: "launching", label: "Launching", checked: false },
    { id: "token-claim", label: "Token Claim", checked: false },
    { id: "owned-model", label: "Owned Model", checked: false },
  ]);
  const [modelTypeFilter, setModelTypeFilter] = useState([
    { id: "text-to-image", label: "Text-to-Image", checked: false },
    { id: "text-to-music", label: "Text-to-Music", checked: false },
    { id: "text-to-text", label: "Text-to-Text", checked: false },
  ]);
  const [poolTypeFilter, setPoolTypeFilter] = useState([
    { id: "random-pick", label: "Random Pick", checked: false },
    { id: "fixed-price", label: "Fixed Price", checked: false },
    { id: "initial-lp-offering", label: "Initial LP Offering", checked: false },
    { id: "free-launch", label: "Free Launch", checked: false },
  ]);

  const [marketplaceTypeFilter, setMarketplaceTypeFilter] = useState([
    { id: "aigc", label: "AIGC", checked: false },
    { id: "model", label: "Model", checked: false },
  ]);

  // useNftMarketplaceIsListed();

  const { data: deployedAigc } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(modelIndex)],
  });

  const { data: lastTokenId } = useAigcTokenId({
    address: deployedAigc,
  });

  const tokenIds = useMemo(() => {
    const ids: number[] = [];
    if (!lastTokenId) return ids;

    for (let i = 0; i < Number(lastTokenId); i++) {
      // skipping for now b/c a screw up NFT
      if (i === 1) continue;
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  const handleFilterChange = (
    id: string,
    setFilter: Dispatch<
      SetStateAction<
        {
          id: string;
          label: string;
          checked: boolean;
        }[]
      >
    >
  ) => {
    setFilter((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  return (
    <div>
      <div className="flex pb-20">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      {currentTab === TabState.ModelLaunchpad && (
        <>
          <div className="pb-8">Display 1 of 1 models</div>
          <div className="flex flex-row gap-x-11 justify-between">
            <div className="flex flex-row flex-wrap gap-10">
              <ModelCard modelIndex={modelIndex} />
            </div>

            <div className="flex flex-col min-w-[288px] gap-y-8">
              <Filter
                title="Status"
                options={statusFilter}
                onChange={(id) => handleFilterChange(id, setStatusFilter)}
              />
              <Filter
                title="Model Type"
                options={modelTypeFilter}
                onChange={(id) => handleFilterChange(id, setModelTypeFilter)}
              />
              <Filter
                title="Pool Type"
                options={poolTypeFilter}
                onChange={(id) => handleFilterChange(id, setPoolTypeFilter)}
              />
            </div>
          </div>
        </>
      )}

      {currentTab === TabState.Marketplace && deployedAigc && (
        <>
          <div className="pb-8">
            Display {tokenIds.length} of {tokenIds.length} AIGC NFTs
          </div>
          <div className="flex flex-row gap-x-11 justify-between">
            <div className="flex flex-row flex-wrap gap-6">
              {tokenIds.map((id) => (
                <NFTCard
                  key={id}
                  modelIndex={modelIndex}
                  tokenId={id.toString()}
                />
              ))}
            </div>
            <div className="flex flex-col min-w-[288px] gap-y-8">
              <Filter
                title="Type"
                options={marketplaceTypeFilter}
                onChange={(id) =>
                  handleFilterChange(id, setMarketplaceTypeFilter)
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
