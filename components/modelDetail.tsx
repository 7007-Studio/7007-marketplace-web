import Link from "next/link";

export interface ModelDetailProps {
  imageUrl: string;
  modelName?: string;
  modelAddress: string;
  aigcAddress: string;
  totalSupply?: number;
  maxSupply?: number;
  totalNFTMinted?: number;
  // title: string;
  // description: string;
}
const ModelDetail: React.FC<ModelDetailProps> = ({
  modelName,
  modelAddress,
  aigcAddress,
  imageUrl,
  totalSupply,
  maxSupply,
  totalNFTMinted,
}) => {
  return (
    <div className="flex flex-col shadow md:flex-row max-w-md md:max-w-2xl mx-auto self-center bg-[#191717]">
      <img src={imageUrl} className="object-cover w-full" alt="" />
      <div className="flex flex-col justify-between p-8">
        <h5 className="mb-2 md:text-2xl font-bold">{modelName}</h5>
        <p className="mb-5 font-normal">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>

        <div className=" text-white  flex items-center justify-between mb-3">
          <h2 className="">Token Supply</h2>
          <span className="text-primary text-sm">
          {totalSupply} / {maxSupply} 
          </span>
        </div>
        <div className=" text-white  flex items-center justify-between  mb-4">
          <h2 className="">Total NFT Mint</h2>
          <span className="text-primary text-sm">{totalNFTMinted}</span>
        </div>
        <div className=" text-white  flex items-center justify-between  mb-4">
          <h2 className="">openseaLink:</h2>
          <span className="text-primary text-sm"> <a href="https://testnets.opensea.io/zh-TW/account" target="_blank" rel="noopener noreferrer">
          testnets.opensea.io
        </a></span>
        </div>
        <div className="flex md:w-80 justify-around">
          <Link
            href={`/model/${modelAddress}/aigc/${aigcAddress}/generate`}
            className="bg-white text-black rounded py-2 px-4 w-fit mr-4"
          >
            Generate NFT
          </Link>
          <Link
            href={`/model/${modelAddress}/aigc/${aigcAddress}/mint`}
            className="bg-primary text-black rounded py-2 px-4"
          >
            Mint Model Tokens
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ModelDetail;
