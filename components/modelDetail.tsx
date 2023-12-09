import Link from "next/link";

export interface ModelDetailProps {
  // modelName : string;
  // modelAddress: string;
  // totalSupply: number;
  // nftMint: number;
  // title: string;
  // description: string;
}

export default function ModelDetail() {
  return (
    <div className="flex flex-col rounded-lg shadow md:flex-row md:max-w-sm xl:max-w-xl self-center dark:bg-gray-800 md:-translate-x-1/2 xl:-translate-x-1/4">
      <img 
        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" 
        className="object-contain sm:object-cover w-full rounded-t-lg  " 
        alt=""
      />
      <div className="flex flex-col justify-between p-8 dark:bg-gray-800 rounded-lg ">
        <h5 className="mb-2 md:text-2xl font-bold  text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p className="mb-8 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        
        <div className="flex md:w-80 justify-around">
          <Link href="/aigc/generate" className="bg-white text-black rounded py-2 px-4 w-fit mr-4">Generate NFT</Link>
          <Link href="/model/generate" className="bg-cyan-400 text-black rounded py-2 px-4">Mint Model Tokens</Link>
        </div>
      </div>
    </div>
  );
}
