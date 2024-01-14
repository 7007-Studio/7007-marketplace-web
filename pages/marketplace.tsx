import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AIGC_FACTORY_CONTRACT_ADDRESS,
  MOCK_MARKETPLACE_DATA,
  MOCK_MODEL_DATA,
} from "@/constants";
import Tabs from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import { AIGC_CONTRACT_ADDRESS, AIGT_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcBalanceOf,
  useAigcFactoryDeployedAigCs,
  useAigcOwnerOf,
  useAigcTokenId,
  useAigcTokenUri,
  useNftMarketplaceIsListed,
} from "@/generated";
import { useAccount } from "wagmi";

export enum TabState {
  Model,
  NFT,
}

export default function Marketplace() {
  const item = MOCK_MODEL_DATA;
  const [currentTab, setCurrentTab] = useState(TabState.Model);

  const { address } = useAccount();

  useNftMarketplaceIsListed();

  // hard coded
  const { data: deployedAigc } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(1)],
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

  // const { data: nftTokensOwned } = useAigcBalanceOf({
  //   address: AIGC_CONTRACT_ADDRESS,
  //   args: address ? [address] : undefined,
  // });

  return (
    <div className="flex min-h-screen flex-col p-20 py-16 mx-auto w-[95vw] ">
      <h1 className="text-3xl font-bold text-white">7007Lab Marketplace</h1>
      <div className="flex flex-col md:flex-row justify-between items-baseline">
        <div className="my-5 -mx-2">
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        <details className="dropdown w-full md:w-fit">
          <summary className="btn btn-primary w-full">Create New</summary>
          <ul className="shadow menu dropdown-content z-[1] bg-base-100 w-full p-0">
            <li>
              <Link
                href={`/model/${AIGT_CONTRACT_ADDRESS}/aigc/${AIGC_CONTRACT_ADDRESS}/generate`}
                className="bg-black text-white hover:text-black p-2 tracking-wider"
              >
                AIGC
              </Link>
            </li>
          </ul>
        </details>
      </div>

      {/* <div className="flex items-start flex-wrap justify-center gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentTab === TabState.Model && (
          <ModelCard
            modelName={item.modelName}
            modelAddress={item.modelAddress}
            totalSupply={item.totalSupply}
            nftMint={item.nftMint}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        )}

        {currentTab === TabState.NFT &&
          deployedAigc &&
          tokenIds.map((id) => (
            <NFTCard
              key={id}
              nftAddress={deployedAigc}
              tokenID={id.toString()}
            />
          ))}
      </div>
    </div>
  );
}
