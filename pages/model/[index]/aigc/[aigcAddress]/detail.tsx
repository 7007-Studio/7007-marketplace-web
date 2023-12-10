import { Inter } from "next/font/google";
import ModelDetail from "@/components/modelDetail";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import { useRouter } from "next/router";
import { MOCK_MARKETPLACE_DATA } from "@/constants";
import { isModel, isNFT } from "@/helpers";
import {
  useAigcTokenId,
  useAigtMaxSupply,
  useAigtName,
  useAigtTotalSupply,
} from "@/generated";
import { Address } from "viem";

export default function Detail() {
  const router = useRouter();
  const { index, aigcAddress } = router.query;

  const { data: modelName } = useAigtName({
    address: index as Address,
  });
  const { data: totalSupply } = useAigtTotalSupply({
    address: index as Address,
  });
  const { data: maxSupply } = useAigtMaxSupply({
    address: index as Address,
  });
  const { data: totalNFTMinted } = useAigcTokenId({
    address: aigcAddress as Address,
  });

  const mockItems = MOCK_MARKETPLACE_DATA;
  const targModel = mockItems.find((item) => {
    return isModel(item);
  });

  return (
    <div className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        <ModelDetail
          imageUrl={targModel?.imageUrl as string}
          modelAddress={index as string}
          modelName={modelName}
          totalSupply={Number(totalSupply)}
          maxSupply={Number(maxSupply)}
          totalNFTMinted={Number(totalNFTMinted)}
        />
      </div>
      <h2 className="text-white font-bold text-2xl mb-10">More</h2>
      <div className="flex items-start flex-wrap justify-center gap-6 mb-10">
        {mockItems.map((item) => {
          if (isModel(item)) {
            return (
              <ModelCard
                modelName="NOV 012"
                modelAddress={item.modelAddress}
                totalSupply={1000}
                nftMint={500}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                key={item.modelIndex}
              />
            );
          } else if (isNFT(item)) {
            return (
              <NFTCard
                key={item.tokenID}
                title={item.title}
                description={item.description}
                nftAddress={item.nftAddress}
                tokenID={item.tokenID}
                openseaLink={item.openseaLink}
                imageUrl={item.imageUrl}
                nftName={item.nftName}
                modelName={item.modelName}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
