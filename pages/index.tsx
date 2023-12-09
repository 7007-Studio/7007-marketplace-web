import React from "react";
import Tabs from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard, { NFTCardProps } from "@/components/nftCard";

function shuffleArray(array : number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export default function Home() {
  const nftItems = [1, 2, 3, 4];
  const modelItems = [5, 6, 7, 8];
  const items = shuffleArray([...nftItems, ...modelItems]);
  // END: ed8c6549bwf9

  return (
    <main className="flex min-h-screen jus flex-col p-20 py-16 mx-auto w-[95vw] ">
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl font-bold text-white">7007Lab market place</h1>
      </div>
      <Tabs />
      <div className="flex items-start flex-wrap justify-center gap-6 ">
        {nftItems.map((item) => (
          <NFTCard 
            nftName="NOV 012"
            modelName="model 1"
            title="Tama d’Amore Per Nata"
            description="Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer at risus."
            nftAddress="0x123...abc"
            tokenID="234455..8123532"
            openseaLink="www.opensea.com/dsdw"
            key={item}
          /> 
          ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6 ">
        {modelItems.map((item) => (
          <ModelCard 
            modelName="NOV 012"
            modelAddress="0x123...abc"
            totalSupply={1000}
            nftMint={500}
            title="Tama d’Amore Per Nata"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer at risus."
            key={item}
          /> 
          ))}
      </div>
    </main>
  );
}
