import Image from "next/image";
import ModelDetail from "./modelDetail";

export interface ModelDetailProps {
  imageUrl: string;
  nftName?: string;
  modelAddress: string;
  nftAddress: string;
  totalSupply?: number;
  maxSupply?: number;
  tokenID?: number;
  openseaLink?: string;
}
const NFTDetail: React.FC<ModelDetailProps> = ({
  nftName,
  nftAddress,
  tokenID,
  openseaLink,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col shadow md:flex-row max-w-md md:max-w-2xl mx-auto self-center bg-[#191717]">
      <Image
        src={imageUrl}
        className="object-cover w-full"
        width={512}
        height={512}
        alt=""
      />
      <div className="flex flex-col justify-between p-8">
        <h5 className="mb-2 md:text-2xl font-bold">{nftName}</h5>
        <p className="mb-5 font-normal">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
          <h2>Contract Address</h2>
          <span>{nftAddress}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
          <h2>Token ID</h2>
          <span>{tokenID}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs leading-5">
          <h2>Opensea link</h2>
          <a href={openseaLink} className="text-primary overflow-hidden">
            {openseaLink}
          </a>
        </div>
      </div>
    </div>
  );
};
export default ModelDetail;
