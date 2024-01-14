import { useMemo, useState } from "react";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import Tabs from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import {
  useAigcFactoryDeployedAigCs,
  useAigcTokenId,
  useNftMarketplaceIsListed,
} from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";

export enum TabState {
  Model,
  NFT,
}

export default function Marketplace() {
  // hard coded
  const modelIndex = 1;

  const [currentTab, setCurrentTab] = useState(TabState.Model);

  useNftMarketplaceIsListed();

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
      ids.push(i);
    }
    return ids;
  }, [lastTokenId]);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col p-20 py-16 mx-auto w-[95vw] ">
      <h1 className="text-3xl font-bold text-white">7007Lab Marketplace</h1>
      <div className="flex flex-col md:flex-row justify-between items-baseline">
        <div className="my-5 -mx-2">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      </div>

      {/* <div className="flex items-start flex-wrap justify-center gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {currentTab === TabState.Model && <ModelCard modelIndex={modelIndex} />}

        {currentTab === TabState.NFT &&
          deployedAigc &&
          tokenIds.map((id) => (
            <NFTCard key={id} modelIndex={modelIndex} tokenId={id.toString()} />
          ))}
      </div>
    </div>
  );
}
