import { useState } from "react";
import Link from "next/link";
import { MOCK_MARKETPLACE_DATA } from "@/constants";
import { Model, NFT } from "@/types";
import Tabs from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import { isModel, isNFT } from "@/helpers";

export enum TabState {
  All,
  Model,
  NFT,
}

export default function MarketPlace() {
  const [currentTab, setCurrentTab] = useState(TabState.All);
  const items = MOCK_MARKETPLACE_DATA;
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
                href="/model/generate"
                className="bg-black text-white p-2 tracking-wider"
              >
                Model
              </Link>
            </li>
            <li>
              <Link
                href="/model/index/aigc/generate"
                className="bg-black text-white p-2 tracking-wider"
              >
                AIGC
              </Link>
            </li>
          </ul>
        </details>
      </div>

      {/* <div className="flex items-start flex-wrap justify-center gap-6"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items
          .filter((item) => {
            if (currentTab === TabState.All) {
              return true;
            }

            if (currentTab === TabState.Model) {
              return isModel(item);
            }

            if (currentTab === TabState.NFT) {
              return isNFT(item);
            }

            return false;
          })
          .map((item) => {
            if (isNFT(item)) {
              return (
                <NFTCard
                  key={item.tokenID}
                  nftName={item.nftName}
                  modelName={item.modelName}
                  title={item.title}
                  description={item.description}
                  nftAddress={item.nftAddress}
                  tokenID={item.tokenID}
                  openseaLink={item.openseaLink}
                  imageUrl={item.imageUrl}
                />
              );
            } else if (isModel(item)) {
              return (
                <ModelCard
                  key={item.modelIndex}
                  modelName={item.modelName}
                  modelAddress={item.modelAddress}
                  totalSupply={item.totalSupply}
                  nftMint={item.nftMint}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                />
              );
            } else {
              return "";
            }
          })}
      </div>
    </div>
  );
}
