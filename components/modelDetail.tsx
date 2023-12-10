import Link from "next/link";
import { Model, NFT } from "@/types";


export interface ModelDetailProps {
  imageUrl: string;
  // modelName : string;
  // modelAddress: string;
  // totalSupply: number;
  // nftMint: number;
  // title: string;
  // description: string;
}
const ModelDetail: React.FC<ModelDetailProps> = ({
  imageUrl,
}) =>  {
  
  return (
    <div className="flex flex-col rounded-lg shadow md:flex-row md:max-w-sm xl:max-w-xl self-center dark:bg-gray-800 md:-translate-x-1/2 xl:-translate-x-1/4">
      <img
        src={imageUrl}
        className="object-contain sm:object-cover w-full rounded-t-lg  "
        alt=""
      />
      <div className="flex flex-col justify-between p-8 dark:bg-gray-800 rounded-lg ">
        <h5 className="mb-2 md:text-2xl font-bold  text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>

        <div className=" text-white  flex items-center justify-between mb-3">
          <h2 className="">Token Supply</h2>
          <span className="text-primary text-sm">100 / 1000</span>
        </div>
        <div className=" text-white  flex items-center justify-between  mb-4">
          <h2 className="">Total NFT Mint</h2>
          <span className="text-primary text-sm">100</span>
        </div>
        <div className="flex md:w-80 justify-around">
          <Link
            href="/model/1/aigc/generate"
            className="bg-white text-black rounded py-2 px-4 w-fit mr-4"
          >
            Generate NFT
          </Link>
          <Link
            href="/model/1/mint"
            className="bg-primary text-black rounded py-2 px-4"
          >
            Mint Model Tokens
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ModelDetail;