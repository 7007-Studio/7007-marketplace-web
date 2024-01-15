import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcFactoryDeployedAigCs,
  useAigcFactoryDeployedAigTs,
  useAigtName,
} from "@/generated";
import Link from "next/link";
export interface ModelDetailProps {
  modelIndex: number;
}
const ModelDetail: React.FC<ModelDetailProps> = ({ modelIndex }) => {
  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(modelIndex)],
  });
  const { data: aigcAddress } = useAigcFactoryDeployedAigCs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(modelIndex)],
  });

  const { data: modelName } = useAigtName({
    address: aigtAddress,
  });

  return (
    <div className="flex flex-col shadow md:flex-row max-w-md md:max-w-2xl mx-auto self-center bg-[#191717]">
      <img src="/nft1.png" className="object-cover w-full" alt="" />
      <div className="flex flex-col justify-between p-8">
        <h5 className="mb-2 md:text-2xl font-bold">{modelName}</h5>
        <p className="mb-5 font-normal">
          Use stable diffusion model to generate image and music from text
        </p>

        <div className="flex md:w-80 justify-around">
          {aigcAddress && (
            <Link
              href={`/model/${modelIndex}/aigc/generate`}
              className="bg-white text-black rounded py-2 px-4 w-fit mr-4"
            >
              Generate NFT
            </Link>
          )}
          {aigtAddress && (
            <Link
              href={`/model/${modelIndex}/aigt/mint`}
              className="bg-primary text-black rounded py-2 px-4"
            >
              Mint Model Tokens
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default ModelDetail;
