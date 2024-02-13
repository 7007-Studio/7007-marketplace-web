import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import Tabs, { TabState } from "@/components/tabs";
import NFTCard from "@/components/nftCard";
import {
  useAigcFactoryDeployedAigCs,
  useAigcTokenId,
  useNftMarketplaceIsListed,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import Filter, { FilterEntry, FilterProps } from "@/components/filter";
import ModelLaunchpad from "@/components/tabContent/modelLaunchpad";
import Marketplace from "@/components/tabContent/marketplace";
import Collected from "@/components/tabContent/collected";

export default function Main() {
  // hard coded
  const modelIndex = 1;
  const [currentTab, setCurrentTab] = useState(TabState.ModelLaunchpad);
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

  return (
    <div>
      <div className="flex pb-20">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      {currentTab === TabState.ModelLaunchpad && (
        <ModelLaunchpad modelIndex={modelIndex} />
      )}

      {currentTab === TabState.Marketplace && deployedAigc && (
        <Marketplace modelIndex={modelIndex} tokenIds={tokenIds} />
      )}

      {currentTab === TabState.Collected && deployedAigc && (
        <Collected modelIndex={modelIndex} tokenIds={tokenIds} />
      )}
    </div>
  );
}
