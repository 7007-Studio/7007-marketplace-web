import { useEffect, useMemo, useRef, useState } from "react";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  MARKETPLACE_V3_ADDRESS,
} from "@/constants";
import Tabs, { TabState } from "@/components/tabs";
import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcFactoryModelIndexCurrent,
  useReadAigcTokenId,
  useReadMarketplaceV3GetAllListings,
  useReadMarketplaceV3GetAllValidListings,
  useReadMarketplaceV3TotalListings,
} from "@/generated";
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
  // const { data: modelIndex } = useReadAigcFactoryModelIndexCurrent();

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();

  const connectToSPModalRef = useRef<HTMLDialogElement>(null);

  const [currentTab, setCurrentTab] = useState(TabState.ModelLaunchpad);
  const { data: deployedAigc } = useReadAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: modelIndex ? [BigInt(modelIndex)] : undefined,
  });

  const { data: lastTokenId } = useReadAigcTokenId({
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

  const { data: totalListings } = useReadMarketplaceV3TotalListings({
    address: MARKETPLACE_V3_ADDRESS,
  });

  const { data: allValidListings } = useReadMarketplaceV3GetAllValidListings({
    address: MARKETPLACE_V3_ADDRESS,
    args: [0, totalListings ? totalListings - BigInt(1) : 0],
  });

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
          <Marketplace
            aigcAddress={deployedAigc}
            tokenIds={tokenIds}
            allValidListings={allValidListings}
          />
        )}

        {currentTab === TabState.Created && deployedAigc && (
          <Collected
            aigcAddress={deployedAigc}
            tokenIds={tokenIds}
            listingNFTModalRef={listingNFTModalRef}
            setListingNFT={setListingNFT}
            connectToSPModalRef={connectToSPModalRef}
          />
        )}

        {currentTab === TabState.Collected && deployedAigc && (
          <Collected
            aigcAddress={deployedAigc}
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
