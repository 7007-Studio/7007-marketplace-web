import { useMemo, useRef, useState } from "react";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import Tabs, { TabState } from "@/components/tabs";
import { useAigcFactoryDeployedAigCs, useAigcTokenId } from "@/generated";
import { useIsMounted } from "@/hooks/useIsMounted";
import ModelLaunchpad from "@/components/tabContent/modelLaunchpad";
import Marketplace from "@/components/tabContent/marketplace";
import Collected from "@/components/tabContent/collected";
import ListingNFTModal, {
  ListingNFT,
} from "@/components/modal/listingNFTModal";
import ConnectToSPModal from "@/components/modal/connectToSPModal";

export default function Main() {
  // hard coded
  const modelIndex = 1;

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();

  const connectToSPModalRef = useRef<HTMLDialogElement>(null);

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
    <>
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

        {currentTab === TabState.Created && deployedAigc && (
          <Collected
            modelIndex={modelIndex}
            tokenIds={tokenIds}
            listingNFTModalRef={listingNFTModalRef}
            setListingNFT={setListingNFT}
            connectToSPModalRef={connectToSPModalRef}
          />
        )}

        {currentTab === TabState.Collected && deployedAigc && (
          <Collected
            modelIndex={modelIndex}
            tokenIds={tokenIds}
            listingNFTModalRef={listingNFTModalRef}
            setListingNFT={setListingNFT}
            connectToSPModalRef={connectToSPModalRef}
          />
        )}
      </div>
      <ListingNFTModal
        ref={listingNFTModalRef}
        listingNFT={listingNFT}
        // listingSuccess={() => {TODO: refresh the card state}}
      />
      <ConnectToSPModal ref={connectToSPModalRef} onConnect={() => {}} />
    </>
  );
}
