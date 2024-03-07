import { concatAddress, openseaUrl } from "@/helpers";
import Image from "next/image";
import { Address } from "viem";

const CompleteStep = ({
  nftContract,
  mintedTokenId,
  onList,
  onGenerateAgain,
}: {
  nftContract: Address;
  mintedTokenId: bigint;
  onList: () => void;
  onGenerateAgain: () => void;
}) => {
  return (
    <div className="flex flex-col max-w-[552px] mx-auto mt-24 justify-center items-center gap-10">
      <Image src="/check.svg" alt="NFT minted" width={160} height={160} />
      <div className="px-4 text-center">
        <h2 className="heading-lg">Your NFT was minted successfully!</h2>
      </div>
      <div className="flex flex-row px-12 w-full justify-between">
        <span>Contract Address</span>
        <span>{concatAddress(nftContract)}</span>
      </div>

      <div className="flex flex-row px-12 w-full justify-between">
        <span>Link</span>
        <span>
          <a href={openseaUrl(nftContract, mintedTokenId)}>View on OpenSea</a>
        </span>
      </div>
      <div className="flex flex-row w-full items-center gap-4">
        <div className="flex-1">
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => {
              onList();
            }}
          >
            Listing
          </button>
        </div>
        <div className="flex-1">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={() => {
              onGenerateAgain();
            }}
          >
            Generate again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteStep;
