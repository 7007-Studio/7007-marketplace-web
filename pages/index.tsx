import {useState} from "react";
import Tabs from "@/components/tabs";
import ModelCard from "@/components/modelCard";
import NFTCard, { NFTCardProps } from "@/components/nftCard";
import Link from "next/link";


function shuffleArray(array : number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export default function MarketPlace() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAllTab, setIsAllTab] = useState(true);
  const [isModelTab, setIsModelTab] = useState(false);
  const [isNFTTab, setIsNFTTab] = useState(false);
  const nftItems = [1, 2, 3, 4];
  const modelItems = [5, 6, 7, 8,9];
  const items = shuffleArray([...nftItems, ...modelItems]); 
  return (
    <main className="flex min-h-screen flex-col p-20 py-16 mx-auto w-[95vw] ">
    <div className="flex items-center justify-center ">
      <h1 className="text-3xl font-bold text-white  ">7007Lab Market Place</h1>
    </div>
    <Tabs isAllTab={isAllTab} isNFTTab={isNFTTab} isModelTab={isModelTab} setIsAllTab ={setIsAllTab} setIsModelTab={setIsModelTab}  setIsNFTTab={setIsNFTTab} />
    <div className="flex justify-center mb-5 lg:absolute">
      <div className=" lg:m-0 lg:relative lg:translate-y-1">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center justify-between w-44 px-2 py-2 bg-cyan-400 text-black  hover:bg-cyan-500 transition duration-300 ">
          <span className=" mx-8 text-sm">Create New</span>
          <svg
            className="w-4 h-4 transform"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ transform: isCollapsed ?  'rotate(0)':'rotate(-90deg)', color: 'black', transition: 'all 0.25s ease-in-out '}}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className={`${isCollapsed ? 'opacity-0 max-h-0 ' : 'opacity-100 transition-opacity  ease-in-out duration-500'} flex flex-col w-44`}>
          <Link href="/model/generate" className="bg-black text-white text-center opacity-40 p-2 tracking-wider hover:bg-gray-900">Model</Link>
          <Link href="/model/index/aigc/generate" className="bg-black text-white text-center  opacity-40 p-2 tracking-wider hover:bg-gray-900">AIGC</Link>
        </div>
      </div>
    </div>
    {/*  */}
    {/*  */}
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
    {/*  */}
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
