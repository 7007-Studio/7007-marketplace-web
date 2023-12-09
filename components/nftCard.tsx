import Link from "next/link";
import {useState} from "react";

export interface NFTCardProps {
  nftName : string;
  modelName: string;
  title: string;
  description: string;
  nftAddress: string;
  tokenID: string;
  openseaLink: string;
}

const NFTCard: React.FC<NFTCardProps> = ({nftName, modelName, title, description, nftAddress, tokenID, openseaLink}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  
  return (
      <div className="card w-80 bg-black text-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] hover:outline outline-pink-500 outline-2	 transition">
        <div className="flex justify-between items-center">
          <h2 className="card-title p-4">{nftName}</h2>
          <div className="badge badge-secondary m-4">{modelName}</div>
        </div>
        <div className=" relative">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="nft image"
          />
          <button onClick={() => setIsPlaying(!isPlaying)} className="absolute left-5 -bottom-5">
            {isPlaying ? <svg className="ml-1 bg-black outline  outline-1 outline-cyan-400 h-12 w-12 p-3 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg> : <svg className="ml-1 bg-black outline  outline-1 outline-cyan-400 h-12 w-12 p-2 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#22d3ee" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>}
          </button>
          {/* <audio src="">sdsdfsdfs</audio> */}
        </div>
        <div className="card-body">
          <h2 className="text-2xl mb-4 font-bold">{title}</h2>
          <p className="mb-4 text-zinc-400">{description}</p>
          {/* detail */}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center justify-between -mx-2 px-2 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300 ">
            <span>Collapse</span>
            <svg
              className="w-4 h-4 transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isCollapsed ?  'rotate(0)':'rotate(-90deg)', color: 'rgb(0, 188, 212)', transition: 'all 0.25s ease-in-out '}}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className={`${isCollapsed ? 'opacity-0 max-h-0 ' : 'opacity-100 transition-opacity  ease-in-out duration-500'} `}>
            {/* Your collapsible content goes here */}
            <div className="bg-black text-white  flex items-center justify-between text-xs leading-5	">
              <h2 >Contract Address</h2>
              <span >{nftAddress}</span>
            </div>  
            <div className="bg-black text-white  flex items-center justify-between text-xs leading-5	">
              <h2>Token ID</h2>
              <span>{tokenID}</span>
            </div>  
            <div className="bg-black text-white  flex items-center justify-between text-xs leading-5">
              <h2 >Opensea link</h2>
              <a href={openseaLink} className="text-blue-500 hover:text-blue-600">{openseaLink}</a>
            </div>  
          </div>
      </div>
    </div>
  );
}

export default NFTCard;
