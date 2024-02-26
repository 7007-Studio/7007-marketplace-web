import { useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import {
  useReadAigcFactoryDeployedAigCs,
  useReadAigcTokenId,
  useReadMarketplaceV3GetAllValidListings,
  useReadMarketplaceV3TotalListings,
} from "@/generated";
import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import { useIsMounted } from "@/hooks/useIsMounted";
import Tabs, { TabState } from "@/components/tabs";
import ModelLaunchpad from "@/components/tabContent/modelLaunchpad";
import Marketplace from "@/components/tabContent/marketplace";
import Collected from "@/components/tabContent/collected";
import ListingNFTModal, {
  ListingNFT,
} from "@/components/modal/listingNFTModal";
import ConnectToSPModal from "@/components/modal/connectToSPModal";
import Created from "@/components/tabContent/created";
import { getContractAddress } from "@/helpers";
import { Listing } from "@/types";

export default function Main() {
  // hard coded
  const modelIndex = 1;
  // const { data: modelIndex } = useReadAigcFactoryModelIndexCurrent();

  const listingNFTModalRef = useRef<HTMLDialogElement>(null);
  const [listingNFT, setListingNFT] = useState<ListingNFT>();

  const connectToSPModalRef = useRef<HTMLDialogElement>(null);

  const [currentTab, setCurrentTab] = useState(TabState.ModelLaunchpad);

  const { chainId } = useAccount();
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

    // for (let i = 0; i < Number(lastTokenId); i++) {
    //   // skipping for now b/c a screw up NFT
    //   if (i === 1) continue;
    //   ids.push(i);
    // }
    return ids;
  }, [lastTokenId]);

  const marketplaceV3 = getContractAddress("MarketplaceV3", chainId);

  const { data: totalListings } = useReadMarketplaceV3TotalListings({
    address: marketplaceV3,
  });

  const { data: allValidListings } = useReadMarketplaceV3GetAllValidListings({
    address: marketplaceV3,
    args: [BigInt(0), totalListings ? totalListings - BigInt(1) : BigInt(0)],
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

        {currentTab === TabState.Marketplace && (
          <Marketplace
            allValidListings={allValidListings as unknown as Listing[]}
          />
        )}

        {currentTab === TabState.Created && deployedAigc && (
          <Created
            aigcAddress={deployedAigc}
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
